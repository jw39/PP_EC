import React, { useEffect, useState } from 'react'
import './AiRecommend.scss'
// import useCountUp from './UseCountUp'
import { useCountUp } from 'react-countup';
import { getDay, titleList, userAgeList, userTypeList } from "../../util/utilStr";
import { useSelector } from 'react-redux';
import Itemview from "../../components/itemview/Itemview"
import { useRef } from 'react';
import Star from '../../img/별.png'
import { setIcon } from '../../util/util'
import { useNavigate, useParams } from 'react-router-dom';
import { LogoutSession, getLoginSession } from '../../util/session'
import axios from 'axios';
import reducer from '../../redux/reducer/reducer'
import { URL } from '../../util/util'
import goback from '../../img/왼쪽.png'

const AiRecommend = () => {
    const nav = useNavigate();

    // redux 임시 데이터로 이용
    const homeCateMain = useSelector(state => state.homeCategory)
    const USER = useSelector(state=>state.user)
    // 데이터 저장
    const [user, setUser] = useState();
    const [data_sub, setDataSub] = useState();
    const [data_non_sub, setDataNonSub] = useState();

    const [sub, setSub] = useState();

    console.log('구독 여부 : ', sub);
    
    
    
    useEffect(() => {
        const LoadUsersData = async () => {
            const user_id = getLoginSession().username
            
            // 1. 유저 데이터
            const user_response = await axios.get(URL + '/TestDY?user_id='+user_id);
            console.log('user_response : ', user_response);
            setUser({user_nm: user_response.data[0].user_nm,
                user_age: user_response.data[0].user_age,
                user_sex: user_response.data[0].user_sex,
                skin_type: user_response.data[0].skin_type})
                
            const user = {user_nm: user_response.data[0].user_nm,
                user_age: user_response.data[0].user_age,
                user_sex: user_response.data[0].user_sex,
                skin_type: user_response.data[0].skin_type}
                
                
                // 2. 비구독자 추천 데이터
                const reco_non_sub = await axios.get(URL + '/Recommend' , {
                    params: {
                        sub: false,
                        user_nm: user.user_nm,
                        user_age: user.user_age,
                        user_sex: user.user_sex,
                        skin_type: user.skin_type
                    }
                });
                console.log('비구독자 data : ', reco_non_sub.data);
                setDataNonSub(reco_non_sub.data)
                
                
                // 2. 구독자 추천 데이터
                const reco_sub = await axios.get(URL + '/Recommend', {
                    params: {
                        sub: true,
                        user_nm: user.user_nm,
                        user_age: user.user_age,
                        user_sex: user.user_sex,
                        skin_type: user.skin_type
                    }
                });
                console.log('구독자 data : ', reco_sub.data);
                setDataSub(reco_sub.data)
            }
            // 화면이 첫 랜더링 될 때 함수 실행
            LoadUsersData();
            setSub(getLoginSession().sub)
        }, []);


    const CountUp = ({ start, end }) => {
        const countUpRef = useRef(null);
        const [countUpStart, setCountUpStart] = useState(start);
    
        const { start: countUpStartFunction, reset } = useCountUp({
            ref: countUpRef,
            end,
            start: countUpStart,
            duration: 2
        });
    
        useEffect(() => {
            reset(); // 카운트업 상태를 리셋합니다.
            setCountUpStart(start); // 새로운 시작 값을 설정합니다.
            countUpStartFunction(); // 카운트업 애니메이션 시작합니다.
        }, [start, end, countUpStartFunction, reset]);
    
        return <span id="counter" ref={countUpRef} />;
    };

    // const CountUp = ({ end, user }) => {
    //     const countUpRef = useRef(null);
    //     const { start, reset } = useCountUp({
    //         ref: countUpRef,
    //         end,
    //         duration: 2 // duration을 적절히 설정
    //     });
    
    //     useEffect(() => {
    //         // `user`가 변경될 때마다 카운트업을 재시작합니다.
    //         reset(); // 이전 카운트업 상태를 리셋합니다.
    //         start(); // 카운트업 시작합니다.
    //     }, []); // `user`가 변경될 때마다 useEffect가 실행됩니다.
    
    //     return <span id="counter" ref={countUpRef} />;
    // };



    const handleClick1 = () => {
        // 페이지 상단으로 스크롤 이동
        window.scrollTo({ top: 0 });

        // 네비게이션 이동
        nav('/subscription');
    };

    const style = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '15px',
        marginRight: '15px',
        marginLeft: '-4px',
        ...(sub=='1' ? {
            // sub이 true일 때 추가 스타일
            // 예를 들면 추가적인 스타일이 필요한 경우
            filter: 'blur(0px)', WebkitFilter: 'blur(0px)', pointerEvents: 'auto',
            
        } : {
            // sub이 false일 때 추가 스타일
            // 예를 들면 다른 스타일이 필요한 경우
            filter: 'blur(18px)', WebkitFilter: 'blur(18px)', pointerEvents: 'none',
        })
    };

    // const style = {
    //     if (sub){
    //         filter: 'blur(18px)', 
    //         WebkitFilter: 'blur(18px)', // -webkit-filter의 camelCase 표기
    //         display: 'flex',
    //         justifyContent: 'center',
    //         marginTop: '15px',
    //         pointerEvents: 'none', // 클릭 이벤트를 차단합니다
    //         marginRight: '15px',
    //         marginLeft: '-4px',
    //     }else{
    //         filter: 'blur(18px)', 
    //         WebkitFilter: 'blur(18px)', // -webkit-filter의 camelCase 표기
    //         display: 'flex',
    //         justifyContent: 'center',
    //         marginTop: '15px',
    //         pointerEvents: 'none', // 클릭 이벤트를 차단합니다
    //         marginRight: '15px',
    //         marginLeft: '-4px',
    //     }
    // };


    const [startValue, setStartValue] = useState(3000); // 시작 값을 상태로 관리
    const [endValue, setEndValue] = useState(3000); // 종료 값을 상태로 관리
    return (
        <div>
            {/* 회원 추천 쪽 */}
            <img src={goback} className="aigoback" onClick={() => nav(-1)} width={20} height={20}></img>
            <div className='airecommenduser'>
                <span className='recommendid'>{getLoginSession().usernm}</span>님의 맞춤형 추천 화장품
            </div>

            {/* 비구독자 전용 화장품 구역 */}
            <div className='notsubscribe'>
                <span className='notsubscribetext'>비구독자 전용</span>
                <div className='countup'>
                    {data_non_sub?
                    <CountUp start={3000} end={3000} />:
                    <CountUp end={3000} />}
                    <div className='notsubscribetext1'>
                        개의 회원들의 데이터 분석을 통해 추천해주는 화장품
                    </div>
                </div>
                <hr className='thin_grayline' />
                <div>
                    <span className='notsubcoslist'>
                        {data_non_sub ?
                            <Itemview data={data_non_sub}/> :
                            <Itemview data={{}} />}
                    </span>
                </div>
            </div>
            <hr className='thick_grayline' />
            {/* 구독자 전용 화장품 구역 */}
            <div className='subscribe'>
                <span className='subscribetext'>구독자 전용</span>
                <div className='countup1'>
                {data_non_sub?
                    <CountUp start={183027} end={183027} />:
                    <CountUp end={183027} />}
                    <div className='subscribetext1'>
                        개의 회원들의 데이터 분석을 통해 추천해주는 화장품
                    </div>
                </div>
                <hr className='thin_grayline' />
                    {sub=='1'?'':
                        <div className='maketosub'>
                                <span className='maketosubtext'>구독자 전용 추천 화장품이 보고 싶다면?</span>
                                <button className='maketosubbtn' onClick={handleClick1}>구독하러 가기</button>
                        </div>
                    }

                <span className='subscribecos' style={style}>
                    {data_sub ?
                        <Itemview data={data_sub}/>
                        :<Itemview data={{}} />}
                </span>
            </div>
        </div>
    )
}

export default AiRecommend