from app import app, db, api, ma
from flask import Flask, session, request, json, render_template, jsonify
from flask_restful import Resource, Api, abort, reqparse
from flask_sqlalchemy import SQLAlchemy 
from .models import User, UserSchema, Reading, ReadingSchema
from datetime import datetime, timedelta
from dateutil.parser import parse

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


class AddReading(Resource): 
  def post(self):
    req_data = request.get_json()
    try:
      username = req_data['username']
      reading = req_data['reading']
      reading_date = req_data['readingDate']
      reading_time = req_data['readingTime']
      date_time_obj = parse(reading_date)
      reading_date = date_time_obj.date()
      new_reading = Reading(username=username, my_reading=reading, reading_date=reading_date, reading_time=reading_time)
      db.session.add(new_reading)
      db.session.commit()
      return {"message": "Reading successfully added"}, 200
    except:
      return {"message": "Error adding reading"}, 500

class GetDateData(Resource):
  def post(self):
    req_data = request.get_json()
    username = req_data['username']
    readingdate = req_data['date']
    date_obj = parse(readingdate)
    data = Reading.query.filter_by(username=username, reading_date=date_obj).all()
    if not data:
      return {"message": "No Data Found for Date"}, 500
    reading_schema = ReadingSchema(many=True)
    ret_data = reading_schema.dump(data)
    avg = sum(d.my_reading for d in data) / len(data)
    return {'ret': ret_data, 'avg': round(avg, 2)}


class GetRangeData(Resource):
  def post(self):
    ret_data = []
    avg = 0
    req_data = request.get_json()
    username = req_data['username']
    start_date = req_data['startdate']
    end_date = req_data['enddate']
    start_date_obj = parse(start_date)
    end_date_obj = parse(end_date)
    while start_date_obj <= end_date_obj:
      data = Reading.query.filter_by(username=username, reading_date=start_date_obj).all()
      if len(data) == 0:
        start_date_obj += timedelta(days=1) 
        continue
      avg = sum(d.my_reading for d in data) / len(data)
      ret_data.append({'reading_date': start_date_obj.strftime('%m/%d/%Y'), 'avg': round(avg, 2)})
      start_date_obj += timedelta(days=1) 
    if not data:
      return {"message": "No Data Found for Date"}, 500
    return {'ret': ret_data, 'avg': round(avg, 2)}

# @app.route("/")
# def hello():
#     return render_template("index.html")

api.add_resource(GetUsers, '/getusers')
api.add_resource(AddUser, '/register')
api.add_resource(Login, '/login')
api.add_resource(AddReading, '/addreading')
api.add_resource(GetDateData, '/getdatedata')
api.add_resource(GetRangeData, '/getrangedata')


