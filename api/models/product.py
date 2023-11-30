import psycopg2
from flask import Blueprint
from database import conn


class Product:
    def __init__(self):
        self.table_name = 'products'

    def create_table(self):
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
                description TEXT
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


    def drop_table(self):
        cursor = conn.cursor()

        drop_table_query = f'''
        DROP TABLE IF EXISTS {self.table_name}
        '''

        try:
            cursor.execute(drop_table_query)
            conn.commit()
            return f'Table {self.table_name} dropped successfully'
        except Exception as e:
            conn.rollback()
            return f'Error dropping {self.table_name} table: {e}'
        finally:
            cursor.close()


product = Product()
product.create_table()