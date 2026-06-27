const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// 1. SIGNUP (REGISTER)
const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword,
            role: role || "user"
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. SIGNIN (LOGIN)
const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (user.isBlocked) {
            return res.status(403).json({ message: "User is blocked" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            role: user.role,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                // Login වෙද්දී Address ටිකත් යවනවා 👇
                addressNo: user.addressNo,
                street: user.street,
                city: user.city,
                zipCode: user.zipCode,
                country: user.country
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. GET ALL USERS (ADMIN)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. BLOCK / UNBLOCK USER
const toggleBlockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.isBlocked = !user.isBlocked;
        await user.save();

        res.status(200).json({
            message: `User ${user.isBlocked ? "blocked" : "unblocked"}`,
            isBlocked: user.isBlocked
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 5. DELETE USER
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 6. UPDATE USER ROLE (ADMIN ONLY)
const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body; 
        if (!['user', 'manager', 'admin'].includes(role)) {
            return res.status(400).json({ message: "Invalid role provided" });
        }

        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.role === 'admin' && req.user._id.toString() !== user._id.toString()) {
             return res.status(403).json({ message: "Cannot change the role of another Admin" });
        }

        user.role = role;
        await user.save();
        res.status(200).json({
            message: `User role updated to ${role} successfully`,
            user: { id: user._id, name: `${user.firstName} ${user.lastName}`, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 7. UPDATE PROFILE (User කෙනෙක්ට එයාගේ Profile එක අප්ඩේට් කරන්න) 👇
const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, addressNo, street, city, zipCode, country } = req.body;
        
        // Frontend එකෙන් එවන User ID එක (req.params.id)
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Email එක Update කරන්න දෙන්නේ නැහැ (Security)
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.addressNo = addressNo !== undefined ? addressNo : user.addressNo;
        user.street = street !== undefined ? street : user.street;
        user.city = city !== undefined ? city : user.city;
        user.zipCode = zipCode !== undefined ? zipCode : user.zipCode;
        user.country = country !== undefined ? country : user.country;

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                addressNo: user.addressNo,
                street: user.street,
                city: user.city,
                zipCode: user.zipCode,
                country: user.country
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    signup,
    signin,
    getAllUsers,
    toggleBlockUser,
    deleteUser,
    updateUserRole,
    updateProfile // මේක Export කළා
};