const router = require("express").Router();


router.use("/api/v1/auth",require("./auth"))

module.exports = router