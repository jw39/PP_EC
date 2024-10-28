    import React, { useEffect, useState } from 'react'
import './PayShipment.scss';
import Back from '../../img/왼쪽.png';
import Triangle from '../../img/역삼각형.png';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { sendDel, sendGet, showIngredient, showModal, showPayMent, URL } from '../../util/util';
import { useSelector } from 'react-redux';
import AddressList from '../addresslist/AddressList';
import Right from "../../img/오른쪽.png"
import defualtImg from "../../img/파비콘.png"
import { LoginSession, LogoutSession, getLoginSession } from '../../util/session'

const PayShipment = () => {

    const nav = useNavigate();
    const { cos_id, cos_count } = useParams();
    const location = useLocation(); // location 객체를 통해 전달된 state 사용
    const isSubscription = location.state?.isSubscription || false; // 구독 여부 확인
    // const [sub , setSub] = useState(false)

    const [sendData, setSendData] = useState();
    const [dropdownOpenClose, setDropdownOpenClose] = useState(false);
    const [dropdownOptionSelect, setDropdownOptionSelect] = useState('-- 메시지 선택 (선택사항) --');

    const options = [
        "-- 메시지 선택(선택사항) --", "배송전에 미리 연락바랍니다.", "부재시 경비실에 맡겨주세요.",
        "부재시 문앞에 놓아주세요.", "빠른 배송 부탁드립니다.", "택배함에 보관해 주세요"
    ]

    const dropdownToggle = () => {
        setDropdownOpenClose(!dropdownOpenClose);
    };

    const optionSelect = (option) => {
        setDropdownOptionSelect(option);
        setDropdownOpenClose(false);
    };

    const [check, setCheck] = useState(true);

    const state = useSelector((item) => {
        return item.user
    })

    const [orderProduct, setOrderProduct] = useState([]);

    const [deliveryAddress, setDeliveryAddress] = useState();

    function setDirectData(data) {
        let newData = { ...data[0] }
        newData.buy_cnt = cos_count;
        newData.total_price = newData.price * cos_count;
        setOrderProduct([newData])
    }

    function setDeliverData(data) {
        setDeliveryAddress(data)
    }

    useEffect(() => {
        if (!isSubscription) {  // 구독이 아닌 경우에만 기존 상품 정보를 불러옴
            if (typeof (cos_id) === "undefined") {
                sendGet(URL + '/OrderPage?userid=' + state.user_id, setOrderProduct);
            } else {
                sendGet(URL + "/DetailPage?idx=" + cos_id, setDirectData);
            }
        }
        sendGet(URL + '/addressList?userid=' + state.user_id, setDeliverData);
    }, [state, isSubscription]);

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (!isSubscription) {  // 구독이 아닌 경우에만 상품의 총 가격 계산
            let price = 0;
            let itemIdList = "";
            let itemCntList = "";

            for (let i = 0; i < orderProduct.length; i++) {
                price += orderProduct[i].total_price;
                itemIdList += orderProduct[i].idx
                itemCntList += orderProduct[i].buy_cnt
                if (i !== orderProduct.length - 1) {
                    itemIdList += ","
                    itemCntList += ","
                }
            }

            setTotalPrice(price)
            if (orderProduct.length > 0) {
                setSendData({
                    orderName: orderProduct.length === 1 ? orderProduct[0].cos_name : `${orderProduct[0].cos_name} 외 ${orderProduct.length - 1}건`,
                    itemIdList: itemIdList,
                    itemCntList: itemCntList,
                })
            }
        } else {
            // 구독 페이지일 경우 가격을 고정으로 설정
            setTotalPrice(20000); // 구독 상품의 월 정기 결제 금액
        }
    }, [orderProduct, isSubscription]);

    const [defaultAddr, setDefaultAddr] = useState({
        address_idx: "",
        default_address: "",
        msg: "",
        user_address: ""
    });

    useEffect(() => {
        if (typeof (deliveryAddress) !== "undefined") {
            let list = deliveryAddress.filter((item) => item.default_address === 1)
            if (list.length > 0) {
                setDropdownOptionSelect(list[0].msg)
                setDefaultAddr(list[0])
            }
            else {
                setDefaultAddr({ user_address: "" })
            }
        }
    }, [deliveryAddress])

    const formatAddress = (address) => {
        if (address !== "" || address !== undefined) {
            const parts = address.split('///');
            if (parts.length > 0) {
                parts[0] = `[${parts[0]}]`;
            }
            return parts.join(' ');
        }
    };


    const handleSub = () =>{
        LoginSession(getLoginSession().username, getLoginSession().usernm, 1);
    }
    return (
        <div>
            <div className='backORtext'>
                <img className='orderpay_back_btn' src={Back} alt="" onClick={() => nav(-1)} />
                <p className='orderpay_text'>주문/결제</p>
            </div>

            <div className='orderpay_body'>
                <div className='delivery_boxes'>
                    <div className='delivery_btn'>
                        <div className='delivery_text flex_col' onClick={() => nav('/addressListAll')}>
                            <div className='delivery_boxes_left'>배송지</div>
                            <img className='orderpay_back_btn' src={Right} alt="" />
                        </div>
                    </div>
                </div>
                <hr className='thin_grayline' />

                {/* 구독 상품 여부에 따른 내용 표시 */}
                {isSubscription ? (
                    // 구독 상품을 선택한 경우
                    <>

                        <div>
                            <div className='delivery_container'>
                                <div className='basic_name'>
                                    <span className='basic'>[기본]</span>
                                    <span className='delivery_name'>{defaultAddr.receive_name}</span>
                                </div>
                                <div className='delivery_address'>{formatAddress(defaultAddr.user_address)}</div>
                                <div className='delivery_phone'>{defaultAddr.phone_num}</div>
                                <div className='delevery_msg'>{defaultAddr.msg}</div>
                            </div>
                            <hr className='thin_grayline' />
                        </div>


                        <hr className='thick_grayline' />

                        <div className='white_text_box'>주문상품</div>
                        <hr className='thin_grayline' />
                        <div className='order_product'>
                            <img className='order_img' style={{ width: '80px', height: '80px' }} src={defualtImg} alt="정기구독 이미지" />
                            <div className='order_content_text'>
                                <div className='first_line'>
                                    <span className='gudog'>[정기구독]</span>
                                    <span className='sample5'>맞춤형 기초 화장품 샘플 5가지</span>
                                </div>

                                <div className='gudog_period'>2024.09.12 ~ 2024.10.11</div>

                                <div className='third_line'>
                                    <span className='gudog_month'>월</span>
                                    <span className='gudog_price'>20,000원</span>
                                </div>
                            </div>
                        </div>

                        <hr className='thin_grayline' />
                        <hr className='thick_grayline' />

                        <div>
                            <div className='white_text_box'>결제정보</div>
                            <hr className='thin_grayline' />
                            <div className='gray_text'>
                                <div className='gray_text_money'>
                                    <span>총 구독금액</span>
                                    <span>{totalPrice + "원"}</span>
                                </div>
                                <div className='gray_text_money'>
                                    <span>배송비</span>
                                    <span className=''>0원</span>
                                </div>
                            </div>
                            <hr className='thin_grayline' />
                            <div className='pay_fix_box'>
                                <span className='pay_fix_amount'>최종 결제 금액</span>
                                <span className='pay_fix_num'>{totalPrice + "원"}</span>
                            </div>
                            <hr className='thin_grayline' />
                        </div>
                        <div className='gudog_fix_btn cursor' onClick={() => {
                            if (defaultAddr.user_address === "") {
                                showModal(<p>기본 배송지 설정이 안되어있는 상태입니다!</p>)
                            } else {
                                showPayMent(state.user_id, totalPrice, {
                                    itemIdList : 1,
                                    itemCntList : 1,
                                    orderName : "구독결제" 
                                }, defaultAddr);
                                handleSub()
                            }
                        }}>
                            {totalPrice + "원 결제하기"}
                        </div>

                    </>
                ) : (
                    // 기존 상품을 선택한 경우
                    <>
                        {defaultAddr.user_address !== "" && (
                            <div>
                                <div className='delivery_container'>
                                    <div className='basic_name'>
                                        <span className='basic'>[기본]</span>
                                        <span className='delivery_name'>{defaultAddr.receive_name}</span>
                                    </div>
                                    <div className='delivery_address'>{formatAddress(defaultAddr.user_address)}</div>
                                    <div className='delivery_phone'>{defaultAddr.phone_num}</div>
                                    <div className='delevery_msg'>{defaultAddr.msg}</div>
                                </div>
                                <hr className='thin_grayline' />
                            </div>
                        )}

                        <hr className='thick_grayline' />

                        <div>
                            <div className='white_text_box'>주문상품</div>
                            <hr className='thin_grayline' />

                            {orderProduct.map((item, i) => (
                                <div key={i} className='order_product'>
                                    <img className='order_img' style={{ width: '80px', height: '80px' }} src={item.cos_img_src} alt="" />
                                    <div className='order_content_text'>
                                        <div className='order_product_brandxbtn'>
                                            <span className='order_graytext'>{item.brand_name}</span>
                                        </div>
                                        <div className='order_product_nametext'>
                                            <span className='order_product_name'>{item.cos_name}</span>
                                            <span className='order_product_vol'>{item.vol}</span>
                                        </div>
                                        <div>
                                            <span className='order_product_price'>{item.price}</span>
                                            <span className='order_graytext'>{item.buy_cnt + "개"}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <hr className='thin_grayline' />
                        <hr className='thick_grayline' />

                        <div>
                            <div className='white_text_box'>결제정보</div>
                            <hr className='thin_grayline' />
                            <div className='gray_text'>
                                <div className='gray_text_money'>
                                    <span>총 상품금액</span>
                                    <span>{totalPrice + "원"}</span>
                                </div>
                                <div className='gray_text_money'>
                                    <span>배송비</span>
                                    <span className=''>3000원</span>
                                </div>
                            </div>
                            <hr className='thin_grayline' />
                            <div className='pay_fix_box'>
                                <span className='pay_fix_amount'>최종 결제 금액</span>
                                <span className='pay_fix_num'>{totalPrice + 3000 + "원"}</span>
                            </div>
                            <hr className='thin_grayline' />
                        </div>
                        <div className='pay_fix_btn cursor' onClick={() => {
                            if (defaultAddr.user_address === "") {
                                showModal(<p>기본 배송지 설정이 안되어있는 상태입니다!</p>)
                            } else {
                                showPayMent(state.user_id, totalPrice, sendData, defaultAddr);
                            }
                        }}>
                            {totalPrice + 3000 + "원 결제하기"}
                        </div>
                    </>
                )}
                {/* 
                <hr className='thick_grayline' />

                <div>
                    <div className='white_text_box'>결제정보</div>
                    <hr className='thin_grayline' />
                    <div className='gray_text'>
                        <div className='gray_text_money'>
                            <span>총 상품금액</span>
                            <span>{totalPrice + "원"}</span>
                        </div>
                        <div className='gray_text_money'>
                            <span>배송비</span>
                            <span className=''>3000원</span>
                        </div>
                    </div>
                    <hr className='thin_grayline' />
                    <div className='pay_fix_box'>
                        <span className='pay_fix_amount'>최종 결제 금액</span>
                        <span className='pay_fix_num'>{totalPrice + 3000 + "원"}</span>
                    </div>
                    <hr className='thin_grayline' />
                </div>
                <div className='pay_fix_btn cursor' onClick={() => {
                    if (defaultAddr.user_address === "") {
                        showModal(<p>기본 배송지 설정이 안되어있는 상태입니다!</p>)
                    } else {
                        showPayMent(state.user_id, totalPrice, sendData, defaultAddr);
                    }
                }}>
                    {totalPrice + 3000 + "원 결제하기"}
                </div> */}
            </div>
        </div>
    );
}

export default PayShipment;
