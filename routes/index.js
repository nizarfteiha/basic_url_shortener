const express = require('express');
const router = express.Router();

const Url = require('../models/Url');


// @route       GET /:code
// @desc        Redirect to long/original Url
router.get('/:code', async (req,res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code});
        console.log(url);
        if(url){
            console.log("1");
            console.log(url.longUrl);
            return res.redirect(url.longUrl);
        }
        else {
            return res.status(404).json('No url Found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
        
    }
});


module.exports = router;