import psycopg2
from flask import Blueprint
from database import conn
from flask_login import UserMixin

def create_table():
    # Connection parameters

    # Create a cursor object to execute SQL queries
    cursor = conn.cursor()

    # SQL statement to create a 'users' table
    create_table_query = '''
        CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            email VARCHAR(255),
            password VARCHAR(255),
            github VARCHAR(255)
        )
    '''

    try:
        # Execute the SQL query to create the table
        cursor.execute(create_table_query)
        conn.commit()
        return 'Table users created successfully'
    except Exception as e:
        conn.rollback()
        return f'Error: {e}'
    finally:
        # Close cursor and connection
        cursor.close()


def drop_table():
    cursor = conn.cursor()

    drop_table_query = '''
    DROP TABLE IF EXISTS users
    '''

    try:
        cursor.execute(drop_table_query)
        conn.commit()
        return f'Table users dropped successfully'
    except Exception as e:
        conn.rollback()
        return f'Error dropping users table: {e}'
    finally:
        cursor.close()


class User(UserMixin):
    def __init__(self, first_name='', last_name='', email='', password='', github='', user_id = None):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.user_id = user_id
        self.github = github
    

    def add_user_to_db(self):
        cursor = conn.cursor()
        

        insert_query = '''
        INSERT INTO users (first_name, last_name, email, password, github)
        VALUES (%s, %s, %s, %s, %s) RETURNING user_id
        '''
        data = (self.first_name, self.last_name, self.email, self.password, self.github)

        try:
            cursor.execute(insert_query, data)
            user_id = cursor.fetchone()[0]
            conn.commit()
            cursor.close()
            self.user_id = user_id
            return user_id
        except Exception as e:
            conn.rollback()
            cursor.close()
            raise e

    def get_id(self):
        return self.user_id

create_table()