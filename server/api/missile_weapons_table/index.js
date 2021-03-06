'use strict';

var express = require('express');
var controller = require('./missile_weapons_table.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.put('/:id', controller.updateOrCreate);
router.delete('/:id', controller.destroy);
router.delete('/', controller.drop);

module.exports = router;