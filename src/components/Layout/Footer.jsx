import React from 'react';
import { Twitter, Instagram, Linkedin, Mail, Code2 } from 'lucide-react';

const TEAM_MINI = [
    { name: "Alex", role: "Dev", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&q=80" },
    { name: "Sarah", role: "Design", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=150&q=80" },
    { name: "Mike", role: "Sys", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=150&q=80" }
];


export const Footer = () => {
    return (
        <footer className="bg-dark-card border-t border-white/5 pt-16 pb-8 relative overflow-hidden">


            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-12 mb-12">

                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <div className="flex items-center gap-3">
                            <img src="/logo.png" alt="Forja Digital" className="w-8 h-8 object-contain" />
                            <span className="text-lg font-bold tracking-tight text-white">FORJA DIGITAL</span>
                        </div>
                        <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                            Transformamos ideas complejas en experiencias digitales fluidas.
                            Especialistas en desarrollo web, aplicaciones a medida y soluciones e-commerce escalables.
                        </p>

                        {/* Team Miniatures */}
                        <div className="pt-6">
                            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Mentes Maestras</h5>
                            <div className="flex gap-3">
                                {TEAM_MINI.map((member, idx) => (
                                    <div key={idx} className="group relative w-10 h-10 rounded-full overflow-hidden border border-white/10 hover:border-brand-500 transition-colors cursor-help">
                                        <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                        <div className="absolute inset-0 bg-brand-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Code2 size={14} className="text-white" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Explorar</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-brand-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-brand-500"></span>Inicio</a></li>
                            <li><a href="#" className="hover:text-brand-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-brand-500"></span>Portafolio</a></li>
                            <li><a href="#" className="hover:text-brand-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-brand-500"></span>Servicios</a></li>
                        </ul>
                    </div>

                    {/* Contact / Payments */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Seguridad</h4>
                        <div className="flex gap-2 flex-wrap mb-6">
                            {['Visa', 'MC', 'PayPal', 'Stripe'].map(method => (
                                <div key={method} className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[10px] text-slate-400 uppercase">
                                    {method}
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
