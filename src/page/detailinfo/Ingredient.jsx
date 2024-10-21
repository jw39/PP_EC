import React from 'react'
import { useState, useEffect } from 'react';
import { URL } from '../../util/util';
import { sendGet } from '../../util/util';
import { useParams } from 'react-router-dom';
import './Ingredient.scss'
import close from '../../img/회색엑스.png'
import { modalClose } from '../../util/util';


const Ingredient = (props) => {

  const [cosingredient, setCosIngredient] = useState([]);
const [data, setData] = useState([]);
const [totalIngredients, setTotalIngredients] = useState(0);
const [colorCounts, setColorCounts] = useState({
  low: 0,
  medium: 0,
  high: 0,
  unknown: 0,
});
  const { idx } = props;

  const getRiskCategory = (score) => {
    const numericScore = parseInt(score, 10);

    // 100인 경우 먼저 처리

    if (numericScore === 100) {
      return 'unknown';

    } else if (numericScore >= 7 || 
      score === '1-7' || score === '1-8' || score === '1-9' || score === '1-10' || 
      score === '2-7' || score === '2-8' || score === '2-9' || score === '2-10' || 
      score === '3-7' || score === '3-8' || score === '3-9' || score === '3-10' ||
      score === '4-7' || score === '4-8' || score === '4-9' || score === '4-10' ||
      score === '5-7' || score === '5-8' || score === '5-9' || score === '5-10' || 
      score === '6-7' || score === '6-8' || score === '6-9' || score === '6-10' || 
      score === '7-8' || score === '7-9' || score === '7-10' || 
      score === '8-9' || score === '8-10' || score === '9-10') {
      return 'high';
    } else if (numericScore >= 3 || score === '1-4' || score === '1-5' || score === '1-6' || 
      score === '2-3' || score === '2-4' || score === '2-5' || score === '2-6' || 
      score === '3-4' || score === '3-5' || score === '3-6' || score === '4-5' || 
      score === '4-6' || score === '5-6') {
      return 'medium';
    } else if (numericScore >= 1 || score === '01-02' || score === '01-03') {
      return 'low'; 
    } else {
      return 'unknown'; // Default case for unexpected scores
    }
  };

  // 성분 데이터 받아오기

  useEffect(() => {
    sendGet(URL + "/DetailPage?idx=" + idx, (data) => {
      setData(data);
      console.log('Received data:', data); // 데이터 확인
      if (data.length > 0) {
        sendGet(URL + "/GetIngredient?cos_name=" + data[0].cos_name, (cosData) => {
          setCosIngredient(cosData);
          console.log('Received cosingredient:', cosData); // cosingredient 확인
        });
      }
    });
  }, []);

  // 성분 색깔별로 개수 함수

  useEffect(() => {
    if (cosingredient.length > 0) {
      const colorCounts = cosingredient.reduce((acc, ingredient) => {
        const score = ingredient.score;
        const category = getRiskCategory(score); // Call the function
        acc[category]++;
        return acc;
      }, { low: 0, medium: 0, high: 0, unknown: 0 });
      setColorCounts(colorCounts);
      setTotalIngredients(colorCounts.low + colorCounts.medium + colorCounts.high + colorCounts.unknown);
    }
  }, [cosingredient]);




  useEffect(() => {
    console.log(cosingredient);
    console.log(props);
    
  })

  useEffect(() => {
    setTotalIngredients(cosingredient.length);
  }, [cosingredient]);
  
  // 모달 닫는 버튼
  const closeClick = () => {
    modalClose();
  }


  return (
    <div>
      {/* 성분 구성 */}
      <div className="ingredientcomposition mt-8 px-20">
        <span className="compositiontext">성분 구성</span>
        <span className='totaling'>{totalIngredients}</span>
        개<img src = {close} width={25} className='closebtn1' onClick={closeClick}/>
      </div>
  
      {/* 성분 구성 위험 단계 */}
      <div className="colordanger flex justify-between">
        <div className="bluecolor gap-x-4">
          <div className="w-[10px] h-[10px] rounded-full bg-mint-600"><span className='colorcnt'>{colorCounts.low}개</span></div>
          <div className="lowdanger">
            <span className="hds-text-smalltext-large text-mint-600">1-2</span>
            <span className="hds-text-smalltext-large text-gray-tertiary">낮은 위험</span>
          </div>
        </div>
  
        <div className="yellowcolor gap-x-4">
          <div className="w-[10px] h-[10px] rounded-full bg-yellow-600"><span className='colorcnt'>{colorCounts.medium}개</span></div>
          <span className="hds-text-smalltext-large text-yellow-600">3-6</span>
          <span className="hds-text-smalltext-large text-gray-tertiary">중간 위험</span>
        </div>
  
        <div className="redcolor gap-x-4">
          <div className="w-[10px] h-[10px] rounded-full bg-red-600"><span className='colorcnt'>{colorCounts.high}개</span></div>
          <span className="hds-text-smalltext-large text-red-600">7-10</span>
          <span className="hds-text-smalltext-large text-gray-tertiary">높은 위험</span>
        </div>
  
        <div className="graycolor gap-x-4">
          <div className="w-[10px] h-[10px] rounded-full bg-gray-600"><span className='colorcnt'>{colorCounts.unknown}개</span></div>
          <span className="hds-text-smalltext-large text-gray-tertiary">등급 미정</span>
        </div>
      </div>

      <hr className='ingbar'/>
  
      {/* 성분 목록 */}
      <div className='ingmain'>
      {cosingredient.map((ingredient) => (
        <div key={ingredient.ing_idx}>
          <div className="ingmaintext">
            <span
              className={`ingscore ${
                ingredient.score >= 100 ? 'w-[10px] h-[10px] rounded-full bg-gray-600' : 
                ingredient.score >= 7 ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score >= 3 ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score >= 1 ? 'w-[10px] h-[10px] rounded-full bg-mint-600' :
                ingredient.score === '1-2' ? 'w-[10px] h-[10px] rounded-full bg-mint-600' :
                ingredient.score === '1-3' ? 'w-[10px] h-[10px] rounded-full bg-mint-600' :
                ingredient.score === '1-4' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '1-5' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '1-6' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '2-3' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '2-4' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '2-5' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '2-6' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '3-4' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '3-5' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '3-6' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '4-5' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '4-6' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '5-6' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '1-7' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '1-8' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '1-9' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '1-10' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '2-6' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '2-7' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '2-8' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '2-9' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '2-10' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '3-7' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '3-8' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '3-9' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '3-10' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '4-7' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '4-8' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '4-9' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '4-10' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '5-7' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '5-8' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '5-9' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '5-10' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '6-7' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '6-8' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '6-9' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '6-10' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '7-8' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '7-9' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '7-10' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '8-9' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '8-10' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '9-10' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                'w-[10px] h-[10px] rounded-full bg-gray-600'
              }`}
            >
              {ingredient.score}
            </span>
            <div className='ing3'>
            <span className='ingeng'>{ingredient.eng_name}</span>
            <span className='ingkor'>{ingredient.kor_name}</span>
            <span className='inguse'>{ingredient.use}</span>
          </div>
          </div>
          <hr className='ingbar2'/>
        </div>
      ))}
    </div>
    </div>
  )
}
  
export default Ingredient