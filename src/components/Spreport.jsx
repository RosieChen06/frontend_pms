import React, { useState } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { UserContext } from '../../context/UserContext'
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Spreport = ({sp2_1_serve_type, sp2_1_name, sp2_1_remaindelivering, sp2_1_onhold,  
    sp2_1_sop, sp2_1_appsheet, sp2_1_ttl_delivered, sp2_1_delivered, sp2_1_lost_cnt,
    sp2_2_serve_type, sp2_2_name, sp2_2_remaindelivering, sp2_2_onhold,
    sp2_2_sop, sp2_2_appsheet, sp2_2_ttl_delivered,
    sp2_2_delivered, sp2_2_lost_cnt, sp2_3_serve_type, sp2_3_name, sp2_3_remaindelivering, sp2_3_onhold,
    sp2_3_sop, sp2_3_appsheet, sp2_3_ttl_delivered, sp2_3_delivered, sp2_3_lost_cnt, sp_epod, sp_attendance}) => {

    const {token} = useContext(AdminContext)
    const {isOnlineReport} = useContext(UserContext)
    const {displayItem, sp2_1_reportItem, setSp2_1_reportItem, sp2_2_reportItem, setSp2_2_reportItem, sp2_3_reportItem, setSp2_3_reportItem} = useContext( UserContext)

    const toggleReportItem = (i, index) => {
      if(index===1){
        if(sp2_1_reportItem.includes(i)){
          setSp2_1_reportItem(prev=> prev.filter((item)=> item !== i))
          console.log(`remove${index}${i}`)
        }else{
          setSp2_1_reportItem(prev =>[...prev, i])
          console.log(`add${index}${i}`)
        }
      }else if(index===2){
        if(sp2_2_reportItem.includes(i)){
          setSp2_2_reportItem(prev=> prev.filter((item)=> item !== i))
          console.log(`remove${index}${i}`)
        }else{
          setSp2_2_reportItem(prev =>[...prev, i])
          console.log(`add${index}${i}`)
        }
      }else{
        if(sp2_3_reportItem.includes(i)){
          setSp2_3_reportItem(prev=> prev.filter((item)=> item !== i))
          console.log(`remove${index}${i}`)
        }else{
          setSp2_3_reportItem(prev =>[...prev, i])
          console.log(`add${index}${i}`)
        }
      }
    }

  return (
    <div>
        {isOnlineReport?'':
        <div className='mb-3'>
            <div className={sp2_1_serve_type==="指定"?'border-l-4 border-green-400 pl-4 rounded-lg bg-white p-2':'border-l-4 border-yellow-400 pl-4 rounded-lg bg-white p-2'}>
            <div className='flex justify-between pr-2'>    
                <p className='font-bold'>{sp2_1_name}</p>
            </div>
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
                        {token==='admin'?'':
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                            <p className="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                        </th>
                        }
                    </tr>
                    <tr className="hover:bg-slate-50">
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">門市應配貨量</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">{sp2_1_remaindelivering}</p>
                        </td>
                        <td className="p-4 border-b border-slate-200"></td>
                        <td className="p-4 border-b border-slate-200"></td>
                        {token==='admin'?'':                                   
                        <td className="p-4 border-b border-slate-200">
                            <input type='checkbox' value='remain_delivering' onChange={(e)=>toggleReportItem(e.target.value, 1)}></input>
                        </td>
                        }
                    </tr>
                    <tr className="hover:bg-slate-50">
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">門市異常件數</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">{sp2_1_onhold}</p>
                        </td>
                        <td className="p-4 border-b border-slate-200"></td>
                        <td className="p-4 border-b border-slate-200"></td>
                        {token==='admin'?'':                                   
                        <td className="p-4 border-b border-slate-200">
                            <input type='checkbox' value='onhold' onChange={(e)=>toggleReportItem(e.target.value, 1)}></input>
                        </td>
                        }
                    </tr>
                    <tr className="hover:bg-slate-50">
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">個人配送貨量</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">{sp2_1_delivered}</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            {sp2_1_serve_type!=='指定'?'':
                                parseInt(sp2_1_ttl_delivered)>=parseInt(sp2_1_remaindelivering)-parseInt(sp2_1_onhold)?
                                <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                <p class="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                            }
                        </td>
                        <td className="p-4 border-b border-slate-200"></td>
                        {token==='admin'?'':                                   
                        <td className="p-4 border-b border-slate-200">
                            <input type='checkbox' value='delivered_cnt' onChange={(e)=>toggleReportItem(e.target.value, 1)}></input>
                        </td>
                        }
                    </tr>
                    <tr className="hover:bg-slate-50">
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">Smart Inbound</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            {sp2_1_sop==='-'?<p>-</p>:
                                <p className="block text-sm text-slate-800">{parseFloat(sp2_1_sop*100).toFixed(2)+'%'}</p>
                            }
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            {sp2_1_sop==="-"?<p></p>:sp2_1_sop=1?
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                            }
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            {sp2_1_sop==="-"?<p></p>:sp2_1_sop=1?
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                            }
                        </td>
                        {token==='admin'?'':                                   
                        <td className="p-4 border-b border-slate-200">
                            <input type='checkbox' value='smart_inbound' onChange={(e)=>toggleReportItem(e.target.value, 1)}></input>
                        </td>
                        }
                    </tr>
                    <tr className="hover:bg-slate-50">
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">Appsheet滯留包裹</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            {sp2_1_appsheet==='-'?<p>-</p>:
                                <p className="block text-sm text-slate-800">{sp2_1_appsheet}</p>
                            }
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800"></p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            {sp2_1_appsheet==="-"?<p></p>:sp2_1_appsheet===0?
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                            }
                        </td>
                        {token==='admin'?'':                                   
                        <td className="p-4 border-b border-slate-200">
                            <input type='checkbox' value='Appsheet' onChange={(e)=>toggleReportItem(e.target.value, 1)}></input>
                        </td>
                        }
                    </tr>
                    <tr className="hover:bg-slate-50">
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">EPOD</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">{sp_epod}</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            {parseInt(sp_epod)===0?
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                            }
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            {parseInt(sp_epod)===0?
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                            }
                        </td>
                        {token==='admin'?'':                                   
                        <td className="p-4 border-b border-slate-200">
                            <input type='checkbox' value='EPOD' onChange={(e)=>toggleReportItem(e.target.value, 1)}></input>
                        </td>
                        }
                    </tr>
                    <tr className="hover:bg-slate-50">
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">遺失包裹</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">{sp2_1_lost_cnt}</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                        </td>
                        {token==='admin'?'':                                   
                        <td className="p-4 border-b border-slate-200">
                            <input type='checkbox' value='lost' onChange={(e)=>toggleReportItem(e.target.value, 1)}></input>
                        </td>
                        }
                    </tr>
                    <tr className="hover:bg-slate-50">
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">承攬時間</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">{sp_attendance}</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            {sp_attendance==="達標"?
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                            }
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            {sp_attendance==="達標"?
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                            }
                        </td>
                        {token==='admin'?'':                                   
                        <td className="p-4 border-b border-slate-200">
                            <input type='checkbox' value='first_delivering_time' onChange={(e)=>toggleReportItem(e.target.value, 1)}></input>
                        </td>
                        }
                    </tr>
                </table>
            </div>
        </div>
    </div>
    }
    {sp2_2_name==="-"?'':isOnlineReport?'':  
    <div className='mb-3'>
        <div className={sp2_2_serve_type==="指定"?'border-l-4 border-green-400 pl-4 rounded-lg bg-white p-2':'border-l-4 border-yellow-400 pl-4 rounded-lg bg-white p-2'}>
        <div className='flex justify-between pr-2'>    
            <p className='font-bold'>{sp2_2_name}</p>
        </div>
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
                    {token==='admin'?'':
                        <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                    </th>
                    }
                </tr>
                <tr className="hover:bg-slate-50">
                    <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">門市應配貨量</p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">{sp2_2_remaindelivering}</p>
                    </td>
                    <td className="p-4 border-b border-slate-200"></td>
                    <td className="p-4 border-b border-slate-200"></td>
                    {token==='admin'?'':                                   
                    <td className="p-4 border-b border-slate-200">
                        <input type='checkbox' value='remain_delivering' onChange={(e)=>toggleReportItem(e.target.value, 2)}></input>
                    </td>
                    }
                </tr>
                <tr className="hover:bg-slate-50">
                    <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">門市異常件數</p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">{sp2_2_onhold}</p>
                    </td>
                    <td className="p-4 border-b border-slate-200"></td>
                    <td className="p-4 border-b border-slate-200"></td>
                    {token==='admin'?'':                                   
                    <td className="p-4 border-b border-slate-200">
                        <input type='checkbox' value='onhold' onChange={(e)=>toggleReportItem(e.target.value, 2)}></input>
                    </td>
                    }
                </tr>
                <tr className="hover:bg-slate-50">
                    <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">個人配送貨量</p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">{sp2_2_delivered}</p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                        {sp2_2_serve_type!=='指定'?'':
                            parseInt(sp2_2_ttl_delivered)>=parseInt(sp2_2_remaindelivering)-parseInt(sp2_2_onhold)?
                            <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                            <p class="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                        }
                    </td>
                    <td className="p-4 border-b border-slate-200"></td>
                    {token==='admin'?'':                                   
                    <td className="p-4 border-b border-slate-200">
                        <input type='checkbox' value='delivered_cnt' onChange={(e)=>toggleReportItem(e.target.value, 2)}></input>
                    </td>
                    }
                </tr>
                <tr className="hover:bg-slate-50">
                    <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">Smart Inbound</p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                        {sp2_2_sop==='-'?<p>-</p>:
                            <p className="block text-sm text-slate-800">{parseFloat(sp2_2_sop*100).toFixed(2)+'%'}</p>
                        }
                    </td>
                    <td className="p-4 border-b border-slate-200">
                        {sp2_2_sop==="-"?<p></p>:sp2_2_sop=1?
                            <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                            <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                        }
                    </td>
                    <td className="p-4 border-b border-slate-200">
                        {sp2_2_sop==="-"?<p></p>:sp2_2_sop=1?
                            <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                            <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                        }
                    </td>
                    {token==='admin'?'':                                   
                    <td className="p-4 border-b border-slate-200">
                        <input type='checkbox' value='smart_inbound' onChange={(e)=>toggleReportItem(e.target.value, 2)}></input>
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
                        {sp2_2_appsheet==="-"?<p></p>:sp2_2_appsheet===0?
                            <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                            <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                        }
                    </td>
                    {token==='admin'?'':                                   
                    <td className="p-4 border-b border-slate-200">
                        <input type='checkbox' value='Appsheet' onChange={(e)=>toggleReportItem(e.target.value, 2)}></input>
                    </td>
                    }
                </tr>
                <tr className="hover:bg-slate-50">
                    <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">EPOD</p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">{sp_epod}</p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                        {parseInt(sp_epod)===0?
                            <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                            <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                        }
                    </td>
                    <td className="p-4 border-b border-slate-200">
                        {parseInt(sp_epod)===0?
                            <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                            <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                        }
                    </td>
                    {token==='admin'?'':                                   
                    <td className="p-4 border-b border-slate-200">
                        <input type='checkbox' value='EPOD' onChange={(e)=>toggleReportItem(e.target.value, 2)}></input>
                    </td>
                    }
                </tr>
                <tr className="hover:bg-slate-50">
                    <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">遺失包裹</p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">{sp2_2_lost_cnt}</p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                        <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                        <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                    </td>
                    {token==='admin'?'':                                   
                    <td className="p-4 border-b border-slate-200">
                        <input type='checkbox' value='lost' onChange={(e)=>toggleReportItem(e.target.value, 2)}></input>
                    </td>
                    }
                </tr>
                <tr className="hover:bg-slate-50">
                    <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">承攬時間</p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">{sp_attendance}</p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                        {sp_attendance==="達標"?
                            <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                            <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                        }
                    </td>
                    <td className="p-4 border-b border-slate-200">
                        {sp_attendance==="達標"?
                            <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                            <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                        }
                    </td>
                    {token==='admin'?'':                                   
                    <td className="p-4 border-b border-slate-200">
                        <input type='checkbox' value='first_delivering_time' onChange={(e)=>toggleReportItem(e.target.value, 2)}></input>
                    </td>
                    }
                </tr>
            </table>
        </div>
        </div>
    </div>
    }
    {sp2_3_name==="-"?'':isOnlineReport?'': 
        <div className={sp2_3_serve_type==="指定"?'border-l-4 border-green-400 pl-4 rounded-lg bg-white p-2':'border-l-4 border-yellow-400 pl-4 rounded-lg bg-white p-2'}>
            <div className='flex justify-between pr-2'>    
                <p className='font-bold'>{sp2_3_name}</p>
            </div>
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
                        {token==='admin'?'':
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                            <p className="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                        </th>
                        }
                    </tr>
                    <tr className="hover:bg-slate-50">
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">門市應配貨量</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">{sp2_3_remaindelivering}</p>
                        </td>
                        <td className="p-4 border-b border-slate-200"></td>
                        <td className="p-4 border-b border-slate-200"></td>
                        {token==='admin'?'':                                   
                        <td className="p-4 border-b border-slate-200">
                            <input type='checkbox' value='remain_delivering' onChange={(e)=>toggleReportItem(e.target.value, 3)}></input>
                        </td>
                        }
                    </tr>
                    <tr className="hover:bg-slate-50">
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">門市異常件數</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">{sp2_3_onhold}</p>
                        </td>
                        <td className="p-4 border-b border-slate-200"></td>
                        <td className="p-4 border-b border-slate-200"></td>
                        {token==='admin'?'':                                   
                        <td className="p-4 border-b border-slate-200">
                            <input type='checkbox' value='onhold' onChange={(e)=>toggleReportItem(e.target.value, 3)}></input>
                        </td>
                        }
                    </tr>
                    <tr className="hover:bg-slate-50">
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">個人配送貨量</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">{sp2_3_delivered}</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            {sp2_3_serve_type!=='指定'?'':
                                parseInt(sp2_3_ttl_delivered)>=parseInt(sp2_3_remaindelivering)-parseInt(sp2_3_onhold)?
                                <p class="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                <p class="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                            }
                        </td>
                        <td className="p-4 border-b border-slate-200"></td>
                        {token==='admin'?'':                                   
                        <td className="p-4 border-b border-slate-200">
                            <input type='checkbox' value='delivered_cnt' onChange={(e)=>toggleReportItem(e.target.value, 3)}></input>
                        </td>
                        }
                    </tr>
                    <tr className="hover:bg-slate-50">
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">Smart Inbound</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            {sp2_3_sop==='-'?<p>-</p>:
                                <p className="block text-sm text-slate-800">{parseFloat(sp2_3_sop*100).toFixed(2)+'%'}</p>
                            }
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            {sp2_3_sop==="-"?<p></p>:sp2_3_sop=1?
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                            }
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            {sp2_3_sop==="-"?<p></p>:sp2_3_sop=1?
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                            }
                        </td>
                        {token==='admin'?'':                                   
                        <td className="p-4 border-b border-slate-200">
                            <input type='checkbox' value='smart_inbound' onChange={(e)=>toggleReportItem(e.target.value, 3)}></input>
                        </td>
                        }
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
                            {sp2_3_appsheet==="-"?<p></p>:sp2_3_appsheet===0?
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                            }
                        </td>
                        {token==='admin'?'':                                   
                        <td className="p-4 border-b border-slate-200">
                            <input type='checkbox' value='Appsheet' onChange={(e)=>toggleReportItem(e.target.value, 3)}></input>
                        </td>
                        }
                    </tr>
                    <tr className="hover:bg-slate-50">
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">EPOD</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">{sp_epod}</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            {parseInt(sp_epod)===0?
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                            }
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            {parseInt(sp_epod)===0?
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                            }
                        </td>
                        {token==='admin'?'':                                   
                        <td className="p-4 border-b border-slate-200">
                            <input type='checkbox' value='EPOD' onChange={(e)=>toggleReportItem(e.target.value, 3)}></input>
                        </td>
                        }
                    </tr>
                    <tr className="hover:bg-slate-50">
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">遺失包裹</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">{sp2_3_lost_cnt}</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                        </td>
                        {token==='admin'?'':                                   
                        <td className="p-4 border-b border-slate-200">
                            <input type='checkbox' value='lost' onChange={(e)=>toggleReportItem(e.target.value, 3)}></input>
                        </td>
                        }
                    </tr>
                    <tr className="hover:bg-slate-50">
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">承攬時間</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-slate-800">{sp_attendance}</p>
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            {sp_attendance==="達標"?
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>:
                                <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />保底獎勵</p>
                            }
                        </td>
                        <td className="p-4 border-b border-slate-200">
                            {sp_attendance==="達標"?
                                <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>:
                                <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />服務獎勵</p>
                            }
                        </td>
                        {token==='admin'?'':                                   
                        <td className="p-4 border-b border-slate-200">
                            <input type='checkbox' value='first_delivering_time' onChange={(e)=>toggleReportItem(e.target.value, 3)}></input>
                        </td>
                        }
                    </tr>
                </table>
            </div>
        </div>
    }
  </div>
  )
}

export default Spreport