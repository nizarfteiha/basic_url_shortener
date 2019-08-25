const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');


const Url = require('../models/Url');


// @route POST /api/url/shorten
// @desc  Create short URL
router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = config.get('baseUrl');



    // Check base Url
    if(!validUrl.isUri(baseUrl)){
        return res.status(400).json('Invalid base url');
    }




    //Check long url
    if(validUrl.isUri(longUrl)){
        try {
            let url = await Url.findOne({ longUrl});

            if(url){
                res.json(url);
            }
            else {
                //Create url code
                const urlCode = shortid.generate();
                const shortUrl = baseUrl + '/'  + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });
                console.log('Hi2');
                await url.save();

                res.json(url);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json('Server errorr');
            
        }
    }
    else {
        res.status(401).json('Invalid longUrl')
    }

});



module.exports = router;