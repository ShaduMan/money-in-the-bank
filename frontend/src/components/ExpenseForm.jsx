import { useState } from "react";
import { addExpense } from "../services/api";

export default function ExpenseForm({ refresh }) {
    const [form, setForm] = useState({ title: "", amount: "", category: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title || !form.amount) return;
        await addExpense(form);
        setForm({ title: "", amount: "", category: "" });
        refresh();
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                style={{ marginRight: "8px" }}
            />
            <input
                type="number"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                style={{ marginRight: "8px" }}
            />
            <input
                type="text"
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                style={{ marginRight: "8px" }}
            />
            <button type="submit">Add Expense</button>
        </form>
    );
}