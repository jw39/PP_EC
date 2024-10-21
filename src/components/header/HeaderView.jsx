import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLogo from '../../img/메인로고.png'
import MenuImg from "../../img/햄버거메뉴.png"
import CartImg from "../../img/장바구니.png"
import Menu from "../../components/menu/Menu";
import { setMenuView, setUser } from "../../redux/type/typefunc";
import { useNavigate } from 'react-router-dom';
import { sendGet, URL } from '../../util/util';

// 로그인이 필요한 화면과 필요하지 않는 화면 구분
function checkPath(path)
{
    let check = false;
    switch(path){
        case "/": // 홈
        //case /^\/detailinfo\/\d+$/.test(path): // 상세페이지
        case "/login":
        case "join":
        case /^\/search\/\s+$/.test(path):
        case /^\/totalitem\/\d+$/.test(path):
        case "/subscription":
        case "/subscriptionintroduce":
        // case "/subscriptionmanagement":
        case "/airecommend":
        case "/complete":
            check = true;
            break;
        default:
            if(/^\/detailinfo\/\d+$/.test(path))
            {
                check = true;
            }
            else{

                check =false;
            }
    }
    console.log(check)
    return check;
}
const HeaderView = () => {
    const [isMenu, setIsMenu] = useState({
        x : 0,
        y : 0,
    });
    const isMenuView = useSelector(state => state.isMenu)
    const user = useSelector(state=>state.user);
    const nav = useNavigate();
    const dispatch = useDispatch();
    function showMenu(e){
        e.stopPropagation();
        dispatch(setMenuView(!isMenuView))
        setIsMenu({
            x : e.target.offsetLeft-280,
            y : e.target.offsetTop+40
        })        
    }

    function consolea (data){
        dispatch(setUser(data[0]))
    }
    useEffect(()=>{
        let userid = sessionStorage.getItem("userid");
        console.log(userid)
        sendGet(URL+'/TestSearch?user_id='+ userid, consolea)
    },[])

    useEffect(()=>{
        if(!checkPath(window.location.pathname))
        {
            nav("/");
        }

    },[user])


    return (
        <>
            <div className="flex_col home_header">
                <img src={MainLogo} className="logoimg cursor" alt="팀로고" onClick={() => nav("/")}/>
                <img src={CartImg} className="header_cart cursor" alt="" onClick={() => {
                    if(user !== undefined)
                    {
                        nav("/cartlist")
                    }
                    else{
                        nav("/login")
                    }
                    }
                } />
                <img src={MenuImg} className="home_menu cursor" alt="" onClick={(e) => showMenu(e)} />
            </div>
            <Menu isView={isMenu} />
        </>
    );
};

export default HeaderView;