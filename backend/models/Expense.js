import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        min: 0,
        required: true
    },
    category: {
        type: String,
        default: "general"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Expense", expenseSchema);