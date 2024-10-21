from flask_restx import Resource
from flask import request, jsonify
from db_utils import PostQuery

class ppJoin(Resource):
    def post(self):
        data = request.get_json()
        print(data)

        sql = "INSERT INTO test1 (name, nickname, id, pw) VALUES(%s, %s, %s, %s)"
        value = data['name'], data['nickname'], data['id'], data['pw']
        # value = request.get_json()['name'], request.get_json()['nickname'], request.get_json()['id'], request.get_json()['pw']
        
        return PostQuery(sql, value)

        # PostQuery(sql, value)
