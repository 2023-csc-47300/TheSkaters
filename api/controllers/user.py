import datetime
import os

import flask
import flask_login
from flask import redirect, url_for, session

from database import conn
from models.user import User
import login_manager
from flask_dance.contrib.github import github
from flask_cors import cross_origin


user_blueprint = flask.Blueprint("users", __name__)

def check_user_exists(email):
        cursor = conn.cursor()

        select_query = '''
        SELECT EXISTS(SELECT 1 FROM users WHERE email = %s)
        '''
        cursor.execute(select_query, (email,))
        exists = cursor.fetchone()[0]

        cursor.close()
        return exists


def check_github_exists(nickname):
        cursor = conn.cursor()

        select_query = '''
        SELECT * FROM users WHERE github = %s
        '''
        cursor.execute(select_query, (nickname,))
        exists = cursor.fetchone()

        cursor.close()
        return exists


def check_user_credentials(email, password):
        cursor = conn.cursor()

        select_query = '''
        SELECT * FROM users WHERE email = %s AND password = %s
        '''
        try:
            cursor.execute(select_query, (email, password))
            user_data = cursor.fetchone()
            if user_data:
                user = User(first_name=user_data[1], last_name=user_data[2], email=user_data[3], password=user_data[4])
                user.user_id = user_data[0]  # Set the user_id attribute
                return user
        except Exception as e:
            raise e
        finally:
            cursor.close()


def load_user(user_id):
    cursor = conn.cursor()
    query = "SELECT * FROM users WHERE user_id = %s"
    
    try:
        cursor.execute(query, (user_id,))
        user_data = cursor.fetchone()
        if user_data:
            user = User(first_name=user_data[1], last_name=user_data[2], email=user_data[3], password=user_data[4], github=user_data[5])
            user.user_id = user_data[0]  # Set the user_id attribute
            return user
    except Exception as e:
        raise e
    finally:
        cursor.close()


@user_blueprint.route("/", methods=["GET"])
def get_users():

    query = "SELECT * FROM users"

    try:
        cursor = conn.cursor()
        cursor.execute(query)
        results = cursor.fetchall()

        users = []
        for row in results:
            user = {
                "user_id": row[0],
                "first_name": row[1],
                "last_name": row[2],
                "email": row[3],
                "password": row[4],
                "github": row[5]
            }
            users.append(user)

        cursor.close()

        return flask.jsonify(users)

    except Exception as e:
        return f"Error fetching users: {e}", 500


@user_blueprint.route("/signup", methods=["GET"])
def signup():
    # Parse the JSON data in the request's body.
    user_data = flask.request.get_json()

    # Validate that the client provided all required fields.
    required_fields = ["first_name", "last_name", "email", "password"]
    for field in required_fields:
        # If a required field is missing, return a 400 (Bad Request) HTTP
        # Status Code to clients, signifying that we received a bad request.
        if field not in user_data:
            flask.abort(400, description=f"{field} cannot be blank.")

    user = check_user_exists(user_data["email"])
    if user:
        flask.abort(400, description=f"User already exists.")

    # Initialize and populate a User object with the data submitted by the client.
    user = User()
    user.first_name = user_data["first_name"]
    user.last_name = user_data["last_name"]
    user.email = user_data["email"]
    user.password = user_data["password"]
    user.github = ""

    # Add the User to the database and commit the transaction.
    user.add_user_to_db()

    flask_login.login_user(user)

    # Convert the User database record into a JSON object response.
    return flask.jsonify(
        {
            "user_id": user.user_id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "github": user.github,
        }
    )


@user_blueprint.route("/login", methods=["GET"])
def confirm_login():
    user = flask_login.current_user
    if not user.is_authenticated:
        flask.abort(401)
    return flask.jsonify(
        {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "github": user.github,
        }
    )


@user_blueprint.route("/loginlocal", methods=["GET"])
def login():
    # Parse the JSON data in the request's body.
    email = flask.request.args.get("email")
    password = flask.request.args.get("password")
    # Validate that the client provided all required fields.
    if not email or not password:
        flask.abort(400, description=f"Field cannot be blank.")

    user = check_user_credentials(email, password)
    if not user:
        flask.abort(401, description=f"Incorrect email or password.")
    # is_correct_password = pbkdf2_sha256.verify(login_data["password"], user.password)
    # if not is_correct_password:
    #     flask.abort(401, description=f"Incorrect email or password.")

    # https://flask-login.readthedocs.io/en/latest/
    flask_login.login_user(user)
    return flask.jsonify(
        {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "user_id": user.user_id,
            "github": user.github
        }
    )


@user_blueprint.route("/logout", methods=["GET"])
def logout():
    flask_login.logout_user()

    session.pop('github_oauth_token', None)
    session.pop('github_logged_in', None)
    return {}


@login_manager.login_manager.user_loader
def login_check_user(user_id):
    return load_user(user_id)


@user_blueprint.route('/github')
@cross_origin(supports_credentials=True)
def github_login():
    if not github.authorized:
        return redirect(url_for('github.login', _external=True))
    
    account_info = github.get('/user')

    if account_info.ok:
        account_info_json = account_info.json()
        user_email = account_info_json.get('email')

        user_exists = None
        user_exists = check_github_exists(account_info_json.get('login'))

        if not user_exists:
            # Add the user to the database
            user = User(
                first_name=account_info_json.get('first_name'),
                last_name=account_info_json.get('last_name'),
                email=user_email,
                password="",  # Assuming GitHub login doesn't provide a password
                github=account_info_json.get('login')  # Saving GitHub identifier
            )
            user.add_user_to_db()  # Add user to the database
            
            print("User added to the database")
        else:
            print("User already exists in the database")
            user = User(first_name=user_exists[1], last_name=user_exists[2], email=user_exists[3], password=user_exists[4], github=user_exists[5], user_id=user_exists[0])
        
        
        flask_login.login_user(user)
        # return flask.jsonify(
        #     {
        #         "first_name": user.first_name,
        #         "last_name": user.last_name,
        #         "email": user.email,
        #         "user_id": user.user_id,
        #         "github": user.github
        #     }
        # )
        return redirect('http://localhost:3000/')

    return 'Request failed!'