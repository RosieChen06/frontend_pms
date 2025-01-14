import React, { useContext, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import List from '../components/List'
import { BiDetail } from "react-icons/bi";
import { UserContext } from '../../context/UserContext';
import Detail from '../components/Detail';

const Confirmed = () => {

    const {getDB, rider, state, token} = useContext(AdminContext)
    const filterdData = rider.filter((item)=>(
      item.status === 'confirm'
    ))
    const {isShowConfirmDetail, setIsShowConfirmDetail} = useContext( UserContext)
    const [displayConfirmItem, setDisplayConfirmItem] = useState([])

    const displayDetail = (index) =>{
      setDisplayConfirmItem(filterdData[index])
      setIsShowConfirmDetail(true)
  }
  return (
    <div className='w-2/3 md:w-5/6 h-[88vh] ml-4'>
        {isShowConfirmDetail? 
            <Detail token={token} name={displayConfirmItem.name} date={displayConfirmItem.date} is_garantee={displayConfirmItem.is_garantee} is_service_bonus={displayConfirmItem.is_service_bonus} is_online_bonus={displayConfirmItem.is_online_bonus} sp2_1={displayConfirmItem.sp2_1} sp2_1_serve_type={displayConfirmItem.sp2_1_serve_type}
             sp2_2={displayConfirmItem.sp2_2} sp2_2_serve_type={displayConfirmItem.sp2_2_serve_type} sp2_3={displayConfirmItem.sp2_3} sp2_3_serve_type={displayConfirmItem.sp2_3_serve_type} sp2_1_remaindelivering={displayConfirmItem.sp2_1_remaindelivering} sp2_2_remaindelivering={displayConfirmItem.sp2_2_remaindelivering} 
             sp2_3_remaindelivering={displayConfirmItem.sp2_3_remaindelivering} sp2_1_delivered_cnt={displayConfirmItem.sp2_1_delivered_cnt} sp2_2_delivered_cnt={displayConfirmItem.sp2_2_delivered_cnt} sp2_3_delivered_cnt={displayConfirmItem.sp2_3_delivered_cnt} sp2_1_clened_ttl_cnt={displayConfirmItem.sp2_1_clened_ttl_cnt} 
             sp2_2_clened_ttl_cnt={displayConfirmItem.sp2_2_clened_ttl_cnt} sp2_3_clened_ttl_cnt={displayConfirmItem.sp2_3_clened_ttl_cnt} appsheet={displayConfirmItem.appsheet} sop={displayConfirmItem.smart_inbound} epod={displayConfirmItem.epod}/>
            :''
        }
        <div className='w-[91%] grid grid-cols-5 bg-white p-3 rounded-lg mb-4 text-center mt-4'>
            <p>Date</p>
            <p>Name</p>
            <p>保底獎勵</p>
            <p>服務獎勵</p>
            <p>上線獎勵</p>
        </div>
        <div className='w-full overflow-scroll text-center'>
            {
                filterdData.map((item, index)=>(
                <div className='flex flex-row'>
                  <div key={index} className='w-[91%] grid grid-cols-5 bg-white p-3 mb-4 mr-6'>
                      <p>{item.date.slice(0,10)}</p>
                      <p>{item.name}</p>
                      <p>{item.is_garantee}</p>
                      <p>{item.is_service_bonus}</p>
                      <p>{item.is_online_bonus}</p>
                  </div>
                  <div className='flex flex-row'>
                    <button onClick={()=>displayDetail(index)} className='bg-white p-3 rounded-full w-11 h-11 flex justify-center items-center'><BiDetail /></button>
                  </div>
                </div>
                ))
            }
        </div>
    </div>
  )
}

export default Confirmed