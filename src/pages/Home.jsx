import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AdminContext } from '../../context/AdminContext'

const Home = () => {

    const {getDB, rider, data, state, setData} = useContext(AdminContext)

    const [isEdit, setIsEdit] = useState(true)

    const saveRecord = async (name, date, is_gr, sm) => {
        try{
            const formData = new FormData()
            formData.append('name', name)
            formData.append('date', date)
            formData.append('is_garantee', false)
            formData.append('smart_inbound_sop', sm)

            const {data} = await axios.post('http://localhost:4000/api/admin/add-data',formData)

            if(data.success){
                toast.success(data.message)
                getDB()
            }else{
                toast.error(data.message)
            }

        }catch(error){
            console.log(error)
        }
    }
    
    const filterdData = data.filter((item)=>(rider.filter((i)=>(i.name===item.user_name)).filter((j)=>(j.date===item.date)).length===0) && item.user_name !=='')
    console.log(data)

    const [newData, setNewData] = useState({
        name: 'Rosie'
    })

    console.log(newData)

    const editRiderData = () =>{
        setData(data.map((item)=>{
            return item.user_name==='張盈婷' && item.date_utc==='2024-12-24T16:00:00.000Z'?
            {...item, user_name:'Rosie'}:item
        }))
    }
  return state && (
    <div className='flex flex-col pl-8 w-2/3 md:w-5/6 pr-4 h-full overflow-hidden'>  
        <div>

        </div>
        <input type='text' value={newData.name} onChange={e=>setNewData(prev =>({...prev, name: e.target.value}))}></input>
        <button onClick={editRiderData}>Submit</button>
        <div className='w-4/5 grid grid-cols-5 bg-white p-3 rounded-lg mb-4'>
            <p>Date</p>
            <p>Name</p>
            <p>Name</p>
            <p>Name</p>
            <p>Name</p>
        </div>
        <div className='w-full overflow-scroll'>
            {
                filterdData.map((item, index)=>(
                <div key={index} className='flex flex-row items-center w-full'>
                    <div className='w-4/5 grid grid-cols-5 bg-slate-50 p-3 mb-2 mr-4'>
                        <p>{item.date.slice(0,10)}</p>
                        <p>{item.user_name}</p>
                        <p>{item.user_name}</p>
                        <p>{item.user_name}</p>
                        <p>{item.user_name}</p>
                    </div>
                    <button onClick={()=>saveRecord(item.user_name, item.date, item.is_garantee, item.epod)} className='bg-green-100 p-3 rounded-full'>Detail</button>
                    <button onClick={()=>saveRecord(item.user_name, item.date, item.is_garantee, item.epod)} className='bg-green-100 p-3 rounded-full'>Edit</button>
                    <button onClick={()=>saveRecord(item.user_name, item.date, item.is_garantee, item.epod)} className='bg-green-100 p-3 rounded-full'>Save</button>
                </div> 
                ))
            }
        </div>
    </div>
  )
}

export default Home