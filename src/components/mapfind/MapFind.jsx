import React, { useState } from 'react';
import DaumPostcode from "react-daum-postcode"; //추가
import { modalClose } from '../../util/util';

function MapFind({setAddrSearch}) {
    function setData(data){
        setAddrSearch(data)
        console.log(data);
        modalClose();
    }
    return (
        <>
            <div style={{width :"100%"}}>
                <DaumPostcode onComplete={setData}/>
            </div>
        </>

    )
}

export default MapFind;
