import React, { useEffect, useState } from 'react'
import { Alert, Button, ButtonBase, IconButton, Snackbar, TextField } from '@mui/material';
import CreateServerIcon from '../../../assets/images/CreateServer.svg'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '../../ui_components/Slider';
import Dialog from '../../ui_components/Dialog';
import Actions from '../../../store/RootAction';
import Text from '../../ui_components/Text';
import Selectors from '../../../store/Selectors';
import { useCreateServerMutation } from '../../../store/features/ServerFeature/ServerApi';
import { useDeleteImageMutation, useUploadFileMutation } from '../../../store/features/FileFeature/FileApi';
import './Dialog.css';


const CreateServerDialog = () => {
  const dispatch = useDispatch()
  const [serverName, setServerName] = useState('')
  const [createServerApi, createServerApiState] = useCreateServerMutation()
  const dialogManagerState = useSelector(Selectors.selectDialogManager)
  const [uploadFile, uploadFileStatus] = useUploadFileMutation()
  const [deleteImage, deleteImageStatus] = useDeleteImageMutation()
  const theme = useSelector(Selectors.selectTheme)

  const [showToast, setShowToast] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(0)


  useEffect(() => {
    if (createServerApiState.isSuccess) {
      setShowToast(true)
      dispatch(Actions.dialogManagerActions.closeDialog());
      setCurrentPage(0)
    }
  }, [createServerApiState])


  useEffect(() => {
    if (uploadFileStatus.isLoading) {
      console.log("Uploading File")
    } else if (uploadFileStatus.isSuccess) {
      console.log("File Uploaded:", uploadFileStatus.data)
    }
  }, [uploadFileStatus])

  const createServer = () => {
    createServerApi({ server_name: serverName, server_logo: uploadFileStatus.data ? uploadFileStatus.data[0].id : '123' })
  }

  const selectImage = () => {
    if (!uploadFileStatus.isUninitialized && uploadFileStatus.data) {
      deleteImage(uploadFileStatus.data[0].id)
      uploadFileStatus.reset()
      return
    }
    const input: HTMLInputElement = document.createElement('input')
    input.id = 'File_Selector'
    input.type = 'file'
    input.multiple = false
    input.accept = 'image/*'
    input.onchange = (event: any) => {
      const file = event.target.files[0]
      const formData = new FormData()
      if (file) {
        formData.append('files', file)
        console.log("Selected File:", formData);
        uploadFile(formData)
        input.remove()
      }

    }
    input.click()

  }


  return (
    <Dialog size={500} show={dialogManagerState.isOpen} onDisable={() => { dispatch(Actions.dialogManagerActions.closeDialog()); setCurrentPage(0); }}>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={showToast} autoHideDuration={6000}>
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Server Created Successfully!!
        </Alert>
      </Snackbar>
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
              <div className='position-relative d-flex justify-content-center align-items-center' style={{ height: 80, width: 80, marginTop: 20, border: ('3px dashed' + theme.colors.g2), borderRadius: '50%' }}>
                <div className='d-flex position-absolute' style={{ top: -5, right: -5, zIndex: 4 }}>
                  <IconButton className='plus-btn' onClick={selectImage} style={{ padding: 3, backgroundColor: uploadFileStatus.isSuccess ? theme.colors.error : theme.colors.primary, overflow: 'hidden', borderRadius: '50%' }}>
                    <AddRoundedIcon className='plus-icon' style={{ color: 'white', fontSize: 18, transform: uploadFileStatus.isSuccess ? 'rotate(45deg)' : 'rotate(0deg)' }} />
                  </IconButton>
                </div>
                {
                  uploadFileStatus.isSuccess &&
                  <img style={{ zIndex: 3, position: 'absolute', objectFit: 'cover', borderRadius: '50%' }} height={'100%'} width={'100%'} src={'http://localhost:5000/file/image/' + uploadFileStatus.data[0].id} />

                }
                <CameraAltRoundedIcon sx={{ fontSize: 30, color: theme.colors.g2 }} />
              </div>
              <div style={{ padding: '0 10px', width: '100%' }} >
                <TextField className='w-100 mt-3' onChange={(e) => { setServerName(e.target.value) }} variant='filled' value={serverName} placeholder='Name your Server' label="Server Name" />
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
  )
}

export default CreateServerDialog