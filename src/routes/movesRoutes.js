const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const { getMoves, createMoves } = require('../controllers/movesController');

const router = express.Router();

router.use(requireAuth);

router.get('/moves', getMoves);

router.post('/moves', createMoves);

module.exports = router;
