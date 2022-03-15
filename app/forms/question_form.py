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

    raise ValidationError('Question needs to start with: What, Who, When, Where, Why, or How')


class QuestionForm(FlaskForm):
    question = StringField('question', validators=[DataRequired(), question_starts_with])
