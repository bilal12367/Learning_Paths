interface IFlightSchedule {
    flight_id: string,
    from: string,
    to: string,
    airline_name: string
    dep_time: number,
    arr_time: number,
    distance: number,
    dayRepeat: string,
    flight_model_id: any,
}


interface IAirportData {
    id: string;
    ident: string;
    type: string;
    name: string;
    latitude_deg: string;
    longitude_deg: string;
    elevation_ft: string;
    continent: string;
    iso_country: string;
    iso_region: string;
    municipality: string;
    scheduled_service: string;
    gps_code: string;
    iata_code: string;
    local_code: string;
    home_link: string;
    wikipedia_link: string;
    keywords: string;
}


interface IFlightScheduleDocument extends IFlightSchedule, Document {

}

export {IAirportData, IFlightSchedule, IFlightScheduleDocument}