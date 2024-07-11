import csv
import random
from datetime import datetime, timedelta
import json

# Generate data for characters
NUM_ROWS = 1000

# Create the CSV file
OUTPUT_FILE = "employees.csv"

# Load City data from JSON file
with open("city.json") as json_file:
    city = json.load(json_file)

# Generate a phone number
def generate_phone_number():
    first_three = random.randint(100, 999)
    last_four = random.randint(1000, 9999)
    return f"{first_three}-{last_four}"

# Generate data rows
data_rows = []
for i in range(1, NUM_ROWS + 1):
    # Generate random values for each column
    employee_id = i
    phone = generate_phone_number
    if i == 1:
        role = "CEO"
    elif i == 2:
        role = "CFO"
    elif i == 3:
        role = "CSO"
    elif 4 <= i <= 23:
        role = "HR"
    elif 24 <= i <= 223:
        role = "Manager"
    else:
        role = random.choice(
            ["Software Dev", "Data Engineer", "Cybersecurity", "Sales", "Marketing", "Public Relations"]
        )
    location_x = random.randint(1, 10)
    location_y = random.randint(1, 10)
    destination_x = random.randint(1, 10)
    destination_y = random.randint(1, 10)

    # Select a random City from the available options
    city = random.choice(city)
    city_name = city["name"]

    # Create the data row
    data_row = [
        employee_id,
        role,
        phone,
        location_x,
        location_y,
        destination_x,
        destination_y,
        city,
    ]

    # Add the data row to the list
    data_rows.append(data_row)

# Write the data to the CSV file
with open(OUTPUT_FILE, "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(
        ["timestamp", "unit_id", "unit_type", "empire_or_resistance", "location_x", "location_y", "destination_x",
         "destination_y", "homeworld"]
    )
    writer.writerows(data_rows)

print("Data generation complete.")
