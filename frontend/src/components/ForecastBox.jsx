import { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function ForecastBox() {
    const [data, setData] = useState([]);
    const [prediction, setPrediction] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                // 1. Get actual expenses
                const resExpenses = await axios.get("http://localhost:5000/api/expenses");
                // 2. Get AI prediction
                const resForecast = await axios.get("http://localhost:5000/api/expenses/forecast");
                
                setPrediction(resForecast.data);

                // Format data for the chart
                const chartData = resExpenses.data.map(e => ({
                    name: new Date(e.date).toLocaleDateString(),
                    amount: e.amount
                }));

                // Add the prediction as a future point
                if (resForecast.data.predicted_amount) {
                    chartData.push({
                        name: "Next Month (AI)",
                        amount: resForecast.data.predicted_amount,
                        isPrediction: true
                    });
                }
                setData(chartData);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };
        getData();
    }, []);

    return (
        <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", marginBottom: "20px" }}>
            <h3>Spending Trend & AI Forecast</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        {/* Actual Spending Line */}
                        <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={3} dot={{ r: 6 }} />
                        {/* Prediction Indicator */}
                        <ReferenceLine x="Next Month (AI)" stroke="red" label="Prediction" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            {prediction && (
                <p style={{ textAlign: 'center', marginTop: '10px', color: '#666' }}>
                    AI predicts a <strong>{prediction.trend}</strong> trend: around <strong>{prediction.predicted_amount} BDT</strong>
                </p>
            )}
        </div>
    );
}