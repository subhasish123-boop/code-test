const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const Pet = require('../models/pets');
const { validateBody } = require('../middlewares/route');
const multer = require('multer');
const request_param = multer();

//For insert record
router.post('/create',request_param.any(),async (req, res, next) => { 
  try{
      //console.log(req.body); 
    const { body } = req; 
    const schema = Joi.object({ 
      name: Joi.string().required(),
      age: Joi.number().integer().required(),
      colour: Joi.string().required() 
    });
  
    const result = schema.validate(req.body);
     //console.log(result); 
    const { value, error } = result; 
    const valid = error == null; 
    if (!valid) { 
      res.status(400).json({ message: 'Invalid request', data: req.body}) 
    } 
    else { 
      let pet = new Pet(req.body);
      await pet.save();
      res.status(200).json({ message:'Pet created',data: pet }) 
    } 
  }
  catch(e){
    next(e);
  }
});


// For update record
router.put('/:id',request_param.any(),async (req, res, next) => { 
  try{
     // console.log(req.body); 
    const { body } = req; 
    const schema = Joi.object({ 
      name: Joi.string().required(),
      age: Joi.number().integer().required(),
      colour: Joi.string().required() 
    });
  
    const result = schema.validate(req.body);
    
    const { value, error } = result; 
    const valid = error == null; 
    if (!valid) { 
      res.status(400).json({ message: 'Invalid request', data: req.body}) 
    } 
    else { 
      const { id } = req.params; 
      const pet = new Pet(req.body);
      await pet.findByIdAndUpdate(id, req.body);
      res.status(200).json(pet);
    } 
  }
  catch(e){
    //console.log(e)
    next(e);
  }
});


//For get record
router.get('/:id',async (req, res, next) => {
    try { 
      const { id } = req.params; 
      let petval = await pet.findById(id).exec();
      if(!petval){
        res.status(400).json({message:"No record found"});
      }
      else{
        res.status(201).json(petval);
      }
    } 
    catch (e) {
      //console.log(e)
      next(e);
    }
  }
);

//For soft delete
router.delete('/:id',async (req, res, next) => {
  try { 
      const { id } = req.params; 
      let petval = await pet.findById(id).exec();
      if(!petval){
        res.status(400).json({message:"No record found"});
      }
      else{
        let update = {"isDeleted":true}
        await pet.findByIdAndUpdate(id, update);
        res.status(201).json(pet);
      }
    } 
    catch (e) {
      //console.log(e)
      next(e);
    }
  }
);


//For full delete
router.delete('/:id',async (req, res, next) => {
  try { 
      const { id } = req.params; 
      let petval = await pet.findById(id).exec();
      if(!petval){
        res.status(400).json({message:"No record found"});
      }
      else{
        let petDelete = await pet.deleteOne({ _id: id }).exec();
        res.status(201).json(petDelete);
      }
    } 
    catch (e) {
      //console.log(e)
      next(e);
    }
  }
);

module.exports = router;