var express = require('express');
const { rfid_table } = require('../sequelize')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.status(200).send({
		status: 'Ok'
	})
});

router.get('/kantin/menu', function(req, res, next) {
	res.render('menu', {
		title: 'Daftar Menu'
	})
});

router.get('/kantin', function(req, res, next) {
	rfid_table.findAll({
		where: {
			id_kartu: req.query.id_kartu
		}
	}).then(rfid_id_kartu => {
		if (rfid_id_kartu.length == 0) {
			rfid_table.create({
				id_kartu: req.query.id_kartu,
				status_kartu: req.query.status_kartu,
				nama_kartu: req.query.nama_kartu,
				status: 'OK'
			}).then(rfid_table_insert => {
				res.status(200).send({
					rfid: rfid_table_insert
				})
			});
		} else {
			res.status(200).send({
				rfid: 'This CARD has already tapped'
			})
		}
	})
});

router.post('/kantin/order', function (req, res, next) {
	let orderParameter = req.body.order;
	res.status(200).send({
		orderParameter
	});
})

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
