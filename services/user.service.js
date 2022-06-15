const bcrypt = require('bcrypt');
const userRepository = require('../repositories/user.repository.js');

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

exports.createUser = async (payload) => {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(payload.fields.password, salt);

    const user = {
        id_user: payload.fields.id_user,
        role: payload.fields.role,
        name: payload.fields.name,
        email: payload.fields.email,
        password: encryptedPassword,
        address: payload.fields.address,
        phone: payload.fields.phone
    };
    
    return await userRepository.save(user);
    
};

exports.signInUser = async (payload) => {
    const user = await userRepository.findByEmail(payload.fields.email);

    if (user != null) {
        const checkPassword = await bcrypt.compare(
            payload.fields.password, user.password
        );

        if (checkPassword) {
            return user;
        } else {
            return null;
        }
    } else {
        return null;
    }
};