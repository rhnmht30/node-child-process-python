const express = require("express");
const router = express.Router();

const { index, data } = require("../../../controllers/index_controller");

router.get("/", index);
router.get("/data", data);

module.exports = router;
