const jwt = require("jsonwebtoken")
const User = require("../models").User;
const UserRole = require("../models").UserRole;
const Role = require("../models").Role;

const bcrypt = require("bcrypt")
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * error codes 
 * 201 not found
 * 200 success
 * 202 catch error
 * 203 insert failed
 * 204 password not true
 * @returns 
 */

exports.authentications = async (req, res) => {
    const { userName } = req.body
    try {
        const user = await User.findOne({
            where: {
                userName
            }
        });
        if (!user) {
            return res.send({ status: "error", message: "user not found", code: "201" })
        }
        return res.send({ status: "success", message: `${userName} found`, code: "200" })
    } catch (error) {
        return res.send({ status: "catch error", message: error.message, code: "202" })
    }
}
exports.signIn = async (req, res) => {
    const { userName , password ,role } = req.body
    try {
        const user = await User.findOne({
            where: {
                userName
            }
        });
        if (user) {
            return res.send({ status: "error", message: "this user sigin ago", code: "203" })
        }
        const users = await User.create(req.body);
        const roles = await  Role.findAll({
            where: {
                title: {
                    [Op.or]: role
                }
            }
        })
        await users.setRoles(roles)
        const userWithToken = generateToken(user.get({ raw: true }));
        return res.send(userWithToken)
    } catch (error) {
        return res.send({ status: "catch error", message: error.message, code: "202" })
    }
}
exports.login = async(req,res)=>{
    const { userName, password } = req.body;
    try {
        const user = await User.findOne({
            where: {
                userName
            }
        });
        if (!user) {
            return res.status(404).send({
                status: 'Error',
                message: "User not found!"
            });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).send({
                code:"204" , 
                status: "Error",
                message: "Incorrect password!"
            });
        }
        let userRoles = [];
        const roles = await UserRole.findAll({
            where: { userId: user.id },
            include: [
                {
                    model: Role
                }
            ]

        })
        roles.forEach(role => {
            userRoles.push(role.Role.title)
        })
        const userWithToken = generateToken(user.get({ raw: true }), userRoles)
        return res.send(userWithToken)

    } catch (error) {
        return res.status(500).send({
            status: 'Error',
            message: error.message
        });
    }
}
const generateToken = (user, roles) => {
    delete user.password;
    console.log(user)
    user.roles = roles
    const token = jwt.sign(user, process.env.appKey, { expiresIn: 86400 })
    return { ...{ user }, ...{ token } }
}