const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// 1. SIGNUP
const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName, lastName, email, phoneNumber, 
            password: hashedPassword, role: role || "user"
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. SIGNIN
const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.isBlocked || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid email/password or user blocked" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({
            message: "Login successful",
            token,
            role: user.role,
            user: {
                id: user._id, firstName: user.firstName, lastName: user.lastName,
                email: user.email, phoneNumber: user.phoneNumber, role: user.role,
                addressNo: user.addressNo, street: user.street, city: user.city,
                zipCode: user.zipCode, country: user.country
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. GET ALL USERS
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. GET PROFILE (NEW)
const getProfile = async (req, res) => {
    res.status(200).json(req.user); 
};

// 5. BLOCK / UNBLOCK
const toggleBlockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        user.isBlocked = !user.isBlocked;
        await user.save();
        res.status(200).json({ message: `User ${user.isBlocked ? "blocked" : "unblocked"}`, isBlocked: user.isBlocked });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 6. DELETE
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 7. UPDATE ROLE
const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        user.role = role;
        await user.save();
        res.status(200).json({ message: `Role updated to ${role}`, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 8. UPDATE PROFILE
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        Object.assign(user, req.body);
        await user.save();
        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    signup, signin, getAllUsers, getProfile, toggleBlockUser, 
    deleteUser, updateUserRole, updateProfile
};