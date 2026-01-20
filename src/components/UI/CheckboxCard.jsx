import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Check, Lock } from 'lucide-react';

export const CheckboxCard = ({ title, price, isSelected, onToggle, icon: Icon, isIncluded }) => {
    return (
        <motion.div
            whileHover={!isIncluded ? { scale: 1.02 } : {}}
            onClick={!isIncluded ? onToggle : undefined}
            className={clsx(
                "p-3 md:p-4 rounded-xl border transition-all duration-300 flex items-center justify-between gap-4",
                isIncluded
                    ? "bg-emerald-500/10 border-emerald-500/50 cursor-default"
                    : isSelected
                        ? "cursor-pointer bg-brand-500/10 border-brand-500 shadow-[0_0_15px_rgba(249,115,22,0.2)]"
                        : "cursor-pointer bg-dark-card border-dark-border hover:border-brand-500/50"
            )}
        >
            <div className="flex items-center gap-4">
                {Icon && (
                    <div className={clsx(
                        "p-2 rounded-lg",
                        isIncluded
                            ? "bg-emerald-500/20 text-emerald-500"
                            : isSelected
                                ? "bg-brand-500/20 text-brand-500"
                                : "bg-slate-800 text-slate-400"
                    )}>
                        <Icon size={20} />
                    </div>
                )}
                <span className={clsx("font-medium", isIncluded || isSelected ? "text-white" : "text-slate-300")}>
                    {title}
                </span>
            </div>

            <div className="flex items-center gap-3">
                <span className={clsx(
                    "font-semibold text-sm",
                    isIncluded ? "text-emerald-400" : "text-brand-400"
                )}>
                    {isIncluded ? 'Incluido' : `+$${price.toLocaleString()}`}
                </span>
                <div className={clsx(
                    "w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                    isIncluded
                        ? "bg-emerald-500 border-emerald-500"
                        : isSelected
                            ? "bg-brand-500 border-brand-500"
                            : "border-slate-600 bg-slate-800"
                )}>
                    {isIncluded ? <Lock size={12} className="text-white" /> : isSelected && <Check size={14} className="text-white" />}
                </div>
            </div>
        </motion.div>
    );
};
