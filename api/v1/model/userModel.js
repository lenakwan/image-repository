const db = require('../database');

/**
 * Checks if username and password exists in the database.
 *
 * @param {string} username username
 * @param {string} password password
 */
authUser = async (username, password) => {
    return await db.pool.query(`Select * from users where user_name='${username}' and user_pw='${password}'`);
}

/**
 * Registers a new user into the database.
 *
 * @param {string} username username
 */
findUser = async (username) => {
    return db.pool.query("Select user_id from users where user_name ='" + username + "'");
}

/**
 * Creates a new user within the database.
 *
 * @param {string} username username
 * @param {string} password password
 */
createUser = async (username, password) => {
    return await db.pool.query(`INSERT INTO users(user_name, user_pw, user_id, admin) VALUES ('${username}', '${password}', nextval('users_user_id_seq'), false)`);
}


module.exports = {
    authUser: authUser,
    findUser: findUser,
    createUser: createUser
}