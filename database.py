import mysql.connector


def get_connection():

    return mysql.connector.connect(
        host="localhost",
        user="root",
        password=".....",
        database="cyberaware"
    )


def save_participant(email):

    connection = get_connection()

    cursor = connection.cursor()

    query = """
        INSERT INTO participants (email)
        VALUES (%s)
    """

    cursor.execute(query, (email,))

    connection.commit()

    cursor.close()
    connection.close()


def save_feedback(thought_real, what_revealed, tried_login):

    connection = get_connection()

    cursor = connection.cursor()

    query = """
        INSERT INTO feedback
        (thought_real, what_revealed, tried_login)
        VALUES (%s, %s, %s)
    """

    cursor.execute(
        query,
        (thought_real, what_revealed, tried_login)
    )

    connection.commit()

    cursor.close()
    connection.close()
