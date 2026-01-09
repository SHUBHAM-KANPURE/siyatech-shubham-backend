const express = require("express");
const {
  createTable,
  getTables,
  getTableById,
  updateTable,
  deleteTable,
} = require("../controller/tableController");

const router = express.Router();

router.post("/create-table", createTable);
router.get("/get-table", getTables);
router.get("/:id", getTableById);
router.put("/:id", updateTable);
router.delete("/:id", deleteTable);

module.exports = router;