import React, { useState } from 'react'
import './Ui_Component.css'

interface IToolTip {
    children: React.ReactNode,
    customTooltip?: React.ReactNode,
    text?: string
}

const Tooltip = (props: IToolTip) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className='tt-cont d-flex flex-column'>
            <div className={isHovered ? 'tt tt-show' : 'tt'}>
                <div className='d-flex ptr-cont h-100 flex-column justify-content-center'>
                    <div className='ptr'></div>
                </div>
                <div className='d-flex flex-column' style={{ padding: '8px 10px' }}>
                    {
                        props.text ? props.text : props.customTooltip
                    }
                </div>
            </div>
            <div
                onMouseEnter={() => { setIsHovered(true) }}
                onMouseLeave={() => { setIsHovered(false) }}
            >
                {props.children}
            </div>
        </div>
    )
}

export default Tooltip