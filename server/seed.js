const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');
const Product = require('./models/Product');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch(err => console.log(err));

const seedAllData = async () => {
    try {
        await User.deleteMany({});
        await Product.deleteMany({});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);
        const dummyUsers = [];

        dummyUsers.push({
            firstName: 'Super', lastName: 'Admin',
            email: 'admin@shopco.com', password: hashedPassword,
            role: 'admin', phoneNumber: '0771234567'
        });

        for (let i = 1; i <= 3; i++) {
            dummyUsers.push({
                firstName: 'Manager', lastName: `Admin${i}`,
                email: `manager${i}@shop.co`, password: hashedPassword,
                role: 'manager', phoneNumber: `077000000${i}`
            });
        }
        
        for (let i = 1; i <= 30; i++) {
            dummyUsers.push({
                firstName: 'Customer', lastName: `User${i}`,
                email: `customer${i}@example.com`, password: hashedPassword,
                role: 'user', phoneNumber: `07111111${i < 10 ? '0' + i : i}`
            });
        }
        await User.insertMany(dummyUsers);

        // PRODUCTS - හැම Category එකකටම 8 ගානේ 
        const products = [
            // MENSWEAR (8)
            { name: "Graphic Black Tee", category: "Menswear", price: 25, description: "Classic black fit.", imageUrl: "/images/mens-1.jpg", countInStock: 20 },
            { name: "Blue Polo Shirt", category: "Menswear", price: 35, description: "Professional look.", imageUrl: "/images/mens-2.jpg", countInStock: 15 },
            { name: "Slim Fit Chinos", category: "Menswear", price: 45, description: "Formal cotton chinos.", imageUrl: "/images/mens-3.jpg", countInStock: 10 },
            { name: "Denim Jacket", category: "Menswear", price: 65, description: "Vintage blue denim.", imageUrl: "/images/mens-4.jpg", countInStock: 15 },
            { name: "Winter Hoodie", category: "Menswear", price: 50, description: "Warm and cozy.", imageUrl: "/images/mens-5.jpg", countInStock: 25 },
            { name: "Casual Linen Shirt", category: "Menswear", price: 40, description: "Breathable fabric.", imageUrl: "/images/mens-6.jpg", countInStock: 30 },
            { name: "Cargo Pants", category: "Menswear", price: 55, description: "Utility style.", imageUrl: "/images/mens-7.jpg", countInStock: 18 },
            { name: "Formal Blazer", category: "Menswear", price: 120, description: "Perfect for events.", imageUrl: "/images/mens-8.jpg", countInStock: 5 },

            // WOMENSWEAR (8)
            { name: "Summer Floral Dress", category: "Womenswear", price: 40, description: "Light and airy fabric.", imageUrl: "/images/womens-1.jpg", countInStock: 8 },
            { name: "Black Formal Blouse", category: "Womenswear", price: 35, description: "Office ready.", imageUrl: "/images/womens-2.jpg", countInStock: 15 },
            { name: "Leather Skirt", category: "Womenswear", price: 45, description: "Premium faux leather.", imageUrl: "/images/womens-3.jpg", countInStock: 12 },
            { name: "Knitted Sweater", category: "Womenswear", price: 55, description: "Perfect for winter.", imageUrl: "/images/womens-4.jpg", countInStock: 20 },
            { name: "Skinny Jeans", category: "Womenswear", price: 48, description: "Stretchable blue denim.", imageUrl: "/images/womens-5.jpg", countInStock: 18 },
            { name: "Evening Gown", category: "Womenswear", price: 150, description: "Elegant and stunning.", imageUrl: "/images/womens-6.jpg", countInStock: 5 },
            { name: "Crop Top", category: "Womenswear", price: 20, description: "Casual summer wear.", imageUrl: "/images/womens-7.jpg", countInStock: 25 },
            { name: "Trench Coat", category: "Womenswear", price: 95, description: "Classic beige coat.", imageUrl: "/images/womens-8.jpg", countInStock: 10 },

            // KIDSWEAR (8)
            { name: "Cute Cotton Set", category: "Kidswear", price: 20, description: "Soft touch for kids.", imageUrl: "/images/kids-1.jpg", countInStock: 30 },
            { name: "Kids Yellow Hoodie", category: "Kidswear", price: 25, description: "Warm and comfy.", imageUrl: "/images/kids-2.jpg", countInStock: 20 },
            { name: "Baby Romper", category: "Kidswear", price: 15, description: "Organic cotton.", imageUrl: "/images/kids-3.jpg", countInStock: 25 },
            { name: "Little Princess Dress", category: "Kidswear", price: 30, description: "Party wear for girls.", imageUrl: "/images/kids-4.jpg", countInStock: 15 },
            { name: "Boys Graphic Tee", category: "Kidswear", price: 18, description: "Cool superhero print.", imageUrl: "/images/kids-5.jpg", countInStock: 22 },
            { name: "Denim Overalls", category: "Kidswear", price: 35, description: "Durable playwear.", imageUrl: "/images/kids-6.jpg", countInStock: 18 },
            { name: "Winter Beanie", category: "Kidswear", price: 12, description: "Keep them warm.", imageUrl: "/images/kids-7.jpg", countInStock: 40 },
            { name: "School Backpack", category: "Kidswear", price: 28, description: "Spacious and light.", imageUrl: "/images/kids-8.jpg", countInStock: 35 },

            // WATCHES (8)
            { name: "Gold Chronograph", category: "Watches", price: 150, description: "Premium gold watch.", imageUrl: "/images/watch-1.jpg", countInStock: 5 },
            { name: "Silver Minimalist", category: "Watches", price: 110, description: "Daily office wear.", imageUrl: "/images/watch-2.jpg", countInStock: 8 },
            { name: "Sport Digital Watch", category: "Watches", price: 80, description: "Water resistant.", imageUrl: "/images/watch-3.jpg", countInStock: 12 },
            { name: "Leather Strap Classic", category: "Watches", price: 95, description: "Genuine brown leather.", imageUrl: "/images/watch-4.jpg", countInStock: 10 },
            { name: "Smart Fitness Watch", category: "Watches", price: 130, description: "Track your health.", imageUrl: "/images/watch-5.jpg", countInStock: 15 },
            { name: "Rose Gold Elegance", category: "Watches", price: 140, description: "Women's luxury watch.", imageUrl: "/images/watch-6.jpg", countInStock: 7 },
            { name: "Diver's Automatic", category: "Watches", price: 200, description: "Deep sea ready.", imageUrl: "/images/watch-7.jpg", countInStock: 4 },
            { name: "Retro Casio", category: "Watches", price: 45, description: "Vintage digital style.", imageUrl: "/images/watch-8.jpg", countInStock: 20 },

            // TOYS (8)
            { name: "4x4 Off-Road Car", category: "Toys", price: 45, description: "Remote control beast.", imageUrl: "/images/toy-1.jpg", countInStock: 10 },
            { name: "Educational Puzzle", category: "Toys", price: 12, description: "For smart kids.", imageUrl: "/images/toy-2.jpg", countInStock: 50 },
            { name: "Building Blocks Set", category: "Toys", price: 35, description: "Unleash creativity.", imageUrl: "/images/toy-3.jpg", countInStock: 15 },
            { name: "Plush Teddy Bear", category: "Toys", price: 25, description: "Super soft and cuddly.", imageUrl: "/images/toy-4.jpg", countInStock: 20 },
            { name: "Action Figure", category: "Toys", price: 28, description: "Collectible hero.", imageUrl: "/images/toy-5.jpg", countInStock: 12 },
            { name: "Board Game Collection", category: "Toys", price: 40, description: "Family fun time.", imageUrl: "/images/toy-6.jpg", countInStock: 18 },
            { name: "Doll House", category: "Toys", price: 85, description: "Wooden premium house.", imageUrl: "/images/toy-7.jpg", countInStock: 5 },
            { name: "Water Gun", category: "Toys", price: 15, description: "Summer essential.", imageUrl: "/images/toy-8.jpg", countInStock: 30 },

            // SNEAKERS (8)
            { name: "White Urban Sneaker", category: "Sneakers", price: 85, description: "Perfect fit.", imageUrl: "/images/sneaker-1.jpg", countInStock: 15 },
            { name: "Pro Running Shoe", category: "Sneakers", price: 95, description: "High performance.", imageUrl: "/images/sneaker-2.jpg", countInStock: 10 },
            { name: "Black Casual Loafers", category: "Sneakers", price: 60, description: "Style meets comfort.", imageUrl: "/images/sneaker-3.jpg", countInStock: 12 },
            { name: "High-Top Canvas", category: "Sneakers", price: 55, description: "Classic street style.", imageUrl: "/images/sneaker-4.jpg", countInStock: 20 },
            { name: "Chunky Fashion Sneaker", category: "Sneakers", price: 110, description: "Bold and trendy.", imageUrl: "/images/sneaker-5.jpg", countInStock: 8 },
            { name: "Skateboarding Shoes", category: "Sneakers", price: 75, description: "Durable and grippy.", imageUrl: "/images/sneaker-6.jpg", countInStock: 14 },
            { name: "Basketball Kicks", category: "Sneakers", price: 130, description: "Court ready.", imageUrl: "/images/sneaker-7.jpg", countInStock: 6 },
            { name: "Slip-On Comfort", category: "Sneakers", price: 50, description: "Easy to wear.", imageUrl: "/images/sneaker-8.jpg", countInStock: 25 }
        ];
        
        await Product.insertMany(products);
        console.log('✅ Admin, Managers, Customers & 48 Products added!');
        process.exit();
    } catch (error) {
        console.error('❌ Error: ', error);
        process.exit(1);
    }
};
seedAllData();