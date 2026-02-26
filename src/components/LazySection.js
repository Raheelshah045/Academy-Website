import React, { useRef, useState, useEffect } from 'react';

/**
 * LazySection — renders children only when they scroll into view.
 * Uses IntersectionObserver (native browser API, zero dependencies).
 * Once visible, stays rendered (no unmount on scroll out).
 */
const LazySection = ({ children, rootMargin = '200px', fallback = null }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // If IntersectionObserver not supported (rare), just show immediately
        if (!('IntersectionObserver' in window)) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect(); // Only trigger once
                }
            },
            { rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [rootMargin]);

    return (
        <div ref={ref}>
            {visible ? children : fallback}
        </div>
    );
};

export default LazySection;
