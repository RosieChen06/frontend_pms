import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { AdminContext } from '../../context/AdminContext'

const Login = () => {
    const administrator = [
        {
            user: 'rosie.chenyy@shopee.com',
            password: 'admin001'
        }
    ]

    const user = [
        {
            user: 'rosie.chenyy@shopee.com',
            password: 'user001'
        },
        {
            user: 'vendor@gmail.com',
            password: 'user001'
        }
    ]

    const {setToken, userEmail, setUserEmail, setIsResolve} = useContext(AdminContext)

    const [userPassword, setUserPassword] = useState('')

    const [state, setState] = useState('User')

    const onSubmitHandler = (event) => {

        event.preventDefault()

        if(state==='Admin'){

            if(administrator.map((item)=>{item.user===userEmail}).length>0 && userPassword==='admin001'){
                sessionStorage.setItem('token','admin')
                sessionStorage.setItem('useremail',userEmail)
                setToken('admin')
                setIsResolve('report')
            }else if(administrator.map((item)=>{item.user===userEmail}).length>0 && userPassword!='admin001'){
                toast.error("Password Incorrect")
            }else{
                toast.error("Access Denied")
            }

        }else{
            if(user.map((item)=>{item.user===userEmail}).length>0 && userPassword==='user001'){
                console.log('success')
                sessionStorage.setItem('token','user')
                sessionStorage.setItem('useremail',userEmail)
                setToken('user')
            }else if(user.map((item)=>{item.user===userEmail}).length>0 && userPassword!='user001'){
                toast.error("Password Incorrect")
            }else{
                toast.error("Access Denied")
            }
        }
    }

  return (
    <form className='flex items-center justify-center min-h-[90vh]'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] border rounded-xl text-[#5e5e5e] text-sm shadow-lg'>
            <p className='text-2xl font-semibold m-auto'><span className='text-[#004e76]'>{state}</span> Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input className='border border-[#DADADA] rounded w-full p-2 mt-1' type='email' required value={userEmail} onChange={e=>setUserEmail(e.target.value)}></input>
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input className='border border-[#DADADA] rounded w-full p-2 mt-1' type='password' required value={userPassword} onChange={e=>setUserPassword(e.target.value)}></input>
            </div>
            <button onClick={onSubmitHandler} className='bg-[#004e76] text-white w-full py-2 rounded-md text-base mt-6'>Login</button>
            {state==='User'?
                <p>Admin Login? <span className='text-[#004e76] underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</span></p>:
                <p>User Login? <span className='text-[#004e76] underline cursor-pointer' onClick={()=>setState('User')}>Click here</span></p>
            }
        </div>
    </form>
  )
}

export default Login