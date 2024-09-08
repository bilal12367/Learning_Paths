// src/models/Flight.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IFlight extends Document {
    id: number;
    year: number;
    month: number;
    day: number;
    dep_time: number;
    sched_dep_time: number;
    dep_delay: number;
    arr_time: number;
    sched_arr_time: number;
    arr_delay: number;
    carrier: string;
    flight: number;
    tailnum: string;
    origin: string;
    dest: string;
    air_time: number;
    distance: number;
    hour: number;
    minute: number;
    time_hour: Date;
    name: string;
  }

// Define the Mongoose schema
const flightSchema: Schema = new Schema({
  id: { type: Number, required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  day: { type: Number, required: true },
  dep_time: { type: Number, required: true },
  sched_dep_time: { type: Number, required: true },
  dep_delay: { type: Number, required: true },
  arr_time: { type: Number, required: true },
  sched_arr_time: { type: Number, required: true },
  arr_delay: { type: Number, required: true },
  carrier: { type: String, required: true },
  flight: { type: Number, required: true },
  tailnum: { type: String, required: true },
  origin: { type: String, required: true },
  dest: { type: String, required: true },
  air_time: { type: Number, required: true },
  distance: { type: Number, required: true },
  hour: { type: Number, required: true },
  minute: { type: Number, required: true },
  time_hour: { type: Date, required: true },
  name: { type: String, required: true }
});

// Create the model
const AirportScheduleRepository = mongoose.model<IFlight>('flight_schedules', flightSchema);

export default AirportScheduleRepository;
