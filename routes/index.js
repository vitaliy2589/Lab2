var express = require('express');
var router = express.Router();

var mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID
var MongoClient = mongodb.MongoClient;
var mongoUrl = 'mongodb://localhost:27017/02-server';



var mongo;
	MongoClient
  		.connect(mongoUrl)
  		.then(function(db) {
    	mongo = db;
  	});

/* GET home page. */
router.get('/', function(req, res, next) {
     res.render('index'); 
});

router.get('/tasks', function(req, res, next) {
	mongo
  .collection('tasks').find().toArray()
  .then(function(tasks) {
   res.send(JSON.stringify(tasks))
  });
     
});

router.post('/tasks',function(req, res, next){

	mongo
	  .collection('tasks').insert({ name: req.body.task,date:req.body.date })
	  .then(function() {
		res.end()
	  });	
})


router.delete('/tasks',function(req,res,next){
	mongo
	  .collection('tasks').remove({ '_id': new ObjectID(req.body.id) })
	  .then(function() {
	  	console.log('delete  '+req.body.id)
	 });
  	
  	res.end();
  
})


module.exports = router;
