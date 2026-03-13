import Expense from "../models/Expense.js";
import axios from "axios";

//GET Expense

export const createExpense = async (req, res) => {
    try {
        const expense = await Expense.create(req.body);
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//GET ALL EXPENSE

export const getExpenses = async (req, res) => {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
};

//GET FORECAST
export const getSpendingForecast = async (req, res) => {
    try {
        // 1. Get all expenses from MongoDB
        const expenses = await Expense.find().sort({ date: 1 });

        // 2. Format data for the Python Service
        const formattedData = expenses.map(e => ({
            amount: e.amount,
            date: e.date.toISOString().split('T')[0]
        }));

        // 3. Call Python Microservice (running on port 8000)
        const mlResponse = await axios.post("http://localhost:8000/predict", formattedData);

        res.json(mlResponse.data);
    } catch (error) {
        res.status(500).json({ message: "Prediction service unavailable", error: error.message });
    }
};

//UPDATE EXPENSE
export const updateExpense = async (req, res) => {
    const expense = await Expense.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(expense);
};


//DELETE EXPENSE
export const deleteExpense = async (req, res) => {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted" });
};