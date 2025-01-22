import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AdminContext } from '../../context/AdminContext'
import { UserContext } from '../../context/UserContext'
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";

const Update = () => {

    const {getDB, rider, state, isEdit, setIsEdit,isWeekEdit, setIsWeekEdit, riderData, setRiderData, riderWeekData, setRiderWeekData, isSp1Qualify, setSp1IsQualify, isSp2Qualify, setSp2IsQualify, isSp3Qualify, setSp3IsQualify} = useContext(AdminContext)
    const {reportSp2Item, setReportSp2Item} = useContext(UserContext)
    const ReportedData = rider.filter((item)=>(item.status==='report'))

    const [id, setId] = useState([])

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
            formData.append('status', "resolve")
            formData.append('epod', riderData.epod)

            const {data} = await axios.post('http://localhost:4000/api/admin/update-data',formData)

            if(data.success){
                toast.success(data.message)
                setIsEdit(false)
                getDB()
            }else{
                toast.error(data.message)
            }

        }catch(error){
            console.log(error)
        }
    }

    const obj = []

    for(let i=0; i<ReportedData.length; i++){
        let test1 = JSON.parse(ReportedData[Number(i)].reportItem)['1']
        let test2 = JSON.parse(ReportedData[Number(i)].reportItem)['2']
        let test3 = JSON.parse(ReportedData[Number(i)].reportItem)['3']
        let test = test1.concat(test2).concat(test3);
        test.filter((item, index) => test.indexOf(item) !== index);
        obj.push(test)
    }

  return state && (
        <div className='flex flex-col gap-3 pl-12 w-2/3 md:w-5/6 mt-4'>  
            <div className='flex flex-row gap-2 items-center h-[3vh]'>
                <h1 className='text-[#004e76] font-extrabold'>All Report</h1>
                <p className='bg-[#004e76] px-3 text-white rounded-full text-sm flex items-center'>{ReportedData.length}</p>
            </div>
            <div className='flex flex-wrap gap-6 mt-4 h-[77vh] overflow-scroll w-[99%] relative'>
                {
                    ReportedData.map((item, index)=>(
                    <div key={index} className='flex flex-col items-start gap-5 max-w-96 min-w-96 max-h-72 min-h-72 bg-white p-2 rounded-md'>
                        <div className='flex flex-col gap-0.5'>
                            <p className='font-semibold'>{item.name}</p>
                            <p className='text-xs'>{item.date.slice(0,10)}</p>
                        </div>
                        <div className='flex flex-wrap gap-2 w-full'>
                            <p className={obj[index][0]==='Appsheet'?'px-4 py-0.5 font-bold rounded-full bg-pink-200 text-sm':obj[index][0]==='smart_inbound'?'px-4 py-0.5 font-bold rounded-full bg-purple-200 text-sm':obj[index][0]==='EPOD'?'px-4 py-0.5 font-bold rounded-full bg-yellow-200 text-sm':obj[index][0]==='work&clean'?'px-4 py-0.5 font-bold rounded-full bg-blue-200 text-sm':'px-4 py-0.5 font-bold rounded-full bg-orange-200 text-sm'}>{obj[index][0]}</p>
                            {obj[index][1]?<p className={obj[index][1]==='Appsheet'?'px-4 py-0.5 font-bold rounded-full bg-pink-200 text-sm':obj[index][1]==='smart_inbound'?'px-4 py-0.5 font-bold rounded-full bg-purple-200 text-sm':obj[index][1]==='EPOD'?'px-4 py-0.5 font-bold rounded-full bg-yellow-200 text-sm':obj[index][1]==='work&clean'?'px-4 py-0.5 font-bold rounded-full bg-blue-200 text-sm':'px-4 py-0.5 font-bold rounded-full bg-orange-200 text-sm'}>{obj[index][1]}</p>:''}
                            {obj[index][2]?<p className={obj[index][2]==='Appsheet'?'px-4 py-0.5 font-bold rounded-full bg-pink-200 text-sm':obj[index][2]==='smart_inbound'?'px-4 py-0.5 font-bold rounded-full bg-purple-200 text-sm':obj[index][2]==='EPOD'?'px-4 py-0.5 font-bold rounded-full bg-yellow-200 text-sm':obj[index][2]==='work&clean'?'px-4 py-0.5 font-bold rounded-full bg-blue-200 text-sm':'px-4 py-0.5 font-bold rounded-full bg-orange-200 text-sm'}>{obj[index][2]}</p>:''}
                            {obj[index][3]?<p className={obj[index][3]==='Appsheet'?'px-4 py-0.5 font-bold rounded-full bg-pink-200 text-sm':obj[index][3]==='smart_inbound'?'px-4 py-0.5 font-bold rounded-full bg-purple-200 text-sm':obj[index][3]==='EPOD'?'px-4 py-0.5 font-bold rounded-full bg-yellow-200 text-sm':obj[index][3]==='work&clean'?'px-4 py-0.5 font-bold rounded-full bg-blue-200 text-sm':'px-4 py-0.5 font-bold rounded-full bg-orange-200 text-sm'}>{obj[index][3]}</p>:''}
                            {obj[index][4]?<p className={obj[index][4]==='Appsheet'?'px-4 py-0.5 font-bold rounded-full bg-pink-200 text-sm':obj[index][4]==='smart_inbound'?'px-4 py-0.5 font-bold rounded-full bg-purple-200 text-sm':obj[index][4]==='EPOD'?'px-4 py-0.5 font-bold rounded-full bg-yellow-200 text-sm':obj[index][4]==='work&clean'?'px-4 py-0.5 font-bold rounded-full bg-blue-200 text-sm':'px-4 py-0.5 font-bold rounded-full bg-orange-200 text-sm'}>{obj[index][4]}</p>:''}
                        </div>
                        <p className='bg-gray-100 p-2 w-full h-20 overflow-scroll'>{item.comment}</p>
                        <hr className='w-full' />
                        <div className='flex flex-row justify-between w-full items-center'>
                            <div>
                                <p><a href={item.image[0]} target="_blank">{item.image.length} file attached</a></p>
                            </div>
                            <button onClick={()=>openEditForm(item._id)} className='bg-[#004e76] rounded-md px-8 py-3 text-white font-bold round-lg cursor-pointer'>Edit</button>
                        </div>
                    </div> 
                    ))
                }
            </div>
        {
            riderWeekData && isWeekEdit?
            <div className='flex flex-col items-center gap-5 absolute px-4 py-8 md:px-12 w-9/12 bg-white h-[85vh] rounded-md overflow-scroll'>
                <div className='pr-6 mb-12 flex w-full flex-row gap-4 justify-between bg-slate-50'>
                    <div className='w-full flex flex-row justify-center items-center'>   
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
                            <select className=' border-gray-300 py-1 pl-1 rounded-md border-2 hover:text-black' type='text' value={riderData.is_garantee} onChange={e=>setRiderData(prev =>({...prev, is_garantee: e.target.value}))}>
                                <option value='達標'>達標</option>
                                <option value='未達標'>未達標</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-row justify-end items-center w-full'>
                        <button onClick={()=>setIsEdit(false)} className=' px-12 py-2 text-lg bg-pink-50 hover:bg-red-600 hover:text-white h-full rounded-sm'>Cancel</button>
                        <button onClick={()=>updateData(riderWeekData.riderId)} className=' px-12 py-2 text-lg bg-green-50 hover:bg-green-600 hover:text-white h-full rounded-sm'>Update</button>
                    </div>
                </div>
                <h1 className='w-full border-l-4 pl-4 text-lg font-bold border-[#004e76]'>當周表現</h1>
                <div className='flex flex-wrap gap-x-24 gap-y-12 w-full mt-12'>
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
                <h1 className='w-full mt-16 border-l-4 pl-4 text-lg font-bold border-[#004e76]'>當周表現</h1>
                <div className='flex flex-wrap gap-x-24 gap-y-12 w-full mt-12'>
                    <div className='w-full max-w-96'> 
                        <div className='flex flex-row items-center mb-4 gap-3'>
                            {riderWeekData.reportItem.includes('uncleanCnt')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                            <p className='text-sm text-gray-700'>當周承攬完成比例</p>
                        </div>
                        <input className='w-full border-gray-300 py-1 pl-2 rounded-md border-2' type='text' value={riderWeekData.ttl_delivered} onChange={e=>setRiderWeekData(prev =>({...prev, ttl_delivered: e.target.value}))}></input>
                    </div>
                </div>
                <div className='flex flex-col gap-x-24 gap-y-12 w-full mt-8'>
                    {rider.filter((i)=>(i.weeknum===riderWeekData.weeknum)).map((item, index)=>(
                        <div key={index}>
                            <div className='flex flex-row gap-16 p-4 w-full bg-red-100'>
                                <p>{item.date}</p>
                                <p>{item.sp2_1}</p>
                                <select className=' border-gray-300 py-1 pl-1 rounded-md border-2 hover:text-black' type='text' value={sp2IsQualify.sp2_1_serveice_bonus} onChange={e=>setSp1IsQualify(prev =>({...prev, sp2_1_serveice_bonus: e.target.value}))}>
                                    <option value='達標'>達標</option>
                                    <option value='未達標'>未達標</option>
                                </select>
                                <p>{item.sp2_2}</p>
                                <p>{item.sp2_3}</p>
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
                                        <td className="p-4 border-b border-slate-200 flex flex-row gap-2 items-center">
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
                                            {item.lost_cnt.length===0?
                                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                                <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                            }
                                        </td>
                                    </tr>
                                    {item.sp2_2==="-"?'':
                                    <tr className="hover:bg-slate-50">
                                        <td className="p-4 border-b border-slate-200 flex flex-row gap-2 items-center">
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
                                            {item.lost_cnt.length===0?
                                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />達標</p>:
                                                <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />未達標</p>
                                            }
                                        </td>
                                    </tr>
                                    }
                                    {item.sp2_3==="-"?'':
                                        <tr className="hover:bg-slate-50">
                                            <td className="p-4 border-b border-slate-200 flex flex-row gap-2 items-center">
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
                                            {item.lost_cnt.length===0?
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
            </div>:''
        }
        {
            riderData && isEdit?
            
                <div className='flex flex-col items-center gap-5 absolute px-4 py-8 md:px-12 w-9/12 bg-white h-[85vh] rounded-md overflow-scroll'>
                    <div className='w-full'>
                        <div className='w-full mt-4'>
                            <div className='pr-6 mb-12 flex flex-row gap-4 justify-between bg-slate-50'>
                                <div className='w-full flex flex-row justify-center items-center'>   
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
                                <div className='flex flex-row justify-end items-center w-full'>
                                    <button onClick={()=>setIsEdit(false)} className=' px-12 py-2 text-lg bg-pink-50 hover:bg-red-600 hover:text-white h-full rounded-sm'>Cancel</button>
                                    <button onClick={()=>updateData(riderData.riderId)} className=' px-12 py-2 text-lg bg-green-50 hover:bg-green-600 hover:text-white h-full rounded-sm'>Update</button>
                                </div>
                            </div>
                            <div className='w-full flex pr-5 justify-between items-center'>
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
                                </div>
                            </div>
                        </div>
                    }
                    {riderData.sp2_3==='-'?'':
                        <div className='w-full'>
                            <hr className='w-full mt-8'/>
                            <div className='flex flex-row items-center gap-3 w-full'>
                                <button onClick={()=>updateData(riderData.id, riderData.name, riderData.date, riderData.is_garantee, riderData.smart_inbound_sop, riderData.is_report)} className='bg-green-100 p-3 round-lg cursor-pointer'>Save</button>
                                <button onClick={()=>setIsEdit(false)} className='bg-green-100 p-3 round-lg cursor-pointer'>Cancel</button>
                            </div>
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
                                </div>
                            </div>
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
                            <textarea id="comment" rows="4" onChange={e=>setRiderData(prev =>({...prev, admincomment: e.target.value}))} value={riderData.comment} className="outline-none w-full py-2 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required ></textarea>
                        </div>
                    </div>
                </div>:''
        }
        </div>
  )
}

export default Update
