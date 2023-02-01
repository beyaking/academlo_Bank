const { where } = require("sequelize");
const Transfer = require("../models/transfer.models");
const User = require("../models/user.models");

//-------- Crear usuario -------------

exports.createUser = async (req, res) => {
  const { name, password } = req.body;

  let accountNumber = Math.floor(Math.random() * 899999 + 100000);
  const amount = 1000;

  const newUser = await User.create({
    name,
    password,
    amount,
    accountNumber,
  });
  res.status(200).json({
    status: "success",
    message: "The user was created successfully",
    newUser,
  });
};

//-------- Login de usuario -------------

exports.loginUser = async (req, res) => {
  const { accountNumber, password } = req.body;

  const userFinder = await User.findOne({
    where: {
      accountNumber,
      password,
      status: true,
    },
  });

  if (userFinder === null) {
    return res.status(404).json({
      status: "error",
      message: "No users found",
      userFinder,
    });
  }

  res.status(200).json({
    status: "success",
    message: "User successfully logged in",
    userFinder,
  });
};

//-------- Obtener transferencia de usuarios -------------

exports.getUserTransfer = async (req, res) => {
  const { id } = req.params;

  const history = await Transfer.findAll({
    where: {
      senderUserId: id,
    },
  });

  if (
    (await Transfer.findOne({
      where: {
        senderUserId: id,
      },
    })) === null
  ) {
    return res.status(404).json({
      status: "error",
      message: "History not found",
    });
  }

  const userFinder = await User.findOne({
    where: {
      id,
    },
  });

  const nameUser = userFinder.name;

  res.status(200).json({
    status: "success",
    message: "Transfer history made by " + nameUser,
    history,
  });
};
