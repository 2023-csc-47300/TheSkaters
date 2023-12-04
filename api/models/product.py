import psycopg2
from flask import Blueprint
from database import conn

def create_table():
    # Connection parameters

    # Create a cursor object to execute SQL queries
    cursor = conn.cursor()

    # SQL statement to create a 'products' table
    create_table_query = '''
        CREATE TABLE IF NOT EXISTS products (
            product_id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            type VARCHAR(255),
            price NUMERIC,
            model VARCHAR(255),
            size VARCHAR(255),
            color VARCHAR(255),
            description TEXT,
            image_url VARCHAR(255)
        )
    '''

    try:
        # Execute the SQL query to create the table
        cursor.execute(create_table_query)
        conn.commit()
        return 'Table created successfully'
    except Exception as e:
        conn.rollback()
        return f'Error: {e}'
    finally:
        # Close cursor and connection
        cursor.close()


def drop_table():
    cursor = conn.cursor()

    drop_table_query = f'''
    DROP TABLE IF EXISTS products
    '''

    try:
        cursor.execute(drop_table_query)
        conn.commit()
        return f'Table products dropped successfully'
    except Exception as e:
        conn.rollback()
        return f'Error dropping products table: {e}'
    finally:
        cursor.close()


class Product:
    def __init__(self, name='', price=0, model = '', size = '', color = '', description = '', image_url = ''):
        self.product_id = None
        self.name = name
        self.price = price
        self.model = model
        self.size = size
        self.color = color
        self.description = description
        self.image_url = image_url

create_table()