import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiBriefcase, FiCalendar } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

export default function Experience() {
    const { t } = useTranslation();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    const timelineItems = [
        {
            type: 'work',
            icon: FiBriefcase,
            idKey: 'policlinica',
            organization: 'Policlínica La Viña',
            period: t('experience.present'),
            tagKeys: ['support', 'networks', 'maintenance'],
            color: '#00b4ff',
        },
        {
            type: 'work',
            icon: FiBriefcase,
            idKey: 'independent',
            organization: 'Múltiples Clientes (Voxen Labs, etc.)',
            period: t('experience.present'),
            tagKeys: ['Python', 'React', 'SQLite', 'ai', 'C'],
            color: '#10b981',
        },
    ];

    return (
        <section id="experiencia" className="py-24 px-6 relative">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="section-subtitle">{t('experience.subtitle')}</p>
                    <h2 className="section-title text-white">
                        {t('experience.title_start')}<span className="electric-text">{t('experience.title_accent')}</span>
                    </h2>
                    <p className="text-text-secondary mt-4 max-w-xl mx-auto">
                        {t('experience.description')}
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-electric/50 via-electric/20 to-transparent" />

                    <div className="space-y-8">
                        {timelineItems.map((item, index) => {
                            const isLeft = index % 2 === 0;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    {/* Mobile/Desktop dot */}
                                    <div
                                        className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center md:absolute md:left-1/2 md:-translate-x-1/2"
                                        style={{ backgroundColor: `${item.color}20`, border: `2px solid ${item.color}50` }}
                                    >
                                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                                    </div>

                                    {/* Card */}
                                    <div className={`flex-1 md:w-[calc(50%-3rem)] ${isLeft ? 'md:pr-12' : 'md:pl-12'} md:mt-0`}>
                                        <div className="glass-card p-5 hover:border-electric/30 transition-all duration-300">
                                            {/* Period */}
                                            <div className="flex items-center gap-1.5 text-text-secondary text-xs font-mono mb-2">
                                                <FiCalendar className="w-3.5 h-3.5" />
                                                {item.period}
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-white font-bold text-base mb-0.5">{t(`experience.items.${item.idKey}.title`)}</h3>
                                            <p className="text-electric text-sm font-medium mb-3">{item.organization}</p>

                                            {/* Description */}
                                            <p className="text-text-secondary text-sm leading-relaxed mb-4">
                                                {t(`experience.items.${item.idKey}.description`)}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-1.5">
                                                {(item.tagKeys || item.tags).map((tag, i) => (
                                                    <span key={i} className="tag text-[11px]">
                                                        {item.tagKeys ? t(`experience.tags.${tag}`) : tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Spacer for opposite side on desktop */}
                                    <div className="hidden md:block flex-1" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
