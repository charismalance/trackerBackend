const router = require("express").Router();
const {chatOfRoom} = require("../controller/soket")

router.post("/findChat",chatOfRoom)

module.exports = router