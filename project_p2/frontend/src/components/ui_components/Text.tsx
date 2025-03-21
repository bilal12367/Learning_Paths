import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import Selectors from '../../store/Selectors'
import { StyleSheet } from 'styled-components/dist/types'


const Text = ({ children, fontStyle }: { children: ReactNode, fontStyle: React.CSSProperties }) => {
    const { typography } = useSelector(Selectors.selectTheme)
    return (

        <span style={fontStyle}>{children}</span>

    )
}

export default Text