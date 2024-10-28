from flask_restx import Resource
from flask import request, jsonify
from db_utils import PostQuery
import http.client
import json
class payment(Resource):
    def post(self):
        value = request.get_json()
        # print("value : ",value['data']['paymentKey'])
        # 프론트에서 보내는 정보
        # print("payment from front : ",value['data'])
        conn = http.client.HTTPSConnection("api.tosspayments.com")
        

        payload = ("{\"paymentKey\":\"%s\",\"orderId\":\"%s\",\"amount\":%d}" %(value['data']['paymentKey'], value['data']['orderId'], value['data']['totalAmount']))

        headers = {
            'Authorization': "Basic dGVzdF9za19leDZCSkdRT1ZESjJiZWFZb3c0UThXNHcyek5iOg==",
            'Content-Type': "application/json"
        }

        conn.request("POST", "/v1/payments/confirm", payload, headers)

        res = conn.getresponse()
        data = res.read()

        # print("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", data)
        
        # newData = data.decode("utf-8")
        newData = json.loads(data.decode("utf-8"))
        # print("test :", type({}))
        # print("new Type : ", type(newData))
        print("newdataaaaaaaaaaaaaaaaaaaaaaaaaaaaa :", newData['status'])

        # data2 = value
        # print('data1 : ',value['data']['paymentKey'])

        # data2 = request.get_json()
        # print("data2 : ",data2['data']['paymentKey'])

        insert_sql = '''INSERT INTO result_order (
        user_id, order_name, payment_key,
        address, order_date, price, delivery_state, idx, idx_cnt, address_idx)
        VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'''

        insert_value = (
        # user_id 받아오기
        value['data']['user_id'],
        # order_name
        value['data']['orderName'],
        # payment_key
        value['data']['paymentKey'],
        # address
        value['data']['address'],
        # order_date
        newData['requestedAt'],
        # price
        int(value['data']['totalAmount']),
        # delivery_state
        '배송 준비',
        # idx
        value['data']['itemIdList'],
        # idx_cnt
        value['data']['itemCntList'],
        # address_idx
        int(value['data']['address_idx'])
        )
        # print('sql : ',sql)
        # print('value2 : ',value2)
        # print("주소입니둥둥둥", data['requestedAt'])

        # 결제 성공 후 상품 결제라면 장바구니에서 true인 값들 삭제하는 쿼리
        del_sql = """delete from result_cart_item 
                        where user_id = %s
                        and is_selected = true"""
        
        user_id = value['data']['user_id']

        if newData['status'] == 'DONE' :
            PostQuery(insert_sql, insert_value)
            if value['data']['orderName'] == "구독결제" :
                print("결제 성공")
            else :
                PostQuery(del_sql, user_id)

        # print('insert_order : ',PostQuery(sql, value2))
        # return PostQuery(sql, value2)

       


class Clearpayment(Resource):
    def post(self):
        value = request.get_json()
        print(value)
        conn = http.client.HTTPSConnection("api.tosspayments.com")
        payload = json.dumps({
            "cancelReason": "고객 변심"
        }).encode('utf-8')  # UTF-8로 인코딩
        headers = {
            'Authorization': "Basic dGVzdF9za19leDZCSkdRT1ZESjJiZWFZb3c0UThXNHcyek5iOg==",
            'Content-Type': "application/json"
        }
        url = "/v1/payments/%s/cancel" % (value['data'])
        print(url)
        # conn.request 호출 부분 수정
        conn.request("POST", url, body=payload, headers=headers)
        res = conn.getresponse()
        data = res.read()
        print(data.decode("utf-8"))


