import psycopg2
from flask import Blueprint
from database import conn

def create_table():
    cursor = conn.cursor()

    create_table_query = '''
        CREATE TABLE IF NOT EXISTS orders (
            order_id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(user_id),
            completed INTEGER,
            total_amount NUMERIC
        )
    '''

    try:
        cursor.execute(create_table_query)
        conn.commit()
        return 'orders table created successfully'
    except Exception as e:
        conn.rollback()
        return f'Error creating orders table: {e}'
    finally:
        cursor.close()


def drop_table():
    cursor = conn.cursor()

    drop_table_query = f'''
    DROP TABLE IF EXISTS orders
    '''

    try:
        cursor.execute(drop_table_query)
        conn.commit()
        return f'Table orders dropped successfully'
    except Exception as e:
        conn.rollback()
        return f'Error dropping orders table: {e}'
    finally:
        cursor.close()


class Order:
    def __init__(self, user_id='', completed = 0, total_amount = 0):
        self.order_id = None
        self.user_id = user_id
        self.completed = completed
        self.total_amount = total_amount


create_table()