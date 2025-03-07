import { IconButton, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { CSSProperties, HTMLInputTypeAttribute, useState } from "react";
import { useSelector } from "react-redux";
import Selectors from "../../store/Selectors";
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

interface InputProps {
    name?: string,
    iconColor?: string,
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; },
    containerStyle?: CSSProperties,
    type: HTMLInputTypeAttribute,
    inputStyle?: CSSProperties,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    fullWidth?: boolean,
    value?: string,
    placeHolder?: string
}

const Input = (props: InputProps) => {
    const theme = useSelector(Selectors.selectTheme)
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className='position-relative' style={{ ...props.containerStyle }}>
            <div className='position-absolute h-100 d-flex flex-column justify-content-center' style={{ borderRight: '1px solid ' + theme.colors.g1, }} >
                {
                    props.type == 'password' ?
                        <IconButton onClick={() => { setShowPassword(!showPassword) }}>
                            {
                                showPassword ?
                                <VisibilityOffRoundedIcon style={{ color: 'var(--b1)' }} />:
                                <VisibilityRoundedIcon style={{ color: 'var(--b1)' }} /> 

                            }
                        </IconButton> :
                        <IconButton disableRipple={true}>
                            <props.icon style={{ color: 'var(--b1)' }} />
                        </IconButton>
                }
            </div>
            <input
                onChange={props.onChange}
                name={props.name || ''}
                value={props.value || undefined}
                placeholder={props.placeHolder}
                style={{ ...props.inputStyle }}
                className={'input_field ' + (props.fullWidth ? 'w-100' : '')}
                type={props.type == 'password' ? (showPassword ? 'text': 'password') : props.type}
            />
        </div>
    )
}

export default Input