import { motion } from "framer-motion";

// --- අලුතින් එකතු කළ අයිකන් (SVGs) ---
function YoutubeIcon(props) {
  // YouTube Red (#FF0000)
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
}

function InstagramIcon(props) {
  // Instagram Gradient
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#ig-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="ig-grad" x1="2" y1="2" x2="22" y2="22">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}

function FacebookIcon(props) {
  // Facebook Blue (#1877F2)
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
}

function TwitterIcon(props) {
  // Twitter Blue (#1DA1F2)
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1DA1F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
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
            <motion.p variants={itemVariants} className="text-zinc-400 max-w-sm leading-relaxed mb-12">
              Discover quality, comfortable fashion perfect for the Sri Lankan lifestyle. Shop the latest trends with us.
            </motion.p>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm text-zinc-400 mb-10">
              <div>
                <p>239 5th Cross Street, 11th Floor</p>
                <p>Colombo, Sri Lanka</p>
              </div>
              <div>
                <p>+94(077)340-1552</p>
                <p>contactus@shopco.com</p>
              </div>
            </motion.div>
          </div>

          <div>
            {/* Divider */}
            <motion.hr variants={itemVariants} className="border-zinc-800 my-8" />

            {/* Navigation Links */}
            <motion.ul variants={itemVariants} className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium text-zinc-300">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Product</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About us</a></li>
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

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative hidden lg:block lg:h-auto" 
        >
          <img
            src="/couple.jpeg"
            alt="Interior"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>

      </div>
    </footer>
  );
}