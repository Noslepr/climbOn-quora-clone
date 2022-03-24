from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import ValidationError
from app.models import User

def credential_length(form, field):
    cred = field.data

    if len(cred) < 5:
        raise ValidationError('Credentials are too short. Please provide more detail. More than 5 characters.')

    if len(cred) > 50:
        raise ValidationError('Credentials are too long. Please keep them short and specific. Less than 50 characters')

class UserForm(FlaskForm):
    credentials = StringField('credentials', validators=[credential_length])
