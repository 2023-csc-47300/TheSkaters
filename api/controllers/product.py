import datetime

import flask
import flask_login

from database import conn
from models.product import Product
import os
import stripe


product_blueprint = flask.Blueprint("products", __name__)


@product_blueprint.route("/", methods=["GET"])
def get_products():
    limit = flask.request.args.get("limit")

    query = "SELECT * FROM products"

    if limit:
        query += f" LIMIT {limit}"

    try:
        cursor = conn.cursor()
        cursor.execute(query)
        results = cursor.fetchall()

        products = []
        for row in results:
            product = {
                "product_id": row[0],
                "name": row[1],
                "type": row[2],
                "price": row[3],
                "model": row[4],
                "size": row[5],
                "color": row[6],
                "description": row[7],
                "image_url": row[8]
            }
            products.append(product)

        cursor.close()

        return flask.jsonify(products)

    except Exception as e:
        return f"Error fetching products: {e}", 500


@product_blueprint.route("/addtostripe", methods=["GET"])
def add_to_stripe():

    query = "SELECT * FROM products"

    try:
        cursor = conn.cursor()
        cursor.execute(query)
        results = cursor.fetchall()

        products = []
        for row in results:
            product = {
                "product_id": row[0],
                "name": row[1],
                "type": row[2],
                "price": row[3],
                "model": row[4],
                "size": row[5],
                "color": row[6],
                "description": row[7],
                "image_url": row[8]
            }
            products.append(product)

        cursor.close()
        stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")
        
        for i in products:
            price = int(float(i['price']) * 100)
            stripe.Product.create(name=i['name'], 
                                    id=i['product_id'], 
                                    images=[i['image_url']],
                                    description = i['description'],
                                    default_price_data = {
                                        "unit_amount_decimal": price,
                                        "currency": "usd",
                                    }
                                 )

        return flask.jsonify(stripe.Product.list())

    except Exception as e:
        return f"Error fetching products: {e}", 500


@product_blueprint.route("/getbyid", methods=["GET"])
def get_product_by_id():
    product_id = flask.request.args.get("product_id")

    query = "SELECT * FROM products WHERE product_id = %s"

    try:
        cursor = conn.cursor()
        cursor.execute(query, (product_id,))
        results = cursor.fetchone()
        product = {
            "product_id": results[0],
            "name": results[1],
            "type": results[2],
            "price": results[3],
            "model": results[4],
            "size": results[5],
            "color": results[6],
            "description": results[7],
            "image_url": results[8]
        }

        cursor.close()

        return flask.jsonify(product)

    except Exception as e:
        return f"Error fetching product by id: {e}", 500