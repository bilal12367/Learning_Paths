
import React, { CSSProperties, ReactNode, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { IRootState } from '../../../store/store'
import DiscordLogoWhite from '../../../assets/images/discord-white-logo.png'
import DiscordLogoPrimary from '../../../assets/images/discord_logo_blue.png'
import { Outlet, useLocation } from 'react-router-dom'
import './Header.css'
import Link_Selector from './Link_Selector'
import isLoginPage from '../../../hooks/LoginPageDetector.hook'
interface IHeaderProps { children?: ReactNode, styles?: CSSProperties }


const Header = (props: IHeaderProps) => {
    const isLoginpg = isLoginPage()
    const theme = useSelector((state: IRootState) => state.theme)
    const links = [
        {
            title: 'Home',
            path: '/home'
        },
        {
            title: 'Download',
            path: '/download'
        },
        {
            title: 'Servers',
            path: '/servers'
        },
        {
            title: 'About Us',
            path: '/aboutus'
        },
        {
            title: 'Login',
            path: '/login'
        },
    ]

    return (
        <div className='w-100 d-flex flex-row justify-content-between align-items-center'
            style={{
                backgroundColor: isLoginpg ? 'transparent' : theme.colors.primary,
                padding: theme.padding.std,
                transition: 'background-color 0.4s ease-in-out',
                zIndex: 999,
                ...props.styles
            }}
        >
            <div>
                <img height={'36'} src={isLoginpg ? DiscordLogoPrimary : DiscordLogoWhite} />
                <span style={{ paddingLeft: '1rem', fontFamily: theme.typography.f1, fontSize: theme.typography.heading.h4, color: isLoginpg ? theme.colors.primary : theme.colors.g1 }}>Discord.me</span>
            </div>
            <Link_Selector links={links} />
        </div>
    )
}

export default Header