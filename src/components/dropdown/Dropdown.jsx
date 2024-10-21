import { useState } from 'react'
import './Dropdown.scss'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'


function Dropdown ({/*{selected , setSelected , type}*/}) {

    const [value , setValue] = useState()

    const options = [
        {label : '안' , value : 1},
        {label : '아아' , value : 2},
        {label : '아아아아' , value : 3}
    ]

    function handleSelect(event){
        setValue(event.target.value)
    }

    //const [isActive, setIsActive] = useState(false);

    //const List = {
        //data1 : ['기초' , '색조'],
        //data2 : ['1개월' , '2개월'],
        //data3 : ['원하는 샘플 하나 선택' , '랜덤 샘플 선택']
    //}[type]


    return (
        <div className="dropdownboxstyle">

            <select onChange={handleSelect} className='selectbox'>
                {options.map(option => (
                    <option value={option.value}>{option.label}</option>
                ))}
            </select>

            <p>{value}</p>


            {/* <div className="dropdown-btn" onClick={(e) => 
                setIsActive(!isActive)}>
                {selected}
                </div>
            {isActive && (
                 <div className="dropdown-content">
                    {List.map((option) => (
                        <div 
                         onClick={(e) => {
                            setSelected(option)
                            setIsActive(false)
                        }}
                        className="dropdown-item"
                        >
                        {option}
                        </div>
                    ))}
             </div>
            )} */}
    </div>
    )
}

export default Dropdown