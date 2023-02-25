const jwt = require("jsonwebtoken");

// middleware to validate token
const verifyToken = (req, res, next) => {
    // const token = req.header('Authorization');
    const authorization = req.header("Authorization");
    // console.log(token)
    if (!authorization) return res.status(401).json({ error: "Access denied" });

    try {
        // const token = authorization.split('Bearer ')[1]
        const verified = jwt.verify(authorization, process.env.TOKEN_SECRET);
        console.log('verified', verified)
        req.user = verified;
        next(); // to continue the flow
    } catch (err) {
        res.status(400).json({ error: "Token is not valid" });
    }
};
module.exports = verifyToken;