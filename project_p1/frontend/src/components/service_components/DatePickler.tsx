import React, { useEffect, useState } from 'react'
import HideablePanel from '../ui_components/HideablePanel'
import RippleButton from '../ui_components/RippleButton'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import getDays from '../../utils/GetDays';

interface DatePickerProps {
    show?: boolean,
    onDismiss?: () => void
}

const DatePickler = (props: DatePickerProps) => {
    const [state, setState] = useState(false);
    useEffect(() => {
    }, [])
    const getDays1 = () => {

        let weekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let reqWeekNames = [...weekNames]
        let week: any = reqWeekNames.shift()
        reqWeekNames.push(week)
        let x = new Date(new Date().getFullYear(), 8, 1)
        let y: any = new Date(x.getFullYear(), x.getMonth() + 1, 1)
        let z = new Date(y - 1)
        let dates = []
        let daysInCurrentMonth = z.getDate();
        let dayOfFirstDate = new Date(x.getFullYear(), x.getMonth(), 1).getDay()
        let dayOfLastDate = new Date(x.getFullYear(), x.getMonth(), z.getDate()).getDay()
        console.log("Month Name: ", x.toString())
        console.log(`Date: 1 Day: ${weekNames[dayOfFirstDate]} , Last Date: ${daysInCurrentMonth} Day: ${weekNames[dayOfLastDate]}`)
        console.log("Day Of First Date: ", weekNames[dayOfFirstDate])

        if (dayOfFirstDate == 0) dayOfFirstDate = 6
        else dayOfFirstDate -= 1
        console.log("This many days after from monday: ", dayOfFirstDate)
        let a = new Date()
        a.setDate(x.getDate() - dayOfFirstDate)
        for (let i = 0; i < dayOfFirstDate; i++) {
            let temp = new Date(a.getFullYear(), a.getMonth(), a.getDate() + i)
            dates.push({ Date: temp.getDate(), Day: reqWeekNames[temp.getDay() - 1] })
        }
        for (let i = 1; i <= daysInCurrentMonth; i++) {
            let temp = new Date(x.getFullYear(), x.getMonth(), i)
            dates.push({ Date: temp.getDate(), Day: weekNames[temp.getDay()] })
        }
        let b = new Date(x.getFullYear(), x.getMonth(), daysInCurrentMonth)
        let daysFromLastDate = 0
        if (b.getDay() != 0) daysFromLastDate = 7 - b.getDay()
        b.setDate(daysInCurrentMonth + daysFromLastDate)
        console.log("Days From Last Date is sunday: ", `${b.getFullYear()}-${b.getMonth()}-${b.getDate()}`)


        return dates
    }
    return (
        <div className='d-flex border position-relative'>

            <HideablePanel show={state} onDismiss={() => { setState(false) }}>
                <div className='d-flex flex-column' style={{ width: 500, backgroundColor: 'white' }}>
                    <div className='w-100 row flex-wrap' style={{marginLeft: 0}}>
                        <div className='weekCol'>Mon</div>
                        <div className='weekCol'>Tue</div>
                        <div className='weekCol'>Wed</div>
                        <div className='weekCol'>Thu</div>
                        <div className='weekCol'>Fri</div>
                        <div className='weekCol'>Sat</div>
                        <div className='weekCol'>Sun</div>
                    </div>
                    <div className='w-100 d-flex flex-wrap'>
                        {
                            Object.values(getDays()).map((date: any) => {
                                return (
                                    <div className='weekCol d-flex flex-column align-items-center' style={{height: 50}}>
                                        <span>{date.Date}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </HideablePanel>
            <RippleButton onClick={() => { setState(true) }} style={{ padding: '10px 14px' }}>
                <div className='d-flex flex-column'>
                    <div className='d-flex'>Departure <KeyboardArrowDownRoundedIcon color='primary' /> </div>
                    <div className='d-flex flex-row align-items-end time-row'><span style={{ fontSize: 40, fontWeight: 'bold' }}>10</span><span style={{ fontSize: 20, marginLeft: 10, marginBottom: 10 }}> Sep'24 </span></div>
                    <div>Tuesday</div>
                </div>
            </RippleButton>
        </div>
    )
}

export default DatePickler