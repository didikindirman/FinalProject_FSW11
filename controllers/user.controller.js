const userService = require('../service/user.service.js');

exports.createNewUserApi = async (request, response) => {
    const user = await userService.createUser(request);

    response.status(201).json({ data: user });
}