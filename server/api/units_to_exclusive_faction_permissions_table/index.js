'use strict';

var express = require('express');
var controller = require('./units_to_exclusive_faction_permissions_table.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.delete('/', controller.drop);

module.exports = router;