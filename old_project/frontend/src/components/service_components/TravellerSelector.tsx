import React, { useState } from 'react'
import HideablePanel from '../ui_components/HideablePanel'
import RippleButton from '../ui_components/RippleButton'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const TravellerSelector = () => {
    const [show, setShow] = useState(false)
    return (
        <div className='d-flex position-relative'>
            <HideablePanel show={show} onDismiss={() => { setShow(false) }}>
                <div style={{ width: 700, borderRadius: 6, height: 500, backgroundColor: 'white' }}>

                </div>
            </HideablePanel>
            <RippleButton className='border' onClick={()=>{setShow(true)}} style={{padding: '10px 14px'}}>
                <div className='d-flex flex-column'>
                    <div className='d-flex'>Travellers & Class <KeyboardArrowDownRoundedIcon color='primary' /> </div>
                    <div className='d-flex flex-row align-items-end time-row'><span style={{ fontSize: 40, fontWeight: 'bold' }}>1</span><span style={{ fontSize: 20, marginLeft: 10, marginBottom: 10, fontWeight: 'bold' }}> Trvaeller </span></div>
                    <div>Economy / Premium Economy</div>
                </div>
            </RippleButton>
        </div>
    )
}

export default TravellerSelector