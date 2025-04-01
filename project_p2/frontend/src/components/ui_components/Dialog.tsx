import React, { useEffect, useState } from 'react'

interface IDialogProps {
    size: number,
    children: React.ReactNode,
    show: boolean,
    onDisable: () => void
}

const Dialog = (props: IDialogProps) => {
    const [zInd, setzInd] = useState(-999);
    useEffect(() => {
        setZIndex()
    }, [props.show])
    useEffect(() => {
        setZIndex()
    }, [])
    const setZIndex = () => {
        if (!props.show) {
            setTimeout(() => {
                setzInd(-999)
            }, 200)
        } else {
            setzInd(999)
        }
    }
    return (
        <div
            className={'d-flex flex-column justify-content-center align-items-center backdrop'}
            style={{
                backgroundColor: props.show ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0)',
                zIndex: zInd
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    props.onDisable();
                }
            }}
        >
            <div
                className={'d-flex flex-column dialog-box db'}
                style={{ width: props.size, scale: props.show ? '1' : '0' }}
            >
                {props.children}
            </div>
        </div>
    )
}

export default Dialog