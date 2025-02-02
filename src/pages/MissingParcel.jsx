import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import Detail from '../components/Detail'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ImCross } from "react-icons/im";
import { MdOutlineFactCheck } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

const MissingParcel = () => {
    const [date, setDate] = useState('')
    const [riderName, setRiderName] = useState('')
    const [parcelId, setParcelId] = useState('')
    const {rider, onlineData} = useContext(AdminContext)
    const [dayDetail, setDayDetail] = useState(false)
    const [weekDetail, setWeekDetail] = useState(false)

    const findRecord = async() => {
        let dayRecord = await rider.filter((item)=>(
            item.name===riderName && item.date===date
        ))

        setDayDetail({
            id: dayRecord[0]._id,
            name: dayRecord[0].name,
            date: dayRecord[0].date,
            is_garantee: dayRecord[0].is_garantee,
            sp2_1: dayRecord[0].sp2_1,
            sp2_1_is_servicce_bonus: dayRecord[0].sp2_1_is_servicce_bonus,
            sp2_1_serve_type: dayRecord[0].sp2_1_serve_type,
            sp2_1_onhold: dayRecord[0].sp2_1_onhold,
            sp2_1_ttl_delivered: dayRecord[0].sp2_1_ttl_delivered,
            sp2_1_delivered: dayRecord[0].sp2_1_delivered,
            sp2_1_remaindelivering: dayRecord[0].sp2_1_remaindelivering,
            sp2_1_sop: dayRecord[0].sp2_1_sop,
            sp2_1_appsheet: dayRecord[0].sp2_1_appsheet,
            sp2_2: dayRecord[0].sp2_2,
            sp2_2_is_servicce_bonus: dayRecord[0].sp2_2_is_servicce_bonus,
            sp2_2_serve_type: dayRecord[0].sp2_2_serve_type,
            sp2_2_onhold: dayRecord[0].sp2_2_onhold,
            sp2_2_ttl_delivered: dayRecord[0].sp2_2_ttl_delivered,
            sp2_2_delivered: dayRecord[0].sp2_2_delivered,
            sp2_2_remaindelivering: dayRecord[0].sp2_2_remaindelivering,
            sp2_2_sop: dayRecord[0].sp2_2_sop,
            sp2_2_appsheet: dayRecord[0].sp2_2_appsheet,
            sp2_3: dayRecord[0].sp2_3,
            sp2_3_is_servicce_bonus: dayRecord[0].sp2_3_is_servicce_bonus,
            sp2_3_serve_type: dayRecord[0].sp2_3_serve_type,
            sp2_3_onhold: dayRecord[0].sp2_3_onhold,
            sp2_3_ttl_delivered: dayRecord[0].sp2_3_ttl_delivered,
            sp2_3_delivered: dayRecord[0].sp2_3_delivered,
            sp2_3_remaindelivering: dayRecord[0].sp2_3_remaindelivering,
            sp2_3_sop: dayRecord[0].sp2_3_sop,
            sp2_3_appsheet: dayRecord[0].sp2_3_appsheet,
            sp2_attendance: dayRecord[0].sp2_attendance,
            epod: dayRecord[0].epod, 
            lost_cnt: dayRecord[0].lost_cnt,
        })

        let weeknum = await dayRecord[0].weeknum

        let weekRecord = await onlineData.filter((item)=>(
            item.name === riderName && item.weeknum === weeknum
        ))

        setWeekDetail({
            id: weekRecord[0]._id,
            name: weekRecord[0].name,
            weeknum: weekRecord[0].weeknum,
            ttl_delivered: weekRecord[0].ttl_delivered,
            ttl_worksday: weekRecord[0].ttl_worksday,
            ttl_workday_weekend: weekRecord[0].ttl_workday_weekend,
            seq: weekRecord[0].seq,
            epod_lost: weekRecord[0].epod_lost,
            uncleanCnt: weekRecord[0].uncleanCnt,
            is_online_bonus: weekRecord[0].is_online_bonus,
            lost_cnt: weekRecord[0].lost_cnt
        })
    }

    useEffect(()=>{
        findRecord()
    },[date, riderName])

    console.log(riderName)
    console.log(date)
    console.log(parcelId)

    const setItem = (type) => {
        if(parcelId==='' || rider==='' || dayDetail===''){
            toast.error('請填寫完整資訊')
            return
        }
        if(dayDetail.length===0){
            toast.error('查無該筆配送資料')
            return
        }
        if(type==='add'){
            if(dayDetail.lost_cnt.includes(parcelId)){
                toast.error('該筆遺失紀錄已存在')
            }else{
                dayDetail.lost_cnt.push(parcelId)
                weekDetail.lost_cnt.push(parcelId)
            } 
            if(dayDetail.lost_cnt.length>0){
                setDayDetail(prev =>({...prev, is_garantee: '未達標'}))
                if(dayDetail.sp2_1_is_servicce_bonus!=='-'){
                    setDayDetail(prev =>({...prev, sp2_1_is_servicce_bonus: '未達標'}))
                }
                if(dayDetail.sp2_2_is_servicce_bonus!=='-'){
                    setDayDetail(prev =>({...prev, sp2_2_is_servicce_bonus: '未達標'}))
                }
                if(dayDetail.sp2_3_is_servicce_bonus!=='-'){
                    setDayDetail(prev =>({...prev, sp2_3_is_servicce_bonus: '未達標'}))
                }
            }
            if(weekDetail.lost_cnt.length>2){
                setWeekDetail(prev =>({...prev, is_online_bonus: '未達標'}))
            }
        }else{
            if(!dayDetail.lost_cnt.includes(parcelId)){
                toast.error('該筆遺失紀錄不存在')
                return
            }else{
                let dayArray = dayDetail.lost_cnt
                const dayIndex = dayArray.indexOf(parcelId)
                dayDetail.lost_cnt.splice(dayIndex, 1)
                setDayDetail(prev =>({...prev, lost_cnt: dayArray}))

                if(weekDetail.lost_cnt.includes(parcelId)){
                    let weekArray = weekDetail.lost_cnt
                    const weekIndex = weekArray.indexOf(parcelId)
                    weekDetail.lost_cnt.splice(weekIndex, 1)

                    setWeekDetail(prev =>({...prev, lost_cnt: weekArray}))
                }
            } 
            // if(dayDetail.lost_cnt.length>0){
            //     setDayDetail(prev =>({...prev, is_garantee: '未達標'}))
            //     if(dayDetail.sp2_1_is_servicce_bonus!=='-'){
            //         setDayDetail(prev =>({...prev, sp2_1_is_servicce_bonus: '未達標'}))
            //     }
            //     if(dayDetail.sp2_2_is_servicce_bonus!=='-'){
            //         setDayDetail(prev =>({...prev, sp2_2_is_servicce_bonus: '未達標'}))
            //     }
            //     if(dayDetail.sp2_3_is_servicce_bonus!=='-'){
            //         setDayDetail(prev =>({...prev, sp2_3_is_servicce_bonus: '未達標'}))
            //     }
            // }
            // if(weekDetail.lost_cnt.length>2){
            //     setWeekDetail(prev =>({...prev, is_online_bonus: '未達標'}))
            // }
        }
    }

    const submitChange = async() => {
        try{
            const formData = new FormData()
            formData.append('riderId', dayDetail.id)
            formData.append('riderWeekId', weekDetail.id)
            formData.append('is_garantee', dayDetail.is_garantee)
            formData.append('sp2_1_is_servicce_bonus', dayDetail.sp2_1_is_servicce_bonus)
            formData.append('sp2_2_is_servicce_bonus', dayDetail.sp2_2_is_servicce_bonus)
            formData.append('sp2_3_is_servicce_bonus', dayDetail.sp2_3_is_servicce_bonus)
            formData.append('is_online_bonus', weekDetail.is_online_bonus)
            formData.append('day_lost_cnt', dayDetail.lost_cnt)
            formData.append('week_lost_cnt', weekDetail.lost_cnt)
  
            const {data} = await axios.post('http://localhost:4000/api/admin/missing-parcel',formData)
  
            if(data.success){
                setDayDetail(false)
                setWeekDetail(false)
                toast.success(data.message)
                setDate('')
                setRiderName('')
                setParcelId('')
            }else{
                toast.error(data.message)
            }
  
        }catch(error){
            console.log(error)
        }
    }

  return (
    <div className='w-full sm:w-[80%] h-[96%] rounded-lg p-2 sm:ml-4 bg-white mt-4 overflow-scroll'>
        <div className='flex flex-col sm:flex-row gap-8 justify-between'>
            <div className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-2'>
                    <p>日期</p>
                    <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={date} onChange={e=>setDate(e.target.value)}></input>
                </div>
                <div className='flex flex-col gap-2'>
                    <p>騎手姓名</p>
                    <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderName} onChange={e=>setRiderName(e.target.value)}></input>
                </div>
                <div className='flex flex-col gap-2'>
                    <p>包裹編號</p>
                    <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={parcelId} onChange={e=>setParcelId(e.target.value)}></input>
                </div>
            </div>
            <div className='flex gap-4'>
                <button className='bg-green-600 h-full w-1/2 text-white sm:w-36 rounded-md p-4' onClick={()=>setItem('add')}>Add</button>
                <button className='bg-red-600 h-full w-1/2 text-white sm:w-36 rounded-md p-4' onClick={()=>setItem('remove')}>Remove</button>
            </div>
        </div>
        {!dayDetail?'':!weekDetail?'':
            <div className='flex flex-col gap-x-24 gap-y-8 w-full mt-8'>
                <div className=' bg-slate-50 p-4 flex flex-col gap-2'>
                    <div className='flex flex-row'>
                        <p className='mr-2'><span className='font-bold text-green-600'>當日</span>遺失包裹與不實貨態紀錄:</p>
                        <p>{dayDetail.lost_cnt.join('/ ')}</p>
                    </div>
                    <div className='flex flex-row'>
                        <p className='mr-2'><span className='font-bold text-red-600'>當周</span>遺失包裹與不實貨態紀錄:</p>
                        <p>{weekDetail.lost_cnt.join('/ ')}</p>
                    </div>
                </div>
                <h1 className='border-l-4 pl-4 text-lg font-bold border-[#004e76] '>當日配送表現</h1>
                <div>
                    <div className='flex flex-row w-full bg-slate-50 rounded-md items-center justify-start overflow-scroll'>
                        <div className='flex flex-col w-full gap-3 p-4 hover:bg-[#004e76] hover:text-white'>
                            <p className='text-xs'>配送日期</p>
                            <p className='py-1 rounded-md'>{dayDetail.date}</p>
                        </div>
                        <div className='flex flex-col w-full gap-3 p-4 hover:bg-[#004e76] hover:text-white'>
                            <p className='text-xs'>保底獎勵</p>
                            <select className=' border-gray-300 py-1 rounded-md border-2 hover:text-black' type='text' value={dayDetail.is_garantee} onChange={e=>setDayDetail(prev =>({...prev, is_garantee: e.target.value}))}>
                                <option value='達標'>達標</option>
                                <option value='未達標'>未達標</option>
                                <option value='-'>-</option>
                            </select>
                        </div>
                        <div className='flex flex-col w-full gap-3 p-4 hover:bg-[#004e76] hover:text-white'>
                            <p className='text-xs'>{dayDetail.sp2_1}</p>
                            <select className=' border-gray-300 py-1 rounded-md border-2 hover:text-black' type='text' value={dayDetail.sp2_1_is_servicce_bonus} onChange={e=>setDayDetail(prev =>({...prev, sp2_1_is_servicce_bonus: e.target.value}))}>
                                <option value='達標'>達標</option>
                                <option value='未達標'>未達標</option>
                                <option value='-'>-</option>
                            </select>
                        </div>
                        <div className='flex flex-col w-full gap-3 p-4 hover:bg-[#004e76] hover:text-white'>
                            <p className='text-xs'>{dayDetail.sp2_2}</p>
                            <select className=' border-gray-300 py-1 rounded-md border-2 hover:text-black' type='text' value={dayDetail.sp2_2_is_servicce_bonus} onChange={e=>setDayDetail(prev =>({...prev, sp2_2_is_servicce_bonus: e.target.value}))}>
                                <option value='達標'>達標</option>
                                <option value='未達標'>未達標</option>
                                <option value='-'>-</option>
                            </select>
                        </div>
                        <div className='flex flex-col w-full gap-3 p-4 hover:bg-[#004e76] hover:text-white'>
                            <p className='text-xs'>{dayDetail.sp2_3}</p>
                            <select className=' border-gray-300 py-1 rounded-md border-2 hover:text-black' type='text' value={dayDetail.sp2_3_is_servicce_bonus} onChange={e=>setDayDetail(prev =>({...prev, sp2_3_is_servicce_bonus: e.target.value}))}>
                                <option value='達標'>達標</option>
                                <option value='未達標'>未達標</option>
                                <option value='-'>-</option>
                            </select>
                        </div>
                    </div>
                    <div className='w-full overflow-scroll'>
                        <table className="table-fixed w-full min-w-[1050px] text-left mt-3">
                            <tr className='min-w-[1730px]'>
                                <th className="p-4 border-b border-slate-300 bg-slate-50">
                                    <p className="block text-sm font-normal leading-none text-slate-500">門市</p>
                                </th>
                                <th className="p-4 border-b border-slate-300 bg-slate-50">
                                    <p className="block text-sm font-normal leading-none text-slate-500">門市清空</p>
                                </th>
                                <th className="p-4 border-b border-slate-300 bg-slate-50">
                                    <p className="block text-sm font-normal leading-none text-slate-500">Smart Inbound執行率</p>
                                </th>
                                <th className="p-4 border-b border-slate-300 bg-slate-50">
                                    <p className="block text-sm font-normal leading-none text-slate-500">Appsheet滯留包裹</p>
                                </th>
                                <th className="p-4 border-b border-slate-300 bg-slate-50">
                                    <p className="block text-sm font-normal leading-none text-slate-500">承攬上線時間</p>
                                </th>
                                <th className="p-4 border-b border-slate-300 bg-slate-50">
                                    <p className="block text-sm font-normal leading-none text-slate-500">EPOD</p>
                                </th>
                            </tr>
                            <tr className="hover:bg-slate-50">
                                <td className="p-5 border-b border-slate-200 flex flex-row items-center gap-2">
                                    <p className={dayDetail.sp2_1_serve_type==="指定"?'w-2 h-2 rounded-full bg-green-600':'w-2 h-2 rounded-full bg-yellow-400'}></p>
                                    <p className="block text-sm text-slate-800">{dayDetail.sp2_1}</p>
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    {parseInt(dayDetail.sp2_1_ttl_delivered)>=parseInt(dayDetail.sp2_1_remaindelivering)+parseInt(dayDetail.sp2_1_onhold)?
                                        <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                        <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                    }
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    {dayDetail.sp2_1_sop==="-"? '': dayDetail.sp2_1_sop==="達標"?
                                        <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                        <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                    }
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    {dayDetail.sp2_1_serve_type==="指定"?'':dayDetail.sp2_1_appsheet==="-"? '': dayDetail.sp2_1_appsheet==="達標"?
                                        <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                        <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                    }
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    {dayDetail.sp2_1_serve_type==="支援"?'':dayDetail.sp2_attendance==="達標"?
                                        <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                        <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                    }
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    {dayDetail.sp2_epod==="達標"?
                                        <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                        <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                    }
                                </td>
                            </tr>
                            {dayDetail.sp2_2==="-"?'':
                            <tr className="hover:bg-slate-50">
                                <td className="p-5 border-b border-slate-200 flex flex-row items-center gap-2">
                                    <p className={dayDetail.sp2_2_serve_type==="指定"?'w-2 h-2 rounded-full bg-green-600':'w-2 h-2 rounded-full bg-yellow-400'}></p>
                                    <p className="block text-sm text-slate-800">{dayDetail.sp2_2}</p>
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    {parseInt(dayDetail.sp2_2_ttl_delivered)>=parseInt(dayDetail.sp2_2_remaindelivering)+parseInt(dayDetail.sp2_2_onhold)?
                                        <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                        <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                    }
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    {dayDetail.sp2_2_sop==="-"? '': dayDetail.sp2_2_sop==="達標"?
                                        <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                        <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                    }
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    {dayDetail.sp2_2_serve_type==="指定"?'':dayDetail.sp2_2_appsheet==="-"? '': dayDetail.sp2_2_appsheet==="達標"?
                                        <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                        <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                    }
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    {dayDetail.sp2_2_serve_type==="支援"?'':dayDetail.sp2_attendance==="達標"?
                                        <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                        <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                    }
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    {dayDetail.sp2_epod==="達標"?
                                        <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                        <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                    }
                                </td>
                            </tr>
                            }
                            {dayDetail.sp2_3==="-"?'':
                                <tr className="hover:bg-slate-50">
                                    <td className="p-5 border-b border-slate-200 flex flex-row items-center gap-2">
                                        <p className={dayDetail.sp2_3_serve_type==="指定"?'w-2 h-2 rounded-full bg-green-600':'w-2 h-2 rounded-full bg-yellow-400'}></p>
                                        <p className="block text-sm text-slate-800">{dayDetail.sp2_3}</p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        {parseInt(dayDetail.sp2_3_ttl_delivered)>=parseInt(dayDetail.sp2_3_remaindelivering)+parseInt(dayDetail.sp2_3_onhold)?
                                            <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                            <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                        }
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        {dayDetail.sp2_3_sop==="-"? '': dayDetail.sp2_3_sop==="達標"?
                                            <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                            <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                        }
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        {dayDetail.sp2_3_serve_type==="指定"?'':dayDetail.sp2_3_appsheet==="-"? '': dayDetail.sp2_3_appsheet==="達標"?
                                            <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                            <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                        }
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        {dayDetail.sp2_3_serve_type==="支援"?'':dayDetail.sp2_attendance==="達標"?
                                            <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                            <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                        }
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        {dayDetail.sp2_epod==="達標"?
                                            <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                            <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                        }
                                    </td>
                                </tr>
                            }
                        </table>
                    </div>
                </div>
                <div>
                    <h1 className='border-l-4 pl-4 text-lg font-bold border-[#004e76] '>當周配送表現</h1>
                    <div className='w-full flex flex-row justify-center items-center bg-slate-50 mt-8'>   
                        <div className='flex flex-col w-full gap-3 p-4 hover:bg-[#004e76] hover:text-white'>
                            <p className='text-sm'>配送週數</p>
                            <p className='text-lg font-extrabold'>{weekDetail.weeknum}</p>
                        </div>
                        <div className='flex flex-col w-full gap-3 p-4 hover:bg-[#004e76] hover:text-white'>
                            <p className='text-sm hover:text-white'>上線獎勵</p>
                            <select className=' border-gray-300 py-1 pl-1 rounded-md border-2 hover:text-black' type='text' value={weekDetail.is_online_bonus} onChange={e=>setWeekDetail(prev =>({...prev, is_online_bonus: e.target.value}))}>
                                <option value='達標'>達標</option>
                                <option value='未達標'>未達標</option>
                            </select>
                        </div>
                    </div>
                    <div className='w-full overflow-scroll'>
                        <table className="table-fixed w-full min-w-[900px] text-left mt-3">
                            <tr>
                                <th class="p-4 border-b border-slate-300 bg-slate-50">
                                    <p class="block text-sm font-normal leading-none text-slate-500">總配送顆數</p>
                                </th>
                                <th class="p-4 border-b border-slate-300 bg-slate-50">
                                    <p class="block text-sm font-normal leading-none text-slate-500">總配送天數</p>
                                </th>
                                <th class="p-4 border-b border-slate-300 bg-slate-50">
                                    <p class="block text-sm font-normal leading-none text-slate-500">假日累計配送天數</p>
                                </th>
                                <th class="p-4 border-b border-slate-300 bg-slate-50">
                                    <p class="block text-sm font-normal leading-none text-slate-500">推薦排序使用率</p>
                                </th>
                                <th class="p-4 border-b border-slate-300 bg-slate-50">
                                    <p class="block text-sm font-normal leading-none text-slate-500">EPOD&遺失包裹累計</p>
                                </th>
                            </tr>
                            <tr class="hover:bg-slate-50">
                                <td class="p-4 border-b border-slate-200">
                                    {parseInt(weekDetail.ttl_delivered)>=400?
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                        <p class="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                    }
                                </td>
                                <td class="p-4 border-b border-slate-200">
                                    {parseInt(weekDetail.ttl_worksday)>=5?
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                        <p class="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                    }
                                </td>
                                <td class="p-4 border-b border-slate-200">
                                    {parseInt(weekDetail.ttl_workday_weekend)>=1?
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                        <p class="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                    }
                                </td>
                                <td class="p-4 border-b border-slate-200">
                                    {parseInt(weekDetail.seq)>=0.9?
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                        <p class="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                    }
                                </td>
                                <td class="p-4 border-b border-slate-200">
                                    {parseInt(weekDetail.epod_lost)<=2?
                                        <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                        <p class="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                    }
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className='w-full'>
                    <button className='bg-white border-2 w-1/2 rounded-l-md border-[#004e76] p-4 hover:bg-red-600 hover:text-white hover:border-red-600' onClick={()=>{setDayDetail(false); setWeekDetail(false); setDate(''); setRiderName(''); setParcelId('')}}>Cancel</button>
                    <button className='bg-[#004e76] border-2 w-1/2 rounded-r-md border-[#004e76] text-white p-4' onClick={()=>submitChange()}>Submit</button>
                </div>
            </div>
        }
    </div>
  )
}

export default MissingParcel
