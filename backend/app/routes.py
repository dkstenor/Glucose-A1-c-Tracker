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
      date_obj = date_time_obj.date()
      new_reading = Reading(username=username, my_reading=reading, reading_date=date_obj, reading_time=reading_time)
      db.session.add(new_reading)
      db.session.commit()
      return {"message": "Reading successfully added"}, 200
    except:
      return {"message": "Error adding reading"}, 500

class GetDateData(Resource):
  def get(self):
    username = request.args.get('username')
    readingdate = request.args.get('date')
    date_obj = parse(readingdate)
    # ORM query
    data = Reading.query.filter_by(username=username, reading_date=date_obj).all()
    if not data:
      return {"message": "No Data Found for Date"}, 500
    # The reading schema (through Marshmallow) converts the Python data structure to JSON format
    reading_schema = ReadingSchema(many=True)
    ret_data = reading_schema.dump(data)
    avg = sum(d.my_reading for d in data) / len(data)
    return {'ret': ret_data, 'avg': round(avg, 2)}


class GetRangeData(Resource):
  def get(self):
    ret_data = []
    day_avg = 0
    range_count = 0
    range_total = 0
    range_avg = 0
    # req_data = request.get_json()
    # username = req_data['username']
    # start_date = req_data['startdate']
    # end_date = req_data['enddate']
    username = request.args.get('username')
    start_date = request.args.get('startdate')
    end_date = request.args.get('enddate')
    start_date_obj = parse(start_date)
    end_date_obj = parse(end_date)
    while start_date_obj <= end_date_obj:
      data = Reading.query.filter_by(username=username, reading_date=start_date_obj).all()
      if len(data) == 0:
        start_date_obj += timedelta(days=1) 
        continue
      total = sum(d.my_reading for d in data)
      day_avg = total / len(data)
      ret_data.append({'reading_date': start_date_obj.strftime('%m/%d/%Y'), 'day_avg': round(day_avg, 2)})
      start_date_obj += timedelta(days=1) 
    if not data:
      return {"message": "No Data Found for Date"}, 500
    while range_count < len(ret_data):
      range_total = range_total + ret_data[range_count]['day_avg']
      range_count += 1
    range_avg = range_total / range_count
    return {'ret': ret_data, 'range_avg': round(range_avg, 2)}

# @app.route("/")
# def hello():
#     return render_template("index.html")

api.add_resource(GetUsers, '/getusers')
api.add_resource(AddUser, '/register')
api.add_resource(Login, '/login')
api.add_resource(AddReading, '/addreading')
api.add_resource(GetDateData, '/getdatedata')
api.add_resource(GetRangeData, '/getrangedata')


