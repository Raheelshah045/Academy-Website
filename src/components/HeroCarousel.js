import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';

// ─── Slide Data (5 slides) ─────────────────────────────────────────────────────
const SLIDES = [
    {
        id: 1,
        image: '/images/hero-slide-1-student.webp',
        alt: 'A young Muslim student learning Quran online with a tablet – Almaas Online Quran Academy',
        label: 'For Every Child',
        heading: 'Leading Online Quran Academy\nfor Kids and Adults',
        subtext: 'One-on-one live classes for kids as young as 4. Patient, qualified teachers with structured, engaging lessons.',
        ctaPrimary: { text: 'Start Free Trial', action: 'popup' },
        ctaSecondary: { text: 'View Courses', action: 'courses' },
        lazy: false,
    },
    {
        id: 2,
        image: '/images/hero-slide-2-children.webp',
        alt: 'Happy Muslim children learning Quran together with tablets – Almaas Online Quran Academy',
        label: 'Growing With Quran',
        heading: 'Where Every Child\nGrows in Faith\n& Knowledge',
        subtext: 'Fun, structured classes that keep kids engaged. Qualified teachers for every age group, from 4 years and above.',
        ctaPrimary: { text: 'Enroll Your Child', action: 'popup' },
        ctaSecondary: { text: 'View Courses', action: 'courses' },
        lazy: true,
    },
    {
        id: 3,
        image: '/images/hero-slide-3-quran.webp',
        alt: 'Holy Quran resting on a wooden Rehal with soft golden light – spiritual online Quran learning',
        label: 'Connect With Quran',
        heading: 'Recite the Word of Allah\nWith Beauty & Precision',
        subtext: 'Master Tajweed. Memorize Quran. Understand its meaning. Begin your spiritual journey today.',
        ctaPrimary: { text: 'Get 3 Free Classes', action: 'popup' },
        ctaSecondary: { text: 'Our Courses', action: 'courses' },
        lazy: true,
    },
    {
        id: 4,
        image: '/images/hero-slide-4-family.webp',
        alt: 'A Muslim family learning Quran together online – Almaas Online Quran Academy',
        label: 'For the Whole Family',
        heading: 'Learn Together,\nGrow Together\nin Faith',
        subtext: 'Group and family packages available. Make Quran learning a beautiful family habit for kids and adults alike.',
        ctaPrimary: { text: 'Enroll Your Family', action: 'popup' },
        ctaSecondary: { text: 'View Pricing', action: 'pricing' },
        lazy: true,
    },
    {
        id: 5,
        image: '/images/hero-slide-5-calligraphy.webp',
        alt: 'Illuminated Islamic Quran manuscript with gold calligraphy – spiritual Quran education',
        label: 'Divine Knowledge',
        heading: 'Carry the Light of\nthe Quran in\nYour Heart',
        subtext: 'From Qaida to Hifz — every step of your Quran journey guided by expert teachers with love and sincerity.',
        ctaPrimary: { text: 'Start Learning Today', action: 'popup' },
        ctaSecondary: { text: 'Explore Courses', action: 'courses' },
        lazy: true,
    },
    {
        id: 6,
        image: '/images/hero-slide-6-age.webp',
        alt: 'Elderly man and young boy learning Quran together – Almaas Online Quran Academy',
        label: 'Lifelong Learning',
        heading: 'From 6 to 60:\nFaith Knows No Age Limit',
        subtext: 'The path of the Quran is open to every heart, at every stage of life. Start your journey today, regardless of where you are in life.',
        ctaPrimary: { text: 'Start Learning Now', action: 'popup' },
        ctaSecondary: { text: 'What We Offer', action: 'courses' },
        lazy: true,
    },
    {
        id: 7,
        image: '/images/urdu-language-course-banner.webp',
        alt: 'Happy child learning Urdu with a digital tablet – Urdu Language Course at Almaas Online Quran Academy',
        label: 'New Course Available',
        heading: 'Master Urdu Language\nFrom Basics to\nAdvanced Fluency',
        subtext: 'Comprehensive 1-on-1 Urdu classes for kids and adults. Learn speaking, reading, and writing with expert native teachers.',
        ctaPrimary: { text: 'Start Learning Urdu', action: 'popup' },
        ctaSecondary: { text: 'Course Details', action: 'courses' },
        lazy: true,
    },
];

