import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Mail, Phone } from 'lucide-react';


export const Navbar = ({ onContactClick }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-dark-bg/80 backdrop-blur-md border-b border-white/5' : 'py-6 bg-transparent'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Forja Digital Logo" className="w-12 h-12 object-contain" />
                    <div className="hidden md:block">
                        <h1 className="text-xl font-bold text-white leading-none">FORJA DIGITAL</h1>
                        <p className="text-xs text-brand-500 tracking-wider">FORJANDO TU FUTURO DIGITAL</p>
                    </div>
                </div>

                {/* Social Icons (Centered on Desktop) */}
                <div className="hidden md:flex items-center gap-6 bg-dark-card/50 px-6 py-2 rounded-full border border-white/5 backdrop-blur-sm">
                    <a href="#" className="text-slate-400 hover:text-brand-500 transition-colors"><Facebook size={20} /></a>
                    <a href="#" className="text-slate-400 hover:text-brand-500 transition-colors"><Instagram size={20} /></a>
                    <a href="#" className="text-slate-400 hover:text-brand-500 transition-colors"><Mail size={20} /></a>
                    <a href="#" className="text-slate-400 hover:text-brand-500 transition-colors"><Phone size={20} /></a>
                </div>

                {/* CTA Button */}
                <button
                    onClick={onContactClick}
                    className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-brand-600/20 hover:shadow-brand-600/30 text-sm"
                >
                    Contáctanos
                </button>
            </div>
        </nav>
    );
};
