var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res, next) {
    models.film
      .findAll({})
      .then(filmsFound => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(filmsFound));
      });
  });
  
  router.get('/:id', function(req, res, next) {
    models.film
      .findOne({ 
        where: { film_id: parseInt(req.params.id) }
      })
      .then(filmFound => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(filmFound));
      })
  });

  router.put("/:id", function (req, res, next) {
    let filmTitle = parseInt(req.params.id);
    models.film
      .update(req.body, { where: { film_id: parseInt(req.params.id) } })
      .then(result => res.redirect('/films'))
      .catch(err => {
        res.status(400);
        res.send("There was a problem updating the film's Title.  Please check the film information.");
      });
  });

module.exports = router;