import psycopg2


def api_add_members(data):

    f_name = data.get('first_name')
    lastname = data.get('last_name')
    numbers = data.get('number')
    Email = data.get('email')
    Address = data.get('address')
    Gender = data.get('gender')
    print(f_name)
    print(lastname)
    print(numbers)
    print(Address)
    print(Gender)

    try:
        db_connection = psycopg2.connect(
            host=  'localhost',
            database="Aikyam",
            user="postgres",
            password="postgres",
            port="5432"
        )
        db_connection.autocommit = True
        cursor = db_connection.cursor()
        
        members_insert_query = """
            INSERT INTO aikyam_finance (first_name, last_name, number, email, address, gender)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(members_insert_query, (f_name, lastname, numbers, Email, Address, Gender))
        
        db_connection.commit()
        cursor.close()

        context = {
            'status': 'success',
        }

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        context = {
            'status': "fail",
        }

    return context
