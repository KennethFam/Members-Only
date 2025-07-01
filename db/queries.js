const pool = require("./pool");

async function getUserByUsername(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return rows[0];
}

async function getUserByID(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return rows[0];
}

async function signUp(firstName, lastName, username, hashedPassword) {
    await pool.query("INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)", [firstName, lastName, username, hashedPassword]);
}

async function getMessagesWithoutData() {
    const { rows } = await pool.query("SELECT * FROM messages ORDER BY created ASC");
    return rows;
}

async function getMessagesWithData() {
    // we need to specify messages.id here otherwise the merge will overwrite it with user.id since both columns have the same name
    console.log("here");
    const { rows } = await pool.query(`
        SELECT  
            messages.id,
            messages.msg,
            messages.created,
            users.username,
            users.first_name,
            users.last_name
        FROM messages 
        JOIN users ON messages.user_id = users.id 
        ORDER BY created ASC
    `);
    return rows;
}

async function newMessage(user, msg) {
    await pool.query("INSERT INTO messages (user_id, msg) VALUES ($1, $2)", [user.id, msg]);
}

async function promoteToMember(user) {
    await pool.query("UPDATE users SET mem_status = $1 WHERE id=$2", [true, user.id]);
}

async function promoteToAdmin(user) {
    await pool.query("UPDATE users SET admin = $1 WHERE id=$2", [true, user.id]);
}

async function deleteMsg(id) {
    const result = await pool.query("DELETE FROM messages WHERE id=$1", [id]);
    console.log(id)
}

module.exports = {
    getUserByUsername,
    getUserByID,
    signUp,
    getMessagesWithoutData,
    getMessagesWithData,
    newMessage,
    promoteToMember,
    promoteToAdmin,
    deleteMsg,
}