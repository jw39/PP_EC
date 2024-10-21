
from flask_restx import Resource
from flask import request, jsonify
from db_utils import setQuery, PostCartQuery

# 장바구니에 상품 insert하는 서버, 이미 있는 제품이라면 수량과 총가격 업데이트
class ppAddCart(Resource):
    def post(self):
        # 프론트엔드에서 받은 JSON 데이터를 파싱
        value = request.get_json()
        # print("addcart : ", value)

        data = value['data']
        print(data)
        # 데이터에서 필요한 값들을 추출
        userid = data['userid']
        idx = int(data['categorynumber'])
        price = int(data['cosmeticprice'])
        buy_cnt = int(data['cosmeticcount'])
        total_price = price * buy_cnt

        try:
            # 사용자가 동일한 상품을 장바구니에 이미 담았는지 확인하는 쿼리
            check_sql = "SELECT buy_cnt FROM result_cart_item WHERE user_id = %s AND idx = %s"
            existing_item = setQuery(check_sql, (userid, idx))

            if existing_item:
                # 만약 동일한 상품이 이미 장바구니에 있다면, 수량과 총 금액을 업데이트
                new_buy_cnt = existing_item[0]['buy_cnt'] + buy_cnt  # 기존 수량에 새로 추가된 수량 더함
                new_total_price = price * new_buy_cnt  # 새로운 총 금액 계산

                # 업데이트 쿼리 실행
                update_sql = """
                    UPDATE result_cart_item
                    SET buy_cnt = %s, total_price = %s
                    WHERE user_id = %s AND idx = %s
                """
                update_values = (new_buy_cnt, new_total_price, userid, idx)
                PostCartQuery(update_sql, update_values)

            else:
                    # 장바구니에 항목이 없으면 새로 추가
                    insert_sql = """
                        INSERT INTO result_cart_item (user_id, idx, cos_name, price, buy_cnt, total_price, cos_img_src, is_selected)
                        SELECT
                            %s AS user_id,
                            %s AS idx,
                            p.cos_name,
                            p.price,
                            %s AS buy_cnt,
                            %s AS total_price,
                            p.cos_img_src,
                            TRUE AS is_selected
                        FROM
                            result_product p
                        WHERE
                            p.idx = %s
                    """
                    insert_values = (userid, idx, buy_cnt, total_price, idx)
                    PostCartQuery(insert_sql, insert_values)

        except Exception:
            return jsonify({"message": "An error occurred."}), 500

        return jsonify({"message": "Operation completed successfully."})



# 해당 사용자가 장바구니에 담은 데이터 보내주는 서버
class ppOrderCart(Resource):
    def get(self):
        # 요청에서 사용자 ID를 파싱
        value = request.args.to_dict()
        userid = value.get('userid')

        sql = """
            SELECT
                rci.user_id,
                rci.idx,
                rci.cos_name,
                rci.price,
                rci.buy_cnt,
                rci.total_price,
                rci.cos_img_src,
                rci.is_selected,
                rp.brand_name,
                rp.vol
            FROM
                result_cart_item rci
            JOIN
                result_product rp
            ON
                rci.idx = rp.idx
            WHERE
                rci.user_id = %s
        """
        data = setQuery(sql, (userid,))
        return jsonify(data)
    

# 사용자가 구매했다고 체크박스에 체크하고 주문하기 누르면 그때 is_seleted 데이터 업데이트하는 쿼리문
# true 값만 주문하기 페이지에 보내면 됨
    def post(self):
        value = request.get_json()
        data = value['data']

        user_id = data[0]['user_id']  # 사용자 ID는 모든 항목에서 동일하다고 가정

        # SQL 쿼리의 CASE 문을 사용하여 업데이트 쿼리 생성
        case_statements = [] 
        values = []

        # data는 사용자 아이디에 대한 데이터들, item은 각 튜플 반복시킬 변수명
        for item in data:
            idx = item.get('idx') #여기로 각 튜플에 idx 담아옴
            is_selected = item.get('is_selected') # 여긴 각 튜플의 is_seleted 값을 가져옴

            if idx is not None and is_selected is not None:
                case_statements.append(f"WHEN %s THEN %s") # 만약 none이 아니라면 when %s then %s 절 추가하고
                values.extend([idx, is_selected]) # 해당하는 value(idx, is_selected) 삽입

        case_statements_str = ' '.join(case_statements) # when (idx) then (is_selected) 어쩌고를 공백으로 연결

        update_sql = f"""
            UPDATE result_cart_item
            SET is_selected = CASE idx
                {case_statements_str}  
                ELSE is_selected
            END
            WHERE user_id = %s
        """
        # ex) {case_statements_str} = when 1 then 1 when 2 then 0 when 3 then 1 -> 이게 프론트에서 지정해준 값
        # 이 값으로 idx가 1일 때 then이 0으로 되어있으면 나도 0으로 update 하겠다 라는 의미

        # 사용자 ID 추가
        values.append(user_id)

        # 쿼리 실행
        PostCartQuery(update_sql, values)



# 사용자가 장바구니 화면에서 상품 삭제 시 
class ppDeleteCartItems(Resource):
    def delete(self):
        # 프론트엔드에서 받은 JSON 데이터를 파싱
        data = request.get_json()
        

        # data = value['data']
        user_id = data[0]['user_id']  # 사용자 ID는 모든 항목에서 동일하다고 가정

        # 선택된 항목의 idx 리스트 생성
        idx_list = [item['idx'] for item in data if item.get('is_selected') == 1]

        # if not idx_list:
        #     return jsonify({"message": "No selected items to delete."}), 200  # 선택된 항목이 없으면 200 응답

        # 'idx' 리스트를 쿼리에 사용할 포맷 문자열로 변환
        format_strings = ','.join(['%s'] * len(idx_list))
        delete_sql = f"""
            DELETE FROM result_cart_item
            WHERE user_id = %s AND idx IN ({format_strings})
        """

        # 사용자 ID와 인덱스 리스트를 쿼리 실행에 필요한 데이터로 변환
        values = [user_id] + idx_list

        PostCartQuery(delete_sql, values)

        # try:
        #     # 쿼리 실행
        #     PostCartQuery(delete_sql, values)
        #     return jsonify({"message": "Selected items deleted successfully."})
        # except Exception as e:
        #     print(f"Error: {e}")
        #     return jsonify({"message": "An error occurred."}), 500
        

    
