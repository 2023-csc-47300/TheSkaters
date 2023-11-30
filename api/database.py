import psycopg2
import os
import dotenv

dotenv.load_dotenv()

db_params = {
    'dbname': 'railway',
    'user': 'postgres',
    'password': 'gBc1D34dc*CdB43bDG5Cf3ACAd*fed41',
    'host': 'roundhouse.proxy.rlwy.net',
    'port': '26584'
}

conn = psycopg2.connect(**db_params)