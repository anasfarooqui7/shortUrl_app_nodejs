// import { nanoid } from 'nanoid';
const urlModel = require('../models/url');

async function generateShortUrl(req, res){
    const { nanoid } = await import('nanoid'); 
    const body = req.body;
    console.log('Logged in user:', req.user);
    if(!body.url) return res.status(400).json({error:"url is required"});
    const shortID = nanoid(8);

    await urlModel.create({
        shortId: shortID,
        redirectURL: body.url,
        visitorHistory: [],
        createdBy:req.user.id
    });

    return res.render('index'); //render my id on view template
    // return res.json({id: shortID});
}

// async function getRedirectByShortId(req, res) {
//     try {
//         const shortUrl_id = req.params.shortId;

//         if (!shortUrl_id) {
//             return res.status(400).json({ error: 'Short Url is required' });
//         }

//         const [updated] = await urlModel.update({ visitorHistory: [{timestamp: Date.now()}] }, {
//             where: { shortId: shortUrl_id }
//         });

//         if (updated) {
//             const updatedUser = await urlModel.findOne({ where: { shortId: shortUrl_id  } });
//             return res.redirect(updatedUser.redirectURL);
//         } else {
//             return res.status(404).json({ error: 'User not found' });
//         }

//     } catch (error) {
//         console.error("Error updating user:", error);
//         return res.status(500).json({ msg: "Internal Server Error" });
//     }
// }

async function getRedirectByShortId(req, res) {
    try {
        const shortUrl_id = req.params.shortId;

        if (!shortUrl_id) {
            return res.status(400).json({ error: 'Short Url is required' });
        }

        // Find the URL entry by shortId
        const urlEntry = await urlModel.findOne({ where: { shortId: shortUrl_id } });

        if (!urlEntry) {
            return res.status(404).json({ error: 'Short Url not found' });
        }

        // Ensure visitorHistory is an array
        let updatedVisitorHistory = urlEntry.visitorHistory;
        if (!Array.isArray(updatedVisitorHistory)) {
            updatedVisitorHistory = [];
        }

        // Update visitorHistory
        updatedVisitorHistory.push({ timestamp: Date.now() });

        // Update the record with the new visitorHistory
        const [updated] = await urlModel.update(
            { visitorHistory: updatedVisitorHistory },
            { where: { shortId: shortUrl_id } }
        );

        if (updated) {
            return res.redirect(urlEntry.redirectURL);
        } else {
            return res.status(500).json({ error: 'Failed to update visitor history' });
        }
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

async function getAnalyticsUrl(req, res){
    try{
        const shortID = req.params.shortId;
        const urlEntrys = await urlModel.findOne({ where: { shortId: shortID } });

        if (!urlEntrys) {
            return res.status(404).json({ error: 'Short Url not found' });
        }

        return res.json({totalClicks: urlEntrys.visitorHistory.length, analytic: urlEntrys.visitorHistory});
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }

}

async function getAllurlsData(req, res){
    try{
        const urlEntrys = await urlModel.findAll({ where: { createdBy: req.user._id } });
        return res.render('index', {allUrls :urlEntrys});
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

// For admin get all Urls and other data
async function getAllurlsDataForAdmin(req, res){
    try{
        const urlEntrys = await urlModel.findAll({});
        return res.render('index', {allUrls :urlEntrys});
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}


module.exports = {
    generateShortUrl,
    getRedirectByShortId,
    getAnalyticsUrl,
    getAllurlsData,
    getAllurlsDataForAdmin
};