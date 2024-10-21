import React from 'react'
import './TempSkin.scss'

let dic = {
    count : 3,
    value : "피부 보습"
}


const TempSkin = ( {list} ) => {
    return (
        <div className='temSkin_main'>
            {list.map((dic,idx)=>{
                return (
                    <div key={idx}>
                        <div className='tempSkin_Container' key={idx}>
                            <div>{dic.count + "개"}</div>
                            <div className='skinChart_back'>
                                <div className='skinChart' style={{height : dic.count*20+"%", backgroundColor:"rgb(145 209 204)"}}>
                
                                </div>
                            </div>
                            <div className='tempskin_Title'>{dic.value}</div>
                        </div>
                    </div>
                )
            })}
        </div>

    )
}

export default TempSkin