// ─── Auto-slide interval (ms) ──────────────────────────────────────────────────
const INTERVAL_MS = 5500;

// ─── Bismillah text (shared across all slides) ─────────────────────────────────
const BISMILLAH = 'بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ';

// ─── Component ────────────────────────────────────────────────────────────────
export default function HeroCarousel({ setShowPopup, navigateTo }) {
    const randomStart = () => Math.floor(Math.random() * SLIDES.length);
    const [startIdx] = useState(randomStart);
    const [current, setCurrent] = useState(startIdx);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState({});
    const [activated, setActivated] = useState(() => ({ [startIdx]: true }));

    const goTo = useCallback(
        (idx) => {
            if (isTransitioning || idx === current) return;
            setIsTransitioning(true);
            setActivated((prev) => ({ ...prev, [idx]: true }));
            setTimeout(() => {
                setCurrent(idx);
                setIsTransitioning(false);
            }, 480);
        },
        [isTransitioning, current]
    );

    const goNext = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);

    // Auto-slide
    useEffect(() => {
        const timer = setInterval(goNext, INTERVAL_MS);
        return () => clearInterval(timer);
    }, [goNext]);

    const handleCta = (action) => {
        if (action === 'popup') setShowPopup(true);
        else if (action === 'courses') navigateTo('/courses');
    };

    return (
        <section
            id="home"
            aria-label="Homepage hero carousel"
            style={{
                position: 'relative',
                width: '100%',
                minHeight: 'clamp(560px, 88vh, 780px)',
                overflow: 'hidden',
                background: '#0A1D37',
            }}
        >
            {/* ── Slides ── */}
            {SLIDES.map((slide, idx) => {
                const isActive = idx === current;
                const wasActivated = activated[idx];

                let transform = 'translateX(100%)';
                if (isActive) transform = 'translateX(0%)';
                else if (idx < current) transform = 'translateX(-100%)';

                return (
                    <div
                        key={slide.id}
                        aria-hidden={!isActive}
                        style={{
                            position: idx === 0 ? 'relative' : 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            transform,
                            transition: isTransitioning ? 'transform 0.48s cubic-bezier(0.77,0,0.18,1)' : 'none',
                            willChange: 'transform',
                            zIndex: isActive ? 2 : 1,
                        }}
                    >
                        {/* ── Background Image ── */}
                        {wasActivated && (
                            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                                <img
                                    src={slide.image}
                                    alt={slide.alt}
                                    loading={slide.lazy ? 'lazy' : 'eager'}
                                    fetchPriority={idx === 0 ? "high" : "auto"}
                                    decoding="async"
                                    width="1920"
                                    height="1080"
                                    onLoad={() => setImagesLoaded((p) => ({ ...p, [idx]: true }))}
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center center',
                                        opacity: imagesLoaded[idx] ? 1 : 0,
                                        transition: 'opacity 0.6s ease',
                                    }}
                                />
                                {/* Dark overlay */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to bottom, rgba(10,29,55,0.25) 0%, rgba(10,29,55,0.40) 20%, rgba(10,29,55,0.60) 50%, rgba(10,29,55,0.80) 100%)',
                                    }}
                                />
                            </div>
                        )}

                        {/* ── Centered Text Content ── */}
                        <div
                            style={{
                                position: 'relative',
                                zIndex: 10,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                textAlign: 'center',
                                minHeight: 'clamp(560px, 88vh, 780px)',
                                padding: 'clamp(115px, 14vh, 155px) clamp(20px, 8vw, 120px) clamp(40px, 5vh, 70px)',
                            }}
                        >

                            {/* Bismillah — on every slide */}
                            <p
                                style={{
                                    fontFamily: "'Scheherazade New', 'Noto Naskh Arabic', 'Traditional Arabic', serif",
                                    fontWeight: 700,
                                    fontSize: 'clamp(1.3rem, 3vw, 2.2rem)',
                                    color: '#C5A059',
                                    lineHeight: 1.6,
                                    letterSpacing: '0.02em',
                                    marginBottom: '0.3rem',
                                }}
                            >
                                {BISMILLAH}
                            </p>
                            <p
                                style={{
                                    fontSize: '0.75rem',
                                    color: 'rgba(197,160,89,0.70)',
                                    fontWeight: 600,
                                    letterSpacing: '0.05em',
                                    marginBottom: '1.2rem',
                                }}
                            >
                                In the name of Allah, the Most Gracious, the Most Merciful
                            </p>

                            {/* Main heading */}
                            <h1
                                style={{
                                    fontSize: 'clamp(1.8rem, 4.5vw, 3.4rem)',
                                    fontWeight: 900,
                                    color: '#FDFBF7',
                                    lineHeight: 1.18,
                                    margin: '0 0 0.75rem',
                                    whiteSpace: 'pre-line',
                                    maxWidth: '800px',
                                }}
                            >
                                {slide.heading}
                            </h1>

                            {/* Academy name accent */}
                            <p
                                style={{
                                    fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)',
                                    fontWeight: 800,
                                    background: 'linear-gradient(90deg, #C5A059, #f0c060)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    marginBottom: '0.75rem',
                                }}
                            >
                                Almaas Online Quran Academy
                            </p>

                            {/* Sub-text */}
                            <p
                                style={{
                                    fontSize: 'clamp(0.88rem, 1.5vw, 1rem)',
                                    color: 'rgba(253,251,247,0.78)',
                                    lineHeight: 1.75,
                                    marginBottom: '2rem',
                                    maxWidth: '580px',
                                }}
                            >
                                {slide.subtext}
                            </p>

                            {/* CTA Buttons */}
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '12px',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1.5rem',
                                }}
                            >
                                <button
                                    id={`hero-cta-primary-${slide.id}`}
                                    onClick={() => handleCta(slide.ctaPrimary.action)}
                                    style={{
                                        background: 'linear-gradient(135deg, #C5A059, #a07830)',
                                        color: '#0A1D37',
                                        fontWeight: 800,
                                        fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
                                        padding: 'clamp(13px, 2vw, 17px) clamp(24px, 3vw, 36px)',
                                        borderRadius: '10px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        minHeight: '50px',
                                        boxShadow: '0 8px 28px rgba(197,160,89,0.38)',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 14px 36px rgba(197,160,89,0.55)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 8px 28px rgba(197,160,89,0.38)';
                                    }}
                                >
                                    {slide.ctaPrimary.text}
                                    <ChevronRight style={{ width: '18px', height: '18px' }} />
                                </button>

                                <button
                                    id={`hero-cta-secondary-${slide.id}`}
                                    onClick={() => handleCta(slide.ctaSecondary.action)}
                                    style={{
                                        background: 'rgba(253,251,247,0.10)',
                                        color: '#FDFBF7',
                                        fontWeight: 700,
                                        fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
                                        padding: 'clamp(13px, 2vw, 17px) clamp(24px, 3vw, 36px)',
                                        borderRadius: '10px',
                                        border: '1.5px solid rgba(253,251,247,0.35)',
                                        cursor: 'pointer',
                                        minHeight: '50px',
                                        transition: 'background 0.2s, border-color 0.2s',
                                        backdropFilter: 'blur(6px)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(253,251,247,0.20)';
                                        e.currentTarget.style.borderColor = 'rgba(253,251,247,0.65)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(253,251,247,0.10)';
                                        e.currentTarget.style.borderColor = 'rgba(253,251,247,0.35)';
                                    }}
                                >
                                    {slide.ctaSecondary.text}
                                </button>
                            </div>

                            {/* Trust badge */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                                <span style={{ color: '#C5A059', fontSize: '1.05rem', letterSpacing: '-1px' }}>★★★★★</span>
                                <span style={{ color: 'rgba(253,251,247,0.60)', fontSize: '0.78rem', fontWeight: 600 }}>
                                    Expert teachers &nbsp;•&nbsp; Flexible timings &nbsp;•&nbsp; 24/7 worldwide
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}



            {/* ── Scroll cue ── */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '26px',
                    right: '20px',
                    zIndex: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '3px',
                    color: 'rgba(253,251,247,0.38)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    pointerEvents: 'none',
                }}
            >
                <span>Scroll</span>
                <span style={{ fontSize: '1rem', lineHeight: 1 }}>↓</span>
            </div>



        </section>
    );
}
