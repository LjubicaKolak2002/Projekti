import mongoose from "mongoose"

const favouriteModel = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Chocolate', required: true
    }
    
})
export const Favourite = mongoose.model('Favourite', favouriteModel);