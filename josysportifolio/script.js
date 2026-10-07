/* ============================================
   PORTFOLIO - MAIN JAVASCRIPT v3.0
   Theme Toggle + All Features
   ============================================ */

(function () {
    'use strict';

    /* ============================================
       THEME TOGGLE with localStorage
       ============================================ */
    const THEME_KEY = 'portfolio-theme';
    const htmlEl = document.documentElement;

    function getPreferredTheme() {
        let saved = null;
        try {
            saved = localStorage.getItem(THEME_KEY);
        } catch (error) {
            console.warn('Unable to read the saved theme preference.', error);
        }
        if (saved === 'light' || saved === 'dark') return saved;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function applyTheme(theme) {
        htmlEl.setAttribute('data-theme', theme);
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (error) {
            console.warn('Unable to save the theme preference.', error);
        }

        // Update theme toggle icon
        const icon = document.querySelector('#themeToggle i');
        if (icon) {
            icon.className = theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
        }
        const btn = document.getElementById('themeToggle');
        if (btn) {
            btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
        }
    }

    applyTheme(getPreferredTheme());
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = htmlEl.getAttribute('data-theme') || 'dark';
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    /* ============================================
       PRELOADER
       ============================================ */
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => preloader.classList.add('hidden'), 300);
        }
    });

    /* ============================================
       TYPED TEXT
       ============================================ */
    document.addEventListener('DOMContentLoaded', () => {
        const typedElement = document.querySelector('.text');
        if (typedElement && typeof Typed !== 'undefined') {
            new Typed('.text', {
                strings: [
                    'Frontend Developer',
                    'Web Designer',
                    'Backend Developer',
                    'UI/UX Designer'
                ],
                typeSpeed: 80,
                backSpeed: 60,
                backDelay: 1500,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    });

    /* ============================================
       MOBILE MENU
       ============================================ */
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    const mobileNavBreakpoint = 1100;

    if (menuToggle && navbar) {
        const setMenuOpen = (isOpen) => {
            navbar.classList.toggle('active', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = isOpen ? 'bx bx-x' : 'bx bx-menu';
            document.body.classList.toggle('no-scroll', isOpen && window.innerWidth <= mobileNavBreakpoint);
        };

        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            setMenuOpen(!navbar.classList.contains('active'));
        });

        navbar.querySelectorAll('a:not(.dropbtn)').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= mobileNavBreakpoint) setMenuOpen(false);
            });
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && !e.target.closest('.menu-toggle')) {
                setMenuOpen(false);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navbar.classList.contains('active')) {
                setMenuOpen(false);
                menuToggle.focus();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > mobileNavBreakpoint) setMenuOpen(false);
        });
    }

    /* ============================================
       DROPDOWN MENUS
       ============================================ */
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        if (dropbtn) {
            dropbtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropdown.classList.toggle('active');
            });
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });

    /* ============================================
       SCROLL TO TOP
       ============================================ */
    const topButton = document.querySelector('.top');
    if (topButton) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    topButton.classList.toggle('visible', window.scrollY > 300);
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        topButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ============================================
       ACTIVE PAGE INDICATOR — data-page driven
       ============================================ */
    document.addEventListener('DOMContentLoaded', () => {
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop() || 'index.html';
        const isBlogPost = /(?:^|\/)blog\/post-[^/]+\.html$/i.test(currentPath);

        // Map filename → data-page value
        const PAGE_MAP = {
            'index.html':     'home',
            'more.html':      'about',
            'webdesign.html': 'webdesign',
            'uiux.html':      'uiux',
            'app.html':       'app',
            'courses.html':   'courses',
            'hire.html':      'hire',
            '404.html':       'home'
        };

        let activeKey = PAGE_MAP[currentFile] || null;

        // Blog posts → mark "blog" as active
        if (isBlogPost) activeKey = 'blog';

        // Clear any hardcoded active states
        document.querySelectorAll('.navbar a').forEach(link => {
            link.classList.remove('active');
        });

        if (!activeKey) return;

        // Apply active state
        document.querySelectorAll(`.navbar a[data-page="${activeKey}"]`).forEach(link => {
            link.classList.add('active');
        });

        // Mark "Services" dropdown trigger as active on service pages
        if (['webdesign', 'uiux', 'app'].includes(activeKey)) {
            const servicesBtn = document.querySelector('.navbar .dropbtn[data-page="services"]');
            if (servicesBtn) servicesBtn.classList.add('active');
        }
    });

    /* ============================================
       INTERSECTION OBSERVER — SCROLL ANIMATIONS
       ============================================ */
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll(
            '.services-list > .service-card, .row, .radial-bar, .about-img, .about-text, .testimonial-card, .blog-card, .service-section'
        ).forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    /* ============================================
       SMOOTH SCROLL FOR ANCHORS
       ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.length < 2) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    /* ============================================
       CONTACT FORM — sendMail
       ============================================ */
    window.sendMail = function () {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const honeypot = document.getElementById('website');
        const submitBtn = document.querySelector('.btn-submit');

        if (honeypot && honeypot.value) {
            console.warn('Bot submission blocked.');
            return;
        }

        if (!name || !email || !message || !submitBtn) return;

        if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
            showFormMessage(submitBtn, 'Please fill in all fields.', 'error');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            showFormMessage(submitBtn, 'Please enter a valid email.', 'error');
            return;
        }

        if (message.value.trim().length < 10) {
            showFormMessage(submitBtn, 'Message must be at least 10 characters.', 'error');
            return;
        }

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        const params = {
            name: name.value.trim(),
            email: email.value.trim(),
            message: message.value.trim()
        };

        if (typeof emailjs === 'undefined') {
            showFormMessage(submitBtn, 'Email service unavailable.', 'error');
            return;
        }

        emailjs.send('service_t5poprq', 'BCD13J2', params)
            .then(() => {
                name.value = '';
                email.value = '';
                message.value = '';
                showFormMessage(submitBtn, 'Message sent successfully! ✓', 'success');
            })
            .catch((err) => {
                console.error('Email error:', err);
                showFormMessage(submitBtn, 'Failed to send. Try again.', 'error');
            });
    };

    function showFormMessage(btn, msg, type) {
        btn.textContent = msg;
        btn.style.background = type === 'success'
            ? 'linear-gradient(135deg, #10b981, #059669)'
            : 'linear-gradient(135deg, #ef4444, #dc2626)';
        setTimeout(() => {
            btn.textContent = 'Send Message';
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    }

            /* ============================================
       HIRE MODAL
       ============================================ */
    const HIRE_CONTACTS = {
        whatsapp: {
            phone: '254786964081',
            message: 'Hi Joseph, I found your portfolio and I would like to talk about '
        },
        call: {
            phone: '+254786964081'
        },
        email: {
            address: 'wambugujosephgitimu@gmail.com',
            subject: 'Project Inquiry from your Portfolio',
            body: 'Hi Joseph,\n\nI found your portfolio and I would like to discuss a project.\n\nProject details:\n- Type: \n- Timeline: \n- Budget range: \n\nThanks!'
        }
    };

    window.openHireModal = function (context) {
        const modal = document.getElementById('hireModal');
        const contextEl = document.getElementById('hireModalContext');
        if (!modal) return;

        if (contextEl && context) {
            contextEl.textContent = context;
        }

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');

        // Wire up contact options
        modal.querySelectorAll('[data-contact]').forEach(el => {
            el.onclick = (e) => {
                e.preventDefault();
                triggerContact(el.dataset.contact, context);
            };
        });

        // Close on overlay click
        modal.onclick = (e) => {
            if (e.target === modal) closeHireModal();
        };

        // Close on Escape
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeHireModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);

        // Focus the close button for accessibility
        setTimeout(() => {
            const closeBtn = modal.querySelector('.hire-modal-close');
            if (closeBtn) closeBtn.focus();
        }, 100);
    };

    window.closeHireModal = function () {
        const modal = document.getElementById('hireModal');
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');
    };

    function triggerContact(type, context) {
        const c = HIRE_CONTACTS[type];
        if (!c) return;

        let url = '';

        if (type === 'whatsapp') {
            const msg = c.message + (context ? `(${context})` : '');
            url = `https://wa.me/${c.phone}?text=${encodeURIComponent(msg)}`;
        } else if (type === 'call') {
            url = `tel:${c.phone}`;
        } else if (type === 'email') {
            const subject = encodeURIComponent(c.subject + (context ? ` — ${context}` : ''));
            const body = encodeURIComponent(c.body);
            url = `mailto:${c.address}?subject=${subject}&body=${body}`;
        }

        if (url) {
            if (type === 'call') {
                window.location.href = url;
            } else {
                window.open(url, '_blank', 'noopener');
            }
        }

        // Track event
        if (typeof gtag === 'function') {
            gtag('event', 'contact_click', {
                contact_method: type,
                context: context || 'unknown'
            });
        }
    }

    // Wire all quick contact triggers on page load
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-contact]').forEach(el => {
            // Skip those inside the modal — they get wired when modal opens
            if (el.closest('#hireModal')) return;
            el.addEventListener('click', (e) => {
                e.preventDefault();
                triggerContact(el.dataset.contact, el.dataset.context);
            });
        });
    });

    /* ============================================
       COLLAPSIBLE CONTACT FORM
       ============================================ */
    window.toggleContactForm = function () {
        const toggle = document.querySelector('.collapsible-toggle');
        const panel = document.getElementById('contactFormPanel');
        if (!toggle || !panel) return;

        const isOpen = toggle.getAttribute('aria-expanded') === 'true';

        if (isOpen) {
            toggle.setAttribute('aria-expanded', 'false');
            panel.hidden = true;
        } else {
            toggle.setAttribute('aria-expanded', 'true');
            panel.hidden = false;
            // Focus first input
            setTimeout(() => {
                const firstInput = panel.querySelector('input:not([type="hidden"]):not(#website)');
                if (firstInput) firstInput.focus();
            }, 100);
        }
    };

    /* ============================================
       CURRENCY SWITCHER (Courses page)
       ============================================ */
    const CURRENCY_RATES = {
        KES: { rate: 1,          symbol: 'KSh ', decimals: 0, name: 'Kenyan Shilling' },
        USD: { rate: 0.0077,     symbol: '$',    decimals: 0, name: 'US Dollar' },
        EUR: { rate: 0.0071,     symbol: '€',    decimals: 0, name: 'Euro' },
        GBP: { rate: 0.0061,     symbol: '£',    decimals: 0, name: 'British Pound' },
        NGN: { rate: 12.5,       symbol: '₦',    decimals: 0, name: 'Nigerian Naira' },
        ZAR: { rate: 0.14,       symbol: 'R',    decimals: 0, name: 'South African Rand' },
        INR: { rate: 0.65,       symbol: '₹',    decimals: 0, name: 'Indian Rupee' },
        UGX: { rate: 28.5,       symbol: 'USh ', decimals: 0, name: 'Ugandan Shilling' },
        TZS: { rate: 20.0,       symbol: 'TSh ', decimals: 0, name: 'Tanzanian Shilling' }
    };

    function formatPrice(amountKES, currency) {
        const c = CURRENCY_RATES[currency] || CURRENCY_RATES.KES;
        const converted = amountKES * c.rate;
        // Round to nearest reasonable value
        let rounded;
        if (currency === 'KES') {
            rounded = Math.round(converted / 500) * 500;
        } else if (currency === 'UGX' || currency === 'TZS' || currency === 'NGN' || currency === 'INR') {
            rounded = Math.round(converted / 100) * 100;
        } else {
            rounded = Math.round(converted);
        }
        return c.symbol + rounded.toLocaleString('en-US');
    }

    function updatePrices(currency) {
        document.querySelectorAll('.price-amount').forEach(el => {
            const kes = parseFloat(el.dataset.kes);
            if (isNaN(kes)) return;
            el.textContent = formatPrice(kes, currency);
        });
    }

    // Wire currency selector
    document.addEventListener('DOMContentLoaded', () => {
        const select = document.getElementById('currencySelect');
        if (!select) return;

        const saved = localStorage.getItem('preferred-currency');
        if (saved && CURRENCY_RATES[saved]) {
            select.value = saved;
            updatePrices(saved);
        }

        select.addEventListener('change', () => {
            const currency = select.value;
            updatePrices(currency);
            localStorage.setItem('preferred-currency', currency);

            if (typeof gtag === 'function') {
                gtag('event', 'currency_change', {
                    currency: currency
                });
            }
        });
    });


})();