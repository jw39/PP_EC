import React from 'react';
import Star from './Star'
import fullstar from '../../img/별.png'

const StarRating = ({ rating }) => {
  const maxStars = 5;
  const stars = [];

  for (let i = 0; i < maxStars; i++) {
    const starRating = Math.min(Math.max(rating - i, 0), 1) * 100; // 해당 별의 채워진 퍼센트 계산
    stars.push(<Star key={i} filledPercentage={starRating} />);
  }

  return <div style={{ display: 'flex' }}>{stars}</div>;
};

export default StarRating;