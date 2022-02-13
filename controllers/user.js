const UserSchema = require('../models/user');
const { generateAccessToken } = require('../middlewares/auth');

exports.login = async (req, res) => {
  try {
    const user = await UserSchema.findByEmail(req.body.email).lean();
    if (!user) {
      throw new Error('User not found!');
    }
    const token = generateAccessToken({
      email: user.email,
      type: user.type
    });
    res.status(200).json({
      success: true,
      user,
      token
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      err: String(error)
    });
  }
};

exports.register = async (req, res) => {
  try {
    const user = await UserSchema.create({
      name: req.body.name,
      email: req.body.email,
      avatar_url: req.body.avatar_url || ''
    });
    const token = generateAccessToken({
      email: user.email,
      type: user.type
    });
    res.status(200).json({
      success: true,
      user,
      token
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      err: String(error)
    });
  }
};

exports.view = async (req, res) => {
  try {
    if (req.user.type != 'admin' && req.user.email != req.params.email) {
      throw new Error('Permission Denied!');
    }
    const user = await UserSchema.findByEmail(req.params.email).lean();
    if (!user) {
      throw new Error('User not found!');
    }
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      err: String(error)
    });
  }
};

exports.viewAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.type) {
      filter.type = req.query.type;
    }
    const users = await UserSchema.find(filter).lean();
    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      err: String(error)
    });
  }
};

exports.changePermission = async (req, res) => {
  try {
    const user = await UserSchema.findByEmail(req.body.email);
    if (!user) {
      throw new Error('User not found!');
    }
    user.type = req.body.updatedType;
    await user.save();
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      err: String(error)
    });
  }
};
