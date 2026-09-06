import express from "express";
import Seller from "../models/Seller.js";
// import authenticate from "../middleware/authMiddleware.js";

const sellerRouter = express.Router();

// sellerRouter.use(authenticate);


sellerRouter.post("/",async(req,res)=>{
    try{
        console.log(req.body);
        await Seller.create(req.body);
        res.send("Ok");
    }
    catch (error){
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

sellerRouter.get("/seller_info",async(req,res)=>{
    try{
        const response = await Seller.find({
            name: req.body.name
        })
        console.log(response);
        res.json(response);
    }
    catch (error){
       console.log(error);
        res.status(500).json({ error: error.message }); 
    }
});

export default sellerRouter;