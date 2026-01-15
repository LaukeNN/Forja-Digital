import React from 'react';
import { Twitter, Instagram, Linkedin, Mail, Code2, Phone } from 'lucide-react';

const TEAM_MINI = [
    { name: "Alex", role: "Dev", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&q=80" },
    { name: "Sarah", role: "Design", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=150&q=80" },
    { name: "Mike", role: "Sys", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=150&q=80" }
];


export const Footer = () => {
    return (
        <footer className="bg-dark-card border-t border-white/5 pt-16 pb-8 relative overflow-hidden">


            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-12 mb-12 items-center">

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

                    {/* Team Miniatures (Center) */}
                    <div className="flex flex-col items-center">
                        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Mentes Maestras</h5>
                        <div className="flex gap-3">
                            {TEAM_MINI.map((member, idx) => (
                                <div key={idx} className="group relative w-12 h-12 rounded-full overflow-hidden border border-white/10 hover:border-brand-500 transition-colors cursor-help">
                                    <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                    <div className="absolute inset-0 bg-brand-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Code2 size={16} className="text-white" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact (Right) */}
                    <div className="text-right">
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Contáctanos</h4>
                        <div className="space-y-2 text-slate-400 text-sm">
                            <div className="flex items-center justify-end gap-2 group">
                                <span className="group-hover:text-brand-400 transition-colors">+52 55 1234 5678</span>
                                <Phone size={16} className="text-brand-500" />
                            </div>
                            <div className="flex items-center justify-end gap-2 group">
                                <span className="group-hover:text-brand-400 transition-colors">+52 55 8765 4321</span>
                                <Phone size={16} className="text-brand-500" />
                            </div>
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
