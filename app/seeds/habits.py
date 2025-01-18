from app.models import db, Habit, environment, SCHEMA
from sqlalchemy.sql import text

def seed_habits():
    habits = [
        Habit(
            user_id=1,
            name='Daily Exercise',
            description='30 minutes of exercise daily',
            target_frequency=7,
            active_days='1111111',  # Active all days
            icon_url='https://example.com/exercise-icon.png'
        ),
        Habit(
            user_id=1,
            name='Reading',
            description='Read for 20 minutes',
            target_frequency=5,
            active_days='1111100',  # Active Monday-Friday
            icon_url='https://example.com/reading-icon.png'
        ),
        Habit(
            user_id=2,
            name='Meditation',
            description='10 minutes meditation',
            target_frequency=7,
            active_days='1111111',  # Active all days
            icon_url='https://example.com/meditation-icon.png'
        )
    ]

    db.session.add_all(habits)
    db.session.commit()

def undo_habits():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.habits RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM habits"))
    db.session.commit()