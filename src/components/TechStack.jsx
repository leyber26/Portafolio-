import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    SiPython, SiFlask, SiReact, SiSupabase, SiPostgresql,
    SiJavascript, SiHtml5, SiCss3, SiGit, SiNodedotjs,
    SiNpm, SiDocker,
} from 'react-icons/si';

const technologies = [
    { icon: SiPython, name: 'Python', color: '#3776AB', level: 'Avanzado' },
    { icon: SiFlask, name: 'Flask', color: '#ffffff', level: 'Avanzado' },
    { icon: SiReact, name: 'React', color: '#61DAFB', level: 'Avanzado' },
    { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E', level: 'Avanzado' },
    { icon: SiPostgresql, name: 'PostgreSQL', color: '#336791', level: 'Intermedio' },
    { icon: SiSupabase, name: 'Supabase', color: '#3ECF8E', level: 'Intermedio' },
    { icon: SiNodedotjs, name: 'Node.js', color: '#339933', level: 'Intermedio' },
    { icon: SiNpm, name: 'npm', color: '#CB3837', level: 'Avanzado' },
    { icon: SiHtml5, name: 'HTML5', color: '#E34F26', level: 'Avanzado' },
    { icon: SiCss3, name: 'CSS3', color: '#1572B6', level: 'Avanzado' },
    { icon: SiGit, name: 'Git', color: '#F05032', level: 'Avanzado' },
    { icon: SiDocker, name: 'Docker', color: '#2496ED', level: 'Básico' },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.07 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

export default function TechStack() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="stack" className="py-24 px-6 relative">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                    ref={ref}
                >
                    <p className="section-subtitle">Tecnologías</p>
                    <h2 className="section-title text-white">
                        Mi <span className="electric-text">Stack</span> Tecnológico
                    </h2>
                    <p className="text-text-secondary mt-4 max-w-xl mx-auto">
                        Herramientas y tecnologías con las que construyo soluciones robustas y escalables.
                    </p>
                </motion.div>

                {/* Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4"
                >
                    {technologies.map((tech) => (
                        <motion.div
                            key={tech.name}
                            variants={itemVariants}
                            whileHover={{ scale: 1.08, y: -4 }}
                            className="glass-card p-4 flex flex-col items-center gap-3 cursor-default group transition-all duration-300"
                        >
                            <div
                                className="w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                                style={{ backgroundColor: `${tech.color}15` }}
                            >
                                <tech.icon
                                    className="w-7 h-7 transition-all duration-300"
                                    style={{ color: tech.color }}
                                />
                            </div>
                            <div className="text-center">
                                <p className="text-white text-xs font-semibold">{tech.name}</p>
                                <p className="text-text-secondary text-[10px] mt-0.5 font-mono">{tech.level}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
