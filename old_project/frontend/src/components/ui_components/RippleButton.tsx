import { ButtonBase, styled } from '@mui/material'
import React from 'react'

const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
    '& .MuiTouchRipple-root': {
        color: 'rgba(0,0,0,0.4)'
    }
}))

export default StyledButtonBase