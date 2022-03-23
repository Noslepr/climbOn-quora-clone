import re
from flask import Blueprint, jsonify, request
from app.models import Question

search_routes = Blueprint('search', __name__)

@search_routes.route('/')
def search():



    search_word = request.json['search']
    print('-------------', search_word)

    search_results = Question.query.filter(Question.question.like('%'+search_word+'%')).all()

    return { 'search_results': [question.to_dict() for question in search_results]}
