import React from 'react'
import { Outlet } from 'react-router-dom'
import './app.css'

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Tooltip from '../../components/ui_components/Tooltip';
import MarkUnreadChatAltRoundedIcon from '@mui/icons-material/MarkUnreadChatAltRounded';
import Org1Logo from '../../assets/images/org1.jpg'
import Org2Logo from '../../assets/images/org2.jpg'
import Input from '../../components/ui_components/Input';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useSelector } from 'react-redux';
import Selectors from '../../store/Selectors';
import {faker} from '@faker-js/faker'


const Index = () => {
  const theme = useSelector(Selectors.selectTheme);
  const list = [1,2,3,4,5,6,7,8]
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
                padding: '6px 8px 6px 40px',
                borderRadius: '20px'
              }}
            />
            <hr />
            {
              Object.values(list).map(chat => {
                return (
                  <div className='d-flex' key={chat}>
                    <img style={{borderRadius: '50%'}} height={50} src={faker.image.avatar()} />
                    <div className='d-flex flex-column'>
                    <span>{faker.person.fullName()}</span>
                    <span>{faker.lorem.sentence()}</span>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div >
        </div>
      </div>
    </React.Fragment> 
  )
}

export default Index