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

        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-gray-950/80 backdrop-blur-md border-b border-white/5 shadow-lg' : 'py-6 bg-transparent'}`}>
            <div className="container mx-auto px-4 relative flex justify-between items-center">
                {/* Logo (Left) */}
                <div className="flex items-center gap-4 z-10">
                    <img src="/logo.png" alt="Forja Digital Logo" className="h-16 w-auto object-contain" />
                    <div className="hidden md:block">
                        <h1 className="text-2xl font-bold text-white leading-none tracking-tight">FORJA DIGITAL</h1>
                        <p className="text-xs text-brand-500 tracking-[0.2em] font-medium mt-1">FORJANDO TU FUTURO DIGITAL</p>
                    </div>
                </div>

                {/* Social Icons (Absolutely Centered) */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center gap-6 bg-dark-card/50 px-6 py-2 rounded-full border border-white/5 backdrop-blur-sm z-10">
                    <a href="#" className="text-slate-400 hover:text-brand-500 transition-colors"><Facebook size={20} /></a>
                    <a href="#" className="text-slate-400 hover:text-brand-500 transition-colors"><Instagram size={20} /></a>
                    <a href="#" className="text-slate-400 hover:text-brand-500 transition-colors"><Mail size={20} /></a>
                    <a href="#" className="text-slate-400 hover:text-brand-500 transition-colors"><Phone size={20} /></a>
                </div>

                {/* CTA Button (Right) */}
                <div className="z-10">
                    <button
                        onClick={onContactClick}
                        className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-brand-600/20 hover:shadow-brand-600/30 text-sm"
                    >
                        Contáctanos
                    </button>
                </div>
            </div>
        </nav>
    );

};
