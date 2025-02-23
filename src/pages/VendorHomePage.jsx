import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AdminContext } from '../../context/AdminContext'
import { FiUpload } from "react-icons/fi";
import List from '../components/List';
import Detail from '../components/Detail';
import { UserContext } from '../../context/UserContext';
import Spreport from '../components/Spreport';
import { FaFilter } from "react-icons/fa6";
import Filter from '../components/Filter';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'
import { Paginator } from 'primereact/paginator';
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

const VendorHomePage = () => {

    const {token, isShowMenu, onlineData, getWeekDB} = useContext(AdminContext)
    const {clientData, setClientData, isShowDetail, displayOnlineItem, displayItem, reportForm, setReportForm, isOnlineReport, setIsReportOnline, 
        sp2_1_reportItem, sp2_2_reportItem, sp2_3_reportItem, setSp2_1_reportItem, setSp2_2_reportItem, 
        setSp2_3_reportItem, setDateInput, isSubmitFilter, setSubmitFilter, setRiderInput} = useContext( UserContext)
    const [comment, setComment] = useState('')
    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [onlineReportItem, setOnlineReportItem] = useState([])
    const [filterSubmitData, setFilterSubmitData] = useState([])
    const [dateSubmitFilterConfirm, setDateSubmitFilterConfirm] = useState([])
    const [riderSubmitFilterConfirm, setRiderSubmitFilterConfirm] = useState([])
    const [dateFilterPreview, setDateFilterPreview] = useState([])
    const [riderFilterPreview, setRiderFilterPreview] = useState([])

    const data = useSelector((state) => state.data.data);
    const loading = useSelector((state) => state.data.loading);
    const error = useSelector((state) => state.data.error);

    const dataList = () => {
        if(clientData){
            let newData = clientData.filter((item)=>(
                item.status==='submit'
            ))
            setFilterSubmitData(newData)
        }
    }

    useEffect(()=>{
        dataList()
    }, [clientData])

    const reportItem = {
        '1':[],
        '2':[],
        '3':[],
      }
    
    const isReportOnline = async (_id) => {

        if(Object.keys(onlineReportItem).length === 0){
            toast.error('請選擇回報項目')
            return
        }

        try{
            const formData = new FormData()
            formData.append('riderId', _id)
            formData.append('status', 'report')
            formData.append('reportItem', onlineReportItem)
            formData.append('comment', comment)
            formData.append('image1', image1)
            formData.append('image2', image2)
            formData.append('image3', image3)
  
            const {data} = await axios.post('https://backend-pms.vercel.app/api/user/week-report',formData)
  
            if(data.success){
                setReportForm(false);
                toast.success(data.message)
                dispatch(fetchData());
            }else{
                toast.error(data.message)
            }
  
        }catch(error){
            console.log(error)
        }
        setOnlineReportItem([])
        reportItem['1'].length = 0;
        reportItem['2'].length = 0;
        reportItem['3'].length = 0;
        setComment('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        getWeekDB()
    }

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
        console.log(clientData)
    }

    const isReport = async (_id) => {

        for(let i=0; i<=sp2_1_reportItem.length-1; i++){
            reportItem['1'].push(sp2_1_reportItem[i])
        }
        for(let j=0; j<=sp2_2_reportItem.length-1; j++){
            reportItem['2'].push(sp2_2_reportItem[j])
        }
        for(let k=0; k<=sp2_3_reportItem.length-1; k++){
            reportItem['3'].push(sp2_3_reportItem[k])
        }

        if(reportItem['1'].length===0 && reportItem['2'].length===0 && reportItem['3'].length===0){
            toast.error('請選擇回報項目')
            return
        }

        let report = data.filter((item)=>item._id===_id)[0]
        if(Number(report.sp2_1_ttl_delivered)+Number(report.sp2_1_onhold)>=Number(report.sp2_1_remaindelivering) && reportItem['1'].includes('remain_delivering') ||
        Number(report.sp2_2_ttl_delivered)+Number(report.sp2_2_onhold)>=Number(report.sp2_2_remaindelivering) && reportItem['2'].includes('remain_delivering') ||
        Number(report.sp2_3_ttl_delivered)+Number(report.sp2_3_onhold)>=Number(report.sp2_3_remaindelivering) && reportItem['3'].includes('remain_delivering')
    ){
        toast.error('應配數量不存在異常，請重新確認回報項目')
        return
    }

        try{
            const formData = new FormData()
            formData.append('riderId', _id)
            formData.append('status', 'report')
            formData.append('reportItem', JSON.stringify(reportItem))
            formData.append('comment', comment)
            formData.append('image1', image1)
            formData.append('image2', image2)
            formData.append('image3', image3)
            formData.append('reportdatetime', new Date())

            console.log(image1)
            console.log(image2)
  
            const {data} = await axios.post('https://backend-pms.vercel.app/api/user/report',formData)
  
            if(data.success){
                setReportForm(false);
                toast.success(data.message)
                dispatch(fetchData());
            }else{
                toast.error(data.message)
            }
  
        }catch(error){
            console.log(error)
        }
        setOnlineReportItem([])
        reportItem['1'].length = 0;
        reportItem['2'].length = 0;
        reportItem['3'].length = 0;
        setComment('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setSp2_1_reportItem([])
        setSp2_2_reportItem([])
        setSp2_3_reportItem([])
        setReportForm(false)
        findDB()
    }

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(100);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
        console.log(event)
    }

  const toggleOnlineReportItem = (e) => {
    if(onlineReportItem.includes(e.target.value)){
        setOnlineReportItem(prev=> prev.filter((item)=> item !== e.target.value))
    }else{
        setOnlineReportItem(prev =>[...prev, e.target.value])
    }
  }

  return (
    <div className='w-full sm:w-[80%] h-[96%] overflow-hidden rounded-lg p-2 mt-4 ml-0 sm:ml-4'> 
        <div className='flex flex-row justify-center items-center'>
            {isShowDetail?'':isSubmitFilter?'':reportForm?'':
            <div className='p-2 min-w-[75px] flex justify-end mt-3 rounded-md flex-row items-center gap-2 bg-[#004e76] text-white'>
                <FaFilter />
                <button onClick={()=>{setSubmitFilter(true);setDateInput(''); setRiderInput('')}}>篩選</button>
            </div>}
            {isShowDetail?'':isSubmitFilter?'':isShowMenu?'':reportForm?'':
            <div className='flex-row w-full justify-end items-center h-8 flex'>
                <div className='hidden lg:block'>
                    <Paginator className='bg-slate-50' first={first} rows={rows} totalRecords={filterSubmitData.length} onPageChange={onPageChange} />
                </div>
                <div className="card block max-w-[220px] lg:hidden">
                    <Paginator className='bg-slate-50' first={first} rows={rows} totalRecords={filterSubmitData.length} onPageChange={onPageChange} template={{ layout: 'PrevPageLink CurrentPageReport NextPageLink' }} />
                </div>
            </div>
            }
        </div>
        {isSubmitFilter?<Filter filterData={data.filter((item)=>(
            item.status === 'submit'
          ))} setDateSubmitFilterConfirm={setDateSubmitFilterConfirm} setRiderSubmitFilterConfirm={setRiderSubmitFilterConfirm} status='submit'
          setDateFilterPreview={setDateFilterPreview} dateFilterPreview={dateFilterPreview} setRiderFilterPreview={setRiderFilterPreview} riderFilterPreview={riderFilterPreview}
          dateSubmitFilterConfirm={dateSubmitFilterConfirm} riderSubmitFilterConfirm={riderSubmitFilterConfirm} />:''}
        {
          reportForm?
          <div className='absolute bg-white w-full sm:w-[80%] h-[83%] rounded-lg p-2 mt-3'>
            <div className='border-l-2 border-gray-300 pl-4'>
              <div className='flex justify-between'>
                  <p className='text-lg font-bold'>異常回報</p>
                  <div className='flex flex-row'>
                    <button className='mr-5 px-6 py-1 bg-yellow-200 rounded-sm' onClick={()=>{setReportForm(false); reportItem['1'].length = 0;reportItem['2'].length = 0;reportItem['3'].length = 0; setComment(''); setImage1(false); setImage2(false); setImage3(false); setIsReportOnline(false); setOnlineReportItem([]);}}>取消回報</button>  
                    {isOnlineReport?
                        <button className='mr-5 px-6 py-1 bg-green-200 rounded-sm' onClick={()=>{isReportOnline(displayOnlineItem._id);}}>提交回報</button>  
                        :<button className='mr-5 px-6 py-1 bg-green-200 rounded-sm' onClick={()=>{isReport(displayItem._id);}}>提交回報</button>  
                    }
                  </div>
              </div>
              <p className='mt-4 text-sm text-gray-700'>Rider Name:</p>
              <div className='flex justify-between'>
                  <p className='text-sm text-gray-700'>Date: </p>
              </div>
            </div>
            <div className='bg-[#f8f9fd] h-[80%] mt-4 rounded-lg overflow-scroll px-5 py-4'>
            {isOnlineReport?
            <div>
                <div className='border-l-4 border-[#004e76] mb-4 pl-4 rounded-lg bg-white p-2'>
                <div className='flex justify-between pr-2'>    
                  <p className='font-bold'>當周表現</p>
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
                                <p className="block text-sm font-normal leading-none text-slate-500">上線獎勵</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500"></p>
                            </th>
                            {token==='admin'?'':
                                <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p className="block text-sm font-normal leading-none text-slate-500">我要回報</p>
                            </th>
                            }
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">當周總配送包裹</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{displayOnlineItem.ttl_delivered}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {parseInt(displayOnlineItem.ttl_delivered)>=400?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />上線獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />上線獎勵</p>
                                }
                            </td>
                            <td className="p-4 border-b border-slate-200"></td>
                            {token==='admin'?'':                                   
                            <td className="p-4 border-b border-slate-200">
                                <input type='checkbox' value='ttl_delivered' onChange={toggleOnlineReportItem}></input>
                            </td>
                            }
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">總配送天數</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{displayOnlineItem.ttl_worksday}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {parseInt(displayOnlineItem.ttl_worksday)>=5?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />上線獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />上線獎勵</p>
                                }
                            </td>
                            <td className="p-4 border-b border-slate-200"></td>
                            {token==='admin'?'':                                   
                            <td className="p-4 border-b border-slate-200">
                                <input type='checkbox' value='ttl_workday' onChange={toggleOnlineReportItem}></input>
                            </td>
                            }
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">假日總配送天數</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{displayOnlineItem.ttl_workday_weekend}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {parseInt(displayOnlineItem.ttl_workday_weekend)>=1?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />上線獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />上線獎勵</p>
                                }
                            </td>
                            <td className="p-4 border-b border-slate-200"></td>
                            {token==='admin'?'':                                   
                            <td className="p-4 border-b border-slate-200">
                                <input type='checkbox' value='ttl_workday_weekend' onChange={toggleOnlineReportItem}></input>
                            </td>
                            }
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">推薦排序使用率</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{parseFloat(displayOnlineItem.seq*100).toFixed(2)+'%'}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {parseInt(displayOnlineItem.seq)>=0.9?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />上線獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />上線獎勵</p>
                                }
                            </td>
                            <td className="p-4 border-b border-slate-200"></td>
                            {token==='admin'?'':                                   
                            <td className="p-4 border-b border-slate-200">
                                <input type='checkbox' value='seq' onChange={toggleOnlineReportItem}></input>
                            </td>
                            }
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">EPOD</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{displayOnlineItem.epod_lost}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {parseInt(displayOnlineItem.epod_lost)<=2?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />上線獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />上線獎勵</p>
                                }
                            </td>
                            <td className="p-4 border-b border-slate-200"></td>
                            {token==='admin'?'':                                   
                            <td className="p-4 border-b border-slate-200">
                                <input type='checkbox' value='epod & lost' onChange={toggleOnlineReportItem}></input>
                            </td>
                            }
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">當周承攬完成比例</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">{displayOnlineItem.uncleanCnt}</p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                {parseInt(displayOnlineItem.epod_lost)<=2?
                                    <p className="text-sm bg-green-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><FaCheck />上線獎勵</p>:
                                    <p className="text-sm bg-red-100 px-2 py-0.5 rounded-2xl text-black flex flex-row items-center gap-2 w-fit"><ImCross />上線獎勵</p>
                                }
                            </td>
                            <td className="p-4 border-b border-slate-200"></td>
                            {token==='admin'?'':                                   
                            <td className="p-4 border-b border-slate-200">
                                <input type='checkbox' value='uncleanCnt' onChange={toggleOnlineReportItem}></input>
                            </td>
                            }
                        </tr>
                    </table>
                </div>
                </div>
            </div>:''
          }
        <Spreport sp2_1_serve_type={displayItem.sp2_1_serve_type} sp2_1_name={displayItem.sp2_1} sp2_1_remaindelivering={displayItem.sp2_1_remaindelivering} sp2_1_onhold={displayItem.sp2_1_onhold} 
        sp2_1_sop={displayItem.sp2_1_sop} sp2_1_appsheet={displayItem.sp2_1_appsheet} sp2_1_ttl_delivered={displayItem.sp2_1_ttl_delivered}
        sp2_1_delivered={displayItem.sp2_1_delivered} sp2_1_lost_cnt={displayItem.lost_cnt?displayItem.lost_cnt.length:0}
        sp2_2_serve_type={displayItem.sp2_2_serve_type} sp2_2_name={displayItem.sp2_2} sp2_2_remaindelivering={displayItem.sp2_2_remaindelivering} sp2_2_onhold={displayItem.sp2_2_onhold} 
        sp2_2_sop={displayItem.sp2_2_sop} sp2_2_appsheet={displayItem.sp2_2_appsheet} sp2_2_ttl_delivered={displayItem.sp2_2_ttl_delivered}
        sp2_2_delivered={displayItem.sp2_2_delivered} sp2_2_lost_cnt={displayItem.lost_cnt?displayItem.lost_cnt.length:0}
        sp2_3_serve_type={displayItem.sp2_3_serve_type} sp2_3_name={displayItem.sp2_3} sp2_3_remaindelivering={displayItem.sp2_3_remaindelivering} sp2_3_onhold={displayItem.sp2_3_onhold} 
        sp2_3_sop={displayItem.sp2_3_sop} sp2_3_appsheet={displayItem.sp2_3_appsheet} sp2_3_ttl_delivered={displayItem.sp2_3_ttl_delivered}
        sp2_3_delivered={displayItem.sp2_3_delivered} sp2_3_lost_cnt={displayItem.lost_cnt?displayItem.lost_cnt.length:0} sp_epod={displayItem.epod} sp_attendance={displayItem.sp2_attendance}/>
          <div>
            <div class="px-4 mt-8 border border-gray-200 bg-white rounded-t-lg dark:bg-gray-800">
                <textarea id="comment" rows="4" onChange={(e)=>{setComment(e.target.value);}} value={comment} className="outline-none w-full py-2 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required ></textarea>
            </div>
            <div className="flex border gap-4 border-gray-200 flex-row p-2 items-center bg-gray-100 rounded-b-lg">
                <label htmlFor='image1' className={!image1?'bg-white cursor-pointer rounded-sm p-6 border-4 border-dashed':'bg-white cursor-pointer rounded-smborder-4 border-2 rounded-md'}>
                    {!image1?<FiUpload className='font-bold text-2xl'/>: <img className='w-24' src={URL.createObjectURL(image1)}></img>}
                    <input type='file' onChange={(e)=>setImage1(e.target.files[0])} id='image1' hidden></input>
                </label>    
                <label htmlFor='image2' className={!image2?'bg-white cursor-pointer rounded-sm p-6 border-4 border-dashed':'bg-white cursor-pointer rounded-smborder-4 border-2 rounded-md'}>
                    {!image2?<FiUpload className='font-bold text-2xl'/>: <img className='w-24' src={URL.createObjectURL(image2)}></img>}
                    <input type='file' onChange={(e)=>setImage2(e.target.files[0])} id='image2' hidden></input>
                </label>    
                <label htmlFor='image3' className={!image3?'bg-white cursor-pointer rounded-sm p-6 border-4 border-dashed':'bg-white cursor-pointer rounded-smborder-4 border-2 rounded-md'}>
                    {!image3?<FiUpload className='font-bold text-2xl'/>: <img className='w-24' src={URL.createObjectURL(image3)}></img>}
                    <input type='file' onChange={(e)=>setImage3(e.target.files[0])} id='image3' hidden></input>
                </label>    

            </div>
            </div>
            </div>
          </div>:''
        }
        {isShowDetail? 
            <Detail 
            token={token}
            name={displayItem.name}
            ch_name={displayItem.name_ch}
            date={displayItem.date}
            is_garantee={displayItem.is_garantee}
            sp2_1={displayItem.sp2_1}
            sp2_1_is_servicce_bonus={displayItem.sp2_1_is_servicce_bonus}
            sp2_1_remaindelivering={displayItem.sp2_1_remaindelivering}
            sp2_1_ttl_delivered={displayItem.sp2_1_ttl_delivered}
            sp2_1_delivered={displayItem.sp2_1_delivered}
            sp2_1_assign_delivered={displayItem.sp2_1_assign_delivered}
            sp2_1_onhold={displayItem.sp2_1_onhold}
            sp2_1_appsheet={displayItem.sp2_1_appsheet}
            sp2_1_serve_type={displayItem.sp2_1_serve_type}
            sp2_1_sop={displayItem.sp2_1_sop}
            sp2_2={displayItem.sp2_2}
            sp2_2_is_servicce_bonus={displayItem.sp2_2_is_servicce_bonus}
            sp2_2_remaindelivering={displayItem.sp2_2_remaindelivering}
            sp2_2_ttl_delivered={displayItem.sp2_2_ttl_delivered}
            sp2_2_delivered={displayItem.sp2_2_delivered}
            sp2_2_assign_delivered={displayItem.sp2_2_assign_delivered}
            sp2_2_onhold={displayItem.sp2_2_onhold}
            sp2_2_appsheet={displayItem.sp2_2_appsheet}
            sp2_2_serve_type={displayItem.sp2_2_serve_type}
            sp2_2_sop={displayItem.sp2_2_sop}
            sp2_3={displayItem.sp2_3}
            sp2_3_is_servicce_bonus={displayItem.sp2_3_is_servicce_bonus}
            sp2_3_remaindelivering={displayItem.sp2_3_remaindelivering}
            sp2_3_ttl_delivered={displayItem.sp2_3_ttl_delivered}
            sp2_3_delivered={displayItem.sp2_3_delivered}
            sp2_3_assign_delivered={displayItem.sp2_3_assign_delivered}
            sp2_3_onhold={displayItem.sp2_3_onhold}
            sp2_3_appsheet={displayItem.sp2_3_appsheet}
            sp2_3_serve_type={displayItem.sp2_3_serve_type}
            sp2_3_sop={displayItem.sp2_3_sop}
            epod={displayItem.epod}
            lost_cnt={displayItem.lost_cnt?displayItem.lost_cnt.length:0}
            weeknum={displayItem.weeknum}
            sp2_attendance={displayItem.sp2_attendance}
            epod_lost={displayOnlineItem.epod_lost}
            seq={displayOnlineItem.seq}
            ttl_delivered={displayOnlineItem.ttl_delivered}
            ttl_workday_weekend={displayOnlineItem.ttl_workday_weekend}
            ttl_worksday={displayOnlineItem.ttl_worksday}
            uncleanCnt={displayOnlineItem.uncleanCnt}
            is_online_bonus={displayOnlineItem.is_online_bonus}
            day_report_status={displayItem.status}
            week_report_status={displayOnlineItem.status}
        />
            :''
        }
        <div className='w-full h-full overflow-scroll mt-6'>
            <table className='table-fixed w-full min-w-[730px] text-center'>   
                {isShowDetail?'':isSubmitFilter?'':reportForm?'':isShowMenu?'':
                <tr className='sticky top-0 z-1'>
                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block text-sm font-normal leading-none text-slate-500">日期</p>
                    </th>
                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block text-sm font-normal leading-none text-slate-500">騎手</p>
                    </th>
                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block text-sm font-normal leading-none text-slate-500">保底獎勵</p>
                    </th>
                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block text-sm font-normal leading-none text-slate-500">服務獎勵</p>
                    </th>
                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block text-sm font-normal leading-none text-slate-500">上線獎勵</p>
                    </th>
                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block text-sm font-normal leading-none text-slate-500">選項</p>
                    </th>
                </tr>}
                {clientData?filterSubmitData.slice(first,first+rows).map((item, index)=>(
                    <List date={item.date} name={item.name} is_garantee={item.is_garantee} sp2_1_is_service_bonus={item.sp2_1_is_servicce_bonus} sp2_2_is_service_bonus={item.sp2_2_is_servicce_bonus} sp2_3_is_service_bonus={item.sp2_3_is_servicce_bonus} is_online_bonus={onlineData.filter((i)=>(i.weeknum===item.weeknum && i.name===item.name)).length>0? onlineData.filter((i)=>(i.weeknum===item.weeknum && i.name===item.name))[0].is_online_bonus: '-'} index={index} id={item._id} weeknum={item.weeknum} filterdData={filterSubmitData} status='submit' dateSubmitFilterConfirm={dateSubmitFilterConfirm} riderSubmitFilterConfirm={riderSubmitFilterConfirm}/>
                )):''
                }
            </table>
        </div>
    </div>
  )
}

export default VendorHomePage
