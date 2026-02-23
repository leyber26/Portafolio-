import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import {
    SiPython, SiFlask, SiReact, SiPostgresql, SiSupabase,
    SiJavascript, SiHtml5, SiSqlite,
} from 'react-icons/si';

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.15 },
    }),
};

function ProjectCard({ project, index }) {
    const { t } = useTranslation();

    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            whileHover={{ y: -6 }}
            className="group relative"
        >
            {/* Gradient border wrapper */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
                style={{ background: `linear-gradient(135deg, ${project.color}40, transparent)` }}
            />

            <div className="glass-card relative p-6 h-full flex flex-col transition-all duration-300">
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                    {/* Tech icons */}
                    <div className="flex items-center gap-2">
                        {project.icons.map((Icon, i) => (
                            <div
                                key={i}
                                className="w-9 h-9 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${project.color}15` }}
                            >
                                <Icon className="w-5 h-5" style={{ color: project.color }} />
                            </div>
                        ))}
                    </div>
                    {/* Badge */}
                    <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-full border ${project.badgeColor}`}>
                        {t(`projects.list.${project.idKey}.badge`)}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-lg mb-3 leading-snug group-hover:text-electric transition-colors">
                    {t(`projects.list.${project.idKey}.title`)}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-5">
                    {t(`projects.list.${project.idKey}.description`)}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {(project.tagKeys || project.tags).map((tag, i) => (
                        <span key={i} className="tag">
                            {project.tagKeys ? t(`projects.tags.${tag}`) : tag}
                        </span>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-dark-border">
                    <a
                        href={project.demoUrl}
                        className="flex items-center gap-1.5 text-sm font-semibold text-electric hover:text-electric-glow transition-colors"
                    >
                        <FiExternalLink className="w-4 h-4" />
                        {t('projects.actions.demo')}
                    </a>
                    <a
                        href={project.codeUrl}
                        className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-white transition-colors"
                    >
                        <FiGithub className="w-4 h-4" />
                        {t('projects.actions.code')}
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const { t } = useTranslation();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    const projects = [
        {
            id: 1,
            idKey: 'voxen',
            tags: ['Python', 'Tkinter', 'SQLite', 'HTML/CSS/JS'],
            icons: [SiPython, SiSqlite, SiJavascript],
            color: '#00b4ff',
            gradient: 'from-blue-500/20 to-cyan-500/10',
            badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
            demoUrl: '#',
            codeUrl: '#',
            featured: true,
        },
        {
            id: 2,
            idKey: 'ecommerce',
            tagKeys: ['React', 'Dashboard', 'mgmt', 'logistics'],
            icons: [SiReact, SiJavascript],
            color: '#7c3aed',
            gradient: 'from-purple-500/20 to-violet-500/10',
            badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
            demoUrl: '#',
            codeUrl: '#',
            featured: true,
        },
        {
            id: 3,
            idKey: 'ia',
            tagKeys: ['ai', 'Whisper', 'Qwen-TTS', 'Python'],
            icons: [SiPython],
            color: '#10b981',
            gradient: 'from-emerald-500/20 to-teal-500/10',
            badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
            demoUrl: '#',
            codeUrl: '#',
            featured: false,
        },
        {
            id: 4,
            idKey: 'portfolio',
            tagKeys: ['React', 'Vite', 'Localtunnel', 'networks'],
            icons: [SiReact, SiJavascript],
            color: '#f59e0b',
            gradient: 'from-orange-500/20 to-amber-500/10',
            badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
            demoUrl: '#',
            codeUrl: '#',
            featured: false,
        },
        {
            id: 5,
            idKey: 'wordbank',
            tagKeys: ['C', 'low_level', 'algorithms', 'I/O'],
            icons: [],
            color: '#ef4444',
            gradient: 'from-red-500/20 to-rose-500/10',
            badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
            demoUrl: '#',
            codeUrl: '#',
            featured: false,
        }
    ];

    // Helper to get translated tag or original tag
    const getTagLabel = (tag, tagKey) => {
        if (tagKey) {
            const translated = t(`projects.tags.${tagKey}`);
            return translated !== `projects.tags.${tagKey}` ? translated : tag;
        }
        return tag;
    };

    return (
        <section id="proyectos" className="py-24 px-6 relative">
            {/* Background accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-electric/30 to-transparent" />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="section-subtitle">{t('projects.subtitle')}</p>
                    <h2 className="section-title text-white">
                        {t('projects.title_start')}<span className="electric-text">{t('projects.title_accent')}</span>
                    </h2>
                    <p className="text-text-secondary mt-4 max-w-xl mx-auto">
                        {t('projects.description')}
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.idKey} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
