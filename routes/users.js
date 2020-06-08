var express = require('express');
const { demo_table } = require('../sequelize')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var customerId = req.query.customer
	demo_table.findAll().then(demo_data => {
		console.log(demo_data.length)
		res.status(200).send({

		});
	});
});

router.post('/create/', function(req, res, next) {
	demo_table.create({
		name: req.body.name,
		telephone: req.body.telephone,
		address: req.body.address,
		email: req.body.email,
		facebook: req.body.facebook,
		twitter: req.body.twitter,
		customer_id: req.body.customer_id,
		username: req.body.username,
		trx: req.body.trx,
		product_code: req.body.product_code,
		product_price: req.body.product_price
	}).then(demo_table_insert => {
		res.status(200).send({
			insert: success,
			data: demo_table_insert
		});
	});
});

module.exports = router;
