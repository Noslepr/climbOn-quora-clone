from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User
from app.forms.user_form import UserForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.aws import upload_file_to_s3, allowed_file, get_unique_filename

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
def patch_user():
    user_id = current_user.get_id()
    user = User.query.get(user_id)

    data = request.json
    form = UserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    new_credentials = data['credentials']

    if form.validate_on_submit():
        user.credentials = new_credentials
        db.session.commit()

        return { 'credentials': new_credentials, 'user_id': user_id }
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }
        

@user_routes.route('/profileImg', methods=['PATCH'])
def profile_img_user():
        user_id = current_user.get_id()
        user = User.query.get(user_id)

        if "image" not in request.files:
            return {"errors": "image required"}, 400

        image = request.files['profile_img']

        if not allowed_file(image.filename):
            return { 'errors': "file type not permitted" }, 400

        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400

        url = upload['url']
        user.profile_img = url
        db.session.commit()

        return { 'profile_img': url, 'user_id': user_id}
