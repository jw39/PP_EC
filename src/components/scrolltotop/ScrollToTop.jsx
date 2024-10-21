import { useState , useEffect } from "react";
import './ScrollToTop.scss'
import Upbtn from '../../img/위쪽.png'

function TopButton() {

    const [showButton, setShowButton] = useState(false);

    const scrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })

    }
    useEffect(() => {
        const handleShowButton = () => {
            if (window.scrollY > 500) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        }

        window.addEventListener("scroll", handleShowButton)
        return () => {
            window.removeEventListener("scroll", handleShowButton)
        }
    }, [])

    return showButton && (
        <div className="scroll__container">
            <button id="topbtn" onClick={scrollToTop} type="button"><img src ={Upbtn} width={15}></img></button>
        </div>

    )
}

export default TopButton;