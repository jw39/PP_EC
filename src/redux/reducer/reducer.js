import { GrAction } from 'react-icons/gr';
import * as types from '../type/types';

const initialState = {
    isMenu : false, // 햄버거 메뉴 띄어짐 여부
    homeCategory : {
        mainTitle : "카테고리 전체",
        choiceKey : "",
        keyList : [],
        data : []
    },
    homeSkin : {
        choiceKey : "건성",
        data : []
    },
    homeAge : {
        choiceKey : "10대",
        data : []
    },
    user : undefined
}

const personalReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SETMENUVIEW:
            return {
                ...state,
                isMenu : action.view
            }
        case types.SETHOMECATEGORYMENU:
        
            let dic = {
                ... state.homeCategory
            }
            dic.mainTitle = action.title;
            dic.keyList = action.data;
            dic.choiceKey = action.key;
            return {
                ...state,
                homeCategory : dic
            }
        case types.SETHOMECATEGORYDATA:
            return {
                ...state,
                homeCategory : {
                    ...state.homeCategory,
                    data : action.data
                }
            }
        case types.SETHOMESKIN:
            return {
                ...state,
                homeSkin : {
                    choiceKey : action.key,
                    data : action.data
                }
            }
        case types.SETHOMEAGE:
            return {
                ...state,
                homeAge : {
                    choiceKey : action.key,
                    data : action.data
                }
            }
        case types.SETUSER:
            console.log(action)
            return {
                ...state,
                user : action.user
            }
        default:
            return state;
    }
}

export default personalReducer;