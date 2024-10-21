import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"
import CustomSwiper from '../../components/customswiper/CustomSwiper'
import { Navigate, useNavigate } from "react-router-dom";
import InputBox from "../../components/inputbox/InputBox";
import { sendGet, sendPost, showMap, showPayMent, URL } from "../../util/util";
import Category from "../../components/category/Category";
import Itemview from "../../components/itemview/Itemview"
import './Home.scss'
import Right from '../../img/오른쪽.png'
import Image1 from '../../img/광고배너1.png'
import Image2 from '../../img/광고배너2.png'
import Image3 from '../../img/광고배너3.png'
import Image4 from '../../img/광고배너4.png'
import Image5 from '../../img/광고배너5.png'
import Image6 from '../../img/광고배너6.png'
import Image7 from '../../img/광고배너7.png'
import Image8 from '../../img/광고배너8.png'
import Image9 from '../../img/광고배너9.png'
import Word1 from '../../img/word1.png'
import Word2 from '../../img/word2.png'
import Word3 from '../../img/word3.png'
import Word4 from '../../img/word4.png'
import Word5 from '../../img/word5.png'
import Word6 from '../../img/word6.png'
import Word7 from '../../img/word7.png'

import { getDay, titleList, userAgeList, userTypeList } from "../../util/utilStr";
import { useDispatch, useSelector } from "react-redux";




function show(data) {
    // console.log(data)
}


