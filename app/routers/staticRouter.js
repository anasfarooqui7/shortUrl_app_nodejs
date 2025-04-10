const express = require("express");
const router = express.Router();
// middleware
const AuthMiddleware = require("../middlewares/auth.js");
const authMiddleware = new AuthMiddleware();
const urlController = require("../controllers/url");  // require Controller to show all data
const { route } = require("./url");
const { render } = require("ejs");

// router.get("/", async(req, res) => {
//     return res.render('index');
// });
router.get('/', authMiddleware.restrictTo(["NORMAL", "ADMIN"]), urlController.getAllurlsData);

// signUp form
router.get('/signup', (req, res) =>{
   return res.render('signup');
});

// Login form
router.get('/login', (req, res) =>{
    return res.render('login');
 });

//  for admin only
router.get('/admin/urls',authMiddleware.restrictTo(["ADMIN"]), urlController.getAllurlsDataForAdmin)

module.exports = router;