from flask_restx import Resource
from flask import request, jsonify
from db_utils import setQuery

class ppLogin(Resource):
    def post(self):
        data = request.get_json()
        print(data)

        sql = "SELECT * FROM test1 WHERE id = %s AND pw = %s"
        value = data['id'], data['pw']

        result = setQuery(sql, value)
        return jsonify(result)