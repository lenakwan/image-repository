const userModel = require('../model/userModel');

registerUser = async (req, res) => {
    let body = req.body;
    userModel.findUser(body.username).then((users) => {
        if (users.rowCount == 0) {
            userModel.createUser(body.username, body.password)
                .catch(e => res.status(500).json({
                    message: 'Internal Server Error' + e.message
                }))
            res.status(200).json('New User Created')
        } else {
            res.status(409).json('User Exists')
        };
    })
}



loginUser = async (req, res) => {
    let body = req.body;
    userModel.authUser(body.username, body.password).catch(e => res.status(500).json({
        message: 'login failed' + e.message
    }));
    res.status(200).json('Login Success!')
}
module.exports = {
    registerUser: registerUser,
    loginUser: loginUser
}