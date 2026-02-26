import React, { useState, useEffect, Suspense } from 'react';
import LazySection from './components/LazySection';
import { Menu, X, Phone, Clock, Users, Award, BookOpen, Star, CheckCircle, ChevronRight, MessageCircle, Globe, Shield, CreditCard, UserPlus, Newspaper, ChevronDown, Facebook, Instagram, Youtube, Linkedin, ArrowLeft } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { Routes, Route, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// --- DATABASE CONFIG ---
// Get these from your Supabase dashboard: Settings -> API
const SUPABASE_URL = 'https://fvyifgusqzlzoolrhpgv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2eWlmZ3VzcXpsem9vbHJocGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NzkwNzIsImV4cCI6MjA4NzM1NTA3Mn0.FRWaBEcSQifqO0FGcRvoA1IDtPjUnsQkT2e981gjxFI';
const supabase = (SUPABASE_URL && SUPABASE_KEY) ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

// --- STATIC DATA ---
const TAGLINES = [
  "Master Quran Recitation with Tajweed",
  "The Best Place to Start Your Quran Journey",
  "Expert Teachers for Kids and Adults",
  "Flexible Timings for Your Busy Schedule",
  "Learn with Precision, Love with Passion"
];


const REGION_CONFIGS = {
  'USA': { name: 'USA', currency: 'USD', symbol: '$', timezones: 'EST/CST/PST', paymentMethods: 'Stripe/PayPal', multiplier: 1 },
  'UK': { name: 'UK', currency: 'GBP', symbol: '£', timezones: 'GMT/BST', paymentMethods: 'Direct Transfer/Stripe', multiplier: 0.8 },
  'Canada': { name: 'Canada', currency: 'CAD', symbol: 'C$', timezones: 'EST/MST/PST', paymentMethods: 'Interac/Stripe', multiplier: 1.1 },
  'Australia': { name: 'Australia', currency: 'AUD', symbol: 'A$', timezones: 'AEST/AWST', paymentMethods: 'Stripe/PayPal', multiplier: 1.2 },
  'Europe': { name: 'Europe', currency: 'EUR', symbol: '€', timezones: 'CET/EET', paymentMethods: 'IBAN/Stripe', multiplier: 0.9 }
};

const COURSES = [
  { title: "Qaida for Beginners", value: "qaida" },
  { title: "Quran Reading", value: "quran-reading" },
  { title: "Quran Memorization (Hifz)", value: "hifz" },
  { title: "Quran Translation", value: "translation" },
  { title: "Quran Tafseer", value: "tafseer" },
  { title: "Tajweed & Tarteel", value: "tajweed" },
  { title: "Arabic Language", value: "arabic" },
  { title: "New Muslim Guide", value: "new-muslim" },
  { title: "Seerat un Nabi", value: "seerat-un-nabi" },
  { title: "Dars e Nizami", value: "dars-e-nizami" },
  { title: "Short Shariah Course", value: "short-shariah" },
  { title: "Farz e Uloom", value: "farz-e-uloom" },
];

const FAQS = [
  { q: "What is an online Quran academy?", a: "An online Quran academy is a platform where students learn the Quran through live classes using the internet. Students can learn from qualified teachers from the comfort of their homes." },
  { q: "Who can enroll in online Quran classes?", a: "Our classes are suitable for everyone including kids (4+ years), adults, beginners, advanced learners, and both sisters and brothers." },
  { q: "Do I need prior knowledge to start learning?", a: "No. Beginners can start from Noorani Qaida and basic Arabic letters. We guide students step by step through Tajweed rules and beyond." },
  { q: "What courses do you offer?", a: "We offer Nazira Quran with Tajweed, Madni Qaida, Hifz-ul-Quran, Quran Translation, Basic Islamic Studies, Salah, and Duas." },
  { q: "How long does it take to complete a course?", a: "Duration depends on student’s age, learning speed, and consistency. Typically: Qaida (3–6 months), Nazira (6–12 months), and Hifz (2–4 years)." },
  { q: "Do you offer one-on-one classes?", a: "Yes, personalized one-on-one sessions are available to ensure proper attention and correction for every student." },
  { q: "Are your teachers qualified?", a: "Our teachers are certified in Tajweed, experienced in Quran teaching, and trained to teach children and adults across various languages." },
  { q: "Do you provide female teachers for sisters and kids?", a: "Yes, qualified female teachers are available upon request for sisters and children to ensure a comfortable learning environment." },
  { q: "What do I need for online classes?", a: "You need a stable internet connection, a laptop/tablet/smartphone, headphones with a mic, and a preferred meeting app like Zoom." },
  { q: "What if I miss a class?", a: "Missed classes can be rescheduled depending on prior notice provided to the teacher or academy." },
  { q: "What time zones do you cover?", a: "Classes are available worldwide including the USA, UK, Canada, Australia, and Middle East. We adapt to your local time zone." },
  { q: "Do you offer a free trial class?", a: "Yes, we offer a free trial class so students can experience our teaching method before committing to enrollment." },
  { q: "What are the monthly fees?", a: "Fees vary depending on classes per week and course type. Please check our pricing section or contact us for a detailed fee structure." },
  { q: "How can I make payment?", a: "Payments can be made via bank transfer, online transfer, or various international payment methods." },
  { q: "Is online Quran learning safe for kids?", a: "Yes. Classes are conducted in a secure environment with monitored sessions and professional, vetted teachers." },
  { q: "How do you keep children engaged?", a: "We use interactive teaching, gentle correction, motivation techniques, and structured lesson plans tailored for younger minds." },
  { q: "Is learning the Quran online permissible in Islam?", a: "Yes. Seeking knowledge is obligatory in Islam. As long as proper Tajweed and teacher supervision are maintained, online learning is highly beneficial." },
  { q: "Will students learn proper Tajweed?", a: "Absolutely. Tajweed rules are applied and corrected live during every session to ensure accurate and beautiful recitation." }
];

const COURSES_DETAILED = [
  {
    title: "Qaida for Beginners",
    slug: "qaida-basics",
    shortDesc: "A foundational course designed to help beginners learn the Arabic alphabet, basic pronunciation, and the rules of Quranic reading step by step, with clarity and ease.",
    fullDesc: "This foundational course is designed for beginners who are starting their Quran learning journey from the very beginning. Students learn Arabic letters, correct pronunciation, and letter formation in a simple, step-by-step manner. Special focus is given to clarity, repetition, and individual attention so learners build confidence before moving on to Quran reading. This course is suitable for children, adults, and new learners with no prior Arabic background.",
    image: "/quran-qaida-beginners-course.webp",
    altText: "Quran Qaida for Beginners – Learn Arabic Letters and Pronunciation Online at Almaas Academy",
    whatYouLearn: [
      "Arabic alphabet (Huroof-e-Hijai)",
      "Correct pronunciation and articulation",
      "Joining letters and basic reading rules",
      "Practice with teacher supervision",
      "Strong base for Quran reading"
    ],
    duration: "2 – 3 Months",
    level: "Beginner",
    summary: "A perfect starting point for learning Arabic letters and pronunciation. Builds a strong foundation for smooth Quran reading.",
    cta: "Enroll Now and begin your Quran journey from the basics",
    whoFor: "This course is ideal for children as young as 4 years old, adults who have never learned Arabic, and new Muslims who want to begin their journey with the Quran from the very first letter. It is designed for absolute beginners who have zero prior knowledge of the Arabic language.",
    curriculumDepth: "The curriculum starts with the recognition of individual Arabic letters and their various shapes (beginning, middle, and end of words). We then move to the 'Makharij' (points of articulation) to ensure every letter is pronounced from its correct origin. Moving forward, students learn the signs of Harakaat (Fatha, Kasra, Damma), Tanween, Sukoon, and Shaddah. By the end of the course, students are able to join letters to form words and eventually read complete sentences from the Noorani Qaida.",
    benefitsExt: "Completing the Qaida course provides the essential foundation required for fluent Quran reading. Without this base, a student will struggle with the rules of Tajweed later on. It builds confidence in pronunciation, removes hesitation in reading, and instills a love for the Arabic language. Our teachers use an interactive and patient approach, ensuring that the student never feels overwhelmed by the new script."
  },
  {
    title: "Quran Reading",
    slug: "quran-reading",
    shortDesc: "A guided course designed to help learners read the Holy Quran fluently, focusing on correct pronunciation, smooth recitation, and building confidence in every verse.",
    fullDesc: "This course helps students read the Holy Quran fluently and confidently with correct pronunciation. Learners are guided step by step to improve flow, accuracy, and consistency in recitation. Teachers focus on correcting mistakes and strengthening reading skills through regular practice. Ideal for students who can read basic Arabic and want to improve Quran recitation.",
    image: "/online-quran-reading-course.webp",
    altText: "Online Quran Reading Course – Fluent and Confident Quran Recitation for Kids and Adults",
    whatYouLearn: [
      "Fluent Quran reading",
      "Correct pronunciation of words",
      "Smooth recitation without hesitation",
      "Correction of common mistakes",
      "Confidence in reading aloud"
    ],
    duration: "3 – 6 Months",
    level: "Beginner to Intermediate",
    summary: "Improve your Quran reading with clarity and confidence. A guided course for smooth and correct recitation.",
    cta: "Enroll Now and start reading the Quran with confidence",
    whoFor: "This course is designed for students who have successfully completed the Qaida and can recognize Arabic letters and basic vowel signs. It is perfect for both children and adults who want to transition from reading individual words to reciting full verses (Ayahs) of the Quran with flow and accuracy.",
    curriculumDepth: "We begin with the smaller Surahs of Juz Amma to build momentum and correct any lingering foundational mistakes. The course emphasizes 'Tarteel' (slow and measured recitation) rather than speed. Students are taught how to pause correctly at the end of verses and how to sustain their breath during longer recitations. We also introduce basic Tajweed rules as they appear in the text to make the learning practical and immediate.",
    benefitsExt: "The primary benefit of this course is the ability to recite the Word of Allah independently and correctly. Fluent recitation allows the believer to connect more deeply with the Quran during daily prayers and personal study. It eliminates the fear of making mistakes and encourages regular interaction with the Holy Book, which is a source of immense blessings (Barakah) in one's life."
  },
  {
    title: "Quran Memorization (Hifz)",
    slug: "hifz-memorization",
    shortDesc: "A structured course that helps students memorize the Holy Quran with accuracy, daily revision plans, and expert guidance to retain and recite confidently.",
    fullDesc: "This structured course is designed to help students memorize the Holy Quran accurately and effectively. A disciplined system of daily lessons, revision plans, and continuous supervision ensures strong memorization and retention. Emphasis is placed on Tajweed and correct recitation. Suitable for children and adults aspiring to become Hafiz or Hafiza.",
    image: "/online-quran-memorization-hifz-classes.webp",
    altText: "Online Quran Memorization (Hifz) Classes for Kids and Adults at Almaas Online Quran Academy",
    whatYouLearn: [
      "Systematic Quran memorization",
      "Daily lesson and revision planning",
      "Strong retention techniques",
      "Tajweed during memorization",
      "Confident recitation from memory"
    ],
    duration: "Flexible (1–3 Years)",
    level: "Intermediate to Advanced",
    summary: "A complete and structured Hifz program. Focuses on accuracy, revision, and long-term retention.",
    cta: "Enroll Now and begin your journey to become a Hafiz/Hafiza",
    whoFor: `Becoming a 'Hafiz-ul-Quran' is one of the highest honors a Muslim can achieve. This course is for dedicated students—children and adults alike—who have a strong desire to preserve the Quran in their hearts. It requires commitment, discipline, and a love for the Word of Allah. Whether you want to memorize a few Surahs or the entire Quran, our teachers provide the specialized guidance needed for this sacred journey.`,
    curriculumDepth: `The Hifz curriculum is divided into three critical components that ensure both speed of memorization and strength of retention:`,
    benefitsExt: `The benefits of Hifz-ul-Quran are manifold, spanning spiritual, cognitive, and social dimensions. In the Hereafter, the Hafiz will be told to 'Recite and rise in status' in Jannah, with their final resting place being at the last verse they recite.`
  },
  {
    title: "Quran Translation",
    slug: "quran-translation",
    shortDesc: "A comprehensive course designed to help learners understand the meanings of Quranic verses through clear, word-by-word translation and spiritual reflection.",
    fullDesc: "This course helps learners understand the meanings of the Holy Quran through clear and easy word-by-word translation. Students develop an understanding of Quranic vocabulary and sentence structure while reflecting on the message of Allah. Ideal for learners who want to move beyond recitation and understand the Quran deeply.",
    image: "/quran-translation-course-online.webp",
    altText: "Online Quran Translation Course – Learn Word-by-Word Quran Meanings with Expert Teachers",
    whatYouLearn: [
      "Word-by-word Quran translation",
      "Quranic vocabulary",
      "Understanding verse meanings",
      "Spiritual reflection",
      "Practical life lessons from Quran"
    ],
    duration: "6 – 9 Months",
    level: "Intermediate",
    summary: "Understand the Quran beyond recitation. Learn meanings that guide daily life.",
    cta: "Enroll Now and understand the Quran deeply",
    whoFor: "This course is for those who find themselves reciting the Quran but not fully grasping the divine message. It is aimed at students who want to bridge the gap between recitation and comprehension. If you want to know what Allah is saying to you directly in your daily prayers, this course is for you.",
    curriculumDepth: "We use a word-for-word translation methodology. Instead of just learning a general summary, students learn the specific meaning of each Arabic word as it appears in the verse. We cover the core vocabulary of the Quran—over 80% of which repeats frequently. This allows the student to start recognizing patterns and meanings even when reading Surahs they haven't specifically studied yet.",
    benefitsExt: "Understanding the Quran transforms your 'Khushu' (focus) in Salah. When you know the meaning of the verses being recited, your heart connects with the prayer on a much deeper level. It turns the Quran from a book of recitation into a book of guidance (Hidayah) that you can apply to your daily decisions, ethics, and spirituality."
  },
  {
    title: "Tafseer ul Quran",
    slug: "quran-tafseer",
    shortDesc: "An in-depth course that explores the meanings, context, and wisdom behind Quranic verses helping learners connect deeply with the message of the Holy Quran.",
    fullDesc: "This advanced course provides detailed explanations of Quranic verses, including historical background, context, and wisdom. Students learn how Quranic teachings apply to real life and develop a deeper connection with Allah's message through authentic Tafseer.",
    image: "/quran-tafseer-course-online.webp",
    altText: "Online Quran Tafseer Course – In-Depth Quranic Explanation and Context by Expert Teachers",
    whatYouLearn: [
      "Detailed explanation of Quranic verses",
      "Shan-e-Nuzool (background of revelation)",
      "Quranic themes and wisdom",
      "Practical guidance for daily life",
      "Deep spiritual understanding"
    ],
    duration: "9 – 12 Months",
    level: "Advanced",
    summary: "Explore the deeper meanings of the Quran. Strengthen faith through understanding Allah's message.",
    cta: "Enroll Now and explore the deeper meanings of the Quran",
    whoFor: "Designed for intermediate and advanced students, this course is for those who want to dive into the deep ocean of Quranic wisdom. It is for seekers of knowledge who want to understand the 'Why' and 'How' behind the revelations.",
    curriculumDepth: "We study specific 'Surahs' in depth, looking at their 'Shan-e-Nuzool' (the context and circumstances under which they were revealed). We rely on authentic classical sources like Tafsir ibn Kathir and Tafsir al-Jalalayn, while making the lessons relevant to modern-day challenges. The course covers linguistic nuances, legal rulings (Ahkam) derived from verses, and the overarching themes of each Surah.",
    benefitsExt: "Tafseer provides the intellectual framework to understand Islam as a complete way of life. It resolves doubts, provides clarity on complex issues, and strengthens faith through knowledge. By understanding the wisdom of Allah, the student becomes more resilient in their faith and more capable of sharing the message of Islam with others."
  },
  {
    title: "Arabic Language",
    slug: "arabic-language",
    shortDesc: "A beginner-friendly course that builds a strong foundation in reading, writing, and understanding Arabic essential for deeper Quranic comprehension and daily use.",
    fullDesc: "This beginner-friendly Arabic language course builds a strong foundation in reading, writing, and understanding Arabic. Lessons are designed in a simple and practical way to help learners understand the Quran and use Arabic in daily Islamic life.",
    image: "/arabic-language-course-online.webp",
    altText: "Online Arabic Language Course – Learn Quranic Arabic for Beginners and Intermediate Students",
    whatYouLearn: [
      "Arabic reading and writing",
      "Basic grammar rules",
      "Essential vocabulary",
      "Sentence formation",
      "Improved Quran understanding"
    ],
    duration: "6 – 12 Months",
    level: "Beginner to Intermediate",
    summary: "Learn Arabic from scratch with ease. Enhance Quran understanding through language.",
    cta: "Enroll Now and start learning Arabic step by step",
    whoFor: "This course is for anyone who want to learn the language of the Quran. It's suitable for students who can already read Arabic script but want to understand the grammar and structure of the language.",
    curriculumDepth: "Our curriculum covers 'Nahw' (Syntax) and 'Sarf' (Morphology) in a simplified manner. We focus on 'Quranic Arabic'—prioritizing the vocabulary and grammatical structures found in the Holy Book. Students learn how to conjugate verbs, build sentences, and understand the role of different particles in the Arabic language.",
    benefitsExt: "Learning Arabic is the key to unlocking the true beauty of the Quranic miracle. It allows you to appreciate the linguistic precision and eloquence that no translation can ever fully capture. It is also the language of our Prophet (SAW) and the key to understanding Hadith and classical Islamic scholarship."
  },
  {
    title: "New Muslim",
    slug: "new-muslim-guide",
    shortDesc: "A supportive course tailored for new Muslims, covering the basics of Islam, daily prayers, Quran reading, and essential beliefs to help start your spiritual journey.",
    fullDesc: "This supportive course is designed for new Muslims to learn Islam in a clear, simple, and welcoming way. It covers essential beliefs, worship, and daily Islamic practices to help new Muslims feel confident and comfortable in their faith.",
    image: "/new-muslim-quran-course-online.webp",
    altText: "New Muslim Quran and Islam Course – Start Your Islamic Journey with Expert Guidance Online",
    whatYouLearn: [
      "Basic Islamic beliefs",
      "How to pray Salah",
      "Quran reading basics",
      "Daily Islamic practices",
      "Living Islam confidently"
    ],
    duration: "2 – 4 Months",
    level: "Beginner",
    summary: "A complete beginner guide for new Muslims. Learn Islam step by step with confidence.",
    cta: "Enroll Now and start your Islamic journey with confidence",
    whoFor: "Specifically designed for reverts (New Muslims), this course provides a safe, non-judgmental space to ask questions and learn the essentials. We know that entering a new faith can be overwhelming, so we take things one step at a time.",
    curriculumDepth: "We start with the 'Five Pillars' and the 'Six Articles of Faith'. A major focus is on practical worship: performing Wudu and learning the movements and recitations of Salah. We also cover basics of 'Halal and Haram' in food and ethics, and how to navigate social and family changes after embracing Islam.",
    benefitsExt: "This course gives you the confidence to practice your faith correctly from day one. It connects you with a knowledgeable mentor who can guide you through the initial challenges of your journey. Most importantly, it helps you build a strong, knowledge-based relationship with Allah."
  },
  {
    title: "Seerat un Nabi",
    slug: "seerat-un-nabi",
    shortDesc: "A heart-touching course that explores the life, character, and teachings of Prophet Muhammad (P.B.U.H), offering guidance and inspiration for everyday life.",
    fullDesc: "This course explores the blessed life of Prophet Muhammad ﷺ, highlighting his character, teachings, and struggles. Students learn practical lessons from Seerah that guide moral conduct and daily life while developing love for the Prophet ﷺ.",
    image: "/seerat-un-nabi-course-online.webp",
    altText: "Seerat un Nabi Online Course – Life and Teachings of Prophet Muhammad (PBUH) for All Ages",
    whatYouLearn: [
      "Life of Prophet Muhammad ﷺ",
      "His character and manners",
      "Key Seerah events",
      "Moral and spiritual lessons",
      "Practical guidance for life"
    ],
    duration: "3 – 5 Months",
    level: "Beginner to Intermediate",
    summary: "Learn from the life of the Prophet ﷺ. A source of guidance and inspiration.",
    cta: "Enroll Now and learn from the life of the Prophet ﷺ",
    whoFor: "This course is for every Muslim—child or adult—who wants to increase their love for the Prophet (SAW) by knowing him better. It's for those seeking a role model in their character, leadership, and family life.",
    curriculumDepth: "We follow the chronological life of the Prophet (SAW), from his birth in Makkah to the revelation, the migration to Madinah, and the establishment of the first Islamic society. We highlight his 'Shama-il' (his physical and character traits) and the 'Sunnah' (his way of life) as a practical guide for us today.",
    benefitsExt: "Studying the Seerah is a source of immense inspiration and comfort. It shows us how the Prophet (SAW) handled trials, practiced patience, and showed mercy. It transforms the Prophet (SAW) from a historical figure into a living guide for our own lives, strengthening our identity as members of his Ummah."
  },
  {
    title: "Tajweed and Tarteel",
    slug: "tajweed-rules",
    shortDesc: "A detailed course focused on perfecting Quranic pronunciation (Tajweed) and reciting with rhythm and beauty (Tarteel), following the rules of proper recitation.",
    fullDesc: "This course focuses on perfecting Quran recitation by teaching Tajweed rules and the beauty of Tarteel. Students learn correct pronunciation, articulation points, and rhythmic recitation to recite the Quran as it was revealed.",
    image: "/quran-tajweed-tarteel-course-online.webp",
    altText: "Online Quran Tajweed and Tarteel Course – Perfect Your Quran Recitation with Certified Teachers",
    whatYouLearn: [
      "Rules of Tajweed",
      "Makharij and letter characteristics",
      "Correct pronunciation",
      "Beautiful recitation style",
      "Confidence in reciting aloud"
    ],
    duration: "4 – 6 Months",
    level: "Intermediate to Advanced",
    summary: "Perfect your Quran recitation. Recite with accuracy, beauty, and confidence.",
    cta: "Enroll Now and beautify your Quran recitation",
    whoFor: `Reciting the Quran correctly is not just a skill; it is a duty to the Word of Allah. This course is for anyone who can already read the Quran but feels their pronunciation is not quite right, or their recitation lacks the beauty and rhythm it deserves.`,
    curriculumDepth: `The Tajweed and Tarteel curriculum is a deep dive into the 'Science of Recitation'. We follow a structured path that moves from basic sounds to advanced rhythmic beauty:`,
    benefitsExt: `The primary benefit of Tajweed is the preservation of the Quran's meaning. A small slip in pronunciation can change a word from 'heart' to 'dog', which is why learning Tajweed is so vital.`
  },
  {
    title: "Dars e Nizami",
    slug: "islamic-scholarship",
    shortDesc: "A traditional Islamic studies course covering core subjects like Fiqh, Hadith, Tafseer, and Arabic grammar designed to build strong scholarly foundations.",
    fullDesc: "Dars-e-Nizami is a traditional Islamic studies program covering major Islamic sciences. It is designed for serious students seeking scholarly knowledge in Fiqh, Hadith, Tafseer, and Arabic grammar.",
    image: "/dars-e-nizami-islamic-scholarship-course.webp",
    altText: "Dars e Nizami Islamic Studies Course Online – Traditional Islamic Scholarship with Expert Scholars",
    whatYouLearn: [
      "Fiqh and Islamic rulings",
      "Hadith studies",
      "Tafseer methodology",
      "Arabic grammar (Nahw & Sarf)",
      "Scholarly Islamic foundation"
    ],
    duration: "5 – 8 Years",
    level: "Advanced",
    summary: "A complete path to Islamic scholarship. Build deep knowledge of Islamic sciences.",
    cta: "Enroll Now and begin your scholarly Islamic journey",
    whoFor: "This is for the 'Tulab-ul-Ilm' (Students of Knowledge) who want to become future leaders, teachers, and scholars of Islam. It is a long-term commitment for those who want to study the religion systematically from its primary sources.",
    curriculumDepth: "The Dars-e-Nizami curriculum is the gold standard for Islamic scholarship. It includes advanced Arabic grammar, Logic (Mantiq), Islamic Jurisprudence (Fiqh), Principles of Fiqh (Usul al-Fiqh), Hadith studies (including the Sihah al-Sittah), and Tafseer. We offer this program in levels, allowing students to progress from foundational years to specialization.",
    benefitsExt: "Graduates of this program gain a deep, comprehensive understanding of Islam that allows them to provide guidance to their communities. It builds critical thinking, linguistic mastery, and a firm grounding in the Islamic intellectual tradition, enabling them to navigate modern challenges with classical wisdom."
  },
  {
    title: "Short Shariah",
    slug: "basic-fiqh",
    shortDesc: "A concise course introducing the basic principles of Islamic law, covering daily practices, ethics, and worship according to the teachings of the Quran and Sunnah.",
    fullDesc: "This concise course introduces the basic principles of Islamic law in a simple and practical way. It focuses on daily worship, ethics, and personal responsibilities according to Quran and Sunnah.",
    image: "/short-shariah-course-online.webp",
    altText: "Short Shariah Course Online – Learn Basic Islamic Law and Daily Practices with Qualified Teachers",
    whatYouLearn: [
      "Basic Shariah principles",
      "Halal and Haram rules",
      "Daily Islamic practices",
      "Ethics and manners",
      "Living by Sunnah"
    ],
    duration: "1 – 2 Months",
    level: "Beginner",
    summary: "Simple and practical Shariah learning. Guidance for everyday Islamic life.",
    cta: "Enroll Now and learn Shariah for daily life",
    whoFor: "For busy Muslims who want to ensure their daily lives are aligned with Islamic law but don't have the time for a full scholarly program. It's for those who want clear answers on the essentials of worship and social dealings.",
    curriculumDepth: "We cover the 'Fiqh of Worship' (the rulings of Salah, Zakat, Fasting, and Hajj) and the 'Fiqh of Transactions' (basic ethics of business and family law). The focus is on the most common issues a Muslim faces in their daily life in a modern environment.",
    benefitsExt: "This course provides peace of mind that your worship is valid and your earnings are Halal. It simplifies complex legal concepts into actionable knowledge, helping you live a life that is pleasing to Allah while fulfilling your worldly responsibilities."
  },
  {
    title: "Farz-e-Uloom",
    slug: "essential-knowledge",
    shortDesc: "An essential course covering the basic Islamic knowledge every Muslim must know like beliefs, prayer, purification, and daily obligations in light of the Shariah.",
    fullDesc: "This essential course covers the basic Islamic knowledge that every Muslim must know. It explains beliefs, worship, and obligations clearly to ensure correct practice in daily life.",
    image: "/farz-e-uloom-essential-islamic-knowledge.webp",
    altText: "Farz-e-Uloom Essential Islamic Knowledge Course – Learn Obligatory Islamic Practices Online",
    whatYouLearn: [
      "Basic Islamic beliefs",
      "Purification and cleanliness",
      "Correct method of Salah",
      "Fasting and obligations",
      "Essential daily rulings"
    ],
    duration: "2 – 3 Months",
    level: "Beginner",
    summary: "Essential Islamic knowledge for every Muslim. Learn what is obligatory in daily life.",
    cta: "Enroll Now and complete your essential Islamic knowledge",
    whoFor: "Seeking the essential knowledge of religion is an individual obligation (Farz al-Ayn) upon every Muslim. This course is for everyone who wants to fulfill this obligation and ensure they have the minimum required knowledge to be a practicing Muslim.",
    curriculumDepth: "We cover 'Aqaid' (Beliefs) to ensure your Tawheed is sound, and 'Masail' (Rulings) regarding Taharah (Purification) and Salah. We also touch upon the basic rights of parents, neighbors, and fellow Muslims, as well as the 'sins of the heart' to avoid.",
    benefitsExt: "This course is your spiritual insurance. It protects you from the major mistakes that can nullify your worship. It gives you a firm footing in your faith and prepares you to face the challenges of life with a clear Islamic perspective."
  }
];

const BLOGS = [
  {
    id: 1,
    title: "10 Benefits of Learning the Quran (According to Quran & Hadith)",
    date: "Feb 15, 2026",
    excerpt: "The Quran is not just a book — it is the divine guidance sent by Allah ﷻ for all of humanity. Discover the eternal rewards.",
    content: [
      { type: "p", text: "The Quran is not just a book — it is the divine guidance sent by Allah ﷻ for all of humanity. Learning the Quran is one of the greatest acts of worship a Muslim can perform. Its benefits are not limited to this world; they extend into the Hereafter." },
      { type: "h3", text: "1. You Become Among the Best of People" },
      { type: "quote", text: "“The best of you are those who learn the Quran and teach it.”", source: "Sahih al-Bukhari" },
      { type: "p", text: "This Hadith clearly shows the high status of a person who dedicates themselves to learning the Quran. It is a sign of honor and closeness to Allah." },
      { type: "h3", text: "2. The Quran Will Intercede for You" },
      { type: "quote", text: "“Recite the Quran, for it will come as an intercessor for its companions on the Day of Resurrection.”", source: "Sahih Muslim" },
      { type: "h3", text: "3. Elevation in Ranks in Jannah" },
      { type: "quote", text: "“It will be said to the companion of the Quran: Recite and rise... for your status will be at the last verse you recite.”", source: "Sunan Abi Dawud" },
      { type: "h3", text: "4. Source of Guidance and Light" },
      { type: "quran", text: "“This is the Book about which there is no doubt, a guidance for those conscious of Allah.”", ref: "Surah Al-Baqarah 2:2" },
      { type: "h3", text: "5. Brings Peace and Tranquility" },
      { type: "quran", text: "“Verily, in the remembrance of Allah do hearts find rest.”", ref: "Surah Ar-Ra’d 13:28" },
      { type: "h3", text: "6. Multiplies Rewards for Every Letter" },
      { type: "p", text: "The Prophet ﷺ said: “Whoever recites a letter from the Book of Allah will receive a reward, and that reward will be multiplied by ten.”" },
      { type: "h3", text: "7. Protection from Misguidance" },
      { type: "p", text: "Learning the Quran protects a believer from deviation and confusion in religious matters." },
      { type: "h3", text: "8. Angels Surround the Gathering" },
      { type: "p", text: "No people gather in a house of Allah, reciting and studying it together, except that tranquility descends upon them and angels surround them." },
      { type: "h3", text: "9. Status of Individuals and Nations" },
      { type: "p", text: "“Indeed, Allah raises some people by this Book and lowers others by it.” (Sahih Muslim)" },
      { type: "h3", text: "10. A Continuous Source of Reward" },
      { type: "p", text: "Teaching or learning the Quran is beneficial knowledge that continues to bring reward even after death." }
    ]
  },
  {
    id: 2,
    title: "How to Improve Your Tajweed (Practical Tips)",
    date: "Feb 12, 2026",
    excerpt: "Learning Tajweed is about reciting the words of Allah ﷻ correctly, the way they were revealed to the Prophet ﷺ.",
    content: [
      { type: "p", text: "Learning Tajweed is not just about beautifying your voice — it is about reciting the words of Allah ﷻ correctly. Proper Tajweed protects the meaning of the Quran." },
      { type: "quran", text: "“And recite the Qur’an with measured recitation.”", ref: "Surah Al-Muzzammil 73:4" },
      { type: "h3", text: "1. Correct Your Intention First" },
      { type: "p", text: "Tajweed is an act of worship. You are not learning to impress others — you are learning to please Allah." },
      { type: "h3", text: "2. Learn the Basic Rules Step by Step" },
      { type: "p", text: "Focus on Makharij (articulation), Sifaat (characteristics), and rules of Noon/Meem Sakinah." },
      { type: "h3", text: "3. Focus on Makharij (Pronunciation)" },
      { type: "p", text: "Practice letters individually to distinguish between similar sounding letters like Ain and Alif, or Saad and Seen." },
      { type: "h3", text: "4. Recite Slowly (Tarteel)" },
      { type: "p", text: "Speed is the enemy of Tajweed. Slow recitation helps you apply rules properly and avoid mistakes." },
      { type: "h3", text: "5. Listen to Expert Qaris" },
      { type: "p", text: "Follow consistent masters like Alafasy or Al-Sudais. Repeat after them to imitate flow." },
      { type: "h3", text: "6. Record Your Recitation" },
      { type: "p", text: "Listen to yourself to identify where you rush or mispronounce. Self-review is powerful." }
    ]
  },
  {
    id: 3,
    title: "Memorizing Quran: Complete Step-by-Step Guide",
    date: "Feb 10, 2026",
    excerpt: "Hifz is one of the greatest honors. Discover our structured 10-step plan to preserve the Quran in your heart.",
    content: [
      { type: "h3", text: "Virtues of Memorizing" },
      { type: "p", text: "Every ayah memorized raises your rank in Paradise. It also brings immense honor to your parents in the afterlife." },
      { type: "h3", text: "The Complete Plan" },
      { type: "p", text: "1. Strengthen your intention for Allah alone." },
      { type: "p", text: "2. Fix your Tajweed before starting Hifz." },
      { type: "p", text: "3. Choose a consistent time (Fajr is best)." },
      { type: "p", text: "4. Follow a realistic daily plan (5-10 lines)." },
      { type: "p", text: "5. Use the 3x Method: Read 10x looking, 10x without, then connect." },
      { type: "h3", text: "The Golden Rule" },
      { type: "p", text: "Revision is more important than new memorization. Without it, the Quran fades like untied camels." }
    ]
  }
];

const LogoImage = ({ className }) => (
  <img src="/almaas-online-quran-academy-logo.webp" alt="Almaas Online Quran Academy – Best Online Quran Academy for Kids and Adults" className={className} />
);

const Header = ({ scrolled, menuOpen, setMenuOpen, navigateTo, setShowPopup }) => (
  <header className={`fixed w-full top-0 z-40 transition ${scrolled ? 'bg-offwhite shadow-lg' : 'bg-offwhite/95'}`}>
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <LogoImage className="h-16 w-16" />
          <div>
            <div className="text-xl font-bold text-navy">ALMAAS ONLINE</div>
            <p className="text-sm text-darkgray font-medium">QURAN ACADEMY</p>
          </div>
        </div>
        <nav className="hidden lg:flex items-center gap-8">
          <button onClick={() => navigateTo('/')} className="text-darkgray hover:text-navy font-medium">Home</button>
          <button onClick={() => navigateTo('/courses')} className="text-darkgray hover:text-navy font-medium">Courses</button>
          <button onClick={() => navigateTo('/pricing')} className="text-darkgray hover:text-navy font-medium">Pricing</button>
          <button onClick={() => navigateTo('/blogs')} className="text-darkgray hover:text-navy font-medium">Blogs</button>
          <button onClick={() => navigateTo('/faq')} className="text-darkgray hover:text-navy font-medium">FAQ</button>
          <button onClick={() => navigateTo('/reviews')} className="text-darkgray hover:text-navy font-medium">Reviews</button>
          <button onClick={() => navigateTo('/contact')} className="text-darkgray hover:text-navy font-medium">Contact</button>
          <button onClick={() => setShowPopup(true)} className="bg-navy text-white px-6 py-2.5 rounded-lg font-bold">Start Free Trial</button>
        </nav>
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-navy p-2">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {menuOpen && (
        <div className="lg:hidden mt-4 pb-4 bg-offwhite/50 rounded-xl border-2 border-navy">
          <div className="flex flex-col gap-2 p-4">
            <button onClick={() => navigateTo('/')} className="text-darkgray hover:text-navy py-3 px-4 rounded-lg text-left font-medium">Home</button>
            <button onClick={() => navigateTo('/courses')} className="text-darkgray hover:text-navy py-3 px-4 rounded-lg text-left font-medium">Courses</button>
            <button onClick={() => navigateTo('/pricing')} className="text-darkgray hover:text-navy py-3 px-4 rounded-lg text-left font-medium">Pricing</button>
            <button onClick={() => navigateTo('/blogs')} className="text-darkgray hover:text-navy py-3 px-4 rounded-lg text-left font-medium">Blogs</button>
            <button onClick={() => navigateTo('/faq')} className="text-darkgray hover:text-navy py-3 px-4 rounded-lg text-left font-medium">FAQ</button>
            <button onClick={() => navigateTo('/reviews')} className="text-darkgray hover:text-navy py-3 px-4 rounded-lg text-left font-medium">Reviews</button>
            <button onClick={() => navigateTo('/contact')} className="text-darkgray hover:text-navy py-3 px-4 rounded-lg text-left font-medium">Contact</button>
            <button onClick={() => setShowPopup(true)} className="bg-navy text-white px-6 py-3 rounded-lg font-bold mt-2">Start Free Trial</button>
          </div>
        </div>
      )}
    </div>
  </header>
);

