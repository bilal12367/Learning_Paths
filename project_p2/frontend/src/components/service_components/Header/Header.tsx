
import React, { CSSProperties, ReactNode, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { IRootState } from '../../../store/store'
import DiscordLogoWhite from '../../../assets/images/discord-white-logo.png'
import DiscordLogoPrimary from '../../../assets/images/discord_logo_blue.png'
import { Outlet, useLocation } from 'react-router-dom'
import './Header.css'
import Link_Selector from './Link_Selector'
import isAuthPage from '../../../hooks/LoginPageDetector.hook'
interface IHeaderProps { children?: ReactNode, styles?: CSSProperties }


const Header = (props: IHeaderProps) => {
    const isAuthPg = isAuthPage()
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
            path: '/auth'
        },
    ]
    return (
        <div className='w-100 d-flex flex-row justify-content-between align-items-center'
            style={{
                backgroundColor: isAuthPg ? 'transparent' : theme.colors.primary,
                padding: theme.padding.std,
                transition: 'background-color 0.4s ease-in-out',
                zIndex: 999,
                ...props.styles
            }}
        >
            <div>
                <img height={'36'} src={isAuthPg ? DiscordLogoPrimary : DiscordLogoWhite} />
                <span style={{ paddingLeft: '1rem', fontFamily: theme.typography.f1, fontSize: theme.typography.heading.h4, color: isAuthPg ? theme.colors.primary : theme.colors.g1 }}>Discord.me</span>
            </div>
            <Link_Selector linkStyle={{fontSize: 16, sliderOffset: 30, sliderWidth: 100}} links={links} />
        </div>
    )
}

export default Header