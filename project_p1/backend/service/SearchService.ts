import AirportDetailsRespository from "../schema/AirportDetailsRespository"
import { IAirportDetails } from "../util/types/AuthTypes"


interface ISearchService {
    searchAirport: (str: String) => Promise<IAirportDetails[]>
}

const SearchService: ISearchService = {
    searchAirport: async (str: String) => {
        const airportList: IAirportDetails[] = await AirportDetailsRespository.find({
            city: {
                $regex: str,
                $options: 'i'
            }
        }).limit(20)

        return airportList
    }
}

export { SearchService }