import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../util/util'
import axios from 'axios';
import '../mypage/Mypage.scss'
import { getLoginSession } from '../../util/session'


const Order = (e) => {
    // 페이지 이동 함수
    const navigate = useNavigate();
    // const home = () => navigate('/');
    // const join = () => navigate('/join');
    // const login = () => navigate('/login');
    const mypage = () => navigate('/mypage');
    
    // 로그인 유저 주문/배송 데이터 저장
    const [orderData, setOrderData] = useState([]);
    
    useEffect(() => {
        const LoadUsersData = async () => {
            // session에 로그인 정보가 있으면 해당 유저의 데이터를 가져옴
            if(getLoginSession().username){
                console.log('user_name : ',getLoginSession().username);

                // 1. 주문/배송 데이터
                const responseOrderData = await axios.get(URL + '/TestOrderData',{
                    params : {
                        user_name : getLoginSession().username
                    }
                });
                
                // console.log('OrderData : ',responseOrderData.data);
                
                setOrderData(responseOrderData.data)
            }
        };

        // 화면이 첫 랜더링 될 때 함수 실행
        LoadUsersData();
    }, []);
    // console.log('orderData', orderData);
    
    // 날짜 문자열을 변환
    // Thu, 01 Aug 2024 14:30:00 GMT
    // -> 2020-01-01 09:00
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).replace(',', '') // 날짜와 시간 사이의 쉼표 제거
          .replace(/(\d{4})\/(\d{2})\/(\d{2})/, '$1-$2-$3') // 'YYYY/MM/DD' -> 'YYYY-MM-DD'
          .replace(/(\d{2}):(\d{2}):(\d{2})/, '$1:$2'); // 'HH:mm:ss' -> 'HH:mm'
    };

    return (
        <div id='order'>
        <div id='wrapper'>
            <div id='head'>
                <span className="left">
                    <h2 onClick={mypage}>MyPage</h2>
                </span>
                <span className='middle'>
                    <p>주문/배송 조회</p>
                </span>
                <span className="right">
                    {/* <img src="https://cdn-icons-png.flaticon.com/512/4991/4991422.png" alt=""
                    title="공고 아이콘 제작자: JessHG - Flaticon"/>  */}

                    <img src="https://cdn-icons-png.flaticon.com/512/6861/6861505.png" alt=""
                    title="쇼핑백 아이콘 제작자: IYAHICON - Flaticon"/> 
                </span>
            </div>
            
            <div id='main'>
                <table className='ordertable'>
                    <thead>
                        <tr>
                            <th>주문 번호</th>
                            <th>주문 일자</th>
                            <th>주문 상품</th>
                            <th>결제 금액</th>
                            <th>배송 상태</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData?(
                            orderData.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.order_id}</td>
                                    <td>{formatDate(order.order_date)}</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>{order.order_status}</td>
                                    <td><button>주문취소</button></td>
                                </tr>
                            ))):(
                                <tr>
                                    <td colSpan="6">주문 데이터가 없습니다.</td>
                                </tr>
                            )
                        }


                    </tbody>
                </table>

            </div>

        </div>
        </div>
    );
};

export default Order;