const express = require("express");
const urlController = require("../controllers/url");
const router = express.Router();

router.post("/", urlController.generateShortUrl);
router.get("/:shortId", urlController.getRedirectByShortId);
router.get("/analytic/:shortId", urlController.getAnalyticsUrl);

module.exports = router;

