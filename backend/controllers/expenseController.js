import Expense from "../models/Expense.js";

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