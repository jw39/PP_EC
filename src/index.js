import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
// import '../public/index.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import personalReducer from './redux/reducer/reducer';
import { Provider } from 'react-redux';

// 설치 완료 리스트
// npm i react-router-dom 
// npm install concurrently --save : 서버와 클라이언트를 한번에 실행시키기위한 라이브러리
// npm i axios
// npm i sass
// npm i swiper
// npm i sweetalert2 sweetalert2-react-content
// npm install animate.css
const store = createStore(personalReducer)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
