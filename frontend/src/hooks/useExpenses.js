import { useState, useEffect } from "react";
import { getExpenses } from "../services/api";

export default function useExpenses() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchExpenses = async () => {
        try {
            const res = await getExpenses();
            setExpenses(res.data);
        } catch (err) {
            console.error("Error fetching expenses:", err);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return { expenses, fetchExpenses, setExpenses, setLoading };
}