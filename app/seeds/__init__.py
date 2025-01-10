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
        # Add all undo functions here
        undo_daily_entries()
        undo_habits()
        undo_stats()
        undo_users()
    seed_users()
    seed_habits()
    seed_daily_entries()
    seed_stats()

@seed_commands.command('undo')
def undo():
    undo_daily_entries()
    undo_habits()
    undo_stats()
    undo_users()