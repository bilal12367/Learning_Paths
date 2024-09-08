import React, { createRef, useEffect } from 'react'
import useClickedOutside from '../../hooks/useClickedOutside';
import '../styles.css'
interface HideablePanelProps {
    children: React.ReactNode,
    show: Boolean,
    onDismiss: () => void
}

const HideablePanel = (props: HideablePanelProps) => {
    const divRef: React.RefObject<HTMLDivElement> = createRef();

    const handleClickOutOfDiv = () => {
        props.onDismiss()
        if (divRef.current && divRef.current?.classList.contains("fadeIn")) {
            divRef.current.classList.remove("fadeIn")
            divRef.current.classList.add("fadeOut")
            divRef.current.style.pointerEvents = 'none'
        }
    }

    useEffect(() => {
        if (divRef.current) {
            // divRef.current.style.opacity = "0";
            divRef.current.classList.add("fadeOut")
            divRef.current.classList.remove("fadeIn")
        }
    }, [])

    useEffect(() => {
        if (props.show == true && divRef.current) {
            divRef.current.classList.add("fadeIn")
            divRef.current.classList.remove("fadeOut")
            divRef.current.style.pointerEvents = 'all'
        } else {
            handleClickOutOfDiv()
        }
    }, [props.show])

    useClickedOutside(divRef, handleClickOutOfDiv)

    return (
        <div ref={divRef} style={{ position: 'absolute', width: '100%' }}>
            <div className='card'>
                {props.children}
            </div>
        </div>
    )
}


export default HideablePanel