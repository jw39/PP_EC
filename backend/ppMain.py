from flask_restx import Resource
from flask import jsonify, request
from db_utils import setQuery

# 메인화면 중 배너 데이터 전송 서버
class ppMainPage(Resource):

    def get(self):
        data = setQuery("""select idx, brand_name, cos_name, cos_img_src, 
                            grade, grade_count, price, vol
                            from result_product limit 100""")
        return jsonify(data)
    

# 메인 화면 중 카테고리 선택 후 데이터 전송 서버
class ppCategorySel(Resource):

    def get(self):

        query1 = ""
        query2 = ""
        
        data = request.args.to_dict()
        cateValue = data['category']
        cateValue2 = data['category2']

        if(cateValue == "카테고리 전체"):
            pass
        else:
            query1 = "where category ='" + cateValue+"'"
            if(cateValue2 == "전체"):
                pass
            else:
                query2 = " and category_2='" + cateValue2 + "'"
        
        
        # data = setQuery('select * from result_product limit 6')
        data = setQuery(f'select * from result_product {query1 + query2} ')
        # data = setQuery("""select * from cos_data""")
        return jsonify(data)
    


# 메인 화면 중 나이대별 추천 데이터 전송 서버
class ppSuggestAge(Resource):

    def get(self):
        ageDic = request.args.to_dict()
        age = int(ageDic['age'])
        # print(type(age))
        oldAge = age + 9
        # print("oldAge" , oldAge)
        data = setQuery("select * from result_product where idx = 3")
        twoOldAge = age + 30
        if (age == 50) :
            data = setQuery(""" SELECT p.*
                                FROM result_product p
                                JOIN result_review r ON p.idx = r.cos_idx
                                JOIN result_users u ON r.user_idx = u.user_id
                                WHERE u.user_age BETWEEN %s AND %s
                                GROUP BY p.idx, p.brand_name, p.cos_name, p.cos_img_src, p.grade, p.grade_count, p.price, p.vol, p.ranking, p.category
                                 ORDER BY COUNT(*) DESC
                                LIMIT 100; """, (age, twoOldAge))
        elif (age < 50) :
            data = setQuery(""" SELECT p.*
                                FROM result_product p
                                JOIN result_review r ON p.idx = r.cos_idx
                                JOIN result_users u ON r.user_idx = u.user_id
                                WHERE u.user_age BETWEEN %s AND %s
                                GROUP BY p.idx, p.brand_name, p.cos_name, p.cos_img_src, p.grade, p.grade_count, p.price, p.vol, p.ranking, p.category
                                 ORDER BY COUNT(*) DESC
                                LIMIT 100;""", (age, oldAge))

        return jsonify(data)
            
 

# 피부 타입 별 랭킹 쿼리문 전송 서버
class ppSuggestSkinType(Resource):

    def get(self):
        TypeDic = request.args.to_dict()
        skintype = TypeDic['skintype']
        data = setQuery(""" SELECT p.*
                                FROM result_product p
                                JOIN result_review r ON p.idx = r.cos_idx
                                JOIN result_users u ON r.user_idx = u.user_id
                                WHERE u.skin_type = %s
                                AND (p.category = '스킨케어' OR p.category = '클렌징')
                                GROUP BY p.idx, p.brand_name, p.cos_name, p.cos_img_src, p.grade, p.grade_count, p.price, p.vol, p.ranking, p.category
                                ORDER BY COUNT(*) DESC
                                LIMIT 100; """, skintype)
        
        return jsonify(data)
    


# 리뷰 긍정 점수 높은 제품 100개 전송
class ppPositiveScore(Resource):
    def get(self):
        data = setQuery(""" select round(rs.review_positive, 6) as review_score, rp.*
                            from result_review_score rs
                            join result_product rp on rp.idx = rs.product_idx
                            order by review_positive desc
                            limit 100;
                            """)
        print("dataaaaaaaaaaaaaaaaaa", data[0])
        return jsonify(data)

