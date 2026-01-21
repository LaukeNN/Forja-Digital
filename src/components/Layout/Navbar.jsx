import React, { useState, useEffect } from 'react';
import { Mail, Phone, Menu, X, ChevronRight, MessageCircle } from 'lucide-react';

export const Navbar = ({ onWhyUsClick }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Cerrar menú en desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Bloquear scroll cuando el menú está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <>
            {/* Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-gray-900/95 backdrop-blur-md shadow-lg shadow-black/20'
                : 'bg-gray-900/80 backdrop-blur-sm'
                }`}>
                <div className="container mx-auto px-4 h-14 md:h-16 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-2 md:gap-3">
                        <img src="/logo.png" alt="Forja Digital" className="h-8 md:h-10 w-auto" />
                        <div>
                            <h1 className="text-sm md:text-lg font-bold text-white leading-tight">FORJA DIGITAL</h1>
                            <p className="text-[8px] md:text-[10px] text-brand-500 tracking-wider md:tracking-widest uppercase">Forjando tu futuro digital</p>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Email Dropdown */}
                        <div className="relative group">
                            <button className="p-2 rounded-lg bg-white/10 hover:bg-brand-500/20 text-white transition-colors">
                                <Mail size={18} />
                            </button>
                            <div className="absolute top-full right-0 mt-2 w-64 bg-gray-800 border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-brand-500/20 rounded-lg text-brand-400">
                                        <Mail size={16} />
                                    </div>
                                    <span className="text-white font-medium text-sm">Contáctanos</span>
                                </div>
                                <a href="mailto:forja.digital.sl@gmail.com" className="block p-2 bg-white/5 rounded-lg hover:bg-brand-500/10 transition-colors text-center">
                                    <span className="text-slate-300 text-sm break-all">forja.digital.sl@gmail.com</span>
                                </a>
                            </div>
                        </div>

                        {/* Phone Dropdown */}
                        <div className="relative group">
                            <button className="p-2 rounded-lg bg-white/10 hover:bg-brand-500/20 text-white transition-colors">
                                <Phone size={18} />
                            </button>
                            <div className="absolute top-full right-0 mt-2 w-56 bg-gray-800 border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-brand-500/20 rounded-lg text-brand-400">
                                        <Phone size={16} />
                                    </div>
                                    <span className="text-white font-medium text-sm">Llámanos</span>
                                </div>
                                <div className="space-y-2">
                                    <a href="tel:+526531062141" className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-brand-500/10 transition-colors">
                                        <span className="text-slate-300 text-sm">+52 653 106 2141</span>
                                    </a>
                                    <a href="https://wa.me/526531463159" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-brand-500/10 transition-colors">
                                        <span className="text-slate-300 text-sm">+52 653 146 3159</span>
                                        <MessageCircle size={14} className="text-brand-400" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={onWhyUsClick}
                            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-medium text-sm transition-colors"
                        >
                            ¿Por qué elegirnos?
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="relative w-5 h-5">
                            <span className={`absolute left-0 w-5 h-0.5 bg-white rounded transition-all duration-300 ${isOpen ? 'top-2 rotate-45' : 'top-0.5'}`} />
                            <span className={`absolute left-0 top-2 w-5 h-0.5 bg-white rounded transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100'}`} />
                            <span className={`absolute left-0 w-5 h-0.5 bg-white rounded transition-all duration-300 ${isOpen ? 'top-2 -rotate-45' : 'top-3.5'}`} />
                        </div>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay - Slide from right */}
            <div
                className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />

                {/* Menu Panel */}
                <div
                    className={`absolute top-0 right-0 h-full w-72 bg-gradient-to-b from-gray-900 to-gray-950 shadow-2xl transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    {/* Menu Header */}
                    <div className="h-14 flex items-center justify-between px-4 border-b border-white/10">
                        <span className="text-sm font-semibold text-white/80">Menú</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X size={20} className="text-white/70" />
                        </button>
                    </div>

                    {/* Menu Content */}
                    <div className="p-4 space-y-3">
                        {/* CTA Button */}
                        <button
                            onClick={() => { onWhyUsClick?.(); setIsOpen(false); }}
                            className="w-full py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-shadow flex items-center justify-center gap-2"
                        >
                            ¿Por qué elegirnos?
                            <ChevronRight size={16} />
                        </button>

                        <div className="pt-2">
                            <p className="text-xs text-white/40 uppercase tracking-wider mb-3 px-1">Contacto</p>

                            {/* Phone Links */}
                            <a
                                href="tel:+526531062141"
                                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors mb-2"
                            >
                                <div className="p-2 bg-brand-500/20 rounded-lg">
                                    <Phone size={16} className="text-brand-400" />
                                </div>
                                <div>
                                    <p className="text-white text-sm font-medium">+52 653 106 2141</p>
                                    <p className="text-white/40 text-xs">Llamar ahora</p>
                                </div>
                            </a>

                            <a
                                href="https://wa.me/526531463159"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors mb-2"
                            >
                                <div className="p-2 bg-brand-500/20 rounded-lg">
                                    <MessageCircle size={16} className="text-brand-400" />
                                </div>
                                <div>
                                    <p className="text-white text-sm font-medium">+52 653 146 3159</p>
                                    <p className="text-white/40 text-xs">WhatsApp</p>
                                </div>
                            </a>

                            {/* Email Link */}
                            <a
                                href="mailto:forja.digital.sl@gmail.com"
                                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                            >
                                <div className="p-2 bg-brand-500/20 rounded-lg">
                                    <Mail size={16} className="text-brand-400" />
                                </div>
                                <div>
                                    <p className="text-white text-sm font-medium truncate">forja.digital.sl@gmail.com</p>
                                    <p className="text-white/40 text-xs">Enviar correo</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                            <img src="/logo.png" alt="Forja Digital" className="h-6 w-auto opacity-60" />
                            <span className="text-xs text-white/40">© 2026 Forja Digital</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
