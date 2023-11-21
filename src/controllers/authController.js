const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  const user = await User.findOne({ email });

  if (!user) res.status(401).send({ error: 'Invalid password or email' });

  try {
    await user.comparePassword(password);

    const token = jwt.sign({ userId: user._id }, 'MYVERYSECRETKEY');

    res.send({ token });
  } catch (err) {
    res.status(401).send({ error: 'Invalid password or email' });
  }
};

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'MYVERYSECRETKEY');
    res.send({ token });
  } catch (error) {
    return res.status(422).send(error.message);
  }
};
