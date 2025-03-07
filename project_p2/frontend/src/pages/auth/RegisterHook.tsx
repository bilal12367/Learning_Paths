

import React, { FormEvent, useEffect, useState } from 'react'
import { useRegisterApiMutation } from '../../store/features/AuthFeature/AuthApi'
import { useSelector } from 'react-redux'
import { getGrad } from '../../store/features/Theme/Themes'
import { CSSProperties } from 'styled-components'
import Selectors from '../../store/Selectors'
import { useNavigate } from 'react-router-dom'

const useRegisterHook = () => {
    const nav = useNavigate()
    const [registerApi, registerApiState] = useRegisterApiMutation()
    const theme = useSelector(Selectors.selectTheme)
    const styles: { [key: string]: CSSProperties } = {
        inputStyle: {
            background: getGrad(theme.colors.grad1, 300),
            boxShadow: theme.shadows.heavy,
            borderRadius: '8px',
            padding: '8px 0px 8px 55px'
        },
        submitBtnStyle: { borderRadius: 100, padding: '10px 46px', backgroundColor: theme.colors.secondary }
    }

    const [formState, setFormState] = useState<IFormState>({
        alert: {
            show: false, type: 'success', message: ''
        },
        formErrors: {},
        formDisable: false
    });
    const [formDataState, setformDataState] = useState<RegisterForm | {}>({
        agreement: true,
        confirm_password: 'Test!321',
        dob: '2000-03-06',
        email: 'sk.bilal.md@gmail.com',
        password: 'Test!321',
        username: 'Test312'
    })

    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => { setformDataState({ ...formDataState, [e.target.name]: e.target.value }) }

    const registerUser = (e: FormEvent) => {
        e.preventDefault()
        console.log(formDataState)
        registerApi(formDataState)
    }

    const showAlert = (alertType: IFormState['alert'], delay: number = 3000) => {
        setFormState({
            ...formState,
            alert: alertType
        })
        setTimeout(() => {
            setFormState({ ...formState, alert: { show: false, type: 'success', message: '' } })
        }, delay)
    }

    useEffect(() => {
        if (registerApiState.isError || registerApiState.isSuccess) {
            console.log("Register API change: ", registerApiState)
            showAlert({
                type: registerApiState.isSuccess ? 'success' : 'error',
                message: registerApiState.data.message,
                show: true
            })
            if(registerApiState.isSuccess) {
                nav('../app/dashboard')
            }
        }
    }, [registerApiState])

    return { formState, onFormChange, styles, registerUser }
}

export default useRegisterHook