import ExpenseForm from "./ExpenseForm";
import ExpenseCard from "./ExpenseCard";
import ForecastBox from "./ForecastBox";
import useExpenses from "../hooks/useExpenses";
import { AnimatePresence } from "framer-motion";

export default function Dashboard() {
    const { expenses, fetchExpenses, loading } = useExpenses();

    return (
        <div style={{ maxWidth: "600px", margin: "40px auto" }}>
            <h1>Student Finance Tracker</h1>

            <ForecastBox expenses={expenses} /> 
      
            <hr style={{ margin: "20px 0", opacity: 0.2 }} /> 
            
            <ExpenseForm refresh={fetchExpenses} />

            <AnimatePresence>
                {expenses.map((expense) => (
                    <ExpenseCard
                        key={expense._id}
                        expense={expense}
                        refresh={fetchExpenses}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}