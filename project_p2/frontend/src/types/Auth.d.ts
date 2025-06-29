interface IFormState {
  alert: {
    show: boolean,
    type: 'success' | 'error',
    message: string,
    onClose?: () => void
  },
  formErrors: {
    email?: string,
    username?: string,
    password?: string,
    confirm_password?: string,
    dob?: string
  },
  formDisable: boolean
}