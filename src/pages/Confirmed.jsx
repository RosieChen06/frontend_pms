import React, { useContext, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import List from '../components/List'
import { BiDetail } from "react-icons/bi";
import { UserContext } from '../../context/UserContext';
import Detail from '../components/Detail';

const Confirmed = () => {

    const {rider, token} = useContext(AdminContext)
    const filterdData = rider.filter((item)=>(
      item.status === 'confirm'
    ))
    const {isShowConfirmDetail, displayConfirmItem, displayConfirmOnlineItem} = useContext( UserContext)
  return (
    <div className='w-2/3 md:w-5/6 h-[88vh] ml-4'>
        {isShowConfirmDetail? 
            <Detail 
            token={token}
            name={displayConfirmItem.name}
            date={displayConfirmItem.date}
            is_garantee={displayConfirmItem.is_garantee}
            sp2_1={displayConfirmItem.sp2_1}
            sp2_1_is_servicce_bonus={displayConfirmItem.sp2_1_is_servicce_bonus}
            sp2_1_remaindelivering={displayConfirmItem.sp2_1_remaindelivering}
            sp2_1_ttl_delivered={displayConfirmItem.sp2_1_ttl_delivered}
            sp2_1_delivered={displayConfirmItem.sp2_1_delivered}
            sp2_1_onhold={displayConfirmItem.sp2_1_onhold}
            sp2_1_appsheet={displayConfirmItem.sp2_1_appsheet}
            sp2_1_serve_type={displayConfirmItem.sp2_1_serve_type}
            sp2_1_sop={displayConfirmItem.sp2_1_sop}
            sp2_2={displayConfirmItem.sp2_2}
            sp2_2_is_servicce_bonus={displayConfirmItem.sp2_2_is_servicce_bonus}
            sp2_2_remaindelivering={displayConfirmItem.sp2_2_remaindelivering}
            sp2_2_ttl_delivered={displayConfirmItem.sp2_2_ttl_delivered}
            sp2_2_delivered={displayConfirmItem.sp2_2_delivered}
            sp2_2_onhold={displayConfirmItem.sp2_2_onhold}
            sp2_2_appsheet={displayConfirmItem.sp2_2_appsheet}
            sp2_2_serve_type={displayConfirmItem.sp2_2_serve_type}
            sp2_2_sop={displayConfirmItem.sp2_2_sop}
            sp2_3={displayConfirmItem.sp2_3}
            sp2_3_is_servicce_bonus={displayConfirmItem.sp2_3_is_servicce_bonus}
            sp2_3_remaindelivering={displayConfirmItem.sp2_3_remaindelivering}
            sp2_3_ttl_delivered={displayConfirmItem.sp2_3_ttl_delivered}
            sp2_3_delivered={displayConfirmItem.sp2_3_delivered}
            sp2_3_onhold={displayConfirmItem.sp2_3_onhold}
            sp2_3_appsheet={displayConfirmItem.sp2_3_appsheet}
            sp2_3_serve_type={displayConfirmItem.sp2_3_serve_type}
            sp2_3_sop={displayConfirmItem.sp2_3_sop}
            epod={displayConfirmItem.epod}
            lost_cnt={displayConfirmItem.lost_cnt.length}
            weeknum={displayConfirmItem.weeknum}
            sp2_attendance={displayConfirmItem.sp2_attendance}
            epod_lost={displayConfirmOnlineItem.epod_lost}
            seq={displayConfirmOnlineItem.seq}
            ttl_delivered={displayConfirmOnlineItem.ttl_delivered}
            ttl_workday_weekend={displayConfirmOnlineItem.ttl_workday_weekend}
            ttl_worksday={displayConfirmOnlineItem.ttl_worksday}
            uncleanCnt={displayConfirmOnlineItem.uncleanCnt}
            is_online_bonus={displayConfirmOnlineItem.is_online_bonus}
            day_report_status='confirm'
            />
            :''
        }
        <div className='w-[99%] grid grid-cols-6 bg-white p-3 rounded-lg mb-4 text-center mt-4'>
            <p>日期</p>
            <p>騎手</p>
            <p>保底獎勵</p>
            <p>服務獎勵</p>
            <p>上線獎勵</p>
            <p>選項</p>
        </div>
        <div className='w-[99%] overflow-scroll text-center'>
            {
                filterdData.map((item, index)=>(
                  <div key={index} className='flex flex-row items-center w-full justify-between'>
                    <div className='w-full'>
                        <List date={item.date} name={item.name} is_garantee={item.is_garantee} is_service_bonus={item.is_service_bonus} is_online_bonus={item.is_online_bonus} index={index} id={item._id} weeknum={item.weeknum} status='confirm'/>
                    </div>
                  </div> 
                ))
            }
        </div>
    </div>
  )
}

export default Confirmed