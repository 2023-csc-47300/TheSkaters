import psycopg2
from flask import Blueprint
from database import conn

# Create a Blueprint for the product routes
product_blueprint = Blueprint('products', __name__)

@product_blueprint.route('/create_table')
def create_table():
    # Connection parameters

    # Create a cursor object to execute SQL queries
    cursor = conn.cursor()

    # SQL statement to create a 'products' table
    create_table_query = '''
    CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        price NUMERIC
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
        conn.close()