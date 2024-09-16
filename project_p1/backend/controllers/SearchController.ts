import { NextFunction, Request, RequestHandler, Response } from "express";
import { SearchFlightsService, SearchService } from "../service/SearchService";
import { IAirportData, IFlightSchedule } from "../util/types/SchemaTypes";


interface ISearchController {
    searchAirports: RequestHandler,
    searchFlights: RequestHandler
}

interface ISearchFlightQuery {
    origin: String,
    dest: String,
    travelDate: Date
}

export const SearchController: ISearchController = {

    searchAirports: async (req: Request, res: Response, next: NextFunction) => {
        const searchedAirportStr: String = req.query.airportStr as String;
        const airportDetailsList: IAirportData[] = await SearchService.searchAirport(searchedAirportStr);
        res.status(200).json(airportDetailsList);
    },


    searchFlights: async (req: Request, res: Response, next: NextFunction) => {
        const searchFlightQuery : ISearchFlightQuery = req.query as any;
        const flightSchedules: IFlightSchedule[] = await SearchFlightsService.searchFlights(searchFlightQuery.origin as string,searchFlightQuery.dest as string,searchFlightQuery.travelDate.toString())
        res.status(200).json(flightSchedules)
    }
}