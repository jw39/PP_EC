import React, { useEffect, useState } from 'react';
import LeftArrow from "../../img/왼쪽.png"
import Minus from "../../img/마이너스.png"
import Plus from "../../img/플러스.png"
import { useNavigate } from 'react-router-dom';
import './ShoppingCart.scss'
import { sendDel, sendGet, sendPost, URL } from '../../util/util';
import { useSelector } from 'react-redux';

const ShoppingCart = () => {
    const nav = useNavigate();
    const user = useSelector(state => state.user);
    
    const [data, setData] = useState([])
    const [totalPrice, setTotalPrice]= useState(0);
    useEffect(()=>{
        
        if(user !== "undefined")
        {
            sendGet(URL+"/OrderCart?userid="+user.user_id,setData)
        }
    },[user])

    const PLUS = 0;
    const MINUS = 1;
    function calcul(type, targetNum){
        let str = "";
        let newData = [...data]
        
        switch(type)
        {
            case PLUS:
                str = "increase"
                newData[targetNum].buy_cnt++;
                newData[targetNum].total_price = newData[targetNum].buy_cnt * newData[targetNum].price
                break;
            case MINUS:
                if(newData[targetNum].buy_cnt === 1)
                {
                    return
                }
                str = "decrease"
                newData[targetNum].buy_cnt--;
                newData[targetNum].total_price = newData[targetNum].buy_cnt * newData[targetNum].price
                break;
            default:
                break;
        }
        if(str !== "")
        {
            sendPost(URL + "/UpdateCartCnt", (()=>setData(newData)), { user_id: user.user_id, idx : data[targetNum].idx, action : str})
            
            
        }
    }
    
    function totalCheck(e){
        if(e.target.checked)
        {
            let changeList = [...data];
            for(let i = 0; i<changeList.length; i++)
            {
                changeList[i].is_selected = true;
            }   
            setData([...changeList])
        }
        else{
            let changeList = [...data];
            for(let i = 0; i<changeList.length; i++)
            {
                changeList[i].is_selected = false;
            }   
            setData([...changeList])
        }
    }
    useEffect(()=>{
        let price = 0;
        for(let i =0; i< data.length; i++)
        {
            if(data[i].is_selected)
            {
                price+=data[i].total_price;
            }
        }
        setTotalPrice(price)
    },[data])

    function choiceDelete()
    {
        
        sendDel(URL+"/DeleteCartItems",(()=>sendGet(URL+"/OrderCart?userid="+user.user_id,setData)), data)
        
    }
    return (
        <>
            <div className='management_title'>
                <img className='home_menu float_l cursor' src={LeftArrow} alt=""  onClick={()=>nav(-1)}/>
                <p className='cartbox_text'>장바구니</p>
            </div>

            <p className='sampleroad_text'>퍼스널픽 배송상품</p>

            <div className='flex_col ' style={{alignItems:"center"}}>
                <input type="checkbox" className='total_check' defaultChecked  onChange={(e)=> totalCheck(e)}/>
                <div className='totalcheck_text' >전체선택</div>
                <div className='deletebtn_text' style={{marginRight : "30px", marginLeft : "auto"}}>품절삭제</div>
                <div className='deletebtn_text' onClick={()=>choiceDelete()}>선택삭제</div>
            </div>
            <hr className='thin_grayline' />
            <div>
                {data.map((item, i)=>{
                    return (
                        <div  key={item.idx}>
                            <div className='flex_col basket_item_box'>
                                <input className='basket_check' type="checkbox" checked={item.is_selected} onChange={()=>{
                                    let changeData = [...data]
                                    changeData[i].is_selected = !changeData[i].is_selected;
                                    setData([...changeData])
                                }} />
                                <img className='basket_img' src={item.cos_img_src} alt="" />
                                <div className='basket_content_text'>
                                    <p className='sub_title'>
                                        {item.brand_name}
                                    </p>
                                    <p className='basket_text'>
                                        {item.cos_name}
                                    </p>
                                    <p className='basketvol_text'>
                                        {item.vol}
                                    </p>
                                </div>
                                {/* <img className='basket_x_btn ' src={XBtn} alt="" style={{marginLeft: "40%"}}/> */}
                            </div>
                            <div className='flex_col basket_under_container'>
                                <div className='flex_col basket_under_content_box'>
                                    <div className='basket_sum_btn' onClick={()=>calcul(MINUS, i)}><img className='basket_count' src={Minus} alt=""/></div>
                                    <div className='basket_price'>{item.buy_cnt}</div>
                                    <div className='basket_sum_btn' onClick={()=>calcul(PLUS, i)}><img className='basket_count' src={Plus} alt=""/></div>
                                </div>
                                <p className='margin_left_pull basket_price'>{(item.price* item.buy_cnt)+"원"}</p>
                            </div>
                            <div className='grayline'></div>
                        </div>
                    )
                })}


            </div>
            <p className='tax_title'>예상 결제금액</p>
            {/* <hr className='thin_grayline'/> */}
            <div className='gray_text'>
            <div className='basket_line'>
                <span className='totalpay_delivery'>총 상품금액</span>
                <span className='float_r basket_price'>{totalPrice+"원"}</span>
            </div>
            <div className='basket_line'>
                <span className='totalpay_delivery'>배송비</span>
                <span className='float_r basket_price'>{totalPrice === 0 ? 0:3000}원</span>
            </div>
            </div>

            <hr className='thin_grayline'/>
            <div className='cart_totalpay_box'>
                <span>총 주문금액</span>
                <span className='float_r basket_price basket_color_text'>{totalPrice+(totalPrice ===0 ? 0:3000)}원</span>
            </div>
            <div className='pay_fix_btn' onClick={()=>{
                if(totalPrice === 0)
                {
                    return
                }
                sendPost(URL+"/OrderCart", (()=>nav('/payshipment')) , data)
                
                }}>
                {totalPrice+(totalPrice ===0 ? 0:3000)+"원 주문하기"}
            </div>
        </>
    );
};

export default ShoppingCart;