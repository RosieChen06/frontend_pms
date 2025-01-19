import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AdminContext } from '../../context/AdminContext'
import { UserContext } from '../../context/UserContext'

const Update = () => {

    const {getDB, rider, state, isEdit, setIsEdit, riderData, setRiderData} = useContext(AdminContext)
    const {reportSp2Item, setReportSp2Item} = useContext(UserContext)
    const ReportedData = rider.filter((item)=>(item.status==='report'))

    // const [reportSp2Item, setReportSp2Item] = useState(false)
    // const reportDetail = []

    // const openEditForm = (id) => {

    //     const selectedData = ReportedData.filter((item)=>(
    //         item._id===id
    //     ))

    //     reportDetail.push(JSON.parse(selectedData[0].reportItem))
    //     setReportSp2Item(reportDetail[0])

    //     setRiderData({
    //         riderId: id,
    //         name: selectedData[0].name,
    //         date: selectedData[0].date,
    //         sp2_1: selectedData[0].sp2_1,
    //         sp2_1_appsheet: selectedData[0].sp2_1_appsheet,
    //         sp2_1_epod: selectedData[0].sp2_1_epod,
    //         sp2_1_sop: selectedData[0].sp2_1_sop,
    //         sp2_2: selectedData[0].sp2_2,
    //         sp2_2_appsheet: selectedData[0].sp2_2_appsheet,
    //         sp2_2_epod: selectedData[0].sp2_2_epod,
    //         sp2_2_sop: selectedData[0].sp2_2_sop,
    //         sp2_3: selectedData[0].sp2_3,
    //         sp2_3_appsheet: selectedData[0].sp2_3_appsheet,
    //         sp2_3_epod: selectedData[0].sp2_3_epod,
    //         sp2_3_sop: selectedData[0].sp2_3_sop,
    //         sp2_attendance: selectedData[0].sp2_attendance,
    //         admincomment:'',
    //         image:selectedData[0].image
    //     })
    //     setIsEdit(true)
    //     console.log(reportSp2Item['1'].includes('EPOD'))
    // }

    const updateData = async (id) => {
        try{
            const formData = new FormData()
            formData.append('riderId', id)
            formData.append('sp2_1_appsheet', riderData.sp2_1_appsheet)
            formData.append('sp2_1_epod', riderData.sp2_1_epod)
            formData.append('sp2_1_sop', riderData.sp2_1_sop)
            formData.append('sp2_2_appsheet', riderData.sp2_2_appsheet)
            formData.append('sp2_2_epod', riderData.sp2_2_epod)
            formData.append('sp2_2_sop', riderData.sp2_2_sop)
            formData.append('sp2_3_appsheet', riderData.sp2_3_appsheet)
            formData.append('sp2_3_epod', riderData.sp2_3_epod)
            formData.append('sp2_3_sop', riderData.sp2_3_sop)
            formData.append('sp2_attendance', riderData.sp2_attendance)
            formData.append('admincomment', riderData.admincomment)
            formData.append('status', "resolve")

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
            riderData && isEdit?
            
                <div className='flex flex-col items-center gap-5 absolute px-4 py-8 md:px-12 w-9/12 bg-white h-[85vh] rounded-md overflow-scroll'>
                    <div className='w-full'>
                        <div className='flex flex-row justify-end items-center w-full'>
                            <button onClick={()=>setIsEdit(false)} className='mr-5 px-6 py-2 bg-yellow-200 rounded-sm'>Cancel</button>
                            <button onClick={()=>updateData(riderData.riderId)} className='mr-5 px-6 py-2 bg-green-200 rounded-sm'>Update</button>
                        </div>
                        <div className='w-full mt-4'>
                            <h1 className='border-l-4 pl-4 text-lg font-bold border-green-600 '>{riderData.sp2_1}</h1>
                            <div className='flex flex-wrap gap-x-24 gap-y-12 w-full mt-12'>
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
                                    <select className='w-full border-gray-300 py-1 pl-1 rounded-md border-2' type='text' value={riderData.sp2_1_epod} onChange={e=>setRiderData(prev =>({...prev, sp2_1_sop: e.target.value}))}>
                                        <option value='達標'>達標</option>
                                        <option value='未達標'>未達標</option>
                                    </select>
                                </div>
                                <div className='w-full max-w-96'>
                                    <div className='flex flex-row items-center mb-4 gap-3'>
                                        {reportSp2Item['1'].includes('work&clean')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                        <p className='text-sm text-gray-700'>當周承攬達標比例</p>
                                    </div>
                                    <select className='w-full border-gray-300 py-1 pl-1 rounded-md border-2' type='text' value={riderData.sp2_1_epod} onChange={e=>setRiderData(prev =>({...prev, sp2_1_sop: e.target.value}))}>
                                        <option value='>=70%'>&gt;=70%</option>
                                        <option value='<70%'>&lt;70%</option>
                                    </select>
                                </div>
                                <div className='w-full max-w-96'>
                                    <div className='flex flex-row items-center mb-4 gap-3'>
                                        {reportSp2Item['1'].includes('first_delivering_time')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                        <p className='text-sm text-gray-700'>承攬時間</p>
                                    </div>
                                    <select className='w-full border-gray-300 py-1 pl-1 rounded-md border-2' type='text' value={riderData.sp2_1_epod} onChange={e=>setRiderData(prev =>({...prev, sp2_1_sop: e.target.value}))}>
                                        <option value='達標'>達標</option>
                                        <option value='未達標'>未達標</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    {riderData.sp2_2==='-'?'':
                        <div className='w-full'>
                            <hr className='w-full mt-8'/>
                            <div className='w-full mt-8'>
                                <h1 className='border-l-4 pl-4 text-lg font-bold border-green-600 '>{riderData.sp2_2}</h1>
                                <div className='flex flex-wrap gap-x-24 gap-y-12 w-full overflow-scroll mt-12'>
                                    <div className='w-full max-w-96'> 
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['2'].includes('smart_inbound')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>SMART INBOUND執行率</p>
                                        </div>
                                        <select className='w-full border-gray-300 py-1 pl-1 rounded-md border-2' type='text' value={riderData.sp2_1_sop} onChange={e=>setRiderData(prev =>({...prev, sp2_1_sop: e.target.value}))}>
                                            <option value='達標'>達標</option>
                                            <option value='未達標'>未達標</option>
                                        </select>
                                    </div>
                                    <div className='w-full max-w-96'>
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['2'].includes('Appsheet')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>APPSHEET清空滯留包裹</p>
                                        </div>
                                        <select className='w-full border-gray-300 py-1 pl-1 rounded-md border-2' type='text' value={riderData.sp2_1_appsheet} onChange={e=>setRiderData(prev =>({...prev, sp2_1_appsheet: e.target.value}))}>
                                            <option value='清空'>清空</option>
                                            <option value='未清空'>未清空</option>
                                        </select>
                                    </div>
                                    <div className='w-full max-w-96'>
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['2'].includes('EPOD')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>EPOD執行率</p>
                                        </div>
                                        <select className='w-full border-gray-300 py-1 pl-1 rounded-md border-2' type='text' value={riderData.sp2_1_epod} onChange={e=>setRiderData(prev =>({...prev, sp2_1_sop: e.target.value}))}>
                                            <option value='達標'>達標</option>
                                            <option value='未達標'>未達標</option>
                                        </select>
                                    </div>
                                    <div className='w-full max-w-96'>
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['2'].includes('work&clean')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>當周承攬達標比例</p>
                                        </div>
                                        <select className='w-full border-gray-300 py-1 pl-1 rounded-md border-2' type='text' value={riderData.sp2_1_epod} onChange={e=>setRiderData(prev =>({...prev, sp2_1_sop: e.target.value}))}>
                                            <option value='>=70%'>&gt;=70%</option>
                                            <option value='<70%'>&lt;70%</option>
                                        </select>
                                    </div>
                                    <div className='w-full max-w-96'>
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['2'].includes('first_delivering_time')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>承攬時間</p>
                                        </div>
                                        <select className='w-full border-gray-300 py-1 pl-1 rounded-md border-2' type='text' value={riderData.sp2_1_epod} onChange={e=>setRiderData(prev =>({...prev, sp2_1_sop: e.target.value}))}>
                                            <option value='達標'>達標</option>
                                            <option value='未達標'>未達標</option>
                                        </select>
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
                                <h1 className='border-l-4 pl-4 text-lg font-bold border-green-600 '>{riderData.sp2_1}</h1>
                                <div className='flex flex-wrap gap-x-24 gap-y-12 w-full overflow-scroll mt-12'>
                                    <div className='w-full max-w-96'> 
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['3'].includes('smart_inbound')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>SMART INBOUND執行率</p>
                                        </div>
                                        <select className='w-full border-gray-300 py-1 pl-1 rounded-md border-2' type='text' value={riderData.sp2_1_sop} onChange={e=>setRiderData(prev =>({...prev, sp2_1_sop: e.target.value}))}>
                                            <option value='達標'>達標</option>
                                            <option value='未達標'>未達標</option>
                                        </select>
                                    </div>
                                    <div className='w-full max-w-96'>
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['3'].includes('Appsheet')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>APPSHEET清空滯留包裹</p>
                                        </div>
                                        <select className='w-full border-gray-300 py-1 pl-1 rounded-md border-2' type='text' value={riderData.sp2_1_appsheet} onChange={e=>setRiderData(prev =>({...prev, sp2_1_appsheet: e.target.value}))}>
                                            <option value='清空'>清空</option>
                                            <option value='未清空'>未清空</option>
                                        </select>
                                    </div>
                                    <div className='w-full max-w-96'>
                                        <p className='text-sm mb-4 text-gray-700'>EPOD執行率</p>
                                        <select className='w-full border-gray-300 py-1 pl-1 rounded-md border-2' type='text' value={riderData.sp2_1_epod} onChange={e=>setRiderData(prev =>({...prev, sp2_1_sop: e.target.value}))}>
                                            <option value='達標'>達標</option>
                                            <option value='未達標'>未達標</option>
                                        </select>
                                    </div>
                                    <div className='w-full max-w-96'>
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['3'].includes('work&clean')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>當周承攬達標比例</p>
                                        </div>
                                        <select className='w-full border-gray-300 py-1 pl-1 rounded-md border-2' type='text' value={riderData.sp2_1_epod} onChange={e=>setRiderData(prev =>({...prev, sp2_1_sop: e.target.value}))}>
                                            <option value='>=70%'>&gt;=70%</option>
                                            <option value='<70%'>&lt;70%</option>
                                        </select>
                                    </div>
                                    <div className='w-full max-w-96'>
                                        <div className='flex flex-row items-center mb-4 gap-3'>
                                            {reportSp2Item['3'].includes('first_delivering_time')?<p className='w-2 h-2 rounded-full bg-red-500'></p>:''}
                                            <p className='text-sm text-gray-700'>承攬時間</p>
                                        </div>
                                        <select className='w-full border-gray-300 py-1 pl-1 rounded-md border-2' type='text' value={riderData.sp2_1_epod} onChange={e=>setRiderData(prev =>({...prev, sp2_1_sop: e.target.value}))}>
                                            <option value='達標'>達標</option>
                                            <option value='未達標'>未達標</option>
                                        </select>
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
