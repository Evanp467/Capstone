const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/employeeDirectory", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Employee Schema
const employeeSchema = new mongoose.Schema({
  employee_id: Number,
  name: String,
  show: String,
  role: String,
  phone: String,
  city: String,
  salary: Number,
  location_x: Number,
  location_y: Number,
  destination_x: Number,
  destination_y: Number,
});

const Employee = mongoose.model("Employee", employeeSchema);

// Routes
app.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/api/employees", async (req, res) => {
  const employee = new Employee(req.body);
  try {
    await employee.save();
    res.json(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { employee_id, password } = req.body;
  console.log("Login request received for employee_id:", employee_id);

  try {
    const employee = await Employee.findOne({ employee_id });
    if (employee && password === "password") {
      // Here we just check if password is "password"
      console.log("Employee found:", employee);
      res.json({ success: true, name: employee.name });
    } else {
      console.log("Employee not found or wrong password");
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
