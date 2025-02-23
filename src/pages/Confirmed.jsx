import React, { useContext, useState, useEffect, useRef } from 'react'
import { AdminContext } from '../../context/AdminContext'
import List from '../components/List'
import { UserContext } from '../../context/UserContext';
import Detail from '../components/Detail';
import Filter from '../components/Filter';
import { FaFilter } from "react-icons/fa6";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'
import { Paginator } from 'primereact/paginator';
import { useSelector } from "react-redux";

const Confirmed = () => {

    const {token, isShowMenu} = useContext(AdminContext)
    const {setDateInput, setRiderInput, clientConfirmData} = useContext(UserContext)
    const [filterConfirmData, setFilterConfirmData] = useState([])
    const [dateConfirmFilterPreview, setDateConfirmFilterPreview] = useState([])
    const [riderConfirmFilterPreview, setRiderConfirmFilterPreview] = useState([])
    const [dateConfirmFilterConfirm, setDateConfirmFilterConfirm] = useState([])
    const [riderConfirmFilterConfirm, setRiderConfirmFilterConfirm] = useState([])

    const data = useSelector((state) => state.data.data);
    const onlineData = useSelector((state) => state.onlineData.onlineData); 

    const dataList = () => {
        if(clientConfirmData){
            let newData = clientConfirmData.filter((item)=>(
                item.status==='confirm'
            ))
            setFilterConfirmData(newData)
        }
    }

    useEffect(()=>{
        dataList()
    }, [clientConfirmData])

    const {isShowConfirmDetail, displayConfirmItem, displayConfirmOnlineItem, isConfirmFilter, setConfirmFilter} = useContext( UserContext)
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(100);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
        console.log(event)
    }
  return data && (
    <div className='w-full sm:w-[80%] h-[96%] overflow-hidden rounded-lg p-2 ml-0 sm:ml-4'> 
      <div className='flex flex-row items-center mt-4'>
        {isShowConfirmDetail?'':isConfirmFilter?'':
        <div className='p-2 min-w-[75px] flex justify-end mt-3 rounded-md flex-row items-center gap-2 bg-[#004e76] text-white'>
            <FaFilter />
            <button onClick={()=>{setConfirmFilter(true); setDateInput(''); setRiderInput('');}}>篩選</button>
        </div>
        }
        {isShowConfirmDetail?'':isConfirmFilter?'':isShowMenu?'':
          <div className='flex-row w-full justify-end items-center h-8 flex'>
              <div className='hidden lg:block'>
                  <Paginator className='bg-slate-50' first={first} rows={rows} totalRecords={filterConfirmData.length} onPageChange={onPageChange} />
              </div>
              <div className="card block max-w-[220px] lg:hidden">
                  <Paginator className='bg-slate-50' first={first} rows={rows} totalRecords={filterConfirmData.length} onPageChange={onPageChange} template={{ layout: 'PrevPageLink CurrentPageReport NextPageLink' }} />
              </div>
          </div>
        }
      </div>
      {isConfirmFilter?<Filter filterData={data.filter((item)=>(
            item.status === 'confirm'
          ))} status='confirm' setRiderConfirmFilterConfirm={setRiderConfirmFilterConfirm} setDateConfirmFilterConfirm={setDateConfirmFilterConfirm} dateConfirmFilterPreview={dateConfirmFilterPreview} setDateConfirmFilterPreview={setDateConfirmFilterPreview} 
          setRiderConfirmFilterPreview={setRiderConfirmFilterPreview} riderConfirmFilterPreview={riderConfirmFilterPreview} dateConfirmFilterConfirm={dateConfirmFilterConfirm} riderConfirmFilterConfirm={riderConfirmFilterConfirm}/>:''}
        {isShowConfirmDetail? 
            <Detail 
            token={token}
            name={displayConfirmItem.name}
            date={displayConfirmItem.date}
            is_garantee={displayConfirmItem.is_garantee}
            sp2_1={displayConfirmItem.sp2_1}
            sp2_1_is_servicce_bonus={displayConfirmItem.sp2_1_is_servicce_bonus}
            sp2_1_remaindelivering={displayConfirmItem.sp2_1_remaindelivering}
            sp2_1_ttl_delivered={displayConfirmItem.sp2_1_ttl_delivered}
            sp2_1_delivered={displayConfirmItem.sp2_1_delivered}
            sp2_1_assign_delivered={displayConfirmItem.sp2_1_assign_delivered}
            sp2_1_onhold={displayConfirmItem.sp2_1_onhold}
            sp2_1_appsheet={displayConfirmItem.sp2_1_appsheet}
            sp2_1_serve_type={displayConfirmItem.sp2_1_serve_type}
            sp2_1_sop={displayConfirmItem.sp2_1_sop}
            sp2_2={displayConfirmItem.sp2_2}
            sp2_2_is_servicce_bonus={displayConfirmItem.sp2_2_is_servicce_bonus}
            sp2_2_remaindelivering={displayConfirmItem.sp2_2_remaindelivering}
            sp2_2_ttl_delivered={displayConfirmItem.sp2_2_ttl_delivered}
            sp2_2_assign_delivered={displayConfirmItem.sp2_2_assign_delivered}
            sp2_2_delivered={displayConfirmItem.sp2_2_delivered}
            sp2_2_onhold={displayConfirmItem.sp2_2_onhold}
            sp2_2_appsheet={displayConfirmItem.sp2_2_appsheet}
            sp2_2_serve_type={displayConfirmItem.sp2_2_serve_type}
            sp2_2_sop={displayConfirmItem.sp2_2_sop}
            sp2_3={displayConfirmItem.sp2_3}
            sp2_3_is_servicce_bonus={displayConfirmItem.sp2_3_is_servicce_bonus}
            sp2_3_remaindelivering={displayConfirmItem.sp2_3_remaindelivering}
            sp2_3_ttl_delivered={displayConfirmItem.sp2_3_ttl_delivered}
            sp2_3_delivered={displayConfirmItem.sp2_3_delivered}
            sp2_3_assign_delivered={displayConfirmItem.sp2_3_assign_delivered}
            sp2_3_onhold={displayConfirmItem.sp2_3_onhold}
            sp2_3_appsheet={displayConfirmItem.sp2_3_appsheet}
            sp2_3_serve_type={displayConfirmItem.sp2_3_serve_type}
            sp2_3_sop={displayConfirmItem.sp2_3_sop}
            epod={displayConfirmItem.epod}
            lost_cnt={displayConfirmItem.lost_cnt?displayConfirmItem.lost_cnt.length:0}
            weeknum={displayConfirmItem.weeknum}
            sp2_attendance={displayConfirmItem.sp2_attendance}
            epod_lost={displayConfirmOnlineItem.epod_lost}
            seq={displayConfirmOnlineItem.seq}
            ttl_delivered={displayConfirmOnlineItem.ttl_delivered}
            ttl_workday_weekend={displayConfirmOnlineItem.ttl_workday_weekend}
            ttl_worksday={displayConfirmOnlineItem.ttl_worksday}
            uncleanCnt={displayConfirmOnlineItem.uncleanCnt}
            is_online_bonus={displayConfirmOnlineItem.is_online_bonus}
            day_report_status='confirm'
            />
            :''
        }
        <div className='w-full h-full overflow-scroll mt-6'>
            <table className='table-fixed w-full min-w-[730px] text-center'>   
                {isShowMenu?'':
                <tr className='sticky top-0 z-1'>
                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block text-sm font-normal leading-none text-slate-500">Date</p>
                    </th>
                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block text-sm font-normal leading-none text-slate-500">Rider</p>
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
                {clientConfirmData?
                filterConfirmData.slice(first,first+rows).map((item, index)=>(
                    <List date={item.date} name={item.name} ch_name={item.name_ch} is_garantee={item.is_garantee} sp2_1_is_service_bonus={item.sp2_1_is_servicce_bonus} sp2_2_is_service_bonus={item.sp2_2_is_servicce_bonus} sp2_3_is_service_bonus={item.sp2_3_is_servicce_bonus} is_online_bonus={onlineData.filter((i)=>(i.weeknum===item.weeknum && i.name===item.name))[0].is_online_bonus} index={index} id={item._id} weeknum={item.weeknum} status='confirm' filterdData={filterConfirmData}/>
                ))
                :''
                }
            </table>
        </div>
    </div>
  )
}

export default Confirmed
