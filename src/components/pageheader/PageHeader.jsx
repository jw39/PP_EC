import React from 'react';
import { useNavigate } from 'react-router-dom';
import LeftArrow from '../../img/왼쪽.png'
import "./PageHeader.scss"

const PageHeader = ( {title} ) => {
    const nav = useNavigate();
    return (
        <div className='pageHeader_container itemname' >
            <img className='home_menu float_l cursor' src={LeftArrow} alt=""  onClick={()=>nav(-1)}/>
            <p>{title}</p>
        </div>
    );
};

export default PageHeader;