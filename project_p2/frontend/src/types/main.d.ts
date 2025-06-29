interface RegisterForm {
  email: string | null,
  password: string | null,
  confirm_password: string | null,
  username: string | null,
  dob: Date | null,
  agreement: boolean | null
}


interface IDialogManager {
  dialogType: 'CREATE_SERVER' | 'EDIT_SERVER' | 'NONE',
  isOpen: boolean,
  dialogProps: any
}