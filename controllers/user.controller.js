const userService = require('../services/user.service.js');
const jwt = require("../util/jwt.util.js")

exports.register = async (request, response) => {
    const user = await userService.register(request.fields);

    return response.status(user.httpCode).json({
      httpCode: user.httpCode,
      message: user.message,
      data: user.data
    });
}

exports.login = async (request, response) => {
    const user = await userService.login(request.fields);
  
    if (!user.result)
      return response
        .status(user.httpCode)
        .json({ httpCode: user.httpCode, message: user.message });
  
    const token = await jwt.generateToken({
      email: user.data.email,
      role: user.data.role,
    });
  
    return response.status(user.httpCode).json({
      httpCode: user.httpCode,
      message: user.message,
      token: token,
    });
  };

  