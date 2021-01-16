const userModel=require('../model/userModel');

registerUser = async (req,res) =>{
    let body = req.body;
    existingUser = userModel.findUser(body.username);
    if(!existingUser){
        userModel.createUser(body.username, body.password);
        res.status(200).json('New User Created');
    }else{
        res.status(409).json('Existing User Found');
    }
}

loginUser = async (req,res)=>{
    let body = req.body;
    existingUser = userModel.authUser(body.username, body.password);
    if (!existingUser){
        res.status(404).json('Invalid Login');
    }else{
        res.status(200).json('User Logged In');
    }
}
module.exports = {
    registerUser : registerUser,
    loginUser : loginUser
}