const Footer = ({ navigateTo }) => (
  <footer className="bg-darkgray/80 text-gray-400 py-12 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <LogoImage className="h-12 w-12" />
            <div>
              <div className="text-white font-bold">ALMAAS ONLINE</div>
              <div className="text-xs text-gray-500">QURAN ACADEMY</div>
            </div>
          </div>
          <div className="flex gap-3">
            <a href="https://www.facebook.com/share/1QTAHW4p7t/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="w-10 h-10 bg-darkgray/90 hover:bg-blue-600 rounded-full flex items-center justify-center"><Facebook className="w-5 h-5" /></a>
            <a href="https://www.instagram.com/almaasonlinequranacademy" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="w-10 h-10 bg-darkgray/90 hover:bg-pink-600 rounded-full flex items-center justify-center"><Instagram className="w-5 h-5" /></a>
            <a href="https://youtube.com/@almaasonlinequranacademy" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to our YouTube channel" className="w-10 h-10 bg-darkgray/90 hover:bg-red-600 rounded-full flex items-center justify-center"><Youtube className="w-5 h-5" /></a>
            <a href="https://www.linkedin.com/company/almaas-online-quran-academy/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn" className="w-10 h-10 bg-darkgray/90 hover:bg-blue-700 rounded-full flex items-center justify-center"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <div className="space-y-2 text-sm">
            <button onClick={() => navigateTo('/')} className="block hover:text-white">Home</button>
            <button onClick={() => navigateTo('/courses')} className="block hover:text-white">Courses</button>
            <button onClick={() => navigateTo('/pricing')} className="block hover:text-white">Pricing</button>
            <button onClick={() => navigateTo('/reviews')} className="block hover:text-white">Reviews</button>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Legal</h4>
          <div className="space-y-2 text-sm">
            <button className="block hover:text-white text-left">Privacy Policy</button>
            <button className="block hover:text-white text-left">Terms & Conditions</button>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <div className="space-y-2 text-sm">
            <p>📞 +92 315 2267416</p>
            <p>💬 +92 335 0277160</p>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 pt-8 text-center text-sm">
        © 2026 Almaas Online Quran Academy. All rights reserved.
      </div>
    </div>
  </footer>
);

