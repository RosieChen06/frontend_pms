import React, { useContext, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { VscReport } from "react-icons/vsc";
import { UserContext } from '../../context/UserContext';
import { AdminContext } from '../../context/AdminContext';


const Detail = ({token, name, date, is_garantee, is_service_bonus, is_online_bonus, sp2_1, sp2_1_serve_type, sp2_2, sp2_2_serve_type, sp2_3, sp2_3_serve_type, sp2_1_remaindelivering, sp2_2_remaindelivering, sp2_3_remaindelivering, sp2_1_delivered_cnt, sp2_2_delivered_cnt, sp2_3_delivered_cnt, sp2_1_clened_ttl_cnt, sp2_2_clened_ttl_cnt, sp2_3_clened_ttl_cnt, appsheet, sop, epod, status, weeknum}) => {
  
    const {isShowDetail, setIsShowDetail, reportForm, setReportForm, displayItem, setDisplayItem, isShowConfirmDetail, setIsShowConfirmDetail} =useContext(UserContext)
    const {isShowAdminDetail, setIsShowAdminDetail, rider, displayMainItem, setDisplayMainItem} = useContext(AdminContext)

    const [weekArray, setWeekArray] = useState([])
    let dummyWeekArray=[]

    const lookUp = (name, weeknum) => {
        setWeekArray([])
        let selectedWeek = rider.filter((item)=>(
            item.name===name && item.weeknum===weeknum
        ))
        console.log(selectedWeek)
        for(let i=0; i<=selectedWeek.length; i++){
            dummyWeekArray.push(selectedWeek[i]._id)
            console.log(dummyWeekArray)
            setWeekArray(dummyWeekArray)
        }
    }

    console.log(weekArray)

    return (
    <div className='absolute bg-white w-[81%] h-[86%] rounded-lg p-2 mt-3 ml-0'> 
        <div className='border-l-2 border-gray-300 pl-4'>
            <div className='flex justify-between'>
                <p className='text-lg font-bold'>Detail</p>
                <button className='mr-5' onClick={()=>{setIsShowDetail(false); setIsShowConfirmDetail(false); setIsShowAdminDetail(false);}}><IoClose /></button>  
            </div>
            <p className='mt-4 text-sm text-gray-700'>Rider Name: {name}</p>
            <div className='flex justify-between'>
                <p className='text-sm text-gray-700'>Date: {date.slice(0,10)}</p>
                <div className='text-sm flex flex-row gap-6 mr-5'>
                    <p className={is_garantee==="o"?'border-l-4 border-green-400 pl-2':'border-l-4 border-red-600 pl-2'}>保底獎勵</p>
                </div>
            </div>
        </div>
        <div className='bg-[#f8f9fd] h-[80%] mt-4 rounded-lg overflow-scroll px-5 py-4'>
            <div className='border-l-4 mb-4 border-[#004e76] pl-4 rounded-lg bg-white p-2'>
                <div className='flex justify-between pr-2'>
                    <p className='font-bold'>本周配送狀況</p>
                    <p className={is_online_bonus==="o"?'border-l-4 border-green-400 pl-2':is_online_bonus==="尚未結算"?'border-l-4 border-gray-400 pl-2':'border-l-4 border-red-600 pl-2'}>上線獎勵</p>
                </div>
                <table className="table-fixed w-full min-w-[730px] text-left mt-3">
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
                        {token==='admin'?'':status==='confirm'?'':
                            <th class="p-4 border-b border-slate-300 bg-slate-50">
                            <p class="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                        </th>
                        }
                    </tr>
                    <tr class="hover:bg-slate-50">
                        <td class="p-4 border-b border-slate-200">
                            <p class="block text-sm text-slate-800">{}</p>
                        </td>
                        <td class="p-4 border-b border-slate-200">
                            <p class="block text-sm text-slate-800">{}</p>
                        </td>
                        <td class="p-4 border-b border-slate-200">
                            <p class="block text-sm text-slate-800">{}</p>
                        </td>
                        <td class="p-4 border-b border-slate-200">
                            <p class="block text-sm text-slate-800">{}</p>
                        </td>
                        <td class="p-4 border-b border-slate-200">
                            <p class="block text-sm text-slate-800">{}</p>
                        </td>
                        {token==='admin'?'':status==='confirm'?'':                                
                        <td class="p-4 border-b border-slate-200">
                            <p class="block text-sm text-slate-800"></p>
                        </td>
                        }
                    </tr>
                    <tr class="hover:bg-slate-50">
                        <td class="p-4 border-b border-slate-200">
                            <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />上線獎勵</p>
                        </td>
                        <td class="p-4 border-b border-slate-200">
                            <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />上線獎勵</p>
                        </td>
                        <td class="p-4 border-b border-slate-200">
                            <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />上線獎勵</p>
                        </td>
                        <td class="p-4 border-b border-slate-200">
                            <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />上線獎勵</p>
                        </td>
                        <td class="p-4 border-b border-slate-200">
                            <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />上線獎勵</p>
                        </td>
                        {token==='admin'?'':status==='confirm'?'':                                
                        <td class="p-4 border-b border-slate-200">
                            <p class="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{lookUp(name, weeknum)}}/></p>
                        </td>
                        }
                    </tr>
                </table>
            </div>
            <div className={sp2_1_serve_type==="指定"?'border-l-4 border-green-400 pl-4 rounded-lg bg-white p-2':'border-l-4 border-yellow-400 pl-4 rounded-lg bg-white p-2'}>
                <div className='flex justify-between pr-2'>    
                    <p className='font-bold'>{sp2_1}</p>
                    <p className={is_service_bonus==="o"?'border-l-4 border-green-400 pl-2':is_service_bonus==="△"?'border-l-4 border-yellow-400 pl-2':'border-l-4 border-red-600 pl-2'}>服務獎勵</p>
                </div>
                <p className='text-sm font-semibold mt-4'>1. 門市清空</p>
                <div className='w-full overflow-scroll'>
                    <table className="table-fixed w-full min-w-[730px] text-left mt-3">
                        <tr>
                            <th class="p-4 border-b border-slate-300 bg-slate-50">
                                <p class="block text-sm font-normal leading-none text-slate-500">項目</p>
                            </th>
                            <th class="p-4 border-b border-slate-300 bg-slate-50">
                                <p class="block text-sm font-normal leading-none text-slate-500">數量(異常)</p>
                            </th>
                            <th class="p-4 border-b border-slate-300 bg-slate-50">
                                <p class="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                            </th>
                            <th class="p-4 border-b border-slate-300 bg-slate-50">
                                <p class="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                            </th>
                            {token==='admin'?'':status==='confirm'?'':
                                <th class="p-4 border-b border-slate-300 bg-slate-50">
                                <p class="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                            </th>
                            }
                        </tr>
                        <tr class="hover:bg-slate-50">
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">應配貨量(異常)</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">{sp2_1_remaindelivering}</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800"></p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800"></p>
                            </td>
                            {token==='admin'?'':status==='confirm'?'':                                
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800"></p>
                            </td>
                            }
                        </tr>
                        <tr class="hover:bg-slate-50">
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">個人總配送量</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">{sp2_1_delivered_cnt}</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800"></p>
                            </td>
                            {token==='admin'?'':status==='confirm'?'':                                  
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800"></p>
                            </td>
                            }
                        </tr>
                        <tr class="hover:bg-slate-50">
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">門市總配送量</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">{sp2_1_clened_ttl_cnt}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                            </td>
                            {token==='admin'?'':status==='confirm'?'':                                   
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800"></p>
                            </td>
                            }
                        </tr>
                    </table>
                </div>
                <p className='text-sm font-semibold mt-8'>2. 取件流程正確率</p>
                <div className='w-full overflow-scroll'>
                    <table className="table-fixed w-full min-w-[730px] text-left mt-3">
                        <tr>
                            <th class="p-4 border-b border-slate-300 bg-slate-50">
                                <p class="block text-sm font-normal leading-none text-slate-500">項目</p>
                            </th>
                            <th class="p-4 border-b border-slate-300 bg-slate-50">
                                <p class="block text-sm font-normal leading-none text-slate-500">結果</p>
                            </th>
                            <th class="p-4 border-b border-slate-300 bg-slate-50">
                                <p class="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                            </th>
                            <th class="p-4 border-b border-slate-300 bg-slate-50">
                                <p class="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                            </th>
                            {token==='admin'?'':status==='confirm'?'':
                                <th class="p-4 border-b border-slate-300 bg-slate-50">
                                <p class="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                            </th>
                            }
                        </tr>
                        <tr class="hover:bg-slate-50">
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">Smart Inbound</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">{sop}</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                            </td>
                            {token==='admin'?'':status==='confirm'?'':                                   
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setReportForm(true); setIsShowDetail(false);}}/></p>
                            </td>
                            }
                        </tr>
                        <tr class="hover:bg-slate-50">
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">Appsheet滯留包裹</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">{appsheet}</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800"></p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                            </td>
                            {token==='admin'?'':status==='confirm'?'':                                   
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setReportForm(true); setIsShowDetail(false)}}/></p>
                            </td>
                            }
                        </tr>
                        <tr class="hover:bg-slate-50">
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">EPOD</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">{epod}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                            </td>
                            {token==='admin'?'':status==='confirm'?'':                                   
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setReportForm(true); setIsShowDetail(false)}}/></p>
                            </td>
                            }
                        </tr>
                    </table>
                </div>
                <p className='text-sm font-semibold mt-8'>3. 是否接受當日承攬任務</p>
                <div className='w-full overflow-scroll'>
                    <table className="table-fixed w-full text-left min-w-[730px] mt-3">
                        <tr>
                            <th class="p-4 border-b border-slate-300 bg-slate-50">
                                <p class="block text-sm font-normal leading-none text-slate-500">項目</p>
                            </th>
                            <th class="p-4 border-b border-slate-300 bg-slate-50">
                                <p class="block text-sm font-normal leading-none text-slate-500">結果</p>
                            </th>
                            <th class="p-4 border-b border-slate-300 bg-slate-50">
                                <p class="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                            </th>
                            <th class="p-4 border-b border-slate-300 bg-slate-50">
                                <p class="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                            </th>
                            {token==='admin'?'':status==='confirm'?'':
                                <th class="p-4 border-b border-slate-300 bg-slate-50">
                                <p class="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                            </th>
                            }
                        </tr>
                        <tr class="hover:bg-slate-50">
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">承攬時間</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">{sop}</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                            </td>
                            {token==='admin'?'':status==='confirm'?'':                                   
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setReportForm(true); setIsShowDetail(false)}}/></p>
                            </td>
                            }
                        </tr>
                        <tr class="hover:bg-slate-50">
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800"><span className='font-bold'>當週</span>完成承攬任務天數比例</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">{appsheet}</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800"></p>
                            </td>
                            {token==='admin'?'':status==='confirm'?'':                                   
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setReportForm(true); setIsShowDetail(false)}}/></p>
                            </td>
                            }
                        </tr>
                    </table>
                </div>
            </div>
            {sp2_2==="-"?'':           
                <div className={sp2_2_serve_type==="指定"?'border-l-4 border-green-400 pl-4 rounded-lg bg-white p-2 mt-4':'border-l-4 border-yellow-400 pl-4 rounded-lg bg-white p-2 mt-4'}>
                    <p className='font-bold'>{sp2_2}</p>
                    <div className='w-full overflow-scroll'>
                    <table className="table-fixed w-full min-w-[730px] text-left mt-3">
                        <tr>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">項目</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">數量(異常)</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                            </th>
                            {token==='admin'?'':status==='confirm'?'':
                                <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                            </th>
                            }
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">應配貨量(異常)</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{sp2_2_remaindelivering}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            {token==='admin'?'':status==='confirm'?'':                                   
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            }
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">個人總配送量</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{sp2_2_delivered_cnt}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            {token==='admin'?'':status==='confirm'?'':                                   
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            }
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">門市總配送量</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{sp2_2_clened_ttl_cnt}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                            </td>
                            {token==='admin'?'':status==='confirm'?'':                                   
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            }
                        </tr>
                    </table>
                </div>
                <p className='text-sm font-semibold mt-8'>2. 取件流程正確率</p>
                <div className='w-full overflow-scroll'>
                    <table className="table-fixed w-full min-w-[730px] text-left mt-3">
                        <tr>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">項目</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">結果</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                            </th>
                            {token==='admin'?'':status==='confirm'?'':
                                <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                            </th>
                            }
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">Smart Inbound</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{sop}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                            </td>
                            {token==='admin'?'':status==='confirm'?'':                                   
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setReportForm(true); setIsShowDetail(false)}}/></p>
                            </td>
                            }
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">Appsheet滯留包裹</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{appsheet}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                            </td>
                            {token==='admin'?'':status==='confirm'?'':                                   
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setReportForm(true); setIsShowDetail(false)}}/></p>
                            </td>
                            }
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">EPOD</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{epod}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                            </td>
                            {token==='admin'?'':status==='confirm'?'':                                   
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setReportForm(true); setIsShowDetail(false)}}/></p>
                            </td>
                            }
                        </tr>
                    </table>
                </div>
                <p className='text-sm font-semibold mt-8'>3. 是否接受當日承攬任務</p>
                <div className='w-full overflow-scroll'>
                    <table className="table-fixed w-full text-left min-w-[730px] mt-3">
                        <tr>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">項目</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">結果</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                            </th>
                            {token==='admin'?'':status==='confirm'?'':
                                <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                            </th>
                            }
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">承攬時間</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{sop}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                            </td>
                            {token==='admin'?'':status==='confirm'?'':                                   
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setReportForm(true); setIsShowDetail(false)}}/></p>
                            </td>
                            }
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"><span className='font-bold'>當週</span>完成承攬任務天數比例</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{appsheet}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            {token==='admin'?'':status==='confirm'?'':                                   
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setReportForm(true); setIsShowDetail(false)}}/></p>
                            </td>
                            }
                        </tr>
                    </table>
                </div>
                </div>
            }
            {sp2_3==="-"?'':           
                <div className={sp2_3_serve_type==="指定"?'border-l-4 border-green-400 pl-4 rounded-lg bg-white p-2 mt-4':'border-l-4 border-yellow-400 pl-4 rounded-lg bg-white p-2 mt-4'}>
                    <p className='font-bold'>{sp2_3}</p>
                    <p className='text-sm font-semibold mt-4'>1. 門市清空 :</p>
                    <div className='w-full overflow-scroll'>
                    <table className="table-fixed w-full min-w-[730px] text-left mt-3">
                        <tr>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">項目</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">數量(異常)</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                            </th>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">應配貨量(異常)</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{sp2_3_remaindelivering}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">個人總配送量</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{sp2_3_delivered_cnt}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">門市總配送量</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{sp2_3_clened_ttl_cnt}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                        </tr>
                    </table>
                </div>
                <p className='text-sm font-semibold mt-8'>2. 取件流程正確率</p>
                <div className='w-full overflow-scroll'>
                    <table className="table-fixed w-full min-w-[730px] text-left mt-3">
                        <tr>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">項目</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">結果</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                            </th>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">Smart Inbound</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{sop}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setReportForm(true); setIsShowDetail(false)}}/></p>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">Appsheet滯留包裹</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{appsheet}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setReportForm(true); setIsShowDetail(false)}}/></p>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">EPOD</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{epod}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setReportForm(true); setIsShowDetail(false)}}/></p>
                            </td>
                        </tr>
                    </table>
                </div>
                <p className='text-sm font-semibold mt-8'>3. 是否接受當日承攬任務</p>
                <div className='w-full overflow-scroll'>
                    <table className="table-fixed w-full text-left min-w-[730px] mt-3">
                        <tr>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">項目</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">結果</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                            </th>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">承攬時間</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{sop}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setReportForm(true); setIsShowDetail(false)}}/></p>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"><span className='font-bold'>當週</span>完成承攬任務天數比例</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{appsheet}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setReportForm(true); setIsShowDetail(false);}}/></p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            }
        </div> 
    </div>
  )
}

export default Detail
