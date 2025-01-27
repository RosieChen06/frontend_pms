import React, { useContext, useEffect, useState } from 'react'
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'
import { AdminContext } from '../../context/AdminContext';
import { GrDocumentExcel } from "react-icons/gr";
import { Paginator } from 'primereact/paginator';

const Delete = () => {

    const {rider} = useContext(AdminContext)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [maxDate, setMaxDate] = useState('')
    const [minDate, setMinDate] = useState('')
    const [isShowData, setIsShowData] = useState(true)

    const findMinDate = () => {
        let datelist = []
        for(let i=0; i<rider.length; i++){
            let date = new Date(rider[i].date)
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
    },[rider])

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
        console.log(event)
    }

  return (
    <div className=' bg-white w-[80%] h-[96%] rounded-lg p-2 mt-3 ml-4'> 
        <div className='h-1/6 flex flex-row w-full gap-4'>
            <div className='flex flex-col gap-2 w-1/4'>
                <p>Start From</p>
                <Calendar className='border-2 border-gray-200 p-1 rounded-lg outline-none' dateFormat="yy/mm/dd" minDate={minDate} maxDate={maxDate} value={startDate} onChange={(e) => setStartDate(e.value)}></Calendar>
            </div>
            <div className='flex flex-col gap-2 w-1/4'>
                <p>End At</p>
                <Calendar className='border-2 border-gray-200 p-1 rounded-lg outline-none' dateFormat="yy/mm/dd" minDate={minDate} maxDate={maxDate} value={endDate} onChange={(e) => setEndDate(e.value)}></Calendar>
            </div>
            <div className='flex flex-col gap-2 w-1/4'>
                <p>Data Status</p>
                <select className='border-2 border-gray-200 p-1 rounded-lg outline-none'>
                    <option>Submit</option>
                    <option>Reported</option>
                    <option>Resolve</option>
                    <option>Confirm</option>
                </select>
            </div>
            <button className='bg-[#004e76] w-1/4 text-white h-2/3 rounded-sm'>Search</button>
        </div>
        <div className='h-[65%] flex justify-center items-center'>
            {!isShowData?
                <GrDocumentExcel className='text-[24px] text-gray-300'/>:
                <div className='w-full h-full overflow-scroll'>
                    <table className='table-fixed w-full min-w-[730px] text-center'>   
                        <tr className='sticky top-0 z-1'>
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
                        </tr>
                        {rider.slice(0,rows).map((item, index)=>(
                            <tr className="hover:bg-slate-50">
                                <td className="p-4 border-b border-slate-200">
                                    <p className="block text-sm text-slate-800">Smart Inbound</p>
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    <p className="block text-sm text-slate-800">dkdk</p>
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    <p className="block text-sm text-slate-800">dkdk</p>
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    <p className="block text-sm text-slate-800">dkdk</p>
                                </td>
                            </tr>
                        ))

                        }
                    </table>
                </div>
            }
        </div>
        <div className='h-[15%] flex flex-row w-full gap-4 justify-center items-center'>
            <Paginator className='bg-slate-50' first={first} rows={rows} totalRecords={rider.length} rowsPerPageOptions={[5, 10, 15]} onPageChange={onPageChange} />
        </div>
    </div>
  )
}

export default Delete
        
