const userModel = require('../model/userModel');

registerUser = async (req, res) => {
    let body = req.body;
    userModel.createUser(body.username, body.password);
    res.status(200).json('New User Created').catch(e => res.status(500).json({
        message: e.message
    }))
}

loginUser = async (req, res) => {
    let body = req.body;
    userModel.authUser(body.username, body.password).then((existingUser) => {
        if (existingUser.row == 0) {
            res.status(404).json('Invalid Login');
        } else {
            res.status(200).json('User Logged In');
        }
    }).catch(err => {
        res.status(500).json('err');
    });
}
module.exports = {
    registerUser: registerUser,
    loginUser: loginUser
}