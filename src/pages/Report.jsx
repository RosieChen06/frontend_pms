import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import { VscReport } from "react-icons/vsc";
import { LuClipboardPenLine } from "react-icons/lu";
import { BsPaperclip } from "react-icons/bs";
import { FiUpload } from "react-icons/fi";
import Reportsp from '../components/Reportsp';
import { UserContext } from '../../context/UserContext';
import Update from './Update';

const Report = () => {
      const {getDB, rider, state, onlineData, token, isEdit, setIsEdit, riderData, setRiderData, isResolve, setIsResolve} = useContext(AdminContext)
      const {reportSp2Item, setReportSp2Item} = useContext(UserContext)
      const [image1, setImage1] = useState(false)
      const [image2, setImage2] = useState(false)
      const [image3, setImage3] = useState(false)
      const [uploadUrl1, setUploadUrl1] = useState(false)
      const [uploadUrl2, setUploadUrl2] = useState(false)
      const [uploadUrl3, setUploadUrl3] = useState(false)
      const [replyItem, setReplyItem] = useState([])
      const [isReply, setIsReply] = useState(false)

      const filterdData = rider.filter((item)=>(
        item.status === isResolve
      ))

      const filterdWeekData = onlineData.filter((item)=>(
        item.status === isResolve
      ))

      const obj = []

      for(let i=0; i<filterdData.length; i++){
          let test = JSON.parse(JSON.parse(JSON.stringify(filterdData[Number(i)].reportItem)));
          obj.push(test)
      }

      const changeReportStatus = async (_id, status, reply) => {
        try{
            const formData = new FormData()
            formData.append('riderId', _id)
            formData.append('status', status)
  
            const {data} = await axios.post('http://localhost:4000/api/user/confirm-data',formData)
  
            if(data.success){
                toast.success(reply)
                getDB()
            }else{
                toast.error(data.message)
            }
  
        }catch(error){
            console.log(error)
        }
    }

    const showReportForm = (index) =>{
      setReplyItem(filterdData[index])
      setIsReply(true)
  }

  const isReport = async (_id) => {

    let seletedData = filterdData.filter((item)=>(item._id===_id))

    if(!image1){
      setUploadUrl1(seletedData[0].image[0])
    }
    if(!image2){
      setUploadUrl2(seletedData[0].image[1])
    }
    if(!image3){
      setUploadUrl3(seletedData[0].image[2])
    }

    try{
        const formData = new FormData()
        formData.append('riderId', _id)
        formData.append('status', 'report')
        formData.append('comment', replyItem.comment)
        formData.append('imageUrl1', uploadUrl1)
        formData.append('imageUrl2', uploadUrl2)
        formData.append('imageUrl3', uploadUrl3)
        formData.append('image1', image1)
        formData.append('image2', image2)
        formData.append('image3', image3)

        const {data} = await axios.post('http://localhost:4000/api/user/reply',formData)

        if(data.success){
            setIsReply(false);
            toast.success(data.message)
            getDB()
        }else{
            toast.error(data.message)
        }

    }catch(error){
        console.log(error)
    }

    setImage1(false)
    setImage2(false)
    setImage3(false)
    setUploadImage1(false)
    setUploadImage2(false)
    setUploadImage3(false)
}

console.log(filterdWeekData)

const ReportedData = rider.filter((item)=>(item.status==='report'))
const reportDetail = []

const openEditForm = (id) => {

  const selectedData = ReportedData.filter((item)=>(
      item._id===id
  ))

  reportDetail.push(JSON.parse(selectedData[0].reportItem))
  setReportSp2Item(reportDetail[0])

  setRiderData({
      riderId: id,
      name: selectedData[0].name,
      date: selectedData[0].date,
      sp2_1: selectedData[0].sp2_1,
      sp2_1_appsheet: selectedData[0].sp2_1_appsheet,
      sp2_1_epod: selectedData[0].sp2_1_epod,
      sp2_1_sop: selectedData[0].sp2_1_sop,
      sp2_2: selectedData[0].sp2_2,
      sp2_2_appsheet: selectedData[0].sp2_2_appsheet,
      sp2_2_epod: selectedData[0].sp2_2_epod,
      sp2_2_sop: selectedData[0].sp2_2_sop,
      sp2_3: selectedData[0].sp2_3,
      sp2_3_appsheet: selectedData[0].sp2_3_appsheet,
      sp2_3_epod: selectedData[0].sp2_3_epod,
      sp2_3_sop: selectedData[0].sp2_3_sop,
      sp2_attendance: selectedData[0].sp2_attendance,
      admincomment:'',
      image:selectedData[0].image
  })
  setIsEdit(true)
}

  return (
    <div className='w-2/3 md:w-5/6 h-[88vh]'>
      {isEdit?<Update />:''}
      {token==='admin'?<div className='mt-4'></div>:
      <div className='flex flex-row justify-end px-4 mt-4 w-full mb-4'>
        <p className={isResolve==='report'?'rounded-l-full py-1 px-3 border-2 w-1/2 border-[#004e76] text-white bg-[#004e76] cursor-pointer':'rounded-l-full w-1/2 py-1 px-3 bg-white border-y-2 border-l-2 border-[#004e76] text-[#004e76] cursor-pointer'} onClick={()=>setIsResolve('report')}>待處理</p>
        <p className={isResolve!=='resolve'?'rounded-r-full py-1 px-3 w-1/2 bg-white border-y-2 border-r-2 border-[#004e76] text-[#004e76] cursor-pointer':'rounded-r-full py-1 px-3 w-1/2 border-2 border-[#004e76] text-white bg-[#004e76] cursor-pointer'} onClick={()=>setIsResolve('resolve')}>已回復</p>
      </div>}
      <div className='w-full flex-wrap-reverse h-[76vh] px-4 overflow-scroll'>
        {isReply?
          <div className='absolute bg-white w-[82%] h-[76vh] rounded-lg p-2'>
            <div className='border-l-2 border-gray-300 pl-4'>
              <div className='flex justify-between'>
                  <p className='text-lg font-bold'>異常回復</p>
                  <div className='flex flex-row'>
                    <button className='mr-5 px-6 py-1 bg-yellow-200 rounded-sm' onClick={()=>setIsReply(false)}>取消回復</button>  
                    <button className='mr-5 px-6 py-1 bg-green-200 rounded-sm' onClick={()=>{isReport(replyItem._id)}}>提交回復</button>  
                  </div>
              </div>
              <p className='mt-4 text-sm text-gray-700'>Rider Name: {replyItem.name}</p>
              <div className='flex justify-between'>
                  <p className='text-sm text-gray-700'>Date: {replyItem.date.slice(0,10)}</p>
              </div>
            </div>
            <div className="px-4 mt-8 border border-gray-200 bg-white rounded-t-lg dark:bg-gray-800">
                <textarea id="comment" rows="4" onChange={e=>setReplyItem(prev => ({...prev, comment: e.target.value}))} value={replyItem.comment} className="outline-none w-full py-2 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required ></textarea>
            </div>
            <div className="flex border gap-4 border-gray-200 flex-row p-2 items-center bg-gray-100 rounded-b-lg">
                <label htmlFor='image1' className={!replyItem.image[0] && !image1?'bg-white cursor-pointer rounded-sm p-6 border-4 border-dashed':'bg-white cursor-pointer rounded-smborder-4 border-2 rounded-md'}>
                    {image1?<img className='w-24' src={URL.createObjectURL(image1)}></img>:replyItem.image[0]?<img className='w-24' src={replyItem.image[0]}></img>:<FiUpload className='font-bold text-2xl'/>}
                    <input type='file' onChange={(e)=>setImage1(e.target.files[0])} id='image1' hidden></input>
                </label>    
                <label htmlFor='image2' className={!replyItem.image[1] && !image2?'bg-white cursor-pointer rounded-sm p-6 border-4 border-dashed':'bg-white cursor-pointer rounded-smborder-4 border-2 rounded-md'}>
                    {image2?<img className='w-24' src={URL.createObjectURL(image2)}></img>:replyItem.image[1]?<img className='w-24' src={replyItem.image[1]}></img>:<FiUpload className='font-bold text-2xl'/>}
                    <input type='file' onChange={(e)=>setImage2(e.target.files[0])} id='image2' hidden></input>
                </label>   
                <label htmlFor='image3' className={!replyItem.image[2] && !image3?'bg-white cursor-pointer rounded-sm p-6 border-4 border-dashed':'bg-white cursor-pointer rounded-smborder-4 border-2 rounded-md'}>
                    {image3?<img className='w-24' src={URL.createObjectURL(image3)}></img>:replyItem.image[2]?<img className='w-24' src={replyItem.image[2]}></img>:<FiUpload className='font-bold text-2xl'/>}
                    <input type='file' onChange={(e)=>setImage3(e.target.files[0])} id='image3' hidden></input>
                </label>    

            </div>
            </div>:''
        }
        {
          filterdData.map((item, index)=>(
            <div key={index} className='w-full bg-white pt-2 p-2 rounded-lg mb-4'>
              <div className='flex flex-col justify-between'>
                <div>
                  <div className='flex flex-row justify-between'>
                    <div className='border-l-4 border-[#004e76] pl-4'>
                      <p>{item.date.slice(0,10)}</p>
                      <p>{item.name}</p>
                    </div>
                    {token==='admin'?
                    <button onClick={()=>openEditForm(item._id)} className='bg-[#004e76] rounded-md px-8 py-3 text-white font-bold round-lg cursor-pointer'>Edit</button>:isResolve==='report'?
                    <button className='p-2 px-4 bg-transparent border-2 border-[#c8cdcf] rounded-md text-[#004e76] hover:bg-red-600 hover:border-red-600 hover:text-white' onClick={()=>changeReportStatus(item._id, 'submit', '已取消回報')}>取消回報</button>:
                    <div className='flex flex-row gap-4'>
                      <button className='p-2 px-4 bg-red-200 rounded-md' onClick={()=>showReportForm(index)}>回復</button>
                      <button className='p-2 px-4 bg-green-200 rounded-md' onClick={()=>changeReportStatus(item._id, 'confirm', '資料已確認')}>已確認</button>
                    </div>
                    }
                  </div>
                  <hr className='w-full bg-gray-100 mt-2'/>
                  <div className='flex flex-row items-center gap-3'>
                    <p className='mt-6 border-l-4 border-blue-400 pl-4'>回報項目</p>
                    <VscReport className='text-lg mt-6'/>
                  </div>
                  <div className='w-full overflow-scroll'>
                    <table className="table-fixed w-full min-w-[1600px] text-left mt-3">
                      <tr>
                          <th className="p-4 border-b border-slate-300 bg-slate-50">
                              <p className="block text-sm font-normal leading-none text-slate-500">門市</p>
                          </th>
                          <th className="p-4 border-b border-slate-300 bg-slate-50">
                              <p className="block text-sm font-normal leading-none text-slate-500">應配貨量</p>
                          </th>
                          <th className="p-4 border-b border-slate-300 bg-slate-50">
                              <p className="block text-sm font-normal leading-none text-slate-500">異常件數</p>
                          </th>
                          <th className="p-4 border-b border-slate-300 bg-slate-50">
                              <p className="block text-sm font-normal leading-none text-slate-500">個人配送件數</p>
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
                              <p className="block text-sm font-normal leading-none text-slate-500">當周承攬達標比例</p>
                          </th>
                          <th className="p-4 border-b border-slate-300 bg-slate-50">
                              <p className="block text-sm font-normal leading-none text-slate-500">EPOD</p>
                          </th>
                      </tr>
                      {obj[index]['1'].length>0?
                      <Reportsp sp={item.sp2_1} obj={obj} index={index} 
                      num="1" appsheet={item.sp2_1_appsheet} smartinbound={item.sp2_1_sop} 
                      remain_delivering={item.sp2_1_remaindelivering} delivered={item.sp2_1_delivered}
                      />:''}
                      {obj[index]['2'].length>0?<Reportsp sp={item.sp2_2} obj={obj} index={index} num="2" 
                      appsheet={item.sp2_2_appsheet} smartinbound={item.sp2_2_sop} 
                      remain_delivering={item.sp2_1_remaindelivering} delivered={item.sp2_1_delivered}
                      />:''}
                      {obj[index]['3'].length>0?<Reportsp sp={item.sp2_3} obj={obj} index={index} num="3" 
                      appsheet={item.sp2_3_appsheet} smartinbound={item.sp2_3_sop} 
                      remain_delivering={item.sp2_1_remaindelivering} delivered={item.sp2_1_delivered}/>:''}
                    </table>
                  </div>
                  <div className='flex flex-row items-center gap-3'>
                    <p className='mt-6 border-l-4 border-gray-400 pl-4'>文字說明</p>
                    <LuClipboardPenLine className='text-lg mt-6'/>
                  </div>
                  {isResolve==='report'?
                    <p className='w-full mt-4 bg-slate-50 p-2 text-gray-600'>{item.comment}</p>:
                    <p className='w-full mt-4 bg-slate-50 p-2 text-gray-600'>{item.admincomment}</p>
                  }
                  <div className='flex flex-row mt-2 gap-2 items-center justify-start'> 
                    <BsPaperclip />
                    <p>{item.image.length}份附件</p>
                  </div>
                  <hr className='w-full bg-gray-100 mt-2'/>
                </div>
                <p className='flex mt-4 text-sm text-gray-500 justify-end'>回報日期: {new Date(item.reportdatetime).getFullYear()}/{new Date(item.reportdatetime).getMonth()+1}/{new Date(item.reportdatetime).getDay()} {new Date(item.reportdatetime).getHours()}:{new Date(item.reportdatetime).getMinutes()}:{new Date(item.reportdatetime).getSeconds()}</p>
              </div>
            </div>
          ))
        }
        {
          filterdWeekData.map((item, index)=>(
            <div key={index} className='w-full bg-white pt-2 p-2 rounded-lg mb-4'>
              <div className='flex flex-col justify-between'>
                <div>
                  <div className='flex flex-row justify-between'>
                    <div className='border-l-4 border-[#004e76] pl-4'>
                      <p>{item.weeknum}</p>
                      <p>{item.name}</p>
                    </div>
                    {token==='admin'?
                    <button onClick={()=>openEditForm(item._id)} className='bg-[#004e76] rounded-md px-8 py-3 text-white font-bold round-lg cursor-pointer'>Edit</button>:isResolve==='report'?
                    <button className='p-2 px-4 bg-transparent border-2 border-[#c8cdcf] rounded-md text-[#004e76] hover:bg-red-600 hover:border-red-600 hover:text-white' onClick={()=>changeReportStatus(item._id, 'submit', '已取消回報')}>取消回報</button>:
                    <div className='flex flex-row gap-4'>
                      <button className='p-2 px-4 bg-red-200 rounded-md' onClick={()=>showReportForm(index)}>回復</button>
                      <button className='p-2 px-4 bg-green-200 rounded-md' onClick={()=>changeReportStatus(item._id, 'confirm', '資料已確認')}>已確認</button>
                    </div>
                    }
                  </div>
                  <hr className='w-full bg-gray-100 mt-2'/>
                  <div className='flex flex-row items-center gap-3'>
                    <p className='mt-6 border-l-4 border-blue-400 pl-4'>回報項目</p>
                    <VscReport className='text-lg mt-6'/>
                  </div>
                  <div className='w-full overflow-scroll'>
                    <table className="table-fixed w-full min-w-[800px] text-left mt-3">
                      <tr>
                          <th className="p-4 border-b border-slate-300 bg-slate-50">
                              <p className="block text-sm font-normal leading-none text-slate-500">總配送顆數</p>
                          </th>
                          <th className="p-4 border-b border-slate-300 bg-slate-50">
                              <p className="block text-sm font-normal leading-none text-slate-500">累計配送天數</p>
                          </th>
                          <th className="p-4 border-b border-slate-300 bg-slate-50">
                              <p className="block text-sm font-normal leading-none text-slate-500">假日累計配送天數</p>
                          </th>
                          <th className="p-4 border-b border-slate-300 bg-slate-50">
                              <p className="block text-sm font-normal leading-none text-slate-500">推薦排序使用率</p>
                          </th>
                          <th className="p-4 border-b border-slate-300 bg-slate-50">
                              <p className="block text-sm font-normal leading-none text-slate-500">EPOD & Lost</p>
                          </th>
                          <th className="p-4 border-b border-slate-300 bg-slate-50">
                              <p className="block text-sm font-normal leading-none text-slate-500">當周承攬完成比例</p>
                          </th>
                      </tr>
                      <tr>
                        <td className="p-4 border-b border-slate-200">
                          {!item.reportItem.includes('ttl_delivered')?'':parseInt(item.ttl_delivered)<400?
                            <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:
                            <p className="block text-md px-3 bg-green-600 rounded-sm text-white w-fit h-fit">o</p>
                          }
                        </td>
                        <td className="p-4 border-b border-slate-200">
                          {!item.reportItem.includes('ttl_workday')?'':parseInt(item.ttl_worksday)<5?
                            <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:
                            <p className="block text-md px-3 bg-green-600 rounded-sm text-white w-fit h-fit">o</p>
                          }
                        </td>
                        <td className="p-4 border-b border-slate-200">
                          {!item.reportItem.includes('ttl_workday_weekend')?'':parseInt(item.ttl_workday_weekend)<1?
                            <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:
                            <p className="block text-md px-3 bg-green-600 rounded-sm text-white w-fit h-fit">o</p>
                          }
                        </td>
                        <td className="p-4 border-b border-slate-200">
                          {!item.reportItem.includes('seq')?'':parseInt(item.seq)<0.9?
                            <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:
                            <p className="block text-md px-3 bg-green-600 rounded-sm text-white w-fit h-fit">o</p>
                          }
                        </td>
                        <td className="p-4 border-b border-slate-200">
                          {!item.reportItem.includes('epod & lost')?'':parseInt(item.epod_lost)>2?
                            <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:
                            <p className="block text-md px-3 bg-green-600 rounded-sm text-white w-fit h-fit">o</p>
                          }
                        </td>
                        <td className="p-4 border-b border-slate-200">
                          {!item.reportItem.includes('uncleanCnt')?'':parseInt(item.uncleanCnt)>2?
                            <p className="block text-md px-3 bg-pink-800 rounded-sm text-white w-fit h-fit">x</p>:
                            <p className="block text-md px-3 bg-green-600 rounded-sm text-white w-fit h-fit">o</p>
                          }
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div className='flex flex-row items-center gap-3'>
                    <p className='mt-6 border-l-4 border-gray-400 pl-4'>文字說明</p>
                    <LuClipboardPenLine className='text-lg mt-6'/>
                  </div>
                  {isResolve==='report'?
                    <p className='w-full mt-4 bg-slate-50 p-2 text-gray-600'>{item.comment}</p>:
                    <p className='w-full mt-4 bg-slate-50 p-2 text-gray-600'>{item.admincomment}</p>
                  }
                  <div className='flex flex-row mt-2 gap-2 items-center justify-start'> 
                    <BsPaperclip />
                    <p>{item.image.length}份附件</p>
                  </div>
                  <hr className='w-full bg-gray-100 mt-2'/>
                </div>
                <p className='flex mt-4 text-sm text-gray-500 justify-end'>reportdatetime</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Report