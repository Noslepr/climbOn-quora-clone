from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Question

question_routes = Blueprint('questions', __name__)

@question_routes.route('/')
def get_all_questions():
    questions = Question.query.all()

    return {'questions': [question.to_dict() for question in questions]}
