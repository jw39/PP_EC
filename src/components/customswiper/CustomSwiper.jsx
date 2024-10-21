import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import './CustomSwiper.scss'
import 'swiper/css';
import Star from '../../img/별.png'
import { useNavigate } from 'react-router-dom';

const CustomSwiper = ({ type, list, func }) => {

    const nav = useNavigate();
    
    return (
        <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={(e) => type === "word" && func(e.realIndex)}
            onSwiper={(swiper) => console.log(swiper)}
            pagination={{ clickable: true }}
            navigation
            //   direction='vertical'
            
            loop={true}
            speed={400}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            
        >
            {list.length > 0 && list.map((item, i)=>{
                return (
            <SwiperSlide key={i} >
                    <img className='cursor slilder_img' src={item.cos_img_src} alt=""  style={{width: type ==="word"? 650:500, height : 500,}} onClick={()=> {
                        if(type !== "word")
                        {
                            nav('detailinfo/'+(i+1))
                        }
                        else{
                            
                        }
                        }
                    }/>   
                    {   type !== "word" &&
                        <li className='cos_conater ' onClick={()=> nav('detailinfo/'+(i+1))}>
                            <div className='brand_name'><span>
                                {item.brand_name}</span>
                            </div>
                            
                            <div className='cos_name'><span>{item.cos_name}</span></div>
                            <div className='cos_price'><span>{"정가 " + item.price + "원 / " + item.vol }</span></div>
                            < br/>
                            <div className='flex_col'>
                                <img className='star' src={Star} alt="" />
                                <div><span className='cos_grade'>{item.grade }</span> 
                                <span className='cos_grade_cnt'>   {"("+item.grade_count+")"}</span></div>
                            </div>
                        </li> 
                    }
                    
                </SwiperSlide>
                )
            })}
        </Swiper>
    );
};

export default CustomSwiper;

// const CustomSwiper = ({ list }) => {
//     console.log(list)
//     return (
//         <Swiper
//             modules={[Autoplay]}
//             spaceBetween={2000}
//             slidesPerView={1}
//             onSlideChange={() => console.log('slide change')}
//             onSwiper={(swiper) => console.log(swiper)}
//             pagination={{ clickable: true }}
//             navigation
//             //   direction='vertical'
            
//             loop={true}
//             speed={400}
//             autoplay={{ delay: 1000, disableOnInteraction: false }}
            
//         >
//             {list.length > 0 && list.map((item, i)=>{
//                 return (
//                 <SwiperSlide key={i}>
//                     <img src={item.cos_img_src} alt="" />   
//                     <div className='cos_conater'>
//                         <p>
//                             {item.brand_name}
//                         </p>
//                         <p>{item.cos_name}</p>
//                         <p>{"정가 " + item.price + "원 / " + item.vol + "ml"}</p>
//                         <div className='flex_col'>
//                             <img className='star' src={Star} alt="" />
//                             <p>{"   "+item.grade+" ("+item.grade_count+")"}</p>
//                         </div>
//                     </div> 
//                 </SwiperSlide>
//                 )
//             })}
            


//         </Swiper>
//     );
// };

// export default CustomSwiper;