import React, { useContext, useEffect, useState } from 'react'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'
import { AdminContext } from '../../context/AdminContext';
import { GrDocumentExcel } from "react-icons/gr";
import { Paginator } from 'primereact/paginator';
import { BiDetail } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import Detail from '../components/Detail';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { useSelector, useDispatch } from "react-redux";
import { fetchWeekData } from "../redux/slices/weekDataSlice";
import { fetchData } from "../redux/slices/apiSlice";

const Delete = () => {

    const {isShowData, setIsShowData, isShowMenu} = useContext(AdminContext)
    const [startDate, setStartDate] = useState(dayjs(Date()))
    const [endDate, setEndDate] = useState(dayjs(Date()))
    const [maxDate, setMaxDate] = useState('')
    const [minDate, setMinDate] = useState('')
    const [isShow, setIsShow] = useState(true)
    const [editId, setEditId] = useState('')
    const [editItem, setEditItem] = useState('')
    const [searchStatus ,setSearchStatus] = useState('confirm')
    const [filteredData, setFilteredData] = useState([])

    const apiData = useSelector((state) => state.data.data);
    const onlineData = useSelector((state) => state.onlineData.onlineData); 
    const dispatch = useDispatch();

    const filterData = () => {
        const data = apiData.filter((item)=>(
            new Date(startDate.$d.setHours(0, 0, 0, 0))<=new Date(item.date) && new Date(endDate.$d.setHours(0, 0, 0, 0))>=new Date(item.date) && searchStatus===item.status
        ))

        setFilteredData(data)
    }

    const findMinDate = () => {
        let datelist = []
        for(let i=0; i<apiData.length; i++){
            let date = new Date(apiData[i].date)
            datelist.push(date)
        }
        let dateresult = datelist.filter(function(element, index, arr){
        return arr.indexOf(element) === index;
        });

        setMaxDate(new Date(Math.max(...dateresult)))
        setMinDate(new Date(Math.min(...dateresult)))
    }

    useEffect(()=>{
        findMinDate()
    },[apiData])

    useEffect(()=>{
        filterData()
    },[apiData, startDate, endDate, searchStatus])

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
        console.log(event)
    }

    const [selectedData, setSelectedData] = useState(false)
    const [selectedWeekData, setSelectedWeekData] = useState(false)

    const getDetail = async(date, name, status, weeknum) => {
        if(isWarning){
            return
        }

        const formData = new FormData()
        formData.append('dateInput', JSON.stringify([date]))
        formData.append('riderInput', JSON.stringify([name]))
        formData.append('statusInput', status)

        const {data} = await axios.post('https://backend-pms.vercel.app/api/user/clientReadData',formData)
        if(data.success){
            setSelectedData(data.clientData[0])
        }

        console.log(selectedData)

        const selectedWeekData = onlineData.filter((item)=>(item.name===name && item.weeknum===weeknum))
        setSelectedWeekData(selectedWeekData[0])
        setIsShowData(true)
    }

    const [isWarning, setIsWarning] = useState(false)

    const getId = async(id, name, weeknum, type) => {
        const findWeekData = onlineData.filter((item)=>(item.name===name && item.weeknum===weeknum))
        if(type==='outer'){

            if(findWeekData.length>0){
                setIsWarning(true)
                return
            }
        }

        try{
            const formData = new FormData()
            if(type==='allDelete'){
                formData.append('riderId', id)
                formData.append('riderWeekId', findWeekData[0]._id)
                const {data} = await axios.post('https://backend-pms.vercel.app/api/admin/all-delete',formData)
                if(data.success){
                    toast.success(data.message)
                    dispatch(fetchData()); 
                    setIsWarning(false)
                    dispatch(fetchWeekData());
                }else{
                    toast.error(data.message)
                }
            }else{
                formData.append('riderId', id)
                const {data} = await axios.post('https://backend-pms.vercel.app/api/admin/delete',formData)
                if(data.success){
                    toast.success(data.message)
                    dispatch(fetchData()); 
                    setIsWarning(false)
                }else{
                    toast.error(data.message)
                }
            }
        }catch(error){
            console.log(error)
        }
    }

    const updateStatus = async(value) => {
        setEditItem(value)
        try{
            const formData = new FormData()
            formData.append('riderId', editId)
            formData.append('status', value)
            const {data} = await axios.post('https://backend-pms.vercel.app/api/admin/update-status',formData)
            if(data.success){
                toast.success(data.message)
                dispatch(fetchData()); 
                setEditId('')
            }else{
                toast.error(data.message)
            }

        }catch(error){
            console.log(error)
        }
    }

    const editForm = (id, status) => {
        if(isWarning){
            return
        }
        else if(editId===id){
            setEditId('')
            setEditItem('item.status')
        }else{
            setEditId(id); 
            setEditItem(status)
        }
    }

  return (
    <div className='w-full sm:w-[80%] h-[96%] rounded-lg p-2 sm:ml-4 bg-white mt-4'> 
        {
            isShowData?
            <Detail
            token='admin'
            name={selectedData.name}
            ch_name={selectedData.name_ch}
            date={selectedData.date}
            is_garantee={selectedData.is_garantee}
            sp2_1={selectedData.sp2_1}
            sp2_1_is_servicce_bonus={selectedData.sp2_1_is_servicce_bonus}
            sp2_1_remaindelivering={selectedData.sp2_1_remaindelivering}
            sp2_1_ttl_delivered={selectedData.sp2_1_ttl_delivered}
            sp2_1_assign_delivered={selectedData.sp2_1_assign_delivered}
            sp2_1_delivered={selectedData.sp2_1_delivered}
            sp2_1_onhold={selectedData.sp2_1_onhold}
            sp2_1_appsheet={selectedData.sp2_1_appsheet}
            sp2_1_serve_type={selectedData.sp2_1_serve_type}
            sp2_1_sop={selectedData.sp2_1_sop}
            sp2_2={selectedData.sp2_2}
            sp2_2_is_servicce_bonus={selectedData.sp2_2_is_servicce_bonus}
            sp2_2_remaindelivering={selectedData.sp2_2_remaindelivering}
            sp2_2_ttl_delivered={selectedData.sp2_2_ttl_delivered}
            sp2_2_assign_delivered={selectedData.sp2_2_assign_delivered}
            sp2_2_delivered={selectedData.sp2_2_delivered}
            sp2_2_onhold={selectedData.sp2_2_onhold}
            sp2_2_appsheet={selectedData.sp2_2_appsheet}
            sp2_2_serve_type={selectedData.sp2_2_serve_type}
            sp2_2_sop={selectedData.sp2_2_sop}
            sp2_3={selectedData.sp2_3}
            sp2_3_is_servicce_bonus={selectedData.sp2_3_is_servicce_bonus}
            sp2_3_remaindelivering={selectedData.sp2_3_remaindelivering}
            sp2_3_ttl_delivered={selectedData.sp2_3_ttl_delivered}
            sp2_3_assign_delivered={selectedData.sp2_3_assign_delivered}
            sp2_3_delivered={selectedData.sp2_3_delivered}
            sp2_3_onhold={selectedData.sp2_3_onhold}
            sp2_3_appsheet={selectedData.sp2_3_appsheet}
            sp2_3_serve_type={selectedData.sp2_3_serve_type}
            sp2_3_sop={selectedData.sp2_3_sop}
            epod={selectedData.epod}
            lost_cnt={selectedData.lost_cnt?selectedData.lost_cnt.length:0}
            weeknum={selectedData.weeknum}
            sp2_attendance={selectedData.sp2_attendance}
            epod_lost={selectedWeekData.epod_lost}
            seq={selectedWeekData.seq}
            ttl_delivered={selectedWeekData.ttl_delivered}
            ttl_workday_weekend={selectedWeekData.ttl_workday_weekend}
            ttl_worksday={selectedWeekData.ttl_worksday}
            uncleanCnt={selectedWeekData.uncleanCnt}
            is_online_bonus={selectedWeekData.is_online_bonus}
            day_report_status='raw'
            week_report_status='raw'
            />
            :''
        }
        {isShowData?'':
            <div className='h-full'>
                {isShowMenu?'':
                <div className='h-1/6 flex flex-row w-full gap-4'>
                    <div className='flex flex-col gap-2 w-1/3'>
                        <p>Start From</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker className='w-full' value={startDate} format="YYYY/MM/DD" minDate={dayjs(minDate)} maxDate={dayjs(maxDate)} onChange={(newValue)=>setStartDate(newValue)}/>
                        </LocalizationProvider>
                    </div>
                    <div className='flex flex-col gap-2 w-1/3'>
                        <p>End At</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker className='w-full' value={endDate} format="YYYY/MM/DD" minDate={dayjs(minDate)} maxDate={dayjs(maxDate)} onChange={(newValue)=>setEndDate(newValue)}/>
                        </LocalizationProvider>
                    </div>
                    <div className='flex flex-col gap-2 w-1/3'>
                        <p>Data Status</p>
                        <select className='border-[1px] border-[#c4c4c4] p-1 rounded-sm h-[61%] outline-none' value={searchStatus} onChange={(e)=>setSearchStatus(e.target.value)}>
                            <option>submit</option>
                            <option>report</option>
                            <option>resolve</option>
                            <option>confirm</option>
                        </select>
                    </div>
                </div>
                }
                {isShowMenu?'':
                <div className='h-[65%] flex justify-center items-center mt-4'>
                    {!isShow?
                        <GrDocumentExcel className='text-[24px] text-gray-300'/>:
                        <div className='w-full h-full overflow-scroll sm:relative'>
                           {isWarning?
                            <div className='bg-white border-2 rounded-sm p-4 px-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
                                <p>是否同步刪除{selectedData[0].date} {selectedData[0].name}當周累計配送數據?</p>
                                <div className='w-full flex flex-col justify-center gap-2 mt-8'>
                                    <button onClick={()=>getId(selectedData[0]._id, selectedData[0].name, selectedData[0].weeknum, 'allDelete')} className='w-full bg-red-600 text-white p-1 rounded-md'>同步刪除</button>
                                    <button onClick={()=>getId(selectedData[0]._id, selectedData[0].name, selectedData[0].weeknum, 'dayDelete')} className='w-full bg-blue-600 text-white p-1 rounded-md'>僅刪除當日配送紀錄</button>
                                    <button onClick={()=>setIsWarning(false)} className='w-full bg-yellow-400 text-white p-1 rounded-md'>取消</button>
                                </div>
                            </div>:''
                            }
                            <table className='table-fixed w-full min-w-[730px] text-center'>   
                                <tr className='sticky top-0 z-1'>
                                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                                        <p className="block text-sm font-normal leading-none text-slate-500">Date</p>
                                    </th>
                                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                                        <p className="block text-sm font-normal leading-none text-slate-500">Rider</p>
                                    </th>
                                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                                        <p className="block text-sm font-normal leading-none text-slate-500">Status</p>
                                    </th>
                                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                                        <p className="block text-sm font-normal leading-none text-slate-500">Action</p>
                                    </th>
                                </tr>
                                {filteredData.slice(first,first+rows).map((item, index)=>(
                                    <tr className="hover:bg-slate-50">
                                        <td className="p-4 border-b border-slate-200">
                                            <p className="block text-sm text-slate-800">{item.date}</p>
                                        </td>
                                        <td className="p-4 border-b border-slate-200">
                                            <p className="block text-sm text-slate-800">{item.name}</p>
                                        </td>
                                        <td className="p-4 border-b border-slate-200">
                                            {editId!==item._id?
                                            <div className='flex flex-row items-center justify-center'>
                                                <p className={item.status==='submit'?"text-sm w-fit px-4 bg-yellow-400 p-1 rounded-full text-white":item.status==='confirm'?"text-sm w-fit px-4 bg-green-600 text-white p-1 rounded-full":item.status==='resolve'?"text-sm w-fit px-4 bg-blue-600 text-white p-1 rounded-full":"text-sm w-fit px-4 bg-red-600 text-white p-1 rounded-full"}>{item.status}</p>
                                            </div>:
                                            <select className=' border-gray-300 py-1 pl-1 rounded-md border-2 hover:text-black' type='text' value={editItem} onChange={(e)=>updateStatus(e.target.value)}>
                                                <option value='submit'>Submit</option>
                                                <option value='report'>Report</option>
                                                <option value='resolve'>Resolve</option>
                                                <option value='confirm'>Confirm</option>
                                            </select>
                                            }
                                        </td>
                                        <td className="p-4 border-b border-slate-200">
                                            <div className='flex flex-row items-center justify-center'>
                                                <button onClick={()=>getDetail(item.date, item.name, item.status, item.weeknum)} className='bg-white p-3 rounded-l-md border-2 border-slate-200 hover:bg-slate-200'><BiDetail /></button>
                                                <button onClick={()=>editForm(item._id, item.status)} className='bg-white p-3 border-y-2 border-r-2 border-slate-200 hover:bg-green-600 hover:text-white hover:border-green-600'><BiEdit /></button>
                                                <button onClick={()=>{getId(item._id, item.name, item.weeknum, 'outer'); setSelectedData(filteredData.filter((i)=>(item.name===i.name && item.date===i.date)))}} className='bg-white p-3 rounded-r-md border-y-2 border-r-2 border-slate-200 hover:bg-red-600 hover:text-white hover:border-red-600'><MdDeleteOutline /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                                }
                            </table>
                        </div>
                    }
                </div>
                }
                {isShowMenu?'':
                <div className='h-[15%] flex flex-row w-full gap-4 justify-center items-center'>
                    <Paginator className='bg-slate-50' first={first} rows={rows} totalRecords={filteredData.length} rowsPerPageOptions={[5, 10, 15]} onPageChange={onPageChange} />
                </div>}
            </div>
        }
    </div>
  )
}

export default Delete
        
