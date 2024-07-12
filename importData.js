const fs = require("fs");
const mongoose = require("mongoose");
const csv = require("csv-parser");

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/employeeDirectory");

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

// Adjust the file path if necessary
fs.createReadStream("./python/employees.csv")
  .pipe(csv())
  .on("data", async (row) => {
    const employee = new Employee(row);
    try {
      await employee.save();
    } catch (err) {
      console.error("Error saving employee:", err);
    }
  })
  .on("end", () => {
    console.log("CSV file successfully processed and data imported to MongoDB");
  });
