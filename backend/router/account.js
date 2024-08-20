const express = require("express");
const { Account, User } = require("../db");
const { authMiddleware } = require("../middleware");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is account page");
});

router.get("/balance", authMiddleware, async (req, res) => {
  const user = await User.findOne({ userName: req.userName });
  const account = await Account.findOne({
    userId: user._id,
  });

  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }

  res.json({ balance: account.balance });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { amount, to_id } = req.body;
  if (amount < 0) {
    return res.status(400).json({ message: "cannot send negative value" });
  }

  try {
    // Fetch the sender's account within the transaction
    const sender = await User.findOne({ userName: req.userName });
    const senderAccount = await Account.findOne({ userId: sender._id }).session(
      session
    );

    if (!senderAccount || senderAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Fetch the recipient's account
    const recipient = await User.findOne({ _id: to_id });
    if (!recipient) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid recipient account" });
    }
    const recipientAccount = await Account.findOne({
      userId: recipient._id,
    }).session(session);

    if (!recipientAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid account" });
    }

    // Perform the transfer
    await Account.updateOne(
      { userId: sender._id },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: recipient._id },
      { $inc: { balance: amount } }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({ message: "Transfer successful" });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: "Transfer failed", error: error.message });
  } finally {
    session.endSession();
  }
});

module.exports = router;
