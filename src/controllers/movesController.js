const mongoose = require('mongoose');
const Moves = mongoose.model('Moves');

exports.getMoves = async (req, res) => {
  try {
    const moves = await Moves.find({ userId: req.user._id });

    res.send(moves);
  } catch (error) {
    res.send({ error: 'Unable to retrieve moves!' });
  }
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
    res.send({ error: 'Unable to create moves!' });
  }
};

exports.deleteMoves = async (req, res) => {
  try {
    await Moves.deleteOne({ _id: req.params.id });

    res.status(204).json({ message: 'success' });
  } catch (error) {
    res.send({ error: 'Smething went wrong' });
  }
};
