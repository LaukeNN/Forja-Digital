import React from 'react';
import { ArrowRight, Code2 } from 'lucide-react';

export const Hero = ({ onCtaClick }) => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/circuit-bg.jpg"
                    alt="Circuit Background"
                    className="w-full h-full object-cover object-center"
                />
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />

            <div className="container mx-auto px-4 relative z-10 text-center pt-8 md:pt-20">
                <div className="flex justify-center mb-8">
                    <div className="px-6 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-sm text-orange-400 text-sm font-medium tracking-wide shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                        &lt;/&gt; Desarrollo Web de Alto Nivel
                    </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white leading-tight">
                    Forjando el <span className="text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">futuro digital</span> <br />
                    de tu negocio
                </h1>

                <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                    Tecnología de punta y estrategias escalables.
                    <span className="block mt-2">Transformamos ideas en experiencias digitales inolvidables.</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <button
                        onClick={onCtaClick}
                        className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold text-lg transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 flex items-center gap-2"
                    >
                        Cotizar mi Proyecto
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
};
