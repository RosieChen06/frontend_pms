import React, { useState } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { UserContext } from '../../context/UserContext'
import { FaCheck } from "react-icons/fa";

const Spreport = ({sp_serve_type, sp_name, sp_remaindelivering, sp_sop, sp_appsheet, sp_epod, num}) => {

    const {token} = useContext(AdminContext)
    const {displayItem, sp2_1_reportItem, setSp2_1_reportItem, sp2_2_reportItem, setSp2_2_reportItem, sp2_3_reportItem, setSp2_3_reportItem} = useContext( UserContext)

    const toggleReportItem = (i, index) => {
      if(index==='1'){
        if(sp2_1_reportItem.includes(i)){
          setSp2_1_reportItem(prev=> prev.filter((item)=> item !== i))
        }else{
          setSp2_1_reportItem(prev =>[...prev, i])
        }
      }else if(index==='2'){
        if(sp2_2_reportItem.includes(i)){
          setSp2_2_reportItem(prev=> prev.filter((item)=> item !== i))
        }else{
          setSp2_2_reportItem(prev =>[...prev, i])
        }
      }else{
        if(sp2_3_reportItem.includes(i)){
          setSp2_3_reportItem(prev=> prev.filter((item)=> item !== i))
        }else{
          setSp2_3_reportItem(prev =>[...prev, i])
        }
      }
    }

  return (
    <div className={sp_serve_type==="指定"?'border-l-4 border-green-400 pl-4 rounded-lg bg-white p-2':'border-l-4 border-yellow-400 pl-4 rounded-lg bg-white p-2'}>
      <div className='flex justify-between pr-2'>    
          <p className='font-bold'>{sp_name}</p>
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
                      <p className="block text-sm text-slate-800">{sp_remaindelivering}</p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                      <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                      <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                  </td>
                  {token==='admin'?'':                                   
                  <td className="p-4 border-b border-slate-200">
                      <input type='checkbox' value='remain_delivering' onChange={(e)=>toggleReportItem(e.target.value, num)}></input>
                  </td>
                  }
              </tr>
              <tr className="hover:bg-slate-50">
                  <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">門市異常件數</p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">{sp_remaindelivering}</p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                      <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                      <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                  </td>
                  {token==='admin'?'':                                   
                  <td className="p-4 border-b border-slate-200">
                      <input type='checkbox' value='onhold' onChange={(e)=>toggleReportItem(e.target.value, num)}></input>
                  </td>
                  }
              </tr>
              <tr className="hover:bg-slate-50">
                  <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">個人配送貨量</p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">{sp_remaindelivering}</p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                      <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                      <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                  </td>
                  {token==='admin'?'':                                   
                  <td className="p-4 border-b border-slate-200">
                      <input type='checkbox' value='delivered_cnt' onChange={(e)=>toggleReportItem(e.target.value, num)}></input>
                  </td>
                  }
              </tr>
              <tr className="hover:bg-slate-50">
                  <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">Smart Inbound</p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">{sp_sop}</p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                      <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                      <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                  </td>
                  {token==='admin'?'':                                   
                  <td className="p-4 border-b border-slate-200">
                      <input type='checkbox' value='smart_inbound' onChange={(e)=>toggleReportItem(e.target.value, num)}></input>
                  </td>
                  }
              </tr>
              <tr className="hover:bg-slate-50">
                  <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">Appsheet滯留包裹</p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">{sp_appsheet}</p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800"></p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                      <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                  </td>
                  {token==='admin'?'':                                   
                  <td className="p-4 border-b border-slate-200">
                      <input type='checkbox' value='Appsheet' onChange={(e)=>toggleReportItem(e.target.value, num)}></input>
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
                      <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                      <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                  </td>
                  {token==='admin'?'':                                   
                  <td className="p-4 border-b border-slate-200">
                      <input type='checkbox' value='EPOD' onChange={(e)=>toggleReportItem(e.target.value, num)}></input>
                  </td>
                  }
              </tr>
              <tr className="hover:bg-slate-50">
                  <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">承攬時間</p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">{displayItem.smart_inbound}</p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                      <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />保底獎勵</p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                      <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />服務獎勵</p>
                  </td>
                  {token==='admin'?'':                                   
                  <td className="p-4 border-b border-slate-200">
                      <input type='checkbox' value='first_delivering_time' onChange={(e)=>toggleReportItem(e.target.value, num)}></input>
                  </td>
                  }
              </tr>
          </table>
      </div>
  </div>
  )
}

export default Spreport