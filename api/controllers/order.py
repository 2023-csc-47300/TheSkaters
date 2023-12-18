import datetime

import flask
import flask_login
from flask import redirect, url_for, session

from database import conn
from models.order import Order
import os

import stripe


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
    order_id = flask.request.args.get("order_id")
    
    queryUpdate = "UPDATE orders \
                    SET completed = 1 \
                    WHERE order_id = %s AND completed = 0 \
                    RETURNING order_id, user_id, completed, total_amount"

    try:
        cursor = conn.cursor()
        cursor.execute(queryUpdate, (order_id,))
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
        print(f"ORDER {order} DONE")
        return redirect('http://localhost:3000/')
        

    except Exception as e:
        return f"Error fetching order done: {e}", 500


@order_blueprint.route("/checkout", methods=["GET"])
def get_checkout():
    order_id = flask.request.args.get("order_id")
    
    queryGetCarts = "SELECT * from shopping_cart \
                    WHERE order_id = %s"
    carts = []

    try:
        cursor = conn.cursor()
        cursor.execute(queryGetCarts, (order_id,))
        conn.commit()
        results = cursor.fetchall()
        if results:
            for row in results:
                cart = {
                    "cart_id": row[0],
                    "order_id": row[1],
                    "item_id": row[2],
                    "quantity": row[3]
                }
                carts.append(cart)
        else:
            return flask.jsonify("No carts")

        cursor.close()

    except Exception as e:
        return f"Error fetching order done: {e}", 500

    print(carts)
    product_ids = []
    quantity = {}
    for i in carts:
        product_ids.append(str(i['item_id']))
        if quantity.get(str(i['item_id'])):
            quantity[str(i['item_id'])] += 1
        else:
            quantity[str(i['item_id'])] = 1
    
    print(product_ids)
    
    stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")
    price_list = stripe.Price.list()
    price_list_final = []
    for i in price_list:
        if i["product"] in product_ids:
            price_list_final.append({'price': i['id'], 'quantity': quantity[i["product"]]})

    checkout_session = stripe.checkout.Session.create(
        line_items = price_list_final,
        mode = 'payment',
        success_url = f'http://localhost:8080/orders/done?order_id={order_id}',
        cancel_url = 'http://localhost:3000/'
    )

    return redirect(checkout_session.url, code = 303)