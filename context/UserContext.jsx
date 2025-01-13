import { createContext, useEffect, useState } from "react"
import axios from "axios"
import {toast } from 'react-toastify';

export const UserContext = createContext()

const UserContextProvider = (props) =>{

    const [isShowDetail, setIsShowDetail] = useState(false)
    const [displayItem, setDisplayItem] =useState([])
    const [reportForm, setReportForm] = useState(false)


    const value = {
        isShowDetail, setIsShowDetail, displayItem, setDisplayItem, reportForm, setReportForm
    }

    return(
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider