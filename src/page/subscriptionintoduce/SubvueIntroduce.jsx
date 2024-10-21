import React from 'react'
import './SubscriptionIntroduce.scss'

const SubvueIntroduce = () => {
  return (
    <div>

        {/* 가격 부분 */}
        <div className='subintropricemainbox'>
                <div className='w-[2px] bg-gray-300 subintroducebar' />
                <span className='subintroprice'>가격</span>
                <div className='w-[2px] bg-gray-300 subintroduce1bar' />
            </div>

            {/* 구독 박스 */}
            <div className='subintrobox'>

                <span className='basicintroboxtext'>색조 샘플 구독</span>
                <span className='basicintroboxtext1'>20,000/월</span>
                <span className='basicintroboxtext2'>월 정기결제, 색조 샘플 기준</span>

                <div className='w-[3px] bg-blue-300 subintroboxbar' />

                <span className='basicexplaintext'>빅 데이터 알고리즘 반영</span>
                <span className='basicexplaintext1'>사용자 맞춤형 샘플</span>
                <span className='basicexplaintext2'>총<a className='sampletext'>5가지 샘플</a>증정!</span>

                <span className='basicdatetext'>구독 기간 20xx.xx.xx ~ 20xx.xx.xx</span>
                <span className='basicdatetext1'>매월 x일 선택하신 결제 수단으로 자동 결제가 이루어집니다.</span>
                <span className='basicdatetext2'>해당 월에 결제일에 맞는 날짜가 없다면, 그 달 마지막 날에 결제됩니다.</span>
                <span className='basicdatetext3'>(29일 , 30일 , 31일)</span>
                <span className='basicdatetext4'>구독 후 언제든 해지 가능!</span>

            </div>

            {/* 결제하기 버튼 */}

            <div className='buysubscriptionmain'>
                <div className="buysubscriptionbutton">
                    <a className="buysubscription btn first flex">구매하기</a>
                </div>
            </div>





    </div>
  )
}

export default SubvueIntroduce