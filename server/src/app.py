
from flask import Flask, request
from flask_cors import CORS

import connect

app = Flask(__name__)
#this enables cors from every entrypoint
#TODO: add options to specify only web app
CORS(app)

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
    return connect.getAddress(id)

@app.route('/addressbook', methods=['POST'])
def setAddress():
    id = request.args.get('id')
    data = request.json
    return connect.addAddress(id,data)

@app.route('/register',methods=['POST'])
def registeruser():
    username= request.json.get('user')
    password = request.json.get('password')
    return connect.createUser(username,password)
    

@app.route('/login')
def login():
    username = request.args.get('username')
    password = request.args.get('password')
    return connect.getUserID(username,password)

