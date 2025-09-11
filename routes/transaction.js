const express = require("express");
const validateTransaction = require("../validations/validateTransaction");
const userAuth = require("../middlewares/userAuth");
const Transactions = require("../models/transactions");

const transRouter = express.Router();

transRouter.get("/transactions", userAuth, async (req, res) => {
  try {
    const { _id } = req.user;
    const allTransactions = await Transactions.find({ user: _id });
    res.json({ transactions: allTransactions });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

transRouter.post("/add", userAuth, async (req, res) => {
  try {
    const { amount, category, date, title } = req.body;
    const { _id } = req.user;
    validateTransaction(req.body);
    const trans = new Transactions({
      user: _id,
      title,
      amount,
      category,
      date,
    });
    const savedTrans = await trans.save();
    res.json({
      message: "transaction  saved succesfully",
      transactionData: savedTrans,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});

transRouter.patch("/:id/edit", userAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTransaction = await Transactions.findByIdAndUpdate(
      { _id: id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTransaction) {
      throw new Error("transaction not found");
    }
    res.json({
      message: "updated succesfully",
      transaction: updatedTransaction,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

transRouter.delete("/:id/delete", userAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletetrans = await Transactions.findByIdAndDelete({
      _id: id,
      user: req.user._id,
    });
    if (!deletetrans) {
      throw new Error("Transaction not found");
    }
    res.json({
      message: "deleted successfully",
      deletedTransaction: deletetrans,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = transRouter;
