import React, { useContext, useRef, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AdminContext } from '../../context/AdminContext'
import { UserContext } from '../../context/UserContext'
import { CiCircleQuestion } from "react-icons/ci";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from 'react-redux'
import { fetchWeekData } from "../redux/slices/weekDataSlice";

const Update = ({setFilterdData}) => {

    const {isEdit, setIsEdit,isWeekEdit, setIsWeekEdit, isSpQualify, setSpIsQualify, riderData, setRiderData, riderWeekData, setRiderWeekData} = useContext(AdminContext)
    const {reportSp2Item} = useContext(UserContext)
    const [dayAdjustment, setDayAdjustment] = useState(true)
    const myRef = useRef(null)
    const dispatch = useDispatch()

    const findDB = async(status) => {
        const formData = new FormData()
        formData.append('dateInput', JSON.stringify([]))
        formData.append('riderInput', JSON.stringify([]))
        formData.append('statusInput', status)

        const {data} = await axios.post('https://backend-pms.vercel.app/api/user/clientReadData',formData)
        if(data.success){
          setFilterdData(data.clientData)
        }
      }

    const updateData = async (id) => {
        try{
            const formData = new FormData()
            formData.append('riderId', id)
            formData.append('sp2_1_remaindelivering', riderData.sp2_1_remaindelivering)
            formData.append('sp2_1_onhold', riderData.sp2_1_onhold)
            formData.append('sp2_1_delivered', riderData.sp2_1_delivered)
            formData.append('sp2_1_serve_type', riderData.sp2_1_serve_type)
            formData.append('sp2_1_appsheet', riderData.sp2_1_appsheet)
            formData.append('sp2_1_sop', riderData.sp2_1_sop)
            formData.append('sp2_2_remaindelivering', riderData.sp2_2_remaindelivering)
            formData.append('sp2_2_onhold', riderData.sp2_2_onhold)
            formData.append('sp2_2_delivered', riderData.sp2_2_delivered)
            formData.append('sp2_2_serve_type', riderData.sp2_2_serve_type)
            formData.append('sp2_2_appsheet', riderData.sp2_2_appsheet)
            formData.append('sp2_2_sop', riderData.sp2_2_sop)
            formData.append('sp2_3_remaindelivering', riderData.sp2_3_remaindelivering)
            formData.append('sp2_3_onhold', riderData.sp2_3_onhold)
            formData.append('sp2_3_delivered', riderData.sp2_3_delivered)
            formData.append('sp2_3_serve_type', riderData.sp2_3_serve_type)
            formData.append('sp2_3_appsheet', riderData.sp2_3_appsheet)
            formData.append('sp2_3_sop', riderData.sp2_3_sop)
            formData.append('sp2_attendance', riderData.sp2_attendance)
            formData.append('admincomment', riderData.admincomment)
            formData.append('riderWeekId', riderWeekData.riderId)
            formData.append('uncleanCnt', riderWeekData.uncleanCnt)
            formData.append('status', "resolve")
            formData.append('epod', riderData.epod)
            formData.append('dayAdjust', JSON.stringify(isSpQualify))

            const {data} = await axios.post('https://backend-pms.vercel.app/api/admin/update-data',formData)

            if(data.success){
                toast.success(data.message)
                setIsEdit(false)
                findDB('report')
            }else{
                toast.error(data.message)
            }

        }catch(error){
            console.log(error)
        }
    }

    const adjustQualification = (value, ob, id) => {
        setSpIsQualify(isSpQualify.map((item)=>{
                    return item._id===id?
                    {...item, [ob]:value}:item
                }))
    }

    const updateWeekData = async (id) => {

        try{
            const formData = new FormData()

               formData.append('riderWeekId', id)
               formData.append('ttl_delivered', riderWeekData.ttl_delivered)
               formData.append('ttl_worksday', riderWeekData.ttl_worksday)
               formData.append('ttl_workday_weekend', riderWeekData.ttl_workday_weekend)
               formData.append('seq', riderWeekData.seq)
               formData.append('epod_lost', riderWeekData.epod_lost)
               formData.append('uncleanCnt', riderWeekData.uncleanCnt)
               formData.append('is_online_bonus', riderWeekData.is_online_bonus)
               formData.append('admincomment', riderWeekData.admincomment)
               formData.append('status', 'resolve')

            const {data} = await axios.post('https://backend-pms.vercel.app/api/admin/update-weekdata',formData)

            if(data.success){
                toast.success(data.message)
                dispatch(fetchWeekData());
                setIsWeekEdit(false)
                setIsEdit(false)
                setDayAdjustment(false)
            }else{
                toast.error(data.message)
            }

        }catch(error){
            console.log(error)
        }
    }

  return (
        <div className='w-full h-[96%] rounded-lg p-2 bg-white'>  
        {
            riderWeekData && isWeekEdit?
            <div className='bg-white flex flex-col items-center gap-5 w-full h-[82vh] rounded-md overflow-scroll'>
                <div className='w-full rounded-lg gap-2 flex flex-row justify-end items-center'>
                    <button onClick={()=>setIsWeekEdit(false)} className='px-3 sm:px-12 w-1/2 py-2 text-lg bg-pink-50 hover:bg-red-600 hover:text-white h-full rounded-sm'>Cancel</button>
                    <button onClick={()=>updateWeekData(riderWeekData.riderId)} className='px-4 w-1/2 sm:px-12 py-2 text-lg bg-green-50 hover:bg-green-600 hover:text-white h-full rounded-sm'>Update</button>
                </div>
                <div className='text-xs sm:text-md mb-8 flex w-full flex-row justify-between bg-slate-50'>
                    <div className='w-full flex flex-row mr-8 items-center'>   
                        <div className='flex flex-col w-full gap-3 p-4 hover:bg-[#004e76] hover:text-white'>
                            <p className='text-sm'>騎手姓名</p>
                            <p className='text-lg font-extrabold'>{riderWeekData.name}</p>
                        </div>
                        <div className='flex flex-col w-full gap-3 p-4 hover:bg-[#004e76] hover:text-white'>
                            <p className='text-sm'>配送週數</p>
                            <p className='text-lg font-extrabold'>{riderWeekData.weeknum}</p>
                        </div>
                        <div className='flex flex-col w-full gap-3 p-4 hover:bg-[#004e76] hover:text-white'>
                            <p className='text-sm hover:text-white'>上線獎勵</p>
                            <select className=' border-gray-300 py-1 pl-1 rounded-md border-2 hover:text-black' type='text' value={riderWeekData.is_online_bonus} onChange={e=>setRiderWeekData(prev =>({...prev, is_online_bonus: e.target.value}))}>
                                <option value='達標'>達標</option>
                                <option value='未達標'>未達標</option>
                            </select>
                        </div>
                    </div>
                </div>
                <h1 className='w-full border-l-4 pl-4 text-lg font-bold border-[#004e76]'>當周表現</h1>
                <div className='flex flex-wrap gap-x-24 gap-y-12 w-full mt-8'>
                    <div className='w-full max-w-96'> 
                        <div className='flex flex-row items-center mb-4 gap-3'>
                            {riderWeekData.reportItem.includes('ttl_delivered')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                            <p className='text-sm text-gray-700'>總配送貨量</p>
                        </div>
                        <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderWeekData.ttl_delivered} onChange={e=>setRiderWeekData(prev =>({...prev, ttl_delivered: e.target.value}))}></input>
                    </div>
                    <div className='w-full max-w-96'> 
                        <div className='flex flex-row items-center mb-4 gap-3'>
                            {riderWeekData.reportItem.includes('ttl_workday')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                            <p className='text-sm text-gray-700'>總配送天數</p>
                        </div>
                        <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderWeekData.ttl_worksday} onChange={e=>setRiderWeekData(prev =>({...prev, ttl_worksday: e.target.value}))}></input>
                    </div>
                    <div className='w-full max-w-96'> 
                        <div className='flex flex-row items-center mb-4 gap-3'>
                            {riderWeekData.reportItem.includes('ttl_workday_weekend')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                            <p className='text-sm text-gray-700'>假日配送天數</p>
                        </div>
                        <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderWeekData.ttl_workday_weekend} onChange={e=>setRiderWeekData(prev =>({...prev, ttl_workday_weekend: e.target.value}))}></input>
                    </div>
                    <div className='w-full max-w-96'> 
                        <div className='flex flex-row items-center mb-4 gap-3'>
                            {riderWeekData.reportItem.includes('epod & lost')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                            <p className='text-sm text-gray-700'>epod累計不佳次數</p>
                        </div>
                        <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderWeekData.epod_lost} onChange={e=>setRiderWeekData(prev =>({...prev, epod_lost: e.target.value}))}></input>
                    </div>
                    <div className='w-full max-w-96'> 
                        <div className='flex flex-row items-center mb-4 gap-3'>
                            {riderWeekData.reportItem.includes('seq')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                            <p className='text-sm text-gray-700'>推薦排序使用率</p>
                        </div>
                        <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderWeekData.seq} onChange={e=>setRiderWeekData(prev =>({...prev, seq: e.target.value}))}></input>
                    </div>
                </div>
                <div className='mt-8 flex flex-col justify-center items-start w-full'>
                    <h1 className='border-l-4 pl-4 text-lg font-bold border-gray-400 '>File attached</h1>
                    <div className='flex flex-wrap gap-4 mt-6 bg-slate-50 p-2 w-full'>
                        {riderWeekData.image[0]?
                        <div className='flex flex-row gap-2 items-center'>
                            <p className='w-3 h-3 rounded-full bg-green-500'></p>
                            <p><a href={riderWeekData.image[0]} target="_blank">image_1</a></p>
                        </div>:''
                        }
                        {riderWeekData.image[1]?
                        <div className='flex flex-row gap-2 items-center'>
                            <p className='w-3 h-3 rounded-full bg-green-500'></p>
                            <p><a href={riderWeekData.image[1]} target="_blank">image_2</a></p>
                        </div>:''
                        }
                        {riderWeekData.image[2]?
                        <div className='flex flex-row gap-2 items-center'>
                            <p className='w-3 h-3 rounded-full bg-green-500'></p>
                            <p><a href={riderWeekData.image[2]} target="_blank">image_3</a></p>
                        </div>:''
                        }
                    </div>
                </div>
                <div className='w-full mt-8'>
                    <h1 className='border-l-4 pl-4 text-lg font-bold border-pink-400 '>Explanation</h1>
                    <div class="px-4 mt-8 border border-gray-200 bg-white rounded-t-lg dark:bg-gray-800 w-full">
                        <textarea id="comment" rows="4" onChange={e=>setRiderWeekData(prev =>({...prev, admincomment: e.target.value}))} value={riderWeekData.admincomment} className="outline-none w-full py-2 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required ></textarea>
                    </div>
                </div>
            </div>:''
        }
        {
            riderData && riderWeekData&& isSpQualify && isEdit?
            
                <div className='w-full text-xs sm:text-md h-full rounded-lg overflow-scroll'>
                    <div className='w-full'>
                        <div className='w-full'>
                            <div className='w-full gap-4 flex flex-row justify-center items-center mb-2'>
                                <button onClick={()=>setIsEdit(false)} className='px-2 w-full sm:px-12 py-2 text-lg bg-pink-50 hover:bg-red-600 hover:text-white h-full rounded-sm'>Cancel</button>
                                <button onClick={()=>updateData(riderData.riderId)} className='px-2 w-full sm:px-12 py-2 text-lg bg-green-50 hover:bg-green-600 hover:text-white h-full rounded-sm'>Update</button>
                            </div>
                            <div className='mb-12 w-full flex flex-row bg-slate-50 overflow-scroll'>
                                <div className='flex flex-row justify-center items-center w-full'>   
                                    <div className='flex flex-col w-full gap-3 p-4 hover:bg-[#004e76] hover:text-white'>
                                        <p className='text-sm'>騎手姓名</p>
                                        <p className='text-lg font-extrabold'>{riderData.name}</p>
                                    </div>
                                    <div className='flex flex-col w-full gap-3 p-4 hover:bg-[#004e76] hover:text-white'>
                                        <p className='text-sm'>配送日期</p>
                                        <p className='text-lg font-extrabold'>{riderData.date}</p>
                                    </div>
                                    <div className='flex flex-col w-full gap-3 p-4 hover:bg-[#004e76] hover:text-white'>
                                        <p className='text-sm hover:text-white'>保底獎勵</p>
                                        <select className=' border-gray-300 py-1 pl-1 rounded-md border-2 hover:text-black' type='text' value={riderData.is_garantee} onChange={e=>setRiderData(prev =>({...prev, is_garantee: e.target.value}))}>
                                            <option value='達標'>達標</option>
                                            <option value='未達標'>未達標</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex justify-between items-center'>
                                <h1 className='border-l-4 pl-4 text-lg font-bold border-green-600 '>{riderData.sp2_1}</h1>
                                <div className='flex flex-row gap-4 items-center justify-center'>
                                    <p>服務獎勵</p>
                                    <select className=' border-gray-300 py-1 pl-1 rounded-md border-2' type='text' value={riderData.is_garantee} onChange={e=>setRiderData(prev =>({...prev, is_garantee: e.target.value}))}>
                                        <option value='達標'>達標</option>
                                        <option value='未達標'>未達標</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-wrap gap-x-24 gap-y-12 w-full mt-12'>
                                <div className='w-full max-w-96'> 
                                    <div className='flex flex-row items-center mb-4 gap-3'>
                                        {reportSp2Item['1'].includes('remain_delivering')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                        <p className='text-sm text-gray-700'>門市應配貨量</p>
                                        <CiCircleQuestion onClick={()=>setRiderData(prev =>({...prev, sp2_1_remaindelivering: Number(riderData.sp2_1_ttl_delivered) + Number(riderData.sp2_1_onhold_fix)}))}/>
                                    </div>
                                    <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.sp2_1_remaindelivering} onChange={e=>setRiderData(prev =>({...prev, sp2_1_remaindelivering: e.target.value}))}></input>
                                </div>
                                <div className='w-full max-w-96'> 
                                    <div className='flex flex-row items-center mb-4 gap-3'>
                                        {reportSp2Item['1'].includes('onhold')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                        <p className='text-sm text-gray-700'>門市異常貨量</p>
                                    </div>
                                    <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.sp2_1_onhold} onChange={e=>setRiderData(prev =>({...prev, sp2_1_onhold: e.target.value}))}></input>
                                </div>
                                <div className='w-full max-w-96'> 
                                    <div className='flex flex-row items-center mb-4 gap-3'>
                                        {reportSp2Item['1'].includes('delivered_cnt')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                        <p className='text-sm text-gray-700'>個人配送貨量</p>
                                    </div>
                                    <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.sp2_1_delivered} onChange={e=>setRiderData(prev =>({...prev, sp2_1_delivered: e.target.value}))}></input>
                                </div>
                                <div className='w-full max-w-96'> 
                                    <div className='flex flex-row items-center mb-4 gap-3'>
                                        <p className='text-sm text-gray-700'>指定騎手總配送貨量</p>
                                    </div>
                                    <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.sp2_1_assign_delivered} onChange={e=>setRiderData(prev =>({...prev, sp2_1_assign_delivered: e.target.value}))}></input>
                                </div>
                                <div className='w-full max-w-96'> 
                                    <div className='flex flex-row items-center mb-4 gap-3'>
                                        {reportSp2Item['1'].includes('delivered_cnt')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                        <p className='text-sm text-gray-700'>門市總配送貨量</p>
                                    </div>
                                    <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.sp2_1_ttl_delivered} onChange={e=>setRiderData(prev =>({...prev, sp2_1_ttl_delivered: e.target.value}))}></input>
                                </div>
                                <div className='w-full max-w-96'> 
                                    <div className='flex flex-row items-center mb-4 gap-3'>
                                        {reportSp2Item['1'].includes('smart_inbound')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                        <p className='text-sm text-gray-700'>SMART INBOUND執行率</p>
                                    </div>
                                    <select className='w-full border-gray-300 py-1 pl-1 rounded-md border-2' type='text' value={riderData.sp2_1_sop} onChange={e=>setRiderData(prev =>({...prev, sp2_1_sop: e.target.value}))}>
                                        <option value='達標'>達標</option>
                                        <option value='未達標'>未達標</option>
                                    </select>
                                </div>
                                <div className='w-full max-w-96'>
                                    <div className='flex flex-row items-center mb-4 gap-3'>
                                        {reportSp2Item['1'].includes('Appsheet')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                        <p className='text-sm text-gray-700'>APPSHEET清空滯留包裹</p>
                                    </div>
                                    <select className='w-full border-gray-300 py-1 pl-1 rounded-md border-2' type='text' value={riderData.sp2_1_appsheet} onChange={e=>setRiderData(prev =>({...prev, sp2_1_appsheet: e.target.value}))}>
                                        <option value='清空'>清空</option>
                                        <option value='未清空'>未清空</option>
                                    </select>
                                </div>
                                <div className='w-full max-w-96'>
                                    <div className='flex flex-row items-center mb-4 gap-3'>
                                        {reportSp2Item['1'].includes('EPOD')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                        <p className='text-sm text-gray-700'>EPOD執行率</p>
                                    </div>
                                    <select className='w-full border-gray-300 py-1 pl-1 rounded-md border-2' type='text' value={riderData.epod} onChange={e=>setRiderData(prev =>({...prev, epod: e.target.value}))}>
                                        <option value='達標'>達標</option>
                                        <option value='未達標'>未達標</option>
                                    </select>
                                </div>
                                <div className='w-full max-w-96'>
                                    <div className='flex flex-row items-center mb-4 gap-3'>
                                        {reportSp2Item['1'].includes('first_delivering_time')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                        <p className='text-sm text-gray-700'>承攬時間</p>
                                    </div>
                                    <select className='w-full border-gray-300 py-1 pl-1 rounded-md border-2' type='text' value={riderData.sp2_attendance} onChange={e=>setRiderData(prev =>({...prev, sp2_attendance: e.target.value}))}>
                                        <option value='達標'>達標</option>
                                        <option value='未達標'>未達標</option>
                                    </select>
                                </div>
                                <div className='w-full max-w-96'> 
                                    <div className='flex flex-row items-center mb-4 gap-3'>
                                        {reportSp2Item['1'].includes('lost')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                        <p className='text-sm text-gray-700'>遺失包裹數量</p>
                                    </div>
                                    <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.lost_cnt.length} onChange={e=>setRiderData(prev =>({...prev, lost_cnt: e.target.value}))}></input>
                                </div>
                                <div className='w-full max-w-96'> 
                                    <div className='flex flex-row items-center mb-4 gap-3'>
                                        <p className='text-sm text-gray-700'>當周承攬達標比例</p>
                                    </div>
                                    <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderWeekData.uncleanCnt} onChange={e=>setRiderWeekData(prev =>({...prev, uncleanCnt: e.target.value}))}></input>
                                    <div className='flex flex-row cursor-pointer gap-2 items-center text-xs mt-4' onClick={()=>myRef.current.scrollIntoView()}>
                                        <p className='underline'>周配送成績調整</p>
                                        <CiCircleQuestion />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {riderData.sp2_2==='-'?'':
                        <div className='w-full'>
                            <hr className='w-full mt-8'/>
                            <div className='w-full mt-8'>
                                <div className='w-full flex pr-5 justify-between items-center'>
                                    <h1 className='border-l-4 pl-4 text-lg font-bold border-green-600 '>{riderData.sp2_2}</h1>
                                    <div className='flex flex-row gap-4 items-center justify-center'>
                                        <p>服務獎勵</p>
                                        <select className=' border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.is_garantee} onChange={e=>setRiderData(prev =>({...prev, is_garantee: e.target.value}))}>
                                            <option value='達標'>達標</option>
                                            <option value='未達標'>未達標</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='flex flex-wrap gap-x-24 gap-y-12 w-full overflow-scroll mt-12'>
                                    <div className='w-full max-w-96'> 
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['2'].includes('remain_delivering')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>門市應配貨量</p>
                                            <CiCircleQuestion onClick={()=>setRiderData(prev =>({...prev, sp2_2_remaindelivering: Number(riderData.sp2_2_ttl_delivered) + Number(riderData.sp2_2_onhold_fix)}))}/>
                                        </div>
                                        <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.sp2_2_remaindelivering} onChange={e=>setRiderData(prev =>({...prev, sp2_2_remaindelivering: e.target.value}))}></input>
                                    </div>
                                    <div className='w-full max-w-96'> 
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['2'].includes('onhold')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>門市異常貨量</p>
                                        </div>
                                        <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.sp2_2_onhold} onChange={e=>setRiderData(prev =>({...prev, sp2_2_onhold: e.target.value}))}></input>
                                    </div>
                                    <div className='w-full max-w-96'> 
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['2'].includes('delivered_cnt')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>個人配送貨量</p>
                                        </div>
                                        <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.sp2_2_delivered} onChange={e=>setRiderData(prev =>({...prev, sp2_2_delivered: e.target.value}))}></input>
                                    </div>
                                    <div className='w-full max-w-96'> 
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['1'].includes('delivered_cnt')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>指定騎手總配送貨量</p>
                                        </div>
                                        <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.sp2_2_assign_delivered} onChange={e=>setRiderData(prev =>({...prev, sp2_2_assign_delivered: e.target.value}))}></input>
                                    </div>
                                    <div className='w-full max-w-96'> 
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            <p className='text-sm text-gray-700'>門市總配送貨量</p>
                                        </div>
                                        <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.sp2_2_ttl_delivered} onChange={e=>setRiderData(prev =>({...prev, sp2_2_ttl_delivered: e.target.value}))}></input>
                                    </div>
                                    <div className='w-full max-w-96'> 
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['2'].includes('smart_inbound')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>SMART INBOUND執行率</p>
                                        </div>
                                        <select className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.sp2_2_sop} onChange={e=>setRiderData(prev =>({...prev, sp2_2_sop: e.target.value}))}>
                                            <option value='達標'>達標</option>
                                            <option value='未達標'>未達標</option>
                                        </select>
                                    </div>
                                    <div className='w-full max-w-96'>
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['2'].includes('Appsheet')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>APPSHEET清空滯留包裹</p>
                                        </div>
                                        <select className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.sp2_2_appsheet} onChange={e=>setRiderData(prev =>({...prev, sp2_2_appsheet: e.target.value}))}>
                                            <option value='達標'>達標</option>
                                            <option value='未達標'>未達標</option>
                                        </select>
                                    </div>
                                    <div className='w-full max-w-96'>
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['2'].includes('EPOD')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>EPOD執行率</p>
                                        </div>
                                        <select className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.epod} onChange={e=>setRiderData(prev =>({...prev, epod: e.target.value}))}>
                                            <option value='達標'>達標</option>
                                            <option value='未達標'>未達標</option>
                                        </select>
                                    </div>
                                    <div className='w-full max-w-96'>
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['2'].includes('first_delivering_time')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>承攬時間</p>
                                        </div>
                                        <select className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.sp2_attendance} onChange={e=>setRiderData(prev =>({...prev, sp2_attendance: e.target.value}))}>
                                            <option value='達標'>達標</option>
                                            <option value='未達標'>未達標</option>
                                        </select>
                                    </div>
                                    <div className='w-full max-w-96'> 
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['2'].includes('lost')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>遺失包裹數量</p>
                                        </div>
                                        <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.lost_cnt.length} onChange={e=>setRiderData(prev =>({...prev, lost_cnt: e.target.value}))}></input>
                                    </div>
                                    <div className='w-full max-w-96'> 
                                    <div className='flex flex-row items-center mb-4 gap-3'>
                                        <p className='text-sm text-gray-700'>當周承攬達標比例</p>
                                    </div>
                                    <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderWeekData.uncleanCnt} onChange={e=>setRiderWeekData(prev =>({...prev, uncleanCnt: e.target.value}))}></input>
                                    <div className='flex flex-row cursor-pointer gap-2 items-center text-xs mt-4' onClick={()=>myRef.current.scrollIntoView()}>
                                        <p className='underline'>周配送成績調整</p>
                                        <CiCircleQuestion />
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    }
                    {riderData.sp2_3==='-'?'':
                        <div className='w-full'>
                            <hr className='w-full mt-8'/>
{/*                             <div className='flex flex-row items-center gap-3 w-full'>
                                <button onClick={()=>updateData(riderData.id, riderData.name, riderData.date, riderData.is_garantee, riderData.smart_inbound_sop, riderData.is_report)} className='bg-green-100 p-3 round-lg cursor-pointer'>Save</button>
                                <button onClick={()=>setIsEdit(false)} className='bg-green-100 p-3 round-lg cursor-pointer'>Cancel</button>
                            </div> */}
                            <div className='w-full'>
                                <div className='w-full flex pr-5 justify-between items-center'>
                                    <h1 className='border-l-4 pl-4 text-lg font-bold border-green-600 '>{riderData.sp2_3}</h1>
                                    <div className='flex flex-row gap-4 items-center justify-center'>
                                        <p>服務獎勵</p>
                                        <select className=' border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.is_garantee} onChange={e=>setRiderData(prev =>({...prev, is_garantee: e.target.value}))}>
                                            <option value='達標'>達標</option>
                                            <option value='未達標'>未達標</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='flex flex-wrap gap-x-24 gap-y-12 w-full overflow-scroll mt-12'>
                                <div className='w-full max-w-96'> 
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['3'].includes('remain_delivering')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>門市應配貨量</p>
                                            <CiCircleQuestion onClick={()=>setRiderData(prev =>({...prev, sp2_3_remaindelivering: Number(riderData.sp2_3_ttl_delivered) + Number(riderData.sp2_3_onhold_fix)}))}/>
                                        </div>
                                        <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.sp2_3_remaindelivering} onChange={e=>setRiderData(prev =>({...prev, sp2_3_remaindelivering: e.target.value}))}></input>
                                    </div>
                                    <div className='w-full max-w-96'> 
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['3'].includes('onhold')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>門市異常貨量</p>
                                        </div>
                                        <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.sp2_3_onhold} onChange={e=>setRiderData(prev =>({...prev, sp2_3_onhold: e.target.value}))}></input>
                                    </div>
                                    <div className='w-full max-w-96'> 
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['3'].includes('delivered_cnt')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>個人配送貨量</p>
                                        </div>
                                        <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.sp2_3_delivered} onChange={e=>setRiderData(prev =>({...prev, sp2_3_delivered: e.target.value}))}></input>
                                    </div>
                                    <div className='w-full max-w-96'> 
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            <p className='text-sm text-gray-700'>指定騎手總配送貨量</p>
                                        </div>
                                        <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.sp2_3_assign_delivered} onChange={e=>setRiderData(prev =>({...prev, sp2_3_assign_delivered: e.target.value}))}></input>
                                    </div>
                                    <div className='w-full max-w-96'> 
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['3'].includes('delivered_cnt')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>門市總配送貨量</p>
                                        </div>
                                        <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.sp2_3_ttl_delivered} onChange={e=>setRiderData(prev =>({...prev, sp2_3_ttl_delivered: e.target.value}))}></input>
                                    </div>
                                    <div className='w-full max-w-96'> 
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['3'].includes('smart_inbound')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>SMART INBOUND執行率</p>
                                        </div>
                                        <select className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.sp2_3_sop} onChange={e=>setRiderData(prev =>({...prev, sp2_3_sop: e.target.value}))}>
                                            <option value='達標'>達標</option>
                                            <option value='未達標'>未達標</option>
                                        </select>
                                    </div>
                                    <div className='w-full max-w-96'>
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['3'].includes('Appsheet')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>APPSHEET清空滯留包裹</p>
                                        </div>
                                        <select className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.sp2_3_appsheet} onChange={e=>setRiderData(prev =>({...prev, sp2_3_appsheet: e.target.value}))}>
                                            <option value='清空'>清空</option>
                                            <option value='未清空'>未清空</option>
                                        </select>
                                    </div>
                                    <div className='w-full max-w-96'>
                                        <p className='text-sm mb-4 text-gray-700'>EPOD執行率</p>
                                        <select className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.epod} onChange={e=>setRiderData(prev =>({...prev, epod: e.target.value}))}>
                                            <option value='達標'>達標</option>
                                            <option value='未達標'>未達標</option>
                                        </select>
                                    </div>
                                    <div className='w-full max-w-96'>
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['3'].includes('first_delivering_time')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>承攬時間</p>
                                        </div>
                                        <select className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.sp2_attendance} onChange={e=>setRiderData(prev =>({...prev, sp2_attendance: e.target.value}))}>
                                            <option value='達標'>達標</option>
                                            <option value='未達標'>未達標</option>
                                        </select>
                                    </div>
                                    <div className='w-full max-w-96'> 
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['3'].includes('lost')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>遺失包裹數量</p>
                                        </div>
                                        <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderData.lost_cnt.length} onChange={e=>setRiderData(prev =>({...prev, lost_cnt: e.target.value}))}></input>
                                    </div>
                                    <div className='w-full max-w-96'> 
                                    <div className='flex flex-row items-center mb-4 gap-3'>
                                        <p className='text-sm text-gray-700'>當周承攬達標比例</p>
                                    </div>
                                    <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderWeekData.uncleanCnt} onChange={e=>setRiderWeekData(prev =>({...prev, uncleanCnt: e.target.value}))}></input>
                                    <div className='flex flex-row cursor-pointer gap-2 items-center text-xs mt-4' onClick={()=>myRef.current.scrollIntoView()}>
                                        <p className='underline'>周配送成績調整</p>
                                        <CiCircleQuestion />
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    }
                    {!dayAdjustment?'':
                    <div ref={myRef} className='flex flex-col gap-x-24 gap-y-8 w-full mt-8'>
                        <h1 className='border-l-4 pl-4 text-lg font-bold border-orange-400 '>當周配送表現調整</h1>
                        {isSpQualify.map((item, index)=>(
                            <div key={index}>
                                <div className='flex flex-row w-full bg-slate-50 rounded-md items-center justify-start overflow-scroll'>
                                    <div className='flex flex-col w-full gap-3 p-4 hover:bg-[#004e76] hover:text-white'>
                                        <p className='text-xs'>配送日期</p>
                                        <p className='py-1 rounded-md'>{item.date}</p>
                                    </div>
                                    <div className='flex flex-col w-full gap-3 p-4 hover:bg-[#004e76] hover:text-white'>
                                        <p className='text-xs'>保底獎勵</p>
                                        <select className=' border-gray-300 py-1 rounded-md border-2 hover:text-black' type='text' value={item.is_garantee} onChange={(e)=>adjustQualification(e.target.value, "is_garantee", item._id)}>
                                            <option value='達標'>達標</option>
                                            <option value='未達標'>未達標</option>
                                            <option value='-'>-</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-col w-full gap-3 p-4 hover:bg-[#004e76] hover:text-white'>
                                        <p className='text-xs'>{item.sp2_1}</p>
                                        <select className=' border-gray-300 py-1 rounded-md border-2 hover:text-black' type='text' value={item.sp2_1_is_servicce_bonus} onChange={(e)=>adjustQualification(e.target.value, "sp2_1_is_servicce_bonus", item._id)}>
                                            <option value='達標'>達標</option>
                                            <option value='未達標'>未達標</option>
                                            <option value='-'>-</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-col w-full gap-3 p-4 hover:bg-[#004e76] hover:text-white'>
                                        <p className='text-xs'>{item.sp2_2}</p>
                                        <select className=' border-gray-300 py-1 rounded-md border-2 hover:text-black' type='text' value={item.sp2_2_is_servicce_bonus} onChange={(e)=>adjustQualification(e.target.value, "sp2_2_is_servicce_bonus", item._id)}>
                                            <option value='達標'>達標</option>
                                            <option value='未達標'>未達標</option>
                                            <option value='-'>-</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-col w-full gap-3 p-4 hover:bg-[#004e76] hover:text-white'>
                                        <p className='text-xs'>{item.sp2_3}</p>
                                        <select className=' border-gray-300 py-1 rounded-md border-2 hover:text-black' type='text' value={item.sp2_3_is_servicce_bonus} onChange={(e)=>adjustQualification(e.target.value, "sp2_3_is_servicce_bonus", item._id)}>
                                            <option value='達標'>達標</option>
                                            <option value='未達標'>未達標</option>
                                            <option value='-'>-</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='w-full overflow-scroll'>
                                    <table className="table-fixed w-full min-w-[1250px] text-left mt-3">
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
                                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                                <p className="block text-sm font-normal leading-none text-slate-500">遺失包裹</p>
                                            </th>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                            <td className="p-5 border-b border-slate-200 flex flex-row items-center gap-2">
                                                <p className={item.sp2_1_serve_type==="指定"?'w-2 h-2 rounded-full bg-green-600':'w-2 h-2 rounded-full bg-yellow-400'}></p>
                                                <p className="block text-sm text-slate-800">{item.sp2_1}</p>
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                {parseInt(item.sp2_1_ttl_delivered)>=parseInt(item.sp2_1_remaindelivering)+parseInt(item.sp2_1_onhold)?
                                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                                }
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                {item.sp2_1_sop==="-"? '': item.sp2_1_sop==="達標"?
                                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                                }
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                {item.sp2_1_serve_type==="指定"?'':item.sp2_1_appsheet==="-"? '': item.sp2_1_appsheet==="達標"?
                                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                                }
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                {item.sp2_1_serve_type==="支援"?'':item.sp2_attendance==="達標"?
                                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                                }
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                {item.sp2_epod==="達標"?
                                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                                }
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                {!item.lost_cnt?0:item.lost_cnt.length===0?
                                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                                }
                                            </td>
                                        </tr>
                                        {item.sp2_2==="-"?'':
                                        <tr className="hover:bg-slate-50">
                                            <td className="p-5 border-b border-slate-200 flex flex-row items-center gap-2">
                                                <p className={item.sp2_2_serve_type==="指定"?'w-2 h-2 rounded-full bg-green-600':'w-2 h-2 rounded-full bg-yellow-400'}></p>
                                                <p className="block text-sm text-slate-800">{item.sp2_2}</p>
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                {parseInt(item.sp2_2_ttl_delivered)>=parseInt(item.sp2_2_remaindelivering)+parseInt(item.sp2_2_onhold)?
                                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                                }
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                {item.sp2_2_sop==="-"? '': item.sp2_2_sop==="達標"?
                                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                                }
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                {item.sp2_2_serve_type==="指定"?'':item.sp2_2_appsheet==="-"? '': item.sp2_2_appsheet==="達標"?
                                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                                }
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                {item.sp2_2_serve_type==="支援"?'':item.sp2_attendance==="達標"?
                                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                                }
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                {item.sp2_epod==="達標"?
                                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                                }
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                {!item.lost_cnt?0:item.lost_cnt.length===0?
                                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                                }
                                            </td>
                                        </tr>
                                        }
                                        {item.sp2_3==="-"?'':
                                            <tr className="hover:bg-slate-50">
                                                <td className="p-5 border-b border-slate-200 flex flex-row items-center gap-2">
                                                    <p className={item.sp2_3_serve_type==="指定"?'w-2 h-2 rounded-full bg-green-600':'w-2 h-2 rounded-full bg-yellow-400'}></p>
                                                    <p className="block text-sm text-slate-800">{item.sp2_3}</p>
                                                </td>
                                            <td className="p-4 border-b border-slate-200">
                                                {parseInt(item.sp2_3_ttl_delivered)>=parseInt(item.sp2_3_remaindelivering)+parseInt(item.sp2_3_onhold)?
                                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                                }
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                {item.sp2_3_sop==="-"? '': item.sp2_3_sop==="達標"?
                                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                                }
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                {item.sp2_3_serve_type==="指定"?'':item.sp2_3_appsheet==="-"? '': item.sp2_3_appsheet==="達標"?
                                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                                }
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                {item.sp2_3_serve_type==="支援"?'':item.sp2_attendance==="達標"?
                                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                                }
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                {item.sp2_epod==="達標"?
                                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                                }
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                {!item.lost_cnt?0:item.lost_cnt.length===0?
                                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                                }
                                            </td>
                                        </tr>
                                        }
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                    }
                    <div className='mt-8 flex flex-col justify-center items-start w-full'>
                        <h1 className='border-l-4 pl-4 text-lg font-bold border-gray-400 '>File attached</h1>
                        <div className='flex flex-wrap gap-4 mt-6 bg-slate-50 p-2 w-full'>
                            {riderData.image[0]?
                            <div className='flex flex-row gap-2 items-center'>
                                <p className='w-3 h-3 rounded-full bg-green-500'></p>
                                <p><a href={riderData.image[0]} target="_blank">image_1</a></p>
                            </div>:''
                            }
                            {riderData.image[1]?
                            <div className='flex flex-row gap-2 items-center'>
                                <p className='w-3 h-3 rounded-full bg-green-500'></p>
                                <p><a href={riderData.image[1]} target="_blank">image_2</a></p>
                            </div>:''
                            }
                            {riderData.image[2]?
                            <div className='flex flex-row gap-2 items-center'>
                                <p className='w-3 h-3 rounded-full bg-green-500'></p>
                                <p><a href={riderData.image[2]} target="_blank">image_3</a></p>
                            </div>:''
                            }
                        </div>
                    </div>
                    <div className='w-full mt-8'>
                        <h1 className='border-l-4 pl-4 text-lg font-bold border-pink-400 '>Explanation</h1>
                        <div class="px-4 mt-8 border border-gray-200 bg-white rounded-t-lg dark:bg-gray-800 w-full">
                            <textarea id="comment" rows="4" onChange={e=>setRiderData(prev =>({...prev, admincomment: e.target.value}))} value={riderData.admincomment} className="outline-none w-full py-2 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required ></textarea>
                        </div>
                    </div>
                </div>:''
        }
        </div>
  )
}

export default Update
