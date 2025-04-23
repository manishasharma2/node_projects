const shortid = require('shortid')
const URL = require('../models/url')

async function originalURL(req,res) {
    const shortId = req.params.id;
    const entry = await URL.findOneAndUpdate(
        {shortId},
        {
            $push: {visitHistory : {timestamp: Date.now()}}
        }
    );
    if(!entry) {
        return res.status(404).send("Short URL not found");
    }
    res.redirect(entry.redirectURL);
}

async function getAnalytics(req,res ) {
    const shortId = req.params.id;
    const result  = await URL.findOne({shortId})
    return res.json({totalClick : result.visitHistory.length, 
        analytics : result.visitHistory,
    })
}

async function generateShortUrl(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error : "url is required"})
    const shortId = shortid(8);
   
    await URL.create({
        shortId: shortId,
        redirectURL : body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    return res.render('home',{id: shortId})
    // res.json({id: shortId})
}

module.exports = {
    generateShortUrl,
    getAnalytics,
    originalURL
}