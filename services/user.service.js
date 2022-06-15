const bcrypt = require('bcrypt');
const userRepository = require('../repositories/user.repository.js');

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