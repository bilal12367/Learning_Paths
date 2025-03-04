import React, { CSSProperties, FormEvent, useEffect, useState } from 'react'
import Input from '../../components/ui_components/Input'
import { getGrad } from '../../store/features/Theme/Themes'
import { useSelector } from 'react-redux'
import Selectors from '../../store/Selectors'
import { useLoginApiMutation } from '../../store/features/AuthFeature/AuthApi'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { Alert, ButtonBase } from '@mui/material'


interface ILoginformDataState {
    email: string,
    password: string
}
const Login = () => {
    const theme = useSelector(Selectors.selectTheme)
    const authInfo = useSelector(Selectors.selectAuth)
    const styles: { [key: string]: CSSProperties } = {
        inputStyle: {
            background: getGrad(theme.colors.grad1, 300),
            boxShadow: theme.shadows.heavy,
            borderRadius: '8px',
            padding: '8px 0px 8px 55px'
        },
        submitBtnStyle: { borderRadius: 100, padding: '10px 46px', backgroundColor: theme.colors.secondary }
    }

    const [loginApi, loginApiState] = useLoginApiMutation();
    const [formState, setFormState] = useState<IFormState>({
        alert: { show: false, type: 'success', message: '' },
        formErrors: {},
        formDisable: false
    })
    const [formDataState, setformDataState] = useState<ILoginformDataState | {}>({
        email: 'test1@gmail.com',
        password: 'Test@1234'
    })

    const showAlert = (alertType: IFormState['alert'], delay: number = 3000) => {
        setFormState({
            ...formState,
            alert: alertType
        })
        setTimeout(() => {
            setFormState({ ...formState, alert: { show: false, type: 'success', message: '' } })
        }, delay)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setformDataState({ ...formDataState, [e.target.name]: e.target.value })
    }


    const submitLogin = (e: FormEvent) => {
        e.preventDefault()
        console.log("Triggered")
        loginApi(formDataState)
    }

    useEffect(() => {
        if (loginApiState.isError || loginApiState.isSuccess) {
            console.log("Register API change: ", loginApiState.data.message)
            showAlert({
                type: loginApiState.isSuccess ? 'success' : 'error',
                message: loginApiState.data.message,
                show: true
            })
        }
    }, [loginApiState])

    return (
        <form className='form d-flex flex-column mt-5' onSubmit={submitLogin} >
            {
                formState.alert.show &&
                <Alert severity={formState.alert.type} >
                    {formState.alert.message}
                </Alert>
            }
            <Input
                containerStyle={{ marginTop: 20 }}
                type='email'
                onChange={handleChange}
                icon={EmailRoundedIcon}
                name="email"
                fullWidth={true}
                placeHolder={"Enter Email: Eg. xyz@gmail.com"}
                inputStyle={styles.inputStyle}
            />
            <Input
                containerStyle={{ marginTop: 20 }}
                type='password'
                name="password"
                onChange={handleChange}
                icon={VisibilityRoundedIcon}
                fullWidth={true}
                placeHolder={"Enter Password"}
                inputStyle={styles.inputStyle}
            />
            <div className='d-flex flex-row justify-content-end mt-5'>
                <div className='submit-btn'>
                    <ButtonBase type='submit' style={styles.submitBtnStyle}>
                        <span>Submit</span>
                    </ButtonBase>
                </div>
            </div>
        </form>
    )
}

export default Login