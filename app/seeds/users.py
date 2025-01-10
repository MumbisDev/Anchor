from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_users():
    demo = User(
        username='Demo', 
        email='demo@aa.io', 
        password='password',
        profile_picture_url='https://example.com/demo.jpg'
    )
    marnie = User(
        username='marnie', 
        email='marnie@aa.io', 
        password='password',
        profile_picture_url='https://example.com/marnie.jpg'
    )
    bobbie = User(
        username='bobbie', 
        email='bobbie@aa.io', 
        password='password',
        profile_picture_url='https://example.com/bobbie.jpg'
    )

    db.session.add_all([demo, marnie, bobbie])
    db.session.commit()

def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
    db.session.commit()