const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const {
  getMoves,
  createMoves,
  deleteMoves,
} = require('../controllers/movesController');

const router = express.Router();

router.use(requireAuth);

router.get('/moves', getMoves);

router.post('/moves', createMoves);

router.delete('/deletemove/:id', deleteMoves);

module.exports = router;
