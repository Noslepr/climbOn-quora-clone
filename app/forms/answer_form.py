from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired,  ValidationError
from app.models import Answer

def answer_long_enough(form, field):
    answer = field.data

    if len(answer) < 15:
        raise ValidationError('Please provide a longer, more detailed answer. More than 15 characters.')

    if len(answer) > 2000:
        raise ValidationError('Please keep your answer under 2000 characters.')

class AnswerForm(FlaskForm):
    answer = StringField('answer', validators=[
        DataRequired(),
        answer_long_enough,
    ])
