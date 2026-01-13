import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const CheckboxCard = ({ title, price, isSelected, onToggle, icon: Icon }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={onToggle}
            className={clsx(
                "cursor-pointer p-4 rounded-xl border transition-all duration-300 flex items-center justify-between gap-4",
                isSelected
                    ? "bg-brand-500/10 border-brand-500 shadow-[0_0_15px_rgba(249,115,22,0.2)]"
                    : "bg-dark-card border-dark-border hover:border-brand-500/50"
            )}
        >
            <div className="flex items-center gap-4">
                {Icon && (
                    <div className={clsx(
                        "p-2 rounded-lg",
                        isSelected ? "bg-brand-500/20 text-brand-500" : "bg-slate-800 text-slate-400"
                    )}>
                        <Icon size={20} />
                    </div>
                )}
                <span className={clsx("font-medium", isSelected ? "text-white" : "text-slate-300")}>
                    {title}
                </span>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-brand-400 font-semibold text-sm">
                    +${price.toLocaleString()}
                </span>
                <div className={clsx(
                    "w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                    isSelected ? "bg-brand-500 border-brand-500" : "border-slate-600 bg-slate-800"
                )}>
                    {isSelected && <Check size={14} className="text-white" />}
                </div>
            </div>
        </motion.div>
    );
};
