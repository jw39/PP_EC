

import React, { useEffect, useState } from 'react';
import "./Menu.scss"
import UserImg from "../../img/사용자.png"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutSession } from '../../util/session';
import { setUser } from '../../redux/type/typefunc';




const Menu = ({ isView }) => {
    const nav = useNavigate()

    const isMenuView = useSelector(state => state.isMenu)
    const name = useSelector(state => state.user);
    const dispatch = useDispatch();
    function logout() {
        LogoutSession();
        dispatch(setUser(undefined));
    }

    return (
        <>
            {
                isMenuView &&
                <div className="menu_container" style={{ position: "absolute", top: isView.y, left: isView.x }}>
                    <div className='flex_col home_header menu_loginbox'>
                        <img className='menu_userimg float_l' src={UserImg} alt="" />
                        <p className='menu_title' onClick={() => nav("/login")}>{name === undefined ? "로그인/회원가입" :
                            <>
                                <span style={{ fontWeight: 800, color: '#555555', marginRight: '3px' }}>{name.user_nm}</span>
                                님 환영합니다
                            </>
                        }</p>
                    </div>
                    <hr className='thin_grayline' />
                    <div className='menu_box'>
                        <div className='menu_logout'>
                            <p className='menu_skintype' onClick={() => {
                                nav("/typecheck")
                                
                            }
                            }>피부타입 진단</p>
                            <p className='menu_skintype' onClick={() => {
                                if(name !== undefined)
                                {
                                    nav("/airecommend")
                                }
                                else{
                                    alert("로그인후 이용해 주세요!")
                                    nav("login");
                                }
                                // console.log(name)
                            }
                            }>화장품 추천</p>

                            {/* <p className='menu_skintype'>피부타입별</p>
                            <p className='menu_age'>나이대별</p> */}
                            <p className='menu_subscribe' onClick={() => nav("/subscription")}>정기배송/구독</p>
                        </div>
                        {name !== undefined &&
                            <>
                                <hr className='thin_grayline' />
                                <div className='menu_login'>
                                    <p className='menu_mypage' onClick={() => nav("/mypage")}>마이페이지</p>
                                    <hr className='thin_grayline' />
                                    {/* <p className='menu_myreview' onClick={() => nav("/review")}>나의 리뷰</p> */}
                                    {/* <hr className='thin_grayline' /> */}
                                    <p className='menu_myreview' onClick={() => nav("/cartlist")}>장바구니</p>
                                    <hr className='thin_grayline' />
                                    <p className='menu_addresslist' onClick={() => nav("/addressListAll")}>배송지</p>
                                    <hr className='thin_grayline' />
                                    <p className='menu_logout_text' onClick={() => logout()}>로그아웃</p>
                                </div>
                            </>
                        }
                    </div>
                </div>


            }
        </>
    );
};

export default Menu;


