import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AdminContext } from '../../context/AdminContext'

const Update = () => {

    const {getDB, rider, state} = useContext(AdminContext)
    const ReportedData = rider.filter((item)=>(item.is_report===true))

    const [isEdit, setIsEdit] = useState(false)
    const [riderData, setRiderData] = useState({
        id:'',
        name: '',
        date: '',
        is_garantee: '',
        smart_inbound_sop: '',
        is_report: false
    })
    const openEditForm = (id, name, date, is_ga, sm) => {
        setRiderData({
            id: id,
            name: name,
            date: date,
            is_garantee: is_ga,
            smart_inbound_sop: sm,
            is_report: false
        })
        setIsEdit(true)
    }

    const updateData = async (_id, name, date, is_garantee, sm, is_report) => {
        try{
            const formData = new FormData()
            formData.append('riderId', _id)
            formData.append('name', name)
            formData.append('date', date)
            formData.append('is_garantee', false)
            formData.append('smart_inbound_sop', sm)
            formData.append('is_report', false)

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

  return state && (
        <div className='flex flex-col gap-3 pl-12 w-2/3 md:w-5/6'>  
        {
            ReportedData.map((item, index)=>(
            <div key={index} className='flex flex-row items-center gap-5'>
                <p>{item.name}</p>
                <p>{item.date}</p>
                <p>{item.is_garantee}</p>
                <p>{item.smart_inbound_sop}</p>
                <button onClick={()=>openEditForm(item._id, item.name, item.date, item.is_garantee, item.smart_inbound_sop)} className='bg-green-100 p-3 round-lg cursor-pointer'>Edit</button>

            </div> 
            ))
        }
        {
            riderData && isEdit?
            
                <div className='flex flex-row items-center gap-5'>
                    <p>{riderData.name}</p>
                    <p>{riderData.date}</p>
                    <select type='text' value={riderData.is_garantee} onChange={e=>setRiderData(prev =>({...prev, is_garantee: e.target.value}))}>
                        <option value='True'>true</option>
                        <option value='True'>false</option>
                    </select>
                    <input type='text' value={riderData.smart_inbound_sop} onChange={e=>setRiderData(prev =>({...prev, smart_inbound_sop: e.target.value}))}></input>
                    <button onClick={()=>updateData(riderData.id, riderData.name, riderData.date, riderData.is_garantee, riderData.smart_inbound_sop, riderData.is_report)} className='bg-green-100 p-3 round-lg cursor-pointer'>Save</button>
                    <button onClick={()=>setIsEdit(false)} className='bg-green-100 p-3 round-lg cursor-pointer'>Cancel</button>
                </div>:''
        }
        </div>
  )
}

export default Update
