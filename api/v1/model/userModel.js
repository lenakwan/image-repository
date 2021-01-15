const db = require('../database');

async function findUser(username,password) {
    return await db.pool.query(`Select * from users where user_name='${username}' and password='${password}'`);
}
function getUserId(username) {
    return db.pool.query("Select user_id from users where user_name ='" +username +"'");
}
async function createUser(username, password) {
    return await db.pool.query(`INSERT INTO users(user_name, user_pw, user_id, admin) VALUES ('${username}', '${password}', nextval('users_user_id_seq'), false)`);
}


module.exports = {
    findUser: findUser,
   getUserId: getUserId,
   createUser: createUser
}

