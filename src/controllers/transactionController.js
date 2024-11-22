const Transaction = require("../models/Transaction");

// POST /api/transactions/
exports.createTransaction = async (req, res) => {
  const { amount, transaction_type, user } = req.body;

  if (!amount || !transaction_type || !user) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const transaction = await Transaction.create({
      amount,
      transaction_type,
      user,
    });
    return res.status(201).json(transaction);
  } catch (error) {
    return res.status(500).json({ error: "Error creating transaction." });
  }
};

// GET /api/transactions/
exports.getTransactionsByUser = async (req, res) => {
  const { user_id } = req.query;

  try {
    const transactions = await Transaction.find({ user: user_id }).sort({
      timestamp: -1,
    });
    return res.status(200).json({ transactions });
  } catch (error) {
    return res.status(500).json({ error: "Error retrieving transactions." });
  }
};

// PUT /api/transactions/:transaction_id/
exports.updateTransactionStatus = async (req, res) => {
  const { transaction_id } = req.params;
  const { status } = req.body;

  if (!["COMPLETED", "FAILED"].includes(status)) {
    return res.status(400).json({ error: "Invalid status." });
  }

  try {
    const transaction = await Transaction.findByIdAndUpdate(
      transaction_id,
      { status },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    return res.status(500).json({ error: "Error updating transaction." });
  }
};

// GET /api/transactions/:transaction_id/
exports.getTransactionById = async (req, res) => {
  const { transaction_id } = req.params;

  try {
    const transaction = await Transaction.findById(transaction_id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    return res.status(500).json({ error: "Error retrieving transaction." });
  }
};
