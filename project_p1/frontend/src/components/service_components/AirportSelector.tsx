import React, { useState } from 'react'
import HideablePanel from '../ui_components/HideablePanel'
import RippleButton from '../ui_components/RippleButton'
import { IAirportDetails } from '../../utils/types'
import AirportSearchApi from '../../redux/rtk_query/AirportApi'
import useDebounce from '../../hooks/useDebounce'
import '../styles.css'
interface IAirportSelectorProps {
    selectedAirport: IAirportDetails,
    onSelectionChange: (selectedAirport: IAirportDetails) => void,
    label: String
}

const AirportSelector = (props: IAirportSelectorProps) => {
    const [searchAirports, airportResult, lastInfo] = AirportSearchApi.useLazyAirportSearchQuery();
    const [showFromCont, setShowFromCont] = useState<Boolean>(false);
    const [searchAirportTxt, setSearchAirportTxt] = useState<String>('');
    
    const handleDebounce = (value: String) => {
        searchAirports(value);
    }

    useDebounce({ value: searchAirportTxt, handler: handleDebounce });

    const hidePanel = () => { setShowFromCont(false); }

    return (
        <div className='h-100 d-flex' style={{ position: 'relative', minWidth: 230,height:'100%' }}>
            <HideablePanel show={showFromCont as Boolean} onDismiss={hidePanel}>
                <div className='fromSelector overflow-y-hidden'>
                    <div className='h-100' style={{ padding: 4 }}>
                        <input  onChange={(e) => { if (e.target.value.length != 0) setSearchAirportTxt(e.target.value) }} autoComplete='off' name='from-search' placeholder={props.label as string} />
                        <div className='h-100 d-flex flex-grow-1 overflow-y-scroll flex-column w-100'>
                            {
                                airportResult.isSuccess && !airportResult.isUninitialized &&
                                Object.values(airportResult.data).map((airport: IAirportDetails) => {
                                    return (
                                        <RippleButton onClick={() => { hidePanel(); props.onSelectionChange(airport); }} className='hover-highlight d-flex flex-column align-items-start p-1' key={airport._id}>
                                            <div className='fw-bold'>{airport.city} </div>
                                            <div className='fs-6'>{airport.name} </div>
                                        </RippleButton>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </HideablePanel>
            <RippleButton onClick={() => { setShowFromCont(true) }} className='border w-100 justify-content-start' style={{ padding: '10px 14px',position:'sticky',top: 0 }}>
                <div className='from d-flex flex-column justify-content-between align-items-start'>
                    <span data-testid="label">{props.label}</span>
                    <span data-testid="city" style={{ fontSize: 30, fontWeight: 'bold' }}>{props.selectedAirport.city}</span>
                    <span>{props.selectedAirport.name}</span>
                </div>
            </RippleButton>
        </div>
    )
}

export default AirportSelector