const userModel=require('../model/userModel');

registerUser = async (req,res) =>{
    let body = req.body;
    existingUser = await userModel.findUser(body.username);
    if(existingUser.row == 0){
        userModel.createUser(body.username, body.password);
        res.status(200).json('New User Created');
    }else{
        res.status(409).json('Existing User Found');
    }
}

loginUser = async (req,res)=>{
    let body = req.body;
    existingUser = await userModel.authUser(body.username, body.password);
    console.log(existingUser);
    if (existingUser.row == 0){
        res.status(404).json('Invalid Login');
    }else{
        res.status(200).json('User Logged In');
    }
}
module.exports = {
    registerUser : registerUser,
    loginUser : loginUser
}