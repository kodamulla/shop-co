import { motion } from "framer-motion";

// --- අලුතින් එකතු කළ අයිකන් (SVGs) ---
function YoutubeIcon(props) {
  // Official YouTube Logo
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF0000">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function InstagramIcon(props) {
  // Official Instagram Logo
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="url(#ig-grad)">
      <defs>
        <linearGradient id="ig-grad" x1="2" y1="2" x2="22" y2="22">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function FacebookIcon(props) {
  // Official Facebook Logo
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function TwitterIcon(props) {
  // Official Twitter (Bird) Logo
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1DA1F2">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  );
}
// ------------------------------------------

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <footer className="w-full bg-[#0a0a0a] text-zinc-300 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        
        {/* වම් පැත්තේ කොටස (අකුරු සහ විස්තර) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col justify-between p-10 md:p-16 lg:p-24"
        >
          <div>
            {/* Logo */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 font-bold text-2xl text-white mb-8">
              <img src="/logowhitezoom.png" alt="ShopCo Logo" className="h-10 w-10" />
              <span>ShopCo</span>
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-zinc-400 max-w-sm leading-relaxed mb-10">
              Discover quality, comfortable fashion perfect for the Sri Lankan lifestyle. Shop the latest trends with us.
            </motion.p>

            {/* Contact Info, Hours & Branches */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 text-sm text-zinc-400 mb-10">
              {/* Location */}
              <div className="flex flex-col gap-1.5">
                <h4 className="text-zinc-100 font-semibold mb-1">Head Office</h4>
                <p>239 5th Cross Street, 11th Floor</p>
                <p>Colombo, Sri Lanka</p>
              </div>

              {/* Contact */}
              <div className="flex flex-col gap-1.5">
                <h4 className="text-zinc-100 font-semibold mb-1">Contact Us</h4>
                <p>+94(077)340-1552</p>
                <p>contactus@shopco.com</p>
              </div>

              {/* Opening Hours */}
              <div className="flex flex-col gap-1.5">
                <h4 className="text-zinc-100 font-semibold mb-1">Opening Hours</h4>
                <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
                <p>Sat - Sun: 10:00 AM - 6:00 PM</p>
              </div>

              {/* Branches */}
              <div className="flex flex-col gap-1.5">
                <h4 className="text-zinc-100 font-semibold mb-1">Our Branches</h4>
                <p>Colombo • Kandy • Galle</p>
                <p>Negombo • Kurunegala</p>
              </div>
            </motion.div>
          </div>

          <div>
            {/* Divider */}
            {/* Divider */}
            <motion.hr variants={itemVariants} className="border-zinc-800 my-8" />

            {/* Navigation Links 👇 Mobile වලදී Center වෙන්න හැදුවා */}
            <motion.ul variants={itemVariants} className="flex flex-wrap justify-center sm:justify-start gap-x-8 gap-y-4 text-sm font-medium text-zinc-300">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/products" className="hover:text-white transition-colors">Clothing</a></li>
              <li><a href="/signin" className="hover:text-white transition-colors">Sign in</a></li>
            </motion.ul>

            {/* Divider */}
            <motion.hr variants={itemVariants} className="border-zinc-800 my-8" />

            {/* Bottom Section (Copyright & Socials) */}
            <motion.div variants={itemVariants} className="flex flex-col-reverse sm:flex-row justify-between items-center gap-6 text-xs text-zinc-500">
              <p>© Copyright 2026, ShopCo</p>
              <div className="flex items-center gap-6">
                <a href="#" className="hover:text-white transition-colors"><YoutubeIcon className="h-4 w-4" /></a>
                <a href="#" className="hover:text-white transition-colors"><InstagramIcon className="h-4 w-4" /></a>
                <a href="#" className="hover:text-white transition-colors"><FacebookIcon className="h-4 w-4" /></a>
                <a href="#" className="hover:text-white transition-colors"><TwitterIcon className="h-4 w-4" /></a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* දකුණු පැත්තේ පින්තූරය */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative hidden lg:block lg:h-auto" 
        >
          <img
            src="/couple.jpeg"
            alt="Fashion Couple"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>

      </div>
    </footer>
  );
}