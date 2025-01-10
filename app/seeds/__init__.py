from flask.cli import AppGroup
from .users import seed_users, undo_users
from .habits import seed_habits, undo_habits
from .daily_entries import seed_daily_entries, undo_daily_entries
from .stats import seed_stats, undo_stats
from app.models.db import db, environment, SCHEMA

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Create schema if it doesn't exist
        db.session.execute(f'CREATE SCHEMA IF NOT EXISTS {SCHEMA}')
        db.session.commit()
        
        # Undo all existing data
        undo_daily_entries()
        undo_habits()
        undo_stats()
        undo_users()
        
    # Seed in correct order (users first, then related data)
    seed_users()
    seed_stats()  # Stats depend on users
    seed_habits()  # Habits depend on users
    seed_daily_entries()  # Daily entries depend on both users and habits

@seed_commands.command('undo')
def undo():
    if environment == "production":
        # Create schema if it doesn't exist
        db.session.execute(f'CREATE SCHEMA IF NOT EXISTS {SCHEMA}')
        db.session.commit()
    
    # Remove in reverse order of dependencies
    undo_daily_entries()
    undo_habits()
    undo_stats()
    undo_users()