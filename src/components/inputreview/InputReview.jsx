import React, { useEffect, useState } from 'react';
import './InputReview.scss'
import { sendGet, sendPost, showComplete, URL } from '../../util/util';
import { setStarMenu } from '../../util/util';
import { useNavigate } from 'react-router-dom';
import { getLoginSession } from '../../util/session'


const InputReview = ({item , setReview , setReviewCnt , setScoreCnt}) => {
    const [contents, setContents] = useState("")
    const [user, setUser] = useState({});
    const [index , setIndex] = useState(10);

    const nav = useNavigate();
    function temp(data) {  
        setUser(data[0])
    }
    useEffect(() => {
        let nick = sessionStorage.getItem("username");
        if (nick !== "") {
            sendGet(URL + '/TestSearch?user_nm=' + nick, temp)
        }

    }, [])

    function threeget ()
    {
        showComplete(<p style={{padding:"50px 0"}}>리뷰 등록이 완료되었습니다.</p>,  nav);
        
    }


    function sendReview() {
        if (user.user_id === "") {
            alert("로그인해 주세요")
            return
        }
        if(index === 10)
        {
            alert("별점을 골라주세요")
            return
        }

        if(contents === "")
        {
            alert("리뷰를 작성해 주세요")
            return
        }

        console.log('user : ', user);
        console.log('user_nm : ', getLoginSession().usernm)
        console.log('user_id : ', getLoginSession().username)


        sendPost(URL + '/InsertReview',  threeget ,
            {
                user_nm: getLoginSession().usernm,
                cos_name: item.cos_name,
                rating: index,
                review: contents,
                cos_idx: item.idx,
                user_id: getLoginSession().username
                // cos_idx, user_idx
            })
    }


    return (
        <div style={{margin: "auto"}}>
            {/* 댓글 쓰는 창 */}
            <div className='reviewcommentmainbox'>
            <div className='settingstar'>
                <p className='settingstartext px-20'>
                    화장품 만족도는 어떠셨나요?
                </p>
                <br />
                <p className='settingstartext px-20'>리뷰를 작성해 주세요. 리뷰 작성 시 포인트 지급됩니다.</p>
            </div>

            <div className='setstarmenu px-20'>
            <span className='setstarmenutext'>평점</span>
                <div>
                    {setStarMenu(setIndex)}

                </div>
            </div>

            <div className='review_containerbox'>
                <textarea
                    className="review_container"
                    type="text"
                    placeholder={'상세한 리뷰를 작성해 보세요! \n리뷰 작성하면 포인트도 받고, 내 리뷰가 최상단에 떠요!'}
                    value={contents}
                    onChange={(e) => setContents(e.target.value)}
                    
                />
            </div>

            {/* 등록버튼 */}
            <div className='reviewenterbox'>
                <button className='reviewenter' onClick={() => sendReview()}>
                    리뷰 등록하기
                </button>
            </div>
            </div>

        </div>
    );
};

export default InputReview;