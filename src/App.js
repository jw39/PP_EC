// npm i -s react-router-dom
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

import Home from './page/home/Home';
import Search from './page/search/Search';
import Mypage from './page/mypage/Mypage';
import Detailinfo from './page/detailinfo/Detailinfo';
import Login from './page/login/Login';
import Join from './page/join/Join';
import Order from './page/order/Order'
import Review from './page/review/review'
import Point from './page/backendtest/Point'
import Typeheck from './page/typecheck/Typecheck'

import { useDispatch, useSelector } from 'react-redux';
import Footer from './components/footerPage/FooterPage';


import './App.css'
import './index.scss'
import TotalRanking from './page/totalitem/TotalRanking';
import Subscription from './page/subscription/Subscription';
import { setMenuView, setUser } from './redux/type/typefunc';
import HeaderView from './components/header/HeaderView';
import SubscriptionManagement from './page/subscriptionmanagement/SubscriptionManagement';
import ShoppingCart from './page/shoppingcart/ShoppingCart';
import PayShipment from './page/payshipment/PayShipment';
import ScrollToTop from './components/scrolltotop/ScrollToTop'
import './components/scrolltotop/ScrollToTop.scss'
import AddressManagement from './components/addressmanagement/AddressManagement';
import { sendGet, URL } from './util/util';
import { useEffect, useState } from 'react';
import SubscriptionIntroduce from './page/subscriptionintoduce/SubscriptionIntroduce';
import SubvueIntroduce from './page/subscriptionintoduce/SubvueIntroduce';
import SubbasicvueIntroduce from './page/subscriptionintoduce/SubbasicvueIntroduce';
import OrderComplete from './page/ordercomplete/OrderComplete';
import AiRecommend from './page/airecommend/AiRecommend';
import ItemOrderView from './page/itemorderview/ItemOrderView';
import AddressList from './page/addresslist/AddressList';
import ItemOrderDetail from './page/itemorderdetail/ItemOrderDetail';
import ItemReview from './page/itemreview/ItemReview';

function App() {
    const dispatch = useDispatch();
    function funcList(){
        dispatch(setMenuView(false))
    }


    return (
        <BrowserRouter basename={process.env.PUBLIC_URL} >
            <div className="App" id='wrapper' onClick={()=>funcList()}>
                <ScrollToTop/>
                <HeaderView/>
                <Routes>
                    {/*<Route path='/' element={<Loading/>}></Route>*/}
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/join' element={<Join />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/mypage' element={<Mypage />}></Route>
                    <Route path='/order' element={<Order />}></Route>
                    <Route path='/review' element={<Review />}></Route>
                    <Route path='/point' element={<Point />}></Route>
                    <Route path='/typecheck' element={<Typeheck />}></Route>
                    <Route path='/search/:value' element={<Search />}></Route>
                    <Route path='/search' element={<Search />}></Route>
                    <Route path='/totalitem/:category' element={<TotalRanking />}></Route>
                    <Route path='/detailinfo' element={<Detailinfo />}></Route>
                    <Route path='/detailinfo/:idx' element={<Detailinfo />}></Route>
                    <Route path='/airecommend/detailinfo/:idx' element={<Detailinfo />}></Route>
                    <Route path='/subscription' element={<Subscription />}></Route>
                    <Route path='/subscriptionmanagement' element={<SubscriptionManagement />}></Route>
                    <Route path='/cartlist' element={<ShoppingCart />}></Route>
                    <Route path='/payshipment/' element={<PayShipment />}></Route>
                    <Route path='/payshipment/:cos_id/:cos_count' element={<PayShipment />}></Route>
                    <Route path='/addressadd/:pagetype/:address_idx' element={<AddressManagement />}></Route>
                    <Route path='/subscriptionintroduce' element={<SubscriptionIntroduce/>}></Route>
                    <Route path='/subvueintroduce' element={<SubvueIntroduce/>}></Route>
                    <Route path='/subbasicvueintroduce' element={<SubbasicvueIntroduce/>}></Route>
                    <Route path='/airecommend' element={<AiRecommend/>}></Route>
                    <Route path='/complete' element={<OrderComplete/>}></Route>
                    <Route path='/addressList' element={<AddressManagement/>}></Route>
                    <Route path='/addressListAll' element={<AddressList/>}></Route>
                    <Route path='/itemOrder' element={<ItemOrderView/>}></Route>
                    <Route path='/itemOrderDetail' element={<ItemOrderDetail/>}></Route>
                    <Route path='/itemOrderReview' element={<ItemReview/>}></Route>
                </Routes>
                <Footer></Footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
