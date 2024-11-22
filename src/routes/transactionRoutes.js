const express = require("express");
const {
  createTransaction,
  getTransactionsByUser,
  updateTransactionStatus,
  getTransactionById,
} = require("../controllers/transactionController");

const router = express.Router();

router.post("/", createTransaction);
router.get("/", getTransactionsByUser);
router.put("/:transaction_id", updateTransactionStatus);
router.get("/:transaction_id", getTransactionById);

module.exports = router;
