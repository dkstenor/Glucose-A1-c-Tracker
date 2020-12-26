from app import app, db, api, ma
from flask import Flask, session, request, json, render_template
from flask_restful import Resource, Api, abort, reqparse
from flask_sqlalchemy import SQLAlchemy 
from .models import User, UserSchema, Reading, ReadingSchema

class GetUsers(Resource):
  def get(self):
    records = User.query.all()
    user_schema=UserSchema(many=True, exclude=['pwdhash'])
    return user_schema.dump(records)

class AddUser(Resource):
  def post(self):
    req_data = request.get_json()
    fname = req_data["fname"]
    lname = req_data["lname"]
    email = req_data["email"]
    uname = req_data["username"]
    password = req_data["password"]
    password2 = req_data["password2"]
    if password != password2:
      return {"message": "Passwords must match"}, 401
    u = User.query.filter_by(username=uname).first()
    if u:
      return {"message": "Username already exists."}, 401
    new_user=User(fname=fname, lname=lname, email=email, username=uname)
    new_user.set_password(password)
    db.session.add(new_user)  # Adds new User record to database
    db.session.commit()  # Commits all changes
    return {'message': f'User {uname} was created'}, 200

class Login(Resource):
  def post(self):
    req_data = request.get_json()
    uname = req_data['username']
    password = req_data['password']
    user = User.query.filter_by(username=uname).first()
    if user is None:
      return {"message": "User Not Found"}, 401
    if not user.check_password(password):
      return {"message": "Password not recognized"}, 401
    return {"message": "Success"}, 200


class PostReading(Resource): 
  def post(self):
    username = request.form.get("username")
    reading = request.form.get("my_reading")
    date = request.form.get("reading_date")
    time = request.form.get("reading_time")
    new_reading = Reading(username=username, my_reading=reading, reading_date=date, reading_time=time)
    db.session.add(new_reading)
    db.session.commit()
    return {"message": "Reading successfully created"}

@app.route("/")
def hello():
    return render_template("index.html")

api.add_resource(GetUsers, '/getusers')
api.add_resource(AddUser, '/register')
api.add_resource(Login, '/login')
api.add_resource(PostReading, '/postreading')


