import { model, Schema } from "mongoose";
import { IAirportData } from "../util/types/SchemaTypes";



const airportSchema = new Schema<IAirportData>({
    ident: { type: String, required: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
    latitude_deg: { type: String, required: true },
    longitude_deg: { type: String, required: true },
    elevation_ft: { type: String, required: true }, 
    continent: { type: String, required: true },
    iso_country: { type: String, required: true },
    iso_region: { type: String, required: true },
    municipality: { type: String, required: true },
    scheduled_service: { type: String, required: true },
    gps_code: { type: String, required: true },
    iata_code: { type: String, required: true },
    local_code: { type: String, required: true },
    home_link: { type: String, required: false },
    wikipedia_link: { type: String, required: false },
    keywords: { type: String, required: false }
})

export default model("AirportDetails",airportSchema)