var qs = require('querystring');
var express = require('express');
var mongoskin = require('mongoskin'); // TODO: use one ORM, not mongoose and mongoskin
var router = express.Router();
var config = require('../config');
var db = mongoskin.db(config.MONGO_URI, {
  safe: true
});
var ensureAuthenticated = require('./helpers').ensureAuthenticated;

/*
 |--------------------------------------------------------------------------
 | Generic collections
 |--------------------------------------------------------------------------
*/

// Setup the collectionName param for requests
router.param('collectionName', function(req, res, next, collectionName) {
  req.collection = db.collection(collectionName)
  return next()
})

// API endpoints
// Thanks to http://webapplog.com/tutorial-node-js-and-mongodb-json-rest-api-server-with-mongoskin-and-express-js/

// GET /collections/:collectionName
router.route('/:collectionName')
  .get(function(req, res, next) {
    req.collection.find({}, {
      limit: 100,
      sort: [
        ['_id', -1]
      ]
    }).toArray(function(e, results) {
      if (e) return next(e)
      res.send(results)
    })
  })
  .post(ensureAuthenticated, function(req, res, next) {
    req.collection.insert(req.body, {}, function(e, results) {
      if (e) return next(e)
      res.send(results[0])
    })
  });

router.route('/:collectionName/:id')
  .get(function(req, res, next) {
    req.collection.findById(req.params.id, function(e, result) {
      if (e) return next(e)
      res.send(result)
    })
  })
  .put(ensureAuthenticated, function(req, res) {
    delete req.body._id
    req.collection.updateById(req.params.id, {
      $set: req.body
    }, {
      safe: true,
      multi: false
    }, function(e, result) {
      res.sendStatus((result === 1) ? 200 : 404)
    });
  })
  .delete(ensureAuthenticated, function(req, res, next) {
    req.collection.removeById(req.params.id, function(e, result) {
      if (e) return next(e)
      res.send((result === 1) ? {
        msg: 'success'
      } : {
        msg: 'error'
      })
    });
  });

module.exports = router;