const Home = () => {
    // 페이지 이동 함수
    const nav = useNavigate();

    const homeCateMain = useSelector(state => state.homeCategory)
    const skinCateMain = useSelector(state => state.homeSkin)
    const ageCateMain = useSelector(state => state.homeAge)
    // 화해 고객들이 직접 선택한 랭킹🎁
    const [data, setData] = useState([]);

    // [] -> 첫 렌더링에만 실행

    useEffect(() => {
        // sendGet(URL + '/MainPage', setData);
        sendGet(URL + '/PositiveScore', setData);
    }, [])


    // 오늘날짜
    let today = new Date()

    function nextTotalPage(pageidx) {
        nav('/totalitem/' + pageidx);
    }


    const user = useSelector((state) => state.user);

    const handleClick = () => {
        if (user !== undefined) {
            // 사용자가 로그인한 경우
            nav('/airecommend');
        } else {
            // 사용자가 로그인하지 않은 경우
            alert("로그인 후 이용해주세요!")
            nav('/login');
        }
    };



    // 광고배너 이미지 목록
    const images = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image9];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // 이미지가 일정 시간마다 변경되도록 설정
    useEffect(() => {
        console.log('Current Image Path:', images[currentImageIndex]);
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 3000); // 3초마다 이미지 변경

        return () => clearInterval(interval);
    }, [images.length]);

    const [day, setDay] = useState(5);
    function changeday(idx) {
        console.log(idx)
        if (idx === 0) {
            setDay(5);
        }
        else {
            setDay(5 + idx);
        }
    }
    const WordList = [
        { cos_img_src: Word1 },
        { cos_img_src: Word2 },
        { cos_img_src: Word3 },
        { cos_img_src: Word4 },
        { cos_img_src: Word5 },
        { cos_img_src: Word6 },
        { cos_img_src: Word7 },

    ]
    return (
        <div className="inner"  >
            {/* // <div id='wrapper' >     */}


            {/* Main */}

            <div className='flex_col width' >
                <InputBox func={show} />
            </div>

            {/* 추천 화장품 광고 배너 */}
            <div className="adbannermain" onClick={handleClick}>
                <div className="adbannercontainer">
                    <img src={images[currentImageIndex]} alt="배너 이미지" />
                    <span className="adbannertext">회원 맞춤 추천 화장품 보러가기</span>
                    <a className="adbannerbutton">내 맞춤 추천이 궁금하다면?</a>
                </div>
            </div>





            {/* 
            <div>
                <CustomSwiper list={data}  />
            </div> */}


            <div className="basic-text cursor personalpick_keyword" >
                {/* <div className="week_keyword">{"< 9월 " + (today.getDate() -1)+ "일 " }~{" 9월 " + (today.getDate() +5)+ "일 > " }</div> */}
                {"9월 " + day + "일 "}
                <span>퍼스널픽 주요 키워드 </span><span style={{fontSize : "14px", color : "orange"}}># 글씨가 클수록 검색을 많이했다는 뜻이에요!</span>
                {/* <span>{"9월 " + (today.getDate() -1)+ "일 " }~{" 9월 " + (today.getDate() +5)+ "일 " }</span> */}
                {/* <img className="category_arrow" src={Right} alt="" /> */}
            </div>

            <div>
                <CustomSwiper list={WordList} type={"word"} func={changeday} />
            </div>

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{
                    ease: 'easeInOut',
                    duration: 0.5,
                    x: { duration: 1 },
                }}
            >
                <div className="basic-text cursor" onClick={() => nextTotalPage(1)}>
                    {(today.getMonth() + 1) + "월 " + today.getDate() + "일 " + getDay(today.getDay())}
                    <span> AI가 분석한 리뷰 긍정 점수 높은 순 🎁 </span>
                    <img className="category_arrow" src={Right} alt="" />
                </div> 
                    <Itemview data={data} />
                <div className="home_page_btn cursor" onClick={() => nextTotalPage(1)} >
                    {'긍정 점수' + ' 전체보기'}
                    <img className="homeright" src={Right} alt="" />
                </div>
            </motion.div>
            {/* 스크롤 내릴시 생기는 애니메이션 div*/}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{
                    ease: 'easeInOut',
                    duration: 0.5,
                    x: { duration: 1 },
                }}
            >


                <div className="cursor basic-text" onClick={() => nextTotalPage(2)}>
                    퍼스널 픽 고객들이 직접
                    <span> 선택한 랭킹🎁 </span>
                    <img className="category_arrow" src={Right} alt="" />
                </div>

                <Category categoryData={titleList} />
                <Itemview data={homeCateMain.data} />

                <div className="home_page_btn cursor" onClick={() => nextTotalPage(2)}>
                    카테고리 전체보기
                    <img className="homeright" src={Right} alt="" />
                </div>
            </motion.div>

            {/* <div className="flex_row perfume">
                <img src="https://dn5hzapyfrpio.cloudfront.net/product/533/533472c0-785a-11ee-82a0-977fcb093fe5.jpeg?w=456" alt="" />
                <div className="basket_fix_btn">
                    향수 매칭 하러 가기
                </div>
            </div> */}

            {/* sendGet으로 필요한 데이터 세 가지 받아오고 그 데이터 이름을 data라는 키 값으로 보내주면 됨! */}

            {/* 스크롤 내릴시 생기는 애니메이션 div */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{
                    ease: 'easeInOut',
                    duration: 0.5,
                    x: { duration: 1 },
                }}
            >
                <div className="basic-text cursor" onClick={() => nextTotalPage(3)}>
                    내 피부에 꼭 맞는 제품 랭킹🏆
                    <img className="category_arrow" src={Right} alt="" />
                </div>

                <Category categoryData={userTypeList} />
                <Itemview data={skinCateMain.data} />

                <div className="home_page_btn cursor" onClick={() => nextTotalPage(3)}>
                    {skinCateMain.choiceKey + ' 전체보기'}
                    <img className="homeright" src={Right} alt="" />
                </div>
            </motion.div>

            {/* 스크롤 내릴시 생기는 애니메이션 div */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{
                    ease: 'easeInOut',
                    duration: 0.5,
                    x: { duration: 1 },
                }}
            >
                <div className="basic-text cursor" onClick={() => nextTotalPage(3)}>
                    나이대별 추천💡
                    <img className="category_arrow" src={Right} alt="" />
                </div>


                <Category categoryData={userAgeList} />
                <Itemview data={ageCateMain.data} />
                <div className="home_page_btn cursor" onClick={() => nextTotalPage(4)}>
                    {ageCateMain.choiceKey + " 전체보기"}
                    <img className="homeright" src={Right} alt="" />
                </div>
            </motion.div>
        </div>


    );
};

export default Home;