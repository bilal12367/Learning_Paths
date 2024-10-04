import React, { useCallback, useEffect, useState } from 'react'
import HideablePanel from '../ui_components/HideablePanel'
import RippleButton from '../ui_components/RippleButton'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import getDays from '../../utils/GetDays';
import moment from 'moment';

interface DatePickerProps {
    show?: boolean,
    onDismiss?: () => void
}

const DatePickler = (props: DatePickerProps) => {
    const [state, setState] = useState(false);
    useEffect(() => {
        calcDays()
    }, [])

    const calcDays = useCallback(() => {
        const days = [];
        const numDays = moment().daysInMonth();

        for (let day = 1; day <= numDays; day++) {
            const date = moment(`${moment().year()}-${moment().month()+1}-${day}`, "YYYY-MM-DD");
            days.push({
                date: date.format("YYYY-MM-DD"),
                dateNo: date.format("DD"),
                day: date.format("dddd") // Get the full name of the day
            });
        }
        console.log('days', days)
    }, [])

    return (
        <div className='d-flex border position-relative'>

            <HideablePanel show={state} onDismiss={() => { setState(false) }}>
                <div className='d-flex flex-column' style={{ width: 500, backgroundColor: 'white' }}>
                    <div className='w-100 row flex-wrap' style={{ marginLeft: 0 }}>
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
                                    <div className='weekCol d-flex flex-column align-items-center' style={{ height: 50 }}>
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