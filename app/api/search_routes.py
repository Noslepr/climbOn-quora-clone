import re
from flask import Blueprint, jsonify, request
from app.models import Question

search_routes = Blueprint('search', __name__)

@search_routes.route('/<search_word>')
def search(search_word):

    if search_word is 'none':
        return { 'search_results': [] }

    search_results = Question.query.filter(Question.question.ilike('%'+search_word+'%')).all()

    return { 'search_results': [question.to_dict() for question in search_results]}
