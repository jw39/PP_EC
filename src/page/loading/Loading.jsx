import React ,{useEffect , useState} from 'react'
import splash from "../../img/스플래시로고.png"
import './Loading.scss'


const Loading = () => {
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setIsLoading(false);
      }, 1000000); // 2초마다 실행
  
      return () => {
        clearInterval(timer); 
      };
    }, []);
  
    const handlePageMove = () => {
      window.location.href = "/home";
    };
  
    return (
      <div id ='wrapper'>
        {isLoading ? (
          <img src={splash} alt="스플래시 로고" className='splashimg'/>
        ) : (
          handlePageMove()
        )}
      </div>
    );
  };
  
  export default Loading;