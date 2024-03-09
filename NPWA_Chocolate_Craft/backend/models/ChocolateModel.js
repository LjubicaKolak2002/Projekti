import mongoose from "mongoose";

const chocolateModel = new mongoose.Schema( {
    name: {type: String},
    price: {type: String},
    image: {type: String},
    cacao_percentage: {type: String},
    milk_percentage: {type: String},
    color: {type: String},
    type_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true
    },
    producer_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Producer', required: true
    }
})

export const Chocolate = mongoose.model('Chocolate', chocolateModel);