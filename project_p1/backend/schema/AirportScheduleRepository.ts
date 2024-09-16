// src/models/Flight.ts

import mongoose, { Schema, Document, Mongoose, Types } from 'mongoose';
import { IFlightSchedule } from '../util/types/SchemaTypes';



// Define the Mongoose schema
const flightSchema: Schema<IFlightSchedule> = new Schema<IFlightSchedule>({
  airline_name: {type: 'string', required: true},
  flight_id: {type: 'string', required: true, unique: true},
  from: {type: 'string', required: true},
  to: {type: 'string', required: true},
  dep_time: {type: 'number', required: true},
  arr_time: {type: 'number', required: true},
  distance: {type: 'number', required: true},
  dayRepeat: {type: 'string', required: true},
  flight_model_id: {type: 'string'}
});

// Create the model
const AirportScheduleRepository = mongoose.model<IFlightSchedule>('flight_schedules', flightSchema);

export default AirportScheduleRepository;
