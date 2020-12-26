from flask import Flask
from config import  Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Resource, Api, abort, reqparse
from flask_marshmallow import Marshmallow


app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)
migrate = Migrate(app, db)

from app import routes, models

app.secret_key="7FMHC-GuExeMgUFYvlHGETN4hncWyUAqLmPD5vFsFpg"
app.jwt_secret_key="7FMHC-GuExeMgUFYvlHGETN4hncWyUAqLmZPXYpipQ"

