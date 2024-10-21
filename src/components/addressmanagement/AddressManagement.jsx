import React, { useEffect, useState } from 'react';
import LeftArrow from '../../img/왼쪽.png'
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../pageheader/PageHeader';
import "./AddressManagement.scss"
import MapFind from '../mapfind/MapFind';
import { sendGet, sendPost, showMap, URL } from '../../util/util';
import { useSelector } from 'react-redux';
const msgData = [
    "-- 메시지 선택(선택사항) --", "배송전에 미리 연락바랍니다.", "부재시 경비실에 맡겨주세요.",
    "부재시 문앞에 놓아주세요.", "빠른 배송 부탁드립니다.", "택배함에 보관해 주세요"
]
const AddressManagement = () => {
    const nav = useNavigate()
    const {pagetype, address_idx} = useParams()
    const user = useSelector(state=>state.user)
    const [isSubmitting, setIsSubmitting] = useState(false);

    
    // 받는 사람
    const [receiveUser, setReceiveUser] = useState("");
    // 폰 시작번호
    const [firstNum , setFirstNum] = useState("010");
    // 폰 중간 번호
    const [middleNum, setMiddleNum] = useState("");
    // 폰 뒷 번호
    const [lastNum, setLastNum] = useState("");
    // 우편번호
    const [addressNum, setAddressNum] = useState("");
    // 기본주소
    const [address, setAddress] = useState("");
    // 나머지 주소
    const [lastAddress, setLastAddress] = useState("");

    // 메시지
    const [message, setMessage] = useState("");
    // 메시지 "직접입력" 선택여부확인
    const [messageDirect, setMessageDirect] = useState("");

    // 기본배송지 저장 유무
    const [defaultAddr, setDefaultAddr] = useState(false);

    const [searchResult, setSearchResult] = useState();
    function isType(type){
        if(type === "수정")
        {
            return true;
        }
        else{
            return false;
        }
    }
    let UserNm = "";

    function isDirectMsg(str){
        for(let i =0; i< msgData.length; i++)
        {
            if(msgData[i] === str)
            {
                return true;
            }
        }
        return false;
    }
    function saveData(data){
        console.log(data)
        let parseaddress = data[0].user_address.split("///");
        switch(parseaddress.length)
        {
            case 2:
                setAddressNum(parseaddress[0])
                setAddress(parseaddress[1])
                break;
            case 3:
                setAddressNum(parseaddress[0])
                setAddress(parseaddress[1])
                setLastAddress(parseaddress[2])
                break;
        }
        setMessage(data[0].msg)
        setReceiveUser(data[0].receive_name)
        let phone = data[0].phone_num.split("-")
        if(isDirectMsg(data[0].msg))
        {
            setMessageDirect(data[0].msg)
        }
        else{
            setMessageDirect("direct_message")
            setMessage(data[0].msg)
        }
        setFirstNum(phone[0])
        setMiddleNum(phone[1])
        setLastNum(phone[2])
        setDefaultAddr(data[0].default_address)

    }
    // pageType 이 true일때는 배송지 수정화면이 출력 false일때는 배송지 등록화면
    useEffect(()=>{

        UserNm =sessionStorage.getItem("username");
        if(isType(pagetype))
        {
            // 주소 데이터 받아오는 로직
            sendGet(URL+"/EditAddress?address_idx="+ address_idx,saveData)
        }

    },[])

    function sendData(){

        
        let dic = {
            default_address: defaultAddr,
            msg: messageDirect !=="direct_message" ? messageDirect : message,
            phone_num : firstNum+"-"+middleNum+"-"+lastNum,
            receive_name : receiveUser,
            user_address: addressNum+"///"+address+"///"+lastAddress,
            user_id : user.user_id,
        }

        if(pagetype === "추가")
        {
            sendPost(URL+ "/InsertAddress", (()=>nav(-1)), dic);
        }
        else
        {
            dic.address_idx = address_idx
            sendPost(URL+"/EditAddress",(()=>nav(-1)),dic)
        }
        
    }

    useEffect(()=>{
        if(message === "direct_message")
        {
            setMessage("");
        }
     },[message])


    useEffect(()=>{
        if(searchResult!==undefined)
        {
            setAddressNum(searchResult.zonecode)
            setAddress(searchResult.address)
        }

    },[searchResult])
    return (
        <>
            <PageHeader title={isType(pagetype) ? "배송지 수정" : "배송지 등록"}/>

            <div style={{borderTop : "1px solid #000" }}>
                <p className='address_contents_title'>{isType(pagetype) ? "배송지 수정" : "배송지 등록"}</p>
                <div style={{marginBottom:"20px", borderTop : "1px solid #000", borderBottom: "1px solid #000"}}>
                    <div className='flex_col address_container_row'>
                        <div>
                            받는사람 <span>*</span>
                        </div>
                        <input id='input1' type="text" onChange={(e)=> setReceiveUser(e.target.value)} value={receiveUser} />
                    </div>
                    <div className='flex_col address_container_row' style={{paddingBottom : "5px"}}>
                        <div>
                            주소<span>*</span>
                        </div> 
                        <input id='input2' style={{flex : 0}} type="text" placeholder='우편번호' onChange={(e)=>setAddressNum(e.target.value)} readOnly value={addressNum}/>
                        <button onClick={()=>showMap(<MapFind setAddrSearch={setSearchResult}/>)}>주소검색</button>
                    </div> 
                    <div className='flex_col address_container_row' style={{padding : "0px 20px"}}>
                        <div>
                            &nbsp;
                        </div> 
                        <input id='input3' type="text" placeholder='기본주소' onChange={(e)=>setAddress(e.target.value)} readOnly value={address}/>
                    </div> 
                    <div className='flex_col address_container_row' style={{paddingTop : "5px"}}>
                         <div>
                            &nbsp;
                        </div>
                        <input id='input4' type="text" placeholder='나머지 주소(선택 입력 가능)' onChange={(e)=>setLastAddress(e.target.value) } value={lastAddress}/>
                    </div> 
                    <div className='flex_col address_container_row'>
                        <div>
                            휴대전화 <span>*</span>
                        </div>
                        <select defaultValue={"010"} className='dropdown' name="" id="" onChange={(e)=> setFirstNum(e.target.value)} value={firstNum}> 
                            <option value="010" >010</option>
                            <option value="011" >011</option>
                            <option value="016" >016</option>
                            <option value="017" >017 </option>
                            <option value="018" >018</option>
                            <option value="019" >019</option>
                        </select>
                        <span>-</span>
                        <input id='input5' type="text" onChange={(e)=>setMiddleNum(e.target.value)} value={middleNum}/>
                        <span>-</span>
                        <input id='input6' type="text" onChange={(e)=>setLastNum(e.target.value)} value={lastNum}/>
                    </div> 
                </div>
                    <div  style={{borderTop : "1px solid #000"}}>
                        <p className='address_contents_title'>배송 요청사항</p>
                        <div style={{borderTop : "1px solid #000"}} className='flex_col address_container_row'>
                            <input id='input9' type="text" style={{display: messageDirect !=="direct_message" ? "none" : "inline-block"}} placeholder='요청사항을 입력해주세요' value={message} onChange={(e)=>setMessage(e.target.value)}/>
                            <select defaultValue={"-- 메시지 선택(선택사항)--"} className='dropdown dropflex' name="" id="" value={messageDirect} onChange={(e)=>{

                                setMessage(e.target.value)
                                setMessageDirect(e.target.value);
                            }}>
                                <option value="choice">{msgData[0]}</option>
                                <option value="배송전에 미리 연락바랍니다." >{msgData[1]}</option>
                                <option value="부재시 경비실에 맡겨주세요." >{msgData[2]}</option>
                                <option value="부재시 문앞에 놓아주세요." >{msgData[3]}</option>
                                <option value="빠른 배송 부탁드립니다." >{msgData[4]}</option>
                                <option value="택배함에 보관해 주세요" >{msgData[5]}</option>
                                <option value="direct_message" >직접입력</option>
                            </select> 
                        </div>

                        <br />
                        <div style={{padding : "0 15px", paddingBottom : "20px", borderBottom : "1px solid #000"}}>
                            <input id='input10' type="checkbox" name=""  onChange={(e)=>setDefaultAddr(e.target.checked)} checked={defaultAddr}/>
                            <span>기본 배송지로 저장</span>
                        </div>
                    </div>
            </div>
            <div style={{padding : "30px 60px"}}>
                <button className='basket_fix_btn' style={{position:"static"}} onClick={()=>sendData()}>저장</button>
            </div>
        </>
    );
};

export default AddressManagement;