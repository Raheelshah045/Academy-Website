import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Clock, Users, Award, BookOpen, Star, CheckCircle, ChevronRight, MessageCircle, Globe, Shield, CreditCard, UserPlus, Newspaper, ChevronDown, Facebook, Instagram, Youtube, ArrowLeft } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// --- DATABASE CONFIG ---
// Get these from your Supabase dashboard: Settings -> API
const SUPABASE_URL = 'https://fvyifgusqzlzoolrhpgv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2eWlmZ3VzcXpsem9vbHJocGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NzkwNzIsImV4cCI6MjA4NzM1NTA3Mn0.FRWaBEcSQifqO0FGcRvoA1IDtPjUnsQkT2e981gjxFI';
const supabase = (SUPABASE_URL && SUPABASE_KEY) ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

const AlmaasQuranAcademy = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [activeFaq, setActiveFaq] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [counts, setCounts] = useState({ teachers: 0 });
  const [currentTagline, setCurrentTagline] = useState(0);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [formStatus, setFormStatus] = useState({ submitting: false, success: false, error: null });

  // Rotating taglines
  const taglines = [
    "Learn Quran From Home",
    "Master Tajweed Online",
    "Memorize Quran with Expert Teachers",
    "Understand Quran with Translation"
  ];

  // Rotate taglines every 3.5 seconds
  useEffect(() => {
    const taglineInterval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3500);
    return () => clearInterval(taglineInterval);
  }, [taglines.length]);

  // Add Google Fonts for Arabic calligraphy
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;700&family=Amiri:wght@400;700&family=Noto+Naskh+Arabic:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const LogoImage = ({ className = "h-16 w-16" }) => (
    <img
      src="/logo.png"
      alt="Almaas Logo"
      className={`${className} object-contain`}
    />
  );

  const coursesDetailed = [
    {
      title: "Qaida for Beginners",
      shortDesc: "A foundational course designed to help beginners learn the Arabic alphabet, basic pronunciation, and the rules of Quranic reading step by step, with clarity and ease.",
      fullDesc: "This foundational course is designed for beginners who are starting their Quran learning journey from the very beginning. Students learn Arabic letters, correct pronunciation, and letter formation in a simple, step-by-step manner. Special focus is given to clarity, repetition, and individual attention so learners build confidence before moving on to Quran reading. This course is suitable for children, adults, and new learners with no prior Arabic background.",
      image: "/Quaida.jpg",
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
      cta: "Enroll Now and begin your Quran journey from the basics"
    },
    {
      title: "Quran Reading",
      shortDesc: "A guided course designed to help learners read the Holy Quran fluently, focusing on correct pronunciation, smooth recitation, and building confidence in every verse.",
      fullDesc: "This course helps students read the Holy Quran fluently and confidently with correct pronunciation. Learners are guided step by step to improve flow, accuracy, and consistency in recitation. Teachers focus on correcting mistakes and strengthening reading skills through regular practice. Ideal for students who can read basic Arabic and want to improve Quran recitation.",
      image: "/Quran.jpg",
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
      cta: "Enroll Now and start reading the Quran with confidence"
    },
    {
      title: "Quran Memorization",
      shortDesc: "A structured course that helps students memorize the Holy Quran with accuracy, daily revision plans, and expert guidance to retain and recite confidently.",
      fullDesc: "This structured course is designed to help students memorize the Holy Quran accurately and effectively. A disciplined system of daily lessons, revision plans, and continuous supervision ensures strong memorization and retention. Emphasis is placed on Tajweed and correct recitation. Suitable for children and adults aspiring to become Hafiz or Hafiza.",
      image: "/Quran2.png",
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
      cta: "Enroll Now and begin your journey to become a Hafiz/Hafiza"
    },
    {
      title: "Quran Translation",
      shortDesc: "A comprehensive course designed to help learners understand the meanings of Quranic verses through clear, word-by-word translation and spiritual reflection.",
      fullDesc: "This course helps learners understand the meanings of the Holy Quran through clear and easy word-by-word translation. Students develop an understanding of Quranic vocabulary and sentence structure while reflecting on the message of Allah. Ideal for learners who want to move beyond recitation and understand the Quran deeply.",
      image: "/translation.jpg",
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
      cta: "Enroll Now and understand the Quran deeply"
    },
    {
      title: "Tafseer ul Quran",
      shortDesc: "An in-depth course that explores the meanings, context, and wisdom behind Quranic verses helping learners connect deeply with the message of the Holy Quran.",
      fullDesc: "This advanced course provides detailed explanations of Quranic verses, including historical background, context, and wisdom. Students learn how Quranic teachings apply to real life and develop a deeper connection with Allah's message through authentic Tafseer.",
      image: "/Tafseer.jpg",
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
      cta: "Enroll Now and explore the deeper meanings of the Quran"
    },
    {
      title: "Arabic Language",
      shortDesc: "A beginner-friendly course that builds a strong foundation in reading, writing, and understanding Arabic essential for deeper Quranic comprehension and daily use.",
      fullDesc: "This beginner-friendly Arabic language course builds a strong foundation in reading, writing, and understanding Arabic. Lessons are designed in a simple and practical way to help learners understand the Quran and use Arabic in daily Islamic life.",
      image: "/arabic.jpg",
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
      cta: "Enroll Now and start learning Arabic step by step"
    },
    {
      title: "New Muslim",
      shortDesc: "A supportive course tailored for new Muslims, covering the basics of Islam, daily prayers, Quran reading, and essential beliefs to help start your spiritual journey.",
      fullDesc: "This supportive course is designed for new Muslims to learn Islam in a clear, simple, and welcoming way. It covers essential beliefs, worship, and daily Islamic practices to help new Muslims feel confident and comfortable in their faith.",
      image: "/muslim.jpg",
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
      cta: "Enroll Now and start your Islamic journey with confidence"
    },
    {
      title: "Seerat un Nabi",
      shortDesc: "A heart-touching course that explores the life, character, and teachings of Prophet Muhammad (P.B.U.H), offering guidance and inspiration for everyday life.",
      fullDesc: "This course explores the blessed life of Prophet Muhammad ﷺ, highlighting his character, teachings, and struggles. Students learn practical lessons from Seerah that guide moral conduct and daily life while developing love for the Prophet ﷺ.",
      image: "/seeratunnabi.jpg",
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
      cta: "Enroll Now and learn from the life of the Prophet ﷺ"
    },
    {
      title: "Tajweed and Tarteel",
      shortDesc: "A detailed course focused on perfecting Quranic pronunciation (Tajweed) and reciting with rhythm and beauty (Tarteel), following the rules of proper recitation.",
      fullDesc: "This course focuses on perfecting Quran recitation by teaching Tajweed rules and the beauty of Tarteel. Students learn correct pronunciation, articulation points, and rhythmic recitation to recite the Quran as it was revealed.",
      image: "/tajweed&tarteel.jpg",
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
      cta: "Enroll Now and beautify your Quran recitation"
    },
    {
      title: "Dars e Nizami",
      shortDesc: "A traditional Islamic studies course covering core subjects like Fiqh, Hadith, Tafseer, and Arabic grammar designed to build strong scholarly foundations.",
      fullDesc: "Dars-e-Nizami is a traditional Islamic studies program covering major Islamic sciences. It is designed for serious students seeking scholarly knowledge in Fiqh, Hadith, Tafseer, and Arabic grammar.",
      image: "/darsenizami.jpg",
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
      cta: "Enroll Now and begin your scholarly Islamic journey"
    },
    {
      title: "Short Shariah",
      shortDesc: "A concise course introducing the basic principles of Islamic law, covering daily practices, ethics, and worship according to the teachings of the Quran and Sunnah.",
      fullDesc: "This concise course introduces the basic principles of Islamic law in a simple and practical way. It focuses on daily worship, ethics, and personal responsibilities according to Quran and Sunnah.",
      image: "/shortshariah.jpg",
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
      cta: "Enroll Now and learn Shariah for daily life"
    },
    {
      title: "Farz-e-Uloom",
      shortDesc: "An essential course covering the basic Islamic knowledge every Muslim must know like beliefs, prayer, purification, and daily obligations in light of the Shariah.",
      fullDesc: "This essential course covers the basic Islamic knowledge that every Muslim must know. It explains beliefs, worship, and obligations clearly to ensure correct practice in daily life.",
      image: "/farzululoom.png",
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
      cta: "Enroll Now and complete your essential Islamic knowledge"
    }
  ];

  const courses = coursesDetailed.map(c => ({
    title: c.title,
    value: c.title,
    desc: c.shortDesc,
    features: c.whatYouLearn.slice(0, 4)
  }));

  const pricingPlans = [
    { name: "2 Days/Week", priceGBP: "£20", priceUSD: "$25", tag: "Weekday Lite", features: ["2 classes/week", "30 min each", "One-on-One"] },
    { name: "3 Days/Week", priceGBP: "£25", priceUSD: "$35", tag: "Weekday Standard", popular: true, features: ["3 classes/week", "30 min each", "Regular Feedback"] },
    { name: "4 Days/Week", priceGBP: "£30", priceUSD: "$40", tag: "Weekday Intensive", features: ["4 classes/week", "30 min each", "Flexible Timing"] },
    { name: "5 Days/Week", priceGBP: "£35", priceUSD: "$50", tag: "Weekday Full", features: ["5 classes/week", "30 min each", "Priority Support"] },
    { name: "Weekend Special", priceGBP: "£25", priceUSD: "$35", tag: "Sat & Sun Only", features: ["2 classes/week", "Extended sessions", "Perfect for kids"] },
    { name: "Advanced Courses", priceGBP: "Custom", priceUSD: "Variable", tag: "Dars-e-Nizami & More", features: ["Flexible Schedule", "In-depth Curriculum", "One-on-One focus", "Pricing depends on duration"] }
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


  const faqs = [
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

  const blogs = [
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

  // RENDER PAGES
  if (currentPage === 'courses') {
    return (
      <div className="min-h-screen bg-offwhite">
        <button onClick={() => navigateTo('home')} className="fixed top-4 left-4 z-50 bg-navy text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg hover:bg-navy/90 transition">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <div className="pt-24 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-black text-navy mb-4 text-center">Our Courses</h1>
            <p className="text-darkgray text-lg text-center mb-12">Explore our comprehensive Islamic education programs</p>
            <div className="space-y-8">
              {coursesDetailed.map((course, idx) => (
                <div key={idx} className="bg-offwhite border-2 border-navy/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition">
                  <div className="md:flex">
                    {/* Course Image */}
                    <div className="md:w-1/3 h-64 md:h-auto">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Course Details */}
                    <div className="md:w-2/3 p-8">
                      <div className="flex items-start justify-between mb-4">
                        <h2 className="text-3xl font-black text-navy">{course.title}</h2>
                        <div className="text-right">
                          <div className="inline-block bg-offwhite/50 border border-navy/10 text-navy px-3 py-1 rounded-full text-sm font-bold mb-2">
                            {course.level}
                          </div>
                          <div className="text-slate-600 text-sm flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {course.duration}
                          </div>
                        </div>
                      </div>

                      <p className="text-darkgray mb-6 leading-relaxed">{course.fullDesc}</p>

                      <div className="mb-6">
                        <h3 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" /> What You Will Learn:
                        </h3>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {course.whatYouLearn.map((item, i) => (
                            <li key={i} className="flex items-start text-darkgray">
                              <span className="text-navy mr-2">✓</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-offwhite/50 border-l-4 border-navy p-4 mb-6">
                        <p className="text-darkgray/90 italic">{course.summary}</p>
                      </div>

                      <button
                        onClick={() => { setShowPopup(true); navigateTo('home'); }}
                        className="w-full md:w-auto bg-gradient-to-r from-navy to-navy/90 text-white py-3 px-8 rounded-xl font-bold hover:from-navy/90 hover:to-navy/80 transition shadow-lg flex items-center justify-center gap-2"
                      >
                        <BookOpen className="w-5 h-5" />
                        {course.cta}
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
  }

  if (currentPage === 'pricing') {
    return (
      <div className="min-h-screen bg-offwhite">
        <button onClick={() => navigateTo('home')} className="fixed top-4 left-4 z-50 bg-navy text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="pt-24 pb-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl font-black text-navy mb-8 text-center">Pricing Plans</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pricingPlans.map((plan, idx) => (
                <div key={idx} className="rounded-3xl p-8 transition-transform hover:scale-105 bg-navy text-white shadow-2xl relative border-2 border-gold/10">
                  {plan.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-navy px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">Most Popular</span>}
                  <div className="text-sm font-bold opacity-80 mb-2 uppercase tracking-widest">{plan.tag}</div>
                  <h3 className="text-3xl font-black mb-6">{plan.name}</h3>
                  <div className="space-y-2 mb-8 border-y border-white/10 py-6 text-center">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-black">{plan.priceGBP}</span>
                      <span className="text-xl font-medium opacity-70">/mo</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 opacity-80 font-bold">
                      <span className="text-2xl">{plan.priceUSD}</span>
                      <span className="text-sm italic">USD</span>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 text-gold" />
                        <span className="text-sm font-medium">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => navigateTo('contact')} className="w-full py-4 rounded-xl font-black text-lg transition shadow-xl bg-gold text-navy hover:transform hover:-translate-y-1">
                    Choose Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'faq') {
    return (
      <div className="min-h-screen bg-offwhite">
        <button onClick={() => navigateTo('home')} className="fixed top-4 left-4 z-50 bg-navy text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="pt-24 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-black text-navy mb-8 text-center">FAQs</h1>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-offwhite border-2 border-navy/10 rounded-2xl overflow-hidden">
                  <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full p-6 text-left flex justify-between items-center">
                    <span className="text-navy font-bold text-lg">{faq.q}</span>
                    <ChevronDown className={`w-6 h-6 text-navy transition ${activeFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === idx && <div className="px-6 pb-6"><p className="text-darkgray">{faq.a}</p></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'blog-detail' && selectedBlog) {
    return (
      <div className="min-h-screen bg-offwhite">
        <button onClick={() => navigateTo('blogs')} className="fixed top-4 left-4 z-50 bg-navy text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg">
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </button>
        <div className="pt-24 pb-20 px-4">
          <article className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-navy/5">
            <header className="mb-12 border-b border-navy/10 pb-8">
              <div className="text-gold font-bold mb-4 uppercase tracking-widest">{selectedBlog.date}</div>
              <h1 className="text-4xl md:text-5xl font-black text-navy leading-tight">{selectedBlog.title}</h1>
            </header>

            <div className="space-y-8">
              {selectedBlog.content.map((block, idx) => {
                if (block.type === 'p') return <p key={idx} className="text-darkgray text-lg leading-relaxed">{block.text}</p>;
                if (block.type === 'h3') return <h3 key={idx} className="text-2xl font-black text-navy mt-12 mb-4">{block.text}</h3>;
                if (block.type === 'quote') return (
                  <div key={idx} className="bg-navy/5 border-l-4 border-gold p-8 my-8 italic">
                    <p className="text-navy text-xl font-medium mb-2">{block.text}</p>
                    <cite className="text-darkgray/70 text-sm font-bold">— {block.source}</cite>
                  </div>
                );
                if (block.type === 'quran') return (
                  <div key={idx} className="bg-offwhite border-2 border-navy/10 rounded-2xl p-8 my-8 text-center bg-arabesque">
                    <p className="text-2xl font-black text-navy mb-4 italic" style={{ fontFamily: "'Amiri', serif" }}>“{block.text}”</p>
                    <p className="text-gold font-bold text-sm uppercase">{block.ref}</p>
                  </div>
                );
                return null;
              })}
            </div>

            <footer className="mt-16 pt-8 border-t border-navy/10 text-center">
              <button onClick={() => setShowPopup(true)} className="bg-navy text-white px-8 py-4 rounded-xl font-black hover:bg-navy/90 transition shadow-xl">
                Start Your Journey With Us
              </button>
            </footer>
          </article>
        </div>
      </div>
    );
  }

  if (currentPage === 'blogs') {
    return (
      <div className="min-h-screen bg-offwhite">
        <button onClick={() => navigateTo('home')} className="fixed top-4 left-4 z-50 bg-navy text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="pt-24 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-black text-navy mb-8 text-center">Latest Articles</h1>
            <div className="grid gap-6">
              {blogs.map((blog) => (
                <article key={blog.id} className="bg-offwhite border-2 border-navy/10 rounded-2xl p-8 hover:border-navy transition group">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4">
                      <div className="aspect-square bg-navy rounded-2xl flex items-center justify-center group-hover:bg-gold transition-colors">
                        <Newspaper className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <p className="text-sm text-gold font-bold mb-2 uppercase tracking-widest">{blog.date}</p>
                      <h2 className="text-3xl font-black text-navy mb-4 group-hover:text-gold transition-colors">{blog.title}</h2>
                      <p className="text-darkgray text-lg mb-6 leading-relaxed">{blog.excerpt}</p>
                      <button
                        onClick={() => { setSelectedBlog(blog); setCurrentPage('blog-detail'); window.scrollTo(0, 0); }}
                        className="flex items-center gap-2 text-navy font-black hover:text-gold transition"
                      >
                        Read Full Article <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'reviews') {
    return (
      <div className="min-h-screen bg-offwhite">
        <button onClick={() => navigateTo('home')} className="fixed top-4 left-4 z-50 bg-navy text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg hover:bg-navy/90 transition">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <div className="pt-24 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-black text-navy mb-4 text-center">Public Reviews</h1>
            <p className="text-darkgray text-lg text-center mb-12">What our students and parents say about Almaas Academy</p>

            {loadingReviews && (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy"></div>
              </div>
            )}

            <div className="grid gap-6">
              {!loadingReviews && reviews.map((review) => (
                <div key={review.id} className="bg-white p-8 rounded-3xl shadow-lg border border-navy/5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-navy">{review.name}</h3>
                      <div className="flex text-gold mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-gold' : 'text-gray-300'}`} />
                        ))}
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
              <button onClick={() => {
                navigateTo('home'); setTimeout(() => {
                  const element = document.getElementById('review-form');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }} className="bg-gold text-navy px-8 py-4 rounded-xl font-black hover:bg-gold/90 transition shadow-xl">
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'contact') {
    return (
      <div className="min-h-screen bg-offwhite">
        <button onClick={() => navigateTo('home')} className="fixed top-4 left-4 z-50 bg-navy text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="pt-24 pb-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl font-black text-navy mb-8 text-center">Contact Us</h1>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-offwhite/50 border-2 border-navy p-6 rounded-xl">
                  <Phone className="w-10 h-10 text-navy mb-4" />
                  <h3 className="text-navy font-bold text-lg mb-2">Call Us</h3>
                  <p className="text-darkgray/90">+92 315 2267416</p>
                </div>
                <div className="bg-offwhite/50 border-2 border-navy p-6 rounded-xl">
                  <MessageCircle className="w-10 h-10 text-navy mb-4" />
                  <h3 className="text-navy font-bold text-lg mb-2">WhatsApp</h3>
                  <p className="text-darkgray/90">+92 335 0277160</p>
                </div>
              </div>
              <div className="bg-offwhite/50 border-2 border-navy p-8 rounded-2xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" name="_honeypot" style={{ display: 'none' }} />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="firstName" placeholder="First Name" className="px-4 py-3 rounded-lg border-2 border-navy/10 focus:border-navy focus:outline-none" required />
                    <input type="text" name="lastName" placeholder="Last Name" className="px-4 py-3 rounded-lg border-2 border-navy/10 focus:border-navy focus:outline-none" required />
                  </div>
                  <input type="email" name="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg border-2 border-navy/10 focus:border-navy focus:outline-none" required />
                  <select name="course" className="w-full px-4 py-3 rounded-lg border-2 border-navy/10 focus:border-navy focus:outline-none" required>
                    <option value="">Select Course</option>
                    {courses.map((c, i) => <option key={i} value={c.value}>{c.title}</option>)}
                  </select>
                  <input type="tel" name="phone" placeholder="Phone" className="w-full px-4 py-3 rounded-lg border-2 border-navy/10 focus:border-navy focus:outline-none" required />
                  <textarea name="message" placeholder="Message" rows="4" className="w-full px-4 py-3 rounded-lg border-2 border-navy/10 focus:border-navy focus:outline-none resize-none"></textarea>

                  <button
                    type="submit"
                    disabled={formStatus.submitting}
                    className="w-full bg-navy text-white py-4 rounded-lg font-bold text-lg shadow-xl hover:bg-navy/90 transition disabled:opacity-50"
                  >
                    {formStatus.submitting ? 'Sending...' : 'Send Message'}
                  </button>

                  {formStatus.success && (
                    <div className="p-4 bg-green-100 text-green-700 rounded-lg text-center font-bold">
                      Thank you! Your message has been sent successfully.
                    </div>
                  )}
                  {formStatus.error && (
                    <div className="p-4 bg-red-100 text-red-700 rounded-lg text-center font-bold">
                      Error: {formStatus.error}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // HOME PAGE
  return (
    <div className="min-h-screen bg-offwhite">
      <a href="https://wa.me/923350277160" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl">
        <MessageCircle className="w-7 h-7" />
      </a>

      {showChat && (
        <div className="fixed bottom-24 right-6 z-50 bg-offwhite rounded-2xl shadow-2xl w-80 border-2 border-navy">
          <div className="bg-navy p-4 rounded-t-2xl flex justify-between items-center">
            <h3 className="text-white font-bold">Chat with us!</h3>
            <button onClick={() => setShowChat(false)} className="text-white"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-4 h-64 bg-offwhite/80">
            <div className="bg-offwhite/50 border border-navy/10 p-3 rounded-lg"><p className="text-sm text-darkgray/90">Hello! How can we help?</p></div>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-navy rounded-3xl p-8 max-w-md w-full relative max-h-[90vh] overflow-y-auto border-2 border-gold/20 shadow-2xl">
            <button onClick={() => setShowPopup(false)} className="absolute top-4 right-4 text-white"><X className="w-6 h-6" /></button>
            <div className="text-white text-center mb-6">
              <h2 className="text-4xl font-black mb-2">3 Days</h2>
              <p className="text-2xl font-bold">Free Trail Class</p>
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
                {courses.map((c, i) => <option key={i} value={c.value} className="text-gray-900">{c.title}</option>)}
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
      )}

      <header className={`fixed w-full top-0 z-40 transition ${scrolled ? 'bg-offwhite shadow-lg' : 'bg-offwhite/95'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <LogoImage className="h-16 w-16" />
              <div>
                <h1 className="text-xl font-bold text-navy">ALMAAS ONLINE</h1>
                <p className="text-sm text-darkgray font-medium">QURAN ACADEMY</p>
              </div>
            </div>
            <nav className="hidden lg:flex items-center gap-8">
              <button onClick={() => navigateTo('home')} className="text-darkgray hover:text-navy font-medium">Home</button>
              <button onClick={() => navigateTo('courses')} className="text-darkgray hover:text-navy font-medium">Courses</button>
              <button onClick={() => navigateTo('pricing')} className="text-darkgray hover:text-navy font-medium">Pricing</button>
              <button onClick={() => navigateTo('blogs')} className="text-darkgray hover:text-navy font-medium">Blogs</button>
              <button onClick={() => navigateTo('faq')} className="text-darkgray hover:text-navy font-medium">FAQ</button>
              <button onClick={() => navigateTo('reviews')} className="text-darkgray hover:text-navy font-medium">Reviews</button>
              <button onClick={() => navigateTo('contact')} className="text-darkgray hover:text-navy font-medium">Contact</button>
              <button onClick={() => setShowPopup(true)} className="bg-navy text-white px-6 py-2.5 rounded-lg font-bold">Start Free Trial</button>
            </nav>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-navy p-2">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {menuOpen && (
            <div className="lg:hidden mt-4 pb-4 bg-offwhite/50 rounded-xl border-2 border-navy">
              <div className="flex flex-col gap-2 p-4">
                <button onClick={() => navigateTo('home')} className="text-darkgray hover:text-navy py-3 px-4 rounded-lg text-left font-medium">Home</button>
                <button onClick={() => navigateTo('courses')} className="text-darkgray hover:text-navy py-3 px-4 rounded-lg text-left font-medium">Courses</button>
                <button onClick={() => navigateTo('pricing')} className="text-darkgray hover:text-navy py-3 px-4 rounded-lg text-left font-medium">Pricing</button>
                <button onClick={() => navigateTo('blogs')} className="text-darkgray hover:text-navy py-3 px-4 rounded-lg text-left font-medium">Blogs</button>
                <button onClick={() => navigateTo('faq')} className="text-darkgray hover:text-navy py-3 px-4 rounded-lg text-left font-medium">FAQ</button>
                <button onClick={() => navigateTo('reviews')} className="text-darkgray hover:text-navy py-3 px-4 rounded-lg text-left font-medium">Reviews</button>
                <button onClick={() => navigateTo('contact')} className="text-darkgray hover:text-navy py-3 px-4 rounded-lg text-left font-medium">Contact</button>
                <button onClick={() => setShowPopup(true)} className="bg-navy text-white px-6 py-3 rounded-lg font-bold mt-2">Start Free Trial</button>
              </div>
            </div>
          )}
        </div>
      </header>

      <section id="home" className="pt-32 pb-20 px-4 bg-gradient-to-br from-offwhite to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12">
            <p className="text-4xl md:text-7xl mb-4" style={{ fontFamily: "'Scheherazade New', 'Noto Naskh Arabic', 'Traditional Arabic', 'Amiri', serif", fontWeight: 700, color: '#0A1D37', lineHeight: 1.4, letterSpacing: '0.02em' }}>
              بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
            </p>
            <p className="text-base text-darkgray font-semibold">In the name of Allah, the Most Gracious, the Most Merciful</p>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
            {/* Animated Tagline */}
            <div className="overflow-hidden h-24 md:h-20 lg:h-24 relative mb-4">
              {taglines.map((tagline, idx) => (
                <div
                  key={idx}
                  className={`absolute w-full transition-all duration-700 ${idx === currentTagline
                    ? 'opacity-100 translate-y-0'
                    : idx < currentTagline
                      ? 'opacity-0 -translate-y-full'
                      : 'opacity-0 translate-y-full'
                    }`}
                >
                  <span className="text-navy block">{tagline}</span>
                </div>
              ))}
            </div>
            <span className="text-navy/90 block text-3xl md:text-4xl lg:text-5xl mb-4">With</span>
            <span className="bg-gradient-to-r from-gold via-gold to-amber-600 bg-clip-text text-transparent block text-4xl md:text-5xl lg:text-6xl">
              Almaas Online Quran Academy
            </span>
          </h1>

          <p className="text-lg text-navy mb-4 font-bold max-w-3xl mx-auto">
            One-on-one and group classes are available for kids and adults.
          </p>

          <p className="text-darkgray mb-8 font-medium max-w-3xl mx-auto">
            Expert teachers • Flexible timings • Affordable pricing • 24/7 availability
          </p>

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
            {[
              { num: `${counts.teachers}+`, label: "Teachers" },
              { num: "🌍", label: "Worldwide" },
              { num: "24/7", label: "Available" }
            ].map((stat, idx) => (
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
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Why Choose <span className="text-navy">Almaas Academy</span>
          </h2>
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
                  <div className="w-16 h-16 bg-navy rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
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
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            How It <span className="text-navy">Works</span>
          </h2>
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

      {/* Features */}
      <section className="py-20 px-4 bg-offwhite">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            We Are <span className="text-navy">Offering</span>
          </h2>
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
                  <div className="w-14 h-14 bg-navy rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
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
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Our <span className="text-navy">Courses</span>
          </h2>
          <p className="text-darkgray text-lg text-center mb-12">Comprehensive Quran learning programs</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesDetailed.map((course, idx) => (
              <div key={idx} className="bg-gradient-to-br from-navy/90 to-navy rounded-3xl overflow-hidden shadow-2xl border-4 border-white hover:scale-105 transition-transform">
                {/* Course Image */}
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent"></div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-black text-gold/80 mb-4">{course.title}</h3>
                  <p className="text-white text-sm mb-6 leading-relaxed line-clamp-3">{course.shortDesc}</p>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowPopup(true)}
                      className="flex-1 bg-gradient-to-r from-gold to-amber-600 hover:from-gold hover:to-amber-700 text-navy py-3 px-4 rounded-xl font-bold transition shadow-lg"
                    >
                      Start Now
                    </button>
                    <button
                      onClick={() => navigateTo('courses')}
                      className="flex-1 bg-offwhite hover:bg-gray-100 text-navy py-3 px-4 rounded-xl font-bold transition shadow-lg"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-offwhite">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Affordable <span className="text-navy">Pricing</span>
          </h2>
          <p className="text-darkgray text-lg text-center mb-12">Choose the plan that fits your schedule</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <div key={idx} className="rounded-3xl p-8 transition-transform hover:scale-105 bg-navy text-white shadow-2xl relative border-2 border-gold/10">
                {plan.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-navy px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">Most Popular</span>}
                <div className="text-sm font-bold opacity-80 mb-2 uppercase tracking-widest text-center">{plan.tag}</div>
                <h3 className="text-2xl font-black text-center mb-6">{plan.name}</h3>

                <div className="flex flex-col items-center gap-2 mb-8 py-6 border-y border-white/10">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black">{plan.priceGBP}</span>
                    <span className="text-xl font-medium opacity-70">/mo</span>
                  </div>
                  <div className="text-xl font-bold opacity-80 flex items-center gap-1">
                    <span>{plan.priceUSD}</span>
                    <span className="text-sm italic">USD</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-gold" />
                      <span className="text-sm font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => setShowPopup(true)} className="w-full py-4 rounded-xl font-black text-lg transition-all shadow-xl bg-gold text-navy hover:transform hover:-translate-y-1">
                  Get Started Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-offwhite/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Frequently Asked <span className="text-navy">Questions</span>
          </h2>
          <p className="text-darkgray text-lg text-center mb-12">Find answers to common questions</p>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-offwhite border-2 border-navy/10 rounded-2xl overflow-hidden">
                <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full p-6 text-left flex justify-between items-center hover:bg-offwhite/50 transition">
                  <span className="text-navy font-bold text-lg">{faq.q}</span>
                  <ChevronDown className={`w-6 h-6 text-navy transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && <div className="px-6 pb-6"><p className="text-darkgray leading-relaxed">{faq.a}</p></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 px-4 bg-offwhite">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Latest <span className="text-navy">Articles</span>
          </h2>
          <p className="text-darkgray text-lg text-center mb-12">Read our latest insights and tips</p>
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => (
              <div key={idx} className="bg-offwhite border-2 border-navy/10 hover:border-navy rounded-2xl overflow-hidden transition group">
                <div className="h-48 bg-navy flex items-center justify-center group-hover:bg-gold transition-colors">
                  <Newspaper className="w-16 h-16 text-white opacity-50" />
                </div>
                <div className="p-6">
                  <p className="text-navy text-sm mb-2 font-semibold tracking-widest uppercase">{blog.date}</p>
                  <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors">{blog.title}</h3>
                  <p className="text-darkgray text-sm mb-4 line-clamp-3">{blog.excerpt}</p>
                  <button
                    onClick={() => { setSelectedBlog(blog); setCurrentPage('blog-detail'); window.scrollTo(0, 0); }}
                    className="text-navy font-black flex items-center gap-2 hover:text-gold transition"
                  >
                    Read More <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="py-20 px-4 bg-offwhite border-t border-navy/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">What Our <span className="text-navy">Students Say</span></h2>
            <p className="text-darkgray text-lg">Real feedback from our global community</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {reviews.slice(0, 6).map((review) => (
              <div key={review.id} className="bg-white p-8 rounded-3xl shadow-xl border border-navy/5 relative">
                <div className="absolute -top-4 -left-4 bg-gold text-navy p-3 rounded-2xl">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="flex text-gold mb-4 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-gold' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-darkgray italic mb-6">"{review.text}"</p>
                <div className="flex items-center justify-between border-t border-navy/5 pt-4">
                  <span className="font-bold text-navy">{review.name}</span>
                  <span className="text-xs text-darkgray/50">{review.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-20">
            <button onClick={() => navigateTo('reviews')} className="text-navy font-black flex items-center gap-2 mx-auto hover:text-gold transition text-lg">
              View All Public Reviews <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div id="review-form" className="max-w-2xl mx-auto bg-navy rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-white mb-2 text-center">Leave a Review</h3>
              <p className="text-white/70 text-center mb-8">Your feedback helps us improve our service</p>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:border-gold"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    required
                  />
                  <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 flex items-center justify-between">
                    <span className="text-white/50 text-sm">Rating:</span>
                    <select
                      className="bg-transparent text-gold font-bold focus:outline-none cursor-pointer"
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                    >
                      {[5, 4, 3, 2, 1].map(n => <option key={n} value={n} className="bg-navy text-gold">{n} Stars</option>)}
                    </select>
                  </div>
                </div>
                <textarea
                  placeholder="Tell us about your experience..."
                  rows="4"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:border-gold resize-none"
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  required
                ></textarea>
                <button
                  type="submit"
                  disabled={reviewStatus.submitting}
                  className="w-full bg-gold text-navy py-5 rounded-xl font-black text-xl hover:bg-gold/90 transition transform hover:-translate-y-1 shadow-2xl disabled:opacity-50"
                >
                  {reviewStatus.submitting ? 'Posting...' : 'Post My Review'}
                </button>

                {reviewStatus.success && (
                  <div className="p-4 bg-green-500/20 text-green-200 rounded-xl text-center font-bold">
                    Thank you! Your review has been posted successfully.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-offwhite/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Get In <span className="text-navy">Touch</span>
          </h2>
          <p className="text-darkgray text-lg text-center mb-12">Have questions? Contact us directly!</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <a href="tel:+923152267416" className="block bg-offwhite border-2 border-navy p-6 rounded-xl hover:bg-offwhite/50 transition">
                <Phone className="w-10 h-10 text-navy mb-4" />
                <h3 className="text-navy font-bold text-lg mb-2">Call Us</h3>
                <p className="text-darkgray/90">+92 315 2267416</p>
              </a>
              <a href="https://wa.me/923350277160" target="_blank" rel="noopener noreferrer" className="block bg-offwhite border-2 border-navy p-6 rounded-xl hover:bg-offwhite/50 transition">
                <MessageCircle className="w-10 h-10 text-navy mb-4" />
                <h3 className="text-navy font-bold text-lg mb-2">WhatsApp</h3>
                <p className="text-darkgray/90">+92 335 0277160</p>
              </a>
            </div>
            <div className="bg-offwhite border-2 border-navy p-8 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="_honeypot" style={{ display: 'none' }} />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="firstName" placeholder="First Name" className="px-4 py-3 rounded-lg border-2 border-navy/10 focus:border-navy focus:outline-none" required />
                  <input type="text" name="lastName" placeholder="Last Name" className="px-4 py-3 rounded-lg border-2 border-navy/10 focus:border-navy focus:outline-none" required />
                </div>
                <input type="email" name="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg border-2 border-navy/10 focus:border-navy focus:outline-none" required />
                <select name="course" className="w-full px-4 py-3 rounded-lg border-2 border-navy/10 focus:border-navy focus:outline-none" required>
                  <option value="">Select Course</option>
                  {courses.map((c, i) => <option key={i} value={c.value}>{c.title}</option>)}
                </select>
                <input type="tel" name="phone" placeholder="Phone" className="w-full px-4 py-3 rounded-lg border-2 border-navy/10 focus:border-navy focus:outline-none" required />
                <textarea name="message" placeholder="Message" rows="4" className="w-full px-4 py-3 rounded-lg border-2 border-navy/10 focus:border-navy focus:outline-none resize-none"></textarea>
                <button
                  type="submit"
                  disabled={formStatus.submitting}
                  className="w-full bg-navy text-white py-4 rounded-lg font-bold text-lg shadow-xl hover:bg-navy/90 transition disabled:opacity-50"
                >
                  {formStatus.submitting ? 'Sending...' : 'Send Message'}
                </button>

                {formStatus.success && (
                  <div className="p-4 bg-green-100 text-green-700 rounded-lg text-center font-bold">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}
                {formStatus.error && (
                  <div className="p-4 bg-red-100 text-red-700 rounded-lg text-center font-bold">
                    Error: {formStatus.error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

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
                <a href="https://www.facebook.com/share/1QTAHW4p7t/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-darkgray/90 hover:bg-blue-600 rounded-full flex items-center justify-center"><Facebook className="w-5 h-5" /></a>
                <a href="https://www.instagram.com/almaasonlinequranacademy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-darkgray/90 hover:bg-pink-600 rounded-full flex items-center justify-center"><Instagram className="w-5 h-5" /></a>
                <a href="https://youtube.com/@hafizraheelshah" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-darkgray/90 hover:bg-red-600 rounded-full flex items-center justify-center"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <button onClick={() => navigateTo('home')} className="block hover:text-white">Home</button>
                <button onClick={() => navigateTo('courses')} className="block hover:text-white">Courses</button>
                <button onClick={() => navigateTo('pricing')} className="block hover:text-white">Pricing</button>
                <button onClick={() => navigateTo('reviews')} className="block hover:text-white">Reviews</button>
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
    </div>
  );
};

export default AlmaasQuranAcademy;
