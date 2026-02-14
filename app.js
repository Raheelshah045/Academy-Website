
const { Menu, X, Phone, Clock, Users, Award, BookOpen, Star, CheckCircle, ChevronRight, MessageCircle, Globe, Shield, CreditCard, UserPlus, Newspaper, ChevronDown, Facebook, Instagram, Youtube, ArrowLeft } = lucide;

const AlmaasQuranAcademy = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [activeFaq, setActiveFaq] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [counts, setCounts] = useState({ teachers: 0 });
  const [currentTagline, setCurrentTagline] = useState(0);

  const taglines = [
    "Learn Quran From Home",
    "Master Tajweed Online",
    "Memorize Quran with Expert Teachers",
    "Understand Quran with Translation"
  ];

  useEffect(() => {
    const taglineInterval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3500);
    return () => clearInterval(taglineInterval);
  }, [taglines.length]);

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
    const targets = { teachers: 50 };
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

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', course: '', plan: '', phone: '', message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format the message for WhatsApp
    const whatsappMessage = `
ðŸŒŸ *New Student Registration - Almaas Online Quran Academy* ðŸŒŸ

ðŸ‘¤ *Student Name:* ${formData.firstName} ${formData.lastName}
ðŸ“§ *Email:* ${formData.email}
ðŸ“± *Phone:* ${formData.phone}
ðŸ“š *Course:* ${formData.course}
${formData.message ? `ðŸ’¬ *Message:* ${formData.message}` : ''}

---
*Submitted from Almaas Academy Website*
    `.trim();

    // Your WhatsApp number (from the contact section)
    const whatsappNumber = '923350277160';

    // Create WhatsApp URL with pre-filled message
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');

    // Show success message
    alert('Redirecting to WhatsApp! Please send the message to complete your registration.');

    // Reset form and close popup
    setFormData({ firstName: '', lastName: '', email: '', course: '', plan: '', phone: '', message: '' });
    setShowPopup(false);
  };

  const LogoImage = ({ className = "h-16 w-16" }) => (
    <img
      src="./logo.png"
      alt="Almaas Logo"
      className={`${className} object-contain`}
      onError={(e) => {
        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%231e3a8a' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='20' fill='white' text-anchor='middle' dy='.3em'%3EALMAAS%3C/text%3E%3C/svg%3E";
      }}
    />
  );

  const coursesDetailed = [
    {
      title: "Qaida for Beginners",
      shortDesc: "A foundational course designed to help beginners learn the Arabic alphabet, basic pronunciation, and the rules of Quranic reading step by step, with clarity and ease.",
      fullDesc: "This foundational course is designed for beginners who are starting their Quran learning journey from the very beginning. Students learn Arabic letters, correct pronunciation, and letter formation in a simple, step-by-step manner. Special focus is given to clarity, repetition, and individual attention so learners build confidence before moving on to Quran reading. This course is suitable for children, adults, and new learners with no prior Arabic background.",
      image: "./Quaida.jpg",
      whatYouLearn: [
        "Arabic alphabet (Huroof-e-Hijai)",
        "Correct pronunciation and articulation",
        "Joining letters and basic reading rules",
        "Practice with teacher supervision",
        "Strong base for Quran reading"
      ],
      duration: "2 â€“ 3 Months",
      level: "Beginner",
      summary: "A perfect starting point for learning Arabic letters and pronunciation. Builds a strong foundation for smooth Quran reading.",
      cta: "Enroll Now and begin your Quran journey from the basics"
    },
    {
      title: "Quran Reading",
      shortDesc: "A guided course designed to help learners read the Holy Quran fluently, focusing on correct pronunciation, smooth recitation, and building confidence in every verse.",
      fullDesc: "This course helps students read the Holy Quran fluently and confidently with correct pronunciation. Learners are guided step by step to improve flow, accuracy, and consistency in recitation. Teachers focus on correcting mistakes and strengthening reading skills through regular practice. Ideal for students who can read basic Arabic and want to improve Quran recitation.",
      image: "./Quran.jpg",
      whatYouLearn: [
        "Fluent Quran reading",
        "Correct pronunciation of words",
        "Smooth recitation without hesitation",
        "Correction of common mistakes",
        "Confidence in reading aloud"
      ],
      duration: "3 â€“ 6 Months",
      level: "Beginner to Intermediate",
      summary: "Improve your Quran reading with clarity and confidence. A guided course for smooth and correct recitation.",
      cta: "Enroll Now and start reading the Quran with confidence"
    },
    {
      title: "Quran Memorization",
      shortDesc: "A structured course that helps students memorize the Holy Quran with accuracy, daily revision plans, and expert guidance to retain and recite confidently.",
      fullDesc: "This structured course is designed to help students memorize the Holy Quran accurately and effectively. A disciplined system of daily lessons, revision plans, and continuous supervision ensures strong memorization and retention. Emphasis is placed on Tajweed and correct recitation. Suitable for children and adults aspiring to become Hafiz or Hafiza.",
      image: "./Quran2.png",
      whatYouLearn: [
        "Systematic Quran memorization",
        "Daily lesson and revision planning",
        "Strong retention techniques",
        "Tajweed during memorization",
        "Confident recitation from memory"
      ],
      duration: "Flexible (1â€“3 Years)",
      level: "Intermediate to Advanced",
      summary: "A complete and structured Hifz program. Focuses on accuracy, revision, and long-term retention.",
      cta: "Enroll Now and begin your journey to become a Hafiz/Hafiza"
    },
    {
      title: "Quran Translation",
      shortDesc: "A comprehensive course designed to help learners understand the meanings of Quranic verses through clear, word-by-word translation and spiritual reflection.",
      fullDesc: "This course helps learners understand the meanings of the Holy Quran through clear and easy word-by-word translation. Students develop an understanding of Quranic vocabulary and sentence structure while reflecting on the message of Allah. Ideal for learners who want to move beyond recitation and understand the Quran deeply.",
      image: "./translation.jpg",
      whatYouLearn: [
        "Word-by-word Quran translation",
        "Quranic vocabulary",
        "Understanding verse meanings",
        "Spiritual reflection",
        "Practical life lessons from Quran"
      ],
      duration: "6 â€“ 9 Months",
      level: "Intermediate",
      summary: "Understand the Quran beyond recitation. Learn meanings that guide daily life.",
      cta: "Enroll Now and understand the Quran deeply"
    },
    {
      title: "Tafseer ul Quran",
      shortDesc: "An in-depth course that explores the meanings, context, and wisdom behind Quranic verses helping learners connect deeply with the message of the Holy Quran.",
      fullDesc: "This advanced course provides detailed explanations of Quranic verses, including historical background, context, and wisdom. Students learn how Quranic teachings apply to real life and develop a deeper connection with Allah's message through authentic Tafseer.",
      image: "./Tafseer.jpg",
      whatYouLearn: [
        "Detailed explanation of Quranic verses",
        "Shan-e-Nuzool (background of revelation)",
        "Quranic themes and wisdom",
        "Practical guidance for daily life",
        "Deep spiritual understanding"
      ],
      duration: "9 â€“ 12 Months",
      level: "Advanced",
      summary: "Explore the deeper meanings of the Quran. Strengthen faith through understanding Allah's message.",
      cta: "Enroll Now and explore the deeper meanings of the Quran"
    },
    {
      title: "Arabic Language",
      shortDesc: "A beginner-friendly course that builds a strong foundation in reading, writing, and understanding Arabic essential for deeper Quranic comprehension and daily use.",
      fullDesc: "This beginner-friendly Arabic language course builds a strong foundation in reading, writing, and understanding Arabic. Lessons are designed in a simple and practical way to help learners understand the Quran and use Arabic in daily Islamic life.",
      image: "./arabic.jpg",
      whatYouLearn: [
        "Arabic reading and writing",
        "Basic grammar rules",
        "Essential vocabulary",
        "Sentence formation",
        "Improved Quran understanding"
      ],
      duration: "6 â€“ 12 Months",
      level: "Beginner to Intermediate",
      summary: "Learn Arabic from scratch with ease. Enhance Quran understanding through language.",
      cta: "Enroll Now and start learning Arabic step by step"
    },
    {
      title: "New Muslim",
      shortDesc: "A supportive course tailored for new Muslims, covering the basics of Islam, daily prayers, Quran reading, and essential beliefs to help start your spiritual journey.",
      fullDesc: "This supportive course is designed for new Muslims to learn Islam in a clear, simple, and welcoming way. It covers essential beliefs, worship, and daily Islamic practices to help new Muslims feel confident and comfortable in their faith.",
      image: "./muslim.jpg",
      whatYouLearn: [
        "Basic Islamic beliefs",
        "How to pray Salah",
        "Quran reading basics",
        "Daily Islamic practices",
        "Living Islam confidently"
      ],
      duration: "2 â€“ 4 Months",
      level: "Beginner",
      summary: "A complete beginner guide for new Muslims. Learn Islam step by step with confidence.",
      cta: "Enroll Now and start your Islamic journey with confidence"
    },
    {
      title: "Seerat un Nabi",
      shortDesc: "A heart-touching course that explores the life, character, and teachings of Prophet Muhammad (P.B.U.H), offering guidance and inspiration for everyday life.",
      fullDesc: "This course explores the blessed life of Prophet Muhammad ï·º, highlighting his character, teachings, and struggles. Students learn practical lessons from Seerah that guide moral conduct and daily life while developing love for the Prophet ï·º.",
      image: "./seeratunnabi.jpg",
      whatYouLearn: [
        "Life of Prophet Muhammad ï·º",
        "His character and manners",
        "Key Seerah events",
        "Moral and spiritual lessons",
        "Practical guidance for life"
      ],
      duration: "3 â€“ 5 Months",
      level: "Beginner to Intermediate",
      summary: "Learn from the life of the Prophet ï·º. A source of guidance and inspiration.",
      cta: "Enroll Now and learn from the life of the Prophet ï·º"
    },
    {
      title: "Tajweed and Tarteel",
      shortDesc: "A detailed course focused on perfecting Quranic pronunciation (Tajweed) and reciting with rhythm and beauty (Tarteel), following the rules of proper recitation.",
      fullDesc: "This course focuses on perfecting Quran recitation by teaching Tajweed rules and the beauty of Tarteel. Students learn correct pronunciation, articulation points, and rhythmic recitation to recite the Quran as it was revealed.",
      image: "./tajweed&tarteel.jpg",
      whatYouLearn: [
        "Rules of Tajweed",
        "Makharij and letter characteristics",
        "Correct pronunciation",
        "Beautiful recitation style",
        "Confidence in reciting aloud"
      ],
      duration: "4 â€“ 6 Months",
      level: "Intermediate to Advanced",
      summary: "Perfect your Quran recitation. Recite with accuracy, beauty, and confidence.",
      cta: "Enroll Now and beautify your Quran recitation"
    },
    {
      title: "Dars e Nizami",
      shortDesc: "A traditional Islamic studies course covering core subjects like Fiqh, Hadith, Tafseer, and Arabic grammar designed to build strong scholarly foundations.",
      fullDesc: "Dars-e-Nizami is a traditional Islamic studies program covering major Islamic sciences. It is designed for serious students seeking scholarly knowledge in Fiqh, Hadith, Tafseer, and Arabic grammar.",
      image: "./darsenizami.jpg",
      whatYouLearn: [
        "Fiqh and Islamic rulings",
        "Hadith studies",
        "Tafseer methodology",
        "Arabic grammar (Nahw & Sarf)",
        "Scholarly Islamic foundation"
      ],
      duration: "5 â€“ 8 Years",
      level: "Advanced",
      summary: "A complete path to Islamic scholarship. Build deep knowledge of Islamic sciences.",
      cta: "Enroll Now and begin your scholarly Islamic journey"
    },
    {
      title: "Short Shariah",
      shortDesc: "A concise course introducing the basic principles of Islamic law, covering daily practices, ethics, and worship according to the teachings of the Quran and Sunnah.",
      fullDesc: "This concise course introduces the basic principles of Islamic law in a simple and practical way. It focuses on daily worship, ethics, and personal responsibilities according to Quran and Sunnah.",
      image: "./shortshariah.jpg",
      whatYouLearn: [
        "Basic Shariah principles",
        "Halal and Haram rules",
        "Daily Islamic practices",
        "Ethics and manners",
        "Living by Sunnah"
      ],
      duration: "1 â€“ 2 Months",
      level: "Beginner",
      summary: "Simple and practical Shariah learning. Guidance for everyday Islamic life.",
      cta: "Enroll Now and learn Shariah for daily life"
    },
    {
      title: "Farz-e-Uloom",
      shortDesc: "An essential course covering the basic Islamic knowledge every Muslim must know like beliefs, prayer, purification, and daily obligations in light of the Shariah.",
      fullDesc: "This essential course covers the basic Islamic knowledge that every Muslim must know. It explains beliefs, worship, and obligations clearly to ensure correct practice in daily life.",
      image: "./farzululoom.png",
      whatYouLearn: [
        "Basic Islamic beliefs",
        "Purification and cleanliness",
        "Correct method of Salah",
        "Fasting and obligations",
        "Essential daily rulings"
      ],
      duration: "2 â€“ 3 Months",
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
    { name: "2 Days/Week", price: "$40", features: ["2 classes/week", "30 min each", "One-on-One"] },
    { name: "3 Days/Week", price: "$55", popular: true, features: ["3 classes/week", "30 min each", "Weekly reports"] },
    { name: "5 Days/Week", price: "$85", features: ["5 classes/week", "30 min each", "Priority support"] }
  ];

  const faqs = [
    { q: "How do I register?", a: "Fill out our form or click 'Start Free Trial'. We'll contact you within 24 hours." },
    { q: "What are class timings?", a: "We offer flexible timings 24/7 according to your schedule." },
    { q: "Free trial classes?", a: "Yes! We offer 3 FREE demo classes before enrollment." }
  ];

  const blogs = [
    { id: 1, title: "10 Benefits of Learning Quran Online", date: "Feb 1, 2026", excerpt: "Discover advantages of online Quran education..." },
    { id: 2, title: "How to Improve Your Tajweed", date: "Jan 28, 2026", excerpt: "Expert tips to master Tajweed rules..." },
    { id: 3, title: "Memorizing Quran: Complete Guide", date: "Jan 25, 2026", excerpt: "Step-by-step strategies for memorization..." }
  ];

  if (currentPage === 'courses') {
    return (
      <div className="min-h-screen bg-white">
        <button onClick={() => navigateTo('home')} className="fixed top-4 left-4 z-50 bg-blue-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg hover:bg-blue-800 transition">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <div className="pt-24 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-blue-900 mb-4 text-center">Our Courses</h1>
            <p className="text-slate-700 text-base md:text-lg text-center mb-8 md:mb-12 px-4">Explore our comprehensive Islamic education programs</p>
            <div className="space-y-6 md:space-y-8">
              {coursesDetailed.map((course, idx) => (
                <div key={idx} className="bg-white border-2 border-blue-200 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition">
                  <div className="md:flex">
                    <div className="md:w-1/3 h-48 md:h-auto">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <h2 className="text-2xl md:text-3xl font-black text-blue-900 mb-3 md:mb-0">{course.title}</h2>
                        <div className="text-left md:text-right">
                          <div className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-bold mb-2">
                            {course.level}
                          </div>
                          <div className="text-slate-600 text-sm flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {course.duration}
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-700 text-sm md:text-base mb-4 md:mb-6 leading-relaxed">{course.fullDesc}</p>
                      <div className="mb-4 md:mb-6">
                        <h3 className="text-base md:text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" /> What You Will Learn:
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {course.whatYouLearn.map((item, i) => (
                            <li key={i} className="flex items-start text-sm md:text-base text-slate-700">
                              <span className="text-blue-900 mr-2">âœ“</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-blue-50 border-l-4 border-blue-900 p-4 mb-4 md:mb-6">
                        <p className="text-slate-800 text-sm md:text-base italic">{course.summary}</p>
                      </div>
                      <button
                        onClick={() => { setShowPopup(true); navigateTo('home'); }}
                        className="w-full md:w-auto bg-gradient-to-r from-blue-900 to-blue-800 text-white py-3 px-6 md:px-8 rounded-xl text-sm md:text-base font-bold hover:from-blue-800 hover:to-blue-700 transition shadow-lg flex items-center justify-center gap-2"
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
      <div className="min-h-screen bg-white">
        <button onClick={() => navigateTo('home')} className="fixed top-4 left-4 z-50 bg-blue-900 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg flex items-center gap-2 text-sm md:text-base">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="pt-24 pb-12 md:pb-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-blue-900 mb-6 md:mb-8 text-center">Pricing Plans</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {pricingPlans.map((plan, idx) => (
                <div key={idx} className={`rounded-2xl p-6 md:p-8 ${plan.popular ? 'bg-blue-900 text-white md:scale-105' : 'bg-white border-2 border-blue-200 text-slate-900'}`}>
                  {plan.popular && <span className="bg-white text-blue-900 px-3 py-1 rounded-full text-xs font-bold">Popular</span>}
                  <h3 className="text-xl md:text-2xl font-black mt-4">{plan.name}</h3>
                  <div className="text-4xl md:text-5xl font-black my-4">{plan.price}<span className="text-sm">/mo</span></div>
                  <ul className="space-y-3 mb-6 md:mb-8">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center text-sm md:text-base"><CheckCircle className="w-5 h-5 mr-2" />{f}</li>
                    ))}
                  </ul>
                  <button onClick={() => setShowPopup(true)} className={`w-full py-3 rounded-lg font-bold text-sm md:text-base ${plan.popular ? 'bg-white text-blue-900' : 'bg-blue-900 text-white'}`}>Choose Plan</button>
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
      <div className="min-h-screen bg-white">
        <button onClick={() => navigateTo('home')} className="fixed top-4 left-4 z-50 bg-blue-900 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg flex items-center gap-2 text-sm md:text-base">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="pt-24 pb-12 md:pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-blue-900 mb-6 md:mb-8 text-center">FAQs</h1>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white border-2 border-blue-200 rounded-xl md:rounded-2xl overflow-hidden">
                  <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full p-4 md:p-6 text-left flex justify-between items-center">
                    <span className="text-blue-900 font-bold text-base md:text-lg pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 md:w-6 md:h-6 text-blue-900 transition flex-shrink-0 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === idx && <div className="px-4 md:px-6 pb-4 md:pb-6"><p className="text-slate-700 text-sm md:text-base">{faq.a}</p></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'blogs') {
    return (
      <div className="min-h-screen bg-white">
        <button onClick={() => navigateTo('home')} className="fixed top-4 left-4 z-50 bg-blue-900 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg flex items-center gap-2 text-sm md:text-base">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="pt-24 pb-12 md:pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-blue-900 mb-6 md:mb-8 text-center">Latest Articles</h1>
            {blogs.map((blog) => (
              <article key={blog.id} className="bg-white border-2 border-blue-200 rounded-xl md:rounded-2xl p-6 md:p-8 mb-4 md:mb-6">
                <Newspaper className="w-6 h-6 md:w-8 md:h-8 text-blue-900 mb-4" />
                <p className="text-xs md:text-sm text-blue-700 font-semibold mb-2">{blog.date}</p>
                <h2 className="text-2xl md:text-3xl font-black text-blue-900 mb-3 md:mb-4">{blog.title}</h2>
                <p className="text-slate-700 text-sm md:text-base mb-4">{blog.excerpt}</p>
                <button className="bg-blue-900 text-white px-4 md:px-6 py-2 rounded-lg text-sm md:text-base font-bold">Read More</button>
              </article>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'contact') {
    return (
      <div className="min-h-screen bg-white">
        <button onClick={() => navigateTo('home')} className="fixed top-4 left-4 z-50 bg-blue-900 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg flex items-center gap-2 text-sm md:text-base">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="pt-24 pb-12 md:pb-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-blue-900 mb-6 md:mb-8 text-center">Contact Us</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-4 md:space-y-6">
                <div className="bg-blue-50 border-2 border-blue-900 p-6 rounded-xl">
                  <Phone className="w-8 h-8 md:w-10 md:h-10 text-blue-900 mb-4" />
                  <h3 className="text-blue-900 font-bold text-base md:text-lg mb-2">Call Us</h3>
                  <p className="text-slate-800 text-sm md:text-base">+92 315 2267416</p>
                </div>
                <div className="bg-blue-50 border-2 border-blue-900 p-6 rounded-xl">
                  <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-blue-900 mb-4" />
                  <h3 className="text-blue-900 font-bold text-base md:text-lg mb-2">WhatsApp</h3>
                  <p className="text-slate-800 text-sm md:text-base">+92 335 0277160</p>
                </div>
              </div>
              <div className="bg-blue-50 border-2 border-blue-900 p-6 md:p-8 rounded-2xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" placeholder="First Name" className="w-full px-4 py-2 md:py-3 text-sm md:text-base rounded-lg border-2 border-blue-900" required />
                  <input type="email" placeholder="Email" className="w-full px-4 py-2 md:py-3 text-sm md:text-base rounded-lg border-2 border-blue-900" required />
                  <textarea placeholder="Message" rows="4" className="w-full px-4 py-2 md:py-3 text-sm md:text-base rounded-lg border-2 border-blue-900" required></textarea>
                  <button type="submit" className="w-full bg-blue-900 text-white py-3 md:py-4 text-sm md:text-base rounded-lg font-bold">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <a href="https://wa.me/923350277160" target="_blank" rel="noopener noreferrer" className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 md:p-4 rounded-full shadow-2xl">
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
      </a>

      {showChat && (
        <div className="fixed bottom-20 md:bottom-24 right-4 md:right-6 z-50 bg-white rounded-2xl shadow-2xl w-72 md:w-80 border-2 border-blue-900">
          <div className="bg-blue-900 p-4 rounded-t-2xl flex justify-between items-center">
            <h3 className="text-white font-bold text-sm md:text-base">Chat with us!</h3>
            <button onClick={() => setShowChat(false)} className="text-white"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-4 h-64 bg-gray-50">
            <div className="bg-blue-100 p-3 rounded-lg"><p className="text-sm text-slate-800">Hello! How can we help?</p></div>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-sm md:max-w-md w-full relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowPopup(false)} className="absolute top-4 right-4 text-white"><X className="w-5 h-5 md:w-6 md:h-6" /></button>
            <div className="text-white text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-black mb-2">3 Days</h2>
              <p className="text-xl md:text-2xl font-bold">Free Trail Class</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60"
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60"
                required
              />
              <select
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-lg bg-white/10 border border-white/20 text-white"
                required
              >
                <option value="" className="text-gray-900">Select Course</option>
                {courses.map((c, i) => <option key={i} value={c.value} className="text-gray-900">{c.title}</option>)}
              </select>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Message (Optional)"
                rows="3"
                className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 resize-none"
              ></textarea>
              <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 py-3 md:py-4 text-sm md:text-base rounded-lg font-bold">Submit Form</button>
            </form>
          </div>
        </div>
      )}

      <header className={`fixed w-full top-0 z-40 transition ${scrolled ? 'bg-white shadow-lg' : 'bg-white/95'}`}>
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <LogoImage className="h-12 w-12 md:h-16 md:w-16" />
              <div>
                <h1 className="text-base md:text-xl font-bold text-blue-900">ALMAAS ONLINE</h1>
                <p className="text-xs md:text-sm text-slate-700 font-medium">QURAN ACADEMY</p>
              </div>
            </div>
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              <button onClick={() => navigateTo('home')} className="text-slate-700 hover:text-blue-900 font-medium">Home</button>
              <button onClick={() => navigateTo('courses')} className="text-slate-700 hover:text-blue-900 font-medium">Courses</button>
              <button onClick={() => navigateTo('pricing')} className="text-slate-700 hover:text-blue-900 font-medium">Pricing</button>
              <button onClick={() => navigateTo('blogs')} className="text-slate-700 hover:text-blue-900 font-medium">Blogs</button>
              <button onClick={() => navigateTo('faq')} className="text-slate-700 hover:text-blue-900 font-medium">FAQ</button>
              <button onClick={() => navigateTo('contact')} className="text-slate-700 hover:text-blue-900 font-medium">Contact</button>
              <button onClick={() => setShowPopup(true)} className="bg-blue-900 text-white px-4 xl:px-6 py-2 xl:py-2.5 rounded-lg font-bold text-sm">Start Free Trial</button>
            </nav>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-blue-900 p-2">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {menuOpen && (
            <div className="lg:hidden mt-4 pb-4 bg-blue-50 rounded-xl border-2 border-blue-900">
              <div className="flex flex-col gap-2 p-4">
                <button onClick={() => navigateTo('home')} className="text-slate-700 hover:text-blue-900 py-3 px-4 rounded-lg text-left font-medium">Home</button>
                <button onClick={() => navigateTo('courses')} className="text-slate-700 hover:text-blue-900 py-3 px-4 rounded-lg text-left font-medium">Courses</button>
                <button onClick={() => navigateTo('pricing')} className="text-slate-700 hover:text-blue-900 py-3 px-4 rounded-lg text-left font-medium">Pricing</button>
                <button onClick={() => navigateTo('blogs')} className="text-slate-700 hover:text-blue-900 py-3 px-4 rounded-lg text-left font-medium">Blogs</button>
                <button onClick={() => navigateTo('faq')} className="text-slate-700 hover:text-blue-900 py-3 px-4 rounded-lg text-left font-medium">FAQ</button>
                <button onClick={() => navigateTo('contact')} className="text-slate-700 hover:text-blue-900 py-3 px-4 rounded-lg text-left font-medium">Contact</button>
                <button onClick={() => setShowPopup(true)} className="bg-blue-900 text-white px-6 py-3 rounded-lg font-bold mt-2">Start Free Trial</button>
              </div>
            </div>
          )}
        </div>
      </header>

      <section id="home" className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 md:mb-12">
            <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4" style={{ fontFamily: "'Scheherazade New', 'Noto Naskh Arabic', 'Traditional Arabic', 'Amiri', serif", fontWeight: 700, color: '#1e3a8a', lineHeight: 1.8, letterSpacing: '0.02em' }}>
              Ø¨ÙØ³Ù’Ù…Ù Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù Ø§Ù„Ø±ÙŽÙ‘Ø­Ù’Ù…ÙŽÙ€Ù°Ù†Ù Ø§Ù„Ø±ÙŽÙ‘Ø­ÙÙŠÙ…Ù
            </p>
            <p className="text-xs md:text-sm lg:text-base text-slate-700 font-semibold px-4">In the name of Allah, the Most Gracious, the Most Merciful</p>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-4 md:mb-6">
            <div className="overflow-hidden h-12 sm:h-14 md:h-16 lg:h-20 relative mb-3 md:mb-4">
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
                  <span className="text-blue-900 block px-4">{tagline}</span>
                </div>
              ))}
            </div>
            <span className="text-blue-800 block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-3 md:mb-4">With</span>
            <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl px-2">
              Almaas Online Quran Academy
            </span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-blue-900 mb-3 md:mb-4 font-bold max-w-3xl mx-auto px-4">
            One-on-one and group classes are available for kids and adults.
          </p>

          <p className="text-sm md:text-base text-slate-700 mb-6 md:mb-8 font-medium max-w-3xl mx-auto px-4">
            Expert teachers â€¢ Flexible timings â€¢ Affordable pricing â€¢ 24/7 availability
          </p>

          <button onClick={() => setShowPopup(true)} className="bg-blue-900 hover:bg-blue-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-sm md:text-base lg:text-lg inline-flex items-center gap-2 shadow-xl">
            Get 3 FREE Demo Classes <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          <div className="mt-8 md:mt-12 flex items-center justify-center gap-2 md:gap-3 bg-green-50 border-2 border-green-600 px-4 md:px-6 py-3 rounded-xl max-w-xs md:max-w-md mx-auto">
            <Shield className="w-6 h-6 md:w-8 md:h-8 text-green-600 flex-shrink-0" />
            <div className="text-left">
              <p className="text-slate-900 font-bold text-sm md:text-base">7-Day Money-Back Guarantee</p>
              <p className="text-green-700 text-xs md:text-sm font-semibold">100% Risk-Free Trial</p>
            </div>
          </div>

          <div className="mt-6 md:mt-8 bg-white border-2 border-blue-200 px-4 md:px-6 py-3 md:py-4 rounded-xl max-w-md md:max-w-2xl mx-auto">
            <p className="text-slate-700 text-xs md:text-sm mb-2 md:mb-3 font-semibold">We Accept:</p>
            <div className="flex gap-3 md:gap-4 items-center justify-center flex-wrap">
              <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-blue-900" />
              <span className="text-slate-800 font-bold text-sm md:text-base">Visa</span>
              <span className="text-slate-800 font-bold text-sm md:text-base">Mastercard</span>
              <span className="text-slate-800 font-bold text-sm md:text-base">PayPal</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-4 mt-6 md:mt-8 max-w-md md:max-w-2xl mx-auto">
            {[
              { num: `${counts.teachers}+`, label: "Teachers" },
              { num: "ðŸŒ", label: "Worldwide" },
              { num: "24/7", label: "Available" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white border-2 border-blue-200 hover:border-blue-900 p-3 md:p-4 rounded-xl transition">
                <div className="text-2xl md:text-3xl font-black text-blue-900">{stat.num}</div>
                <div className="text-xs md:text-sm text-blue-800 font-bold mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-center mb-3 md:mb-4">
            Why Choose <span className="text-blue-900">Almaas Academy</span>
          </h2>
          <p className="text-slate-700 text-base md:text-lg text-center mb-8 md:mb-12 px-4">What makes us different from others</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                <div key={idx} className="bg-blue-50 border-2 border-blue-200 hover:border-blue-900 p-5 md:p-6 rounded-2xl transition">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-900 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-2 md:mb-3">{item.title}</h3>
                  <p className="text-slate-700 text-sm md:text-base">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-center mb-3 md:mb-4">
            How It <span className="text-blue-900">Works</span>
          </h2>
          <p className="text-slate-700 text-base md:text-lg text-center mb-8 md:mb-12 px-4">Get started in 4 simple steps</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {[
              { num: "1", title: "Register Free", desc: "Fill form and book free demo classes", icon: UserPlus },
              { num: "2", title: "Choose Course", desc: "Select course matching your goals", icon: BookOpen },
              { num: "3", title: "Schedule Class", desc: "Pick convenient time with teacher", icon: Clock },
              { num: "4", title: "Start Learning", desc: "Begin Quran learning journey", icon: Star }
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="bg-white border-2 border-blue-900 p-4 md:p-6 rounded-2xl text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-900 rounded-full flex items-center justify-center text-white text-xl md:text-2xl font-black mx-auto mb-3 md:mb-4">{step.num}</div>
                  <Icon className="w-10 h-10 md:w-12 md:h-12 text-blue-900 mx-auto mb-3 md:mb-4" />
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-blue-900 mb-2 md:mb-3">{step.title}</h3>
                  <p className="text-slate-700 text-xs md:text-sm">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-center mb-3 md:mb-4">
            We Are <span className="text-blue-900">Offering</span>
          </h2>
          <p className="text-slate-700 text-base md:text-lg text-center mb-8 md:mb-12 px-4">Comprehensive features for effective learning</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Clock, title: "Flexibility of Time", desc: "Classes 24/7 according to your convenience" },
              { icon: Users, title: "Weekend Classes", desc: "Special weekend batches available" },
              { icon: Award, title: "3 Demo Classes", desc: "Try 3 free classes before enrollment" },
              { icon: Globe, title: "Easily Accessible", desc: "Learn from anywhere with internet" }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-blue-50 border-2 border-blue-200 hover:border-blue-900 p-4 md:p-6 rounded-2xl transition">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-900 rounded-xl flex items-center justify-center mb-3 md:mb-4">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-sm md:text-base lg:text-lg font-bold text-blue-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-700 text-xs md:text-sm">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-center mb-3 md:mb-4">
            Our <span className="text-blue-900">Courses</span>
          </h2>
          <p className="text-slate-700 text-base md:text-lg text-center mb-8 md:mb-12 px-4">Comprehensive Quran learning programs</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {coursesDetailed.map((course, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 border-white hover:scale-105 transition-transform">
                <div className="h-40 md:h-48 overflow-hidden relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent"></div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-xl md:text-2xl font-black text-yellow-400 mb-3 md:mb-4">{course.title}</h3>
                  <p className="text-white text-xs md:text-sm mb-4 md:mb-6 leading-relaxed line-clamp-2 md:line-clamp-3">{course.shortDesc}</p>
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                    <button
                      onClick={() => setShowPopup(true)}
                      className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-blue-900 py-2 md:py-3 px-3 md:px-4 rounded-xl text-sm md:text-base font-bold transition shadow-lg"
                    >
                      Start Now
                    </button>
                    <button
                      onClick={() => navigateTo('courses')}
                      className="flex-1 bg-white hover:bg-gray-100 text-blue-900 py-2 md:py-3 px-3 md:px-4 rounded-xl text-sm md:text-base font-bold transition shadow-lg"
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

      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-center mb-3 md:mb-4">
            Affordable <span className="text-blue-900">Pricing</span>
          </h2>
          <p className="text-slate-700 text-base md:text-lg text-center mb-8 md:mb-12 px-4">Choose the plan that fits your schedule</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <div key={idx} className={`rounded-2xl p-6 md:p-8 transition ${plan.popular ? 'bg-blue-900 text-white md:scale-105 shadow-2xl' : 'bg-white border-2 border-blue-200 text-slate-900'}`}>
                {plan.popular && <span className="bg-white text-blue-900 px-3 py-1 rounded-full text-xs font-bold">Most Popular</span>}
                <h3 className="text-xl md:text-2xl font-black mt-4 mb-2">{plan.name}</h3>
                <div className="mb-4 md:mb-6"><span className="text-4xl md:text-5xl font-black">{plan.price}</span><span className="text-sm">/month</span></div>
                <ul className="space-y-3 mb-6 md:mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center text-sm md:text-base">
                      <CheckCircle className={`w-5 h-5 mr-2 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-blue-900'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setShowPopup(true)} className={`w-full py-3 rounded-lg font-bold text-sm md:text-base transition ${plan.popular ? 'bg-white text-blue-900 hover:bg-gray-100' : 'bg-blue-900 text-white hover:bg-blue-800'}`}>
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-center mb-3 md:mb-4">
            Frequently Asked <span className="text-blue-900">Questions</span>
          </h2>
          <p className="text-slate-700 text-base md:text-lg text-center mb-8 md:mb-12 px-4">Find answers to common questions</p>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border-2 border-blue-200 rounded-xl md:rounded-2xl overflow-hidden">
                <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full p-4 md:p-6 text-left flex justify-between items-center hover:bg-blue-50 transition">
                  <span className="text-blue-900 font-bold text-base md:text-lg pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 md:w-6 md:h-6 text-blue-900 transition-transform flex-shrink-0 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && <div className="px-4 md:px-6 pb-4 md:pb-6"><p className="text-slate-700 text-sm md:text-base leading-relaxed">{faq.a}</p></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-center mb-3 md:mb-4">
            Latest <span className="text-blue-900">Articles</span>
          </h2>
          <p className="text-slate-700 text-base md:text-lg text-center mb-8 md:mb-12 px-4">Read our latest insights and tips</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogs.map((blog, idx) => (
              <div key={idx} className="bg-white border-2 border-blue-200 hover:border-blue-900 rounded-2xl overflow-hidden transition">
                <div className="h-40 md:h-48 bg-blue-900 flex items-center justify-center">
                  <Newspaper className="w-12 h-12 md:w-16 md:h-16 text-white opacity-50" />
                </div>
                <div className="p-4 md:p-6">
                  <p className="text-blue-900 text-xs md:text-sm mb-2 font-semibold">{blog.date}</p>
                  <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-2 md:mb-3">{blog.title}</h3>
                  <p className="text-slate-700 text-xs md:text-sm mb-3 md:mb-4">{blog.excerpt}</p>
                  <button onClick={() => navigateTo('blogs')} className="text-blue-900 font-bold flex items-center gap-2 text-sm md:text-base">
                    Read More <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 bg-blue-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-center mb-3 md:mb-4">
            Get In <span className="text-blue-900">Touch</span>
          </h2>
          <p className="text-slate-700 text-base md:text-lg text-center mb-8 md:mb-12 px-4">Have questions? Contact us directly!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4 md:space-y-6">
              <a href="tel:+923152267416" className="block bg-white border-2 border-blue-900 p-5 md:p-6 rounded-xl hover:bg-blue-50 transition">
                <Phone className="w-8 h-8 md:w-10 md:h-10 text-blue-900 mb-4" />
                <h3 className="text-blue-900 font-bold text-base md:text-lg mb-2">Call Us</h3>
                <p className="text-slate-800 text-sm md:text-base">+92 315 2267416</p>
              </a>
              <a href="https://wa.me/923350277160" target="_blank" rel="noopener noreferrer" className="block bg-white border-2 border-blue-900 p-5 md:p-6 rounded-xl hover:bg-blue-50 transition">
                <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-blue-900 mb-4" />
                <h3 className="text-blue-900 font-bold text-base md:text-lg mb-2">WhatsApp</h3>
                <p className="text-slate-800 text-sm md:text-base">+92 335 0277160</p>
              </a>
            </div>
            <div className="bg-white border-2 border-blue-900 p-6 md:p-8 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <input type="text" placeholder="First Name" className="px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-lg border-2 border-blue-200 focus:border-blue-900 focus:outline-none" required />
                  <input type="text" placeholder="Last Name" className="px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-lg border-2 border-blue-200 focus:border-blue-900 focus:outline-none" required />
                </div>
                <input type="email" placeholder="Email" className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-lg border-2 border-blue-200 focus:border-blue-900 focus:outline-none" required />
                <select className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-lg border-2 border-blue-200 focus:border-blue-900 focus:outline-none" required>
                  <option value="">Select Course</option>
                  {courses.map((c, i) => <option key={i} value={c.value}>{c.title}</option>)}
                </select>
                <input type="tel" placeholder="Phone" className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-lg border-2 border-blue-200 focus:border-blue-900 focus:outline-none" required />
                <textarea placeholder="Message" rows="4" className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-lg border-2 border-blue-200 focus:border-blue-900 focus:outline-none resize-none"></textarea>
                <button type="submit" className="w-full bg-blue-900 text-white py-3 md:py-4 text-sm md:text-base rounded-lg font-bold shadow-xl hover:bg-blue-800 transition">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-gray-400 py-8 md:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 md:gap-3 mb-4">
                <LogoImage className="h-10 w-10 md:h-12 md:w-12" />
                <div>
                  <div className="text-white font-bold text-sm md:text-base">ALMAAS ONLINE</div>
                  <div className="text-xs text-gray-500">QURAN ACADEMY</div>
                </div>
              </div>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/share/1QTAHW4p7t/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 bg-slate-800 hover:bg-blue-600 rounded-full flex items-center justify-center"><Facebook className="w-4 h-4 md:w-5 md:h-5" /></a>
                <a href="https://www.instagram.com/almaasonlinequranacademy" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 bg-slate-800 hover:bg-pink-600 rounded-full flex items-center justify-center"><Instagram className="w-4 h-4 md:w-5 md:h-5" /></a>
                <a href="https://youtube.com/@hafizraheelshah" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 bg-slate-800 hover:bg-red-600 rounded-full flex items-center justify-center"><Youtube className="w-4 h-4 md:w-5 md:h-5" /></a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm md:text-base">Quick Links</h4>
              <div className="space-y-2 text-xs md:text-sm">
                <button onClick={() => navigateTo('home')} className="block hover:text-white">Home</button>
                <button onClick={() => navigateTo('courses')} className="block hover:text-white">Courses</button>
                <button onClick={() => navigateTo('pricing')} className="block hover:text-white">Pricing</button>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm md:text-base">Legal</h4>
              <div className="space-y-2 text-xs md:text-sm">
                <button onClick={() => alert('Privacy Policy - Coming Soon')} className="block hover:text-white text-left">Privacy Policy</button>
                <button onClick={() => alert('Terms & Conditions - Coming Soon')} className="block hover:text-white text-left">Terms & Conditions</button>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm md:text-base">Contact</h4>
              <div className="space-y-2 text-xs md:text-sm">
                <p>ðŸ“ž +92 315 2267416</p>
                <p>ðŸ’¬ +92 335 0277160</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 md:pt-8 text-center text-xs md:text-sm">
            Â©Almaas Online Quran Academy.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AlmaasQuranAcademy;





const { useState, useEffect } = React;
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(AlmaasQuranAcademy));
