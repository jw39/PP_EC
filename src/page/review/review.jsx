import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/pageheader/PageHeader';
import { showReview, URL } from '../../util/util'
import axios from 'axios';
// import '../itemorderview/ItemOrderView.scss'
import './review.scss'
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
import ShowReview from './ShowReview';

const Review = () => {
    // 페이지 이동 함수
    const navigate = useNavigate();
    // const order = () => navigate('/itemOrder');
    const point = () => navigate('/point');

    // const user = useSelector(state => state.user)

    // 로그인 유저 데이터 저장
    const [userData, setUserData] = useState();
    // 로그인 유저 주문/배송 데이터 저장
    const [orderData, setOrderData] = useState();
    // 주문/배송 상태 저장
    const [delState, setDelState] = useState({});
    // 리뷰 데이터 저장 -> map함수 돌리고싶으면 [] 이용
    const [reviewData, setReviewData] = useState([]);

    
    // 리뷰 데이터 띄워주는 모달창 함수
    const ReviewModalClick = (e) => {
        showReview(<ShowReview/>)
    }
    

    useEffect(() => {
        const LoadUsersData = async () => {
            // session에 로그인 정보가 있으면 해당 유저의 데이터를 가져옴
            if (getLoginSession().username) {
                console.log('user_name : ', getLoginSession().username);

                // 1. 유저 데이터
                const responseUserData = await axios.get(URL + '/TestUserData', {
                    params: {
                        user_id: getLoginSession().username
                    }
                });
                console.log('res_user : ', responseUserData.data[0]);

                const res_user = responseUserData.data[0]
                console.log('res_user : ', res_user)

    //             // 2. 주문/배송 데이터
    //             const responseOrderData = await axios.get(URL + '/TestOrderData', {
    //                 params: {
    //                     user_id: res_user.user_id
    //                 }
    //             });

    //             console.log(res_user.user_id);
                // 3. 리뷰 데이터
                const responseReviewData = await axios.get(URL + '/TestReviewData', {
                    params: {
                        user_id: res_user.user_id
                    }
                });
                console.log('review_data : ', responseReviewData.data);

    //             console.log('order_data : ', responseOrderData.data);
                setUserData(res_user)
    //             setOrderData(responseOrderData.data)
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

    // 날짜 문자열을 원하는 형식으로 변환하는 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 두 자리로 포맷
        const day = String(date.getDate()).padStart(2, '0'); // 일을 두 자리로 포맷
    
        return `${year}-${month}-${day}`;
    };

    return (
        <div id='review'>
            <div id='head'>
                <PageHeader title={"나의 리뷰"} />

                {/* 광고 배너 */}
                <div className="adbannermain" onClick={() => navigate('/airecommend')}>
                    <div className="adbannercontainer">
                        <img src={images[currentImageIndex]} alt="배너 이미지" />
                        <span className="adbannertext">회원 맞춤 추천 화장품 보러가기</span>
                        <a className="adbannerbutton">내 맞춤 추천이 궁금하다면?</a>
                    </div>
                </div>
            </div>

            <div id='main'>
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '60%' }}>화장품 이름</th>
                            <th style={{ width: '10%' }}>별점</th>
                            <th style={{ width: '20%' }}>작성 날짜</th>
                            <th style={{ width: '10%' }}>리뷰</th>
                            
                        </tr>
                    </thead>
                    <tbody style={{}}>
                        {reviewData?<>
                            {reviewData.map((item) => (
                               <ShowReview item={item}/>
                            ))}
                            </>:<></>
                        }
                    </tbody>
                </table>
                    
                
            </div>

        </div>
    );
};

export default Review;
