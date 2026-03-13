import express from "express";
import {
    createExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
    getSpendingForecast
} from "../controllers/expenseController.js";

const router = express.Router();

router.post("/", createExpense);
router.get("/", getExpenses);
router.get("/forecast", getSpendingForecast);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);


export default router;