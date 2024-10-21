import * as types from './types'

export const setMenuView =(view) => ({
    type : types.SETMENUVIEW,
    view : view
})

export const setHomeCategoryMenu = (title, list,key) => ({
    type : types.SETHOMECATEGORYMENU,
    title : title,
    data : list,
    key : key
})

export const setHomeCategoryData = (data) => ({
    type : types.SETHOMECATEGORYDATA,
    data : data
})

export const setHomeSkin = (key, data) => ({
    type : types.SETHOMESKIN,
    key : key,
    data : data
})

export const setHomeAge = (key, data) => ({
    type : types.SETHOMEAGE,
    key : key,
    data : data
})

export const setUser = (user) => ({
    type : types.SETUSER,
    user : user
})