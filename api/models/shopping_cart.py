import psycopg2
from flask import Blueprint
from database import conn

def create_table():
    cursor = conn.cursor()

    create_table_query = '''
        CREATE TABLE IF NOT EXISTS shopping_cart (
            cart_id SERIAL PRIMARY KEY,
            order_id INTEGER REFERENCES orders(order_id),
            item_id INTEGER REFERENCES products(product_id),
            quantity INTEGER
        )
    '''

    try:
        cursor.execute(create_table_query)
        conn.commit()
        return 'shopping_cart table created successfully'
    except Exception as e:
        conn.rollback()
        return f'Error creating shopping_cart table: {e}'
    finally:
        cursor.close()


def drop_table():
    cursor = conn.cursor()

    drop_table_query = f'''
    DROP TABLE IF EXISTS shopping_cart
    '''

    try:
        cursor.execute(drop_table_query)
        conn.commit()
        return f'Table shopping_cart dropped successfully'
    except Exception as e:
        conn.rollback()
        return f'Error dropping shopping_cart table: {e}'
    finally:
        cursor.close()


class Cart:
    def __init__(self, order_id=None, item_id = None, quantity = 0):
        self.cart_id = None
        self.order_id = order_id
        self.item_id = item_id
        self.quantity = quantity

create_table()