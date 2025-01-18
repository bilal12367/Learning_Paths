
import React, { CSSProperties, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { IRootState } from '../../store/store'
import DiscordLogo from '../../assets/images/discord-white-logo.png'
import { Outlet } from 'react-router-dom'

interface IHeaderProps { children?: ReactNode, styles?: CSSProperties }


const Header = (props: IHeaderProps) => {
    const theme = useSelector((state: IRootState) => state.theme)
    return (
        <div className='w-100 d-flex flex-row justify-content-between align-items-center'
            style={{
                backgroundColor: theme.colors.primary,
                padding: theme.padding.std
            }}
        >
            <div>
                <img height={'36'} src={DiscordLogo} />
                <span style={{ paddingLeft: '1rem', fontFamily: theme.typography.f1, fontSize: theme.typography.heading.h4, color: theme.colors.g1 }}>Discord.me</span>
            </div>
            <div className='d-flex flex-row'>
            <span style={{ paddingLeft: '2rem', fontWeight: theme.typography., fontFamily: theme.typography.f2, fontSize: theme.typography.heading.h6, color: theme.colors.g1 }}>Home</span>
            <span style={{ paddingLeft: '2rem', fontWeight: theme.typography., fontFamily: theme.typography.f2, fontSize: theme.typography.heading.h6, color: theme.colors.g1 }}>Download</span>
            <span style={{ paddingLeft: '2rem', fontWeight: theme.typography., fontFamily: theme.typography.f2, fontSize: theme.typography.heading.h6, color: theme.colors.g1 }}>Servers</span>
            <span style={{ paddingLeft: '2rem', fontWeight: theme.typography., fontFamily: theme.typography.f2, fontSize: theme.typography.heading.h6, color: theme.colors.g1 }}>About Us</span>
            <span style={{ paddingLeft: '2rem', fontWeight: theme.typography., fontFamily: theme.typography.f2, fontSize: theme.typography.heading.h6, color: theme.colors.g1 }}>Login</span>
            </div>
        </div>
    )
}

export default Header