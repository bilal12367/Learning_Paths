import React, { ReactNode, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Selectors from './store/Selectors'



const ThemeInit = (props: { children: ReactNode }) => {
    const [loading, setLoading] = useState(true)
    const theme: any = useSelector(Selectors.selectTheme)

    useEffect(() => {
        console.log(theme.colors)
        Object.keys(theme.colors).forEach((key: any) => {
            if (typeof (theme.colors[key]) == 'string') {
                document.documentElement.style.setProperty('--' + key, theme.colors[key])
                return
            }
            document.documentElement.style.setProperty('--' + key, theme.colors[key]())
        })
        setLoading(false)
    }, [])
    if(loading) {
        return (<React.Fragment>
            Loading ... 
        </React.Fragment>)
    } else {
        return (
            <React.Fragment>
                {props.children}
            </React.Fragment>
        )
    }
}

export default ThemeInit