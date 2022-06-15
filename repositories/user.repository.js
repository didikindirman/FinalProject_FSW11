const db = require('../models/index.js');
const User = db.user;

exports.save = async (payload) => {
    const user = await User.create(payload);

    return user;
};

exports.findByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};