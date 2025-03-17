from flask import Flask, request, jsonify, send_file, abort
from werkzeug.utils import secure_filename
import datetime
import jwt
from functools import wraps
import os
import json

from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {
    "origins": "http://localhost:5173",  # Match your React frontend origin
    "methods": ["GET", "POST", "OPTIONS"],  # Include OPTIONS for preflight
    "allow_headers": ["Content-Type", "Authorization"]  # Allow JSON headers
}})

# Load configuration from environment variables
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.environ.get('SQLALCHEMY_TRACK_MODIFICATIONS')
app.config['UPLOAD_FOLDER'] = os.environ.get('UPLOAD_FOLDER')
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
# too early to include these (deal with the error it brings)
# app.config['MAX_CONTENT_LENGTH'] = os.environ.get('MAX_CONTENT_LENGTH')
# app.config['SEND_FILE_MAX_AGE_DEFAULT'] = os.environ.get('SEND_FILE_MAX_AGE_DEFAULT')



# Ensure upload folder and subfolders exist
folders = ['listening_audios', 'listening_photos', 'question_audios', 'speaking_audios', 'writing_audios']
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
            payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            if not payload.get('role') or payload.get('role') != 'admin' :
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

# Helper function to generate JWT token
def generate_token(user):
    """Generate a JWT token for the user with a 24-hour expiration."""
    payload = {
        'user_id': user.id,
        'role': user.role,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }
    token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
    return token

# Database Models
from models import db, User, Section, ListeningAudio, ReadingPassage, \
                    Question, Option, TableQuestionRow, TableQuestionColumn, \
                    CorrectAnswer, SpeakingTask, WritingTask, QuestionAudio

db.init_app(app)


def create_question(question_data, section_type, reading_passage_id=None, listening_audio_id=None, audio_file=None):
    # Create the question
    question = Question(
        section_type=section_type,
        type=question_data['type'],
        prompt=question_data['prompt'],
        reading_passage_id=reading_passage_id if section_type == 'reading' else None,
        listening_audio_id=listening_audio_id if section_type == 'listening' else None
    )
    db.session.add(question)
    db.session.flush()  # Ensure question.id is available

    # Handle options and correct answers for insert-a-text or multiple-choice (single or multiple)
    # not details instead options and correct_answers
    # would have to implement if the inserted question options and corrects exist in the question_data
    if question.type in ['multiple_to_multiple', 'insert_text', 'multiple_to_single', 'audio', 'prose_summary']:
        if question.type == 'audio' and audio_file:
            # Save the audio file
            audio_url = save_file(audio_file, 'question_audios')

            # Create QuestionAudio record
            question_audio = QuestionAudio(
                question_id=question.id,
                audio_url=audio_url
            )
            db.session.add(question_audio)
        
        elif question.type == 'insert_text':
            options = ['a','b','c','d']
        else:
            options = question_data['options']

        if question.type in ['insert_text', 'multiple_to_single', 'audio']:
            corrects = question_data['correct_answer'] # single correct answer (with no s)
        else:
            corrects = question_data['correct_answers']

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
        # question_data instead of details
        rows = question_data['rows']
        columns = question_data['columns']
        correct_answers = question_data['correct_selections'] # correct_selections for table correct answers

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

# Before request handler
@app.before_request
def log_request_info():
    print("=== Incoming Request ===")
    print(f"Method: {request.method}")
    print(f"URL: {request.url}")
    print(f"Headers: {request.headers}")

    # Handle different content types
    if request.content_type:
        if request.content_type.startswith('multipart/form-data'):
            print(f"Form Data: {request.form.to_dict()}")
            print(f"Files: {request.files.to_dict()}")
        elif request.content_type == 'application/json':
            print(f"JSON Body: {request.get_json(silent=True)}")
        else:
            print(f"Raw Body: {request.get_data(as_text=True)}")
    else:
        print("No body content")
    print("=====================")

