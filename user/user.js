const db = require('../config/configdb');

// Registration Handler
async function saveUser(req, res) {
    const { username, password, fname, lname, gender } = req.body;
    let condb;
    try {
        condb = await db.getConnection();
        await condb.query(
            'INSERT INTO user (username, password, fname, lname, gender) VALUES (?, ?, ?, ?, ?)',
            [username, password, fname, lname, gender]
        );
        res.status(201).json({ success: true, message: 'User registered successfully!' });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ success: false, message: 'Database error occurred during registration.' });
    } finally {
        if (condb) condb.release();
    }
}

// Login Handler
async function loginUser(req, res) {
    const { username, password } = req.body;
    console.log(">>>> Backend processing login attempt for:", username);

    let condb;
    try {
        condb = await db.getConnection();
        const [rows] = await condb.query(
            'SELECT userid, username, fname, lname, gender FROM user WHERE username = ? AND password = ?',
            [username, password]
        );

        if (rows.length > 0) {
            // Return successful connection status and the matched database row object
            res.json({ success: true, message: 'Login successful!', user: rows[0] });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }
    } catch (error) {
        console.error("MySQL Login Error Details:", error);
        res.status(500).json({ success: false, message: 'Database server error.' });
    } finally {
        if (condb) condb.release();
    }
}

module.exports = { saveUser, loginUser };