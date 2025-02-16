import { createContext, useEffect, useState } from "react"
import axios from "axios"
import {toast } from 'react-toastify';

export const UserContext = createContext()

const UserContextProvider = (props) =>{

    const [isShowDetail, setIsShowDetail] = useState(false)
    const [displayItem, setDisplayItem] =useState([])
    const [reportForm, setReportForm] = useState(false)
    const [isShowConfirmDetail, setIsShowConfirmDetail] = useState(false)
    const [isOnlineReport, setIsReportOnline] = useState(false)
    const [sp2_1_reportItem, setSp2_1_reportItem] = useState([])
    const [sp2_2_reportItem, setSp2_2_reportItem] = useState([])
    const [sp2_3_reportItem, setSp2_3_reportItem] = useState([])
    const [reportSp2Item, setReportSp2Item] = useState(false)
    const [displayOnlineItem, setDisplayOnlineItem] = useState([])
    const [displayConfirmItem, setDisplayConfirmItem] = useState([])
    const [displayConfirmOnlineItem, setDisplayConfirmOnlineItem] = useState([])
    const [riderList, setRiderList] = useState(false)
    const [dayList, setDayList] = useState(false)
    const [submitDataFilter, setSubmitDataFilter] = useState(false)
    const [isSubmitFilter, setSubmitFilter] = useState(false)
    const [riderConfirmList, setRiderConfirmList] = useState(false)
    const [dayConfirmList, setDayConfirmList] = useState(false)
    const [filterConfirmData, setFilterConfirmData] = useState([])
    const [isConfirmFilter, setConfirmFilter] = useState(false)
    const [dateInput, setDateInput] = useState('')
    const [riderInput, setRiderInput] = useState('')
    const [clientData, setClientData] = useState(false)
    const [clientConfirmData, setClientConfirmData] = useState(false)

    const value = {
        isShowDetail, setIsShowDetail, displayItem, setDisplayItem, reportForm, setReportForm, isShowConfirmDetail, setIsShowConfirmDetail,
        isOnlineReport, setIsReportOnline, sp2_1_reportItem, setSp2_1_reportItem, sp2_2_reportItem, setSp2_2_reportItem, sp2_3_reportItem, setSp2_3_reportItem,
        reportSp2Item, setReportSp2Item, displayOnlineItem, setDisplayOnlineItem, displayConfirmItem, setDisplayConfirmItem,
        displayConfirmOnlineItem, setDisplayConfirmOnlineItem, riderList, setRiderList, dayList, setDayList, submitDataFilter, setSubmitDataFilter, isSubmitFilter, setSubmitFilter, isConfirmFilter, setConfirmFilter, dayConfirmList, setDayConfirmList,
        riderConfirmList, setRiderConfirmList, filterConfirmData, setFilterConfirmData, dateInput, setDateInput, riderInput, setRiderInput, clientData, setClientData, clientConfirmData, setClientConfirmData
    }

    return(
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
