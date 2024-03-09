import mongoose from "mongoose";

const producerModel = new mongoose.Schema({
    name: {type: String},
    year: {type: Number},
    country: {type: String},
    description: {type: String},
    logo: {type: String},
})

export const Producer = mongoose.model('Producer', producerModel);