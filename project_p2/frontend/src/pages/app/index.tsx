import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import './app.css'

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Tooltip from '../../components/ui_components/Tooltip';
import MarkUnreadChatAltRoundedIcon from '@mui/icons-material/MarkUnreadChatAltRounded';
import Org1Logo from '../../assets/images/org1.jpg'
import Org2Logo from '../../assets/images/org2.jpg'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useSelector } from 'react-redux';
import Selectors from '../../store/Selectors';
import { faker } from '@faker-js/faker'
import Input from '../../components/ui_components/Input';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { Alert, Button, ButtonBase, DialogContent, IconButton, Input as MuiInput, Snackbar, TextField } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import Text from '../../components/ui_components/Text';
import CreateServerIcon from '../../assets/images/CreateServer.svg'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Slider from '../../components/ui_components/Slider';
import Dialog from '../../components/ui_components/Dialog';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useCreateServerMutation } from '../../store/features/ServerFeature/ServerApi';

const Index = () => {
  const theme = useSelector(Selectors.selectTheme);
  const [showDialog, setShowDialog] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [createServerApi, createServerApiState] = useCreateServerMutation()
  const [dialogPage, setDialogPage] = useState(0)
  const [showToast, setShowToast] = useState(false)
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

  const createServer = () => {
    createServerApi({ server_name: 'Test2', server_logo: 124 })
  }

  useEffect(() => {
    if (createServerApiState.isSuccess) {
      setShowToast(true)
      setShowDialog(false)
      setDialogPage(0)
    }
  }, [createServerApiState])

  return (
    <React.Fragment>
      <div className='d-flex app-root-cont vh-100 overflow-hidden'>
        <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={showToast} autoHideDuration={6000}>
          <Alert
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Server Created Successfully!!
          </Alert>
        </Snackbar>
        <Dialog size={500} show={showDialog} onDisable={() => { setShowDialog(false); setCurrentPage(0); }}>
          <div className='h-100 w-100 d-flex flex-column p-2'>
            <Slider currentPage={currentPage}>
              <div className='d-flex h-100 flex-column'>
                <div className='w-100 d-flex flex-column align-items-center'>
                  <Text fontStyle={{ fontSize: 20, fontWeight: 'bold' }}>Create Your Own Server</Text>
                  <Text fontStyle={{ fontSize: 15, textAlign: 'center' }}>Your server is where you and your friends hang out.
                    Make yours and start talking.</Text>

                </div>
                <hr />
                <ButtonBase onClick={() => { setCurrentPage(1) }} className='w-100 d-flex flex-row justify-content-between h-100 p-3 tile border' style={{ borderRadius: 10, overflow: 'hidden' }}>
                  <div>
                    <img src={CreateServerIcon} alt="Create Server" />
                    <Text fontStyle={{ marginLeft: 14, fontSize: 20, fontWeight: 'bold' }}>Create Own Server</Text>
                  </div>


                  < ChevronRightRoundedIcon fontSize={'medium'} />
                </ButtonBase>
              </div>
              <div className='d-flex h-100 flex-column'>
                <div className='d-flex flex-column align-items-center'>
                  <Text fontStyle={{ fontSize: 20, fontWeight: 'bold' }}>Customize your Server</Text>
                  <Text fontStyle={{ fontSize: 15, textAlign: 'center', width: '80%' }}>Give your new server some personality with a name and an icon. You can always change it later.</Text>
                  <div className='position-relative' style={{ padding: 20, marginTop: 20, border: ('3px dashed' + theme.colors.g2), borderRadius: '50%' }}>
                    <div className='d-flex position-absolute' style={{ top: -5, right: -5 }}>
                      <IconButton style={{ padding: 3, backgroundColor: theme.colors.primary, overflow: 'hidden', borderRadius: '50%' }}>
                        <AddRoundedIcon sx={{ color: 'white', fontSize: 18 }} />
                      </IconButton>
                    </div>
                    <CameraAltRoundedIcon sx={{ fontSize: 30, color: theme.colors.g2 }} />
                  </div>
                  <div style={{ padding: '0 10px', width: '100%' }} >
                    <TextField className='w-100 mt-3' variant='filled' placeholder='Name your Server' label="Server Name" />
                  </div>
                  <div className='d-flex mt-3 w-100 flex-row justify-content-between'>
                    <Button onClick={() => { setCurrentPage(0) }} variant='text'>
                      Back
                    </Button>
                    <Button onClick={createServer} variant='contained'>
                      Create
                    </Button>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </Dialog>
        {/* <Dialog maxWidth={'xs'} className='d-flex w-100 flex-column' open={showDialog} onClose={() => { setShowDialog(false) }}>

          <div className='h-100 w-100 d-flex flex-column p-2'>
            <div className='w-100 d-flex flex-column align-items-center'>
              <Text fontStyle={{ fontSize: 20, fontWeight: 'bold' }}>Create Your Own Server</Text>
              <Text fontStyle={{ fontSize: 15, textAlign: 'center' }}>Your server is where you and your friends hang out.
                Make yours and start talking.</Text>

            </div>
            <hr />
            <ButtonBase className='w-100 d-flex flex-row justify-content-between h-100 p-3 tile border' style={{ borderRadius: 10, overflow: 'hidden' }}>
              <div>
                <img src={CreateServerIcon} alt="Create Server" />
                <Text fontStyle={{ marginLeft: 14, fontSize: 20, fontWeight: 'bold' }}>Create Own Server</Text>
              </div>


              < ChevronRightRoundedIcon fontSize={'medium'} />
            </ButtonBase>

          </div>



        </Dialog> */}
        <div className='side-nav'>
          <div className='d-flex h-100 flex-column justify-content-between' style={{ padding: '0 4px 20px 4px', flexGrow: 1 }}>
            <div className='d-flex flex-column server-list'>
              <Tooltip text={'Personal Messages'}>
                <div className='item d-flex align-items-center'>
                  <MarkUnreadChatAltRoundedIcon fontSize='medium' />
                </div>
              </Tooltip>
              <hr />
              <Tooltip text="Assassin's Creed">
                <div className='d-flex w-100 justify-content-center'>
                  <div className='side-nav-tile'>
                    <img height={'50px'} src={Org1Logo} />
                  </div>
                </div>
              </Tooltip>
              <Tooltip text="Templars">
                <div className='d-flex w-100 justify-content-center'>
                  <div className='side-nav-tile'>
                    <img className='tile-img' src={Org2Logo} />
                  </div>
                </div>
              </Tooltip>
              <Tooltip text="Create Server" >
                <div className='d-flex w-100 justify-content-center'>
                  <div className='side-nav-title'>
                    <ButtonBase onClick={() => { setShowDialog(true) }} style={{ padding: 10, borderRadius: 8, backgroundColor: theme.colors.g1 }}>
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
        <div className='chat-list-section d-flex flex-column'>
          <div className='search-cont'>
            <Input
              icon={SearchRoundedIcon}
              iconColor={theme.colors.g2}
              type='text'
              inputStyle={{
                backgroundColor: theme.colors.g1,
                width: '100%',
                caretColor: theme.colors.g2,
                padding: '6px 8px 6px 0px',
                borderRadius: '20px'
              }}
            />
          </div>
          <hr className='m-0' />
          <div className='chat-list d-flex flex-column'>
            {
              Object.values(list).map(chat => {

                // return (
                //   <div className='d-flex flex-row w-100'>
                //     <ButtonBase className='d-flex w-100 chat-item justify-content-start'>
                //       <img src={faker.image.avatar()} />
                //       <div className='d-flex flex-column align-items-start'>
                //         <span>{faker.person.fullName()}</span>
                //         <span style={{ textAlign: 'left' }}>{faker.lorem.sentence()}</span>
                //       </div>
                //     </ButtonBase>
                //   </div>
                // )

                return (
                  <ButtonBase className='d-flex channel-item w-100 align-items-center justify-content-start' key={chat}>
                    <TagIcon style={{ color: theme.colors.g2 }} />
                    <div>
                      <span>{faker.hacker.adjective() + ' ' + faker.hacker.noun()}</span>
                    </div>
                  </ButtonBase>
                );
              })
            }
          </div>
        </div>
        <div className='chat-section d-flex flex-column'>
          <div className='chat-header d-flex justify-content-between w-100 align-items-center'>
            <div className='d-flex'>
              <TagIcon style={{ fontSize: 30, color: theme.colors.g2 }} />
              <span>{faker.hacker.adjective() + ' ' + faker.hacker.noun()}</span>
            </div>

            <div className='d-flex'>
              <ButtonBase onClick={() => { console.log("Logout") }}>
                <LogoutRoundedIcon sx={{ colo: theme.colors.g1 }} />
              </ButtonBase>
            </div>
          </div>

          <div className='chat-message-section'>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((message) => {
              return (
                <div className='d-flex chat-message' key={message}>
                  <img height={40} src={faker.image.avatar()} />
                  <div className='msg d-flex flex-column'>
                    <span>{faker.lorem.sentence()}</span>
                    <span>{faker.lorem.sentence()}</span>
                    <span>{faker.lorem.sentence()}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div >
    </React.Fragment >
  )
}

export default Index