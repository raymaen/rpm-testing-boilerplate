import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  data: String,
  lastUpdated: Number,
});
