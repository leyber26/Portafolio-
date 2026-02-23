import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiSend, FiGithub, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import emailjs from 'emailjs-com';

export default function Contact() {
    const { t } = useTranslation();
    const ref = useRef(null);
    const formRef = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = t('contact.errors.name');
        if (!formData.email.trim()) {
            newErrors.email = t('contact.errors.email_required');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t('contact.errors.email_invalid');
        }
        if (!formData.message.trim()) newErrors.message = t('contact.errors.message_required');
        else if (formData.message.trim().length < 10) newErrors.message = t('contact.errors.message_min');
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                setSubmitted(true);
                setFormData({ name: '', email: '', message: '' });
            }, (error) => {
                console.log(error.text);
                alert(t('contact.errors.general'));
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    const inputClass = (field) =>
        `w-full bg-dark-bg/60 border rounded-xl px-4 py-3 text-white placeholder-text-secondary/50 text-sm outline-none transition-all duration-300 focus:border-electric focus:ring-1 focus:ring-electric/30 ${errors[field] ? 'border-red-500/60' : 'border-dark-border'
        }`;

    return (
        <section id="contacto" className="py-24 px-6 relative">
            {/* Background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-electric/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="section-subtitle">{t('contact.subtitle')}</p>
                    <h2 className="section-title text-white">
                        {t('contact.title_start')}<span className="electric-text">{t('contact.title_accent')}</span>
                    </h2>
                    <p className="text-text-secondary mt-4 max-w-xl mx-auto">
                        {t('contact.description')}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-5 gap-8">
                    {/* Info panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:col-span-2 space-y-6"
                    >
                        {/* Info cards */}
                        {[
                            {
                                icon: FiMail,
                                label: t('contact.labels.email'),
                                value: 'leybercolmenarez619@gmail.com',
                                href: 'mailto:leybercolmenarez619@gmail.com',
                            },
                            {
                                icon: FiMapPin,
                                label: t('contact.labels.location'),
                                value: 'Valencia, Venezuela',
                                href: null,
                            },
                        ].map((info) => (
                            <div key={info.label} className="glass-card p-4 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-electric/10 flex items-center justify-center flex-shrink-0">
                                    <info.icon className="w-5 h-5 text-electric" />
                                </div>
                                <div>
                                    <p className="text-text-secondary text-xs font-mono">{info.label}</p>
                                    {info.href ? (
                                        <a href={info.href} className="text-white text-sm font-medium hover:text-electric transition-colors">
                                            {info.value}
                                        </a>
                                    ) : (
                                        <p className="text-white text-sm font-medium">{info.value}</p>
                                    )}
                                </div>
                            </div>
                        ))}

                        <div className="glass-card p-4 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-electric/10 flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-electric"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </div>
                            <div>
                                <p className="text-text-secondary text-xs font-mono">{t('contact.labels.phone')}</p>
                                <a href="tel:+584145807657" className="text-white text-sm font-medium hover:text-electric transition-colors">
                                    +58 0414 580 7657
                                </a>
                            </div>
                        </div>

                        <div className="glass-card p-4 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                <FaWhatsapp className="w-5 h-5 text-green-500" />
                            </div>
                            <div>
                                <p className="text-text-secondary text-xs font-mono">{t('contact.labels.whatsapp')}</p>
                                <a
                                    href="https://wa.me/584145807657"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white text-sm font-medium hover:text-green-500 transition-colors"
                                >
                                    WhatsApp Chat
                                </a>
                            </div>
                        </div>

                        {/* Social links */}
                        <div className="glass-card p-5">
                            <p className="text-text-secondary text-xs font-mono mb-4 uppercase tracking-wider">{t('contact.labels.social')}</p>
                            <div className="flex flex-col gap-3">
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-text-secondary hover:text-white transition-colors group"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                        <FiGithub className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium">GitHub</span>
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-text-secondary hover:text-electric transition-colors group"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-electric/5 flex items-center justify-center group-hover:bg-electric/10 transition-colors">
                                        <FiLinkedin className="w-4 h-4 text-electric" />
                                    </div>
                                    <span className="text-sm font-medium">LinkedIn</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="md:col-span-3"
                    >
                        <div className="glass-card p-6">
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-16 h-16 rounded-full bg-electric/10 border border-electric/30 flex items-center justify-center mx-auto mb-4">
                                        <FiSend className="w-7 h-7 text-electric" />
                                    </div>
                                    <h3 className="text-white font-bold text-xl mb-2">{t('contact.success.title')}</h3>
                                    <p className="text-text-secondary text-sm">
                                        {t('contact.success.message')}
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="mt-6 btn-outline text-sm py-2 px-4"
                                    >
                                        {t('contact.success.button')}
                                    </button>
                                </motion.div>
                            ) : (
                                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
                                    <div>
                                        <label className="block text-text-secondary text-xs font-mono mb-1.5 uppercase tracking-wider">
                                            {t('contact.labels.name')}
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="contact-name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder={t('contact.placeholders.name')}
                                            className={inputClass('name')}
                                        />
                                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-text-secondary text-xs font-mono mb-1.5 uppercase tracking-wider">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="contact-email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder={t('contact.placeholders.email')}
                                            className={inputClass('email')}
                                        />
                                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-text-secondary text-xs font-mono mb-1.5 uppercase tracking-wider">
                                            {t('contact.labels.message')}
                                        </label>
                                        <textarea
                                            name="message"
                                            id="contact-message"
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder={t('contact.placeholders.message')}
                                            className={`${inputClass('message')} resize-none`}
                                        />
                                        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn-primary w-full flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FiSend className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
                                        {isSubmitting ? t('contact.submitting') : t('contact.submit')}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
