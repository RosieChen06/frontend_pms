import React, { useContext, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { VscReport } from "react-icons/vsc";
import { UserContext } from '../../context/UserContext';
import { AdminContext } from '../../context/AdminContext';
import { ImCross } from "react-icons/im";
import { FaCheckDouble } from "react-icons/fa6";


const Detail = ({token, name, date, is_garantee, sp2_1, sp2_1_is_servicce_bonus, sp2_1_remaindelivering, sp2_1_ttl_delivered, sp2_1_delivered, sp2_1_onhold, sp2_1_appsheet,
    sp2_1_serve_type, sp2_1_sop, sp2_2, sp2_2_is_servicce_bonus, sp2_2_remaindelivering, sp2_2_ttl_delivered, sp2_2_delivered, sp2_2_onhold, sp2_2_appsheet, sp2_2_serve_type, 
    sp2_2_sop, sp2_3, sp2_3_is_servicce_bonus, sp2_3_remaindelivering, sp2_3_ttl_delivered, sp2_3_delivered, sp2_3_onhold, sp2_3_appsheet, sp2_3_serve_type, sp2_3_sop, epod, 
    lost_cnt, weeknum, sp2_attendance, epod_lost, seq, ttl_delivered, ttl_workday_weekend,ttl_worksday, uncleanCnt, is_online_bonus, day_report_status, week_report_status}) => {
  
    const {setIsShowDetail, setReportForm, setIsShowConfirmDetail, setIsReportOnline} = useContext(UserContext)
    const {setIsShowAdminDetail, setIsShowData} = useContext(AdminContext)


    return (
    <div className=' bg-white w-full h-full rounded-lg p-2 mt-3'> 
        <div className='border-l-2 border-gray-300 pl-4'>
            <div className='flex justify-between'>
                <p className='text-lg font-bold'>Detail</p>
                <button className='mr-5' onClick={()=>{setIsShowDetail(false); setIsShowConfirmDetail(false); setIsShowAdminDetail(false); setIsReportOnline(false); setIsShowData(false);}}><IoClose /></button>  
            </div>
            <p className='mt-4 text-sm text-gray-700'>Rider Name: {name}</p>
            <div className='flex justify-between'>
                <p className='text-sm text-gray-700'>Date: {date}</p>
                <div className='text-sm flex flex-row gap-6 mr-5'>
                    <p className={is_garantee==='未達標'?'border-l-4 border-red-600 pl-2':'border-l-4 border-green-400 pl-2'}>保底獎勵</p>
                </div>
            </div>
        </div>
        <div className='bg-[#f8f9fd] h-[80%] mt-4 rounded-lg overflow-scroll px-5 py-4'>
            <div className='border-l-4 mb-4 border-[#004e76] pl-4 rounded-lg bg-white p-2'>
                <div className='flex justify-between pr-2'>
                    <p className='font-bold'>本周配送狀況</p>
                    {is_online_bonus==='未達標'?
                        <p className='border-l-4 border-red-600 pl-2'>上線獎勵</p>:
                        <p className='border-l-4 border-green-400 pl-2'>上線獎勵</p>
                    }
                </div>
                <div className='w-full overflow-scroll'>
                    <table className="table-fixed w-full min-w-[1000px] text-left mt-3">
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
                            {token==='admin'?'':day_report_status==='confirm'?'':
                                <th class="p-4 border-b border-slate-300 bg-slate-50">
                                <p class="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                            </th>
                            }
                        </tr>
                        <tr class="hover:bg-slate-50">
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">{ttl_delivered}</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">{ttl_worksday}</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">{ttl_workday_weekend}</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">{parseFloat(seq*100).toFixed(2)+'%'}</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">{epod_lost}</p>
                            </td>
                            {token==='admin'?'':day_report_status==='confirm'?'':                                
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800"></p>
                            </td>
                            }
                        </tr>
                        <tr class="hover:bg-slate-50">
                            <td class="p-4 border-b border-slate-200">
                                {parseInt(ttl_delivered)>=400?
                                    <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />上線獎勵</p>:
                                    <p class="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />上線獎勵</p>
                                }
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                {parseInt(ttl_worksday)>=5?
                                    <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />上線獎勵</p>:
                                    <p class="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />上線獎勵</p>
                                }
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                {parseInt(ttl_workday_weekend)>=1?
                                    <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />上線獎勵</p>:
                                    <p class="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />上線獎勵</p>
                                }
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                {parseInt(seq)>=0.9?
                                    <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />上線獎勵</p>:
                                    <p class="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />上線獎勵</p>
                                }
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                {parseInt(epod_lost)<=2?
                                    <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />上線獎勵</p>:
                                    <p class="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />上線獎勵</p>
                                }
                            </td>
                            {token==='admin'?'':day_report_status==='confirm'?'':                                
                            <td class="p-4 border-b border-slate-200">
                                {week_report_status==='report'?
                                    <div className='flex flex-row gap-1'>
                                        <FaCheckDouble className='text-xl cursor-pointer' />
                                        <p class="block text-sm text-slate-800">已回報</p>
                                    </div>
                                    :<p class="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setIsReportOnline(true); setReportForm(true); setIsShowDetail(false);}}/></p>
                                }
                            </td>
                            }
                        </tr>
                    </table>
                </div>
            </div>
            <div className={sp2_1_serve_type==="指定"?'border-l-4 border-green-400 pl-4 rounded-lg bg-white p-2':'border-l-4 border-yellow-400 pl-4 rounded-lg bg-white p-2'}>
                <div className='flex justify-between pr-2'>    
                    <p className='font-bold'>{sp2_1}</p>
                    <p className={sp2_1_is_servicce_bonus==="達標"?'border-l-4 border-green-400 pl-2':sp2_1_is_servicce_bonus==="部分達標"?'border-l-4 border-yellow-400 pl-2':'border-l-4 border-red-600 pl-2'}>服務獎勵</p>
                </div>
                <p className='text-sm font-semibold mt-4'>1. 門市清空</p>
                <div className='w-full overflow-scroll'>
                    <table className="table-fixed w-full min-w-[730px] text-left mt-3">
                        <tr>
                            <th class="p-4 border-b border-slate-300 bg-slate-50">
                                <p class="block text-sm font-normal leading-none text-slate-500">項目</p>
                            </th>
                            <th class="p-4 border-b border-slate-300 bg-slate-50">
                                <p class="block text-sm font-normal leading-none text-slate-500">數量</p>
                            </th>
                            <th class="p-4 border-b border-slate-300 bg-slate-50">
                                <p class="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                            </th>
                            <th class="p-4 border-b border-slate-300 bg-slate-50">
                                <p class="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                            </th>
                            {token==='admin'?'':day_report_status==='confirm'?'':
                                <th class="p-4 border-b border-slate-300 bg-slate-50">
                                <p class="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                            </th>
                            }
                        </tr>
                        <tr class="hover:bg-slate-50">
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">應配貨量</p>
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
                            {token==='admin'?'':day_report_status==='confirm'?'':                                
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setReportForm(true); setIsShowDetail(false);}}/></p>
                            </td>
                            }
                        </tr>
                        <tr class="hover:bg-slate-50">
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">異常貨量</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">{sp2_1_onhold}</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800"></p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800"></p>
                            </td>
                            {token==='admin'?'':day_report_status==='confirm'?'':                                
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setReportForm(true); setIsShowDetail(false);}}/></p>
                            </td>
                            }
                        </tr>
                        <tr class="hover:bg-slate-50">
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">個人總配送量</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">{sp2_1_delivered}</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                {parseInt(sp2_1_delivered)>=parseInt(sp2_1_remaindelivering)-parseInt(sp2_1_onhold)?
                                    <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                    <p class="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                                }
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800"></p>
                            </td>
                            {token==='admin'?'':day_report_status==='confirm'?'':                                  
                            <td class="p-4 border-b border-slate-200">
                                 <p class="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setReportForm(true); setIsShowDetail(false);}}/></p>
                             </td>
                            }
                        </tr>
                        <tr class="hover:bg-slate-50">
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">門市總配送量</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800">{sp2_1_ttl_delivered}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {parseInt(sp2_1_ttl_delivered)>=parseInt(sp2_1_remaindelivering)-parseInt(sp2_1_onhold)?
                                    <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                    <p class="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                                }
                            </td>
                            {token==='admin'?'':day_report_status==='confirm'?'':                                   
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
                            {token==='admin'?'':day_report_status==='confirm'?'':
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
                                {sp2_1_sop==='-'?<p>-</p>:
                                    <p className="block text-sm text-slate-800">{sp2_1_sop}</p>
                                }
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                {sp2_1_sop==="-"?<p></p>:sp2_1_sop==='達標'?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                                }
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                {sp2_1_sop==="-"?<p></p>:sp2_1_sop==='達標'?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                                }
                            </td>
                            {token==='admin'?'':day_report_status==='confirm'?'':                                   
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
                                {sp2_1_appsheet==='-'?<p>-</p>:
                                    <p className="block text-sm text-slate-800">{sp2_1_appsheet}</p>
                                }
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800"></p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                {sp2_1_appsheet==="-"?<p></p>:sp2_1_appsheet==='達標'?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                                }
                            </td>
                            {token==='admin'?'':day_report_status==='confirm'?'':                                   
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
                                {epod==='達標'?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                                }
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {epod==='達標'?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                                }
                            </td>
                            {token==='admin'?'':day_report_status==='confirm'?'':                                   
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setReportForm(true); setIsShowDetail(false)}}/></p>
                            </td>
                            }
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">遺失包裹</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{lost_cnt}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {parseInt(lost_cnt)===0?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                                }
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {parseInt(lost_cnt)===0?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                                }
                            </td>
                            {token==='admin'?'':day_report_status==='confirm'?'':                                   
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
                            {token==='admin'?'':day_report_status==='confirm'?'':
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
                                <p class="block text-sm text-slate-800">{sp2_attendance}</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                {sp2_attendance==="達標"?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                                }
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                {sp2_attendance==="達標"?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                                }
                            </td>
                            {token==='admin'?'':day_report_status==='confirm'?'':                                   
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
                                <p class="block text-sm text-slate-800">{uncleanCnt}</p>
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                {parseInt(uncleanCnt)<=2?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                                }
                            </td>
                            <td class="p-4 border-b border-slate-200">
                                <p class="block text-sm text-slate-800"></p>
                            </td>
                            {token==='admin'?'':day_report_status==='confirm'?'':                                   
                            <td class="p-4 border-b border-slate-200">
                            {week_report_status==='report'?
                                <div className='flex flex-row gap-1'>
                                    <FaCheckDouble className='text-xl cursor-pointer' />
                                    <p class="block text-sm text-slate-800">已回報</p>
                                </div>
                                :<p class="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setIsReportOnline(true); setReportForm(true); setIsShowDetail(false);}}/></p>
                            }
                            </td>
                            }
                        </tr>
                    </table>
                </div>
            </div>
            {sp2_2==="-"?'':           
                <div className={sp2_2_serve_type==="指定"?'border-l-4 border-green-400 pl-4 rounded-lg bg-white p-2 mt-4':'border-l-4 border-yellow-400 pl-4 rounded-lg bg-white p-2 mt-4'}>
                    <div className='flex justify-between pr-2'>    
                        <p className='font-bold'>{sp2_2}</p>
                        <p className={sp2_2_is_servicce_bonus==="達標"?'border-l-4 border-green-400 pl-2':sp2_2_is_servicce_bonus==="部分達標"?'border-l-4 border-yellow-400 pl-2':'border-l-4 border-red-600 pl-2'}>服務獎勵</p>
                    </div>
                    <div className='w-full overflow-scroll'>
                    <table className="table-fixed w-full min-w-[730px] text-left mt-3">
                        <tr>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">項目</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">數量</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                            </th>
                            {token==='admin'?'':day_report_status==='confirm'?'':
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
                            {token==='admin'?'':day_report_status==='confirm'?'':                                   
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
                                <p className="block text-sm text-slate-800">{sp2_2_delivered}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {parseInt(sp2_2_delivered)>=parseInt(sp2_2_remaindelivering)-parseInt(sp2_2_onhold)?
                                    <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                    <p class="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                                }
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            {token==='admin'?'':day_report_status==='confirm'?'':                                   
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
                                <p className="block text-sm text-slate-800">{sp2_2_ttl_delivered}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {parseInt(sp2_2_ttl_delivered)>=parseInt(sp2_2_remaindelivering)-parseInt(sp2_2_onhold)?
                                    <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                    <p class="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                                }
                            </td>
                            {token==='admin'?'':day_report_status==='confirm'?'':                                   
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
                            {token==='admin'?'':day_report_status==='confirm'?'':
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
                                {sp2_2_sop==='-'?<p>-</p>:
                                    <p className="block text-sm text-slate-800">{sp2_2_sop}</p>
                                }
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {sp2_2_sop==="-"?<p></p>:sp2_2_sop==='達標'?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                                }
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {sp2_2_sop==="-"?<p></p>:sp2_2_sop==='達標'?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                                }
                            </td>
                            {token==='admin'?'':day_report_status==='confirm'?'':                                   
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
                                {sp2_2_appsheet==='-'?<p>-</p>:
                                    <p className="block text-sm text-slate-800">{sp2_2_appsheet}</p>
                                }
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {sp2_2_appsheet==="-"?<p></p>:sp2_2_appsheet==='達標'?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                                }
                            </td>
                            {token==='admin'?'':day_report_status==='confirm'?'':                                   
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
                                {epod==='達標'?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                                }
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {epod==='達標'?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                                }
                            </td>
                            {token==='admin'?'':day_report_status==='confirm'?'':                                   
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setReportForm(true); setIsShowDetail(false)}}/></p>
                            </td>
                            }
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">遺失包裹</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{lost_cnt}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {parseInt(lost_cnt)===0?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                                }
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {parseInt(lost_cnt)===0?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                                }
                            </td>
                            {token==='admin'?'':day_report_status==='confirm'?'':                                   
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
                            {token==='admin'?'':day_report_status==='confirm'?'':
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
                                <p className="block text-sm text-slate-800">{sp2_attendance}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {sp2_attendance==="達標"?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                                }
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {sp2_attendance==="達標"?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                                }
                            </td>
                            {token==='admin'?'':day_report_status==='confirm'?'':                                   
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
                                <p className="block text-sm text-slate-800">{uncleanCnt}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {parseInt(uncleanCnt)<=2?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                                }
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            {token==='admin'?'':day_report_status==='confirm'?'':                                   
                            <td className="p-4 border-b border-slate-200">
                            {week_report_status==='report'?
                                <div className='flex flex-row gap-1'>
                                    <FaCheckDouble className='text-xl cursor-pointer' />
                                    <p class="block text-sm text-slate-800">已回報</p>
                                </div>
                                :<p class="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setIsReportOnline(true); setReportForm(true); setIsShowDetail(false);}}/></p>
                            }
                            </td>
                            }
                        </tr>
                    </table>
                </div>
                </div>
            }
            {sp2_3==="-"?'':           
                <div className={sp2_3_serve_type==="指定"?'border-l-4 border-green-400 pl-4 rounded-lg bg-white p-2 mt-4':'border-l-4 border-yellow-400 pl-4 rounded-lg bg-white p-2 mt-4'}>
                    <div className='flex justify-between pr-2'>    
                        <p className='font-bold'>{sp2_3}</p>
                        <p className={sp2_3_is_servicce_bonus==="達標"?'border-l-4 border-green-400 pl-2':sp2_3_is_servicce_bonus==="部分達標"?'border-l-4 border-yellow-400 pl-2':'border-l-4 border-red-600 pl-2'}>服務獎勵</p>
                    </div>
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
                                <p className="block text-sm text-slate-800">應配貨量</p>
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
                                <p className="block text-sm text-slate-800">{sp2_3_delivered}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {parseInt(sp2_3_delivered)>=parseInt(sp2_3_remaindelivering)-parseInt(sp2_3_onhold)?
                                    <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                    <p class="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                                }
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
                                <p className="block text-sm text-slate-800">{sp2_3_ttl_delivered}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {parseInt(sp2_3_ttl_delivered)>=parseInt(sp2_3_remaindelivering)-parseInt(sp2_3_onhold)?
                                    <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                    <p class="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                                }
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
                                {sp2_3_sop==='-'?<p>-</p>:
                                    <p className="block text-sm text-slate-800">{sp2_3_sop}</p>
                                }
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {sp2_3_sop==="-"?<p>-</p>:sp2_3_sop==='達標'?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                                }
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {sp2_3_sop==="-"?<p>-</p>:sp2_3_sop==='達標'?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                                }
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
                                {sp2_3_appsheet==='-'?<p>-</p>:
                                    <p className="block text-sm text-slate-800">{sp2_3_appsheet}</p>
                                }
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {sp2_3_appsheet==="-"?<p></p>:sp2_3_appsheet==='達標'?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                                }
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
                                {epod==='達標'?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                                }
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
                                <p className="block text-sm text-slate-800">遺失包裹</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{lost_cnt}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {parseInt(lost_cnt)===0?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                                }
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {parseInt(lost_cnt)===0?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                                }
                            </td>
                            {token==='admin'?'':day_report_status==='confirm'?'':                                   
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
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                            </th>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">承攬時間</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{sp2_attendance}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {sp2_attendance==="達標"?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                                }
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {sp2_attendance==="達標"?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                                }
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
                                <p className="block text-sm text-slate-800">{uncleanCnt}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {parseInt(uncleanCnt)<=2?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                                }
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800"></p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                            {week_report_status==='report'?
                                <div className='flex flex-row gap-1'>
                                    <FaCheckDouble className='text-xl cursor-pointer' />
                                    <p class="block text-sm text-slate-800">已回報</p>
                                </div>
                                :<p class="block text-sm text-slate-800"><VscReport className='text-xl cursor-pointer' onClick={()=>{setIsReportOnline(true); setReportForm(true); setIsShowDetail(false);}}/></p>
                            }
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
