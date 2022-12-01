import os
import psycopg2

DATABASE= os.getenv('DATABASE_NAME')
USER = os.getenv('DATABASE_USER')
PASSWORD = os.getenv('DATABASE_PASSWORD')
HOST = os.getenv('DATABASE_HOST')
PORT = os.getenv('DATABASE_PORT')


def createUser(user:str, password:str):
    sql = """INSERT INTO Users(name,password) VALUES(%s) RETURNING id"""
    conn = None
    id = None
    try:
        conn = psycopg2.connect(dbname=DATABASE, user=USER, password=PASSWORD, host=HOST, port=PORT)
        cur = conn.cursor()
        cur.execute(sql, (user, password,))
        id = cur.fetchone()[0]
        conn.commit()
        cur.close()
    except(Exception,psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
    return id

def getUserID(user:str, password:str):
    sql = """SELECT id FROM Users WHERE name = %s AND password = %s"""
    conn = None
    id = None
    try:
        conn = psycopg2.connect(dbname=DATABASE, user=USER, password=PASSWORD, host=HOST, port=PORT)
        cur = conn.cursor()
        cur.execute(sql,(user,password,))
        record = cur.fetchone()
        id = record
        conn.commit()
        cur.close()
    except(Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
    return id
    
def getAddress(user:int):
    conn = None
    sql = """SELECT name, address, zipcode, city, state, country FROM Address WHERE userid = %s"""
    rows = []
    try:
        conn = psycopg2.connect(dbname=DATABASE, user=USER, password=PASSWORD, host=HOST, port=PORT)
        cur = conn.cursor()

        cur.execute(sql,(user,))
        record = cur.fetchall()
        for r in record:
            rows.append(
                {
                    "name": r[0],
                    "address" :r[1],
                    "zipcode": r[2],
                    "city": r[3],
                    "state": r[4],
                    "country": r[5],
                })
        cur.close()
    except (Exception, psycopg2.Error) as error:
        print("Error fetching data from PostgreSQL table", error)

    finally:
        if conn is not None:
            conn.close()
    return {"data": rows}

def addAddress(user:int, data:dict):
    conn = None
    message = "Error"
    id = -1
    sql = """INSERT INTO Address (userid, name, address, zipcode, city, state, country) VALUES(%s,%s,%s,%s,%s,%s,%s)  RETURNING id"""
    try:
        conn = psycopg2.connect(dbname=DATABASE, user=USER, password=PASSWORD, host=HOST, port=PORT)
        cur = conn.cursor()
        values = [int(user),data['name'],data['address'],data['zipcode'],data['city'],data['state'],data['country'] or '' ]
        cur.execute(sql, (*values,))
        id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        message = "Success"
    except (Exception, psycopg2.Error) as error:
        print("Error fetching data from PostgreSQL table", error)

    finally:
        if conn is not None:
            conn.close()
    return {"message": message, "id": id}