import React from 'react';
import "./Scroll.scss"

const Scroll = ( { tagList}) => {
    return (
        <div className='scroll'>
            {tagList}
        </div>
    );
};

export default Scroll;