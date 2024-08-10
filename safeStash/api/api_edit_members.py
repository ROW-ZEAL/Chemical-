import psycopg2

def api_edit_members(data):
    firstName = data.get('first_name')
    lastName = data.get('last_name')
    email = data.get('email')
    number = data.get('number')
    address = data.get('address')
    gender = data.get('gender')
    id = data.get('id')
    print(firstName)
    print(lastName)
    print(email)
    print(number)
    print(address)
    print(gender)
    print(id)
    try:
        db_connection = psycopg2.connect(
            host=  'localhost',
            database="Aikyam",
            user="postgres",
            password="jayhind",
            port="5432"
        )
        db_connection.autocommit = True
        cursor = db_connection.cursor()
        
        members_edit_insert_query = """


            update	aikyam_finance set
	first_name = %s,
	last_name = %s,
	number = %s,
	email = %s,
	address = %s,
	gender = %s
where
	id = %s;
        """
        cursor.execute(members_edit_insert_query, (firstName, lastName, number, email, address, gender, id))
        
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
