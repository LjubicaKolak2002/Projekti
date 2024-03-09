import express from "express";
import mongoose from "mongoose";
import { Producer } from "../models/ProducerModel.js";
import { Chocolate } from "../models/ChocolateModel.js";
import { verifyJwt } from "../jwt.js";


const producerRouter = express.Router();


//stranica sa svim proizvodacima
producerRouter.route('/producers').get(verifyJwt, (req, res) => {
    Producer.find().sort({name: 1}).then(function(producers) {
        return res.json(producers)
    })
})


//proizvodac po id-u
producerRouter.route('/producerDetails/:producer_id').get(verifyJwt, (req, res) => {
    const valid = mongoose.Types.ObjectId.isValid(req.params.producer_id);
    if (!valid) {
        return res.json({})
    }
    Producer.findById(req.params.producer_id).then(function(producer) {
        return res.json(producer)
    })
})


//stranica za unos novog proizvodaca
producerRouter.route('/addProducer').post(verifyJwt, (req, res) => {
    try {
        const producer = new Producer(req.body);
        producer.save();
        return res.status(210).json(producer)
    }
    catch (error) {
        return res.json({error: "can't add"})  
    };
})


//stranica za editiranje proizvodaca
producerRouter.route('/editProducer/:producer_id').put(verifyJwt, (req, res) => {
    try {
        Producer.findOneAndUpdate({ _id: req.params.producer_id }, req.body, {new: true}) 
            .then(function(updatedProducer) {
                if (!updatedProducer) {
                    return res.json({error: "Can't find this producer"})
                }
                return res.json(updatedProducer)
            })
      
    }
    catch (error) {
        return res.json({error: "Can't update this producer"})
    }
})


//stranica za brisanje proizvodaca
producerRouter.route('/deleteProducer/:producer_id').delete(verifyJwt,(req, res) => {
    Chocolate.find({ producer_id: req.params.producer_id }).then(function(chocolates) {
        if (chocolates.length < 1) {
          Producer.findByIdAndDelete(req.params.producer_id).then(function(producer) {
            return res.json({producer: producer})
          })
        }
        else {
            return res.json({ error: "Cannot delete producer" });
        }
    })
})


export default producerRouter;

