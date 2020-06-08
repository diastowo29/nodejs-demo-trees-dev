var express = require('express');
const { demo_table } = require('../sequelize')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	demo_table.findAll().then(demo_data => {
		console.log(demo_data.length)
		res.status(200).send({});
	})
});



module.exports = router;
