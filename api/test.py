import psycopg2
import os

# Database connection parameters
db_params = {
    'dbname': 'railway',
    'user': 'postgres',
    'password': 'gBc1D34dc*CdB43bDG5Cf3ACAd*fed41',
    'host': 'roundhouse.proxy.rlwy.net',
    'port': '26584'
}

# Establishing a connection to the database
try:
    conn = psycopg2.connect(**db_params)
    # Once connected, you can perform database operations here

    # For example, you can create a cursor and execute queries
    cursor = conn.cursor()
    cursor.execute("SELECT version();")
    db_version = cursor.fetchone()
    print("PostgreSQL database version:", db_version)

    # Close the cursor and connection
    cursor.close()
    conn.close()

except psycopg2.Error as e:
    print("Error connecting to PostgreSQL:", e)
