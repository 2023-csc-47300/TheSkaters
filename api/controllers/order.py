import datetime

import flask
import flask_login

from database import conn
from models.order import Order


order_blueprint = flask.Blueprint("orders", __name__)


@order_blueprint.route("/", methods=["GET"])
def get_orders():
    limit = flask.request.args.get("limit")

    query = "SELECT * FROM orders"

    if limit:
        query += f" LIMIT {limit}"

    try:
        cursor = conn.cursor()
        cursor.execute(query)
        results = cursor.fetchall()
        cursor.close()

        orders = []
        for row in results:
            order = {
                "order_id": row[0],
                "user_id": row[1],
                "completed": row[2],
                "total_amount": row[3]
            }
            orders.append(order)

        return flask.jsonify(orders)

    except Exception as e:
        return f"Error fetching orders: {e}", 500


@order_blueprint.route("/getbyuserid", methods=["GET"])
def get_order_by_userid():
    user_id = flask.request.args.get("user_id")

    query = "SELECT * FROM orders WHERE user_id = %s"

    try:
        cursor = conn.cursor()
        cursor.execute(query, (user_id,))
        results = cursor.fetchall()
        cursor.close()

        orders = []
        for row in results:
            order = {
                "order_id": row[0],
                "user_id": row[1],
                "completed": row[2],
                "total_amount": row[3]
            }
            orders.append(order)

        return flask.jsonify(orders)

    except Exception as e:
        return f"Error fetching orders by user_id: {e}", 500


@order_blueprint.route("/current", methods=["GET"])
def get_current():
    user_id = flask.request.args.get("user_id")

    query = "SELECT * FROM orders \
             WHERE user_id = %s AND completed = 0"

    try:
        cursor = conn.cursor()
        cursor.execute(query, (user_id,))
        results = cursor.fetchall()
        cursor.close()

        if results:
            row = results[0]
            order = {
                "order_id": row[0],
                "user_id": row[1],
                "completed": row[2],
                "total_amount": row[3]
            }
        else:
            return flask.jsonify("No orders")


        return flask.jsonify(order)

    except Exception as e:
        return f"Error fetching order current: {e}", 500


@order_blueprint.route("/new", methods=["GET"])
def get_new():
    user_id = flask.request.args.get("user_id")

    queryInsert = "INSERT INTO orders (user_id, completed, total_amount) \
                    VALUES (%s, 0, 0) \
                    RETURNING order_id, user_id, completed, total_amount"
    
    queryUpdate = "UPDATE orders \
                    SET completed = 2 \
                    WHERE user_id = %s AND completed = 0"

    try:
        cursor = conn.cursor()
        cursor.execute(queryUpdate, (user_id,))
        cursor.execute(queryInsert, (user_id,))
        conn.commit()
        results = cursor.fetchall()
        cursor.close()
        
        row = results[0]

        order = {
            "order_id": row[0],
            "user_id": row[1],
            "completed": row[2],
            "total_amount": row[3]
        }

        return flask.jsonify(order)

    except Exception as e:
        return f"Error fetching order new: {e}", 500


@order_blueprint.route("/done", methods=["GET"])
def get_done():
    user_id = flask.request.args.get("user_id")
    
    queryUpdate = "UPDATE orders \
                    SET completed = 1 \
                    WHERE user_id = %s AND completed = 0 \
                    RETURNING order_id, user_id, completed, total_amount"

    try:
        cursor = conn.cursor()
        cursor.execute(queryUpdate, (user_id,))
        conn.commit()
        results = cursor.fetchall()
        if results:
            row = results[0]
            order = {
                "order_id": row[0],
                "user_id": row[1],
                "completed": row[2],
                "total_amount": row[3]
            }
        else:
            return flask.jsonify("No orders")

        cursor.close()

        return flask.jsonify(order)

    except Exception as e:
        return f"Error fetching order done: {e}", 500