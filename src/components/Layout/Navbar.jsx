import React, { useState, useEffect } from 'react';
import { Mail, Phone, ChevronDown, HelpCircle, Copy, ExternalLink, Check, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


export const Navbar = ({ onContactClick, onWhyUsClick }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (

        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2 md:py-4 bg-gray-950/80 backdrop-blur-md shadow-lg' : 'py-4 md:py-6 bg-transparent'}`}>
            <div className="container mx-auto px-4 relative flex justify-between items-center h-16 md:h-auto">
                {/* Logo (Left) */}
                <div className="flex items-center gap-4 z-50 relative">
                    <img src="/logo.png" alt="Forja Digital Logo" className="h-10 md:h-16 w-auto object-contain" />
                    <div className="hidden md:block">
                        <h1 className="text-2xl font-bold text-white leading-none tracking-tight">FORJA DIGITAL</h1>
                        <p className="text-xs text-brand-500 tracking-[0.2em] font-medium mt-1">FORJANDO TU FUTURO DIGITAL</p>
                    </div>
                </div>

                {/* Desktop Menu (Centered & Right) */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center gap-4">
                    {/* Mail Dropdown */}
                    <div className="relative group">
                        <button className="bg-dark-card/50 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm flex items-center gap-2 hover:bg-white/5 transition-colors text-slate-400 hover:text-brand-500">
                            <Mail size={18} />
                        </button>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-900 border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-brand-500/20 rounded-lg text-brand-400">
                                    <Mail size={16} />
                                </div>
                                <span className="text-white font-medium text-sm">Contáctanos</span>
                            </div>
                            <a href="mailto:forja.digital.sl@gmail.com" className="block p-2 bg-white/5 rounded-lg hover:bg-brand-500/10 transition-colors text-center">
                                <span className="text-slate-300 text-sm break-all font-mono">forja.digital.sl@gmail.com</span>
                            </a>
                        </div>
                    </div>

                    {/* Phone Dropdown */}
                    <div className="relative group">
                        <button className="bg-dark-card/50 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm flex items-center gap-2 hover:bg-white/5 transition-colors text-slate-400 hover:text-brand-500">
                            <Phone size={18} />
                        </button>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-900 border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-brand-500/20 rounded-lg text-brand-400">
                                    <Phone size={16} />
                                </div>
                                <span className="text-white font-medium text-sm">Llámanos</span>
                            </div>
                            <div className="space-y-2">
                                <a href="tel:+526531062141" className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-brand-500/10 transition-colors">
                                    <span className="text-slate-300 text-sm">+52 653 106 2141</span>
                                    <ExternalLink size={12} className="text-slate-500" />
                                </a>
                                <a href="tel:+526531463159" className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-brand-500/10 transition-colors">
                                    <span className="text-slate-300 text-sm">+52 653 146 3159</span>
                                    <ExternalLink size={12} className="text-slate-500" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <button
                        onClick={onWhyUsClick}
                        className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-brand-600/20 hover:shadow-brand-600/30 text-sm flex items-center gap-2"
                    >
                        ¿Por qué elegirnos?
                    </button>

                    {/* Services Button */}
                    <div className="z-10 relative group">
                        <button
                            className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-brand-600/20 hover:shadow-brand-600/30 text-sm flex items-center gap-2"
                        >
                            Servicios
                            <ChevronDown size={16} />
                        </button>
                        <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                            <div className="py-1">
                                {['Diseño Web', 'App Web', 'E-commerce'].map((item) => (
                                    <a
                                        key={item}
                                        href="#"
                                        className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                                    >
                                        {item}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Toggle Button */}
                <button
                    className="md:hidden text-brand-500 bg-brand-500/10 p-3 rounded-xl border border-brand-500/20 z-50 relative"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu Overlay (FULL SCREEN) */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-gray-950 z-40 md:hidden flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
                        >
                            <div className="flex flex-col gap-6 text-center">
                                {/* Main Links */}
                                <button
                                    onClick={() => { onWhyUsClick(); setIsOpen(false); }}
                                    className="text-3xl font-bold text-white py-4 hover:text-brand-500 transition-colors border-b border-white/5"
                                >
                                    ¿Por qué nosotros?
                                </button>

                                <div className="space-y-4">
                                    <div className="text-sm font-bold text-brand-500 uppercase tracking-[0.2em] mb-2">Nuestros Servicios</div>
                                    {['Diseño Web', 'App Web', 'E-commerce'].map((item) => (
                                        <button
                                            key={item}
                                            className="block w-full text-2xl font-bold text-slate-300 hover:text-white py-2 transition-colors"
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-auto space-y-4 pt-10">
                                <div className="grid grid-cols-2 gap-4">
                                    <a href="tel:+526531062141" className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/10 active:border-brand-500 active:bg-brand-500/10 transition-all">
                                        <Phone size={24} className="text-brand-500 mb-2" />
                                        <span className="text-white text-xs font-bold">+52 653 106 2141</span>
                                    </a>
                                    <a href="tel:+526531463159" className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/10 active:border-brand-500 active:bg-brand-500/10 transition-all">
                                        <Phone size={24} className="text-brand-500 mb-2" />
                                        <span className="text-white text-xs font-bold">+52 653 146 3159</span>
                                    </a>
                                </div>
                                <a href="mailto:forja.digital.sl@gmail.com" className="flex items-center justify-center gap-3 p-4 bg-brand-600 text-white rounded-2xl font-bold w-full shadow-lg shadow-brand-600/20 active:scale-95 transition-transform">
                                    <Mail size={20} />
                                    Enviar Correo
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );

};
