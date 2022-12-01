
from flask import Flask, request
from flask_cors import CORS
import logging
import os

###

import psycopg2

DATABASE= 'postgres'
USER = 'user'
PASSWORD = 'p4ssw0rd'
HOST = 'localhost'
PORT = 8100

###
# import connect

app = Flask(__name__)
#this enables cors from every entrypoint
CORS(app)
logging.getLogger('flask_cors').level = logging.DEBUG

@app.route('/')
def hello():
    return [
        {
            "name":"Gilbert Fife",
            "address":"3500 Deer Creek Road",
            "zipcode":"94304",
            "city":"Palo Alto",
            "state":"CA",
            "country":"United States"
        }
    ]

@app.route('/addressbook', methods=['GET'])
def getAddresses():
    id = request.args.get('id')
    return getAddress(id)

@app.route('/addressbook', methods=['POST'])
def setAddress():
    id = request.args.get('id')
    data = request.json
    print(request.json)
    return addAddress(id,data)

@app.route('/register',methods=['POST'])
def registeruser():
    username= request.form.get('user')
    password = request.form.get('password')
    # connect.createUser(username,password)
    

@app.route('/login')
def login():
    username = request.args.get('username')
    password = request.args.get('password')
    # return connect.getUserID(username,password)

###

def getAddress(user:int):
    conn=None
    sql = """SELECT name, address, zipcode, city, state, country FROM Address WHERE userid = %s"""
    rows=[]
    try:
        conn = psycopg2.connect(dbname=DATABASE,user=USER,password=PASSWORD,host=HOST,port=PORT)
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
    return {"data":rows}

def addAddress(user:int,data:dict):
    conn=None
    sql = """INSERT INTO Address (userid, name, address, zipcode, city, state, country) VALUES(%s,%s,%s,%s,%s,%s,%s)"""
    try:
        conn = psycopg2.connect(dbname=DATABASE,user=USER,password=PASSWORD,host=HOST,port=PORT)
        cur = conn.cursor()
        values = [int(user),data['name'],data['address'],data['zipcode'],data['city'],data['state'],data['country'] or '' ]
        cur.execute(sql,(*values,))
        cur.close()
    except (Exception, psycopg2.Error) as error:
        print("Error fetching data from PostgreSQL table", error)

    finally:
        if conn is not None:
            conn.close()
    return {}

###
if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0',port=port)