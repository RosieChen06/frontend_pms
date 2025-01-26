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
    const [dateFilterPreview, setDateFilterPreview] = useState([])
    const [riderFilterPreview, setRiderFilterPreview] = useState([])
    const [submitDataFilter, setSubmitDataFilter] = useState(false)
    const [isSubmitFilter, setSubmitFilter] = useState(false)

    const value = {
        isShowDetail, setIsShowDetail, displayItem, setDisplayItem, reportForm, setReportForm, isShowConfirmDetail, setIsShowConfirmDetail,
        isOnlineReport, setIsReportOnline, sp2_1_reportItem, setSp2_1_reportItem, sp2_2_reportItem, setSp2_2_reportItem, sp2_3_reportItem, setSp2_3_reportItem,
        reportSp2Item, setReportSp2Item, displayOnlineItem, setDisplayOnlineItem, displayConfirmItem, setDisplayConfirmItem,
        displayConfirmOnlineItem, setDisplayConfirmOnlineItem, riderList, setRiderList, dayList, setDayList, submitDataFilter, setSubmitDataFilter, isSubmitFilter, setSubmitFilter,
        dateFilterPreview, setDateFilterPreview, riderFilterPreview, setRiderFilterPreview
    }

    return(
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider