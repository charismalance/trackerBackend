const router = require("express").Router();

const {authentications,login,signIn} =require("../controller/auth")
router.post("/signIn",login)
router.post("/signIn2",login)
router.post("/signUp",signIn)
router.post("/authentications",authentications)
module.exports   = router