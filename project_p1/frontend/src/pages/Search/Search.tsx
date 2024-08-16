import React, { createRef, Key, useEffect, useRef, useState } from 'react'
import './styles.css'
import { Button, ButtonBase, Color, FormControlLabel, Radio, RadioGroup, styled, useTheme } from '@mui/material'
import { SearchPageMenuItems } from '../../utils/Constants'
import { ISearchPageMenuItem } from '../../utils/types'
import LuggageRoundedIcon from '@mui/icons-material/LuggageRounded';
import { CheckBoxRounded } from '@mui/icons-material'
const Search = () => {
    const theme = useTheme();
    const [selectedCategory, setSelectedCategory] = useState<ISearchPageMenuItem>();
    const indicatorRef: React.RefObject<HTMLDivElement> = createRef();
    useEffect(() => {
        setSelectedCategory(SearchPageMenuItems[0])
        if (indicatorRef.current) {
            indicatorRef.current.style.left = 'calc(14.285 * 0%)';
        }
    }, [])

    useEffect(() => {
        if (indicatorRef.current) {
            indicatorRef.current.style.left = 'calc(14.285 *' + selectedCategory?.index + '%)'
        }
    }, [selectedCategory])


    const handleCategorySelected = (selectedItem: ISearchPageMenuItem): void => {
        setSelectedCategory(selectedItem)
    }

    const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
        '& .MuiTouchRipple-root': {
            color: 'rgba(0,0,0,0.4)'
        }
    }))

    return (
        <div className='w-100 d-flex flex-column'>
            <div className='bg-img'>
                <img style={{ height: 600, width: '100%' }} src='https://imgak.mmtcdn.com/pwa_v3/pwa_commons_assets/desktop/bg3.jpg' />
            </div>
            <div className='std-padding'>
                <div className='header'>
                    {/* <LuggageRoundedIcon /> */}
                </div>

                <div className='w-100 d-flex search-cont' >

                    <div style={{ padding: '50px 34px' }} >
                        <RadioGroup
                            defaultValue="male"
                            name="radio-buttons-group"
                            className='d-flex flex-row'
                        >
                            <FormControlLabel value="female" control={<Radio />} label="One Way" />
                            <FormControlLabel value="male" control={<Radio />} label="Round Trip" />
                            <FormControlLabel value="other" control={<Radio />} label="Multi Way Trip" />
                        </RadioGroup>

                        <div className='w-100 d-flex flex-row border' style={{ borderRadius: 16, overflow: 'clip' }}>
                            <StyledButtonBase className='border' style={{ padding: '10px 14px' }}>
                                <div className='from d-flex flex-column align-items-start '>
                                    <span>From</span>
                                    <span style={{ fontSize: 30, fontWeight: 'bold' }}>Delhi</span>
                                    <span>DEL, Central Airport</span>
                                </div>
                            </StyledButtonBase>
                            <StyledButtonBase className='border' style={{ padding: '10px 14px' }}>
                                <div className='from d-flex flex-column align-items-start '>
                                    <span>To</span>
                                    <span style={{ fontSize: 30, fontWeight: 'bold' }}>Mumbai</span>
                                    <span>Chatrapati Sivaji, Mumbai Airport</span>
                                </div>
                            </StyledButtonBase>
                        </div>
                    </div>
                    <div className='w-100 d-flex justify-content-center position-absolute' >
                        <div className='shadow mb-5 bg-white rounded search-category-cont' >
                            <div className='category-item-cont'>
                                <div ref={indicatorRef} className='indicator'></div>
                                {Object.values(SearchPageMenuItems).map((item: ISearchPageMenuItem) => {

                                    const isSelf: boolean = item.index === selectedCategory?.index
                                    return (
                                        <StyledButtonBase key={item.name as Key} onClick={() => { handleCategorySelected(item) }} className='w-100' style={{ padding: '14px 0px' }}>
                                            <div className='d-flex flex-column  h-100  align-items-center'>
                                                <div>
                                                    <item.icon sx={{ fontSize: 25, color: isSelf ? theme.palette.primary.main : theme.palette.grey[600] }} />
                                                </div>
                                                <div style={{ width: 100, fontSize: 12, lineHeight: 1.1, letterSpacing: 1, marginTop: 10, color: isSelf ? theme.palette.primary.main : 'black' }}>
                                                    {item.name}
                                                </div>
                                            </div>
                                        </StyledButtonBase>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Search