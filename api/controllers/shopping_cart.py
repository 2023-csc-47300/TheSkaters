import datetime

import flask
import flask_login

from database import conn
from models.shopping_cart import Cart


cart_blueprint = flask.Blueprint("cart", __name__)


@cart_blueprint.route("/", methods=["GET"])
def get_carts():
    limit = flask.request.args.get("limit")

    query = "SELECT * FROM shopping_cart"

    if limit:
        query += f" LIMIT {limit}"

    try:
        cursor = conn.cursor()
        cursor.execute(query)
        results = cursor.fetchall()
        cursor.close()

        carts = []
        for row in results:
            cart = {
                "cart_id": row[0],
                "order_id": row[1],
                "item_id": row[2],
                "quantity": row[3]
            }
            carts.append(cart)

        return flask.jsonify(carts)

    except Exception as e:
        return f"Error fetching carts: {e}", 500


@cart_blueprint.route("/add", methods=["GET"])
def get_add():
    order_id = flask.request.args.get("order_id")
    item_id = flask.request.args.get("item_id")
    quantity = flask.request.args.get("quantity", default=1)

    queryInsert = "INSERT INTO shopping_cart (order_id, item_id, quantity) \
                    VALUES (%s, %s, %s) \
                    RETURNING cart_id, order_id, item_id, quantity"
    
    queryUpdate = "UPDATE"

    try:
        cursor = conn.cursor()
        cursor.execute(queryInsert, (order_id, item_id, quantity))
        conn.commit()
        results = cursor.fetchall()
        # cursor.execute(queryUpdate, (order_id, item_id, quantity))
        # conn.commit()
        cursor.close()
        
        row = results[0]

        cart = {
            "cart_id": row[0],
            "order_id": row[1],
            "item_id": row[2],
            "quantity": row[3]
        }

        return flask.jsonify(cart)

    except Exception as e:
        return f"Error fetching cart add: {e}", 500


@cart_blueprint.route("/delete", methods=["GET"])
def get_delete():
    cart_id = flask.request.args.get("cart_id")

    queryDelete = "DELETE FROM shopping_cart \
                    WHERE cart_id = %s \
                    RETURNING cart_id, order_id, item_id, quantity"
    
    queryUpdate = "UPDATE"

    try:
        cursor = conn.cursor()
        cursor.execute(queryDelete, (cart_id,))
        conn.commit()
        results = cursor.fetchall()
        # cursor.execute(queryUpdate, (order_id, item_id, quantity))
        # conn.commit()
        cursor.close()
        
        if results:
            row = results[0]

            cart = {
                "cart_id": row[0],
                "order_id": row[1],
                "item_id": row[2],
                "quantity": row[3]
            }
        else:
            return flask.jsonify("No cart")

        return flask.jsonify(cart)

    except Exception as e:
        return f"Error fetching cart add: {e}", 500


@cart_blueprint.route("/getbyorderid", methods=["GET"])
def get_order():
    order_id = flask.request.args.get("order_id")

    query = "SELECT * FROM shopping_cart \
                    WHERE order_id = %s"

    try:
        cursor = conn.cursor()
        cursor.execute(query, (order_id,))
        results = cursor.fetchall()
        cursor.close()

        carts = []
        for row in results:
            cart = {
                "cart_id": row[0],
                "order_id": row[1],
                "item_id": row[2],
                "quantity": row[3]
            }
            carts.append(cart)

        return flask.jsonify(carts)

    except Exception as e:
        return f"Error fetching cart add: {e}", 500