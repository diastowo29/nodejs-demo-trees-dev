var express = require('express');
const { rfid_table } = require('../sequelize')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.status(200).send({
		status: 'Ok'
	})
});

router.get('/kantin', function(req, res, next) {
	rfid_table.create({
		id_kartu: req.query.id_kartu,
		status_kartu: req.query.status_kartu,
		status: 'OK'
	}).then(rfid_table_insert => {
		res.status(200).send({
			rfid: rfid_table_insert
		})
	});
});

router.get('/kantin/all', function(req, res, next) {
	rfid_table.findAll().then(rfid_table_all => {
		res.status(200).send({
			rfid: rfid_table_all
		});
	});
});

router.get('/kantin/delete', function(req, res, next) {
	rfid_table.destroy({
		where: {
			id: req.query.id
		}
	}).then(rfid_table_delete => {
		res.status(200).send({
			rfid: rfid_table_delete
		});
	})
});

router.get('/dashboard/admin', function(req, res, next) {
	rfid_table.findAll().then(rfid_table_all => {
	    res.render('dashboard', {
	    	rfid_data: rfid_table_all,
	    	title: 'Kantin RFID Dashboard' 
	    });
	});
});

router.get('/dashboard/student', function(req, res, next) {
	res.render('dashboard', { title: 'Arduino Dashboard' });
});

module.exports = router;
