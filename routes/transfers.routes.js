const { Router } = require("express");
const { sendTransfer } = require("../controllers/transfers.controller");

const router = Router();

router.post("/", sendTransfer);

module.exports = {
  transfersRouter: router,
};
