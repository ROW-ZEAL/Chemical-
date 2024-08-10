import psycopg2
from rest_framework.response import Response

def api_delete_members(data):
    id = data.get('id')
    print(id)

    try:
        db_connection = psycopg2.connect(
            host='localhost',
            database="Aikyam",
            user="postgres",
            password="jayhind",
            port="5432"
        )
        db_connection.autocommit = True
        cursor = db_connection.cursor()
        
        members_delete_query = """DELETE FROM aikyam_finance WHERE id = %s;"""
        cursor.execute(members_delete_query, (id,))
        
        cursor.close()
        db_connection.close()

        context = {
            'status': 'success',
        }

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        context = {
            'status': 'fail',
            'error': str(error)
        }

    return context