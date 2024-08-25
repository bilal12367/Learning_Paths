import React, { createRef, Key, useEffect, useRef, useState } from 'react'
import './styles.css'
import { Button, ButtonBase, Color, FormControlLabel, Input, Radio, RadioGroup, styled, TextField, useTheme } from '@mui/material'
import { SearchPageMenuItems } from '../../utils/Constants'
import { IAirportDetails, ISearchPageMenuItem } from '../../utils/types'
import useClickedOutside from '../../hooks/useClickedOutside'
import HideablePanel from '../../components/ui_components/HideablePanel'
import RippleButton from '../../components/ui_components/RippleButton'
import AirportSearchApi from '../../redux/rtk_query/AirportApi'
import useDebounce from '../../hooks/useDebounce'
import AirportSelector from '../../components/service_components/AirportSelector'


const Search = () => {
    const [selectedFromAirport, setSelectedFromAirport] = useState<IAirportDetails>({
        "_id": "66c81a96cb32d2b6a9c1d5f8",
        "icao": "K0M9",
        "iata": "",
        "name": "Delhi Municipal Airport",
        "city": "Delhi",
        "state": "Louisiana",
        "country": "US",
        "elevation": 91,
        "lat": 32.4107017517,
        "lon": -91.4987030029,
        "tz": "America/Chicago"
    });
    const [selectedToAirport, setSelectedToAirport] = useState<IAirportDetails>({
        "_id": "66c81a97cb32d2b6a9c20dcc",
        "icao": "VABB",
        "iata": "BOM",
        "name": "Chhatrapati Shivaji International Airport",
        "city": "Mumbai",
        "state": "Maharashtra",
        "country": "IN",
        "elevation": 37,
        "lat": 19.0886993408,
        "lon": 72.8678970337,
        "tz": "Asia/Kolkata"
      });
    const [selectedMenuCategory, setSelectedMenuCategory] = useState<ISearchPageMenuItem>();
    const indicatorRef: React.RefObject<HTMLDivElement> = createRef();


    useEffect(() => {
        setSelectedMenuCategory(SearchPageMenuItems[0])
        if (indicatorRef.current) {
            indicatorRef.current.style.left = 'calc(14.285 * 0%)';
        }
    }, [])


    useEffect(() => {
        if (indicatorRef.current) {
            indicatorRef.current.style.left = 'calc(14.285 *' + selectedMenuCategory?.index + '%)'
        }
    }, [selectedMenuCategory])


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
                        <RadioGroup
                            defaultValue="one-way"
                            name="radio-buttons-group"
                            className='d-flex flex-row'
                        >
                            <FormControlLabel value="one-way" control={<Radio />} label="One Way" />
                            <FormControlLabel value="round-trip" control={<Radio />} label="Round Trip" />
                            <FormControlLabel value="multi-way" control={<Radio />} label="Multi Way Trip" />
                        </RadioGroup>

                        <div className='w-100 d-flex flex-row'>
                            <AirportSelector label={"From"} selectedAirport={selectedFromAirport} onSelectionChange={(selectedAirport: IAirportDetails) => { setSelectedFromAirport(selectedAirport) }} />
                            <AirportSelector label={"To"} selectedAirport={selectedToAirport} onSelectionChange={(selectedAirport: IAirportDetails) => { setSelectedToAirport(selectedAirport) }} />
                        </div>
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