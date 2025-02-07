import React, { CSSProperties, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// This component has logic for selection of link with view style.
interface ILinkSelector {
    links: { title: string, path: string }[],
    linkStyle?: {
        fontSize: number,
        sliderWidth: number,
        sliderOffset: number,
    },
    selectedLink?: number,
    onLinkChange?: (selectedLink: number) => void
}

const Link_Selector = (props: ILinkSelector) => {
    const [state, setState] = useState(0)
    const nav = useNavigate()

    const navigateTo = useCallback((path: string) => {
        nav(path)
    }, [])

    return (
        <React.Fragment>
            {
                props.links.length > 0 &&
                <div className='d-flex flex-row links '>
                    <div className='link-slider' style={{ left: state, width: props.linkStyle?.sliderWidth || 100 }}>
                        <div className='slider' style={{ top: props.linkStyle?.sliderOffset }}></div>
                    </div>
                    {
                        Object.values(props.links).map((link, idx: number) =>
                            <span
                                key={link.title}
                                onClick={() => { setState((props.linkStyle?.sliderWidth || 100) * idx); navigateTo(link.path); props.onLinkChange?.(idx); }}
                                style={{ width: props.linkStyle?.sliderWidth, fontSize: props.linkStyle?.fontSize || 28 }}
                                className='link'>{link.title}</span>
                        )
                    }
                </div>
            }

        </React.Fragment>
    )
}

export default Link_Selector