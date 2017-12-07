var express = require('express');
var router = express.Router();
var cors = require('cors')
var mongo = require('mongodb')
var MongoClient = mongo.MongoClient
const dbUrl = 'mongodb://localhost:27017/lab6'

var collection

MongoClient.connect(dbUrl, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', dbUrl);
    collection = db.collection('BYUDict')
  }
});

router.post('/login', cors(), function(req, res, next) {
	console.log(req.body)
	let toSend ={}
	collection.find({email: req.body.email}).toArray(function(err, result) {
		let temp = result[0]
		if(temp) {
			if(temp.password === req.body.password){
				toSend.isAuth = true
				toSend.user = temp

			}
			else {
				toSend.isAuth = false
				toSend.message = 'Password was incorrect'
			}
		}
		else {
			toSend.isAuth = false
			toSend.message = 'No account is registered with that email'
				
		}
				res.send(toSend)
	})
})

router.post('/', cors(), function(req, res, next) {
	console.log(req.body)
	let insert = true
		collection.find({username: req.body.username}).toArray(function(err, result) {
			let temp = result[0]
			if(temp) res.send({test: false, message: "Someone already has that username"})
			else {
				collection.find({email: req.body.email}).toArray(function(err, result) {
				let temp = result[0]
				if(temp) res.send({test: false, message: "The email is already registered"})
				else {
					console.log(req.body)
					collection.insert(req.body)
					res.send({test: true})
				}
		
				})


			}
		})

})

router.put('/new-color', cors(), function(req, res, next) {
	console.log(req.body)	
	collection.find({email: req.body.email}).toArray(function(err, result) {
		let temp = result[0]
		temp.color = req.body.color
		collection.replaceOne({email: temp.email}, temp)
		res.send({test: 'updated!'})
	})
})


module.exports = router;
