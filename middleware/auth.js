const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');


const User = require("../models").User;
const bcrypt = require('bcrypt');



exports.setHeaders = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
};

exports.auth = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ error: 'Missing Token!' })
    }
    jwt.verify(token, process.env.appKey, (err, user) => {
        if (err) {
            return res.status(401).json({ error: err })
        }
        req.user = user
    })
    next()
}
exports.isAdmin = async (req, res, next) => {
    await User.findByPk(req.user.id).then(user => {
         user.getRoles().then(roles => {
             for (let i = 0; i < roles.length; i++) {
 
                 if (roles[i].title === "admin") {
                     next();
                     return;
                 }
             }
             res.status(403).send({
                 message: "Require Admin Role!"
             });
             return;
         });
     });
 };