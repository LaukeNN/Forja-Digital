import React from 'react';
import { ArrowRight, Code2 } from 'lucide-react';

export const Hero = ({ onCtaClick }) => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-dark-bg">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />

                {/* Logo Watermark */}
                <div className="absolute top-1/2 -left-20 transform -translate-y-1/2 w-[600px] h-[600px] opacity-5 pointer-events-none select-none mix-blend-overlay grayscale">
                    <img src="/logo.png" alt="" className="w-full h-full object-contain" />
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="flex justify-center mb-6">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-400 text-sm font-medium animate-fade-in">
                        <Code2 size={16} />
                        <span>Desarrollo Web de Alto Nivel</span>
                    </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-slide-up">
                    Forjando el <span className="text-gradient">futuro digital</span> <br />
                    de tu negocio
                </h1>

                <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    Diseño minimalista, tecnología de punta y estrategias escalables.
                    Transformamos ideas en experiencias digitales inolvidables.
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <button
                        onClick={onCtaClick}
                        className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] flex items-center gap-2 group"
                    >
                        Cotizar mi Proyecto
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-bold text-lg transition-all backdrop-blur-sm">
                        Ver Portafolio
                    </button>
                </div>
            </div>
        </section>
    );
};
