import React, { useEffect, useState } from 'react';
import './OrderComplete.scss'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { sendGet, URL } from '../../util/util';
const OrderComplete = () => {
    const [Uri,setUri] = useSearchParams();
    const user = useSelector(state=>state.user)
    const [data, setData] = useState([])
    const nav = useNavigate();
    function addrParse(str){
        let list = str.split("///")
        return list;
    }

    function test (data){
        console.log(data)
        setData(data)
    }
    useEffect(()=>{
        console.log(user)
        sendGet(URL+"/OrderHistoryOne?payment="+Uri.get("orderId")+"&a_idx="+Uri.get("address_id"),test);
    },[])
    
    return (
        <>
            {data.length > 0 &&
                <div className='orderC'>
                <p className='orderC_title'>주문완료</p>
                <div className='orderC_contents1'>
                    <p className='orderC_contents1_title'>주문이 완료되었습니다.</p>
                    <p>주문번호 : {Uri.get("orderId")}</p>
                </div>
                <div className='flex_col orderC_contents1_btn'>
                    <div className='basket_middle_btn' onClick={()=>nav('/itemOrder')}>주문내역보기</div>
                    <div className='basket_middle_btn' onClick={()=>nav("/")}>계속 쇼핑하기</div>
                </div>

                <div className=''>
                    <p className='orderC_subtitle'>배송정보</p>
                    <div className='orderC_user_container'>
                        <div className='orderC_user_container_row'>
                            <div className='orderC_gray orderC_user_container_row_left'>받는 분</div> 
                            <div className='orderC_user_container_middle'>{data[0].receive_name}({data[0].phone_num})</div>
                        </div>
                        <div className='orderC_user_container_row'>
                            <div className='orderC_gray orderC_user_container_row_left'>배송지 </div>
                            <div className='orderC_user_container_middle'>
                                <div>
                                    {addrParse(data[0].user_address)[1]}
                                </div>
                                <div className='orderC_user_container_middle_last' >
                                    {addrParse(data[0].user_address)[2]}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='orderC_price flex_col'>
                    <div className='orderC_blue orderC_price_left'>결제금액</div> 
                    <div className='orderC_blue orderC_price_right'>{data[0].price + "원"}</div>
                </div>
            
            
                </div>
            }
        </>
    );
};

export default OrderComplete;