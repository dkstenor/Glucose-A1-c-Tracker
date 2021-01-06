from app import db, ma
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(25), nullable=False)
    lname = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    username = db.Column(db.String(35), nullable=False, unique=True)
    pwdhash = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return f'(<User {self.username} {self.email}>)'

    def set_password(self, password):
        self.pwdhash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.pwdhash, password)

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User

class Reading(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(35), nullable=False)
    my_reading = db.Column(db.Integer, nullable=False)
    reading_date = db.Column(db.Date, nullable=False)
    reading_time = db.Column(db.Time, nullable=False)

    def __repr__(self):
        return f'(<User {self.username} Reading {self.reading}>)'

class ReadingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Reading