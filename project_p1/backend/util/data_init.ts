import csv from 'csv-parser'
import fs from 'fs'
import haversineDistance from './haversineDistance';
import mongoose from 'mongoose';
import AirportScheduleRepository from '../schema/AirportScheduleRepository';
import AirportDetailsRespository from '../schema/AirportDetailsRespository';
import AirportNotFound from './errors/AirportDetailsNotFound';
import AirportDetailsNotFound from './errors/AirportDetailsNotFound';
import { IAirportData, IFlightSchedule } from './types/SchemaTypes';
import ConsoleLogger from '../config/logger/ConsoleLogger';
import FileLogger from '../config/logger/FileLogger';

type DayRepeat = "Everyday" | "SU" | "MO" | "TU" | "WE" | "TH" | "FR" | "SA"

interface FlightSchedule {
    id: string,
    flight_id: string,
    from: string,
    to: string,
    airline_name: string
    dep_time: string,
    arr_time: string,
    distance: number,
    dayRepeat: string,
    flight_model_id: any,
}

const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Convert JSON data to CSV format
const jsonToCsv = (jsonArray: any[]) => {
    if (jsonArray.length === 0) return '';

    // Get headers from the keys of the first object
    const headers = Object.keys(jsonArray[0]);

    // Create CSV header row
    const csvRows = [headers.join(',')];

    // Create CSV rows for each JSON object
    for (const row of jsonArray) {
        const values = headers.map(header =>
            JSON.stringify(row[header], (key, value) => value === null ? '' : value) // Handle null values
                .replace(/"/g, '""') // Escape quotes
        );
        csvRows.push(values.join(','));
    }

    let csvData = csvRows.join('\n')
    let filePath = 'output/output.csv'
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, csvData);
    } else {
        // Append data to the existing file
        // Skip the header if the file already has data
        const dataToAppend = csvData.split('\n').slice(1).join('\n');
        fs.appendFileSync(filePath, `\n${dataToAppend}`);
    }
}

const dataInitializer = () => {
    let arrAirports: any = []
    let listIata: string[] = []
    ConsoleLogger.debug("Initializing Data")
    fs.createReadStream('./static/airports.csv')
        .pipe(csv())
        .on('data', (data: IAirportData) => {
            // console.log("Data From Initializer: ",data)
            if (!listIata.includes(data.iata_code) && data.iata_code.length > 2 && ['large_airport','medium_airport'].includes(data.type)) {
                // arrAirports[data.iata_code] = data
                arrAirports.push(data)
                listIata.push(data.iata_code)
            }
        })
        .on('end', async () => {
            ConsoleLogger.debug("Inserting Records ...")
            await AirportDetailsRespository.insertMany(arrAirports);
            ConsoleLogger.debug("Insertion Successfull!!")
        })


}

const generateRandomNumberInRange = (upperBound: number, lowerBound: number = 1): number => {
    return Math.floor((Math.random() * upperBound + 1)) as number
}


