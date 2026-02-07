require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

// DB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://db:27017/idrak_db';
mongoose.connect(mongoURI)
    .then(() => console.log("✅ DB Connected"))
    .catch(err => console.error("❌ DB Error:", err));

const Employee = mongoose.model('Employee', {
    empId: String, name: String, role: String, dept: String
});

// LOGIN ROUTE
app.post('/api/login', (req, res) => {
    const { user, pass } = req.body;
    if (user === process.env.AUTH_USER && pass === process.env.AUTH_PASS) {
        return res.json({ success: true });
    }
    res.status(401).json({ success: false, message: "Invalid Credentials" });
});

// API Routes
app.get('/api/employees', async (req, res) => {
    const emps = await Employee.find();
    res.json(emps);
});

app.post('/api/employees', async (req, res) => {
    const newEmp = new Employee(req.body);
    await newEmp.save();
    res.status(201).json(newEmp);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
