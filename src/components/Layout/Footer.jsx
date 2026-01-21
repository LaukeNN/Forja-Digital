import React from 'react';
import { Twitter, Instagram, Linkedin, Mail, Code2, Phone } from 'lucide-react';
import { TEAM } from './Team';

// Datos adicionales del equipo para el footer (teléfonos)
const TEAM_PHONES = {
    "Alvaro Garcia Maxwell": "+52 653 146 3159",
    "Rene Ayala S": "+52 653 106 2141"
};



export const Footer = () => {
    return (
        <footer className="bg-dark-card border-t border-white/5 pt-16 pb-8 relative overflow-hidden">


            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 mb-12 items-start">

                    {/* Brand Column (Left) */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <img src="/logo.png" alt="Forja Digital" className="w-8 h-8 object-contain" />
                            <span className="text-lg font-bold tracking-tight text-white">FORJA DIGITAL</span>
                        </div>
                        <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                            Transformamos ideas complejas en experiencias digitales fluidas.
                            Especialistas en desarrollo web, aplicaciones a medida y soluciones e-commerce escalables.
                        </p>
                    </div>

                    {/* Team (Right) */}
                    <div>
                        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">Mentes Maestras</h5>
                        <div className="grid grid-cols-2 gap-6">
                            {TEAM.map((member, idx) => (
                                <div key={idx} className="flex gap-4 group">
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-brand-500 transition-colors shadow-lg flex-shrink-0">
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white font-medium text-sm">{member.name}</span>
                                        <span className="text-brand-400 text-xs">{member.role}</span>
                                        <p className="text-slate-500 text-xs mt-1 leading-relaxed">{member.bio}</p>
                                        <a href={`tel:${TEAM_PHONES[member.name]?.replace(/\s/g, '')}`} className="text-slate-500 text-xs mt-2 hover:text-brand-400 transition-colors flex items-center gap-1">
                                            <Phone size={10} />
                                            {TEAM_PHONES[member.name]}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} Forja Digital. Forjando tu futuro digital.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-white transition-colors">Términos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
