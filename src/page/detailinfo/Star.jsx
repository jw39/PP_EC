// Star.js
import React from 'react';
import fullstar from '../../img/별.png'
const Star = ({ filledPercentage }) => {
  return (
    <div style={{
      width: '20px', // 별 하나의 너비
      height: '20px',
      // backgroundColor: '#ddd', // 배경색
      position: 'relative',
    }}>
      <img src={fullstar} alt="" />
  
      {/* <div style={{
        width: `${filledPercentage}%`, // 채워진 부분의 너비
        height: '100%',
        backgroundColor: 'gold', // 채워진 부분의 색깔
        position: 'absolute',
        left: 0,
      }} /> */}
    </div>
  );
};

export default Star;

// // Star.js
// import React from 'react';
// import emptystar from '../../img/빈별.png'
// import fullstar from '../../img/별.png'

// const Star = ({ filledPercentage }) => {
//   return (
//     <div style={{
//       width: '20px', // 별 하나의 너비
//       height: '20px',
//       // backgroundColor: '#ddd', // 배경색
//       // position: 'relative',

//     }}>
//       <img src = {fullstar} style={{backgroundColor:'gold', overflow : 'hidden'}}></img>

//       <div style={{
//         width: `${filledPercentage}%`, // 채워진 부분의 너비
//         height: '100%',
//         transform: 'scale(-1, 1)',
//         transition: '.3s',
//         backgroundColor: 'gold', // 채워진 부분의 색깔
//         // position: 'absolute',
//         // left: 0,
//       }} />

//     </div>
//   );
// };

// export default Star;