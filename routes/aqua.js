var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.status(200).send({
		cilukba: 'hehe'
	})
});

router.post('/', function(req, res, next) {
	var oauth_consumer_key = req.query.oauth_consumer_key
	var oauth_nonce = req.query.oauth_nonce
	var oauth_signature_method = req.query.oauth_signature_method
	var oauth_timestamp = req.query.oauth_timestamp
	var oauth_version = req.query.oauth_version
	var oauth_signature = req.query.oauth_signature
	res.status(200).send({
		cilukba: 'hehe'
	})
});

module.exports = router;
