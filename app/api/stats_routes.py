from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Stats, db

stats_routes = Blueprint('stats', __name__)

@stats_routes.route('/user/<int:user_id>')
@login_required
def get_user_stats(user_id):
    """
    Query for user statistics
    """
    stats = Stats.query.filter(Stats.user_id == user_id).first()
    if not stats:
        return {'errors': {'message': 'Stats not found'}}, 404
    return stats.to_dict()

@stats_routes.route('', methods=['POST'])
@login_required
def create_stats():
    """
    Create initial stats for a new user
    """
    # Check if stats already exist
    existing_stats = Stats.query.filter(Stats.user_id == current_user.id).first()
    if existing_stats:
        return {'errors': {'message': 'Stats already exist for this user'}}, 400

    stats = Stats(
        user_id=current_user.id,
        total_habits_completed=0,
        compound_meter=0.0,
        xp=0,
        level=1
    )
    db.session.add(stats)
    db.session.commit()
    return stats.to_dict()

@stats_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_stats(id):
    """
    Update user statistics
    """
    stats = Stats.query.get(id)
    if not stats:
        return {'errors': {'message': 'Stats not found'}}, 404
    if stats.user_id != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    data = request.json
    for field in data:
        setattr(stats, field, data[field])
    
    db.session.commit()
    return stats.to_dict()

@stats_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def reset_stats(id):
    """
    Reset user statistics
    """
    stats = Stats.query.get(id)
    if not stats:
        return {'errors': {'message': 'Stats not found'}}, 404
    if stats.user_id != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    stats.total_habits_completed = 0
    stats.compound_meter = 0.0
    stats.xp = 0
    stats.level = 1
    
    db.session.commit()
    return {'message': 'Successfully reset stats'}