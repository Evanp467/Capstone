import random
import json
import csv

# Generate data for characters
NUM_ROWS = 1000

# Create the CSV file
OUTPUT_FILE = "employees.csv"

# Load City data from JSON file
with open("city.json", encoding="utf-8") as json_file:
    cities = json.load(json_file)

# Load the JSON data
with open('characters.json', 'r', encoding='utf-8') as file:
    characters = json.load(file)

# Extract names and shows, then shuffle
names_and_shows = [(char.get('character'), char.get('show')) for char in characters]
random.shuffle(names_and_shows)

# Generate a phone number
def generate_phone_number():
    first_three = random.randint(100, 999)
    last_four = random.randint(1000, 9999)
    return f"{first_three}-{last_four}"

# Generate data rows
data_rows = []
managers = []

for i in range(1, NUM_ROWS + 1):
    # Generate random values for each column
    employee_id = i
    phone = generate_phone_number()
    if i == 1:
        role = "CEO"
        salary = random.randint(400000, 600000)
    elif i == 2:
        role = "CFO"
        salary = random.randint(300000, 400000)
    elif i == 3:
        role = "CSO"
        salary = random.randint(300000, 400000)
    elif i == 4:
        role = "COO"
        salary = random.randint(300000, 400000)
    elif i == 5:
        role = "CTO"
        salary = random.randint(300000, 400000)
    elif 6 <= i <= 25:
        role = "HR"
        salary = random.randint(60000, 120000)
    elif 26 <= i <= 226:
        role = "Manager"
        salary = random.randint(100000, 200000)
        managers.append(i)  # Store manager IDs
    else:
        role = random.choice(
            ["Software Dev", "Data Engineer", "Cybersecurity", "Sales", "Marketing", "Public Relations"]
        )
        salary = random.randint(50000, 150000)
    
    manager_id = random.choice(managers) if role not in ["CEO", "CFO", "CSO", "COO", "CTO", "HR", "Manager"] else None

    # Select a random City from the available options
    city = random.choice(cities)
    city_name = city["name"]

    # Pop a name and show from the shuffled list
    name, show = names_and_shows.pop()

    # Create the data row
    data_row = [
        employee_id,
        name,
        show,
        role,
        phone,
        city_name,
        salary,
        manager_id
    ]

    # Add the data row to the list
    data_rows.append(data_row)

# Write the data to the CSV file
with open(OUTPUT_FILE, "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(
        ["employee_id", "name", "show", "role", "phone", "city", "salary", "manager_id"]
    )
    writer.writerows(data_rows)

print("Data generation complete.")
