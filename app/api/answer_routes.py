from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Answer
from app.forms.answer_form import AnswerForm
from app.api.auth_routes import validation_errors_to_error_messages

answer_routes = Blueprint('answers', __name__)

@answer_routes.route('/', methods=['POST'])
def post_answer():

    data = request.json
    user_id = current_user.get_id()
    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        answer = Answer(
            user_id = user_id,
            question_id = data['question_id'],
            answer = data['answer']
        )

        db.session.add(answer)
        db.session.commit()

        return { 'answer': answer.to_dict() }
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }


@answer_routes.route('/', methods=['PATCH'])
def patch_answer():

    data = request.json
    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        answer_id = data['answer_id']
        edited_answer = data['answer']

        answer = Answer.query.get(answer_id)
        answer.answer = edited_answer

        db.session.commit()

        return { 'answer': answer.to_dict() }

    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }


@answer_routes.route('/', methods=['DELETE'])
def delete_answer():

    data = request.json
    answer_id = data['answer_id']
    answer = Answer.query.get(answer_id)

    db.session.delete(answer)
    db.session.commit()

    return { 'message': 'Answer sucessfully deleted.' }
