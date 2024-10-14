const express = require("express");
const { updateSeller } = require("../../controllers/seller");
const router = express.Router();
router.put("/updateSeller", updateSeller);
module.exports = router;
