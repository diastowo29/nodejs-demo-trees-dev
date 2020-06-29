var express = require('express');
const { rfid_table, order_table } = require('../sequelize')
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

/* ON CARD TAPPED */
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
			rfid_table.update({
				status: 'OK'
			}, {
				where: {
					id_kartu: req.query.id_kartu
				}
			}).then(rfid_table_update => {
				res.status(200).send(rfid_table_update)
			})
		}
	})
});

router.post('/kantin/order', function (req, res, next) {
	let orderParameter = req.body.order.order;
	let orderIdKartu = req.body.order.id_kartu;
	let orderNamaKartu = req.body.order.nama_kartu;
	order_table.create({
		id_kartu: orderIdKartu,
		nama_kartu: orderNamaKartu,
		order: JSON.stringify(orderParameter),
		status: 'ORDER'
	}).then(order_table_insert => {
		rfid_table.update({
			status: 'ORDER'
		}, {
			where: {
				id_kartu: orderIdKartu
			}
		}).then(rfid_table_update => {

		})
		res.status(200).send({
			order: order_table_insert
		})
	});
})

router.get('/kantin/order/all', function (req, res, next) {
	order_table.findAll().then(order_table_all => {
		res.status(200).send({
			order: order_table_all
		})
	});
})

router.get('/kantin/order/take', function (req, res, next) {
	order_table.update({
	  status: 'DONE',
	}, {
	  where: {
	    id_kartu: req.query.id
	  }
	}).then(order_table_update => {
		res.status(200).send({
			order_table_update
		})
	})
})

router.get('/kantin/order/delete', function (req, res, next) {
	order_table.destroy({
		where: {
			id: req.query.id
		}
	}).then(order_table_delete => {
		res.status(200).send({
			rfid: order_table_delete
		});
	})
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
	rfid_table.findAll({
		where: {
			status: 'OK'
		}
	}).then(rfid_table_all => {
	    res.render('dashboard', {
	    	rfid_data: rfid_table_all,
	    	title: 'Kantin RFID Dashboard' 
	    });
	});
});

router.get('/dashboard/order', function(req, res, next) {
	var orderList = [];
	var order = {};
	var orderSummary = {};
	var orderSummaryList = [];
	var emptyorder;

	order_table.findAll({
		where : {
			status: 'ORDER'
		}
	}).then(order_table_all => {
		if (order_table_all.length > 0) {
			for (var i=0; i<order_table_all.length; i++) {
				order = {};
				orderSummary = {};
				orderList = [];
				let orderJson = JSON.parse(order_table_all[i].order);
				if (orderJson.geprek != 0) {
					order = {
						menu: 'Nasi + Ayam Geprek + Tahu Tempe',
						jumlah: orderJson.geprek
					}
					orderList.push(order)
				} 
				if (orderJson.nasgor != 0) {
					order = {
						menu: 'Nasi Goreng',
						jumlah: orderJson.nasgor
					}
					orderList.push(order)
				} 
				if (orderJson.migor != 0) {
					order = {
						menu: 'Mie Goreng',
						jumlah: orderJson.migor
					}
					orderList.push(order)
				} 
				if (orderJson.kwegor != 0) {
					order = {
						menu: 'Kwetiau Goreng',
						jumlah: orderJson.kwegor
					}
					orderList.push(order)
				} 
				if (orderJson.esteh != 0) {
					order = {
						menu: 'Es Teh Manis',
						jumlah: orderJson.esteh
					}
					orderList.push(order)
				} 
				if (orderJson.teh != 0) {
					order = {
						menu: 'Teh Manis Hangat',
						jumlah: orderJson.teh
					}
					orderList.push(order)
				} 
				if (orderJson.esnutri != 0) {
					order = {
						menu: 'Es Nutrisari',
						jumlah: orderJson.esnutri
					}
					orderList.push(order)
				} 
				if (orderJson.esgoodday != 0) {
					order = {
						menu: 'Es Goodday',
						jumlah: orderJson.esgoodday
					}
					orderList.push(order)
				} 
				if (orderJson.kopi != 0) {
					order = {
						menu: 'Kopi',
						jumlah: orderJson.kopi
					}
					orderList.push(order)
				} 
				if (orderJson.air != 0) {
					order = {
						menu: 'Air Mineral',
						jumlah: orderJson.air
					}
					orderList.push(order)
				}
				orderSummary = {
					id: order_table_all[i].id_kartu,
					nama: order_table_all[i].nama_kartu,
					order: orderList
				}
				orderSummaryList.push(orderSummary)
			}
			emptyorder = ''
		} else {
			emptyorder = 'Belum ada pesanan'
		}
		res.render('orderlist', { 
			title: 'Daftar Pesanan',
			order_data: orderSummaryList,
			empty: emptyorder
		});
	});
});

module.exports = router;