import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Selectors from '../../store/Selectors'
import CreateServerDialog from '../service_components/Dialog/CreateServerDialog'


interface IDialogManagerInterface {
    key: string
}

const DialogManager = () => {
    const dialogManagerState = useSelector(Selectors.selectDialogManager)

    return (
        <React.Fragment>
            {
                dialogManagerState.dialogType == 'CREATE_SERVER' &&
                <CreateServerDialog />
            }
            
        </React.Fragment>
    )
}

export default DialogManager