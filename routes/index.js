var express = require('express');
var router = express.Router();
const createAirCraftsController = require("../controllers/createAirCrafts");
const getArmSummarysController  = require("../controllers/getArmSummarys");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/create-air-creaft" , createAirCraftsController);
router.get("/get-air-creaft",getArmSummarysController)

module.exports = router;
