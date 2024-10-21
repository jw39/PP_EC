import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { URL } from '../../util/util'
import { useNavigate } from 'react-router-dom';
import '../login/Login.scss'
import { useSelector, useDispatch } from 'react-redux'

const Join = () => {
    // 페이지 이동 함수
    const navigate = useNavigate();
    const home = () => navigate('/');
    const login = () => navigate('/login');

    // redux
    // 상태 저장
    const state = useSelector(state => state);
    // 상태 변경
    const dispatch = useDispatch();
    // 상태 출력
    useEffect(() => {
        console.log('login : ',state.isUser);
        console.log('userData : ',state.userData);
    }, [state]);
    
    // 회원가입에 필요한 변수들
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [name, setName] = useState('');
    const [nm, setNm] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    //const [address, setAddress] = useState('');

    const [skinType, setSkinType] = useState('');
    // 회원가입 실패 시 출력할 메세지 저장 변수
    const [message, setMessage] = useState('');

    const handleSTChange = (event) => {
        
        // 아래 체크박스에서 선택한 피부 타입으로 ageGroup을 변경하는 함수
        const { id } = event.target;
        const temp = id === 'box1' ? '건성' :
                     id === 'box2' ? '중성' :
                     id === 'box3' ? '지성' :
                     id === 'box4' ? '민감성' :
                     id === 'box5' ? '복합성' : '';
        setSkinType(temp);
    };
    useEffect(() => {
        // 변경된 피부 타입 출력(첫 랜더링, skinType이 변경될 때)
        console.log('skinType : ',skinType);
    }, [skinType]);

    const handleSex = (event) => {
        // 아래 체크박스에서 선택한 연령대로 ageGroup을 변경하는 함수
        const { id } = event.target;
        const temp = id === 'box1' ? '남' :
                     id === 'box2' ? '여' : '';
        setSex(temp);
    };
    useEffect(() => {
        // 변경된 연령대 출력(첫 랜더링, ageGroup이 변경될 때)
        console.log('성별 : ',sex);
    }, [sex]);

    // 회원가입 버튼 클릭 시 실행
    const handleSubmit = async (event) => {
        // console창에 보낼 데이터 출력
        console.log('data : ',{
            user_id: id,
            user_pw: pw,
            user_name: name,
            user_nm: nm,
            user_email : email,
            user_age : age,
            user_sex : sex,
            skin_type : skinType
            // user_address : address
        });
        
        event.preventDefault();
        try {
            // 데이터 전송
            // get : select
            // post : insert, update, delete
            const response = await axios.post(URL + "/TestJoin", {
                user_id: id,
                user_pw: pw,
                user_name: name,
                user_nm: nm,
                user_email : email,
                user_age : age,
                user_sex : sex,
                skin_type : skinType
                // user_address : address
            });
            // 응답받은 데이터 출력 : 201(성공) or 500(실패)
            console.log('response.data : ',response.data);
            if (response.data === 201) {
                // 회원가입 성공 시 메시지 출력 및 홈 페이지로 이동
                alert('회원가입 성공');
                navigate('/login');
            }else{
                setMessage("회원가입 실패");
            }
        } catch (error) {
        if (error.response) {
            // 서버가 응답했지만 오류 응답 코드가 반환된 경우
            setMessage('An error occurred: ' + error.response.data.error);
        } else if (error.request) {
            // 요청이 만들어졌지만 응답을 받지 못한 경우
            setMessage('No response received from the server.');
        } else {
            // 요청을 만들 때 오류가 발생한 경우
            setMessage('Error: ' + error.message);
        }
    }
    };

    return (
        <div id='join'>
            <div id='wrapper'>
                {/* <div id='head'>
                    <div className='left'>
                        <h1 onClick={home}>Personal Pick</h1>
                    </div>
                    <div className='right'>
                        <button onClick={login}>로그인</button>
                    </div>
                </div> */}

                <div id='main'>
                    <form className='join_form' onSubmit={handleSubmit}>
                        <div className='textbox'>
                            {/* <div className='imgbox'>
                                <img src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png" alt="" />
                                </div> */}
                                <label className='inputLabel'>아이디</label>
                            <input
                                // placeholder='아이디'
                                className='inputbox'
                                type="text"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className='textbox'>
                            {/* <div className='imgbox'>
                                <img src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png" alt="" />
                            </div> */}
                            <label className='inputLabel'>비밀번호</label>
                            <input
                                // placeholder='비밀번호'
                                className='inputbox'
                                type="text"
                                value={pw}
                                onChange={(e) => setPw(e.target.value)}
                                required
                            />
                        </div>

                        <div className='textbox'>
                            {/* <div className='imgbox'>
                                <img src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png" alt="" />
                            </div> */}
                            <label className='inputLabel'>이름</label>
                            <input
                                // placeholder='이름'
                                className='inputbox'
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className='textbox'>
                            {/* <div className='imgbox'>
                                <img src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png" alt="" />
                            </div> */}
                            <label className='inputLabel'>닉네임</label>
                            <input
                                // placeholder='닉네임'
                                className='inputbox'
                                type="text"
                                value={nm}
                                onChange={(e) => setNm(e.target.value)}
                                required
                            />
                        </div>

                        <div className='textbox'>
                            {/* <div className='imgbox'>
                                <img src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png" alt="" />
                            </div> */}
                            <label className='inputLabel'>이메일</label>
                            <input
                                // placeholder='이메일'
                                className='inputbox'
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className='textbox'>
                            {/* <div className='imgbox'>
                                <img src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png" alt="" />
                            </div> */}
                            <label className='inputLabel'>나이</label>
                            <input
                                // placeholder='나이'
                                className='inputbox'
                                type="text"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                                title="숫자를 입력하세요"
                            />
                        </div>
{/* 
                        <div className='textbox'>
                            <div className='imgbox'>
                                <img src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png" alt="" />
                            </div>
                            <label className='inputLabel'>주소</label>
                            <input
                                placeholder='주소'
                                className='inputbox'
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                title="주소를 입력하세요"
                            />
                        </div> */}

                        <table className="checkbox">
                            <tbody>
                            <div className='sex'>
                                <td className='sex_text'>성별</td>
                                <td className='right'>
                                    <input
                                        type="checkbox"
                                        id="box1"
                                        checked={sex === '남'}
                                        onChange={handleSex}
                                    />
                                    <label className='label_namtext' htmlFor="box1">남</label>
                                    <input
                                        type="checkbox"
                                        id="box2"
                                        checked={sex === '여'}
                                        onChange={handleSex}
                                    />
                                    <label className='label_text' htmlFor="box2">여</label>
                                </td>
                            </div>
                            <tr>
                                {/* 공백 추가 */}
                                <td colSpan="2" className='spacer'></td> 
                            </tr>

                            <div className='skin_type'>
                                <td className='skintype_text'>피부 타입</td>
                                <td className='right'>
                                    <input
                                        type="checkbox"
                                        id="box1"
                                        checked={skinType === '건성'}
                                        onChange={handleSTChange}
                                    />
                                    <label className='label_text' htmlFor="box1">건성</label>
                                    <input
                                        type="checkbox"
                                        id="box2"
                                        checked={skinType === '중성'}
                                        onChange={handleSTChange}
                                    />
                                    <label className='label_text' htmlFor="box2">중성</label>
                                    <input
                                        type="checkbox"
                                        id="box3"
                                        checked={skinType === '지성'}
                                        onChange={handleSTChange}
                                    />
                                    <label className='label_text' htmlFor="box3">지성</label>
                                    <input
                                        type="checkbox"
                                        id="box4"
                                        checked={skinType === '민감성'}
                                        onChange={handleSTChange}
                                    />
                                    <label className='label_text' htmlFor="box4">민감성</label>
                                    <input
                                        type="checkbox"
                                        id="box5"
                                        checked={skinType === '복합성'}
                                        onChange={handleSTChange}
                                    />
                                    <label className='label_text' htmlFor="box5">복합성</label>
                                </td>
                            </div>
                            <tr>
                                {/* 공백 추가 */}
                                <td colSpan="2" className='spacer'></td> 
                            </tr>

                            </tbody>
                        </table>

                        <button type="submit">회원가입</button>

                            {/* 회원가입 실패 시 message 출력 */}
                        <p style={{ color: 'red' }}>{message}</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Join;