const generateFlightSchedules = async (from: string, to: string) => {
    let fromAirport: IAirportData = await AirportDetailsRespository.findOne({ iata_code: from }) as IAirportData
    let toAirport: IAirportData = await AirportDetailsRespository.findOne({ iata_code: to }) as IAirportData
    let recsToGenerate = generateRandomNumberInRange(14)
    let airlines = ['American Airlines', 'Delta Air Lines', 'United Airlines', 'Southwest Airlines', 'Alaska Airlines', 'JetBlue Airways', 'Spirit Airlines', 'Frontier Airlines', 'Allegiant Air', 'Sun Country Airlines', 'British Airways', 'Lufthansa', 'Air France', 'KLM Royal Dutch Airlines', 'Emirates', 'Qatar Airways', 'Singapore Airlines', 'Cathay Pacific', 'China Southern Airlines', 'China Eastern Airlines', 'Japan Airlines', 'ANA All Nippon Airways', 'Qantas Airways', 'Air New Zealand', 'Turkish Airlines', 'Iberia', 'Austrian Airlines', 'Swiss International Air Lines', 'Finnair', 'Aeroflot', 'Asiana Airlines', 'Korean Air', 'Malaysia Airlines', 'Thai Airways', 'Vietnam Airlines', 'Philippine Airlines', 'SriLankan Airlines', 'Air India', 'Pakistan International Airlines', 'Saudia', 'Royal Jordanian', 'EgyptAir', 'Ethiopian Airlines', 'Kenya Airways', 'South African Airways', 'Air Canada', 'WestJet', 'Air Transat', 'GOL Linhas Aéreas', 'Azul Brazilian Airlines', 'LATAM Airlines', 'Jetstar Airways', 'Scoot', 'Ryanair', 'EasyJet', 'Wizz Air', 'Vueling', 'Norwegian Air Shuttle', 'Pegasus Airlines', 'Jet2.com', 'Condor', 'TUI Airways', 'Flybe', 'airBaltic', 'Hainan Airlines', 'China Airlines', 'Hawaiian Airlines', 'Alitalia', 'Aer Lingus', 'Icelandair', 'Royal Air Maroc', 'SAS Scandinavian Airlines', 'Malaysia Airlines', 'Air Europa', 'Nok Air', 'Bangkok Airways', 'AirAsia', 'Oman Air', 'SriLankan Airlines', 'Gulf Air', 'Biman Bangladesh Airlines', 'Air Seychelles', 'Air Mauritius', 'Mauritania Airlines', 'Arik Air', 'Ethiopian Airlines', 'Air Tanzania', 'Air Madagascar', 'Air Botswana', 'Air Algerie', 'AirAsia X', 'Air Namibia', 'Air Senegal', 'Air Tanzania', 'Air Vanuatu', 'AeroMexico', 'Aerolíneas Argentinas', 'Aeroporti di Roma', 'Aeromexico Connect', 'Air Comet', 'Air Koryo', 'Air Serbia', 'Air Seychelles', 'Air Tahiti Nui', 'Alitalia CityLiner', 'Austrian Arrows', 'Bangkok Air', 'Blue Air', 'Boliviana de Aviación', 'Boutique Air', 'Cebu Pacific', 'China Eastern Airlines', 'China Southern Airlines', 'Copa Airlines', 'Croatia Airlines', 'EgyptAir', 'Ethiopian Airlines', 'Flydubai', 'Flynas', 'GOL Linhas Aéreas', 'Icelandair', 'Interjet', 'Jazeera Airways', 'Jin Air', 'Jordanian Royal Air', 'Kenya Airways', 'Kuwait Airways', 'Lao Airlines', 'Lufthansa Regional', 'Malaysia Airlines', 'Martinair', 'Nepal Airlines', 'Norse Atlantic Airways', 'Nouvelair', 'Onur Air', 'PGA-Portugália Airlines', 'RwandAir', 'Sata Internacional', 'Sichuan Airlines', 'Sky Airlines', 'Somon Air', 'SriLankan Airlines', 'TAP Air Portugal', 'Tatarstan Airlines', 'Tunisair', 'Turkmenistan Airlines', 'Uzbekistan Airways', 'VivaAerobus', 'VivaColombia', 'Wamos Air', 'Wizz Air Abu Dhabi', 'Zambezi Airlines', 'Aer Lingus Regional', 'Aerolineas Argentinas', 'AeroLogic', 'AeroMexico Connect', 'Aeroflot Russian Airlines', 'Aegean Airlines', 'Aerial', 'Air Austral', 'Air Baltic', 'Air Canada Rouge', 'Air China Cargo', 'Air Dolomiti', 'Air France-KLM', 'Air India Express', 'Air Mauritius', 'Air New Zealand Link', 'Air Seychelles', 'Air Tahiti', 'Air Transat A.T.', 'Air Vanuatu', 'Allegiant Travel', 'All Nippon Airways', 'Alpar', 'Amakusa Airlines', 'AnadoluJet', 'Angara Airlines', 'Austrian Airlines', 'Avianca', 'Bamboo Airways', 'Bangkok Airways', 'Biman Bangladesh Airlines', 'Blue Panorama Airlines', 'Brazilian Airlines', 'Breeze Airways', 'Cambodia Angkor Air', 'Cebgo', 'Charter Airlines', 'China Airlines', 'China Eastern Airlines', 'China Southern Airlines', 'Cimber Sterling', 'Corsair International', 'Cubana de Aviación', 'Cyprus Airways', 'DHL Aviation', 'Eagle Air', 'Eastar Jet', 'EgyptAir Express', 'Elite Airways', 'Estonian Air', 'Ethiopian Airlines', 'Eurowings', 'Fiji Airways', 'Flybe', 'Flynas', 'Flyone', 'Georgian Airways', 'Germania', 'Gulf Air', 'Hainan Airlines', 'Hainan Airlines', 'Hawaiian Airlines', 'Icelandair', 'Interjet', 'Japan Transocean Air', 'Jin Air', 'Jordan Aviation', 'Korean Air', 'Kuwait Airways', 'Latam Cargo', 'Lufthansa CityLine', 'Malawian Airlines', 'Malaysia Airlines', 'Mango', 'MIAT Mongolian Airlines', 'Myanmar Airways International', 'Nok Air', 'Oman Air', 'Pakistan International Airlines', 'Peach Aviation', 'QantasLink', 'Royal Brunei Airlines', 'Royal Jordanian', 'RwandAir', 'S7 Airlines', 'SATA International', 'Sichuan Airlines', 'Sky Airline', 'SriLankan Airlines', 'TAM Airlines', 'Thai AirAsia', 'Turkish Airlines', 'United Express', 'Uzbekistan Airways', 'VivaAerobus', 'VivaColombia', 'Wamos Air', 'WestJet Encore', 'Wizz Air', 'XiamenAir', 'Yamal Airlines', 'Zagrosjet'];
    let weekDays = ["Everyday", "SU", "MO", "TU", "WE", "TH", "FR", "SA"]
    let generatedRecs: IFlightSchedule[] = []
    for (let i = 1; i <= recsToGenerate; i++) {
        generatedRecs.push({
            from, to,
            airline_name: airlines[generateRandomNumberInRange(airlines.length - 1)],
            dep_time: generateRandomNumberInRange(1200),
            arr_time: (generateRandomNumberInRange(1200) + 1200),
            dayRepeat: weekDays[generateRandomNumberInRange(8) - 1],
            distance: haversineDistance(parseInt(fromAirport.latitude_deg), parseInt(fromAirport.longitude_deg), parseInt(toAirport.latitude_deg), parseInt(toAirport.longitude_deg)),
            flight_id: generateUUID(),
            flight_model_id: generateUUID()
        })
    }
    return generatedRecs;
}

const findFlights = async (from: string, to: string) => {
    if (!await AirportScheduleRepository.exists({ from, to })) {
        if (await AirportDetailsRespository.exists({ iata_code: { $in: [from, to] } })) {
            ConsoleLogger.warn("Generating Schedules for Searched Flights...")
            const generatedRecs: IFlightSchedule[] = await generateFlightSchedules(from, to)
            await AirportScheduleRepository.insertMany(generatedRecs);
            ConsoleLogger.debug("Schedules Generated...")
        } else {
            throw new AirportDetailsNotFound();
        }
    }

    return await AirportScheduleRepository.find({from: from, to: to})
}

export { dataInitializer, findFlights }