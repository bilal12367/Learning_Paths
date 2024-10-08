
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React, { useState } from 'react'
import AirportSelector from '../../../components/service_components/AirportSelector'
import DatePickler from '../../../components/service_components/DatePickler'
import { IAirportDetails } from '../../../utils/types'
import PassengerSelector from '../../../components/service_components/TravellerSelector'

const FlightSearch = () => {
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
    return (
        <div>
            <RadioGroup
                defaultValue="one-way"
                name="radio-buttons-group"
                className='d-flex flex-row'
            >
                <FormControlLabel value="one-way" control={<Radio />} label="One Way" />
                <FormControlLabel value="round-trip" control={<Radio />} label="Round Trip" />
                <FormControlLabel value="multi-way" control={<Radio />} label="Multi Way Trip" />
            </RadioGroup>

            <div className='w-100 d-flex'>
                <AirportSelector label={"From"} selectedAirport={selectedFromAirport} onSelectionChange={(selectedAirport: IAirportDetails) => { setSelectedFromAirport(selectedAirport) }} />
                <AirportSelector label={"To"} selectedAirport={selectedToAirport} onSelectionChange={(selectedAirport: IAirportDetails) => { setSelectedToAirport(selectedAirport) }} />
                <DatePickler />
                <DatePickler />
                <PassengerSelector />
            </div>
        </div>
    )
}

export default FlightSearch