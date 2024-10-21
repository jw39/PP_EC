import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { sendGet, URL } from '../../util/util'
import { useNavigate } from 'react-router-dom';
import './Login.scss'
import { LoginSession, LogoutSession, getLoginSession } from '../../util/session'
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/type/typefunc';

const Login = () => {
    // 페이지 이동 함수
    const navigate = useNavigate();
    const home = () => navigate('/');
    const join = () => navigate('/join');
    const mypage = () => navigate('/mypage');
    const dispatch = useDispatch();
    // 로그인에 필요한 변수들
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    // 에러 메세지 저장
    const [error, setError] = useState('');
    // 로그인 상태 정보 저장
    const [isLogin, setIsLogin] = useState(getLoginSession());

    // 로그인 함수
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(URL + '/TestLogin', {
                user_id : id,
                user_pw : pw
            });
            const responseData = response.data[0];
            dispatch(setUser(responseData));
            
            if (responseData) {
                LoginSession(responseData.user_id, responseData.user_nm, 0);
                setIsLogin(true);
                setError('');
                alert('로그인 성공!');
                navigate('/'); // 로그인 성공 시 홈 화면으로 이동
            } else {
                setError('ID, PW가 일치하지 않습니다');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred');
        }
    };

    // 로그아웃 함수
    const handleLogout=()=>{
        LogoutSession();
        setIsLogin(false);
    }

    useEffect(() => {
    }, [isLogin]);

    return (
        <div id='login'>
            <div id='wrapper'>
                {/* <div id='head'>
                    <div className='left'>
                        <h1 onClick={home}>Personal Pick</h1>
                    </div> 
                    <div className='right'>
                        {getLoginSession().username ?
                        <button onClick={handleLogout}>로그아웃</button> :
                        <button onClick={join}>회원가입</button>}
                    </div>
                </div> */}
                
                <div id='main'>
                    <form className='mypage_form' onSubmit={handleLogin}>
                        {getLoginSession().userid ?
                        <>
                        <div className='mypage'>
                            <button className='mypage_btn' onClick={mypage}>마이 페이지</button>
                        </div>
                        </> 
                        :

                        (
                        <>

                        <div className='textbox'>
                            <label className='inputLabel_login'>ID</label>
                            <input
                                className='inputbox'
                                type="text"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className='textbox margin_20'>
                            <label className='inputLabel_login'>Password</label>
                            <input
                                className='inputbox'
                                type="password"
                                value={pw}
                                onChange={(e) => setPw(e.target.value)}
                                required
                            />
                        </div>

                        <div className='button_login'>
                            <button className='loginbtn' type="submit">LOGIN</button>
                        </div>
                        
                        <div className='button_login'>
                            <button className='joinbtn' onClick={join}>JOIN US</button>
                        </div>

                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        </>
                    )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;