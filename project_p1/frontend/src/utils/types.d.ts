import { ReactNode } from "react"

export interface IAirportDetails {
    _id: string
    icao: string
    iata: string
    name: string
    city: string
    state: string
    country: string
    elevation: number
    lat: number
    lon: number
    tz: string
  }

interface User {
    userName: String,
    userId: String,
    email: String
}

interface ISearchPageMenuItem {
    index: Number,
    id: String,
    name: String,
    icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>
}

export { User, ISearchPageMenuItem }