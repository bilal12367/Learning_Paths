import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import isLoginPage from '../../../hooks/LoginPageDetector.hook'

// This component has logic for selection of link with view style.
interface ILinkSelector {
    links: { title: string, path: string }[]
}

const Link_Selector = (props: ILinkSelector) => {
    const [state, setState] = useState(0)
    const nav = useNavigate()

    const navigateTo = useCallback((path: string) => {
        nav(path)
    },[])

    return (
        <React.Fragment>
            {
                props.links.length > 0 &&
                <div className='d-flex flex-row links'>
                    <div className='link-slider' style={{ left: state }}>
                        <div className='slider'></div>
                    </div>
                    {
                        Object.values(props.links).map((link, idx: number) =>
                            <span 
                            key={link.title} 
                            onClick={() => { setState(100 * idx); navigateTo(link.path); }} 
                            className='link'>{link.title}</span>
                        )
                    }
                </div>
            }

        </React.Fragment>
    )
}

export default Link_Selector