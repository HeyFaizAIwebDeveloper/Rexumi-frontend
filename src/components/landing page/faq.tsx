'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'How does the AI-powered resume builder work?',
    answer: 'Our AI analyzes your input and industry trends to suggest optimal content and formatting for your resume, ensuring it stands out to both human recruiters and ATS systems.',
  },
  {
    question: 'Are the resumes created ATS-friendly?',
    answer: 'Yes, all our templates are designed to be easily read by Applicant Tracking Systems, increasing your chances of getting your resume in front of human recruiters.',
  },
  {
    question: 'Can I customize the design of my resume?',
    answer: 'While our AI provides suggestions, you have full control over the content and design of your resume. You can choose from various templates and customize colors and layouts.',
  },
  {
    question: 'Is my data secure?',
    answer: 'We take data security very seriously. All your information is encrypted and stored securely. We never share your personal data with third parties.',
  }
]

export default function FaqSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  return (
    <section 
      id="faq" 
      className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center"
      ref={ref}
    >
      <motion.h2 
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                   font-bold text-center 
                   mb-6 md:mb-10 
                   max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        Frequently Asked Questions
      </motion.h2>

      <Accordion 
        type="single" 
        collapsible 
        className="w-full max-w-3xl mx-auto"
        value={openItem}
        onValueChange={setOpenItem}
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <AccordionItem 
              value={`item-${index}`} 
              className="border-b border-border/30 last:border-b-0"
            >
              <AccordionTrigger 
                className="text-base sm:text-lg md:text-xl 
                           py-3 sm:py-4 
                           hover:text-primary 
                           transition-colors"
              >
                {faq.question}
              </AccordionTrigger>
              <AnimatePresence>
                {openItem === `item-${index}` && (
                  <AccordionContent 
                    className="text-sm sm:text-base 
                               text-muted-foreground 
                               pb-4 sm:pb-6"
                  >
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </motion.div>
                  </AccordionContent>
                )}
              </AnimatePresence>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </section>
  )
}