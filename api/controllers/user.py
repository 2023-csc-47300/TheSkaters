import datetime

import flask
import flask_login

from database import conn
from models.user import User
import login_manager


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
            user = User(first_name=user_data[1], last_name=user_data[2], email=user_data[3], password=user_data[4])
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
                "password": row[4]
            }
            users.append(user)

        cursor.close()

        return flask.jsonify(users)

    except Exception as e:
        return f"Error fetching users: {e}", 500


@user_blueprint.route("/signup", methods=["POST"])
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
            "middle_name": user.middle_name,
            "last_name": user.last_name,
            "email": user.email,
        }
    )


@user_blueprint.route("/login", methods=["POST"])
def login():
    # Parse the JSON data in the request's body.
    login_data = flask.request.get_json()

    # Validate that the client provided all required fields.
    required_fields = ["email", "password"]
    for field in required_fields:
        # If a required field is missing, return a 400 (Bad Request) HTTP
        # Status Code to clients, signifying that we received a bad request.
        if field not in login_data:
            flask.abort(400, description=f"{field} cannot be blank.")

    user = check_user_credentials(login_data["email"], login_data["password"])
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
            "user_id": user.user_id
        }
    )


@user_blueprint.route("/logout", methods=["POST"])
@flask_login.login_required
def logout():
    flask_login.logout_user()
    return {}


@login_manager.login_manager.user_loader
def load_user(user_id):
    return load_user(user_id)