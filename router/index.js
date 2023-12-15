const router = require("express").Router();


router.use("/api/v1/auth",require("./auth"))
router.use("/api/v1/user",require("./users"))
module.exports = router