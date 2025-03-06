from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# this model is only for content creation and not for users answers and scoring

# Users Model
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

# Sections Model
class Section(db.Model):
    __tablename__ = 'sections'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    section_type = db.Column(db.String(50), nullable=False)  # 'listening', 'speaking', 'writing', 'reading'
    title = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    listening_audios = db.relationship('ListeningAudio', backref='section', lazy=True)
    reading_passages = db.relationship('ReadingPassage', backref='section', lazy=True)
    speaking_tasks = db.relationship('SpeakingTask', backref='section', lazy=True)
    writing_tasks = db.relationship('WritingTask', backref='section', lazy=True)

# Listening Audios Model
class ListeningAudio(db.Model):
    __tablename__ = 'listening_audios'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    section_id = db.Column(db.Integer, db.ForeignKey('sections.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    audio_url = db.Column(db.String(255), nullable=False)
    photo_url = db.Column(db.String(255))

# Reading Passages Model
class ReadingPassage(db.Model):
    __tablename__ = 'reading_passages'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    section_id = db.Column(db.Integer, db.ForeignKey('sections.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)

# Questions Model
class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    section_type = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(50), nullable=False)  # e.g., 'multiple-choice', 'table'
    prompt = db.Column(db.Text, nullable=False)
    listening_audio_id = db.Column(db.Integer, db.ForeignKey('listening_audios.id'))
    reading_passage_id = db.Column(db.Integer, db.ForeignKey('reading_passages.id'))

    listening_audio = db.relationship('ListeningAudio', backref='questions')
    reading_passage = db.relationship('ReadingPassage', backref='questions')
    options = db.relationship('Option', backref='question', lazy=True)
    table_rows = db.relationship('TableQuestionRow', backref='question', lazy=True)
    table_columns = db.relationship('TableQuestionColumn', backref='question', lazy=True)
    correct_answers = db.relationship('CorrectAnswer', backref='question', lazy=True)

# Options Model
class Option(db.Model):
    __tablename__ = 'options'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    option_text = db.Column(db.Text, nullable=False)

# Table Question Rows Model
class TableQuestionRow(db.Model):
    __tablename__ = 'table_question_rows'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    row_label = db.Column(db.Text, nullable=False)

# Table Question Columns Model
class TableQuestionColumn(db.Model):
    __tablename__ = 'table_question_columns'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    column_label = db.Column(db.Text, nullable=False)

# Correct Answers Model
class CorrectAnswer(db.Model):
    __tablename__ = 'correct_answers'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    table_row_id = db.Column(db.Integer, db.ForeignKey('table_question_rows.id'))
    table_column_id = db.Column(db.Integer, db.ForeignKey('table_question_columns.id'))
    option_id = db.Column(db.Integer, db.ForeignKey('options.id'))

    table_row = db.relationship('TableQuestionRow')
    table_column = db.relationship('TableQuestionColumn')
    option = db.relationship('Option')

# Speaking Tasks Model
class SpeakingTask(db.Model):
    __tablename__ = 'speaking_tasks'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    section_id = db.Column(db.Integer, db.ForeignKey('sections.id'), nullable=False)
    task_number = db.Column(db.Integer, nullable=False)
    passage = db.Column(db.Text)
    prompt = db.Column(db.Text, nullable=False)
    audio_url = db.Column(db.String(255))

# Writing Tasks Model
class WritingTask(db.Model):
    __tablename__ = 'writing_tasks'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    section_id = db.Column(db.Integer, db.ForeignKey('sections.id'), nullable=False)
    task_number = db.Column(db.Integer, nullable=False)
    passage = db.Column(db.Text, nullable=False)
    prompt = db.Column(db.Text, nullable=False)
    audio_url = db.Column(db.String(255))