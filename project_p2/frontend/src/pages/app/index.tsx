import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './app.css'

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useSelector } from 'react-redux';
import Selectors from '../../store/Selectors';
import { faker } from '@faker-js/faker'
import Input from '../../components/ui_components/Input';
import { ButtonBase, IconButton, Input as MuiInput, Snackbar, TextField } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SideNav from './dashboard/SideNav';
import { useLazyLogoutQuery } from '../../store/features/AuthFeature/AuthApi';

const Index = () => {
  const nav = useNavigate()
  const theme = useSelector(Selectors.selectTheme);

  const [logoutApi, logoutResp] = useLazyLogoutQuery()
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]


  const logout = () => {
    logoutApi()
  }

  useEffect(() => {
    if (logoutResp.isSuccess)
      nav('/home')
  }, [logoutResp])

  return (
    <React.Fragment>
      <div className='d-flex app-root-cont vh-100 overflow-hidden'>
        

        <SideNav />
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
              <ButtonBase onClick={logout}>
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