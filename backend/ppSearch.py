from flask_restx import Resource
from flask import request, jsonify
from db_utils import setQuery, searchQuery
from db_connection import db_connection

class ppSearch(Resource):
    def get(self):
        value = request.args.to_dict()
        data = str(value.get('value', ''))
        # print("searDATA : ", data)

        sql = """
                SELECT * 
                FROM result_product 
                WHERE cos_name LIKE %s 
                OR brand_name LIKE %s 
                OR category LIKE %s limit 100
                """
        text = f"%{data}%"
        
        result = setQuery(sql, (text, text, text))
        # print("sql: ", sql)

        return jsonify(result)
    


class ppSearchList(Resource):

    def post(self):
        value = request.get_json()
        # print("val", value)

     # MySQL 데이터베이스 연결
        db = db_connection()
        
        # 데이터베이스 커서 생성
        cursor = db.cursor()

        try:
            delsql = "delete from searchlist"
            searchQuery(cursor, delsql)

            for i in value["data"]:
                print("print:", i)
                insql = f"INSERT INTO searchlist VALUES (%s)"
                searchQuery(cursor, insql, (i,))
                # cursor.execute 메서드는 두 번째 인수로 튜플을 기대하기 때문에 단일 요소 튜플 형식으로 생성한 것

            # DB 변경 사항 커밋
            db.commit()
        except Exception as e:
            # 예외 처리, rollback
            db.rollback()
        finally:
            # DB 연결 종료
            cursor.close()
            db.close()

    
    def get(self):
        list = []
        
        data = setQuery("select * from searchlist")
        for value in data:
            list.append(value['product'])
        # print("select data:", data)
        # print("list : " ,list)
        return list
    

    # def delete(self):
    #     value = request.args.to_dict()
    #     data = str(value['value'])

    #     print("delete val : ", data)

    #     sql = "delete FROM searchlist WHERE product LIKE '%s'"
    #     setQuery(sql, data)

