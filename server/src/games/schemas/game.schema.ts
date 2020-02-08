import * as mongoose from 'mongoose';

export const GameSchema = new mongoose.Schema({
  status: String,
  updatedTs: Number,
  data: Object,
});
