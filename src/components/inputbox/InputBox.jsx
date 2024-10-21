import React from 'react';
import './InputBox.scss';
import { useNavigate } from 'react-router-dom';
import InputBoxSearch from '../../img/돋보기.png';

const InputBox = ({ inputvalue, setvalue, func }) => {
    const nav = useNavigate();

    // Enter 키 처리 함수
    const handleKeyDown = (event) => {

        if (event.key === 'Enter') {
            func(inputvalue);  // 검색어를 추가
            nav("/search/" + inputvalue);  // 검색 페이지로 이동
        }
    };

    return (
        <div className='width margin_a' onClick={() => nav('/search/')}>
            <input
                className='search_box width'
                type="text"
                onChange={(e) => setvalue(e.target.value)}
                value={inputvalue}
                placeholder="검색어를 입력해 주세요"
                onKeyDown={handleKeyDown}  // Enter 키 이벤트 처리
            />
            <button className="btn-1" onClick={() => {

                func(inputvalue);
                nav("/search/" + inputvalue);
                
            }}>
                <img className='inputboxSearch' src={InputBoxSearch} alt="Search Icon" />
            </button>
        </div>
    );
};

export default InputBox;
