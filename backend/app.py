from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
import jwt
from functools import wraps
import os
import json

# Initialize Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.environ.get('SQLALCHEMY_TRACK_MODIFICATIONS')
app.config['UPLOAD_FOLDER'] = os.environ.get('UPLOAD_FOLDER')
db = SQLAlchemy(app)

# Ensure upload folder and subfolders exist
folders = ['listening_audios', 'listening_photos', 'speaking_audios', 'writing_audios']
for folder in folders:
    path = os.path.join(app.config['UPLOAD_FOLDER'], folder)
    if not os.path.exists(path):
        os.makedirs(path)

# JWT authentication decorator
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Missing token'}), 401
        try:
            token = token.split(" ")[1]  # Expecting 'Bearer <token>'
            payload = jwt.decode(token, os.environ.get('SECRET_KEY'), algorithms=['HS256'])
            if not payload.get('is_admin'):
                return jsonify({'error': 'Admin privileges required'}), 403
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401
        return f(*args, **kwargs)
    return decorated_function

# Helper function to save files and generate URLs
def save_file(file, subfolder):
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], subfolder, filename)
        file.save(file_path)
        return f'/{app.config["UPLOAD_FOLDER"]}/{subfolder}/{filename}'
    return None

# Database Models
from models import db, User, Section, ListeningAudio, ReadingPassage, \
                    Question, Option, TableQuestionRow, TableQuestionColumn, \
                    CorrectAnswer, SpeakingTask, WritingTask




def create_question(question_data, section_type, reading_passage_id=None):
    # Create the question
    question = Question(
        section_type=section_type,
        type=question_data['type'],
        prompt=question_data['prompt'],
        reading_passage_id=reading_passage_id if section_type == 'reading' else None
    )
    db.session.add(question)
    db.session.flush()  # Ensure question.id is available

    # Handle options and correct answers for insert-a-text or multiple-choice
    details = question_data.get('details', {})
    if question.type in ['multiple-choice', 'insert-a-text']:
        options = details.get('options', [])  # List of option texts
        corrects = details.get('correct', [])  # List of correct option texts

        # Map options to their database objects
        option_map = {}
        for opt_text in options:
            option = Option(question=question, option_text=opt_text)
            db.session.add(option)
            option_map[opt_text] = option

        # Add each correct answer to the CorrectAnswer table
        for correct_text in corrects:
            if correct_text in option_map:
                db.session.add(CorrectAnswer(question=question, option=option_map[correct_text]))

    # Handle table questions (already supports multiple correct answers)
    elif question.type == 'table':
        rows = details.get('rows', [])  # List of row labels
        columns = details.get('columns', [])  # List of column labels
        correct_answers = details.get('correct_answers', [])  # List of {'row': ..., 'column': ...}

        # Create row objects
        row_map = {row_label: TableQuestionRow(question=question, row_label=row_label) 
                   for row_label in rows}
        for row in row_map.values():
            db.session.add(row)

        # Create column objects
        column_map = {col_label: TableQuestionColumn(question=question, column_label=col_label) 
                      for col_label in columns}
        for col in column_map.values():
            db.session.add(col)

        # Add correct answers (supports multiple)
        for ca in correct_answers:
            row = row_map.get(ca['row'])
            column = column_map.get(ca['column'])
            if row and column:
                db.session.add(CorrectAnswer(question=question, table_row=row, table_column=column))

    db.session.commit()
    return question

@app.route('/reading', methods=['POST'])
@admin_required
def create_reading_section():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Missing JSON data'}), 400

    title = data.get('title')
    if not title:
        return jsonify({'error': 'Missing title'}), 400

    passages_data = data.get('passages', [])
    if not passages_data:
        return jsonify({'error': 'No passages provided'}), 400

    section = Section(section_type='reading', title=title)
    db.session.add(section)

    for passage_data in passages_data:
        content = passage_data.get('content')
        if not content:
            return jsonify({'error': 'Missing content in passage'}), 400

        passage = ReadingPassage(title=passage_data.get('title', ''), content=content, section=section)
        db.session.add(passage)
        
        for question_data in passage_data.get('questions', []):
            create_question(question_data, 'reading', reading_passage_id=passage.id)

    db.session.commit()
    
    return jsonify({
        'id': section.id,
        'title': section.title,
        'passages': [{'id': p.id, 'title': p.title, 'content': p.content} 
                    for p in section.reading_passages]
    }), 201

