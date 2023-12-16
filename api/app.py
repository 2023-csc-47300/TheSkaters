import os
import typing

import flask

import configuration
import database
import login_manager
from controllers.product import product_blueprint
from controllers.user import user_blueprint
from controllers.order import order_blueprint
from controllers.shopping_cart import cart_blueprint

from flask_cors import CORS

from flask_dance.contrib.github import make_github_blueprint, github
from flask import redirect, url_for


def bad_request(error: typing.Any) -> flask.Response:
    """
    An attachable helper function that indends to standarize the response
    clients receive whenever we respond with an HTTP Status Code of 400
    (Bad Request).
    """
    return (
        flask.jsonify(
            error={
                "code": error.code,
                "name": error.name,
                "description": error.description,
            }
        ),
        400,
    )


def dispose_database_session(_: typing.Any) -> None:
    """
    A registarable function that concludes a database session. The function
    should be called when the application context is popped. The application
    context is typically popped after the request context for each request.
    """
    database.conn.close()


def not_found(error: typing.Any) -> flask.Response:
    """
    An attachable helper function that indends to standarize the response
    clients receive whenever we respond with an HTTP Status Code of 404
    (Not Found).
    """
    return (
        flask.jsonify(
            error={
                "code": error.code,
                "name": error.name,
                "description": error.description,
            }
        ),
        404,
    )


def unauthorized(error: typing.Any) -> flask.Response:
    """
    An attachable helper function that indends to standarize the response
    clients receive whenever we respond with an HTTP Status Code of 401
    (Unauthorized).
    """
    return (
        flask.jsonify(
            error={
                "code": error.code,
                "name": error.name,
                "description": error.description,
            }
        ),
        401,
    )


def create_app(configuration_name: configuration.ConfigurationName) -> flask.app.Flask:
    """
    A factory function designed to create a Flask Application.
    """

    # Initialize the Flask Application.
    app = flask.Flask(__name__)
    CORS(app)

    github_blueprint = make_github_blueprint(client_id=os.environ.get("GITHUB_CLIENT_ID"), client_secret=os.environ.get("GITHUB_CLIENT_SECRET"))


    # @app.route('/github')
    # def github_login():
    #     if not github.authorized:
    #         return redirect(url_for('github.login'))
        
    #     account_info = github.get('/user')

    #     if account_info.ok:
    #         account_info_json = account_info.json()
    #         return '<h1>Your github name is {}</h1>'.format(account_info_json['login'])
        
    #     return '<h1>Request failed!</h1>'

    # Load the configuration pertaining to the environment you're in
    # e.g., development, production, or testing.
    app.config.from_object(configuration.configuration[configuration_name])

    # Initialize the session manager within the instance of the application.
    # The session manager is covered in detail here: https://flask-login.readthedocs.io/en/latest/
    login_manager.login_manager.init_app(app)

    # Rules that end with a slash are “branches”, others are “leaves”.
    # If strict_slashes is enabled (default), visiting a branch URL without a
    # trailing slash will redirect to the URL with a slash appended.
    app.url_map.strict_slashes = False

    
    # Load the "product" routes onto the Flask Application. 
    app.register_blueprint(product_blueprint, url_prefix="/products")
    app.register_blueprint(user_blueprint, url_prefix="/users")
    app.register_blueprint(order_blueprint, url_prefix="/orders")
    app.register_blueprint(cart_blueprint, url_prefix="/carts")
    app.register_blueprint(github_blueprint, url_prefix="/github_login")
    # app.register_blueprint(github_auth_blueprint, url_prefix="/auth/github")

    # Register an error handler for 400 (Bad Request). The Flask Application
    # will call the error handler when the application returns a 400
    # HTTP Status Code.
    app.register_error_handler(400, bad_request)
    # Register an error handler for 401 (Unauthorized). The Flask Application
    # will call the error handler when the application returns a 401
    # HTTP Status Code.
    app.register_error_handler(401, bad_request)
    # Register an error handler for 404 (Not Found). The Flask Application
    # will call the error handler when the application returns a 404
    # HTTP Status Code.
    app.register_error_handler(404, not_found)
    # Register a handler that the Flask Application will call whenever the
    # application context is popped, which the application pops near the end of
    # the request.
    # app.teardown_appcontext(dispose_database_session)

    return app


# Protect ourselves from accidentally invoking this file when importing.
if __name__ == "__main__":
    # Retrieve the configuration defined for the environment
    # (development, production, or testing). The environment is set via the
    # "ENVIRONMENT" environment variable. We default to the "DEVELOPMENT"
    # environment if no environment variable is set.
    configuration_name = configuration.ConfigurationName.DEVELOPMENT
    if os.environ.get("ENVIRONMENT"):
        configuration_name = os.environ.get("ENVIRONMENT")
    # Validate that the environment value set via the "ENVIRONMENT" environment
    # variable is one that we expect (development, production, or testing).
    if configuration_name not in configuration.configuration:
        raise RuntimeError(
            f'No configuration found for "{configuration_name}" environment.'
        )
    # Create the application using the "create_app" factory function created above.
    app = create_app(configuration_name)
    # Start/Run the application.
    app.run(port=8080)