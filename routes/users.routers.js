const { Router } = require("express");
const {
  loginUser,
  getUserTransfer,
  createUser,
} = require("../controllers/users.controller");

const router = Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/:id/history", getUserTransfer);

module.exports = {
  usersRouter: router,
};
