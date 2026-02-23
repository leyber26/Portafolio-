import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiHeart } from 'react-icons/fi';

export default function Footer() {
    const year = new Date().getFullYear();

    const scrollTo = (id) => {
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="border-t border-dark-border bg-dark-card/30 py-10 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Brand */}
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-electric/10 border border-electric/30 flex items-center justify-center">
                            <span className="text-electric font-mono font-bold text-xs">&lt;/&gt;</span>
                        </div>
                        <span className="font-bold text-white text-sm tracking-tight">
                            Dev<span className="text-electric">Portfolio</span>
                        </span>
                    </div>

                    {/* Nav links */}
                    <div className="flex items-center gap-6">
                        {['#hero', '#stack', '#proyectos', '#experiencia', '#contacto'].map((href, i) => {
                            const labels = ['Inicio', 'Stack', 'Proyectos', 'Experiencia', 'Contacto'];
                            return (
                                <button
                                    key={href}
                                    onClick={() => scrollTo(href)}
                                    className="text-text-secondary hover:text-electric text-xs font-medium transition-colors"
                                >
                                    {labels[i]}
                                </button>
                            );
                        })}
                    </div>

                    {/* Social */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 transition-all"
                        >
                            <FiGithub className="w-4 h-4" />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-electric/5 flex items-center justify-center text-electric hover:bg-electric/15 transition-all"
                        >
                            <FiLinkedin className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-dark-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-text-secondary text-xs font-mono">
                        © {year} DevPortfolio. Todos los derechos reservados.
                    </p>
                    <p className="text-text-secondary text-xs flex items-center gap-1">
                        Hecho con <FiHeart className="w-3 h-3 text-red-400" /> y React
                    </p>
                </div>
            </div>
        </footer>
    );
}
