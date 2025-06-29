import React, { useEffect } from 'react'
import Tooltip from '../../../components/ui_components/Tooltip'
import { ButtonBase } from '@mui/material'
import MarkUnreadChatAltRoundedIcon from '@mui/icons-material/MarkUnreadChatAltRounded';
import Org1Logo from '../../../assets/images/org1.jpg'
import Org2Logo from '../../../assets/images/org2.jpg'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useDispatch, useSelector } from 'react-redux';
import Selectors from '../../../store/Selectors';
import { useGetJoinedServersQuery } from '../../../store/features/ServerFeature/ServerApi';
import Actions from '../../../store/RootAction';

const SideNav = () => {
    const theme = useSelector(Selectors.selectTheme);
    const joinedServersApi = useGetJoinedServersQuery()
    const dispatch = useDispatch()

    useEffect(() => {

    }, [joinedServersApi])

    return (
        <div className='side-nav'>
            <div className='d-flex h-100 flex-column justify-content-between' style={{ padding: '0 4px 20px 4px', flexGrow: 1 }}>
                <div className='d-flex flex-column server-list'>
                    <Tooltip text={'Personal Messages'}>
                        <div className='item d-flex align-items-center'>
                            <MarkUnreadChatAltRoundedIcon fontSize='medium' />
                        </div>
                    </Tooltip>
                    <hr />
                    {
                        joinedServersApi.isSuccess &&
                        joinedServersApi.data.map((server) => {
                            return (
                                <Tooltip key={server.id} text={server.server_name}>
                                    <div className='d-flex w-100 justify-content-center'>
                                        <div className='side-nav-tile'>
                                            {/* <img height={'50px'} src={Org1Logo} /> */}
                                            <img style={{ objectFit: 'cover' }} src={'http://localhost:5000/file/image/' + server.image} height={'50px'} width={'50px'} />
                                        </div>
                                    </div>
                                </Tooltip>
                            )
                        })
                    }
                    <Tooltip text="Create Server" >
                        <div className='d-flex w-100 justify-content-center'>
                            <div className='side-nav-title'>
                                <ButtonBase onClick={() => { dispatch(Actions.dialogManagerActions.loadDialog({ dialogProps: {}, isOpen: true, dialogType: 'CREATE_SERVER' })) }} style={{ padding: 10, borderRadius: 8, backgroundColor: theme.colors.g1 }}>
                                    <AddRoundedIcon style={{ color: theme.colors.primary, fontSize: 30 }} />
                                </ButtonBase>
                            </div>
                        </div>
                    </Tooltip>
                </div>
                <div className='w-100 d-flex justify-content-center'>
                    <ButtonBase style={{ borderRadius: '50%' }}>
                        <SettingsRoundedIcon color={'disabled'} fontSize='large' />
                    </ButtonBase>
                </div>
            </div>
        </div>
    )
}

export default SideNav