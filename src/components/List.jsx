import React, { useContext } from 'react'
import { MdOutlineFactCheck } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { AdminContext } from '../../context/AdminContext';
import { UserContext } from '../../context/UserContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { FaRegSave } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

const List = ({date, name, is_garantee, sp2_1_is_service_bonus, sp2_2_is_service_bonus, sp2_3_is_service_bonus, is_online_bonus, index, id, weeknum, status, filterdData, isMassiveUpload, uploadItem, setUploadItem, riderSubmitFilterConfirm, dateSubmitFilterConfirm}) => {

  const {setDisplayMainItem, setDisplayOnlineMainItem, setIsShowAdminDetail, weekData} = useContext(AdminContext)
  const {setDisplayItem, setIsShowDetail, setDisplayOnlineItem, setDisplayConfirmOnlineItem,  setDisplayConfirmItem, setIsShowConfirmDetail, setClientData, clientData, clientConfirmData, setClientConfirmData} = useContext(UserContext)
  const onlineData = useSelector((state) => state.onlineData.onlineData); 
  const findDB = async() => {
    const formData = new FormData()
    formData.append('dateInput', JSON.stringify(dateSubmitFilterConfirm))
    formData.append('riderInput', JSON.stringify(riderSubmitFilterConfirm))
    formData.append('statusInput', 'submit')
    console.log(dateSubmitFilterConfirm)

    const {data} = await axios.post('https://backend-pms.vercel.app/api/user/clientReadData',formData)
    if(data.success){
        setClientData(data.clientData)
    }
  }

  const displayDetail = (date, name, weeknum) =>{
    let online_bonus_data = onlineData.filter((item)=>(
        item.name===name && item.weeknum===weeknum
    ))
    let day_bonus_data = clientData.filter((item)=>(
      item.name===name && item.date===date
    ))
    setDisplayItem(day_bonus_data[0])
    setDisplayOnlineItem(online_bonus_data[0])
    setIsShowDetail(true)
  }

  const isCheck = async (_id) => {
    try{
        const formData = new FormData()
        formData.append('riderId', _id)
        formData.append('status', 'confirm')
        formData.append('type', 'day')

        const {data} = await axios.post('https://backend-pms.vercel.app/api/user/confirm-data',formData)

        if(data.success){
            toast.success(data.message)
            findDB()
        }else{
            toast.error(data.message)
        }

    }catch(error){
        console.log(error)
    }
  }

  const displayConfirmDetail = (date, name, weeknum) =>{
    let online_bonus_data = onlineData.filter((item)=>(
      item.name===name && item.weeknum===weeknum
    ))
    let day_bonus_data = clientConfirmData.filter((item)=>(
      item.name===name && item.date===date
    ))
    setDisplayConfirmItem(day_bonus_data[0])
    setDisplayConfirmOnlineItem(online_bonus_data[0])
    setIsShowConfirmDetail(true)
}

  const displayRawDetail = (name, date, weeknum) =>{
    setDisplayMainItem(filterdData.filter((item)=>(item.name===name && new Date(item.date).toLocaleDateString()===date))[0])
    setDisplayOnlineMainItem(weekData.filter((item)=>(item.name===name && parseInt(item.weeknum)===weeknum))[0])
    setIsShowAdminDetail(true)
  }

  const saveRecord = async (date, name, weeknum) => {
    const dayDataForSave = filterdData.filter((item)=>(item.name===name && new Date(item.date).toLocaleDateString()===date))
    const weekDataforSave = weekData.filter((item)=>(item.name===name && item.weeknum===weeknum))
    try{
        const formData = new FormData()
        formData.append('phone', dayDataForSave[0].phone)
        formData.append('name', dayDataForSave[0].name)
        formData.append('date', new Date(dayDataForSave[0].date).toLocaleDateString())
        formData.append('is_garantee', dayDataForSave[0].is_garantee)
        formData.append('sp2_1', dayDataForSave[0].sp2_1)
        formData.append('sp2_1_is_servicce_bonus', dayDataForSave[0].sp2_1_is_servicce_bonus)
        formData.append('sp2_1_serve_type', dayDataForSave[0].sp2_1_serve_type)
        formData.append('sp2_1_onhold', dayDataForSave[0].sp2_1_onhold)
        formData.append('sp2_1_remaindelivering', dayDataForSave[0].sp2_1_remaindelivering)
        formData.append('sp2_1_ttl_delivered', dayDataForSave[0].sp2_1_ttl_delivered)
        formData.append('sp2_1_delivered', dayDataForSave[0].sp2_1_delivered)
        formData.append('sp2_1_assign_delivered', dayDataForSave[0].sp2_1_assign_delivered)
        formData.append('sp2_1_sop', dayDataForSave[0].sp2_1_sop)
        formData.append('sp2_1_appsheet', dayDataForSave[0].sp2_1_appsheet)
        formData.append('sp2_2', dayDataForSave[0].sp2_2)
        formData.append('sp2_2_is_servicce_bonus', dayDataForSave[0].sp2_2_is_servicce_bonus)
        formData.append('sp2_2_serve_type', dayDataForSave[0].sp2_2_serve_type)
        formData.append('sp2_2_onhold', dayDataForSave[0].sp2_2_onhold)
        formData.append('sp2_2_remaindelivering', dayDataForSave[0].sp2_2_remaindelivering)
        formData.append('sp2_2_ttl_delivered', dayDataForSave[0].sp2_2_ttl_delivered)
        formData.append('sp2_2_delivered', dayDataForSave[0].sp2_2_delivered)
        formData.append('sp2_2_assign_delivered', dayDataForSave[0].sp2_2_assign_delivered)
        formData.append('sp2_2_sop', dayDataForSave[0].sp2_2_sop)
        formData.append('sp2_2_appsheet', dayDataForSave[0].sp2_2_appsheet)
        formData.append('sp2_3', dayDataForSave[0].sp2_3)
        formData.append('sp2_3_is_servicce_bonus', dayDataForSave[0].sp2_3_is_servicce_bonus)
        formData.append('sp2_3_serve_type', dayDataForSave[0].sp2_3_serve_type)
        formData.append('sp2_3_onhold', dayDataForSave[0].sp2_3_onhold)
        formData.append('sp2_3_remaindelivering', dayDataForSave[0].sp2_3_remaindelivering)
        formData.append('sp2_3_ttl_delivered', dayDataForSave[0].sp2_3_ttl_delivered)
        formData.append('sp2_3_delivered', dayDataForSave[0].sp2_3_delivered)
        formData.append('sp2_3_assign_delivered', dayDataForSave[0].sp2_3_assign_delivered)
        formData.append('sp2_3_sop', dayDataForSave[0].sp2_3_sop)
        formData.append('sp2_3_appsheet', dayDataForSave[0].sp2_3_appsheet)
        formData.append('sp2_attendance', dayDataForSave[0].sp2_attendance)
        formData.append('epod', dayDataForSave[0].epod)
        formData.append('ttl_delivered', weekDataforSave[0].ttl_delivered)
        formData.append('ttl_worksday', weekDataforSave[0].ttl_worksday)
        formData.append('ttl_workday_weekend', weekDataforSave[0].ttl_workday_weekend)
        formData.append('seq', weekDataforSave[0].seq)
        formData.append('epod_lost', weekDataforSave[0].epod_lost)
        formData.append('weeknum', weekDataforSave[0].weeknum)
        formData.append('uncleanCnt', weekDataforSave[0].uncleanCnt)
        formData.append('is_online_bonus', weekDataforSave[0].is_online_bonus)

        const {data} = await axios.post('https://backend-pms.vercel.app/api/admin/add-data',formData)

        if(data.success){
            toast.success(data.message)
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
      <tr className='hover:bg-slate-100 bg-slate-50'>
        <td className="p-4 border-b border-slate-200">
            <p className="block text-sm text-slate-800">{date}</p>
        </td>
        <td className="p-4 border-b border-slate-200">
            <p className="block text-sm text-slate-800">{name}</p>
        </td>
        <td className="p-4 border-b border-slate-200">
            {is_garantee==='達標'?
            <div className='flex justify-center items-center text-center'>
              <p className="bg-green-100 block px-2 py-1 rounded-2xl text-black w-fit"><FaCheck /></p>
            </div>:
            <div className='flex justify-center items-center text-center'>
              <p className="bg-red-100 block px-2 py-1 rounded-2xl text-black w-fit"><ImCross /></p>
            </div>
            }
        </td>
        <td className="p-4 border-b border-slate-200">
          {sp2_1_is_service_bonus==='未達標' || sp2_2_is_service_bonus==='未達標' || sp2_3_is_service_bonus==='未達標'?
              <div className='flex justify-center items-center text-center'>
                <p className="bg-red-100 block px-2 py-1 rounded-2xl text-black w-fit"><ImCross /></p>
              </div>:
              <div className='flex justify-center items-center text-center'>
                <p className="bg-green-100 block px-2 py-1 rounded-2xl text-black w-fit"><FaCheck /></p>
              </div>
          }
        </td>
        {is_online_bonus==='-'?<td className="p-4 border-b border-slate-200">-</td>:<td className="p-4 border-b border-slate-200">
          {is_online_bonus==="uu"?<p>hjhk</p>:is_online_bonus==='達標'?
              <div className='flex justify-center items-center text-center'>
                <p className="bg-green-100 block px-2 py-1 rounded-2xl text-black w-fit"><FaCheck /></p>
              </div>:
              <div className='flex justify-center items-center text-center'>
                <p className="bg-red-100 block px-2 py-1 rounded-2xl text-black w-fit"><ImCross /></p>
              </div>
          }
        </td>}
        {status==='submit'?
          <td className="p-4 border-b border-slate-200">
            <div className='flex flex-row items-center justify-center'>
              <button onClick={()=>displayDetail(date, name, weeknum)} className='bg-white p-3 rounded-l-md border-2 border-slate-200 hover:bg-slate-200'><BiDetail /></button>
              <button onClick={()=>isCheck(id)} className='bg-white p-3 rounded-r-md border-y-2 border-r-2 border-slate-200 hover:bg-green-600 hover:text-white hover:border-green-600'><MdOutlineFactCheck /></button>
            </div>
          </td>:status==='confirm'?
          <td className="p-4 border-b border-slate-200">
            <button onClick={()=>displayConfirmDetail(date, name, weeknum)} className='bg-white p-3 rounded-md border-2 border-slate-200 hover:bg-slate-200'><BiDetail /></button>
          </td>:status==='raw'?
          <td className="p-4 border-b border-slate-200">
              <button onClick={()=>displayRawDetail(name, date, weeknum)} className='bg-white p-3 rounded-l-md border-2 border-slate-200 hover:bg-slate-200'><BiDetail /></button>
              {!isMassiveUpload?<button onClick={()=>saveRecord(date, name, weeknum)} className='bg-white p-3 rounded-r-md border-y-2 border-r-2 border-slate-200 hover:bg-green-600 hover:text-white hover:border-green-600'><FaRegSave /></button>:
              <button className={uploadItem.filter((item)=>(item.name===name && item.date===date)).length>0?'p-3 rounded-r-md border-y-2 border-r-2 bg-green-500 text-white border-green-500':'bg-white p-3 rounded-r-md border-y-2 border-r-2 border-slate-200 hover:bg-slate-200'} onClick={()=>singleSelectPush(name, date, isInclude(name, date))}><FaCheck /></button>}
          </td>:''
          }
      </tr>
  )
}

export default List
