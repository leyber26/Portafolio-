import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiOutlineTranslate } from 'react-icons/hi';

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { label: t('navbar.start'), href: '#hero' },
        { label: t('navbar.stack'), href: '#stack' },
        { label: t('navbar.projects'), href: '#proyectos' },
        { label: t('navbar.experience'), href: '#experiencia' },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => {
        const nextLng = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(nextLng);
    };

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-dark-bg/90 backdrop-blur-xl border-b border-dark-border shadow-lg shadow-black/20'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <a
                    href="#hero"
                    onClick={(e) => handleNavClick(e, '#hero')}
                    className="flex items-center gap-2 group"
                >
                    <div className="w-8 h-8 rounded-lg bg-electric/10 border border-electric/30 flex items-center justify-center group-hover:bg-electric/20 transition-colors">
                        <span className="text-electric font-mono font-bold text-sm">&lt;/&gt;</span>
                    </div>
                    <span className="font-bold text-white text-lg tracking-tight">
                        Dev<span className="text-electric">Portfolio</span>
                    </span>
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="nav-link"
                        >
                            {link.label}
                        </a>
                    ))}

                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 text-text-secondary hover:text-electric transition-colors p-2 rounded-lg hover:bg-white/5"
                        title={i18n.language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                    >
                        <HiOutlineTranslate className="w-5 h-5" />
                        <span className="text-xs font-mono font-bold uppercase">{i18n.language}</span>
                    </button>

                    <a
                        href="#contacto"
                        onClick={(e) => handleNavClick(e, '#contacto')}
                        className="btn-primary text-sm py-2 px-5"
                    >
                        {t('navbar.contact')}
                    </a>
                </div>

                {/* Mobile Hamburger */}
                <div className="flex items-center gap-4 md:hidden">
                    <button
                        onClick={toggleLanguage}
                        className="text-text-secondary hover:text-electric p-1"
                    >
                        <HiOutlineTranslate className="w-5 h-5" />
                    </button>
                    <button
                        className="flex flex-col gap-1.5 p-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-6 h-0.5 bg-electric transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-electric transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-electric transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-dark-card/95 backdrop-blur-xl border-b border-dark-border px-6 py-4 flex flex-col gap-4"
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-text-secondary hover:text-electric transition-colors py-1 font-medium"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#contacto"
                        onClick={(e) => handleNavClick(e, '#contacto')}
                        className="btn-primary text-center text-sm py-2 px-5"
                    >
                        {t('navbar.contact')}
                    </a>
                </motion.div>
            )}
        </motion.nav>
    );
}
