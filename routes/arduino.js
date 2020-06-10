var express = require('express');
const { demo_table } = require('../sequelize')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.status(200).send({
		status: 'Ok'
	})
});

router.get('/ketinggian', function(req, res, next) {
	demo_table.findAll().then(demo_data => {
		res.status(200).send({
			demo_data
		});
	});
});

router.get('/kantin', function(req, res, next) {
	res.status(200).send({
		id_kartu: req.query.id_kartu,
		status: req.query.status_kartu
	})
});

router.get('/dashboard', function(req, res, next) {
	res.render('dashboard', { title: 'Arduino Dashboard' });
});

module.exports = router;
