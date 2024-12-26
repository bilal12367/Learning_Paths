import React, { createRef, Key, useCallback, useEffect, useRef, useState } from 'react'
import './styles.css'
import { Button, ButtonBase, Color, FormControlLabel, Input, Radio, RadioGroup, styled, TextField, useTheme } from '@mui/material'
import { SearchPageMenuItems } from '../../utils/Constants'
import { IAirportDetails, ISearchPageMenuItem } from '../../utils/types'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const Search = () => {
    const searchQuery = useSelector((state: RootState) => state.searchState)

    const navigate = useNavigate();
    const [selectedMenuCategory, setSelectedMenuCategory] = useState<ISearchPageMenuItem>();
    const indicatorRef: React.RefObject<HTMLDivElement> = createRef();


    useEffect(() => {
        setSelectedMenuCategory(SearchPageMenuItems[0])
        if (indicatorRef.current) {
            indicatorRef.current.style.left = 'calc(14.285 * 0%)';
        }
        navigate("/search/Flights")
    }, [])


    useEffect(() => {
        if (indicatorRef.current) {
            indicatorRef.current.style.left = 'calc(14.285 *' + selectedMenuCategory?.index + '%)'
        }
    }, [selectedMenuCategory])

    const search = () => {
        console.log(`Search Query:`)
        console.log(searchQuery)
        navigate(`../flights?from=${searchQuery.from}&to=${searchQuery.to}&travelDate=${searchQuery.travelDate}`)
    }


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
                    <div className='w-100' style={{ padding: '50px 34px' }} >
                        <Outlet />
                        {/* Some Fancy SVG  */}
                        {/* <div className='d-flex' style={{height: 100,position:'relative'}}>
                            <svg viewBox='0 0 120 120'>
                                <polygon points='0,0 20,0 60,60 20,120 0,120 40,60 0,0' fill='red'/>
                            </svg>
                            <svg viewBox='0 0 120 120' style={{position: 'absolute', height: '100%', left: 20}}>
                                <polygon points='0,0 5,0 45,60 5,120 0,120 40,60 0,0' fill='red'/>
                            </svg>
                        </div> */}
                    </div>

                    <div className='w-100 d-flex justify-content-center position-absolute' style={{ bottom: '-30px' }} >
                        <Button onClick={() => { search() }} variant="contained" style={{ padding: '15px 80px', borderRadius: 100 }}>
                            <span style={{ fontSize: 15, fontWeight: 'bold' }}>Search</span>
                        </Button>
                    </div>

                    {/* Actual Search Category Selector */}
                    <div className='w-100 d-flex justify-content-center position-absolute' >
                        <div className='shadow mb-5 bg-white rounded search-category-cont' >
                            <div className='category-item-cont'>
                                <div ref={indicatorRef} className='indicator'></div>
                                {
                                    Object.values(SearchPageMenuItems)
                                        .map((item: ISearchPageMenuItem) => SearchCategoryMenuItem(item, [selectedMenuCategory, setSelectedMenuCategory]))
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
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = categoryState;
    const theme = useTheme();
    const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
        '& .MuiTouchRipple-root': {
            color: 'rgba(0,0,0,0.4)'
        }
    }))

    const handleCategorySelected = (selectedItem: ISearchPageMenuItem): void => {
        navigate("/search/" + selectedItem.name.split(" ")[0])
        // navigate("/")
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