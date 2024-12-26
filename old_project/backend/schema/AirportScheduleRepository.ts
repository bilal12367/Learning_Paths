// src/models/Flight.ts

import mongoose, { Schema, Document, Mongoose, Types } from 'mongoose';
import { IFlightSchedule } from '../util/types/SchemaTypes';



// Define the Mongoose schema
const flightSchema: Schema<IFlightSchedule> = new Schema<IFlightSchedule>({
  airline_name: {type: 'string', },
  flight_id: {type: 'string',unique: true},
  from: {type: 'string', },
  to: {type: 'string', },
  dep_time: {type: 'number', },
  arr_time: {type: 'number', },
  distance: {type: 'number', },
  dayRepeat: {type: 'string', },
  flight_model_id: {type: 'string'}
});

// Create the model
const AirportScheduleRepository = mongoose.model<IFlightSchedule>('flight_schedules', flightSchema);

export default AirportScheduleRepository;
