const db = require('../database');

findUser = async (username, password) => {
    return await db.pool.query(`Select * from users where user_name='${username}' and password='${password}'`);
}
getUserId = async (username) => {
    return db.pool.query("Select user_id from users where user_name ='" + username + "'");
}
createUser = async (username, password) => {
    return await db.pool.query(`INSERT INTO users(user_name, user_pw, user_id, admin) VALUES ('${username}', '${password}', nextval('users_user_id_seq'), false)`);
}


module.exports = {
    findUser: findUser,
    getUserId: getUserId,
    createUser: createUser
}