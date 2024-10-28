import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/pageheader/PageHeader';
import './ItemOrderView.scss'
import { sendGet, URL } from '../../util/util';
import { useSelector } from 'react-redux';
import Right from '../../img/오른쪽.png'
import { useNavigate } from 'react-router-dom';
const _ = require('lodash');
const ItemOrderView = () => {
    const [data, setData] = useState([]);
    const [nameData, setNameData] = useState([])
    const nav = useNavigate();
    const user = useSelector(state => state.user)
    useEffect(() => {
        sendGet(URL + "/OrderHistory?user_id=" + user.user_id, datafactory);
    }, [user])
    let duplementName = [];
    function datafactory(data) {
        let list = [...data]

        for (let i = 0; i < list.length; i++) {
            let date2 = list[i].order_date.split("T");
            list[i].order_date = date2[0]
        }
        console.log(data)
        setNameData(_.uniqBy(list, "order_name"))
        setData(data)
        
    }

    useEffect(() => {
        console.log(data)
    }, [data])

    const style = {
        cursor:'pointer'
    }

    return (
        <>
            <PageHeader title={"주문내역"} />
            {nameData.map(name => {
                return (
                
                    <div className='itemordercontainer'>
                        <div className='date_title flex_col'>
                            <p>{name.order_date}</p>
                            <div><img src={Right} alt="" style={style} onClick={() =>{
                                let list = data.filter(box => {
                                    if(name.order_date === box.order_date && name.order_name === box.order_name)
                                    {
                                        return box;
                                    }
                                })
                                console.log(list)                                        
                                
                                nav('/itemOrderDetail',{
                                state : list
                                })
                            }}/></div>
                        </div>
                        <div className='under_contents' >{name.order_name}</div>
                    </div> 
                )
            })}
        </>
    );
};

export default ItemOrderView;
