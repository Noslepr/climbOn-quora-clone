from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import ValidationError
from app.models import User

def credential_length(form, field):
    cred = field.data

    if len(cred) < 5:
        raise ValidationError('Credentials are too short. Please provide more detail')

    if len(cred) > 30:
        raise ValidationError('Credentials are too long. Please keep them short and specific')

class UserForm(FlaskForm):
    credentials = StringField('credentials', validators=[credential_length])
