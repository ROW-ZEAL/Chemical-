import psycopg2


def api_deposit_history(data):
    member = data.get('memberId')
    values = data.get('amount')
    dates = data.get('depositDate')
    print(member)
    print(values)
    print(dates)
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
        
        deposit_amount_insert_query = """
            INSERT INTO deposit (member_id, amount, deposit_date)
            VALUES (%s, %s, %s)
        """
        cursor.execute(deposit_amount_insert_query, (member, values, dates))
        
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



    return  context
