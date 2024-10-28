import React from 'react';
import './DetailGraphBar.scss';
import { useState, useEffect } from 'react';
import { sendGet, URL } from '../../util/util';
import { useParams } from 'react-router-dom';

const DetailGraphBar = () => {
  const { idx } = useParams();
  const [scorecnt, setScoreCnt] = useState([]);

  useEffect(() => {
    sendGet(URL + "/RatingCnt?idx=" + idx, (data) => {
      // Assuming ratings range from 1 to 5
      const ratings = [1, 2, 3, 4, 5];
      const ratingMap = data.reduce((acc, item) => {
        acc[item.rating] = item.count;
        return acc;
      }, {});

      const filledData = ratings.map((rating) => ({
        rating,
        count: ratingMap[rating] || 0,
      })).reverse(); // Reverse the array to display ratings in descending order

      setScoreCnt(filledData);
    });
  }, [idx]);

  return (
    <div className='detailgraphbar_main'>
      {scorecnt.map((cnt, idx) => (
        <div key={idx}>
          <div className='detailgraphbar_Container'>
            <div className='cntcounttext'>{cnt.count}</div>
            <div className='detailgraphbarchart_back'>
              <div
                className='detailgraphbarchart'
                style={{ height: cnt.count * 0.6 + "%", backgroundColor: "#0099FC" }}
              />
            </div>
            <div className='detailgraphbar_Title'>{cnt.rating}점</div>
          </div>
        </div>
      ))}
    </div>
     );
    };
    
    export default DetailGraphBar;