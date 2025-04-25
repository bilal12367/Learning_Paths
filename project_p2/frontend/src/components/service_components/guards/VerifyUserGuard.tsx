import React, { useEffect, useState } from 'react'
import { useLazyVerifyUserQuery } from '../../../store/features/AuthFeature/AuthApi'
import { useLocation, useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { useSelector } from 'react-redux'
import Selectors from '../../../store/Selectors'

interface VerifyUserGuard {
    children: React.ReactElement,
    pageType: 'AUTH' | 'APP'
}

export const VerifyUserGuard = (props: VerifyUserGuard) => {
    const nav = useNavigate()
    const location = useLocation()
    const [verifyUser, verifyUserState] = useLazyVerifyUserQuery({})
    const authState = useSelector(Selectors.selectAuth)

    useEffect(() => {
        verifyUser({})
    }, [])

    useEffect(() => {
        if (authState.userState == 'LOGGED_IN' && props.pageType == 'AUTH') {
            nav('/app')
        } else if(authState.userState == 'LOGGED_OUT' && props.pageType == 'APP') {
            nav('/home')
        }
    }, [authState])

    if ((authState.userState == 'LOGGED_IN' && props.pageType == 'APP') || (authState.userState == 'LOGGED_OUT' && props.pageType == 'AUTH')) {
        return props.children
    } else {
        return (
            <div className='w-100 vh-100 d-flex flex-column justify-content-center align-items-center'>
                <CircularProgress />
                <span className='mt-5' style={{ font: 'calibri' }}>Please wait Loading</span>
                <span>{JSON.stringify(authState)}</span>
                <span>{JSON.stringify(props.pageType)}</span>
            </div>
        )
    }
}
