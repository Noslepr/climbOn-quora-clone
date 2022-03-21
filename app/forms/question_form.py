from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired,  ValidationError
from app.models import Question

def question_starts_with(form, field):
    question = field.data

    prefixs = ['Why', 'Who', 'When', 'Where', 'What', 'How']
    for prefix in prefixs:
        if question.startswith(prefix):
            return

    raise ValidationError('Question needs to start with: What, Who, When, Where, Why, or How.')

def question_ends_with(form, field):
    question = field.data

    if not question.endswith('?'):
        raise ValidationError('Please make sure your question ends with ?.')

def question_long_enough(form, field):
    question = field.data

    if len(question) < 15:
        raise ValidationError('Please make sure your question is long enough.')

def question_too_long(form, field):
    question = field.data

    if len(question) >= 300:
        raise ValidationError('Your question is too long. Please be more concise.')

class QuestionForm(FlaskForm):
    question = StringField('question', validators=[
        DataRequired(),
        question_starts_with,
        question_ends_with,
        question_long_enough,
        question_too_long
    ])
