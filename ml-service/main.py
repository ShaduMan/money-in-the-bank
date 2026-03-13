from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np

app = FastAPI()

class Expense(BaseModel):
    amount: float
    date: str  # Format: YYYY-MM-DD

@app.post("/predict")
async def predict_spending(expenses: List[Expense]):
    if len(expenses) < 3:
        return {"prediction": None, "message": "Need at least 3 expenses to forecast"}

    # 1. Convert to DataFrame
    df = pd.DataFrame([e.dict() for e in expenses])
    df['date'] = pd.to_datetime(df['date'])
    
    # 2. Process dates into "Days since first expense"
    df['days'] = (df['date'] - df['date'].min()).dt.days
    
    # 3. Train a simple Linear Regression model
    X = df[['days']].values
    y = df['amount'].values
    model = LinearRegression().fit(X, y)
    
    # 4. Predict for 30 days into the future
    next_day = np.array([[df['days'].max() + 30]])
    prediction = model.predict(next_day)[0]

    return {
        "predicted_amount": round(float(prediction), 2),
        "trend": "up" if model.coef_[0] > 0 else "down"
    }