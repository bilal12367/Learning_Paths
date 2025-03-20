import React, { useEffect, useState } from 'react'
import { useLazyVerifyUserQuery } from '../../../store/features/AuthFeature/AuthApi'
import { useLocation, useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'

interface VerifyUserGuard {
    children: React.ReactElement,
    pageType: 'AUTH' | 'APP'
}

export const VerifyUserGuard = (props: VerifyUserGuard) => {
    const nav = useNavigate()
    const location = useLocation()
    const [verifyUser, verifyUserState] = useLazyVerifyUserQuery({})

    useEffect(() => {
        verifyUser({})
    }, [])
    useEffect(() => {
        
    }, [nav])
    useEffect(() => {
        if(!verifyUserState.isLoading) {
            verifyUser({})
        }
    
    }, [props.pageType])

    useEffect(() => {
        if (props.pageType == 'AUTH' && verifyUserState.isSuccess) {
            nav('../app')
        }
        if (props.pageType == 'APP' && verifyUserState.isError) {
            nav('../auth/login')
        }
    }, [verifyUserState, props.pageType])

    if ((props.pageType == 'AUTH' && verifyUserState.isError) || (props.pageType == 'APP' && verifyUserState.isSuccess)) {
        return props.children
    } else {
        return (
            <div className='w-100 vh-100 d-flex flex-column justify-content-center align-items-center'>
                <CircularProgress />
                <span className='mt-5' style={{ font: 'calibri' }}>Please wait Loading</span>
                <span>{JSON.stringify(verifyUserState)}</span>
                <span>{JSON.stringify(props.pageType)}</span>
            </div>
        )
    }
}
