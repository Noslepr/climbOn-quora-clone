from flask import Blueprint, jsonify, request
from app.models import db, Question
from app.forms.question_form import QuestionForm
from app.api.auth_routes import validation_errors_to_error_messages

question_routes = Blueprint('questions', __name__)

@question_routes.route('/')
def get_all_questions():
    questions = Question.query.all()

    return {'questions': [question.to_dict() for question in questions]}


@question_routes.route('/', methods=['POST'])
def post_question():

    data = request.json
    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        question = Question(
            user_id = data['user_id'],
            question = data['question']
        )

        db.session.add(question)
        db.session.commit()

        return { 'question': question.to_dict() }
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }


@question_routes.route('/', methods=['PATCH'])
def patch_question():

    data = request.json
    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        question_id = data['question_id']
        edited_question = data['question']

        question = Question.query.get(question_id)
        question.question = edited_question

        db.session.commit()

        return { 'question': question.to_dict() }

    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }


@question_routes.route('/', methods=['DELETE'])
def delete_question():

    data = request.json
    question_id = data['question_id']
    question = Question.query.get(question_id)

    db.session.delete(question)
    db.session.commit()

    return { 'message': 'Question sucessfully deleted.' }
