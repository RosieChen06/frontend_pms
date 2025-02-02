import React, { useContext, useEffect, useState } from 'react'
import { MdOutlineFactCheck } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { AdminContext } from '../../context/AdminContext';
import { UserContext } from '../../context/UserContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { FaRegSave } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

const List = ({date, name, is_garantee, is_service_bonus, is_online_bonus, index, id, weeknum, status, filterdData, isMassiveUpload, uploadItem, setUploadItem}) => {

  const {getDB, onlineData, setDisplayMainItem, setDisplayOnlineMainItem, setIsShowAdminDetail, weekData} = useContext(AdminContext)
  const {setDisplayItem, setIsShowDetail, setDisplayOnlineItem, setDisplayConfirmOnlineItem,  setDisplayConfirmItem, setIsShowConfirmDetail} = useContext(UserContext)

  const displayDetail = (index, name, weeknum) =>{
    let online_bonus_data = onlineData.filter((item)=>(
        item.name===name && item.weeknum===weeknum
    ))
    setDisplayItem(filterdData[index])
    setDisplayOnlineItem(online_bonus_data[0])
    setIsShowDetail(true)
  }

  const isCheck = async (_id) => {
    try{
        const formData = new FormData()
        formData.append('riderId', _id)
        formData.append('status', 'confirm')

        const {data} = await axios.post('http://localhost:4000/api/user/confirm-data',formData)

        if(data.success){
            toast.success(data.message)
            getDB()
        }else{
            toast.error(data.message)
        }

    }catch(error){
        console.log(error)
    }
  }

  const displayConfirmDetail = (index, name, weeknum) =>{
    let online_bonus_data = onlineData.filter((item)=>(
      item.name===name && item.weeknum===weeknum
    ))
    setDisplayConfirmItem(filterdData[index])
    setDisplayConfirmOnlineItem(online_bonus_data[0])
    setIsShowConfirmDetail(true)
}

  const displayRawDetail = (name, date, weeknum) =>{
    setDisplayMainItem(filterdData.filter((item)=>(item.name===name && new Date(item.date).toLocaleDateString()===date))[0])
    setDisplayOnlineMainItem(weekData.filter((item)=>(item.name===name && parseInt(item.weeknum)===weeknum))[0])
    setIsShowAdminDetail(true)
  }

  const saveRecord = async (index, name, weeknum) => {
    const weekDataforSave = weekData.filter((item)=>(item.name===name && item.weeknum===weeknum))
    try{
        const formData = new FormData()
        formData.append('phone', filterdData[index].phone)
        formData.append('name', filterdData[index].name)
        formData.append('date', new Date(filterdData[index].date).toLocaleDateString())
        formData.append('is_garantee', filterdData[index].is_garantee)
        formData.append('sp2_1', filterdData[index].sp2_1)
        formData.append('sp2_1_is_servicce_bonus', filterdData[index].sp2_1_is_servicce_bonus)
        formData.append('sp2_1_serve_type', filterdData[index].sp2_1_serve_type)
        formData.append('sp2_1_onhold', filterdData[index].sp2_1_onhold)
        formData.append('sp2_1_remaindelivering', filterdData[index].sp2_1_remaindelivering)
        formData.append('sp2_1_ttl_delivered', filterdData[index].sp2_1_ttl_delivered)
        formData.append('sp2_1_delivered', filterdData[index].sp2_1_delivered)
        formData.append('sp2_1_sop', filterdData[index].sp2_1_sop)
        formData.append('sp2_1_appsheet', filterdData[index].sp2_1_appsheet)
        formData.append('sp2_2', filterdData[index].sp2_2)
        formData.append('sp2_2_is_servicce_bonus', filterdData[index].sp2_2_is_servicce_bonus)
        formData.append('sp2_2_serve_type', filterdData[index].sp2_2_serve_type)
        formData.append('sp2_2_onhold', filterdData[index].sp2_2_onhold)
        formData.append('sp2_2_remaindelivering', filterdData[index].sp2_2_remaindelivering)
        formData.append('sp2_2_ttl_delivered', filterdData[index].sp2_2_ttl_delivered)
        formData.append('sp2_2_delivered', filterdData[index].sp2_2_delivered)
        formData.append('sp2_2_sop', filterdData[index].sp2_2_sop)
        formData.append('sp2_2_appsheet', filterdData[index].sp2_2_appsheet)
        formData.append('sp2_3', filterdData[index].sp2_3)
        formData.append('sp2_3_is_servicce_bonus', filterdData[index].sp2_3_is_servicce_bonus)
        formData.append('sp2_3_serve_type', filterdData[index].sp2_3_serve_type)
        formData.append('sp2_3_onhold', filterdData[index].sp2_3_onhold)
        formData.append('sp2_3_remaindelivering', filterdData[index].sp2_3_remaindelivering)
        formData.append('sp2_3_ttl_delivered', filterdData[index].sp2_3_ttl_delivered)
        formData.append('sp2_3_delivered', filterdData[index].sp2_3_delivered)
        formData.append('sp2_3_sop', filterdData[index].sp2_3_sop)
        formData.append('sp2_3_appsheet', filterdData[index].sp2_3_appsheet)
        formData.append('sp2_attendance', filterdData[index].sp2_attendance)
        formData.append('epod', filterdData[index].epod)
        formData.append('ttl_delivered', weekDataforSave[0].ttl_delivered)
        formData.append('ttl_worksday', weekDataforSave[0].ttl_worksday)
        formData.append('ttl_workday_weekend', weekDataforSave[0].ttl_workday_weekend)
        formData.append('seq', weekDataforSave[0].seq)
        formData.append('epod_lost', weekDataforSave[0].epod_lost)
        formData.append('weeknum', weekDataforSave[0].weeknum)
        formData.append('uncleanCnt', weekDataforSave[0].uncleanCnt)
        formData.append('is_online_bonus', weekDataforSave[0].is_online_bonus)

        const {data} = await axios.post('http://localhost:4000/api/admin/add-data',formData)

        if(data.success){
            toast.success(data.message)
            getDB()
        }else{
            toast.error(data.message)
        }


    }catch(error){
        console.log(error)
    }
  }

  const isInclude = (name, date) => {
    for(let i=0; i<uploadItem.length; i++){
      if(uploadItem[i].name===name && uploadItem[i].date===date)
        return i
    }
    return false
  }

  const singleSelectPush = async(name, date, state) => {
    if(state===false){
      const dayDataForSave = await filterdData.filter((item)=>(item.name===name && new Date(item.date).toLocaleDateString()===date))
      const weekDataforSave = await weekData.filter((item)=>(item.name===dayDataForSave[0].name && item.weeknum===dayDataForSave[0].weeknum))
      const getData={
        phone: dayDataForSave[0].phone,
        name: dayDataForSave[0].name,
        date: new Date(dayDataForSave[0].date).toLocaleDateString(),
        is_garantee: dayDataForSave[0].is_garantee,
        sp2_1: dayDataForSave[0].sp2_1,
        sp2_1_is_servicce_bonus: dayDataForSave[0].sp2_1_is_servicce_bonus,
        sp2_1_serve_type: dayDataForSave[0].sp2_1_serve_type,
        sp2_1_onhold: dayDataForSave[0].sp2_1_onhold,
        sp2_1_remaindelivering: dayDataForSave[0].sp2_1_remaindelivering,
        sp2_1_ttl_delivered: dayDataForSave[0].sp2_1_ttl_delivered,
        sp2_1_delivered: dayDataForSave[0].sp2_1_delivered,
        sp2_1_sop: dayDataForSave[0].sp2_1_sop,
        sp2_1_appsheet: dayDataForSave[0].sp2_1_appsheet,
        sp2_2: dayDataForSave[0].sp2_2,
        sp2_2_is_servicce_bonus: dayDataForSave[0].sp2_2_is_servicce_bonus,
        sp2_2_serve_type: dayDataForSave[0].sp2_2_serve_type,
        sp2_2_onhold: dayDataForSave[0].sp2_2_onhold,
        sp2_2_remaindelivering: dayDataForSave[0].sp2_2_remaindelivering,
        sp2_2_ttl_delivered: dayDataForSave[0].sp2_2_ttl_delivered,
        sp2_2_delivered: dayDataForSave[0].sp2_2_delivered,
        sp2_2_sop: dayDataForSave[0].sp2_2_sop,
        sp2_2_appsheet: dayDataForSave[0].sp2_2_appsheet,
        sp2_3: dayDataForSave[0].sp2_3,
        sp2_3_is_servicce_bonus: dayDataForSave[0].sp2_3_is_servicce_bonus,
        sp2_3_serve_type: dayDataForSave[0].sp2_3_serve_type,
        sp2_3_onhold: dayDataForSave[0].sp2_3_onhold,
        sp2_3_remaindelivering: dayDataForSave[0].sp2_3_remaindelivering,
        sp2_3_ttl_delivered: dayDataForSave[0].sp2_3_ttl_delivered,
        sp2_3_delivered: dayDataForSave[0].sp2_3_delivered,
        sp2_3_sop: dayDataForSave[0].sp2_3_sop,
        sp2_3_appsheet: dayDataForSave[0].sp2_3_appsheet,
        sp2_attendance: dayDataForSave[0].sp2_attendance,
        epod: dayDataForSave[0].epod,
        ttl_delivered: weekDataforSave[0].ttl_delivered,
        ttl_worksday: weekDataforSave[0].ttl_worksday,
        ttl_workday_weekend: weekDataforSave[0].ttl_workday_weekend,
        seq: weekDataforSave[0].seq,
        epod_lost: weekDataforSave[0].epod_lost,
        weeknum: weekDataforSave[0].weeknum,
        uncleanCnt: weekDataforSave[0].uncleanCnt,
        is_online_bonus: weekDataforSave[0].is_online_bonus,
      }

      setUploadItem([...uploadItem, getData])

    }else{
      const copy = [...uploadItem];
      copy.splice(state, 1)
      console.log(copy)
      setUploadItem(copy)
    }
  }

  return (
    <div className='w-full grid grid-cols-6 bg-white p-3 mb-2 mr-8 justify-center items-center'>
        <p>{date}</p>
        <p>{name}</p>
        <p>{is_garantee}</p>
        <p>{is_service_bonus}</p>
        <p>{is_online_bonus}</p>
        {status==='submit'?
          <div className='flex flex-row items-center justify-center'>
            <button onClick={()=>displayDetail(index, name, weeknum)} className='bg-white p-3 rounded-l-md border-2 border-slate-200 hover:bg-slate-200'><BiDetail /></button>
            <button onClick={()=>isCheck(id)} className='bg-white p-3 rounded-r-md border-y-2 border-r-2 border-slate-200 hover:bg-green-600 hover:text-white hover:border-green-600'><MdOutlineFactCheck /></button>
        </div>:status==='confirm'?
        <div className='flex flex-row items-center justify-center'>
          <button onClick={()=>displayConfirmDetail(index, name, weeknum)} className='bg-white p-3 rounded-md border-2 border-slate-200 hover:bg-slate-200'><BiDetail /></button>
        </div>:status==='raw'?
        <div className='flex flex-row items-center justify-center'>
            <button onClick={()=>displayRawDetail(name, date, weeknum)} className='bg-white p-3 rounded-l-md border-2 border-slate-200 hover:bg-slate-200'><BiDetail /></button>
            {!isMassiveUpload?<button onClick={()=>saveRecord(index, name, weeknum)} className='bg-white p-3 rounded-r-md border-y-2 border-r-2 border-slate-200 hover:bg-slate-200'><FaRegSave /></button>:
            <button className={uploadItem.filter((item)=>(item.name===name && item.date===date)).length>0?'p-3 rounded-r-md border-y-2 border-r-2 bg-green-500 text-white border-green-500':'bg-white p-3 rounded-r-md border-y-2 border-r-2 border-slate-200 hover:bg-slate-200'} onClick={()=>singleSelectPush(name, date, isInclude(name, date))}><FaCheck /></button>}
        </div>:''
        }
    </div>
  )
}

export default List
