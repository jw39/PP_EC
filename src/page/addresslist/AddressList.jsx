import React, { useEffect, useState } from 'react';
import { sendDel, sendGet, URL } from '../../util/util';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/pageheader/PageHeader';


const AddressList = () => {
    const [deliveryAddress,setDeliveryAddress] = useState([]);
    const state = useSelector(state => state.user)
    const nav =useNavigate();
    useEffect(()=>{
        sendGet(URL + '/addressList?userid=' + state.user_id, setDeliveryAddress);
    },[state])
    const formatAddress = (address) => {
        // 주소를 split하여 배열로 변환
        if(address !== "" || address !== undefined)
        {
            const parts = address.split('///');
            if (parts.length > 0) {
                // 우편번호에 대괄호 추가
                parts[0] = `[${parts[0]}]`;
            }
            // 배열을 다시 문자열로 결합
            return parts.join(' ');

        }
    };

    useEffect(()=>{
        console.log(deliveryAddress)
    },[deliveryAddress])
    return (
            <div>
                <PageHeader title={"배송지 관리"}/>
            {/* <hr className='thin_grayline' /> */}
                {deliveryAddress.map((item,idx)=>{

                    return(
                        <>
                            <div className='delivery_list_box'>
                                <div className='deliverylist_list'>
                                    <div className='deliverylist_namebasic'>
                                        {/* <br /> */}
                                        <span className='deliverylist_name'>{item.receive_name}</span>
                                        {item.default_address === 1 ?  
                                        <span className='deliverylist_basic'>[기본배송지] </span> : <div/>}
                                        {/* {item.default_address && <span>[기본]</span>} */}
                                    </div>
                                    <div className='deliverylist_address'>{formatAddress(item.user_address)}</div>
                                    <div className='deliverylist_phone'>{item.phone_num}</div>
                                    <div className='deliverylist_msg'>{item.msg}</div>
                                </div>
                                <div className='deliverylist_btn'>

                                    <button className='deliverylist_del' onClick={() => sendDel(URL + '/EditAddress', (() => sendGet(URL + '/addressList?userid=' + state.user_id, setDeliveryAddress)), { address_idx: item.address_idx })}>삭제</button>
                                    <button className='deliverylist_edit' onClick={() => nav(`/addressadd/수정/${item.address_idx}`)}>수정</button>
                                </div>
                            </div>
                        </>
                    )
                })}


                
                



                <div className='delivery_add'>
                    <button className='deliverylist_add' onClick={() => nav('/addressadd/추가/-100')}>배송지추가</button>
                </div>
            </div>
    );
};

export default AddressList;