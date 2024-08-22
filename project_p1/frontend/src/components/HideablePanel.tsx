import React, { createRef, useEffect } from 'react'
import useClickedOutside from '../hooks/useClickedOutside';
import './styles.css'
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
        console.log("props show", props.show)
        if (props.show == true && divRef.current) {
            divRef.current.classList.add("fadeIn")
            divRef.current.classList.remove("fadeOut")
            divRef.current.style.pointerEvents = 'all'
        }
    }, [props.show])

    useClickedOutside(divRef, handleClickOutOfDiv)

    return (
        <div ref={divRef} style={{ position: 'absolute', width: '100%'}}>
            {props.children}
        </div>
    )
}

export default HideablePanel