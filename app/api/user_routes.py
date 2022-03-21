from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User
from app.forms.user_form import UserForm
from app.api.auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/', methods=['PATCH'])
def user():

    data = request.json
    form = UserForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        user_id = current_user.get_id()
        new_credentials = data['credentials']

        user = User.query.get(user_id)
        user.credential = new_credentials

        db.session.commit()

        return { 'user': user.to_dict() }
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }
