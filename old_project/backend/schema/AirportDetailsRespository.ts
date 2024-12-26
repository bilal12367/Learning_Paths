import { model, Schema } from "mongoose";
import { IAirportData } from "../util/types/SchemaTypes";



const airportSchema = new Schema<IAirportData>({
    ident: { type: String, },
    type: { type: String, },
    name: { type: String, },
    latitude_deg: { type: String },
    longitude_deg: { type: String, },
    elevation_ft: { type: String }, 
    continent: { type: String, },
    iso_country: { type: String, },
    iso_region: { type: String },
    municipality: { type: String },
    scheduled_service: { type: String, required: true },
    gps_code: { type: String },
    iata_code: { type: String, },
    local_code: { type: String, },
    home_link: { type: String },
    wikipedia_link: { type: String },
    keywords: { type: String, }
})

export default model("AirportDetails",airportSchema)