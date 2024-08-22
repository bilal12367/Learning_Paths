import React, { createRef, Key, useEffect, useRef, useState } from 'react'
import './styles.css'
import { Button, ButtonBase, Color, FormControlLabel, Radio, RadioGroup, styled, useTheme } from '@mui/material'
import { SearchPageMenuItems } from '../../utils/Constants'
import { ISearchPageMenuItem } from '../../utils/types'
import useClickedOutside from '../../hooks/useClickedOutside'
import HideablePanel from '../../components/HideablePanel'



const Search = () => {
    const [showCont, setShowCont] = useState<Boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<ISearchPageMenuItem>();
    const indicatorRef: React.RefObject<HTMLDivElement> = createRef();
    const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
        '& .MuiTouchRipple-root': {
            color: 'rgba(0,0,0,0.4)'
        }
    }))
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
                    {/* Switches the content when the search category changes. */}
                    {/* Add Routing logic to switch */}
                    <div style={{ padding: '50px 34px' }} >
                        <RadioGroup
                            defaultValue="one-way"
                            name="radio-buttons-group"
                            className='d-flex flex-row'
                        >
                            <FormControlLabel value="one-way" control={<Radio />} label="One Way" />
                            <FormControlLabel value="round-trip" control={<Radio />} label="Round Trip" />
                            <FormControlLabel value="multi-way" control={<Radio />} label="Multi Way Trip" />
                        </RadioGroup>

                        <div className='w-100 d-flex flex-row border' style={{ borderRadius: 16 }}>
                            <div>
                                <div style={{ position: 'relative', minWidth: 230 }}>
                                    <HideablePanel show={showCont as Boolean} onDismiss={() => { setShowCont(false) }}>
                                        <div className='test'></div>
                                    </HideablePanel>
                                    <StyledButtonBase onClick={() => { setShowCont(true) }} className='border w-100 justify-content-start' style={{ padding: '10px 14px' }}>
                                        <div className='from d-flex flex-column align-items-start '>
                                            <span>From</span>
                                            <span style={{ fontSize: 30, fontWeight: 'bold' }}>Delhi</span>
                                            <span>DEL, Central Airport</span>
                                        </div>
                                    </StyledButtonBase>
                                </div>
                            </div>
                            <div>
                                <div style={{ position: 'relative', minWidth: 230 }}>
                                    {/* <div className='src-dropdwn-cont'></div> */}
                                    <StyledButtonBase className='border w-100 justify-content-start' style={{ padding: '10px 14px' }}>
                                        <div className='from d-flex flex-column align-items-start '>
                                            <span>To</span>
                                            <span style={{ fontSize: 30, fontWeight: 'bold' }}>Mumbai</span>
                                            <span>Chatrapati Sivaji, Mumbai Airport</span>
                                        </div>
                                    </StyledButtonBase>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actual Search Category Selector */}
                    <div className='w-100 d-flex justify-content-center position-absolute' >
                        <div className='shadow mb-5 bg-white rounded search-category-cont' >
                            <div className='category-item-cont'>
                                <div ref={indicatorRef} className='indicator'></div>
                                {
                                    Object.values(SearchPageMenuItems)
                                        .map((item: ISearchPageMenuItem) => SearchCategoryMenuItem(item, [selectedCategory, setSelectedCategory]))
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


const SearchCategoryMenuItem = (item: ISearchPageMenuItem, categoryState: [ISearchPageMenuItem | undefined, React.Dispatch<React.SetStateAction<ISearchPageMenuItem | undefined>>]) => {
    const [selectedCategory, setSelectedCategory] = categoryState;
    const theme = useTheme();
    const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
        '& .MuiTouchRipple-root': {
            color: 'rgba(0,0,0,0.4)'
        }
    }))

    const handleCategorySelected = (selectedItem: ISearchPageMenuItem): void => {
        setSelectedCategory(selectedItem)
    }
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
}

export default Search