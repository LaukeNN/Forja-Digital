import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const TEAM = [
    {
        name: "Alvaro Maxwell",
        role: "Cofundador & Lead Developer",
        image: "/alvaro.png",
        bio: "Visionario tecnológico enfocado en soluciones escalables y arquitectura de software."
    },
    {
        name: "Rene Ayala",
        role: "Cofundador & Tech Lead",
        image: "/rene.png",
        bio: "Especialista en desarrollo full-stack y optimización de experiencia de usuario."
    }
];

export const Team = () => {
    return (
        <section className="py-20 border-t border-white/5 bg-dark-bg">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Mentes Maestras</h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Liderando la innovación digital con pasión y excelencia técnica.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {TEAM.map((member, idx) => (
                        <div key={idx} className="group relative bg-dark-card border border-white/5 rounded-2xl overflow-hidden hover:border-brand-500/30 transition-all duration-500">
                            <div className="aspect-[4/3] overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6 relative">
                                <div className="absolute -top-10 right-6 bg-brand-500 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg rotate-12 group-hover:rotate-0 transition-all duration-300">
                                    <Code2 size={24} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                <p className="text-brand-400 text-sm font-medium mb-3">{member.role}</p>
                                <p className="text-slate-400 text-sm">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Icon component needed here since I used it but didn't import it correctly in the code block above
const Code2 = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" />
    </svg>
);
