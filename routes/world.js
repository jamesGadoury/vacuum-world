var express = require('express');
var router = express.Router();

const world_controller = require('../controllers/worldController');

/* GET home page. */
router.get('/1', world_controller.world_1_get);
router.post('/1', world_controller.world_1_post_reset);

module.exports = router;
