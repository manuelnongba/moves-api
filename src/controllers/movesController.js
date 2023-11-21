const mongoose = require('mongoose');
const Moves = mongoose.model('Moves');

exports.getMoves = async (req, res) => {
  const moves = await Moves.find({ userId: req.user._id });

  res.send(moves);
};
exports.createMoves = async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: 'You must provide a name and locations' });
  }

  try {
    const moves = new Moves({ name, locations, userId: req.user._id });

    await moves.save();
    res.send(moves);
  } catch (error) {
    res.send({ error: 'Unable to retrieve moves!' });
  }
};
