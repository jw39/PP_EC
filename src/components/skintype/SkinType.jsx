import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Colors } from 'chart.js';
import 'chartjs-plugin-datalabels'; // 데이터 레이블 플러그인 import
import './SkinType.scss';

import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Chart.js 모듈 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SkinType = () => {
  const labels = ['',''];
  const data = {
    labels: labels,
    datasets: [{
      data: [3,1],
      backgroundColor: [
        'rgb(75, 192, 192)',
        'rgb(255, 99, 132)',
      ],
      // 테두리 적용 안함->주석
      // borderColor: [
        // 'rgba(75, 192, 192, 0.2)',
        // 'rgba(255, 99, 132, 0.2)',
      // ],
      // borderWidth: 3, // 테두리 두께

      borderRadius: 4, // 라운딩
      maxBarThickness: 15, // 막대기 두께
      minBarLength: 4, // 데이터가 0일 때에도 최소 길이를 줌
      
    }]
  };

  const options = {
    indexAxis: 'y', // 수평 막대그래프 설정

    // 막대기 너비 비율 조정
    // barPercentage: 1, // 막대기 너비 비율 (0.0에서 1.0 사이, 1.0은 전체 카테고리 너비)
    // categoryPercentage: 1, // 카테고리 내에서 막대기 너비 비율 조정 (0.0에서 1.0 사이)
    
    // responsive: true, // 부모 요소 크기에 맞게 조정
    plugins: {
      datalabels: {
        // formatter: function(value){
        //   return value;
        // };
        // formatter: (value) => value,
        display: true,
        color: 'black',
        align: 'end',
        anchor: 'start',
        font : {size:24}
        // formatter: function (value){}
      },
      // 범례
      legend: {
        display: false, // 범례 표시 숨김
      },

      // 툴팁
      tooltip: {
        callbacks: {
        },
      },
      plugins: [ChartDataLabels],


    },
    // x, y축 설정
    scales: {
      x: {
        grid: {
          display: false, // x축 그리드 숨김
        },
        ticks: {
          display: false, // x축의 단위 표시 숨김
        },
        border: {
          display: false, // x축 선 숨김
        },

        },
      
      y: {
        grid: {
          display: false, // y축 그리드 숨김
        },
        ticks: {
          display: false, // y축의 단위 표시
        },
        border: {
          display: false, // y축 선 숨김
        },

      },
    },
    
  };

  return (
    <div className='SkinType'>
      <span className='left'>
        <p>지성 피부</p>
      </span>
      <span className='center'>
        <Bar className='barr' data={data} options={options} />
      </span>
      <span className='right'>
        <h1 className='goodlike'>4</h1>
        <h1 className='badhate'>1</h1>
      </span>
    </div>
  );
}

export default SkinType;