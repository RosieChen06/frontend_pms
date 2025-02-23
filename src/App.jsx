import { useContext, useEffect, useRef, useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import {Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Report from './pages/Report';
import { AdminContext } from '../context/AdminContext';
import VendorHomePage from './pages/VendorHomePage';
import Confirmed from './pages/Confirmed';
import MissingParcel from './pages/MissingParcel';
import Delete from './pages/Delete';
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "./redux/slices/apiSlice";

function App() {

  const {token} = useContext(AdminContext)
  const dispatch = useDispatch();
    const data = useSelector((state) => state.data.data);
    const prevDataRef = useRef(data);

    useEffect(() => {
        dispatch(fetchData()); 
      }, [dispatch]);

    useEffect(() => {
        if (prevDataRef.current !== data) {
          dispatch(fetchData());
        }
        prevDataRef.current = data; 
      }, [data, dispatch]);
      
  return (
    <>
      <div>
        <ToastContainer />
        {token==='admin'?
        <div className='w-full bg-gray-200'>
            <div className='h-[12vh] bg-white flex justify-center items-center'>
              <Navbar />
            </div>
            <div className='flex items-start mt-0 h-[88vh]'>
              <Sidebar />
              <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/admin-update' element={<Report />} />
                  <Route path='/missing-parcel' element={<MissingParcel />} />
                  <Route path='/maintenance' element={<Delete />} />
              </Routes>
          </div>
        </div>:token==='user'?
        <div className='w-full bg-gray-200'>
          <div className='h-[12vh] bg-white flex justify-center items-center'>
            <Navbar />
          </div>
          <div className='flex items-start mt-0 h-[88vh]'>
            <Sidebar />
            <Routes>
                  <Route path='/' element={<VendorHomePage /> } />
            </Routes>
            <Routes>
                  <Route path='/report' element={<Report />} />
            </Routes>
            <Routes>
                  <Route path='/confirmed' element={<Confirmed />} />
            </Routes>
          </div>
        </div>
        :<Login />
        }
      </div>
    </>
  )
}

export default App