# 사용자가 주문하기 누르면 체크박스 선택한 애들 데이터만 전송
class ppOrder(Resource):
    def get(self):
        # 요청에서 사용자 ID를 파싱
        value = request.args.to_dict()
        userid = value.get('userid')

        sql = """
            SELECT
                rci.user_id,
                rci.idx,
                rci.cos_name,
                rci.price,
                rci.buy_cnt,
                rci.total_price,
                rci.cos_img_src,
                rci.is_selected,
                rp.brand_name,
                rp.vol
            FROM
                result_cart_item rci
            JOIN
                result_product rp
            ON
                rci.idx = rp.idx
            WHERE
                rci.user_id = %s and is_selected = 1;
        """
        data = setQuery(sql, (userid,))
        return jsonify(data)
    

# 사용자가 수량을 증감했을 시 update 하는 서버
class ppUpdateCartCnt(Resource):
    def post(self):

        # value = {
        #             "user_id": "aa11",
        #             "idx": 1,
        #             "action": "increase" 
        #         } 
        # 여기에 이 데이터만 잘 들어오면 됨
        
        # 프론트엔드에서 받은 JSON 데이터를 파싱
        value = request.get_json()['data']
        # ['data'] 키워드 붙혀서 오류해결
        # print("Update Cart Data: ", value)  # 디버깅 용도로 현재 데이터 출력

        # JSON 데이터에서 사용자 ID와 상품 인덱스 및 조정 방향 추출
        user_id = value['user_id']
        idx = int(value['idx'])
        action = value['action']  # 'increase' 또는 'decrease'로 수량 조정 방향을 구분
        increment = 1 if action == 'increase' else -1
        try:
            # 현재 장바구니에서 해당 상품의 정보를 가져오는 쿼리
            check_sql = "SELECT buy_cnt, price FROM result_cart_item WHERE user_id = %s AND idx = %s"
            existing_item = setQuery(check_sql, (user_id, idx))
            # if not existing_item:
            #     return jsonify({"message": "Item not found in cart."}), 404

            # 현재 수량 및 가격
            current_buy_cnt = existing_item[0]['buy_cnt']
            current_price = existing_item[0]['price']
            # 새로운 수량 및 총 가격 계산
            new_buy_cnt = current_buy_cnt + increment

            # if new_buy_cnt < 1:
            #     return jsonify({"message": "Quantity cannot be less than 1."}), 400
            
            new_total_price = current_price * new_buy_cnt

            # 업데이트 쿼리 실행
            update_sql = """
                UPDATE result_cart_item
                SET buy_cnt = %s, total_price = %s
                WHERE user_id = %s AND idx = %s
            """
            update_values = (new_buy_cnt, new_total_price, user_id, idx)
            PostCartQuery(update_sql, update_values)

            # 오류난 이유 post요청에서 jsonify 반환이 안되나봄 리턴 주석처리하니깐 정상화 됌
            # return jsonify({"message": "Cart item quantity updated successfully."}), 200
        except Exception as e:
            print(f"Error: {e}")
            # return jsonify({"message": "An error occurred."}), 500


class ppOrderHistoryOne(Resource):
    def get(self):
        value = request.args.to_dict()

        print('payment valllllllllllll', value)
        payment = value['payment']
        idx = value['a_idx']
        

        print('paymenttttttt:', payment)
        print('address idxxxxxxxxxxxxxxxxxxxxxxx', idx)

        data = setQuery("""
                SELECT 
                    ra.phone_num,
                    ra.receive_name,
                    ra.user_address,
                    ro.price
                FROM 
                    result_order ro
                JOIN 
                    result_address ra
                ON 
                    ra.address_idx = ro.address_idx
                WHERE 
                    ro.payment_key = %s
                    AND ra.address_idx = %s
                """, (payment, idx))
        print('nowwwwwwwwwwwwwwwwwwwwwwwww', data)

        return jsonify(data)



class ppSubscribeHistory(Resource):
    def get(self):
        value = request.args.to_dict()
        # print('valllllllllllllllllll', value)

        user_id = value['user_id']
        # order_name = value['order_name']

        data = setQuery("""
                SELECT ro.order_date, ro.payment_key, ro.idx_cnt, rp.*
                FROM result_order ro
                LEFT JOIN result_product rp ON FIND_IN_SET(rp.idx, ro.idx) > 0
                WHERE ro.user_id = %s
                AND ro.order_name = '구독결제'
                order by ro.order_date asc;
                """, user_id)

        return jsonify(data)
    

class ppOrderHistory(Resource):
     def get(self):
        value = request.args.to_dict()

        user_id = value['user_id']

        data = setQuery("""
                SELECT ro.order_date,ro.order_name, ro.payment_key, ro.idx_cnt, rp.*
                FROM result_order ro
                LEFT JOIN result_product rp ON FIND_IN_SET(rp.idx, ro.idx) > 0
                WHERE ro.user_id = %s
                AND not ro.order_name = '구독결제'
                order by ro.order_date asc;
                """, user_id)

        return jsonify(data)
       
       
    