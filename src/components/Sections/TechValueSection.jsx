import React from 'react';
import { Cpu, ShieldCheck, TrendingUp, Code2, Server, Rocket } from 'lucide-react';

export const TechValueSection = () => {
    const cards = [
        {
            icon: Code2,
            title: "Desarrollo a Medida",
            subtitle: "Stack Moderno",
            description: "Adiós a los sitios lentos de WordPress o Wix. Programamos cada línea de código a medida usando tecnologías de Facebook (React) y Google, garantizando una velocidad extrema y escalabilidad total.",
            gradient: "from-blue-500/20 to-indigo-500/20",
            border: "border-blue-500/30",
            iconColor: "text-blue-400"
        },
        {
            icon: ShieldCheck,
            title: "Infraestructura Propia",
            subtitle: "Seguridad Militar",
            description: "Tus datos no viven en nubes compartidas lentas. Contamos con servidores propios de alto rendimiento y certificados SSL incluidos para máxima seguridad y control.",
            gradient: "from-brand-500/20 to-orange-600/20",
            border: "border-brand-500/30",
            iconColor: "text-brand-400"
        },
        {
            icon: TrendingUp,
            title: "Inversión Inteligente",
            subtitle: "Valor Real",
            description: "Un sitio barato sale caro cuando falla o no vende. Nuestros desarrollos son activos digitales diseñados para convertir visitas en clientes y crecer contigo sin límites técnicos.",
            gradient: "from-emerald-500/20 to-green-600/20",
            border: "border-emerald-500/30",
            iconColor: "text-emerald-400"
        }
    ];

    const techStack = [
        { name: "React", color: "text-cyan-400" },
        { name: "Vite", color: "text-purple-400" },
        { name: "Python", color: "text-yellow-300" },
        { name: "Tailwind", color: "text-teal-400" },
        { name: "Linux", color: "text-slate-300" }
    ];

    return (
        <section className="py-24 bg-dark-bg relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-brand-500 font-bold tracking-wider text-sm uppercase mb-2 block">
                        Ingeniería de Software
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        No vendemos plantillas. <br />
                        <span className="text-brand-400">Construimos Activos Digitales.</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Mientras otros configuran temas, nosotros diseñamos arquitecturas.
                        Tu negocio merece una base técnica sólida, rápida y segura.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {cards.map((card, idx) => (
                        <div
                            key={idx}
                            className={`bg-dark-card border ${card.border} p-8 rounded-2xl relative group hover:-translate-y-2 transition-transform duration-300`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />

                            <div className="relative z-10">
                                <div className={`w-14 h-14 rounded-xl bg-dark-bg border border-white/10 flex items-center justify-center mb-6 ${card.iconColor}`}>
                                    <card.icon size={28} strokeWidth={1.5} />
                                </div>

                                <div className="mb-4">
                                    <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${card.iconColor}`}>
                                        {card.subtitle}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">
                                        {card.title}
                                    </h3>
                                </div>

                                <p className="text-slate-400 leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tech Stack Bar */}
                <div className="border-t border-white/5 pt-12">
                    <p className="text-center text-slate-500 text-sm mb-8 uppercase tracking-widest">
                        Powered by Advanced Tech Stack
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
                        {techStack.map((tech, idx) => (
                            <span key={idx} className={`text-2xl md:text-3xl font-bold ${tech.color} opacity-50 hover:opacity-100 transition-opacity cursor-default`}>
                                {tech.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
