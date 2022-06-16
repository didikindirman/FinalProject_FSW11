const bcrypt = require('bcrypt');
const userRepository = require('../repositories/user.repository.js');
const randomNumber = require('../util/randomNumber.js');

exports.login = async (data) => {
    const user = await userRepository.findByEmail(data.email);
    let result = { httpCode: null, message: null, result: false, data: null };
  
    if (!user) {
      (result.httpCode = 404),
        (result.message = `User ${data.email} doesn't exist`);
      return result;
    }
  
    const checkPassword = await bcrypt.compare(data.password, user.password);
    if (!checkPassword) {
      (result.httpCode = 403), (result.message = "Wrong Password");
      return result;
    }
  
    result.httpCode = 200;
    result.message = "Login Succesfully";
    result.result = true;
    result.data = user;
    return result;
  };

exports.register = async (payload) => {
    const email = await userRepository.findByEmail(payload.email);
    let result = { httpCode: null, message: null, result: false, data: null };
    if (email) {
        (result.httpCode = 403),
          (result.message = `User ${payload.email} exist`);
        return result;
      }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(payload.password, salt);

    const uniqueId = Math.floor(Math.random() * 100) + Number(Date.now());
    const user = {
        email: payload.email,
        password: encryptedPassword,
        role: payload.role,
        id_user: uniqueId
    };

    const addUser = await userRepository.save(user);

    result.httpCode = 200;
    result.message = "Register Succesfully";
    result.result = true;
    result.data = addUser;
    return result;
};