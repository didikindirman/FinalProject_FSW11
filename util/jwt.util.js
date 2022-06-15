const jwt = require('jsonwebtoken');

exports.generateToken = async (payload) => {
    return await jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '60000s' });
};

exports.decodeToken = async (token) => {
    return await jwt.verify(payload, process.env.JWT_SECRET_KEY);
};