import { motion } from "framer-motion";
import { cardVariant } from "../animations/motionVariants";
import { deleteExpense } from "../services/api";

export default function ExpenseCard({ expense, refresh }) {
    const handleDelete = async () => {
        await deleteExpense(expense._id);
        refresh();
    };

    return (
        <motion.div
            variants={cardVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="expense-card"
            style={{
                border: "1px solid #ccc",
                padding: "12px",
                marginBottom: "8px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <div>
                <h4>{expense.title}</h4>
                <p>{expense.category}</p>
                <strong>{expense.amount} BDT</strong>
            </div>
            <button onClick={handleDelete} style={{ cursor: "pointer" }}>
                Delete
            </button>
        </motion.div>
    );
}