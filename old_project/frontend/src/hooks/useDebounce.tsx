import React, { useEffect } from 'react'

interface IUseDebounceProps{
    value: String,
    handler: (value: String) => void
}

const useDebounce = (props: IUseDebounceProps) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            props.handler(props.value)
        },500)
        return () =>  clearTimeout(timeout);
    },[props.value,500])
}

export default useDebounce