import { ISearchPageMenuItem } from "./types"

import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoffRounded';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWorkRounded';
import BeachAccessIcon from '@mui/icons-material/BeachAccessRounded';
import DirectionsTransitRoundedIcon from '@mui/icons-material/DirectionsTransitRounded';
import DirectionsBusRoundedIcon from '@mui/icons-material/DirectionsBusRounded';
import LocalTaxiRoundedIcon from '@mui/icons-material/LocalTaxiRounded';
import LuggageRoundedIcon from '@mui/icons-material/LuggageRounded';

const APP_ROUTES = {
    LANDING: '/',
    SEARCH: '/search'
}


const APP_SLICES = {
    AUTH: 'Auth_Slice'
}

const APP_API_ROUTES = {
    AUTH_API: {
        reducerPath: 'Auth_Api_Reducer_Path',
        baseQuery: 'https://reqres.in/api/',
        endpoints: {
            REGISTER: 'register'
        }
    }
}



const SearchPageMenuItems: ISearchPageMenuItem[] = [
    {
        index: 0,
        id: "flights",
        name: "Flights",
        icon: FlightTakeoffIcon,
    },
    {
        index: 1,
        id: "hotels",
        name: "Hotels",
        icon: MapsHomeWorkIcon,
    },
    {
        index: 2,
        id: "holiday_packages",
        name: "Holiday Packages",
        icon: BeachAccessIcon,
    },
    {
        index: 3,
        id: "trains",
        name: "Trains",
        icon: DirectionsTransitRoundedIcon,
    },
    {
        index: 4,
        id: "buses",
        name: "Buses",
        icon: DirectionsBusRoundedIcon,
    },
    {
        index: 5,
        id: "cabs",
        name: "Cabs",
        icon: LocalTaxiRoundedIcon,
    },
    {
        index: 6,
        id: "travel_insurance",
        name: "Travel Insurance",
        icon: LuggageRoundedIcon,
    },
    
]

export { APP_ROUTES, APP_SLICES, APP_API_ROUTES, SearchPageMenuItems }