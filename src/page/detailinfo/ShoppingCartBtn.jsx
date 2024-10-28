import React from 'react'
import { useState, useEffect } from 'react';
import { modalClose } from '../../util/util'
import { URL } from '../../util/util';
import { sendGet } from '../../util/util';
import { sampleSize } from 'lodash';
import close from '../../img/회색엑스.png'


const ShoppingCartBtn = ({ func, func1 , navigate}) => {
  console.log('idx : ', func);



  const [data, setData] = useState([]);
  // 추천받는 화장품
  const [recoData, setRecoData] = useState([]);
  // 추천 화장품 경로
  

  const [randomIndex1, setRandomIndex1] = useState(0);
  const [randomIndex2, setRandomIndex2] = useState(1); // 초기값을 다르게 설정

  const min = 1; // 최솟값
  const max = 120; // 최댓값
  const idx = Math.floor(Math.random() * (max - min + 1)) + min;

  const test = () => {

    console.log('idx : ', idx);
  }

  useEffect(() => {
    sendGet(URL + "/DetailPage?idx=" + idx, setData); // 화장품 정보
  }, []);


  // useEffect(() => {
  //   if (randomIndex1 !== undefined) {
  //     const randomIndex2 = sampleSize([...Array(data.length).keys()], 1)[0];
  //     // randomIndex1과 다른 값으로 설정하기 위해 추가적인 로직 필요
  //     setRandomIndex2(randomIndex2);
  //   }
  // }, [data.length, randomIndex1]);

  // console.log('func : ',func);



  // // 성분 기반 추천
  // useEffect(() => {
  //   sendGet(URL + "/RecoIng?idx=" + idx, setRecoData); // 화장품 정보
  // }, []);

  // 추천 함수
  useEffect(() => {
    console.log('요청 idx : ', func);
    sendGet(URL + "/RecoIng?idx=" + func, setRecoData);
  }, []);
  console.log('recoData : ', recoData);

  // 추천 테스트
  const handleTest = () => {
    console.log('요청 idx : ', func);
    sendGet(URL + "/RecoIng?idx=" + func, setRecoData);
    console.log('recoData : ', recoData);
  };

  
  const handleClick = (idx) => {
    window.location.replace(`/detailinfo/${idx+1}`);
    window.scrollTo({ top: 0 });
  };

  const closeClick = () => {
    modalClose();
  }
  

  return (


    <>
      <div className='shoppingcartfix'>
        <div className="shoppingcart mt-8 px-20">장바구니 담기<img src = {close} width={20} className='closebtn' onClick={closeClick}/></div>
        <hr className='shoppingcartbar' />
        <div className='shoppingcart_box'>
          <span className="addshopping">장바구니에 추가되었습니다.</span>
        </div>
        <div className="shoppincartmainbox">
          <div className='godetailmain'>
            {/* <div class="godetailbutton">
            <a class="godetailbutton btn1 first flex" onClick={() => modalClose()}>쇼핑계속하기</a>
          </div> */}
            <a className="godetailbutton" onClick={() => modalClose()}>쇼핑계속하기</a>
          </div>
          <div className='gotoshoppingmain'>
            {/* <div class="gotoshoppingbutton">
            <a className="gotoshoppingbutton btn1 first flex" onClick={() => func("/cartlist")}>장바구니 이동</a>
          </div> */}
            <a className="gotoshoppingbutton" onClick={() => func1("/cartlist")}>장바구니 이동</a>
          </div>
        </div>
      </div>

      <div className='simillarrecommend'>
        비슷한 성분 추천 상품
      </div>

      {/* 랜덤 추천 상품 */}
      {/* <div className='modalimgmain'> */}
      {/* 랜덤 이미지1 */}
      {/* <button onClick={handleTest}>test</button> */}
      <div className="modalimg">
        {recoData ? (
          <div className='recodataall'>
            {recoData.map((item) => (
              <div key={item.idx} className='recodataall2' onClick={() => handleClick(item.idx)}>
                <img
                  src={item.cos_img_src}
                  alt="코스메틱 이미지"
                  style={{ height: '150px' }}
                />
                <div className='randomcosinfo'>
                  <span className='randombrandname'>{item.cos_name}</span>
                  <span className='randomvolname'>{item.vol}</span>
                  <span className='randomrankingname'>{item.ranking}</span>
                  <span className='randomimgprice'>{item.price}원</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>데이터가 없습니다.</div>
        )}
      </div>
    </>
  );
}

export default ShoppingCartBtn