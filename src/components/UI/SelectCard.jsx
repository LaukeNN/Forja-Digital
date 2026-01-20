import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export const SelectCard = ({ title, description, price, isSelected, onClick, icon: Icon, isQuote, priceSuffix }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={clsx(
                "cursor-pointer p-4 md:p-6 rounded-xl border transition-all duration-300 flex flex-row md:flex-col items-center text-left md:text-center gap-3 md:gap-4 h-full",
                isSelected
                    ? "bg-brand-500/10 border-brand-500 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                    : "bg-dark-card border-dark-border hover:border-brand-500/50 hover:bg-dark-card/80"
            )}
        >
            {Icon && (
                <div className={clsx(
                    "p-2 md:p-3 rounded-full mb-0 md:mb-2 shrink-0",
                    isSelected ? "bg-brand-500 text-white" : "bg-slate-800 text-slate-400 group-hover:text-brand-500"
                )}>
                    <Icon size={24} className="md:w-8 md:h-8" />
                </div>
            )}
            <div className="flex-1">
                <h3 className={clsx("text-base md:text-lg font-bold mb-1 md:mb-2", isSelected ? "text-white" : "text-slate-200")}>
                    {title}
                </h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed line-clamp-2 md:line-clamp-none">
                    {description}
                </p>
            </div>
            {price !== undefined && (
                <div className="mt-auto pt-4 text-brand-400 font-semibold">
                    {isQuote ? 'Consultar' : (price === 0 && !priceSuffix ? 'Ya incluido' : `+$${price.toLocaleString()}${priceSuffix || ''}`)}
                </div>
            )}
        </motion.div>
    );
};
