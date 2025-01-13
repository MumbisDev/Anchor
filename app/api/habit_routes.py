from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Habit, db

habit_routes = Blueprint('habits', __name__)

@habit_routes.route('/user/<int:user_id>')
@login_required
def get_user_habits(user_id):
    """
    Query for all habits for a user
    """
    habits = Habit.query.filter(Habit.user_id == user_id).all()
    return {'habits': [habit.to_dict() for habit in habits]}

@habit_routes.route('/<int:id>')
@login_required
def get_habit(id):
    """
    Query for a habit by id
    """
    habit = Habit.query.get(id)
    return habit.to_dict()

@habit_routes.route('', methods=['POST'])
@login_required
def create_habit():
    """
    Create a new habit
    """
    data = request.json
    habit = Habit(
        user_id=current_user.id,
        name=data['name'],
        description=data['description'],
        target_frequency=data['target_frequency'],
        icon_url=data.get('icon_url')
    )
    db.session.add(habit)
    db.session.commit()
    return habit.to_dict()

@habit_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_habit(id):
    """
    Update a habit
    """
    habit = Habit.query.get(id)
    if habit.user_id != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    data = request.json
    for field in data:
        setattr(habit, field, data[field])
    
    db.session.commit()
    return habit.to_dict()

@habit_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_habit(id):
    """
    Delete a habit
    """
    habit = Habit.query.get(id)
    if habit.user_id != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401
        
    db.session.delete(habit)
    db.session.commit()
    return {'message': 'Successfully deleted habit'}