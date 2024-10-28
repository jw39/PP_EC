import React, { useEffect, useState } from 'react';
import InputBox from '../../components/inputbox/InputBox';
import { sendDel, sendGet, sendPost, URL } from '../../util/util';
import './Search.scss';
import Star from '../../img/별.png';
import Back from '../../img/왼쪽.png';
import { getDay } from "../../util/utilStr";

import { useNavigate } from 'react-router-dom';

const Search = () => {


    // 페이지 이동 함수
    const nav = useNavigate();



    // 사용자가 찾고 싶은 제품을 검색했을 때 나타나는 제품리스트
    const [productList, setProductList] = useState([]);
    // 사용자가 검색한 검색어
    const [inputvalue, setInputvalue] = useState("");

    const [isSticky, setIsSticky] = useState(false); // 상태 변수 추가

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsSticky(true); // 스크롤이 내려갈 때
            } else {
                setIsSticky(false); // 스크롤이 맨 위에 있을 때
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const showConsole = (cosdata) => {
        setProductList(cosdata);  // 실시간 적용되게(렌더링)   
    };


    // 컴포넌트가 처음 렌더링될 때 데이터 가져오기
    useEffect(() => {
        // 검색한 5개의 리스트를 백엔드로 보내기 (새로고침 했을 때 검색한 단어가 날아감 방지)
        // // 백엔드에서 다시 받아와서 최근 검색어에 넣어주기
        sendGet(URL + "/SearchList", setSearchHistory);

        sendGet(URL + "/MainPage", showConsole); // 데이터(url) 가져와서 showConsole 함수 호출
    }, []); // 빈 배열을 두 번째 인자로 전달하여 마운트 시 한 번만 실행


    useEffect(() => {
        // 검색어 전체 리스트 형식으로 가져오는 게 아니라 단어 객체 하나만 가져온다는 것
        sendGet(URL + "/SearchPage?value=" + inputvalue, showConsole);
    }, [inputvalue]);


    // 내가 찾고 싶은 제품 단어를 검색했을 때 나타나는 최근 검색어
    // searchHistory : 최근 검색어를 저장할 상태 변수(최근 검색어를 저장하는 배열)
    const [searchHistory, setSearchHistory] = useState([]);

    // 굳이 sendDel을 만들지 않아도 sendPost로 내가 검색한 최근검새어 리스트(ex.5개)를 보낼 것이고
    // X 버튼을 onClick 했을 때에 남은 리스트(ex.4개)도 sendPost로 보내기때문에 sendDel를 만들 필요 없음
    useEffect(() => {

        sendPost(URL + "/SearchList", null, searchHistory);
    }, [searchHistory]); // 빈배열 안에 searchHistory(최근 검색어)가 있는 경우는 최근검색어를 검색하고 화면에 나왔을 때 렌더링하겠다는 뜻

    // 절대 주석 풀지 말 것!!!!!!!!!!!!
    // useEffect(() => {
    //     sendDel(URL + "/SearchList?value=", searchHistory)
    // },[searchHistory])



    // 검색어를 추가하는 함수
    // inputbox에서 검색어를 searchadd로 받아옴 
    const searchAdd = (searchValue) => {  // 새로운 검색어
        // 최근 검색어 단어 중복 제거
        // 새로운 검색어가 이미 검색 기록에 존재하는지 확인
        if (searchHistory.indexOf(searchValue) !== -1) {
            // 검색어가 이미 존재하면, 해당 검색어를 최근 검색어 목록 맨 앞으로 이동
            const updatedHistory = searchHistory.filter(item => item !== searchValue);
            setSearchHistory([searchValue, ...updatedHistory]);
        } else {
            // 새로운 검색어가 존재하지 않으면 추가
            // 5개 과거(이전) 데이터 있는데 + 현재(최신) 데이터 1개 => 총 6개 배열 나옴(이전 검색어 리스트에 새로운 검색어를 배열 끝에 추가)
            const newHistory = [searchValue, ...searchHistory];
            // 검색어 리스트가 5개를 초과하면 가장 오래된 검색어 제거
            if (newHistory.length > 5) {
                newHistory.pop();  // 가장 오래된 검색어 제거
            }
            // 최근 검색어의 바뀐 데이터(내가 최근에 검색한 단어들)를 계속해서 화면에 출력하는 역할(연결점 같은 것)
            setSearchHistory([...newHistory])
        }
        sendGet(URL + "/SearchPage?value=" + searchValue, showConsole);

        // 검색어를 inputvalue에 설정하여 검색 실행
        //setInputvalue("");
        setInputvalue(inputvalue);


    };



    // 검색어를 삭제하는 함수
    const searchDelete = (indexToDelete, e) => {
        e.stopPropagation()
        const newHistory = [...searchHistory];
        // filter함수를 사용해 indexToDelete한 것이 아닌 index값들만 가져오는 것
        const newList = newHistory.filter((item, index) => index !== indexToDelete)
        // 스트레드로 newList에 리스트 형식으로 묶어서 SearchHistory에 담아주기
        setSearchHistory([...newList]);
        // console.log("i");

    };


    // 최근검색어의 단어 클릭 시 그 단어의 제품리스트 띄우는 함수
    const searchClick = (searchClickValue) => {
        setInputvalue(searchClickValue);
    }


    // 제품 클릭 시 detailinfo 페이지로 이동하는 함수
    const handleProductClick = (idx) => {
        nav(`/detailinfo/${idx}`);
    };




    // 오늘날짜
    let today = new Date()

    return (
        <div>
            {/* <div id='main'> */}
            <div className={`Search ${isSticky ? 'sticky' : ''}`}>
                {/* InputBox 컴포넌트에 searchAdd 함수를 전달하여 검색어 입력 시 호출되게 함 */}
                <div className='searchbtn'>
                    {/* <button className='' type="button" onClick={() => nav('/')}> */}
                    {/* </button> */}

                    <div className='back'>
                        <img onClick={() => nav('/')} src={Back}></img>
                    </div>
                    <InputBox className='width' func={searchAdd} inputvalue={inputvalue} setvalue={setInputvalue}></InputBox>


                </div>
                {/* <div style={{ height: '120px' }}> */}
                <div>
                    <div className='recent'>
                        <h2 className='recentName'>최근 검색어</h2>
                        {/* <button type='button' className='deletebtn'><span>전체 삭제</span></button> */}
                    </div>

                    <div className='search'>
                        {/* 검색 기록을 화면에 표시 */}
                        {searchHistory.length > 0 && searchHistory.map((item, index) => (
                            // 각 검색어를 리스트 아이템으로 표시
                            <button className='recentSearchName' key={index} onClick={() => searchClick(item)}>{item}
                                <span className='deletebtn' onClick={(e) => searchDelete(index, e)}>
                                    <strong className='xbtn'>X</strong>
                                </span>
                            </button>
                        ))}
                    </div>
                    <hr className='line' />
                </div>
                {/* 서버에서 가져온 제품 리스트를 화면에 표시 */}
                <div className='h-24' />
                <div className='timeproduct'>
                    <p className='searchtime'>
                        {today.getMonth() + 1 + "월 " + today.getDate() + "일 " + getDay(today.getDay()) + " " + today.getHours() + ":00"}
                    </p>
                    <h2 className='product'>지금 가장 많이 구매하고 있어요:)</h2>
                    {/* <strong>검색한 제품 개수{idx}</strong> */}
                </div>
                <div className='products'>
                    <ul>
                        {productList.length > 0 && productList.map((item) => (
                            <li className='product1' key={item.idx} onClick={() => handleProductClick(item.idx)}>
                                <div className='searchflex'>
                                    <div className='idx'>{item.idx}</div>
                                    <img src={item.cos_img_src} style={{ width: '80px', height: '80px' }} alt={item.cos_name} className='productimg'></img>
                                    <div className='items'>
                                        <div className='searchfont'>
                                            <span className='searchbrand'>{item.brand_name}</span>
                                            <span>{item.cos_name}</span>
                                        </div>

                                        <div className='review1'>
                                            <span><img className='star1' src={Star}></img></span>
                                            <span className='grade'>{item.grade}</span>
                                            <span className='gray'>({item.grade_count})</span>
                                        </div>
                                        <div className='searchprice'>
                                            <span className='jungga'>정가 </span>
                                            <span className='won'>{item.price}</span>
                                            <span className='gray'>/{item.vol}</span>
                                        </div>
                                        <br />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* </div> */}
        </div>
    );
};

export default Search;
