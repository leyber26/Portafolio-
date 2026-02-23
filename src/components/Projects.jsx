import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import {
    SiPython, SiFlask, SiReact, SiPostgresql, SiSupabase,
    SiJavascript, SiHtml5, SiSqlite,
} from 'react-icons/si';

const projects = [
    {
        id: 1,
        title: 'Voxen Labs: Analíticas Híbridas',
        description:
            'App híbrida (.exe) con backend en Python (Tkinter, Pywebview, SQLite) y dashboard web moderno. Implementación de diseño Glassmorphism, modo claro/oscuro y sistema seguro de login.',
        tags: ['Python', 'Tkinter', 'SQLite', 'HTML/CSS/JS'],
        icons: [SiPython, SiSqlite, SiJavascript],
        color: '#00b4ff',
        gradient: 'from-blue-500/20 to-cyan-500/10',
        badge: 'Escritorio',
        badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        demoUrl: '#',
        codeUrl: '#',
        featured: true,
    },
    {
        id: 2,
        title: 'Gestor de E-Commerce & Inventario',
        description:
            'Panel de administración con lógica para alertas de stock, prevención de compras agotadas y dashboard de validación de pagos y actualización de estados de órdenes.',
        tags: ['React', 'Dashboard', 'Gestión', 'Logística'],
        icons: [SiReact, SiJavascript],
        color: '#7c3aed',
        gradient: 'from-purple-500/20 to-violet-500/10',
        badge: 'E-commerce',
        badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        demoUrl: '#',
        codeUrl: '#',
        featured: true,
    },
    {
        id: 3,
        title: 'IA Offline: Integración Local',
        description:
            'Configuración y despliegue de modelos de síntesis de voz (Qwen-TTS) y reconocimiento (Whisper) para ejecución en entorno local sin APIs externas, asegurando máxima privacidad.',
        tags: ['IA', 'Whisper', 'Qwen-TTS', 'Python'],
        icons: [SiPython],
        color: '#10b981',
        gradient: 'from-emerald-500/20 to-teal-500/10',
        badge: 'Inteligencia Artificial',
        badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        demoUrl: '#',
        codeUrl: '#',
        featured: false,
    },
    {
        id: 4,
        title: 'React Portfolio & Túneles (Localtunnel)',
        description:
            'Single Page Application (SPA) con React y Vite. Configuración de túneles seguros para exponer de forma pública el servidor local sin hosting dedicado.',
        tags: ['React', 'Vite', 'Localtunnel', 'Redes'],
        icons: [SiReact, SiJavascript],
        color: '#f59e0b',
        gradient: 'from-orange-500/20 to-amber-500/10',
        badge: 'Web & Redes',
        badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
        demoUrl: '#',
        codeUrl: '#',
        featured: false,
    },
    {
        id: 5,
        title: 'Motor "Word Bank" I/O en C',
        description:
            'Procesamiento a bajo nivel para el conteo de ocurrencias de palabras. Optimización matemática de memoria por manipulación estricta de archivos/punteros evitando arrays/structs.',
        tags: ['C', 'Low Level', 'Algoritmos', 'I/O'],
        icons: [],
        color: '#ef4444',
        gradient: 'from-red-500/20 to-rose-500/10',
        badge: 'Sistemas',
        badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
        demoUrl: '#',
        codeUrl: '#',
        featured: false,
    }
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.15 },
    }),
};

function ProjectCard({ project, index }) {
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
                        {project.badge}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-lg mb-3 leading-snug group-hover:text-electric transition-colors">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-5">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-dark-border">
                    <a
                        href={project.demoUrl}
                        className="flex items-center gap-1.5 text-sm font-semibold text-electric hover:text-electric-glow transition-colors"
                    >
                        <FiExternalLink className="w-4 h-4" />
                        Demo
                    </a>
                    <a
                        href={project.codeUrl}
                        className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-white transition-colors"
                    >
                        <FiGithub className="w-4 h-4" />
                        Código
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

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
                    <p className="section-subtitle">Portafolio</p>
                    <h2 className="section-title text-white">
                        Proyectos <span className="electric-text">Destacados</span>
                    </h2>
                    <p className="text-text-secondary mt-4 max-w-xl mx-auto">
                        Soluciones reales que he construido, desde sistemas de gestión hasta plataformas de comercio electrónico.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
