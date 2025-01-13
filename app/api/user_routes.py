from flask import Blueprint, jsonify
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Stats, db
user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary with their stats
    """
    user = User.query.get(id)
    user_dict = user.to_dict()
    
    # Get user's stats
    stats = Stats.query.filter(Stats.user_id == id).first()
    if stats:
        user_dict['stats'] = stats.to_dict()
    else:
        user_dict['stats'] = None
        
    return user_dict


@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_user(id):
    """
    Updates a user's information
    """
    if current_user.id != id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    user = User.query.get(id)
    if not user:
        return {'errors': {'message': 'User not found'}}, 404

    data = request.json
    
    # Update allowed fields
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'profile_picture_url' in data:
        user.profile_picture_url = data['profile_picture_url']

    try:
        db.session.commit()
        return user.to_dict()
    except Exception as e:
        db.session.rollback()
        return {'errors': {'message': 'Error updating user'}}, 500

@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):
    """
    Deletes a user and their associated data
    """
    if current_user.id != id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    user = User.query.get(id)
    if not user:
        return {'errors': {'message': 'User not found'}}, 404

    try:
        db.session.delete(user)
        db.session.commit()
        return {'message': 'Successfully deleted user account and all associated data'}
    except Exception as e:
        db.session.rollback()
        return {'errors': {'message': 'Error deleting user'}}, 500