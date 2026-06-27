import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does shipping take?",
    answer: "Standard shipping usually takes 3-5 business days within the country. International shipping can take 7-14 business days depending on the destination."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day hassle-free return policy. If you are not completely satisfied with your purchase, you can return it within 30 days for a full refund or exchange."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship worldwide! Shipping costs and delivery times vary by country. You can see the exact shipping cost at checkout before completing your order."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is dispatched, you will receive an email with a tracking number and a link to track your package in real-time."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, Amex), PayPal, and Apple Pay. All payments are securely processed and encrypted."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-10 max-w-4xl mx-auto w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">Find quick answers to common questions about our products and services.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="bg-card border rounded-2xl overflow-hidden shadow-sm transition-all duration-200 hover:border-primary/50"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex items-center justify-between w-full p-5 text-left font-semibold text-foreground focus:outline-none"
            >
              <span className="text-base md:text-lg">{faq.question}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="h-6 w-6 flex-shrink-0 text-muted-foreground flex items-center justify-center bg-muted rounded-full"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-5 pb-5 text-muted-foreground text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}