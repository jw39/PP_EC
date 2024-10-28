import React from 'react';
import Star from '../../img/별.png'
import { useNavigate } from 'react-router-dom'
import './TotalRankItem.scss'
import { setIcon } from '../../util/util';

const ItemAll = ({ data , showReviewScore }) => {

  const nav = useNavigate();

      // 제품 클릭 시 detailinfo 페이지로 이동하는 함수
      const handleProductClick = (idx) => {
        nav(`/detailinfo/${idx}`);
        window.scrollTo({ top: 0 });
    };
  
  return (
    <>


{/* <div className='review_maxmin'>
  <span className='review_scoretext'>{'< '}리뷰 긍정 점수: </span>
  <span className='review_max'>최대 2</span>
  <span className='review_min'>최소 -2{' >'}</span>
  </div> */}
  {data.length > 0 && data.map((item, idx) => (
        <div className='itemBox flex_col cursor' key={item.idx} onClick={() => handleProductClick(item.idx)}>
        {window.location.pathname !== "/subscriptionmanagement" ? (<div className='rank_num' key={idx}> {setIcon(idx)} </div>) : ""}
          <img src={item.cos_img_src} alt="" style={{ width: 80, height: 80 }} className='rank_img'/>

          <div>

            <div className='rank_name'>
              <span className='rank_brand_name'>{item.brand_name} </span>
            </div>
            <span className='rank_cos_name'>{item.cos_name}</span>


            <div className='rank_grade' style={{margin:'1px'}}>
              <img className='star' src={Star} alt="" />
              <span className='rank_cos_grade'>&nbsp;{item.grade}</span>
              <span className='rank_cos_grade_cnt'> {"(" + item.grade_count + ")"}</span>
            </div>


            <div className='rank_price'>
              <span className='rank_text'>정가&nbsp;</span>
              <span className='rank_cos_price'>{item.price + "원"}</span>
              <span className='rank_vol'>{"/" + item.vol }</span>
            </div>

            {showReviewScore && (
              <div className='rank_reviewscore'>
                <span className='rank_positivetext'>리뷰 긍정 점수 </span>
                <span className='rank_positivescore'>{item.review_score}</span>
              </div>
            )}

        </div>

    </div>
    ))}
    </>
  )
}

export default ItemAll