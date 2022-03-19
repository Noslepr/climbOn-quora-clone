from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    
    if user:
        raise ValidationError('Email address is already in use.')

def password_check(form, field):
    password = field.data
    special = ['!', '@', '#', '$', '%', '^', '&', '*']

    if not any(x in password for x in special):
        raise ValidationError("Please include at least one of :'!@#$%^&*'")

def repeat_password(form, field):
    repeat_password = field.data
    password = form.data['password']

    if not repeat_password == password:
        raise ValidationError("Passwords must match")

class SignUpForm(FlaskForm):
    full_name = StringField(
        'full_name', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), Email(message="Must be a valid email."), user_exists])
    password = StringField('password', validators=[DataRequired(), password_check])
    repeat_password = StringField('repeat_password', validators=[DataRequired(), repeat_password])
