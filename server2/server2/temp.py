import psycopg2
from os import getenv
from dotenv import load_dotenv
from tabulate import tabulate

load_dotenv()

# Database connection parameters
NAME = getenv('PGDATABASE')
USER = getenv('PGUSER')
PASSWORD = getenv('PGPASSWORD')
HOST = getenv('PGHOST')
PORT = getenv('PGPORT', '5432')  # Default PostgreSQL port

# Connect to the database
try:
    # Establishing the connection
    connection = psycopg2.connect(
        dbname=NAME,
        user=USER,
        password=PASSWORD,
        host=HOST,
        port=PORT
    )
    print("Database connection successful.")

    # Create a cursor to execute SQL commands
    cursor = connection.cursor()

    # Execute a query
    cursor.execute('SELECT "title","Enrollment_Counts","course_type" FROM "Course";')
    records = cursor.fetchall()

    # Fetch column names
    column_names = [desc[0] for desc in cursor.description]

    # Print the results in a prettified table format
    print("\nRecords fetched from the User table:")
    print(tabulate(records, headers=column_names, tablefmt='psql'))

except Exception as e:
    print(f"An error occurred: {e}")

finally:
    # Close the cursor and connection
    if cursor:
        cursor.close()
    if connection:
        connection.close()
