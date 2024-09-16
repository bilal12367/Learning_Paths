import AirportDetailsRespository from "../schema/AirportDetailsRespository"
import { findFlights } from "../util/data_init"
import { IAirportData, IFlightSchedule } from "../util/types/SchemaTypes"


interface ISearchService {
    searchAirport: (str: String) => Promise<IAirportData[]>
}

interface ISearchFlightsService {
    searchFlights: (origin: string, dest: string, dep_date: string) => Promise<IFlightSchedule[]>
}

const SearchService: ISearchService = {
    searchAirport: async (str: String) => {
        const airportList: IAirportData[] = await AirportDetailsRespository.find({
            city: {
                $regex: str,
                $options: 'i'
            }
        }).limit(10)

        return airportList
    }
}


const SearchFlightsService:  ISearchFlightsService = {
    searchFlights: async (origin: string, dest: string, dep_date: string) => {
        const flightSchedules: IFlightSchedule[] = await findFlights(origin, dest);
        return flightSchedules;
    },
}

export { SearchService, SearchFlightsService }