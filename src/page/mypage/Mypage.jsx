import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../util/util'
import axios from 'axios';
import './Mypage.scss'
import { LogoutSession, getLoginSession } from '../../util/session'
import { useSelector } from 'react-redux';
import Right from "../../img/오른쪽.png"
import Image1 from '../../img/광고배너1.png'
import Image2 from '../../img/광고배너2.png'
import Image3 from '../../img/광고배너3.png'
import Image4 from '../../img/광고배너4.png'
import Image5 from '../../img/광고배너5.png'
import Image6 from '../../img/광고배너6.png'
import Image7 from '../../img/광고배너7.png'
import Image8 from '../../img/광고배너8.png'
import Image9 from '../../img/광고배너9.png'

const Join = () => {
    // 페이지 이동 함수
    const navigate = useNavigate();
    // const join = () => navigate('/join');
    // const login = () => navigate('/login');
    const order = () => navigate('/itemOrder');
    const review = () => navigate('/review');

    const user = useSelector(state => state.user)
    const nav = useNavigate();

    // 로그인 유저 데이터 저장
    const [userData, setUserData] = useState();
    // 로그인 유저 주문/배송 데이터 저장
    const [orderData, setOrderData] = useState();
    // 주문/배송 상태 저장
    const [delState, setDelState] = useState({});
    // 리뷰 데이터 저장
    const [revieData, setReviewData] = useState({});
    

    useEffect(() => {
        const LoadUsersData = async () => {
            // console.log('user_id : ', getLoginSession().username);
            
            // session에 로그인 정보가 있으면 해당 유저의 데이터를 가져옴
            if (getLoginSession().username) {

                // 1. 유저 데이터
                const responseUserData = await axios.get(URL + '/TestUserData', {
                    params: {
                        user_id: getLoginSession().username
                    }
                });
                // console.log('res_user : ', responseUserData.data[0]);

                const res_user = responseUserData.data[0]
                console.log('res_user : ', res_user);
                

                // 2. 주문/배송 데이터
                const responseOrderData = await axios.get(URL + '/TestOrderData', {
                    params: {
                        user_id: res_user.user_id
                    }
                });
                console.log('order_data : ',responseOrderData.data[0]);

                console.log(res_user.user_id);
                // 3. 리뷰 데이터
                const responseReviewData = await axios.get(URL + '/TestReviewData', {
                    params: {
                        user_id: res_user.user_id
                    }
                });
                console.log('review_data : ', responseReviewData.data);
                

                let temp1 = 0
                let temp2 = 0
                let temp3 = 0
                let temp4 = 0
                let temp5 = 0
                
                for (let i=0; i<responseOrderData.data.length; i++){
                    switch (responseOrderData.data[i].delivery_state) {
                        case '주문접수':
                            temp1 += 1;
                            break;
                        case '결제완료':
                            temp2 += 1;
                            break;
                        case '배송 준비':
                            temp3 += 1;
                            break;
                        case '배송중':
                            temp4 += 1;
                            break;
                        case '배송완료':
                            temp5 += 1;
                            break;
                    }
                }
                setDelState({
                    'state1' : temp1,
                    'state2' : temp2,
                    'state3' : temp3,
                    'state4' : temp4,
                    'state5' : temp5
                })
                
                console.log('order_data : ', responseOrderData.data);
                setUserData(res_user)
                setOrderData(responseOrderData.data)
                setReviewData(responseReviewData.data)
                

            }
        };

        // 화면이 첫 랜더링 될 때 함수 실행
        LoadUsersData();
    }, []);

        // 광고배너 이미지 목록
        const images = [Image1, Image2, Image3,Image4,Image5,Image6,Image7,Image8,Image9];
        const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
        // 이미지가 일정 시간마다 변경되도록 설정
        useEffect(() => {
            console.log('Current Image Path:', images[currentImageIndex]);
            const interval = setInterval(() => {
                setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
            }, 3000); // 3초마다 이미지 변경
    
            return () => clearInterval(interval);
        }, [images.length]);

    return (
        <div id='mypage'>
            <div id='head_banner'>

                마이페이지
            </div>

            <div id='main'>
                <div className='fst'>
                    <img src="https://cdn-icons-png.flaticon.com/512/6063/6063734.png" alt="" />
                    <span className='middle'>
                        <h1>{userData ? userData.user_nm : '방문고객'} 님</h1>
                        <span className='bottom'>
                            <p>{userData ? ((
                                userData.user_age < 20 ? '미성년자' :
                                userData.user_age < 30 ? '20대' :
                                userData.user_age < 40 ? '30대' :
                                userData.user_age < 50 ? '40대' :'50대 이상')) : '-'}</p>
                            <p>{userData ? userData.skin_type : '-'}</p>
                        </span>
                    </span>
                    {/* 내 정보 수정
                    <span className='right'>
                        <img src="https://cdn-icons-png.flaticon.com/512/54/54366.png" alt="" />
                    </span> */}
                </div>

                <div className='scd'>
                    <span className='left'>
                        <h2 onClick={order}>주문내역</h2>
                        <p>
                            {orderData?
                            orderData.length:
                            '0'
                            } 개
                        </p>
                    </span>
                    <span className='middle'>
                        <h2 onClick={review}>나의 리뷰</h2>
                        <p>
                            {revieData?
                            revieData.length:
                            '0'
                            } 건
                        </p>
                    </span>
                    <span className='right'>
                        <h2>포인트</h2>
                        <p>240 P</p>
                    </span>
                </div>

                <div className='myPage_gift'>
                    <p>주문/배송 조회</p>
                    <div className='flex_col'>
                        <div>
                            <p className='myPage_count'>
                                {delState?
                                '2':''}
                                {/* delState.state1:'-'} */}
                            </p>
                            <p>주문접수</p>
                        </div>
                        <img src={Right} alt="" />
                        <div>
                            <p className='myPage_count'>
                                {delState?
                                delState.state2:'-'}
                            </p>
                            <p>결제완료</p>
                        </div>
                        <img src={Right} alt="" />
                        <div>
                            <p className='myPage_count'>
                                {delState?
                                '3':''}
                                {/* delState.state3:'-'} */}
                            </p>
                            <p>배송준비중</p>
                        </div>
                        <img src={Right} alt="" />
                        <div>
                            <p className='myPage_count'>
                                {delState?
                                '1':''}
                                {/* delState.state4:'-'} */}
                            </p>
                            <p>배송중</p>
                        </div>
                        <img src={Right} alt="" />
                        <div>
                            <p className='myPage_count'>
                                {delState?
                                '5':''}
                                {/* delState.state5:'-'} */}
                            </p>
                            <p>배송완료</p>
                        </div>
                    </div>
                </div>


                <div className="adbannermain" onClick={() => nav('/airecommend')}>
                    <div className="adbannercontainer">
                    <img src={images[currentImageIndex]} alt="배너 이미지" style={{marginRight:'50px'}} />
                <span className="adbannertext">회원 맞춤 추천 화장품 보러가기</span>
                <a className="adbannerbutton">내 맞춤 추천이 궁금하다면?</a>
                    </div>
                </div>


                <div className='text'>
                    <p>쇼핑 활동</p>
                    <h1 onClick={() => nav("/addressListAll")} > 🚚 배송지 관리</h1>
                    <h1 >🔄 취소/반품/교환 내역</h1>
                </div>



                <div className='text'>
                    <p>구독</p>
                    <h1 className='cursor' onClick={() => navigate("/subscriptionmanagement")}>🎁 정기배송 / 구독관리</h1>
                </div>
                <div className='text'>
                    <p>문의</p>
                    <h1>🎧 고객센터</h1>
                    <h1>📞 1:1 문의</h1>
                    <h1>📎 상품 Q&A</h1>
                    </div>
                    <div className='text'>
                        <p>로그아웃</p>
                        </div>
                    




            </div>


        </div>
    );
};

export default Join;
