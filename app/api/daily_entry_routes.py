from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import DailyEntry, db

daily_entry_routes = Blueprint('entries', __name__)

@daily_entry_routes.route('/user/<int:user_id>')
@login_required
def get_user_entries(user_id):
    """
    Query for all daily entries for a user
    """
    entries = DailyEntry.query.filter(DailyEntry.user_id == user_id).all()
    return {'entries': [entry.to_dict() for entry in entries]}

@daily_entry_routes.route('/<int:id>')
@login_required
def get_entry(id):
    """
    Query for an entry by id
    """
    entry = DailyEntry.query.get(id)
    if not entry:
        return {'errors': {'message': 'Entry not found'}}, 404
    return entry.to_dict()

@daily_entry_routes.route('', methods=['POST'])
@login_required
def create_entry():
    """
    Create a new daily entry
    """
    data = request.json
    entry = DailyEntry(
        user_id=current_user.id,
        habit_id=data.get('habit_id'),
        improvement_note=data.get('improvement_note'),
        compound_meter_increment=data.get('compound_meter_increment', 1.0),
        image_url=data.get('image_url')
    )
    db.session.add(entry)
    db.session.commit()
    return entry.to_dict()

@daily_entry_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_entry(id):
    """
    Update a daily entry
    """
    entry = DailyEntry.query.get(id)
    if not entry:
        return {'errors': {'message': 'Entry not found'}}, 404
    if entry.user_id != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    data = request.json
    for field in data:
        setattr(entry, field, data[field])
    
    db.session.commit()
    return entry.to_dict()

@daily_entry_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_entry(id):
    """
    Delete a daily entry
    """
    entry = DailyEntry.query.get(id)
    if not entry:
        return {'errors': {'message': 'Entry not found'}}, 404
    if entry.user_id != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    db.session.delete(entry)
    db.session.commit()
    return {'message': 'Successfully deleted entry'}