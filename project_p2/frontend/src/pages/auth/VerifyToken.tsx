import React, { useEffect } from 'react'
import { useVerifyTokenMutation } from '../../store/features/AuthFeature/AuthApi'

const VerifyToken = () => {
    const [verifyToken, verifyTokenInfo] = useVerifyTokenMutation()
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search)
        console.log("Query: ",queryParams)
        verifyToken({ token: queryParams.get("token") })
    }, [])
    return (
        <React.Fragment>
            <span>{JSON.stringify(verifyTokenInfo.data)}</span>
        </React.Fragment>
    )
}

export default VerifyToken