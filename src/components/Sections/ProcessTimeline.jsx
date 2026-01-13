import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Target, PenTool, Code, TestTube, Rocket } from 'lucide-react';

const STEPS = [
    {
        title: "1. Introducción",
        desc: "Nos conocemos y entendemos tu visión.",
        icon: MessageSquare
    },
    {
        title: "2. Objetivos",
        desc: "Definimos metas claras y alcance.",
        icon: Target
    },
    {
        title: "3. Diseño UX/UI",
        desc: "Creamos la identidad visual de tu sitio.",
        icon: PenTool
    },
    {
        title: "4. Desarrollo",
        desc: "Programamos con tecnologías modernas.",
        icon: Code
    },
    {
        title: "5. Pruebas",
        desc: "Aseguramos que todo funcione perfecto.",
        icon: TestTube
    },
    {
        title: "6. Producción",
        desc: "Lanzamiento y puesta en marcha.",
        icon: Rocket
    }
];

export const ProcessTimeline = () => {
    return (
        <section className="py-20 container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">Nuestro Proceso de Forja</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Un camino estructurado y transparente para llevar tu idea desde un concepto abstracto hasta una realidad digital tangible.
                </p>
            </div>

            <div className="relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500/20 to-transparent -translate-y-1/2 transform" />

                <div className="grid grid-cols-2 md:grid-cols-6 gap-6 relative z-10">
                    {STEPS.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-dark-card border border-white/5 p-6 rounded-xl hover:border-brand-500/50 transition-all text-center flex flex-col items-center"
                        >
                            <div className="w-12 h-12 bg-dark-bg rounded-lg flex items-center justify-center text-brand-500 mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-brand-500/10">
                                <step.icon size={24} />
                            </div>
                            <h3 className="font-bold text-white mb-2">{step.title}</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
