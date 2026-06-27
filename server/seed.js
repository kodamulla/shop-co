const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');

dotenv.config();


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch(err => console.log(err));

const seedUsers = async () => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt); // 123456

        const dummyUsers = [];

        
        const getRandomDate = (start, end) => {
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        };

        const startDate = new Date('2026-04-27');
        const endDate = new Date('2026-06-27');

        
        for (let i = 1; i <= 3; i++) {
            dummyUsers.push({
                firstName: 'Manager',
                lastName: `Admin${i}`,
                phoneNumber: `077000000${i}`, 
                email: `manager${i}@shop.co`,
                password: hashedPassword,
                role: 'manager',
                createdAt: getRandomDate(startDate, endDate)
            });
        }

        
        for (let i = 1; i <= 30; i++) {
            dummyUsers.push({
                firstName: 'Customer',
                lastName: `User${i}`,
                phoneNumber: `07111111${i < 10 ? '0' + i : i}`, 
                email: `customer${i}@example.com`,
                password: hashedPassword,
                role: 'user',
                createdAt: getRandomDate(startDate, endDate)
            });
        }

        
        await User.insertMany(dummyUsers);
        
        console.log('✅ Dummy Users & Managers added successfully!');
        process.exit();

    } catch (error) {
        console.error('❌ Error adding dummy data: ', error);
        process.exit(1);
    }
};

seedUsers();