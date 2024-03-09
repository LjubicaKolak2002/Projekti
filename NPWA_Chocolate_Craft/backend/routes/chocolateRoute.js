import express from "express";
import mongoose from "mongoose";
import { Chocolate } from "../models/ChocolateModel.js";
import { Favourite } from "../models/FavouriteModel.js";
import { Type } from "../models/Type.js"
import { verifyJwt } from "../jwt.js";

const chocolateRouter = express.Router();

//pregled proizvoda
chocolateRouter.route('/chocolates').get(verifyJwt, (req, res) => {
    Chocolate.find().sort({name: 1}).then(function(chocolates) {
        return res.json(chocolates)
    })
})


//stranica s detaljima o proizvodu
chocolateRouter.route('/chocolateDetails/:chocolate_id').get(verifyJwt, (req, res) => {
    const valid = mongoose.Types.ObjectId.isValid(req.params.chocolate_id);
    if (!valid) {
        return res.json({})
    }
    Chocolate.findById(req.params.chocolate_id).then(function(drink) {
        return res.json(drink)
    }) 
})


//stranica za unos novog artikla
chocolateRouter.route('/addChocolate').post(verifyJwt, (req, res) => {
    try {
        const chocolate = new Chocolate(req.body);
        chocolate.save();
        return res.status(210).json(chocolate)
    }
    catch (error) {
        return res.json({error: "can't add"})  
    };
})


//dohvati tip proizvoda
chocolateRouter.route('/chocolateType/:type_id').get(verifyJwt, (req, res) => {
    const valid = mongoose.Types.ObjectId.isValid(req.params.type_id);
    if (!valid) {
        return res.json({})
    }
    Type.findById(req.params.type_id).then(function(type) {
        return res.json(type)
    })
})


//dohvati sve tipove
chocolateRouter.route('/chocolateTypes').get(verifyJwt, (req, res) => {
    Type.find().then(function(types) {
        return res.json(types)
    })
})


//stranica za editiranje proizvoda
chocolateRouter.route('/editChocolate/:chocolate_id').put(verifyJwt, (req, res) => {
    try {
        Chocolate.findOneAndUpdate({ _id: req.params.chocolate_id }, req.body, {new: true}) //vrati novu verziju proizvoda
            .then(function(updatedChocolate) {
                if (!updatedChocolate) {
                    return res.json({error: "Can't find this chocolate"})
                }
                return res.json(updatedChocolate)
            })
    }
    catch (error) {
        return res.json({error: "Can't update this chocolate"})
    }
})
    

//stranica za brisanje proizvoda
chocolateRouter.route('/deleteChocolate/:chocolate_id').delete(verifyJwt, (req, res) => {
    try {
        Chocolate.findByIdAndDelete(req.params.chocolate_id).then(function(deletedChocolate) {
            if (deletedChocolate) {
                return res.json({ deletedChocolate: "deleted" });
            } 
            return res.json({ error: "Chocolate not found" });
        });
    }
    catch (error) {
        return res.json({ error: "Error while deleting chocolate" });
    }
});


//dodavanje u favorite
chocolateRouter.route('/addFavourite').post(verifyJwt, (req, res) => {
    try {
        const { user_id, product_id } = req.body;
        Favourite.findOne({ user_id, product_id }).then(function(existingFavourite) {
            if (existingFavourite) {
                return res.status(409).json({ error: "This favourite already exists." });
            }
            const favourite = new Favourite({ user_id, product_id });
            favourite.save();
            return res.status(201).json(favourite);
        })
    } 
    catch (error) {
        return res.json({ error: "Can't add favourite." });
    }
});


//dohvacanje korisnikovih favorita
chocolateRouter.route('/userFavourites/:user_id').get(verifyJwt, (req, res) => {
    try {
        Favourite.find({user_id: req.params.user_id}).then(function(favourites) {
            return res.json(favourites)
        }) 
    }
    catch (error) {
        return res.json({error: "error"})
    }
})


//uklanjanje iz favorita
chocolateRouter.route('/deleteFavourite/:product_id/:user_id').delete(verifyJwt, (req, res) => {
    try {
        Favourite.findOneAndDelete({product_id: req.params.product_id, user_id: req.params.user_id}).then(function(deletedFav) {
            if (deletedFav) {
                return res.json({ deletedFav: "deleted" });
            } 
            return res.json({ error: "Favourite not found" });
        });
    }
    catch (error) {
        return res.json({ error: "Error while deleting favourite product" });
    }
});


export default chocolateRouter;