import pandas as pd
import pickle

# Load the trained model
with open("trained_salary_model.pkl", "rb") as f:
    model = pickle.load(f)

# Function to preprocess the input and predict the salary
def predict_salary(role, city):
    # Create a DataFrame with a single row containing the input role and city
    df_input = pd.DataFrame([[role, city]], columns=['role', 'city'])

    # Load the original data to get the columns and dummies
    try:
        df_original = pd.read_csv("employees.csv", encoding='utf-8')
    except UnicodeDecodeError:
        try:
            df_original = pd.read_csv("employees.csv", encoding='latin1')
        except UnicodeDecodeError:
            try:
                df_original = pd.read_csv("employees.csv", encoding='iso-8859-1')
            except Exception as e:
                print(f"Error loading the file: {e}")
                raise

    # Create dummy variables for the input
    df_encoded = pd.get_dummies(df_original, columns=['role', 'city'])
    input_encoded = pd.get_dummies(df_input, columns=['role', 'city'])
    
    # Ensure the input has the same columns as the training data
    for col in df_encoded.columns:
        if col not in input_encoded.columns:
            input_encoded[col] = 0
            
    # Drop any extra columns
    input_encoded = input_encoded[df_encoded.columns.drop(['employee_id', 'name', 'show', 'phone', 'salary', 'manager_id'])]
    
    # Predict the salary
    predicted_salary = model.predict(input_encoded)[0]
    return predicted_salary

# Main function to run the script
if __name__ == "__main__":
    role = input("Enter the role: ")
    city = input("Enter the city: ")
    
    predicted_salary = predict_salary(role, city)
    
    print(f"The predicted salary for role '{role}' in city '{city}' is: {predicted_salary}")