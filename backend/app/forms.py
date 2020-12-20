from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Length, EqualTo, Email

class LoginForm(FlaskForm):
    username = StringField('Username:', validators=[DataRequired()])
    password = PasswordField('Password:', validators=[DataRequired()])
    
class RegistrationForm(FlaskForm):
    fname = StringField("First Name:", validators=[DataRequired(message=("This field is required"))])
    lname = StringField("Last Name:", validators=[DataRequired(message=("This field is required"))])
    email = StringField("Email:", validators=[DataRequired(message="This field is required"), Email(message=("Not a valid email address"))])
    username = StringField("Username:", validators=[DataRequired(message=("This field is required"))])
    password = PasswordField("Password:", validators=[DataRequired(message=("This field is required"))])
    password2 = PasswordField("Confirm Password:", validators=[DataRequired(message=("This field is required")), EqualTo("password", message="Must be equal to Password")])

class PostForm(FlaskForm):
    post_title = StringField("Title:", validators=[DataRequired(message=("This field is required"))])
    post_text = TextAreaField('Post:', validators=[Length(min=0, max=1000)])