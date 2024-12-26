import React, { useCallback, useEffect, useState } from 'react'
import HideablePanel from '../ui_components/HideablePanel'
import RippleButton from '../ui_components/RippleButton'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import getDays from '../../utils/GetDays';
import moment from 'moment';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { IconButton } from '@mui/material';

interface DatePickerProps {
    show?: boolean,
    onDismiss?: () => void
}

const DatePickler = (props: DatePickerProps) => {
    let weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const [monthCount, setMonthCount] = useState(moment().month() + 1)
    const [show, setShow] = useState(false);
    useEffect(() => {
        calcDays()
    }, [])

    const calcDays = useCallback(() => {
        const days = [];
        const numDays = moment(`${moment().year()}-${monthCount}-1`).daysInMonth();

        for (let day = 1; day <= numDays; day++) {
            const date = moment(`${moment().year()}-${monthCount}-${day}`, "YYYY-MM-DD");
            days.push({
                date: date.format("YYYY-MM-DD"),
                dateNo: date.format("DD"),
                day: date.format("dddd") // Get the full name of the day
            });
        }
        let i = 0;
        let tempInitDay = days[0].day
        while (tempInitDay != weekDays[i]) {
            days.unshift({})
            i++;
        }
        return days;
    }, [monthCount])

    const changeMonth = (no: number) => {
        setMonthCount(monthCount + no)
    }

    return (
        <div className='d-flex border position-relative'>

            <HideablePanel show={show} onDismiss={() => { setShow(false) }}>
                <div className='d-flex flex-column' style={{ width: 400, backgroundColor: 'white' }}>
                    <div className='w-100 d-flex flex-row justify-content-between align-items-center' style={{padding: '8px 0'}}>
                        <div>
                            <IconButton onClick={()=>{changeMonth(-1)}}>
                                <ChevronLeftRoundedIcon />
                            </IconButton>
                        </div>
                        <div><span>{moment(`${moment().year()}-${monthCount}-1`).format('MMM, yyyy')}</span></div>
                        <div>
                            <IconButton onClick={()=>{changeMonth(1)}}>
                                <ChevronRightRoundedIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div className='w-100 row' style={{ marginLeft: 0 }}>
                        {
                            Object.values(weekDays).map((weekDay) => {
                                return (
                                    <div className='weekColCont'>
                                        <div className='weekCol'>
                                            {weekDay.slice(0, 3)}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w-100 d-flex flex-wrap'>
                        {
                            Object.values(calcDays()).map((date: any, ind: number) => {

                                return (
                                    <div className='d-flex flex-column weekColCont align-items-center' style={{ height: 50 }}>
                                        <div className='weekCol w-100 h-100'>
                                            <span>{date?.dateNo}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </HideablePanel>
            <RippleButton onClick={() => { setShow(true) }} style={{ padding: '10px 14px' }}>
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