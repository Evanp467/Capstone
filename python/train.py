import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import mean_squared_error
import pickle

# Load the data with specified encoding
try:
    df = pd.read_csv("employees.csv", encoding='utf-8')
except UnicodeDecodeError:
    try:
        df = pd.read_csv("employees.csv", encoding='latin1')
    except UnicodeDecodeError:
        try:
            df = pd.read_csv("employees.csv", encoding='iso-8859-1')
        except Exception as e:
            print(f"Error loading the file: {e}")
            raise

# Data Exploration
# Count roles
role_count = df['role'].value_counts()
print(role_count)

# Count by city
city_count = df['city'].value_counts()
print(city_count)

# Visualize the data
sns.countplot(data=df, x='role')
plt.title('Character Count by Role')
plt.xticks(rotation=45)
plt.show()

sns.countplot(data=df, x='city')
plt.title('Count by City')
plt.xticks(rotation=45)
plt.show()

# Ensure all categorical features are encoded to numeric
df_encoded = pd.get_dummies(df, columns=['role', 'city'])

# Define features and target
X = df_encoded.drop(columns=['employee_id', 'name', 'show', 'phone', 'salary', 'manager_id'])  # Ensure non-numeric and unnecessary columns are dropped
y = df_encoded['salary']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = DecisionTreeRegressor()
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error: {mse}")

# Save the model
with open("trained_salary_model.pkl", "wb") as f:
    pickle.dump(model, f)

# Get feature importances
importances = model.feature_importances_
feature_importances = pd.DataFrame({'Feature': X.columns, 'Importance': importances})
feature_importances = feature_importances.sort_values(by='Importance', ascending=False)

# Plot feature importances
plt.figure(figsize=(10, 8))
sns.barplot(data=feature_importances, x='Importance', y='Feature')
plt.title('Feature Importances')
plt.show()