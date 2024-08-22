import { NextFunction, Request, RequestHandler, Response } from "express";
import AirportDetailsRespository from "../schema/AirportDetailsRespository";
import { SearchService } from "../service/SearchService";
import { IAirportDetails } from "../util/types/AuthTypes";


interface ISearchController {
    searchAirports: RequestHandler
}

export const SearchController: ISearchController = {

    searchAirports: async (req: Request, res: Response, next: NextFunction) => {
        const searchedAirportStr: String = req.query.airportStr as String;
        const airportDetailsList: IAirportDetails[] = await SearchService.searchAirport(searchedAirportStr);
        res.status(200).json(airportDetailsList);
    }

}