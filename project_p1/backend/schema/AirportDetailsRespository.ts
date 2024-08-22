import { model, Schema } from "mongoose";
import { IAirportDetails } from "../util/types/AuthTypes";



const airportSchema = new Schema<IAirportDetails>({
    city: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    elevation: { type: Number, required: true },
    icao: { type: String, required: true },
    state: { type: String, required: true },
    lat: { type: Number },
    lon: { type: Number },
    tz: {type: String}
})

export default model("AirportDetails",airportSchema)