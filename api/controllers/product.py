import datetime

import flask
import flask_login

from database import conn
from models.product import Product


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