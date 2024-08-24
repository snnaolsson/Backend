const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token missing' });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        req.user = user;  // Lägg till användarinformationen i förfrågan
        next();  // Gå vidare till nästa middleware eller rutt
    });
}

module.exports = auth;  // Exportera auth-funktionen
