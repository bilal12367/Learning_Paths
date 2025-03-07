import React from 'react'
import { Outlet } from 'react-router-dom'
import './app.css'

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Tooltip from '../../components/ui_components/Tooltip';
import MarkUnreadChatAltRoundedIcon from '@mui/icons-material/MarkUnreadChatAltRounded';
import Org1Logo from '../../assets/images/org1.jpg'
import Org2Logo from '../../assets/images/org2.jpg'

const index = () => {
  return (
    <React.Fragment>
      <div className='d-flex app-root-cont vh-100 overflow-hidden'>
        <div className='side-nav'>
          <div className='d-flex flex-column' style={{ padding: '0 4px' }}>
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
          </div>
        </div>
        <div >
        </div>
      </div>
    </React.Fragment>
  )
}

export default index