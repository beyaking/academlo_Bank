const { where } = require("sequelize");
const Transfer = require("../models/transfer.models");
const User = require("../models/user.models");

// ----- Transferencia ---------------------
exports.sendTransfer = async (req, res) => {
  //------ Recibimos de req.body
  const { amount, accountNumber, senderUserId } = req.body;

  //------ Buscamos la cuenta del usuario que recibe
  const userRx = await User.findOne({
    where: {
      accountNumber,
      status: true,
    },
  });

  if (userRx === null) {
    return res.status(404).json({
      status: "error",
      message: "The account number does not exist",
    });
  }

  const receiverUserId = userRx.id;

  //------ Buscamos el ID del usuario que envia
  const userTx = await User.findOne({
    where: {
      id: senderUserId,
      status: true,
    },
  });

  if (userTx === null) {
    return res.status(404).json({
      status: "error",
      message: "user not found",
    });
  }

  //------ Validamos que el user que envia no sea el mismo que recibe

  if (senderUserId === receiverUserId) {
    return res.status(404).json({
      status: "error",
      message: "Cannot send to the same user",
    });
  }

  //------ Validamos que el user que envia tenga saldo suficiente

  if (amount > userTx.amount) {
    return res.status(404).json({
      status: "error",
      message: "Not enough funds",
    });
  }

  //------ Descontamos saldo del que envia y se lo sumamos al que recibe

  const newAmountUserMakeTransfer = Number(userTx.amount) - Number(amount);
  const newAmountUserReceiver = Number(userRx.amount) + Number(amount);

  await userTx.update({ amount: newAmountUserMakeTransfer });
  await userRx.update({ amount: newAmountUserReceiver });

  //------ Creamos la Transferencia

  await Transfer.create({ amount, senderUserId, receiverUserId });

  //------ Mensaje de confirmacion exitosa

  res.status(200).json({
    status: "success",
    message: "successful transfer",
  });
};
