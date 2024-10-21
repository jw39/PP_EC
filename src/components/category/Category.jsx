import React, { useEffect, useState } from 'react';
import { modalClose, sendGet, showSwal, URL } from '../../util/util';
import Up from '../../img/위쪽.png'
import Down from '../../img/아래쪽.png'
import Right from '../../img/오른쪽.png'
import './Category.scss'
import { choicRankingCategory, isStrCheck } from '../../util/utilStr';
import axios from 'axios';
import { setHomeAge, setHomeCategoryData, setHomeCategoryMenu, setHomeSkin } from '../../redux/type/typefunc';
import { useDispatch, useSelector } from 'react-redux';


let categoryState = [false, false, false, false, false, false, false, false]


const Category = ({categoryData}) => {
    const dispatch = useDispatch();
    const homeCateMain = useSelector(state => state.homeCategory)
    const skinCate = useSelector(state => state.homeSkin)
    const ageCate = useSelector(state => state.homeAge)

    
    async function getData1(key){
        let data = await axios
        .get(URL + '/CategorySel?category='+homeCateMain.mainTitle +'&category2=' + key)
        .then(res=>{
            return res.data;
        })
        dispatch(setHomeCategoryData(data))
    }
    async function getData2(key){
        let data = await axios
        .get(URL + "/suggestSkinType?skintype="+ key)
        .then(res=>{
            return res.data;
        })
        dispatch(setHomeSkin(key,data));
    }
    async function getData3(key){
        let age = key.substr(0, 2);
        let data = await axios
        .get(URL + "/suggestAge?age="+ age)
        .then(res=>{
            return res.data;
        })
        dispatch(setHomeAge(key,data));
    }
    useEffect(()=>{
        getData1(homeCateMain.choiceKey);
        
    },[homeCateMain.choiceKey])
    useEffect(()=>{
        getData2(skinCate.choiceKey)
        getData3(ageCate.choiceKey)
    },[])
    function getChoiceRankingData(value){
        let result = null;
        switch(value)
        {
            case categoryData[1]:
                result = choicRankingCategory.skinCare
                break;    
            case categoryData[2]:
                result = choicRankingCategory.facemakeup
                break;
            case categoryData[3]:
                result = choicRankingCategory.ribmakeup
                break;
            case categoryData[4]:
                result = choicRankingCategory.eyemakeup
                break;
            case categoryData[5]:
                result = choicRankingCategory.contuaring
                break;
            case categoryData[6]:
                result = choicRankingCategory.beautitall
                break;
            case categoryData[7]:
                result = choicRankingCategory.cleanSing
                break;
            case categoryData[8]:
                result = choicRankingCategory.maskPack
                break;
            case categoryData[9]:
                result = choicRankingCategory.sunCare
                break;
            case categoryData[10]:
                result = choicRankingCategory.body
                break;
            case categoryData[11]:
                result = choicRankingCategory.hair
                break;
            case categoryData[12]:
                result = choicRankingCategory.nail
                break;
            case categoryData[13]:
                result = choicRankingCategory.lifeTax
                break;
            case categoryData[14]:
                result = choicRankingCategory.smalleye
                break;
            case categoryData[15]:
                result = choicRankingCategory.preigrens
                break;
            case categoryData[16]:
                result = choicRankingCategory.device
                break;
            case categoryData[17]:
                result = choicRankingCategory.innerbeauti
                break;
            case categoryData[18]:
                result = choicRankingCategory.baby
                break;
            case categoryData[19]:
                result = choicRankingCategory.man
                break;
        }
        return result
    }

    async function outPage(e, title){
        e.preventDefault();
        if(isStrCheck(e.target.innerText))
        {
            return;
        }

        // 이벤트 요소의 부모태그의 스트링값을 찾아서 맞는 데이터 리턴
        let titleStr = title.split("\n")[0];
        let list1 = getChoiceRankingData(titleStr); 
        
        dispatch(setHomeCategoryMenu(titleStr,list1, e.target.innerText));

        modalClose()

        let itemTag = document.getElementsByClassName("category_item");
        
        for(let i=0; i< itemTag.length; i++)
        {
            itemTag[i].removeEventListener("click", (e)=>outPage(e,title))
        }
    }

    function showView(){
        
        
        if(categoryData[0] === '건성')
        {
            return (
                <>
                    {categoryData.map((item, idx)=>{
                        return <button className={skinCate.choiceKey == item ? "category_btn" :"category_item"} key={idx} onClick={(e)=>categoryClickEvent(e)}>{item}</button>
                    })}
                </>
            )
        }
        else if(categoryData[0] === '10대'){
            return (
                <>
                    {categoryData.map((item, idx)=>{
                        return <button className={ageCate.choiceKey == item ? "category_btn" :"category_item"} key={idx} onClick={(e)=>categoryClickEvent(e)}>{item}</button>
                    })}
                </>
            )
        }
        else if(categoryData[0] === "카테고리 전체")
        {
            return (
                <>
                    <button className='category_btn cursor' onClick={() =>showModal()}>
                    {homeCateMain.mainTitle}
                    </button>
                    {
                        homeCateMain.keyList === null ?
                        ""
                        :
                        homeCateMain.keyList.map((item, idx)=>{
                            return <button className={homeCateMain.choiceKey == item ? "category_btn" :"category_item"} key={idx} onClick={(e)=>categoryClickEvent(e)}>{item}</button>
                        })

                    }
                </>
            )
        }
    }

    function showModal()
    {
        let str = "";
        if(categoryData[0] === '건성')
        {

        }
        else if(categoryData[0] === "카테고리 전체")
        {
            categoryData.map((item, idx)=>{
                str += `<div class='subtitle cursor'>${item} <img class="category_arrow" src="${idx === 0? Up : Right}" alt="팀로고" /></div>`;
                return null;
            })
        }
        
        showSwal(str, underView)
    }
    
    function underView(e, idx)
    {
        let titleTag = document.getElementsByClassName("subtitle");
        if(idx === 0)
        {

            dispatch(setHomeCategoryMenu(categoryData[0],[],""));

 
            modalClose()
            return
        }
        e.stopPropagation() 
        let result = getChoiceRankingData(categoryData[idx])
        let imgTag = document.getElementsByClassName("category_arrow");
    
        if(categoryState[idx])
        {
            titleTag[idx].innerHTML =categoryData[idx] + `<img class="category_arrow" src="${idx === 0? Up : Right}" alt="팀로고" />`;
            categoryState[idx] = !categoryState[idx]
            return;
        }
        else
        {
            imgTag[idx].src = Down;
            categoryState[idx] = !categoryState[idx]
        }
    
        let tag ='<div class="flex_col flex_wrap">';
        result.map((item)=>{
            tag += `<div class="category_item">${item}</div>`;
            return null;
        })
        tag += '</div>';

        titleTag[idx].innerHTML += tag;
        let titleValue = []
        for(let i =0; i< titleTag.length; i++)
        {
            titleValue.push(titleTag[idx].innerText.split("\n")[0])
        }
    
        let itemTag = document.getElementsByClassName("category_item");
        
        for(let i=0; i< itemTag.length; i++)
        {
            itemTag[i].addEventListener("click", (e)=>outPage(e,titleValue[idx]))
        }
    
    }


    async function categoryClickEvent(e){
        e.stopPropagation()
        if(categoryData[0] === '건성' )
        {
            
            let data = await axios
            .get(URL + "/suggestSkinType?skintype="+ e.target.innerText)
            .then(res=>{
                return res.data;
            })
            dispatch(setHomeSkin(e.target.innerText,data));
        }
        else if(categoryData[0] === "10대")
        {
            let age = e.target.innerText.substr(0, 2);
            let data = await axios
            .get(URL + "/suggestAge?age="+ age)
            .then(res=>{
                return res.data;
            })
            dispatch(setHomeAge(e.target.innerText,data));
        }
        else if(categoryData[0] === "카테고리 전체")
        {
            dispatch(setHomeCategoryMenu(homeCateMain.mainTitle, homeCateMain.keyList,  e.target.innerText));
        }
    }


    const [isMoving, setIsMoving] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    let scroll = document.getElementsByClassName('category_container');
    const handleMouseDown = (e) => {
        setIsMoving(true);
        setStartX(e.pageX - scroll[0].offsetLeft);
        setScrollLeft(scroll[0].scrollLeft);
    };
    
    const handleMouseMove = (e) => {
        if (!isMoving) return;
        e.preventDefault();
        const x = e.pageX - scroll[0].offsetLeft;
        const walk = (x - startX) * 1.5; // 스크롤 속도 조절
        scroll[0].scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsMoving(false);
    };

    const mouseout = () => {
        
        setIsMoving(false);
    }
    return (
        <div className='category_container cursor' onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={mouseout}>
            {
                showView()
            }
        </div>
    );
};

export default Category;