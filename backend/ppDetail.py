from flask_restx import Resource
from flask import jsonify,request
from db_utils import setQuery, PostQuery

# 리뷰 페이지 정보 반환 클래스
class ppDetailPage(Resource):

    def get(self):
        value = request.args.to_dict()
        idx = value['idx']
        # print("now idx : ",idx)
        data = setQuery("select * from result_product where idx = %s", idx)
        # data = setQuery("""select * from cos_data""")
        return jsonify(data)
    

# 리뷰 가져오는 클래스
class ppGetReveiw(Resource):

    def get(self):
        value = request.args.to_dict()
        idx = int(value['idx'])
        # print("idx : ",idx)
        data = setQuery("""SELECT 
                                ru.user_id, 
                                ru.user_nm, 
                                ru.user_age, 
                                ru.skin_type, 
                                ru.user_sex, 
                                rr.review_idx, 
                                rr.review, 
                                rr.rating, 
                                rr.review_reg_dt,
                                p.idx
                            FROM 
                                result_product p
                            JOIN 
                                result_review rr ON p.idx = rr.cos_idx
                            JOIN 
                                result_users ru ON rr.user_idx = ru.user_id
                            WHERE 
                                p.idx = %s
                            order by review_reg_dt desc

                            """, idx)
        # print("dataquery: ", data)
        
        return jsonify(data)
    


# 평점 평균 구하는 클래스
class ppRatingAvg(Resource):

    def get(self):
        value = request.args.to_dict()
        idx = int(value['idx'])
        # print("idx : ",idx)
        data = setQuery("""SELECT ROUND(AVG(rr.rating), 2) AS rating_avg
                            FROM result_review rr
                            JOIN result_product p ON rr.cos_name = p.cos_name
                            WHERE p.idx = %s
                            """, idx)
        return jsonify(data)
    

    
# 평점 개수 구하는 클래스
class ppRatingCnt(Resource):

    def get(self):
        value = request.args.to_dict()
        idx = int(value['idx'])
        # print("idx : ",idx)
        data = setQuery("""SELECT 
                                rating,
                                COUNT(*) AS count
                            FROM 
                                result_review rr
                            JOIN 
                                result_product rp ON rr.cos_name = rp.cos_name
                            WHERE 
                                rp.idx = %s
                            GROUP BY 
                                rating
                            HAVING 
                                rating IN (5, 4, 3, 2, 1)
                            ORDER BY 
                                rating DESC;""", idx)
        return jsonify(data)
    

# 리뷰 개수 구하는 클래스
class ppReviewCnt(Resource):

    def get(self):
        value = request.args.to_dict()
        idx = int(value['idx'])
        # print("idx : ",idx)
        data = setQuery("""SELECT COUNT(*) AS review_count
                            FROM result_review rr
                            JOIN result_product p ON rr.cos_name = p.cos_name
                            WHERE p.idx = %s""", idx)
        return jsonify(data)
    


class ppInsertReview(Resource):
    def post(self):

        # fake_data = {
        #     "data": {
        #         "user_nm": "John Doe",
        #         "cos_name": "순행클렌징폼",
        #         "rating": 5,
        #         "review": "촉촉하네요"
        #     }
        # }

        # value = fake_data
        # data = value['data']

        
        value = request.get_json()['data']
        print("review vallllllllllllllllllll:", value)

        # 데이터에서 필요한 값들을 추출
        nm = value['user_nm']
        cos_name = value['cos_name']
        rating = int(value['rating'])
        review = value['review']
        cos_idx = value['cos_idx']
        user_idx = value['user_id']

         # INSERT 쿼리문 작성
        insert_sql = """
            INSERT INTO result_review (cos_name, user_nm, rating, review, cos_idx, user_idx)
            VALUES (%s, %s, %s, %s, %s, %s) 
            """

        data = (cos_name, nm, rating, review, cos_idx, user_idx)

        PostQuery(insert_sql, data)




class ppGetIngredient(Resource):
    def get(self):
        value = request.args.to_dict()

        # print('result_ingredientttttttttttttttttttttttttttttttttttt', value)

        cos_name = value['cos_name']
       
        data = setQuery("""
                SELECT 
                    *
                FROM 
                    result_ingredient
                WHERE 
                    cos_name = %s
                """, cos_name)
        return jsonify(data)