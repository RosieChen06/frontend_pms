import React, { useContext, useState, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import List from '../components/List'
import { UserContext } from '../../context/UserContext';
import Detail from '../components/Detail';
import Filter from '../components/Filter';
import { FaFilter } from "react-icons/fa6";

const Confirmed = () => {

    const {rider, token} = useContext(AdminContext)
    const [filterConfirmData, setFilterConfirmData] = useState([])
    const [dateConfirmFilterPreview, setDateConfirmFilterPreview] = useState([])
    const [riderConfirmFilterPreview, setRiderConfirmFilterPreview] = useState([])

    const dataList = () => {
        if(riderConfirmFilterConfirm.length === 0 && dateConfirmFilterConfirm.length === 0){
            let newData = rider.filter((item)=>(
                item.status === 'confirm'
            ))
            setFilterConfirmData(newData)
        }else if(riderConfirmFilterConfirm.length === 0){
            let newData = rider.filter((item)=>(
                item.status === 'confirm' && dateConfirmFilterConfirm.includes(item.date)
              ))
            setFilterConfirmData(newData)
        }else if(dateConfirmFilterConfirm.length === 0){
            let newData = rider.filter((item)=>(
                item.status === 'confirm' && riderConfirmFilterConfirm.includes(item.name)
              ))
            setFilterConfirmData(newData)
        }else{
            let newData = rider.filter((item)=>(
                item.status === 'confirm' && riderConfirmFilterConfirm.includes(item.name) && dateConfirmFilterConfirm.includes(item.date)
            ))
            setFilterConfirmData(newData)
        }
    }

    useEffect(()=>{
        dataList()
    }, [rider])

    const filterdData = rider.filter((item)=>(
      item.status === 'confirm'
    ))
    const {isShowConfirmDetail, displayConfirmItem, displayConfirmOnlineItem, isConfirmFilter, setConfirmFilter} = useContext( UserContext)
    const [dateConfirmFilterConfirm, setDateConfirmFilterConfirm] = useState([])
    const [riderConfirmFilterConfirm, setRiderConfirmFilterConfirm] = useState([])
  return (
    <div className='w-[80%] h-[96%] rounded-lg p-2 ml-4'> 
      {isShowConfirmDetail?'':isConfirmFilter?'':
      <div className='p-2 w-fit flex justify-end mt-3 rounded-md flex-row items-center gap-2 bg-[#004e76] text-white'>
          <FaFilter />
          <button onClick={()=>setConfirmFilter(true)}>篩選</button>
      </div>
      }
      {isConfirmFilter?<Filter filterData={rider.filter((item)=>(
            item.status === 'confirm'
          ))} status='confirm' setRiderConfirmFilterConfirm={setRiderConfirmFilterConfirm} setDateConfirmFilterConfirm={setDateConfirmFilterConfirm} dateConfirmFilterPreview={dateConfirmFilterPreview} setDateConfirmFilterPreview={setDateConfirmFilterPreview} 
          setRiderConfirmFilterPreview={setRiderConfirmFilterPreview} riderConfirmFilterPreview={riderConfirmFilterPreview} dateConfirmFilterConfirm={dateConfirmFilterConfirm} riderConfirmFilterConfirm={riderConfirmFilterConfirm}/>:''}
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
                filterConfirmData.map((item, index)=>(
                  <div key={index} className='flex flex-row items-center w-full justify-between'>
                    <div className='w-full'>
                        <List date={item.date} name={item.name} is_garantee={item.is_garantee} is_service_bonus={item.is_service_bonus} is_online_bonus={item.is_online_bonus} index={index} id={item._id} weeknum={item.weeknum} status='confirm' filterdData={filterConfirmData}/>
                    </div>
                  </div> 
                ))
            }
        </div>
    </div>
  )
}

export default Confirmed