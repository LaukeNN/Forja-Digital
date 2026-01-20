import React, { useState, useEffect } from 'react';
import { Mail, Phone, Menu, X } from 'lucide-react';

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

    return (
        <>
            {/* Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'py-2 bg-gray-900 shadow-xl'
                : 'py-3 bg-gray-900/90'
                }`}>
                <div className="container mx-auto px-4 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="Forja Digital" className="h-10 w-auto" />
                        <div className="hidden sm:block">
                            <h1 className="text-lg font-bold text-white">FORJA DIGITAL</h1>
                            <p className="text-[10px] text-brand-500 tracking-widest">FORJANDO TU FUTURO DIGITAL</p>
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
                                    <a href="tel:+526531463159" className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-brand-500/10 transition-colors">
                                        <span className="text-slate-300 text-sm">+52 653 146 3159</span>
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
                        className="md:hidden p-2 text-white bg-white/10 rounded-lg"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-gray-900 pt-20 md:hidden">
                    <div className="p-6 space-y-6">
                        <button
                            onClick={() => { onWhyUsClick?.(); setIsOpen(false); }}
                            className="w-full py-4 bg-brand-600 text-white rounded-xl font-bold text-lg"
                        >
                            ¿Por qué elegirnos?
                        </button>

                        <div className="grid grid-cols-2 gap-4">
                            <a
                                href="tel:+526531062141"
                                className="flex flex-col items-center p-4 bg-white/5 rounded-xl border border-white/10"
                            >
                                <Phone size={24} className="text-brand-500 mb-2" />
                                <span className="text-white text-sm font-medium">Llamar</span>
                            </a>
                            <a
                                href="mailto:forja.digital.sl@gmail.com"
                                className="flex flex-col items-center p-4 bg-white/5 rounded-xl border border-white/10"
                            >
                                <Mail size={24} className="text-brand-500 mb-2" />
                                <span className="text-white text-sm font-medium">Email</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
