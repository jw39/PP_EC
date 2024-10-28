import React, { useEffect, useState } from 'react';
import LeftArrow from "../../img/왼쪽.png"
import './SubscriptionManagement.scss'
import { useNavigate } from 'react-router-dom';

import { sendGet, sendPost, URL } from '../../util/util';

import Star from '../../img/별.png'
import { useSelector } from 'react-redux';
import PageHeader from '../../components/pageheader/PageHeader';
import OrderView from '../../components/orderview/OrderView';
const _ = require('lodash');
const SubscriptionManagement = () => {
    const [subTitle, setSubTitle] = useState("기초케어 제품");
    const [mainTitle, setMainTitle] = useState("구독상품 내역")
    const nav = useNavigate();
    const isSubscript = true;
    const [data, setData] = useState([])
    const [mainData, setMainData] = useState([]);
    const user = useSelector(state=>state.user);
    function calData(data)
    {
        let list = [...data]
        for(let i =0; i< list.length; i++)
        {
            let date2 = list[i].order_date.split("T");
            list[i].order_date = date2[0]
        }
        let DataList = _.uniqBy(list, "order_date")

        setMainData(list);
        setData(DataList)
    }
    useEffect(() => {
        if(user !== undefined)
        {
            sendGet(URL + '/SubscribeHistory?user_id='+user.user_id + "&order_name=구독결제" , calData);
        }

    }, [user])

    function changeclass(e){
        let list = document.getElementsByClassName('management_subtitle_contents');
        for(let i = 0; i< list.length; i++)
        {
            if(e.target === list[i])
            {
                list[i].className = "cursor management_subtitle_contents active"
            }
            else{
                list[i].className = "cursor management_subtitle_contents none"
            }
        }
    }
    
    const tag = 
    <>
        <div className='management_contents'>
            <div>{subTitle}</div>  
            <div >
                {data.map((item, i)=>{
                    return (
                        <OrderView data={mainData} item={item}/>
                    )
                })}
                
            </div>  
        </div>   
    </>; 

    const clearTag = 
    <>
        <div className='management_inlinetext'>
            구독을 해지하시면, 더 이상 맞춤형 샘플을 정기적으로 받아보실 수 없습니다. 해지를 원하실 경우, 아래 버튼을 눌러 주세요.
        </div>
        <div className='flex_col management_btn_container'>
            <div className='allreviewbtn btn-5 management_btn' onClick={() =>sendPost(URL+"/clearpayment",null, "tviva20240822101135DSLH3")}>
                구독 해제
            </div>
            <div className='allreviewbtn btn-5 management_btn' onClick={() => nav(-1)}>
                취소하기
            </div>
        </div>
    </>
    ;
    return (
        <>
            <PageHeader title={"구독관리"}/>
            <div className='flex_col management_subtitle'>
                <p className='cursor management_subtitle_contents active' onClick={(e)=> {
                    changeclass(e)
                    setMainTitle("구독상품 내역")}
                }>구독상품 내역</p>
                <p className='cursor management_subtitle_contents none' onClick={(e)=> {
                    changeclass(e)
                    setMainTitle("구독 해지")}
                }>구독 해지</p>
            </div>
            <div >
                {isSubscript ? mainTitle=== "구독상품 내역"? tag  : clearTag: "구독이 필요합니다!"}
            </div>
        </>
    );
};

export default SubscriptionManagement;