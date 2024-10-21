import React from 'react'
import Logo from '../../img/로고.png'
import './FooterPage.scss'

const FooterPage = () => {
  return (
    <div>
      <div className='division_line'></div>
      {/* <img src={Logo} className="logoimg" alt="팀로고" /> */}
      <div className='footer'>
        <p>주식회사 퍼스널픽</p>
        <p>팀장 : 최지원 / 팀원 : 김도연 이상현 오세원 정승진 </p>
        <br/>
        <p>주소 : 광주광역시 동구 중앙로 196</p>
        <p>대표전화 : 062-0000-0000 (평일 오전 9시 ~ 오후 6시)</p>
        <p>이메일 : personalpick@naver.com</p>
        <p>Copyright 2024. PersonalPick. All rights reserved.</p>
      </div>
    </div>
  )
}

export default FooterPage