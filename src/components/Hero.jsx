import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowDown, FiGithub, FiLinkedin } from 'react-icons/fi';

// Canvas-based particle network (no external dependency)
function ParticleCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;
        let particles = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const PARTICLE_COUNT = 70;
        const MAX_DIST = 140;
        const COLOR = '0, 180, 255';

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                r: Math.random() * 2 + 1,
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Move
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            });

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < MAX_DIST) {
                        const alpha = (1 - dist / MAX_DIST) * 0.25;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${COLOR}, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw dots
            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${COLOR}, 0.5)`;
                ctx.fill();
            });

            animId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 0 }}
        />
    );
}

export default function Hero() {
    const scrollToProjects = () => {
        document.querySelector('#proyectos')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToContact = () => {
        document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
        >
            {/* Canvas Particle Background */}
            <ParticleCanvas />

            {/* Radial glow */}
            <div className="absolute inset-0 bg-gradient-radial from-electric/5 via-transparent to-transparent pointer-events-none" style={{ zIndex: 1 }} />

            {/* Content */}
            <div className="relative max-w-4xl mx-auto px-6 text-center" style={{ zIndex: 2 }}>
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-2 bg-electric/10 border border-electric/25 rounded-full px-4 py-1.5 mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
                    <span className="text-electric text-sm font-mono font-medium tracking-wider">
                        Disponible para proyectos
                    </span>
                </motion.div>

                {/* Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="section-title text-5xl md:text-7xl mb-4"
                >
                    <span className="text-white">Hola, soy</span>
                    <br />
                    <span className="electric-text text-glow">LEYBER Colmenarez</span>
                </motion.h1>

                {/* Typewriter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-xl md:text-2xl text-text-secondary mb-10 font-mono min-h-[2rem]"
                >
                    <TypeAnimation
                        sequence={[
                            'Desarrollador Fullstack',
                            2000,
                            'Especialista en Sistemas ISO 11620',
                            2000,
                            'Arquitecto de Soluciones Web',
                            2000,
                            'Apasionado por el código limpio',
                            2000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                        className="text-electric"
                    />
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.65 }}
                    className="text-text-secondary text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    Construyo experiencias digitales de alto impacto con tecnologías modernas.
                    Especializado en sistemas de gestión, dashboards analíticos y plataformas web escalables.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                >
                    <button onClick={scrollToProjects} className="btn-primary flex items-center gap-2">
                        Ver mis proyectos
                        <FiArrowDown className="w-4 h-4" />
                    </button>
                    <button onClick={scrollToContact} className="btn-outline">
                        Contáctame
                    </button>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="flex items-center justify-center gap-6"
                >
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-text-secondary hover:text-electric transition-colors group"
                    >
                        <FiGithub className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">GitHub</span>
                    </a>
                    <div className="w-px h-4 bg-dark-border" />
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-text-secondary hover:text-electric transition-colors group"
                    >
                        <FiLinkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">LinkedIn</span>
                    </a>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                style={{ zIndex: 2 }}
            >
                <span className="text-text-secondary text-xs font-mono tracking-widest">SCROLL</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-px h-8 bg-gradient-to-b from-electric to-transparent"
                />
            </motion.div>
        </section>
    );
}
