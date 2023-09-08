from flask import Blueprint, render_template, redirect, url_for
from flask import request, flash
from flask_login import login_user, login_required, logout_user
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from .model_user import User
from . import db

auth = Blueprint('auth', __name__)


@auth.route('/login')
def login():
    return render_template('landing_page.html')

@auth.route('/login', methods=['POST'])
def login_post():
    # login code goes here
    
    official_email = request.form.get('official_email')
    password = request.form.get('password')
    remember = True if request.form.get('remember') else False

    user = User.query.filter_by(official_email=official_email).first()

    # check if the user actually exists
    # take the user-supplied password, hash it, and compare it to the hashed password in the database
    if not user:
        # if user doesn't exist, reload the page
        flash('User not found. Check your details and try again.')
        return redirect(url_for('auth.login'))
    
    if not check_password_hash(user.password, password):
        # if user doesn't exist or password is wrong, reload the page
        flash('Incorrect password. Please check your login details and try again.')
        return redirect(url_for('auth.login')) 
    
    # if the user doesn't exist or password is wrong, reload the page

    # if the above check passes, then we know the user has the right credentials
    login_user(user, remember=remember)

    return redirect(url_for('main.dashboard'))

@auth.route('/signup')
def signup():
    return render_template('sign_up_page.html')

@auth.route('/signup', methods=['POST'])
def signup_post():
    ###
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')
    DOB = request.form.get('DOB')
    company_name = request.form.get('company_name')
    official_email = request.form.get('official_email')
    company_size = request.form.get('company_size')
    password = request.form.get('password')

    # DOB = datetime.strptime(DOB, '%Y-%m-%d').date()

    user = User.query.filter_by(official_email=official_email).first() # if this returns a user, then the email already exists in database
    
    if user: # if a user is found, we want to redirect back to signup page so user can try again
        flash('Email address already exists')
        return redirect(url_for('auth.signup'))
        # return 'Email address already exists'
    
    # create a new user with the form data. Hash the password so plaintext version isn't saved.
    new_user = User(first_name=first_name, last_name=last_name, DOB=DOB,
                    company_name=company_name, official_email=official_email,
                    company_size=company_size, password=generate_password_hash(password, method='sha256'))
    
    # add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    return redirect(url_for('auth.login'))

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.landing_page'))