const express = require('express');
const router = express.Router();

router.post('/transform',async(req,res)=>{
    try{
        let getVal = JSON.stringify(req.body.payload);
        let refData = req.body.referenceData
        
        const keys = Object.keys(refData)
        keys.forEach((key) => {
            var newKey = '{'+key+'}'
            refData[newKey] = refData[key]
            delete refData[key]
        })
        getVal = getVal.replace(/{REF_MSISDN}|{REF_IMSI}|{REF_SERVPROFID}/gi, function (matched) {
            return refData[matched]
        })
        let newObj = JSON.parse(getVal)
        res.status(201).json(newObj)
    }
    catch(e){
        res.status(400).json({message:e.message})
    }
});

module.exports = router;