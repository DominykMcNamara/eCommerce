const db = require('../db/index')

const checkDuplicateUsernames = async (req, res, next) => {
    const { username } = req.body
    if (!username) {
        return res.status(400).json({ message: "Username is required."})
    }
    try {
        db.query('SELECT * FROM user WHERE username = 1$', [username], (err, rows) => {
            if (err) { return res.status(404).json({ message: err.message })}
            if (rows) {return res.status(409).json({ message: 'Username already exists.'})}
        })
    } catch(err) {
        res.sendStatus(500).json({ message: err.message})
    }
    next()
}

module.exports = {checkDuplicateUsernames}

