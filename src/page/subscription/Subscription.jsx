import React, { useEffect, useState } from 'react'
import './Subscription.scss';
import { motion } from "framer-motion"
import Image2 from '../../img/광고배너8.png'
import Image1 from '../../img/광고배너9.png'
import { useNavigate } from 'react-router-dom';
import { useCountUp } from 'react-countup';
import Back from '../../img/왼쪽.png';
import { useSelector } from 'react-redux';
import { LoginSession, LogoutSession, getLoginSession } from '../../util/session'


// 메뉴창에서 정기배송 클릭 시 나타나는 화면
const Subscription = () => {



    const user = useSelector((state) => state.user);

    const nav = useNavigate();
    // 사용자가 로그인했는지 여부(로그인되어있는지 안되어있는지 모르겠지만 일단 안되어있다고(false) 설정해놓겠다는 말)
    const [isLogin, setIsLogin] = useState(false);

    // 로그인 여부 관리(사용자가 로그인했는지를 확인)
    useEffect(() => {
        let Id = getLoginSession().username;
        console.log('123 : ', getLoginSession().username);
        
        if (Id) {  // 근데 만약 사용자가 로그인했다면
            setIsLogin(true);
        }
    }, []);


    // "기초/색조 화장품 구독하러 가기" 버튼 클릭 시 "기초/색조 화장품"라는 글자를 beforepayment에 보내줄 거야~~
    // "기초 화장품 구독하러 가기" 버튼 클릭 시
    const basicMakeup = () => {
        if (isLogin) {  // 로그인되어 있을 시
            // "productType"이라는 키에 "기초 화장품"이라는 값을 저장하여 BeforePayment 페이지로 전달
            nav('/PayShipment', { state: { isSubscription: true } });
        } else {  // 로그인되어 있지 않을 시
            alert("로그인 후 이용해주세요!")
            nav('/login');
        }

    };

    // // "색조 화장품 구독하러 가기" 버튼 클릭 시
    // const colorMakeup = () => {
    //     if(isLogin) {
    //         nav('/SubvueIntroduce', { state: { productType: '색조 화장품' } });
    //     } else {
    //         nav('/login');
    //     }
    // };

       // 로그인 안하고 버튼 클릭시 로그인 페이지로 이동
       const recosub = (e) => {
        if (user !== undefined) {
            nav('/airecommend/'); // 로그인된 경우 추천 페이지로 이동
        } else {
            alert("로그인 후 이용해주세요!")
            nav('/login'); // 로그인되지 않은 경우 로그인 페이지로 이동
        }
    };

    // const SubCountUp = () => {
    //     useCountUp({ ref: 'subsriptioncounter', end: 3000});
    //     return <span id="subsriptioncounter" />;
    //   };

    const CountUp = () => {
        useCountUp({ ref: 'counter', end: 3000 });
        return <span id="counter" />;
    };

    const CountUp1 = () => {
        useCountUp({ ref: 'counter1', end: 10000 });
        return <span id="counter1" />;
    };


    return (


        <div>

            <img className='subscription_back_btn' src={Back} alt="" onClick={() => nav('/')} />
            {/* 제목 */}
            <div className='subscriptiontitle'>
                쓸모없는 고민은 그만! <br />
                미루니를 위한 샘플 정기 배송
            </div>

            {/*  첫줄 정보 박스 */}
            <div className='maintextbox'>
                <div className='nemo_box'>

                    <div className='bord_text'>다양한 샘플들을 구독제로</div>
                    <hr className='line_none'></hr>
                    <div className='nemo_text'>
                        여러 상품을 다양하게 써보고 싶을 때, <br />
                        피부에 잘 맞는 제품을 찾고 싶을 때! <br />
                        부담없이 언제든 구독 해지 가능!
                    </div>


                </div>

                <div className='nemo_box'>
                    <div className='bord_text'>고민할 필요 없이 맞춤형</div>
                    <hr className='line_none'></hr>
                    <div className='nemo_text'>
                        빅데이터 기반 맞춤형 샘플 화장품으로 <br />
                        개인에게 맞는 화장품 정기 배송 <br />
                        고민하며 화장품을 고르는 건 이제 그만!
                    </div>

                </div>

                {/*  둘째줄 정보 박스 */}
                {/* <div className='maintextbox2'> */}
                <div className='nemo_box'>
                    <div className='bord_text'>편리한 자동결제/무료배송</div>
                    <hr className='line_none'></hr>
                    <div className='nemo_text'>
                        정해진 날에 결제하고 알아서 집까지! <br />
                        맞춤형 추천 샘플 정기 배송 상품은 <br />
                        항상 무료 배송!
                    </div>
                </div>

                <div className='nemo_box'>
                    <div className='bord_text'>구독 후 피부타입 진단까지</div>
                    <hr className='line_none'></hr>
                    <div className='nemo_text'>
                        구독자들에게만 주는 혜택! <br />
                        구독 후 내 피부타입을 알고 싶을 때, <br />
                        언제든지 진단 가능!
                    </div>

                </div>
                {/* </div> */}
            </div>



            {/* 구독 설명 영역 */}
            <div className='gudog_titlebox'>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{
                        ease: 'easeInOut',
                        duration: 2,
                        x: { duration: 1 },
                    }}
                >

                    <div className='gudogbox_text'>

                        <img src={Image1} className='gudog_img' />
                            <div className='premium_free'>[Premium]</div>
                        <div className='gudog_titletext'>
                            <div className='gudogprice_title'>
                                <CountUp1 />
                                개의 데이터 분석을 통한  <br />
                                추천 화장품을 고민 없이 사용해보고 싶다면?
                            </div>
                            <hr className='line_none'></hr>
                            <div className='gudog_basictext'>
                                빅데이터 알고리즘 반영! <br />
                                사용자 맞춤형 샘플 5가지 제공!<br />
                                {/* 월 정기결제, 기초 샘플 기준 <br /> */}
                                기초 샘플 구독 월 20,000원!<br />
                                배송비 무료!
                            </div>
                        </div>
                        <hr className='line_none'></hr>
                        
                            <a className="gudog_go_btn btn-5" onClick={basicMakeup}>구독하러 가기</a>
                        
                    </div>

                </motion.div>

                {/* <div className='freeexplainmainbox'> */}
                {/* 무료 설명 영역 */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{
                        ease: 'easeInOut',
                        duration: 1,
                        x: { duration: 1 },
                    }}
                >

                    <div className='gudogbox_text'>
                        <div className='gudog_imgtitle'>
                            <img src={Image2} className='gudog_img' />
                                <div className='premium_free'>[Free]</div>
                            <div className='gudog_titletext'>
                                <div className='gudogprice_title'>
                                {/* 비구독자를 위해 <br /> */}
                                <CountUp end={3000}/>개의 데이터 분석을 통한   <br />
                                비구독자용 무료 추천 화장품을 보고 싶다면?
                                </div>
                                <hr className='line_none'></hr>
                                <div className='gudog_basictext'>
                                    빅데이터 알고리즘 반영! <br />
                                    피부 특성 분석 후 비구독자를 위해 <br />
                                    무료로 사용자 맞춤형 샘플 추천!
                                    <br /><br />
                                </div>
                            </div>
                            <hr className='line_none'></hr>
                        
                            <a className="gudog_go_btn btn-5" onClick={() => recosub()}>확인하러 가기</a>
                        

                        </div>
                        {/* <div class="basichuebutton">
                        <a class="basichuebutton btn-5" onClick={basicpluscolorMakeup}>기초&색조 화장품 구독하러 가기</a>
                    </div> */}
                    </div>
                </motion.div>
                {/* </div> */}
            </div>

        </div>
    )
}

export default Subscription