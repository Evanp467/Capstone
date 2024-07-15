import joblib

# Load the trained model
model = joblib.load('trained_salary_model.pkl')

# Inspect the expected feature names
expected_features = model.feature_names_in_

print("Expected Features:")
for feature in expected_features:
    print(feature)