# Registration endpoint
@app.route('/register', methods=['POST'])
def register():
    """Register a new user with the role 'student'."""
    data = request.get_json()
    if not data:
        print('missing json data')
        return jsonify({'error': 'Missing JSON data'}), 400

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not all([username, email, password]):
        print('missing required fields')
        return jsonify({'error': 'Missing required fields'}), 400

    # Check for existing username or email
    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        print('username or email already exists')
        return jsonify({'error': 'Username or email already exists'}), 400

    # Create new user with role 'student'
    user = User(username=username, email=email, role='admin') # making the role admin for testing. don't forget to swtich it back to student
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    """Authenticate a user and return a JWT token."""
    data = request.get_json()
    if not data:
        print('missing json data')
        return jsonify({'error': 'Missing JSON data'}), 400

    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        print('missing required fields')
        return jsonify({'error': 'Missing required fields'}), 400

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        token = generate_token(user)
        return jsonify({
            'token': token,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

# Optional logout endpoint (client-side token discard recommended)
@app.route('/logout', methods=['POST'])
def logout():
    """Logout endpoint (client should discard token)."""
    return jsonify({'message': 'Logout successful'}), 200

# Route to serve audio files
@app.route('/files/<path:filename>')
def get_file(filename):
    # Construct full path
    file_path = os.path.join(os.environ.get('BASE_DIR'), filename)
    # Security check: ensure path is within BASE_DIR
    if not file_path.startswith(os.environ.get('BASE_DIR')):
        abort(403, description="Access denied")
    
    # Check if file exists and is a file (not directory)
    if not os.path.exists(file_path) or not os.path.isfile(file_path):
        abort(404, description="File not found")
    
    return send_file(
        file_path,
        mimetype='audio/mpeg',
        as_attachment=False
    )


# Readign section

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
        title = passage_data.get('title')
        text = passage_data.get('text')
        if not title or not text:
            return jsonify({'error': 'Missing title or text in passage'}), 400

        passage = ReadingPassage(title=title, content=text, section=section)
        db.session.add(passage)
        db.session.flush() # id is not released until flushed or comitted (don't want to commit, yet)
        
        for question_data in passage_data.get('questions', []):
            print('before creating question: ', question_data)
            create_question(question_data, 'reading', reading_passage_id=passage.id)

    db.session.commit()
    
    return jsonify({
        'id': section.id,
        'title': section.title,
        'passages': [{'id': p.id, 'title': p.title, 'content': p.content} 
                    for p in section.reading_passages]
    }), 201

@app.route('/reading/<int:section_id>', methods=['GET'])
def get_reading_section(section_id):
    section = Section.query.filter_by(id=section_id, section_type='reading').first()
    if not section:
        return jsonify({'error': 'Section not found'}), 404

    passages = ReadingPassage.query.filter_by(section_id=section.id).all()
    passages_data = []
    for passage in passages:
        questions = Question.query.filter_by(reading_passage_id=passage.id).all()
        questions_data = []
        for q in questions:
            options = Option.query.filter_by(question_id=q.id).all()
            # options_data = [{'id': o.id, 'option_text': o.option_text} for o in options]
            options_data = [o.option_text for o in options]
            questions_data.append({'id': q.id, 'type': q.type, 'prompt': q.prompt, 'options': options_data})
        passages_data.append({
            'id': passage.id,
            'title': passage.title,
            'text': passage.content,
            'questions': questions_data
        })

    return jsonify({
        'id': section.id,
        'title': section.title,
        'passages': passages_data
    }), 200

@app.route('/reading/<int:section_id>', methods=['PUT'])
@admin_required
def update_reading_section(section_id):
    section = Section.query.filter_by(id=section_id, section_type='reading').first()
    if not section:
        return jsonify({'error': 'Section not found'}), 404

    data = request.get_json()
    if not data:
        return jsonify({'error': 'Missing JSON data'}), 400

    section.title = data.get('title', section.title)
    db.session.commit()

    return jsonify({'message': 'Section updated successfully'}), 200

@app.route('/reading/<int:section_id>', methods=['DELETE'])
@admin_required
def delete_reading_section(section_id):
    section = Section.query.filter_by(id=section_id, section_type='reading').first()
    if not section:
        return jsonify({'error': 'Section not found'}), 404

    db.session.delete(section)
    db.session.commit()
    return jsonify({'message': 'Section deleted successfully'}), 200

@app.route('/readings', methods=['GET'])
def get_reading_sections():
    sections = Section.query.filter_by(section_type='reading').all()
    if not sections:
        return jsonify({'error': 'Section not found'}), 404

    return jsonify({
        'total': len(sections),
        'sections': [{'id': section.id, 'title': section.title} for section in sections],
    }), 200

# Listening section

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
        db.session.flush() # to get the id to use in create_question
        
        for indx, question_data in enumerate(audio_data.get('questions', [])):
            question_audio = request.files.get(f'questionSnippetFiles[{i}][{indx}]')
            create_question(question_data, 'listening', listening_audio_id=audio.id, audio_file=question_audio)

    db.session.commit()
    
    return jsonify({
        'id': section.id,
        'title': section.title,
        'audios': [{'id': a.id, 'title': a.title, 'audio_url': a.audio_url, 'photo_url': a.photo_url} 
                  for a in section.listening_audios]
    }), 201

@app.route('/listening/<int:section_id>', methods=['GET'])
def get_listening_section(section_id):
    section = Section.query.filter_by(id=section_id, section_type='listening').first()
    if not section:
        return jsonify({'error': 'Section not found'}), 404

    audios = ListeningAudio.query.filter_by(section_id=section.id).all()
    audios_data = []
    for audio in audios:
        questions = Question.query.filter_by(listening_audio_id=audio.id).all()
        questions_data = []
        for q in questions:
            if q.type == 'table':
                table_rows = TableQuestionRow.query.filter_by(question_id=q.id).all()
                table_columns = TableQuestionColumn.query.filter_by(question_id=q.id).all()
                rows = [row.row_label for row in table_rows]
                columns = [col.column_label for col in table_columns]
                questions_data.append({'id': q.id, 'type': q.type, 'prompt': q.prompt,  'rows': rows, 'columns': columns})
            else:
                options = Option.query.filter_by(question_id=q.id).all()
                options_data = [o.option_text for o in options]
                if q.type == 'audio':
                    audio_url = QuestionAudio.query.filter_by(question_id=q.id).first()
                    questions_data.append({'id': q.id, 'type': q.type, 'audio_url': audio_url.audio_url, 'prompt': q.prompt, 'options': options_data})
                else:
                    questions_data.append({'id': q.id, 'type': q.type, 'prompt': q.prompt, 'options': options_data})
        audios_data.append({
            'id': audio.id,
            'title': audio.title,
            'audio_url': audio.audio_url,
            'photo_url': audio.photo_url,
            'questions': questions_data
        })

    return jsonify({
        'id': section.id,
        'title': section.title,
        'audios': audios_data
    }), 200

@app.route('/listening/<int:section_id>', methods=['PUT'])
@admin_required
def update_listening_section(section_id):
    section = Section.query.filter_by(id=section_id, section_type='listening').first()
    if not section:
        return jsonify({'error': 'Section not found'}), 404

    data = request.get_json()
    if not data:
        return jsonify({'error': 'Missing JSON data'}), 400

    section.title = data.get('title', section.title)
    db.session.commit()

    return jsonify({'message': 'Section updated successfully'}), 200

@app.route('/listening/<int:section_id>', methods=['DELETE'])
@admin_required
def delete_listening_section(section_id):
    section = Section.query.filter_by(id=section_id, section_type='listening').first()
    if not section:
        return jsonify({'error': 'Section not found'}), 404

    audios = ListeningAudio.query.filter_by(section_id=section.id).all()
    for audio in audios:
        if audio.audio_url:
            try:
                os.remove(audio.audio_url.lstrip('/'))
            except OSError:
                pass
        if audio.photo_url:
            try:
                os.remove(audio.photo_url.lstrip('/'))
            except OSError:
                pass

    db.session.delete(section)
    db.session.commit()
    return jsonify({'message': 'Section deleted successfully'}), 200

@app.route('/listenings', methods=['GET'])
def get_listening_sections():
    sections = Section.query.filter_by(section_type='listening').all()
    if not sections:
        return jsonify({'error': 'Section not found'}), 404

    return jsonify({
        'total': len(sections),
        'sections': [{'id': section.id, 'title': section.title} for section in sections],
    }), 200

# Speaking section

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

@app.route('/speaking/<int:section_id>', methods=['GET'])
def get_speaking_section(section_id):
    section = Section.query.filter_by(id=section_id, section_type='speaking').first()
    if not section:
        return jsonify({'error': 'Section not found'}), 404

    tasks = SpeakingTask.query.filter_by(section_id=section.id).all()
    tasks_data = [{'id': t.id, 'task_number': t.task_number, 'passage': t.passage, 
                   'prompt': t.prompt, 'audio_url': t.audio_url} for t in tasks]

    return jsonify({
        'id': section.id,
        'title': section.title,
        'task1': tasks_data[0],
        'task2': tasks_data[1],
        'task3': tasks_data[2],
        'task4': tasks_data[3]
    }), 200

@app.route('/speaking/<int:section_id>', methods=['PUT'])
@admin_required
def update_speaking_section(section_id):
    section = Section.query.filter_by(id=section_id, section_type='speaking').first()
    if not section:
        return jsonify({'error': 'Section not found'}), 404

    data = request.get_json()
    if not data:
        return jsonify({'error': 'Missing JSON data'}), 400

    section.title = data.get('title', section.title)
    db.session.commit()

    return jsonify({'message': 'Section updated successfully'}), 200

@app.route('/speaking/<int:section_id>', methods=['DELETE'])
@admin_required
def delete_speaking_section(section_id):
    section = Section.query.filter_by(id=section_id, section_type='speaking').first()
    if not section:
        return jsonify({'error': 'Section not found'}), 404

    tasks = SpeakingTask.query.filter_by(section_id=section.id).all()
    for task in tasks:
        if task.audio_url:
            try:
                os.remove(task.audio_url.lstrip('/'))
            except OSError:
                pass

    db.session.delete(section)
    db.session.commit()
    return jsonify({'message': 'Section deleted successfully'}), 200

@app.route('/speakings', methods=['GET'])
def get_speaking_sections():
    sections = Section.query.filter_by(section_type='speaking').all()
    if not sections:
        return jsonify({'error': 'Section not found'}), 404

    return jsonify({
        'total': len(sections),
        'sections': [{'id': section.id, 'title': section.title} for section in sections],
    }), 200

# Writing section
    
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

@app.route('/writing/<int:section_id>', methods=['GET'])
def get_writing_section(section_id):
    section = Section.query.filter_by(id=section_id, section_type='writing').first()
    if not section:
        return jsonify({'error': 'Section not found'}), 404

    tasks = WritingTask.query.filter_by(section_id=section.id).all()
    tasks_data = [{'id': t.id, 'task_number': t.task_number, 'passage': t.passage, 
                   'prompt': t.prompt, 'audio_url': t.audio_url} for t in tasks]

    return jsonify({
        'id': section.id,
        'title': section.title,
        'task1': tasks_data[0],
        'task2': tasks_data[1]
    }), 200

@app.route('/writing/<int:section_id>', methods=['PUT'])
@admin_required
def update_writing_section(section_id):
    section = Section.query.filter_by(id=section_id, section_type='writing').first()
    if not section:
        return jsonify({'error': 'Section not found'}), 404

    data = request.get_json()
    if not data:
        return jsonify({'error': 'Missing JSON data'}), 400

    section.title = data.get('title', section.title)
    db.session.commit()

    return jsonify({'message': 'Section updated successfully'}), 200

@app.route('/writing/<int:section_id>', methods=['DELETE'])
@admin_required
def delete_writing_section(section_id):
    section = Section.query.filter_by(id=section_id, section_type='writing').first()
    if not section:
        return jsonify({'error': 'Section not found'}), 404

    tasks = WritingTask.query.filter_by(section_id=section.id).all()
    for task in tasks:
        if task.audio_url:
            try:
                os.remove(task.audio_url.lstrip('/'))
            except OSError:
                pass

    db.session.delete(section)
    db.session.commit()
    return jsonify({'message': 'Section deleted successfully'}), 200

@app.route('/writings', methods=['GET'])
def get_writing_sections():
    sections = Section.query.filter_by(section_type='writing').all()
    if not sections:
        return jsonify({'error': 'Section not found'}), 404

    return jsonify({
        'total': len(sections),
        'sections': [{'id': section.id, 'title': section.title} for section in sections],
    }), 200

# Create database tables
with app.app_context():
    db.create_all()

# Run the application
if __name__ == '__main__':
    app.run(debug=True)