const EnrollPopup = ({ showPopup, setShowPopup, handleSubmit, formStatus, COURSES }) => {
  if (!showPopup) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy/80 backdrop-blur-sm" onClick={() => setShowPopup(false)}></div>
      <div className="bg-navy rounded-3xl p-8 max-w-xl w-full relative z-10 border border-gold/20 shadow-2xl overflow-y-auto max-h-[90vh]">
        <button onClick={() => setShowPopup(false)} className="absolute top-6 right-6 text-white/50 hover:text-white transition">
          <X className="w-8 h-8" />
        </button>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-2">Start Your Journey</h2>
          <p className="text-white/60">Fill the form for 3 FREE trial classes</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="_honeypot" style={{ display: 'none' }} />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="firstName" placeholder="First Name" className="px-4 py-3 rounded-lg bg-offwhite/10 border border-white/20 text-white placeholder-white/60 focus:outline-none" required />
            <input type="text" name="lastName" placeholder="Last Name" className="px-4 py-3 rounded-lg bg-offwhite/10 border border-white/20 text-white placeholder-white/60 focus:outline-none" required />
          </div>
          <input type="email" name="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-offwhite/10 border border-white/20 text-white placeholder-white/60 focus:outline-none" required />
          <select name="course" className="w-full px-4 py-3 rounded-lg bg-offwhite/10 border border-white/20 text-white focus:outline-none" required>
            <option value="" className="text-gray-900">Select Course</option>
            {COURSES && COURSES.map((c, i) => <option key={i} value={c.value} className="text-gray-900">{c.title}</option>)}
          </select>
          <input type="tel" name="phone" placeholder="Phone" className="w-full px-4 py-3 rounded-lg bg-offwhite/10 border border-white/20 text-white placeholder-white/60 focus:outline-none" required />
          <textarea name="message" placeholder="Message" rows="3" className="w-full px-4 py-3 rounded-lg bg-offwhite/10 border border-white/20 text-white placeholder-white/60 focus:outline-none resize-none"></textarea>
          <button
            type="submit"
            disabled={formStatus.submitting}
            className="w-full bg-gradient-to-r from-gold to-amber-600 text-navy py-4 rounded-lg font-bold shadow-xl hover:from-gold hover:to-amber-500 transition disabled:opacity-50"
          >
            {formStatus.submitting ? 'Sending...' : 'Submit Form'}
          </button>
          {formStatus.success && (
            <div className="p-3 bg-green-500/20 text-green-200 rounded-lg text-center font-bold text-sm">
              Success! We will contact you soon.
            </div>
          )}
          {formStatus.error && (
            <div className="p-3 bg-red-500/20 text-red-200 rounded-lg text-center font-bold text-sm">
              {formStatus.error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const ChatWidget = ({ showChat, setShowChat }) => (
  <div className="fixed bottom-6 right-6 z-40">
    <button onClick={() => setShowChat(!showChat)} className="bg-gold text-navy p-4 rounded-full shadow-2xl hover:scale-110 transition active:scale-95">
      {showChat ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
    </button>
    {showChat && (
      <div className="absolute bottom-20 right-0 w-80 bg-white rounded-3xl shadow-2xl border border-navy/10 overflow-hidden animate-in slide-in-from-bottom-5">
        <div className="bg-navy p-6 text-white text-center">
          <h3 className="font-bold text-lg mb-1">Assalamu Alaikum!</h3>
          <p className="text-xs opacity-70">How can we help you today?</p>
        </div>
        <div className="p-4 space-y-3">
          <a href="https://wa.me/923350277160" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition border border-green-100">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white"><MessageCircle className="w-5 h-5" /></div>
            <div>
              <div className="font-bold text-sm text-green-900">WhatsApp Support</div>
              <div className="text-xs text-green-700">Quick response</div>
            </div>
          </a>
          <a href="tel:+923152267416" className="flex items-center gap-3 p-3 bg-navy/5 rounded-xl hover:bg-navy/10 transition border border-navy/5">
            <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white"><Phone className="w-5 h-5" /></div>
            <div>
              <div className="font-bold text-sm text-navy">Direct Call</div>
              <div className="text-xs text-navy/70">24/7 Availability</div>
            </div>
          </a>
        </div>
      </div>
    )
    }
  </div >
);

const CoursesPage = ({ COURSES_DETAILED, navigateTo }) => (
  <div className="min-h-screen bg-offwhite">
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-black text-navy mb-4 text-center">Our Courses</h1>
        <p className="text-darkgray text-lg text-center mb-12">Explore our comprehensive Islamic education programs</p>
        <div className="space-y-8">
          {COURSES_DETAILED.map((course, idx) => (
            <div key={idx} className="bg-offwhite border-2 border-navy/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <div className="md:flex">
                <div className="md:w-1/3 h-64 md:h-auto">
                  <img src={course.image} alt={course.altText} className="w-full h-full object-cover" />
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-3xl font-black text-navy">{course.title}</h2>
                    <div className="text-right">
                      <div className="inline-block bg-offwhite/50 border border-navy/10 text-navy px-3 py-1 rounded-full text-sm font-bold mb-2">{course.level}</div>
                      <div className="text-slate-600 text-sm flex items-center gap-1"><Clock className="w-4 h-4" /> {course.duration}</div>
                    </div>
                  </div>
                  <p className="text-darkgray mb-6 leading-relaxed">{course.fullDesc}</p>
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-navy mb-3 flex items-center gap-2"><CheckCircle className="w-5 h-5" /> What You Will Learn:</h3>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {course.whatYouLearn.map((item, i) => (
                        <li key={i} className="flex items-start text-darkgray"><span className="text-navy mr-2">✓</span>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-offwhite/50 border-l-4 border-navy p-4 mb-6"><p className="text-darkgray/90 italic">{course.summary}</p></div>
                  <button onClick={() => navigateTo(`/courses/${course.slug}`)} className="w-full md:w-auto bg-gradient-to-r from-navy to-navy/90 text-white py-3 px-8 rounded-xl font-bold hover:from-navy/90 hover:to-navy/80 transition shadow-lg flex items-center justify-center gap-2">
                    <BookOpen className="w-5 h-5" /> Learn More About {course.title}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// --- PAGE COMPONENTS ---

const HomePage = ({ TAGLINES, currentTagline, counts, COURSES_DETAILED, navigateTo, setShowPopup, pricingPlans, FAQS, BLOGS, reviews, activeFaq, setActiveFaq, handleReviewSubmit, newReview, setNewReview, reviewStatus, handleSubmit, formStatus }) => (
  <div className="min-h-screen">
    <Helmet>
      <title>Online Quran Academy | Learn Quran with Tajweed &amp; Hifz for Kids &amp; Adults – Almaas Online Quran Academy</title>
      <meta name="description" content="Learn Quran from home with Almaas Online Quran Academy. We provide Online Quran classes, Tajweed, and Hifz for Kids &amp; Adults through personalized one-on-one sessions with expert teachers." />
    </Helmet>
    {/* Hero Section */}
    <section id="home" className="pt-32 pb-20 px-4 bg-gradient-to-br from-offwhite to-white">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-12">
          <p className="text-4xl md:text-7xl mb-4" style={{ fontFamily: "'Scheherazade New', 'Noto Naskh Arabic', 'Traditional Arabic', 'Amiri', serif", fontWeight: 700, color: '#0A1D37', lineHeight: 1.4, letterSpacing: '0.02em' }}>
            بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
          </p>
          <p className="text-base text-darkgray font-semibold">In the name of Allah, the Most Gracious, the Most Merciful</p>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
          <div className="overflow-hidden h-24 md:h-20 lg:h-24 relative mb-4">
            {TAGLINES.map((tagline, idx) => (
              <div key={idx} className={`absolute w-full transition-all duration-700 ${idx === currentTagline ? 'opacity-100 translate-y-0' : idx < currentTagline ? 'opacity-0 -translate-y-full' : 'opacity-0 translate-y-full'}`}>
                <span className="text-navy block">{tagline}</span>
              </div>
            ))}
          </div>
          <span className="text-navy/90 block text-3xl md:text-4xl lg:text-5xl mb-4">With</span>
          <span className="bg-gradient-to-r from-gold via-gold to-amber-600 bg-clip-text text-transparent block text-4xl md:text-5xl lg:text-6xl">Almaas Online Quran Academy</span>
        </h1>

        <p className="text-lg text-navy mb-4 font-bold max-w-3xl mx-auto">One-on-one and group classes are available for kids and adults.</p>
        <p className="text-darkgray mb-8 font-medium max-w-3xl mx-auto">Expert teachers • Flexible timings • Affordable pricing • 24/7 availability</p>

        <button onClick={() => setShowPopup(true)} className="bg-navy hover:bg-navy/90 text-white px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center gap-2 shadow-xl">
          Get 3 FREE Demo Classes <ChevronRight className="w-5 h-5" />
        </button>

        <div className="mt-12 flex items-center justify-center gap-3 bg-green-50 border-2 border-green-600 px-6 py-3 rounded-xl max-w-md mx-auto">
          <Shield className="w-8 h-8 text-green-600" />
          <div className="text-left">
            <p className="text-darkgray/80 font-bold">7-Day Money-Back Guarantee</p>
            <p className="text-green-700 text-sm font-semibold">100% Risk-Free Trial</p>
          </div>
        </div>

        <div className="mt-8 bg-offwhite border-2 border-navy/10 px-6 py-4 rounded-xl max-w-2xl mx-auto">
          <p className="text-darkgray text-sm mb-3 font-semibold">We Accept:</p>
          <div className="flex gap-4 items-center justify-center flex-wrap">
            <CreditCard className="w-8 h-8 text-navy" />
            <span className="text-darkgray/90 font-bold">Visa</span>
            <span className="text-darkgray/90 font-bold">Mastercard</span>
            <span className="text-darkgray/90 font-bold">PayPal</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
          {[{ num: `${counts.teachers}+`, label: "Teachers" }, { num: "🌍", label: "Worldwide" }, { num: "24/7", label: "Available" }].map((stat, idx) => (
            <div key={idx} className="bg-offwhite border-2 border-navy/10 hover:border-navy p-4 rounded-xl transition">
              <div className="text-3xl font-black text-navy">{stat.num}</div>
              <div className="text-xs text-navy/90 font-bold mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Why Choose Us */}
    <section className="py-20 px-4 bg-offwhite">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-4">Why Choose <span className="text-navy">Almaas Academy</span></h2>
        <p className="text-darkgray text-lg text-center mb-12">What makes us different from others</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Award, title: "Certified Teachers", desc: "All teachers certified with Ijazah and years of experience" },
            { icon: Shield, title: "Money-Back Guarantee", desc: "100% satisfaction guaranteed or money back within 7 days" },
            { icon: Clock, title: "Flexible Schedule", desc: "Choose your own time slots - available 24/7 worldwide" },
            { icon: Users, title: "One-on-One Attention", desc: "Personal attention with customized learning plans" },
            { icon: Globe, title: "Learn from Anywhere", desc: "Access classes from any device, anywhere in the world" },
            { icon: CheckCircle, title: "Proven Results", desc: "Thousands of successful students achieved their goals" }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-offwhite/50 border-2 border-navy/10 hover:border-navy p-6 rounded-2xl transition">
                <div className="w-16 h-16 bg-navy rounded-xl flex items-center justify-center mb-4"><Icon className="w-8 h-8 text-white" /></div>
                <h3 className="text-xl font-bold text-navy mb-3">{item.title}</h3>
                <p className="text-darkgray">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section className="py-20 px-4 bg-offwhite/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-4">How It <span className="text-navy">Works</span></h2>
        <p className="text-darkgray text-lg text-center mb-12">Get started in 4 simple steps</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { num: "1", title: "Register Free", desc: "Fill form and book free demo classes", icon: UserPlus },
            { num: "2", title: "Choose Course", desc: "Select course matching your goals", icon: BookOpen },
            { num: "3", title: "Schedule Class", desc: "Pick convenient time with teacher", icon: Clock },
            { num: "4", title: "Start Learning", desc: "Begin Quran learning journey", icon: Star }
          ].map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="bg-offwhite border-2 border-navy p-6 rounded-2xl text-center">
                <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center text-white text-2xl font-black mx-auto mb-4">{step.num}</div>
                <Icon className="w-12 h-12 text-navy mx-auto mb-4" />
                <h3 className="text-xl font-bold text-navy mb-3">{step.title}</h3>
                <p className="text-darkgray text-sm">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Offering Section */}
    <section className="py-20 px-4 bg-offwhite">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-4">We Are <span className="text-navy">Offering</span></h2>
        <p className="text-darkgray text-lg text-center mb-12">Comprehensive features for effective learning</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Clock, title: "Flexibility of Time", desc: "Classes 24/7 according to your convenience" },
            { icon: Users, title: "Weekend Classes", desc: "Special weekend batches available" },
            { icon: Award, title: "3 Demo Classes", desc: "Try 3 free classes before enrollment" },
            { icon: Globe, title: "Easily Accessible", desc: "Learn from anywhere with internet" }
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-offwhite/50 border-2 border-navy/10 hover:border-navy p-6 rounded-2xl transition">
                <div className="w-14 h-14 bg-navy rounded-xl flex items-center justify-center mb-4"><Icon className="w-7 h-7 text-white" /></div>
                <h3 className="text-lg font-bold text-navy mb-2">{feature.title}</h3>
                <p className="text-darkgray text-sm">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Courses Section */}
    <section className="py-20 px-4 bg-offwhite/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-4">Our <span className="text-navy">Courses</span></h2>
        <p className="text-darkgray text-lg text-center mb-12">Comprehensive Quran learning programs</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES_DETAILED.slice(0, 6).map((course, idx) => (
            <div key={idx} className="bg-gradient-to-br from-navy/90 to-navy rounded-3xl overflow-hidden shadow-2xl border-4 border-white hover:scale-105 transition-transform">
              <div className="h-48 overflow-hidden relative">
                <img src={course.image} alt={course.altText} loading="lazy" decoding="async" style={{ backgroundColor: '#0A1D37' }} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-gold/80 mb-4">{course.title}</h3>
                <p className="text-white text-sm mb-6 leading-relaxed line-clamp-3">{course.shortDesc}</p>
                <div className="flex gap-3">
                  <button onClick={() => setShowPopup(true)} className="flex-1 bg-gradient-to-r from-gold to-amber-600 hover:from-gold hover:to-amber-700 text-navy py-3 px-4 rounded-xl font-bold transition shadow-lg">Start Now</button>
                  <button onClick={() => navigateTo(`/courses/${course.slug}`)} className="flex-1 bg-offwhite hover:bg-gray-100 text-navy py-3 px-4 rounded-xl font-bold transition shadow-lg">Read More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button onClick={() => navigateTo('/courses')} className="text-navy font-black flex items-center gap-2 mx-auto hover:text-gold transition text-lg">
            View All Courses <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>

    {/* ===== BELOW-THE-FOLD: All wrapped in LazySection — only renders when user scrolls near ===== */}
    <LazySection rootMargin="150px">

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-offwhite">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">Affordable <span className="text-navy">Pricing</span></h2>
          <p className="text-darkgray text-lg text-center mb-12">Choose the plan that fits your schedule</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => (
              <div key={idx} className="rounded-3xl p-8 transition-transform hover:scale-105 bg-navy text-white shadow-2xl relative border-2 border-gold/10">
                {plan.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-navy px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">Most Popular</span>}
                <div className="text-sm font-bold opacity-80 mb-2 uppercase tracking-widest text-center">{plan.tag}</div>
                <h3 className="text-2xl font-black text-center mb-6">{plan.name}</h3>
                <div className="flex flex-col items-center gap-2 mb-8 py-6 border-y border-white/10">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black">{plan.price}</span>
                    <span className="text-xl font-medium opacity-70">/mo</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3"><CheckCircle className="w-5 h-5 flex-shrink-0 text-gold" /> <span className="text-sm font-medium">{f}</span></li>
                  ))}
                </ul>
                <button onClick={() => setShowPopup(true)} className="w-full py-4 rounded-xl font-black text-lg transition-all shadow-xl bg-gold text-navy hover:transform hover:-translate-y-1">Get Started Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Excerpt Section */}
      <section className="py-20 px-4 bg-offwhite/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-navy mb-12">Got Questions?</h2>
          <div className="space-y-4 text-left">
            {FAQS.slice(0, 4).map((faq, idx) => (
              <div key={idx} className="bg-white border-2 border-navy/10 rounded-2xl overflow-hidden shadow-sm">
                <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full p-6 text-left flex justify-between items-center hover:bg-navy/5 transition"><span className="text-navy font-bold text-lg">{faq.q}</span> <ChevronDown className={`w-6 h-6 transform transition ${activeFaq === idx ? 'rotate-180' : ''}`} /></button>
                {activeFaq === idx && <div className="px-6 pb-6 text-darkgray leading-relaxed border-t border-navy/5 pt-4">{faq.a}</div>}
              </div>
            ))}
          </div>
          <button onClick={() => navigateTo('/faq')} className="mt-12 text-navy font-black flex items-center gap-2 mx-auto hover:text-gold transition text-lg">View All FAQs <ChevronRight className="w-6 h-6" /></button>
        </div>
      </section>

      {/* Blog Excerpt Section */}
      <section className="py-20 px-4 bg-offwhite">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12">Latest <span className="text-navy">Insights</span></h2>
          <div className="grid md:grid-cols-3 gap-8">
            {BLOGS.map(blog => (
              <div key={blog.id} className="bg-white border-2 border-navy/10 hover:border-gold rounded-3xl overflow-hidden transition group shadow-lg flex flex-col">
                <div className="h-48 bg-navy flex items-center justify-center group-hover:bg-gold transition-colors aspect-video"><Newspaper className="w-16 h-16 text-white" /></div>
                <div className="p-8 flex flex-col flex-1">
                  <span className="text-gold font-bold text-xs uppercase tracking-widest mb-2">{blog.date}</span>
                  <h3 className="text-xl font-black text-navy mb-4 group-hover:text-gold transition-colors">{blog.title}</h3>
                  <p className="text-darkgray text-sm mb-6 line-clamp-3">{blog.excerpt}</p>
                  <div className="mt-auto">
                    <button onClick={() => navigateTo(`/blog/${blog.id}`)} className="text-navy font-black flex items-center gap-2 hover:text-gold transition">Read More <ChevronRight className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-4 bg-offwhite/50 border-t border-navy/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">What Our <span className="text-navy">Students Say</span></h2>
            <div className="flex justify-center text-gold gap-1 mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-gold" />)}</div>
            <p className="text-darkgray text-lg font-medium">Real feedback from our global community</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {reviews.slice(0, 6).map((review) => (
              <div key={review.id} className="bg-white p-8 rounded-3xl shadow-xl border border-navy/5 flex flex-col">
                <div className="flex text-gold mb-4">{[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-gold' : 'text-gray-300'}`} />)}</div>
                <p className="text-darkgray italic mb-6 flex-1 text-lg">"{review.text}"</p>
                <div className="flex items-center justify-between border-t border-navy/5 pt-4"><span className="font-bold text-navy">{review.name}</span> <span className="text-xs text-darkgray/50">{review.date}</span></div>
              </div>
            ))}
          </div>
          <div className="text-center mb-20"><button onClick={() => navigateTo('/reviews')} className="text-navy font-black flex items-center gap-2 mx-auto hover:text-gold transition text-lg">View All Reviews <ChevronRight className="w-6 h-6" /></button></div>
          {/* Inline Review Form */}
          <div id="review-form" className="max-w-2xl mx-auto bg-navy rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-white mb-2 text-center">Leave a Review</h3>
              <p className="text-white/70 text-center mb-8">Your feedback helps us improve our service</p>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Your Name" className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:border-gold" value={newReview.name} onChange={(e) => setNewReview({ ...newReview, name: e.target.value })} required />
                  <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 flex items-center justify-between"><span className="text-white/50 text-sm">Rating:</span><select className="bg-transparent text-gold font-bold focus:outline-none cursor-pointer" value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}>{[5, 4, 3, 2, 1].map(n => <option key={n} value={n} className="bg-navy text-gold">{n} Stars</option>)}</select></div>
                </div>
                <textarea placeholder="Tell us about your experience..." rows="4" className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:border-gold resize-none" value={newReview.text} onChange={(e) => setNewReview({ ...newReview, text: e.target.value })} required></textarea>
                <button type="submit" disabled={reviewStatus.submitting} className="w-full bg-gold text-navy py-5 rounded-xl font-black text-xl hover:bg-gold/90 transition transform hover:-translate-y-1 shadow-2xl disabled:opacity-50">{reviewStatus.submitting ? 'Posting...' : 'Post My Review'}</button>
                {reviewStatus.success && <div className="p-4 bg-green-500/20 text-green-200 rounded-xl text-center font-bold">Thank you! Your review has been posted successfully.</div>}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-4 bg-navy text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Start Your Quran Learning Journey Today</h2>
          <p className="text-xl mb-12 opacity-80 leading-relaxed">Join thousands of students worldwide and learn with expert teachers from the comfort of your home.</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button onClick={() => setShowPopup(true)} className="bg-gold text-navy px-12 py-5 rounded-2xl font-black text-2xl hover:scale-105 transition shadow-2xl">Book 3 Free Classes</button>
            <a href="https://wa.me/923350277160" target="_blank" rel="noopener noreferrer" className="bg-white/10 border-2 border-white/20 px-12 py-5 rounded-2xl font-black text-2xl hover:bg-white/20 transition flex items-center justify-center gap-3"><MessageCircle className="w-8 h-8" /> WhatsApp Us</a>
          </div>
        </div>
      </section>

    </LazySection>
  </div>
);


// --- Per-course SEO metadata ---
const COURSE_SEO = {
  'qaida-basics': {
    title: 'Quran Qaida for Beginners Online | Learn Arabic Letters & Pronunciation – Almaas Academy',
    description: 'Start your Quran journey with our Qaida for Beginners course. Learn Arabic letters, correct pronunciation, and Quranic reading step-by-step with expert teachers. Free trial available.',
    faqs: [
      { q: 'How old should a child be to start Qaida?', a: 'Children as young as 4 years old can start our Qaida course. We have specialized teachers trained in teaching young learners with patience and interactive methods.' },
      { q: 'How long does the Qaida course take to complete?', a: 'Typically 2–3 months depending on the student\'s age, learning pace, and frequency of classes per week.' },
      { q: 'Do I need any prior knowledge to enroll in Qaida?', a: 'No prior knowledge is required. This course is designed for absolute beginners starting from zero.' },
    ],
    syllabus: ['Arabic alphabet recognition (Huroof-e-Hijai)', 'Makharij – correct articulation points', 'Harakaat: Fatha, Kasra, Damma', 'Tanween, Sukoon, Shaddah', 'Joining letters to form words', 'Reading complete sentences from Noorani Qaida'],
  },
  'quran-reading': {
    title: 'Online Quran Reading Course | Fluent & Confident Recitation – Almaas Academy',
    description: 'Improve your Quran reading with our guided online course. Learn fluent, accurate recitation with correct pronunciation from certified teachers. One-on-one classes for kids and adults.',
    faqs: [
      { q: 'What is the prerequisite for the Quran Reading course?', a: 'Students should have completed the Qaida or already be able to recognize Arabic letters and basic vowel signs.' },
      { q: 'How many classes per week are recommended?', a: 'We recommend at least 3 classes per week for steady progress. Weekend-only plans are also available.' },
      { q: 'Will I learn Tajweed in this course?', a: 'Basic Tajweed rules are introduced as they appear in the text. For full Tajweed mastery, our dedicated Tajweed & Tarteel course is recommended.' },
    ],
    syllabus: ['Review of Qaida fundamentals', 'Juz Amma – short Surahs for fluency', 'Pause (Waqf) and continuation rules', 'Basic Tajweed as applied in text', 'Confidence building in recitation', 'Consistent reading speed (Tarteel)'],
  },
  'hifz-memorization': {
    title: 'Online Quran Memorization (Hifz) Classes | Become Hafiz/Hafiza – Almaas Academy',
    description: 'Structured Quran Hifz classes online for kids and adults. Memorize the Quran with daily revision plans, expert teachers, and Tajweed focus. Start your Hafiz journey with 3 free trial classes.',
    faqs: [
      { q: 'Can adults memorize the Quran online?', a: 'Absolutely. Many adults successfully complete Hifz through our structured program. We provide customized plans based on your schedule and memorization speed.' },
      { q: 'What is the daily commitment required for Hifz?', a: 'A minimum of 30–60 minutes of new memorization and 30 minutes of revision daily is recommended for consistent progress.' },
      { q: 'How do you ensure the memorization is retained long-term?', a: 'We use a structured 3-part system: new lesson (Sabaq), recent revision (Sabqi), and old revision (Manzil). This is the proven classical method used globally.' },
    ],
    syllabus: ['Tajweed correction before starting Hifz', 'Daily new lesson (Sabaq): 5–10 lines', 'Recent revision (Sabqi): last 7 days', 'Old revision (Manzil): full Quran cycle', 'Teacher-supervised recitation testing', 'Completion certificate upon Khatam'],
  },
  'quran-translation': {
    title: 'Online Quran Translation Course | Word-by-Word Meaning – Almaas Academy',
    description: 'Learn the meaning of the Quran with our word-by-word translation course. Understand every verse with clarity under expert guidance. Online classes for kids and adults worldwide.',
    faqs: [
      { q: 'What language is the translation taught in?', a: 'Translation is primarily taught in English and Urdu, catering to our global student base.' },
      { q: 'Will I be able to understand Salah after this course?', a: 'Yes. A core goal of this course is that you understand the Surahs and duas recited in daily prayers, greatly improving your Khushu (focus) in Salah.' },
      { q: 'Is Arabic grammar taught in the Translation course?', a: 'Basic Quranic vocabulary is covered. For in-depth Arabic grammar, our Arabic Language course is the natural next step.' },
    ],
    syllabus: ['Core Quranic vocabulary (80% of repeated words)', 'Word-by-word breakdown of Juz Amma', 'Understanding Quranic sentence structure', 'Reflection exercises on key verses', 'Contextual meaning (Tafseer lite)', 'Application of meanings in daily Salah'],
  },
  'quran-tafseer': {
    title: 'Online Quran Tafseer Course | In-Depth Quranic Commentary – Almaas Academy',
    description: 'Study Quran Tafseer online with certified scholars. Explore the historical context, wisdom, and guidance of Quranic verses. Advanced course for dedicated learners seeking deep understanding.',
    faqs: [
      { q: 'Which Tafseer sources do you use?', a: 'We primarily use Tafseer ibn Kathir and Tafseer al-Jalalayn, supplemented with modern explanations to relate Quranic wisdom to contemporary life.' },
      { q: 'What level should I be before joining Tafseer?', a: 'Students should be fluent in reading the Quran and ideally have some understanding of basic Arabic vocabulary (Translation level).' },
      { q: 'Does the Tafseer course increase faith?', a: 'Almost universally, yes. Understanding the context and wisdom of the words of Allah directly strengthens Iman (faith) and provides clarity on complex Islamic concepts.' },
    ],
    syllabus: ['Shan-e-Nuzool (context of revelation)', 'Linguistic analysis of key Arabic terms', 'Cross-referencing Ayahs with Hadith', 'Ahkam (legal rulings) derived from verses', 'Overarching themes of selected Surahs', 'Applying Quranic guidance to modern life'],
  },
  'arabic-language': {
    title: 'Online Arabic Language Course | Learn Quranic Arabic – Almaas Academy',
    description: 'Learn Arabic online with our structured Quranic Arabic course. Master reading, writing, grammar (Nahw & Sarf) and vocabulary. Beginner to intermediate classes for all ages.',
    faqs: [
      { q: 'Is this Modern Standard Arabic or Quranic Arabic?', a: 'Our focus is Quranic Arabic (Classical Arabic), which is the language of the Holy Quran and the primary goal for Muslim students. Modern Standard Arabic elements are included where relevant.' },
      { q: 'How is Quranic Arabic different from conversational Arabic?', a: 'Quranic Arabic is the classical form of the language. While learning it improves overall comprehension, the primary goal is understanding the Quran, not everyday conversation.' },
      { q: 'How long before I can read the Quran with understanding?', a: 'After 6 months of consistent study, most students gain the ability to recognize a significant portion of Quranic vocabulary and understand basic sentence structures.' },
    ],
    syllabus: ['Arabic alphabet and script mastery', 'Nahw (Syntax) – sentence structure', 'Sarf (Morphology) – verb conjugation', 'Quranic vocabulary (top 500 words)', 'Reading and parsing Quranic verses', 'Building sentences in Classical Arabic'],
  },
  'new-muslim-guide': {
    title: 'Online Quran & Islam Course for New Muslims | Almaas Academy',
    description: 'A welcoming, step-by-step Islamic course for new Muslims. Learn Salah, Quran basics, Islamic beliefs, and daily practices with a patient certified teacher. Free trial available.',
    faqs: [
      { q: 'Is this course only for people who recently converted?', a: 'This course is primarily designed for reverts (new Muslims), but anyone seeking to learn the fundamentals of Islam from scratch is welcome.' },
      { q: 'Will I feel judged or rushed in this course?', a: 'Absolutely not. Our teachers are trained to provide a completely safe, non-judgmental, and welcoming environment. We go at your pace.' },
      { q: 'Do you have teachers who speak my language?', a: 'We have teachers fluent in English and Urdu. Please contact us to arrange a teacher based on your language preference.' },
    ],
    syllabus: ['The Five Pillars of Islam', 'The Six Articles of Faith (Aqeedah)', 'How to perform Wudu (ablution)', 'Step-by-step method of Salah', 'Basic Quranic recitation (Qaida)', 'Halal/Haram basics and Islamic ethics'],
  },
  'seerat-un-nabi': {
    title: 'Seerat un Nabi Course Online | Life of Prophet Muhammad (PBUH) – Almaas',
    description: 'Study the life and character of Prophet Muhammad (PBUH) online. Learn from his biography, moral teachings, and key events. A spiritually enriching course for Muslims of all ages.',
    faqs: [
      { q: 'Why should I study Seerah?', a: 'The Prophet Muhammad (PBUH) is the ultimate role model for every Muslim. Studying his life gives us practical guidance on character, leadership, family, and faith.' },
      { q: 'Is this course suitable for children?', a: 'Yes. We have age-appropriate versions of this course specifically tailored for younger students, making the stories of the Prophet (PBUH) engaging and inspiring.' },
      { q: 'What time period does the Seerah course cover?', a: 'The course covers the Prophet\'s life chronologically from his birth in Makkah, through the years of revelation, migration to Madinah, and the establishment of the Islamic state.' },
    ],
    syllabus: ['Early life of the Prophet (PBUH) in Makkah', 'The beginning of revelation (Wahy)', 'Persecution and patience of early Muslims', 'Hijrah (Migration) to Madinah', 'Key battles and Islamic constitution', 'Final sermon and the Prophet\'s legacy'],
  },
  'tajweed-rules': {
    title: 'Online Quran Tajweed Course | Perfect Your Recitation – Almaas Academy',
    description: 'Master Tajweed and Tarteel with certified online teachers. Learn Makharij, Sifaat, Ghunna, Madd rules, and more. Beautify your Quran recitation for kids and adults worldwide.',
    faqs: [
      { q: 'Is learning Tajweed obligatory (Fard)?', a: 'Scholars agree that applying Tajweed to avoid changing the meaning of words is obligatory (Fard al-Ayn) for every Muslim who recites the Quran.' },
      { q: 'I can already read Quran. Why do I need a Tajweed course?', a: 'Most self-taught reciters have pronunciation habits that need correction. A Tajweed course provides live feedback from a trained teacher to correct these errors systematically.' },
      { q: 'What is the difference between Tajweed and Tarteel?', a: 'Tajweed refers to the rules of pronunciation. Tarteel refers to the measured, rhythmic, and beautiful style of recitation. Both are covered in this course.' },
    ],
    syllabus: ['Makharij al-Huroof (articulation points)', 'Sifaat (characteristics of letters)', 'Rules of Noon & Meem Sakinah', 'Madd (elongation) rules', 'Waqf (pause) and Ibtida (resumption)', 'Tarteel practice with Quranic passages'],
  },
  'islamic-scholarship': {
    title: 'Dars e Nizami Online | Islamic Scholarship Program – Almaas Academy',
    description: 'Study Dars e Nizami online – the classical Islamic scholarship curriculum covering Fiqh, Hadith, Tafseer, and Arabic grammar. For dedicated students of Islamic sciences.',
    faqs: [
      { q: 'How long does the full Dars e Nizami program take?', a: 'The complete Dars e Nizami curriculum traditionally spans 7–8 years. We offer it in modular levels so students can progress at their own pace.' },
      { q: 'What career paths does this open?', a: 'Graduates of Dars e Nizami can become qualified scholars, Imams, Qadis, teachers, and community leaders with recognized Islamic authority.' },
      { q: 'Do I need to know Arabic before enrolling?', a: 'A strong foundation in Arabic grammar (Nahw & Sarf) is required before the advanced levels. We can help assess and build your readiness.' },
    ],
    syllabus: ['Nahw (Arabic Syntax) & Sarf (Morphology)', 'Mantiq (Islamic Logic)', 'Usul al-Fiqh (Principles of Islamic Law)', 'Fiqh (Islamic Jurisprudence)', 'Hadith studies (Sihah al-Sittah)', 'Tafseer methodology and application'],
  },
  'basic-fiqh': {
    title: 'Short Shariah Course Online | Basic Islamic Law & Daily Rulings – Almaas',
    description: 'Learn essential Shariah rulings for daily Muslim life. Our concise Short Shariah online course covers Salah, Zakat, fasting, Halal/Haram, and Islamic ethics. Beginner friendly.',
    faqs: [
      { q: 'Who is this Short Shariah course designed for?', a: 'This course is designed for busy Muslims who want clear, practical answers on essential Islamic rulings without committing to a long scholarly program.' },
      { q: 'What Madhab (school of thought) do you teach?', a: 'We primarily follow the Hanafi madhab but we make students aware of other scholarly opinions where they are commonly followed.' },
      { q: 'How quickly can I complete this course?', a: 'The course can be completed in 1–2 months with 2–3 classes per week, making it one of our most accessible programs.' },
    ],
    syllabus: ['Fiqh of Taharah (Purification)', 'Fiqh of Salah (Prayer rules & conditions)', 'Fiqh of Zakat (Charity obligations)', 'Fiqh of Fasting (Ramadan rules)', 'Halal & Haram in food and business', 'Rights of family, neighbors & community'],
  },
  'essential-knowledge': {
    title: 'Farz e Uloom Course Online | Essential Islamic Knowledge for Every Muslim',
    description: 'Learn the essential Islamic knowledge (Farz-e-Uloom) every Muslim must have. Covers Aqeedah, Salah, purification, and daily Islamic obligations. Beginner-friendly online course.',
    faqs: [
      { q: 'What is Farz-e-Uloom?', a: 'Farz-e-Uloom (obligatory knowledge) refers to the minimum Islamic knowledge that is an individual duty (Farz al-Ayn) upon every Muslim to learn, such as correct Aqeedah, how to pray, and basic Islamic duties.' },
      { q: 'Is this course suitable for someone who grew up Muslim but never learned formally?', a: 'This is the most common student for this course. Many Muslims who grew up in the faith have gaps in foundational knowledge that this course addresses comprehensively.' },
      { q: 'How is this different from the Short Shariah course?', a: 'Farz-e-Uloom focuses specifically on the obligatory minimum knowledge, with more emphasis on Aqeedah (beliefs). Short Shariah is broader in its coverage of legal rulings.' },
    ],
    syllabus: ["Aqeedah (Islamic Beliefs) – the Six Pillars", 'Correct method of Wudu and Ghusl', 'Complete method of Salah (all 5 prayers)', 'Essentials of Fasting in Ramadan', 'Rights of parents, neighbors & Muslims', "Sins of the heart to avoid (Kibr, Hasad, etc.)"],
  },
};

const CourseDetailPage = ({ COURSES_DETAILED, navigateTo, setShowPopup }) => {
  const { slug } = useParams();
  const course = COURSES_DETAILED.find(c => c.slug === slug);
  if (!course) return <Navigate to="/courses" />;

  const seo = COURSE_SEO[slug] || {
    title: `${course.title} | Online Course – Almaas Online Quran Academy`,
    description: course.shortDesc,
    faqs: [],
    syllabus: course.whatYouLearn,
  };

  const related = COURSES_DETAILED.filter(c => c.slug !== slug).slice(0, 3);

  // JSON-LD structured data for Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "description": course.shortDesc,
    "provider": {
      "@type": "Organization",
      "name": "Almaas Online Quran Academy",
      "sameAs": "https://almaasonlinequranacademy.online"
    },
    "educationalLevel": course.level,
    "timeRequired": course.duration,
    "url": `https://almaasonlinequranacademy.online/courses/${slug}`,
    "image": `https://almaasonlinequranacademy.online${course.image}`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "3 Free Trial Classes Available"
    }
  };

  return (
    <div className="min-h-screen bg-offwhite">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={`https://almaasonlinequranacademy.online/courses/${slug}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero Banner */}
      <div className="relative h-72 md:h-[420px]">
        {/* Navy placeholder shown instantly while WebP downloads */}
        <img
          src={course.image}
          alt={course.altText}
          loading="eager"
          decoding="async"
          style={{ backgroundColor: '#0A1D37' }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <button onClick={() => navigateTo('/')} className="hover:text-gold transition">Home</button>
            <span>/</span>
            <button onClick={() => navigateTo('/courses')} className="hover:text-gold transition">Courses</button>
            <span>/</span>
            <span className="text-gold font-semibold">{course.title}</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">{course.title}</h1>
          <div className="flex flex-wrap gap-3">
            <span className="bg-white/15 backdrop-blur text-white px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2"><Clock className="w-4 h-4" />{course.duration}</span>
            <span className="bg-white/15 backdrop-blur text-white px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2"><Award className="w-4 h-4" />{course.level}</span>
            <span className="bg-gold text-navy px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2"><Star className="w-4 h-4 fill-navy" />3 Free Trial Classes</span>
          </div>
        </div>
        <button onClick={() => navigateTo('/courses')} className="absolute top-6 left-6 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white/30 transition font-semibold text-sm">
          <ArrowLeft className="w-4 h-4" /> All Courses
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-16">

        {/* Introduction */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-navy/5">
          <h2 className="text-3xl font-black text-navy mb-4">About This Course</h2>
          <p className="text-xl text-navy/80 italic font-medium mb-6 leading-relaxed">{course.shortDesc}</p>
          <p className="text-darkgray leading-relaxed text-lg">{course.fullDesc}</p>
        </section>

        {/* Who It's For */}
        <section className="bg-gradient-to-br from-navy to-navy/90 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
          <h2 className="text-3xl font-black mb-6 flex items-center gap-3"><Users className="w-8 h-8 text-gold" />Who This Course Is For</h2>
          <p className="text-white/85 leading-relaxed text-lg whitespace-pre-line">{course.whoFor}</p>
        </section>

        {/* Syllabus */}
        <section>
          <h2 className="text-3xl font-black text-navy mb-8 text-center">Course Syllabus & What You'll Learn</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {(seo.syllabus || course.whatYouLearn).map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white p-5 rounded-2xl border-2 border-navy/8 shadow-sm hover:border-gold/50 transition group">
                <div className="w-9 h-9 bg-navy rounded-xl flex items-center justify-center text-gold font-black text-sm flex-shrink-0 group-hover:bg-gold group-hover:text-navy transition">{i + 1}</div>
                <span className="text-darkgray font-medium leading-snug mt-1">{item}</span>
              </div>
            ))}
          </div>
          {course.curriculumDepth && (
            <div className="mt-6 p-6 bg-navy/5 border-l-4 border-navy rounded-2xl">
              <p className="text-darkgray leading-relaxed whitespace-pre-line">{course.curriculumDepth}</p>
            </div>
          )}
        </section>

        {/* Benefits */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-navy/5">
          <h2 className="text-3xl font-black text-navy mb-6 flex items-center gap-3"><CheckCircle className="w-8 h-8 text-gold" />Benefits & Outcomes</h2>
          <p className="text-darkgray leading-relaxed text-lg whitespace-pre-line">{course.benefitsExt}</p>
        </section>

        {/* Teacher Info */}
        <section className="bg-offwhite border-2 border-navy/10 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-black text-navy mb-8 text-center">Your Teachers at Almaas Academy</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Award, title: "Ijazah Certified", desc: "All teachers hold authentic Ijazah (chain of transmission) in Quran recitation and Tajweed." },
              { icon: Globe, title: "Global Experience", desc: "Experienced in teaching students from the USA, UK, Canada, Australia, and 30+ countries worldwide." },
              { icon: Users, title: "Male & Female Teachers", desc: "Both male and female certified teachers available. Sisters and children can request female-only sessions." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-navy/5">
                  <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center mx-auto mb-4"><Icon className="w-8 h-8 text-gold" /></div>
                  <h3 className="font-black text-navy text-lg mb-2">{item.title}</h3>
                  <p className="text-darkgray text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Course-specific FAQ */}
        {seo.faqs && seo.faqs.length > 0 && (
          <section>
            <h2 className="text-3xl font-black text-navy mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {seo.faqs.map((faq, i) => (
                <details key={i} className="group bg-white border-2 border-navy/10 rounded-2xl overflow-hidden shadow-sm hover:border-navy/30 transition">
                  <summary className="p-6 text-navy font-bold text-lg cursor-pointer flex justify-between items-center list-none">
                    <span>{faq.q}</span>
                    <ChevronDown className="w-5 h-5 flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-darkgray leading-relaxed border-t border-navy/5 pt-4">{faq.a}</div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-navy rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10">
            <h3 className="text-4xl font-black text-white mb-4">Ready to Start {course.title}?</h3>
            <p className="text-white/70 mb-8 text-lg">{course.cta}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setShowPopup(true)} className="bg-gold text-navy px-12 py-4 rounded-xl font-black text-xl hover:scale-105 transition shadow-2xl">
                Book 3 Free Trial Classes
              </button>
              <a href="https://wa.me/923350277160" target="_blank" rel="noopener noreferrer" className="bg-white/10 border-2 border-white/20 px-12 py-4 rounded-xl font-black text-xl text-white hover:bg-white/20 transition flex items-center justify-center gap-3">
                <MessageCircle className="w-6 h-6" /> WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* Related Courses */}
        <section>
          <h2 className="text-3xl font-black text-navy mb-8 text-center">Explore More Courses</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((rc, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-navy/8 hover:border-gold/50 hover:shadow-xl transition group cursor-pointer" onClick={() => navigateTo(`/courses/${rc.slug}`)}>
                <div className="h-40 overflow-hidden">
                  <img src={rc.image} alt={rc.altText} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-black text-navy text-lg mb-2">{rc.title}</h3>
                  <p className="text-darkgray text-sm line-clamp-2 mb-4">{rc.shortDesc}</p>
                  <span className="text-gold font-bold text-sm flex items-center gap-1">Learn More <ChevronRight className="w-4 h-4" /></span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

const PricingPage = ({ pricingPlans, navigateTo, setShowPopup }) => (
  <div className="min-h-screen bg-offwhite">
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-black text-navy mb-4">Pricing Plans</h1>
        <p className="text-darkgray text-lg mb-12">Flexible schedules for every student</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, idx) => (
            <div key={idx} className="rounded-3xl p-8 bg-navy text-white shadow-2xl relative border-2 border-gold/10 hover:scale-105 transition">
              {plan.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-navy px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">Most Popular</span>}
              <h3 className="text-3xl font-black mb-6">{plan.name}</h3>
              <div className="text-5xl font-black mb-8">{plan.price}<span className="text-xl opacity-70">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-gold" /> <span className="text-sm">{f}</span></li>
                ))}
              </ul>
              <button onClick={() => setShowPopup(true)} className="w-full py-4 rounded-xl font-black bg-gold text-navy">Select Plan</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const FAQPage = ({ FAQS, activeFaq, setActiveFaq, navigateTo }) => (
  <div className="min-h-screen bg-offwhite">
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black text-navy mb-12 text-center">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white border-2 border-navy/10 rounded-2xl overflow-hidden shadow-sm">
              <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full p-6 text-left flex justify-between items-center hover:bg-navy/5 transition"><span className="text-navy font-bold text-lg">{faq.q}</span> <ChevronDown className={`w-6 h-6 transform transition ${activeFaq === idx ? 'rotate-180' : ''}`} /></button>
              {activeFaq === idx && <div className="px-6 pb-6 text-darkgray leading-relaxed border-t border-navy/5 pt-4">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const BlogPage = ({ BLOGS, navigateTo }) => (
  <div className="min-h-screen bg-offwhite">
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-black text-navy mb-4 text-center">Latest Articles</h1>
        <p className="text-darkgray text-center mb-12">Knowledge and insights from our educators</p>
        <div className="grid gap-8">
          {BLOGS.map(blog => (
            <article key={blog.id} className="bg-white border-2 border-navy/10 rounded-3xl p-8 hover:border-gold transition group shadow-lg">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/4 bg-navy rounded-2xl flex items-center justify-center group-hover:bg-gold transition-colors aspect-square"><Newspaper className="w-16 h-16 text-white" /></div>
                <div className="md:w-3/4">
                  <span className="text-gold font-bold text-sm tracking-widest uppercase mb-2 block">{blog.date}</span>
                  <h2 className="text-3xl font-black text-navy mb-4 group-hover:text-gold transition-colors">{blog.title}</h2>
                  <p className="text-darkgray text-lg mb-6 leading-relaxed">{blog.excerpt}</p>
                  <button onClick={() => navigateTo(`/blog/${blog.id}`)} className="flex items-center gap-2 text-navy font-black hover:text-gold transition">Read Full Article <ChevronRight className="w-5 h-5" /></button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const BlogDetailPage = ({ BLOGS, navigateTo, setShowPopup }) => {
  const { id } = useParams();
  const blog = BLOGS.find(b => b.id === parseInt(id));
  if (!blog) return <Navigate to="/blogs" />;

  return (
    <div className="min-h-screen bg-offwhite">
      <button onClick={() => navigateTo('/blogs')} className="fixed top-4 left-4 z-50 bg-navy text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg"><ArrowLeft className="w-4 h-4" /> Back to Blogs</button>
      <div className="pt-24 pb-20 px-4">
        <article className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
          <header className="mb-12 border-b pb-8"><span className="text-gold font-bold uppercase tracking-widest block mb-4">{blog.date}</span><h1 className="text-4xl md:text-5xl font-black text-navy leading-tight">{blog.title}</h1></header>
          <div className="space-y-8">
            {blog.content.map((block, idx) => {
              if (block.type === 'p') return <p key={idx} className="text-darkgray text-lg leading-relaxed">{block.text}</p>;
              if (block.type === 'h3') return <h3 key={idx} className="text-2xl font-black text-navy mt-12 mb-4">{block.text}</h3>;
              if (block.type === 'quote') return <div key={idx} className="bg-navy/5 border-l-4 border-gold p-8 my-8 italic"><p className="text-navy text-xl font-medium mb-2">{block.text}</p><cite className="text-darkgray/70 text-sm font-bold">— {block.source}</cite></div>;
              if (block.type === 'quran') return <div key={idx} className="bg-offwhite border-2 border-navy/10 rounded-2xl p-8 my-8 text-center"><p className="text-2xl font-black text-navy mb-4 italic" style={{ fontFamily: "'Amiri', serif" }}>“{block.text}”</p><p className="text-gold font-bold text-sm uppercase">{block.ref}</p></div>;
              return null;
            })}
          </div>
          <footer className="mt-16 pt-8 border-t text-center"><button onClick={() => setShowPopup(true)} className="bg-navy text-white px-10 py-4 rounded-xl font-black hover:scale-105 transition shadow-xl">Get Started with Your Demo</button></footer>
        </article>
      </div>
    </div>
  );
};
const ReviewsPage = ({ reviews, loadingReviews, navigateTo }) => (
  <div className="min-h-screen bg-offwhite">
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black text-navy mb-4 text-center">Public Reviews</h1>
        <p className="text-darkgray text-lg text-center mb-12">What our students and parents say about Almaas Academy</p>
        {loadingReviews && (
          <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy"></div></div>
        )}
        <div className="grid gap-6">
          {!loadingReviews && reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-3xl shadow-lg border border-navy/5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-navy">{review.name}</h3>
                  <div className="flex text-gold mt-1">
                    {[...Array(5)].map((_, i) => (<Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-gold' : 'text-gray-300'}`} />))}
                  </div>
                </div>
                <span className="text-darkgray/50 text-sm font-medium">{review.date}</span>
              </div>
              <p className="text-darkgray text-lg italic leading-relaxed">"{review.text}"</p>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-navy text-white p-12 rounded-3xl text-center">
          <h2 className="text-3xl font-black mb-4">Share Your Experience</h2>
          <p className="mb-8 opacity-80">Help others by sharing your journey with Almaas Academy</p>
          <button onClick={() => { navigateTo('home'); setTimeout(() => { const element = document.getElementById('review-form'); if (element) element.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="bg-gold text-navy px-8 py-4 rounded-xl font-black hover:bg-gold/90 transition shadow-xl">Write a Review</button>
        </div>
      </div>
    </div>
  </div>
);

const ContactPage = ({ handleSubmit, formStatus, courses, navigateTo }) => (
  <div className="min-h-screen bg-offwhite">
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-black text-navy mb-8 text-center">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-offwhite/50 border-2 border-navy p-6 rounded-xl"><Phone className="w-10 h-10 text-navy mb-4" /><h3 className="text-navy font-bold text-lg mb-2">Call Us</h3><p className="text-darkgray/90">+92 315 2267416</p></div>
            <div className="bg-offwhite/50 border-2 border-navy p-6 rounded-xl"><MessageCircle className="w-10 h-10 text-navy mb-4" /><h3 className="text-navy font-bold text-lg mb-2">WhatsApp</h3><p className="text-darkgray/90">+92 335 0277160</p></div>
          </div>
          <div className="bg-offwhite/50 border-2 border-navy p-8 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="_honeypot" style={{ display: 'none' }} />
              <div className="grid grid-cols-2 gap-4"><input type="text" name="firstName" placeholder="First Name" className="px-4 py-3 rounded-lg border-2 border-navy/10 focus:border-navy focus:outline-none" required /><input type="text" name="lastName" placeholder="Last Name" className="px-4 py-3 rounded-lg border-2 border-navy/10 focus:border-navy focus:outline-none" required /></div>
              <input type="email" name="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg border-2 border-navy/10 focus:border-navy focus:outline-none" required />
              <select name="course" className="w-full px-4 py-3 rounded-lg border-2 border-navy/10 focus:border-navy focus:outline-none" required><option value="">Select Course</option>{courses.map((c, i) => <option key={i} value={c.value}>{c.title}</option>)}</select>
              <input type="tel" name="phone" placeholder="Phone" className="w-full px-4 py-3 rounded-lg border-2 border-navy/10 focus:border-navy focus:outline-none" required />
              <textarea name="message" placeholder="Message" rows="4" className="w-full px-4 py-3 rounded-lg border-2 border-navy/10 focus:border-navy focus:outline-none resize-none"></textarea>
              <button type="submit" disabled={formStatus.submitting} className="w-full bg-navy text-white py-4 rounded-lg font-bold text-lg shadow-xl hover:bg-navy/90 transition disabled:opacity-50">{formStatus.submitting ? 'Sending...' : 'Send Message'}</button>
              {formStatus.success && <div className="p-4 bg-green-100 text-green-700 rounded-lg text-center font-bold">Thank you! Your message has been sent successfully.</div>}
              {formStatus.error && <div className="p-4 bg-red-100 text-red-700 rounded-lg text-center font-bold">Error: {formStatus.error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const RegionalLandingPage = ({ selectedRegion, REGION_CONFIGS, pricingPlans, navigateTo, setShowPopup, FAQS, activeFaq, setActiveFaq, reviews }) => {
  const currentRegion = REGION_CONFIGS[selectedRegion] || REGION_CONFIGS['USA'];
  return (
    <div className="min-h-screen bg-offwhite">
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 bg-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="md:flex items-center gap-12">
            <div className="md:w-3/5">
              <div className="inline-block bg-gold text-navy px-4 py-1 rounded-full text-sm font-bold mb-6">Expert Quran Teachers available in {currentRegion.name}</div>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Online Quran Classes in <span className="text-gold">{currentRegion.name}</span></h1>
              <p className="text-xl mb-8 opacity-80 leading-relaxed max-w-2xl">One-on-one sessions, flexible timings for {currentRegion.timezones} time zones, and affordable pricing in {currentRegion.currency}.</p>
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10"><Globe className="w-5 h-5 text-gold" /> <span>{currentRegion.timezones}</span></div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10"><CreditCard className="w-5 h-5 text-gold" /> <span>Paid via {currentRegion.paymentMethods}</span></div>
              </div>
              <button onClick={() => setShowPopup(true)} className="bg-gold text-navy px-8 py-4 rounded-xl font-black text-xl hover:scale-105 transition shadow-2xl">Get Your 3 Free Classes</button>
            </div>
          </div>
        </div>
      </div>
      {/* Pricing Section */}
      <div className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-navy mb-4">Affordable Pricing for {currentRegion.name}</h2>
            <p className="text-darkgray text-lg">Premium Quran education at local rates in {currentRegion.currency}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPlans.slice(0, 3).map((plan, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-xl border border-navy/5 relative hover:border-gold transition">
                {plan.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-navy text-white px-4 py-1 rounded-full text-sm font-bold">Best Value</span>}
                <h3 className="text-xl font-black text-navy mb-4">{plan.name}</h3>
                <div className="text-4xl font-black text-navy mb-6">{plan.price}<span className="text-sm opacity-60">/mo</span></div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, i) => <li key={i} className="flex items-center gap-2 text-darkgray text-sm"><CheckCircle className="w-4 h-4 text-gold" /> {f}</li>)}
                </ul>
                <button onClick={() => setShowPopup(true)} className="w-full py-3 rounded-xl font-black bg-navy text-white">Join in {currentRegion.name}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AlmaasQuranAcademy = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [counts, setCounts] = useState({ teachers: 15 });
  const [currentTagline, setCurrentTagline] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState('USA'); // Default
  const [locationData, setLocationData] = useState(null);
  const [exchangeRates, setExchangeRates] = useState(null);
  const [formStatus, setFormStatus] = useState({ submitting: false, success: false, error: null });


  // Rotate taglines every 3.5 seconds
  useEffect(() => {
    const taglineInterval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % TAGLINES.length);
    }, 3500);
    return () => clearInterval(taglineInterval);
  }, []);


  const navigateTo = (path) => {
    if (path.startsWith('#')) {
      const element = document.getElementById(path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        // Wait for page to load then scroll
        setTimeout(() => {
          const el = document.getElementById(path.substring(1));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    // Dynamic Location and Currency Detection
    // Deferred via requestIdleCallback so it NEVER blocks initial paint
    const initDynamicPricing = async () => {
      try {
        // 1. Detect Location via IP (ipapi.co is free for 1k req/day)
        const ipRes = await fetch('https://ipapi.co/json/');
        const ipData = await ipRes.json();

        if (ipData && !ipData.error) {
          setLocationData(ipData);

          // Determine region based on country
          const country = ipData.country_name;

          if (country === 'United Kingdom') setSelectedRegion('UK');
          else if (country === 'Canada') setSelectedRegion('Canada');
          else if (country === 'Australia') setSelectedRegion('Australia');
          else if (ipData.continent_code === 'EU') setSelectedRegion('Europe');
          else setSelectedRegion('USA');

          // 2. Fetch Real-time Exchange Rates (exchangerate-api is free/no-key for v4)
          const rateRes = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
          const rateData = await rateRes.json();
          if (rateData && rateData.rates) {
            setExchangeRates(rateData.rates);
          }
        } else {
          throw new Error('IP detection failed');
        }
      } catch (err) {
        console.error('Dynamic pricing init failed, using fallbacks:', err);
        // Fallback: Timezone-based detection
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tz.includes('London') || tz.includes('Europe/London')) setSelectedRegion('UK');
        else if (tz.includes('America/New_York') || tz.includes('America/Chicago') || tz.includes('America/Los_Angeles')) setSelectedRegion('USA');
        else if (tz.includes('America/Toronto') || tz.includes('America/Vancouver')) setSelectedRegion('Canada');
        else if (tz.includes('Australia')) setSelectedRegion('Australia');
        else if (tz.includes('Europe')) setSelectedRegion('Europe');
        else setSelectedRegion('USA');
      }
    };

    // Use requestIdleCallback so pricing fetch never competes with initial render
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => initDynamicPricing(), { timeout: 3000 });
    } else {
      // Fallback for Safari: 2s delay keeps first paint unblocked
      setTimeout(initDynamicPricing, 2000);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // SEO & Meta Title Management
  useEffect(() => {
    let title = "Almaas Online Quran Academy | Learn Quran with Tajweed & Hifz";
    let description = "Learn Quran from home with expert teachers. Online Quran classes for kids and adults with flexible timings and affordable pricing.";

    const path = location.pathname;

    if (path === '/') {
      title = "Almaas Online Quran Academy | Learn Quran with Tajweed & Hifz";
    } else if (path === '/courses') {
      title = "Our Quran Courses | Comprehensive Islamic Education Online";
      description = "Explore our range of online Quran and Islamic courses including Qaida, Hifz, Tajweed, and Arabic language for all ages.";
    } else if (path.startsWith('/courses/')) {
      const slug = path.split('/').pop();
      const course = COURSES_DETAILED.find(c => c.slug === slug);
      if (course) {
        if (course.title.includes('Tajweed')) {
          title = "Learn Tajweed Online | Master Quran Pronunciation with Experts";
        } else if (course.title.includes('Memorization') || course.title.includes('Hifz')) {
          title = "Online Quran Memorization (Hifz) Classes for Kids | Almaas";
        } else {
          title = `${course.title} | Online Class at Almaas Quran Academy`;
        }
        description = course.shortDesc;
      }
    } else if (path === '/pricing') {
      title = "Affordable Quran Class Pricing | Monthly Plans & Fees";
      description = "Check our flexible and affordable pricing plans for online Quran classes. Choose from 2 to 5 days a week schedules.";
    } else if (path === '/faq') {
      title = "Frequently Asked Questions | Almaas Online Quran Academy";
      description = "Find answers to common questions about our online Quran classes, teaching methods, and enrollment process.";
    } else if (path === '/blog' || path === '/blogs') {
      title = "Islamic Articles & Quran Learning Tips | Almaas Blogs";
      description = "Read our latest articles on Quran memorization, Tajweed tips, and the benefits of Islamic education.";
    } else if (path === '/reviews') {
      title = "Student Reviews & Testimonials | Almaas Academy Feedback";
      description = "Read what our students and parents say about their experience learning Quran online with Almaas Academy.";
    } else if (path === '/contact') {
      title = "Contact Us | Book Your Free Quran Trial Class";
      description = "Get in touch with us to start your Quran learning journey. Book 3 free trial classes today!";
    } else if (path.startsWith('/quran-classes-')) {
      title = `Online Quran Classes in ${selectedRegion} | Expert Teachers available in ${selectedRegion}`;
      description = `Join Almaas Academy for online Quran classes in ${selectedRegion}. One-on-one sessions, flexible timings for ${selectedRegion} time zones, and affordable pricing in local currency.`;
    }

    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }, [location, selectedRegion]);

  useEffect(() => {
    const targets = { teachers: 20 };
    const duration = 2000;
    const steps = 50;
    const interval = duration / steps;
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setCounts({ teachers: Math.floor(targets.teachers * progress) });
      if (currentStep >= steps) {
        setCounts(targets);
        clearInterval(timer);
      }
    }, interval);
    return () => clearInterval(timer);
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: false, error: null });

    const currentForm = e.target;
    const formData = new FormData(currentForm);
    const data = Object.fromEntries(formData.entries());

    // FormSubmit Configuration
    data["_captcha"] = "false";
    data["_template"] = "table";
    data["_subject"] = "New Inquiry from Almaas Quran Academy";
    data["_honeypot"] = ""; // Anti-spam hidden field

    try {
      const response = await fetch("https://formsubmit.co/ajax/d8b53fee453ff25c680b3c26371f4346", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setFormStatus({ submitting: false, success: true, error: null });
        setTimeout(() => {
          setFormStatus(prev => ({ ...prev, success: false }));
          setShowPopup(false);
        }, 5000);
        currentForm.reset();
      } else {
        const result = await response.json();
        setFormStatus({ submitting: false, success: false, error: result.message || 'Submission failed' });
      }
    } catch (error) {
      setFormStatus({ submitting: false, success: false, error: error.message });
    }
  };


  const getPrice = (gbp, usd) => {
    // If we have dynamic location data and exchange rates, use them!
    if (locationData && exchangeRates) {
      const currency = locationData.currency; // e.g., 'GBP', 'CAD', 'PKR'
      const symbol = locationData.currency_symbol || '$';
      const rate = exchangeRates[currency] || 1;

      // We use USD as the base price for conversion
      const convertedPrice = Math.round(usd * rate);

      // Special case for regions we have explicit configs for (to keep symbols nice)
      const specialSymbols = { 'GBP': '£', 'CAD': 'C$', 'AUD': 'A$', 'EUR': '€', 'USD': '$' };
      const displaySymbol = specialSymbols[currency] || symbol;

      return `${displaySymbol}${convertedPrice}`;
    }

    // Fallback to static selection logic if API fails or is loading
    if (selectedRegion === 'UK') return `£${gbp}`;
    if (selectedRegion === 'USA') return `$${usd}`;

    const multipliers = { Canada: 1.35, Australia: 1.5, Europe: 0.92 };
    const symbols = { Canada: 'C$', Australia: 'A$', Europe: '€' };

    const mult = multipliers[selectedRegion] || 1;
    const sym = symbols[selectedRegion] || '$';
    const price = Math.round(usd * mult);

    return `${sym}${price}`;
  };

  const pricingPlans = [
    { name: "2 Days/Week", price: getPrice(20, 25), tag: "Weekday Lite", features: ["2 classes/week", "30 min each", "One-on-One"] },
    { name: "3 Days/Week", price: getPrice(25, 35), tag: "Weekday Standard", popular: true, features: ["3 classes/week", "30 min each", "Regular Feedback"] },
    { name: "4 Days/Week", price: getPrice(30, 40), tag: "Weekday Intensive", features: ["4 classes/week", "30 min each", "Flexible Timing"] },
    { name: "5 Days/Week", price: getPrice(35, 50), tag: "Weekday Full", features: ["5 classes/week", "30 min each", "Priority Support"] },
    { name: "Weekend Special", price: getPrice(25, 35), tag: "Sat & Sun Only", features: ["2 classes/week", "Extended sessions", "Perfect for kids"] },
    { name: "Advanced Courses", price: "Custom", tag: "Dars-e-Nizami & More", features: ["Flexible Schedule", "In-depth Curriculum", "One-on-One focus", "Pricing depends on duration"] }
  ];

  const initialReviews = [
    { id: 1, name: "Ahmed Khan", rating: 5, text: "Excellent teaching style. My kids have learned Qaida very quickly here.", date: "Feb 5, 2026" },
    { id: 2, name: "Sara Malik", rating: 5, text: "The female teachers are very patient and professional. Highly recommended for sisters.", date: "Feb 12, 2026" },
    { id: 3, name: "John Doe", rating: 4, text: "Very flexible timings. Perfect for someone with a busy work schedule.", date: "Feb 20, 2026" }
  ];

  const [reviews, setReviews] = useState(initialReviews);
  const [loadingReviews, setLoadingReviews] = useState(false);

  // Fetch reviews from Supabase on load
  useEffect(() => {
    const fetchReviews = async () => {
      if (!supabase) return;

      setLoadingReviews(true);
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('id', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setReviews(data);
        }
      } catch (err) {
        console.error('Error fetching reviews:', err.message);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchReviews();
  }, []);

  const [newReview, setNewReview] = useState({ name: '', rating: 5, text: '' });
  const [reviewStatus, setReviewStatus] = useState({ submitting: false, success: false });

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewStatus({ submitting: true, success: false });

    const reviewToAdd = {
      name: newReview.name,
      rating: newReview.rating,
      text: newReview.text,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    try {
      if (supabase) {
        // Save to Database
        const { data, error } = await supabase
          .from('reviews')
          .insert([reviewToAdd])
          .select();

        if (error) throw error;

        // Add to local state
        if (data) {
          setReviews(prev => [data[0], ...prev]);
        }
      } else {
        // Fallback to local state + localStorage if no database configured
        const localReview = { ...reviewToAdd, id: Date.now() };
        setReviews(prev => {
          const updated = [localReview, ...prev];
          localStorage.setItem('almaas_reviews', JSON.stringify(updated));
          return updated;
        });
      }

      setNewReview({ name: '', rating: 5, text: '' });
      setReviewStatus({ submitting: false, success: true });
    } catch (err) {
      console.error('Error submitting review:', err.message);
      setReviewStatus({ submitting: false, success: false });
      alert("Failed to save review to database. Please check your Supabase setup.");
    }

    // Hide success message after 5 seconds
    setTimeout(() => setReviewStatus(prev => ({ ...prev, success: false })), 5000);
  };

  // RENDER MAIN LAYOUT
  return (
    <div className="min-h-screen bg-offwhite">
      <Header scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} navigateTo={navigateTo} setShowPopup={setShowPopup} />

      <main>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy"></div></div>}>
          <Routes>
            <Route path="/" element={
              <HomePage
                TAGLINES={TAGLINES}
                currentTagline={currentTagline}
                counts={counts}
                COURSES_DETAILED={COURSES_DETAILED}
                navigateTo={navigateTo}
                setShowPopup={setShowPopup}
                pricingPlans={pricingPlans}
                FAQS={FAQS}
                BLOGS={BLOGS}
                reviews={reviews}
                activeFaq={activeFaq}
                setActiveFaq={setActiveFaq}
                handleReviewSubmit={handleReviewSubmit}
                newReview={newReview}
                setNewReview={setNewReview}
                reviewStatus={reviewStatus}
                handleSubmit={handleSubmit}
                formStatus={formStatus}
              />
            } />
            <Route path="/courses" element={<CoursesPage COURSES_DETAILED={COURSES_DETAILED} navigateTo={navigateTo} />} />
            <Route path="/courses/:slug" element={<CourseDetailPage COURSES_DETAILED={COURSES_DETAILED} navigateTo={navigateTo} setShowPopup={setShowPopup} />} />
            <Route path="/pricing" element={<PricingPage pricingPlans={pricingPlans} navigateTo={navigateTo} setShowPopup={setShowPopup} />} />
            <Route path="/faq" element={<FAQPage FAQS={FAQS} activeFaq={activeFaq} setActiveFaq={setActiveFaq} navigateTo={navigateTo} />} />
            <Route path="/blogs" element={<BlogPage BLOGS={BLOGS} navigateTo={navigateTo} />} />
            <Route path="/blog/:id" element={<BlogDetailPage BLOGS={BLOGS} navigateTo={navigateTo} setShowPopup={setShowPopup} />} />
            <Route path="/reviews" element={<ReviewsPage reviews={reviews} loadingReviews={loadingReviews} navigateTo={navigateTo} />} />
            <Route path="/contact" element={<ContactPage handleSubmit={handleSubmit} formStatus={formStatus} courses={COURSES} navigateTo={navigateTo} />} />

            <Route path="/quran-classes-usa" element={<RegionalLandingPage selectedRegion="USA" REGION_CONFIGS={REGION_CONFIGS} pricingPlans={pricingPlans} navigateTo={navigateTo} setShowPopup={setShowPopup} FAQS={FAQS} activeFaq={activeFaq} setActiveFaq={setActiveFaq} reviews={reviews} />} />
            <Route path="/quran-classes-uk" element={<RegionalLandingPage selectedRegion="UK" REGION_CONFIGS={REGION_CONFIGS} pricingPlans={pricingPlans} navigateTo={navigateTo} setShowPopup={setShowPopup} FAQS={FAQS} activeFaq={activeFaq} setActiveFaq={setActiveFaq} reviews={reviews} />} />
            <Route path="/quran-classes-canada" element={<RegionalLandingPage selectedRegion="Canada" REGION_CONFIGS={REGION_CONFIGS} pricingPlans={pricingPlans} navigateTo={navigateTo} setShowPopup={setShowPopup} FAQS={FAQS} activeFaq={activeFaq} setActiveFaq={setActiveFaq} reviews={reviews} />} />
            <Route path="/quran-classes-australia" element={<RegionalLandingPage selectedRegion="Australia" REGION_CONFIGS={REGION_CONFIGS} pricingPlans={pricingPlans} navigateTo={navigateTo} setShowPopup={setShowPopup} FAQS={FAQS} activeFaq={activeFaq} setActiveFaq={setActiveFaq} reviews={reviews} />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      <Footer navigateTo={navigateTo} />
      <EnrollPopup showPopup={showPopup} setShowPopup={setShowPopup} handleSubmit={handleSubmit} formStatus={formStatus} COURSES={COURSES} />
      <ChatWidget showChat={showChat} setShowChat={setShowChat} />
    </div>
  );
};

export default AlmaasQuranAcademy;
