import React from 'react';
import InputReview from '../../components/inputreview/InputReview';
import { useLocation } from 'react-router-dom';
import PageHeader from '../../components/pageheader/PageHeader';
import './ItemReview.scss'
const ItemReview = () => {
    const {state} = useLocation();
    
    return (
        <div>
            <PageHeader title={"리뷰 작성"}/>
            <div className='flex_col review_box'>
                <img src={state.cos_img_src} alt="" />
                <div className='review_text_box'>
                    <p>{state.cos_name}</p>
                    <p className='grayText'>{state.vol}</p>
                </div>
            </div>
            <div className='order_review_btn'>
            <InputReview item={state}/>
            </div>
        </div>
    );
};

export default ItemReview;