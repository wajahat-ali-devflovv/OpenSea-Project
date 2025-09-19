import psycopg2
from psycopg2.extras import RealDictCursor

def get_connection():
    return psycopg2.connect(
        dbname="opensea_db",
        user="postgres",
        password="yourpassword",
        host="localhost",
        port="5432",
        cursor_factory=RealDictCursor
    )