@app.route('/listening', methods=['POST'])
@admin_required
def create_listening_section():
    if 'sectionData' not in request.form:
        return jsonify({'error': 'Missing sectionData'}), 400
    
    try:
        section_data = json.loads(request.form['sectionData'])
    except json.JSONDecodeError:
        return jsonify({'error': 'Invalid JSON in sectionData'}), 400

    title = section_data.get('title')
    if not title:
        return jsonify({'error': 'Missing title'}), 400

    audios_data = section_data.get('audios', [])
    if not audios_data:
        return jsonify({'error': 'No audios provided'}), 400

    section = Section(section_type='listening', title=title)
    db.session.add(section)

    for i, audio_data in enumerate(audios_data):
        audio_title = audio_data.get('title')
        if not audio_title:
            return jsonify({'error': f'Missing title for audio {i}'}), 400

        audio_file = request.files.get(f'audioFiles[{i}]')
        if not audio_file:
            return jsonify({'error': f'Missing audio file for audio {i}'}), 400

        photo_file = request.files.get(f'photoFiles[{i}]')
        audio_url = save_file(audio_file, 'listening_audios')
        photo_url = save_file(photo_file, 'listening_photos') if photo_file else None

        audio = ListeningAudio(title=audio_title, audio_url=audio_url, photo_url=photo_url, section=section)
        db.session.add(audio)
        
        for question_data in audio_data.get('questions', []):
            create_question(question_data, 'listening', listening_audio_id=audio.id)

    db.session.commit()
    
    return jsonify({
        'id': section.id,
        'title': section.title,
        'audios': [{'id': a.id, 'title': a.title, 'audio_url': a.audio_url, 'photo_url': a.photo_url} 
                  for a in section.listening_audios]
    }), 201

@app.route('/speaking', methods=['POST'])
@admin_required
def create_speaking_section():
    if 'sectionData' not in request.form:
        return jsonify({'error': 'Missing sectionData'}), 400
    
    try:
        section_data = json.loads(request.form['sectionData'])
    except json.JSONDecodeError:
        return jsonify({'error': 'Invalid JSON in sectionData'}), 400

    title = section_data.get('title')
    if not title:
        return jsonify({'error': 'Missing title'}), 400

    tasks = {f'task{i}': section_data.get(f'task{i}') for i in range(1, 5)}
    if not all(tasks.values()):
        return jsonify({'error': 'Missing one or more tasks'}), 400

    section = Section(section_type='speaking', title=title)
    db.session.add(section)

    # Task 1: prompt only
    db.session.add(SpeakingTask(section=section, task_number=1, prompt=tasks['task1']['prompt']))

    # Task 2: passage, prompt, audio
    task2_audio = request.files.get('task2Audio')
    if not task2_audio:
        return jsonify({'error': 'Missing task2Audio'}), 400
    db.session.add(SpeakingTask(
        section=section, task_number=2, passage=tasks['task2'].get('passage'), 
        prompt=tasks['task2']['prompt'], audio_url=save_file(task2_audio, 'speaking_audios')
    ))

    # Task 3: passage, prompt, audio
    task3_audio = request.files.get('task3Audio')
    if not task3_audio:
        return jsonify({'error': 'Missing task3Audio'}), 400
    db.session.add(SpeakingTask(
        section=section, task_number=3, passage=tasks['task3'].get('passage'), 
        prompt=tasks['task3']['prompt'], audio_url=save_file(task3_audio, 'speaking_audios')
    ))

    # Task 4: prompt, audio
    task4_audio = request.files.get('task4Audio')
    if not task4_audio:
        return jsonify({'error': 'Missing task4Audio'}), 400
    db.session.add(SpeakingTask(
        section=section, task_number=4, prompt=tasks['task4']['prompt'], 
        audio_url=save_file(task4_audio, 'speaking_audios')
    ))

    db.session.commit()
    
    return jsonify({
        'id': section.id,
        'title': section.title,
        'tasks': [{'id': t.id, 'task_number': t.task_number, 'passage': t.passage, 
                  'prompt': t.prompt, 'audio_url': t.audio_url} for t in section.speaking_tasks]
    }), 201
    
@app.route('/writing', methods=['POST'])
@admin_required
def create_writing_section():
    if 'sectionData' not in request.form:
        return jsonify({'error': 'Missing sectionData'}), 400
    
    try:
        section_data = json.loads(request.form['sectionData'])
    except json.JSONDecodeError:
        return jsonify({'error': 'Invalid JSON in sectionData'}), 400

    title = section_data.get('title')
    if not title:
        return jsonify({'error': 'Missing title'}), 400

    tasks = {f'task{i}': section_data.get(f'task{i}') for i in range(1, 3)}
    if not all(tasks.values()):
        return jsonify({'error': 'Missing one or more tasks'}), 400

    section = Section(section_type='writing', title=title)
    db.session.add(section)

    # Task 1: passage, prompt, audio
    task1_audio = request.files.get('task1Audio')
    if not task1_audio:
        return jsonify({'error': 'Missing task1Audio'}), 400
    db.session.add(WritingTask(
        section=section, task_number=1, passage=tasks['task1']['passage'], 
        prompt=tasks['task1']['prompt'], audio_url=save_file(task1_audio, 'writing_audios')
    ))

    # Task 2: passage, prompt
    db.session.add(WritingTask(
        section=section, task_number=2, passage=tasks['task2']['passage'], 
        prompt=tasks['task2']['prompt']
    ))

    db.session.commit()
    
    return jsonify({
        'id': section.id,
        'title': section.title,
        'tasks': [{'id': t.id, 'task_number': t.task_number, 'passage': t.passage, 
                  'prompt': t.prompt, 'audio_url': t.audio_url} for t in section.writing_tasks]
    }), 201

# Create database tables
with app.app_context():
    db.create_all()

# Run the application
if __name__ == '__main__':
    app.run(debug=True)