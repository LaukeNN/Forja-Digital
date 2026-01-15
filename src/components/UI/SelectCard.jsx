import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export const SelectCard = ({ title, description, price, isSelected, onClick, icon: Icon, isQuote }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={clsx(
                "cursor-pointer p-6 rounded-xl border transition-all duration-300 flex flex-col items-center text-center gap-4 h-full",
                isSelected
                    ? "bg-brand-500/10 border-brand-500 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                    : "bg-dark-card border-dark-border hover:border-brand-500/50 hover:bg-dark-card/80"
            )}
        >
            {Icon && (
                <div className={clsx(
                    "p-3 rounded-full mb-2",
                    isSelected ? "bg-brand-500 text-white" : "bg-slate-800 text-slate-400 group-hover:text-brand-500"
                )}>
                    <Icon size={32} />
                </div>
            )}
            <div>
                <h3 className={clsx("text-lg font-bold mb-2", isSelected ? "text-white" : "text-slate-200")}>
                    {title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                    {description}
                </p>
            </div>
            {price !== undefined && (
                <div className="mt-auto pt-4 text-brand-400 font-semibold">
                    {isQuote ? 'Consultar' : (price === 0 ? 'Ya incluido' : `+$${price.toLocaleString()}`)}
                </div>
            )}
        </motion.div>
    );
};
