const userService = require('../services/user.service.js');
const jwt = require("../util/jwt.util.js")

exports.createNewUserApi = async (request, response) => {
    const user = await userService.createUser(request);

    response.status(201).json({ data: user });
}

exports.login = async (req, res) => {
    const user = await userService.login(req.fields);
  
    if (!user.result)
      return res
        .status(user.httpCode)
        .json({ httpCode: user.httpCode, message: user.message });
  
    const token = await jwt.generateToken({
      email: user.data.email,
      role: user.data.role,
    });
  
    return res.status(user.httpCode).json({
      httpCode: user.httpCode,
      message: user.message,
      token: token,
    });
  };