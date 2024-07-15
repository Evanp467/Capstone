from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the trained model
model = joblib.load('trained_salary_model.pkl')

# Define the exact columns expected by the model
expected_columns = [
    'location_x', 'location_y', 'destination_x', 'destination_y', 'manager_id',
    'role_CEO', 'role_CFO', 'role_COO', 'role_CSO', 'role_CTO', 'role_Cybersecurity',
    'role_Data Engineer', 'role_HR', 'role_Manager', 'role_Marketing', 'role_Public Relations',
    'role_Sales', 'role_Software Dev', 'city_Albany', 'city_Boston', 'city_Forrest Hill',
    'city_Hartford', 'city_Hunt Valley', 'city_New York City', 'city_Torrington'
]

@app.route('/api/predict-salary', methods=['POST'])
def predict_salary():
    try:
        data = request.get_json()
        role = data.get('role')
        city = data.get('city')

        # Use 'role_Software Dev' as proxy for 'Employee'
        if role == 'Employee':
            role = 'Software Dev'

        # One-hot encode the role and city
        input_data = {f'role_{role}': 1, f'city_{city}': 1}
        input_df = pd.DataFrame([input_data], columns=expected_columns).fillna(0)

        # Use the model to predict the salary
        prediction = model.predict(input_df)
        salary = prediction[0]

        return jsonify({'salary': salary})
    except Exception as e:
        app.logger.error(f"Error predicting salary: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)
