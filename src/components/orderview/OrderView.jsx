import React, { useState } from 'react';
import Star from '../../img/별.png'
import './OrderView.scss'
const OrderView = ({ data, item }) => {
    const [isState, setIsState] = useState(false)
    return (
        <div className=''>
            <div className='flex_col management_date_container_main'>
                <div className='management_date_container'>
                    {item.order_date}
                </div>
                <div className='management_date_container'>
                    {"주문번호 : " + item.payment_key}
                </div>
            </div>
            <div className='flex_col'>
                <img src={item.cos_img_src} style={{ width: 80, height: 80 }} alt="" />
                <div style={{ alignContent: "center", lineHeight: "25px" }}>
                    <span>{"기초 구독"}</span><br />


                </div>
                <div style={{ alignContent: "center", marginLeft: "auto", lineHeight: "25px" }} onClick={() => setIsState(!isState)}>
                    +
                </div>
            </div>
            {isState &&
                data.filter(cos => item.order_date == cos.order_date).map((cos) => {
                    console.log(data)
                    return (
                        <div className='flex_col OrderView'>

                            <img className="OrderView_img" src={cos.cos_img_src} alt="" />
                            <div style={{ alignContent: "center", lineHeight: "25px" }}>
                                <span>{cos.brand_name}</span><br />
                                <span>{cos.cos_name}</span>&nbsp;&nbsp; <span></span>
                                <div style={{ display: "inline-block" }}>
                                    <img className='star' src={Star} alt="" />
                                    <span className='rank_cos_grade'>&nbsp;{cos.grade}</span>
                                    <span className='rank_cos_grade_cnt'> {"(" + cos.grade_count + ")"}</span>
                                </div>
                                &nbsp;&nbsp;
                                <div style={{ display: "inline-block" }} >
                                    <span className='rank_text'>정가&nbsp;</span>
                                    <span className='rank_cos_price'>{cos.price + "원"}</span>
                                    <span className='rank_vol'>{"/" + cos.vol}</span>
                                </div>
                            </div>
                            
                        </div>
                    )
                })

            }



        </div>
    );
};

export default OrderView;