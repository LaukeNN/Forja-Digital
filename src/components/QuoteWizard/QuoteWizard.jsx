import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Send, CheckCircle2, RotateCcw, HelpCircle, ArrowRight } from 'lucide-react';
import { BUSINESS_TIERS, PROJECT_TYPES, SERVICES, INFRASTRUCTURE, CONFIG, INDUSTRIES, DISCOUNT } from '../../data/pricing';
import { SelectCard } from '../UI/SelectCard';
import { CheckboxCard } from '../UI/CheckboxCard';

export const QuoteWizard = () => {
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState({
        industry: null,   // Step 1 (New)
        tier: null,       // Step 2 (Old 1)
        projectType: null,// Step 3 (Old 2)
        services: [],     // Step 4 (Old 3)
        infra: null,      // Step 5 (Old 4)
        model: 'one-time' // Step 6 (Old 5)
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showConsultation, setShowConsultation] = useState(false);

    const totalSteps = 7; // Increased by 1

    const totalCost = useMemo(() => {
        let devTotal = 0;
        let annualTotal = 0;

        // Step 2: Base
        if (selections.tier) devTotal += selections.tier.basePrice;

        // Step 3: Complexity
        if (selections.projectType) devTotal += selections.projectType.priceModifier;

        // Step 4: Services
        selections.services.forEach(svcId => {
            const svc = SERVICES.find(s => s.id === svcId);
            if (svc) devTotal += svc.price;
        });

        // Step 5: Infra
        if (selections.infra) annualTotal += selections.infra.annualPrice;

        // WAAS Calculations
        const setupFee = devTotal * CONFIG.rentSetupFeePercent;

        // Monthly Rent = (5% of Dev) + (Annual Infra / 12)
        const monthlyRent = (devTotal * CONFIG.rentMonthlyPercent) + (annualTotal / 12);

        // Discount calculations
        const discountMultiplier = DISCOUNT.enabled ? (1 - DISCOUNT.percent / 100) : 1;
        const devTotalDiscounted = Math.ceil(devTotal * discountMultiplier);
        const setupFeeDiscounted = Math.ceil(setupFee * discountMultiplier);
        const monthlyRentDiscounted = Math.ceil(monthlyRent * discountMultiplier);

        return {
            devTotal,
            annualTotal,
            setupFee,
            monthlyRent,
            // Discounted values
            devTotalDiscounted,
            setupFeeDiscounted,
            monthlyRentDiscounted,
            discountPercent: DISCOUNT.percent,
            discountEnabled: DISCOUNT.enabled,
            discountLabel: DISCOUNT.label,
            discountSubLabel: DISCOUNT.subLabel,
        };
    }, [selections]);

    const handleNext = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

    const toggleService = (id) => {
        setSelections(prev => {
            const exists = prev.services.includes(id);
            return {
                ...prev,
                services: exists
                    ? prev.services.filter(s => s !== id)
                    : [...prev.services, id]
            };
        });
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        console.log("Enviando configuración:", selections, totalCost);
        setIsSubmitted(true);
    };

    const canProceed = () => {
        if (step === 1) return !!selections.industry;
        if (step === 2) return !!selections.tier;
        if (step === 3) return !!selections.projectType;
        if (step === 5) return !!selections.infra;
        return true;
    };

    if (showConsultation) {
        return (
            <div className="w-full max-w-4xl mx-auto p-8 bg-dark-card/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl animate-fade-in relative z-10">
                <button onClick={() => setShowConsultation(false)} className="text-slate-400 hover:text-white mb-6 flex items-center gap-2">
                    <ChevronLeft size={20} /> Volver al cotizador
                </button>
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-brand-500/20 text-brand-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HelpCircle size={32} />
                    </div>
                    <h2 className="text-3xl font-bold mb-2 text-white">Consulta Gratuita con Expertos</h2>
                    <p className="text-slate-400">¿Tu proyecto es único o tienes dudas? Hablemos directamente.</p>
                </div>
                <form className="max-w-md mx-auto space-y-4">
                    <input type="text" placeholder="Nombre completo" className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white focus:border-brand-500 focus:outline-none" />
                    <input type="tel" placeholder="WhatsApp" className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white focus:border-brand-500 focus:outline-none" />
                    <textarea placeholder="Cuéntanos brevemente sobre tu idea..." className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white h-32 focus:border-brand-500 focus:outline-none"></textarea>
                    <button type="submit" className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2">
                        Solicitar Llamada <ArrowRight size={20} />
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
            {/* Consult Banner */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setShowConsultation(true)}
                    className="text-sm text-brand-400 hover:text-brand-300 underline underline-offset-4 flex items-center gap-1"
                >
                    <HelpCircle size={14} /> ¿No sabes qué elegir? Solicita asesoría gratis
                </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-sm mb-2 text-slate-400">
                    <span>Paso {step} de {totalSteps}</span>
                    <span>{Math.round((step / totalSteps) * 100)}% Completado</span>
                </div>
                <div className="h-2 bg-dark-card rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-brand-400 to-brand-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${(step / totalSteps) * 100}%` }}
                    />
                </div>
            </div>

            <div className="bg-dark-card/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-10 shadow-2xl min-h-[550px] relative overflow-hidden">
                <AnimatePresence mode="wait">

                    {/* STEP 1: INDUSTRY (NEW) */}
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h2 className="text-3xl font-bold mb-6 text-center">Selecciona tu Industria</h2>
                            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
                                {INDUSTRIES.map(ind => (
                                    <SelectCard
                                        key={ind.id}
                                        title={ind.label}
                                        icon={ind.icon}
                                        isSelected={selections.industry?.id === ind.id}
                                        onClick={() => setSelections(prev => ({ ...prev, industry: ind }))}
                                        description="" // Hide description for compact grid
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: BUSINESS TIER */}
                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h2 className="text-3xl font-bold mb-6 text-center">Etapa del Negocio</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {BUSINESS_TIERS.map(tier => (
                                    <SelectCard
                                        key={tier.id}
                                        {...tier}
                                        price={tier.basePrice}
                                        isSelected={selections.tier?.id === tier.id}
                                        onClick={() => setSelections(prev => ({ ...prev, tier }))}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: PROJECT TYPE */}
                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h2 className="text-3xl font-bold mb-6 text-center">Tipo de Proyecto</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {PROJECT_TYPES.map(type => (
                                    <SelectCard
                                        key={type.id}
                                        {...type}
                                        price={type.priceModifier}
                                        isSelected={selections.projectType?.id === type.id}
                                        onClick={() => setSelections(prev => ({ ...prev, projectType: type }))}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 4: SERVICES */}
                    {step === 4 && (
                        <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h2 className="text-3xl font-bold mb-6 text-center">Funcionalidades Extra</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {SERVICES.map(svc => (
                                    <CheckboxCard
                                        key={svc.id}
                                        title={svc.label}
                                        price={svc.price}
                                        icon={svc.icon}
                                        isSelected={selections.services.includes(svc.id)}
                                        onToggle={() => toggleService(svc.id)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 5: INFRASTRUCTURE */}
                    {step === 5 && (
                        <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h2 className="text-3xl font-bold mb-6 text-center">Infraestructura (Hosting)</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {INFRASTRUCTURE.map(infra => (
                                    <SelectCard
                                        key={infra.id}
                                        {...infra}
                                        title={infra.title}
                                        price={infra.annualPrice}
                                        description={`${infra.description} Costo anual.`}
                                        isSelected={selections.infra?.id === infra.id}
                                        onClick={() => setSelections(prev => ({ ...prev, infra }))}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 6: BUSINESS MODEL */}
                    {step === 6 && (
                        <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h2 className="text-3xl font-bold mb-4 text-center">Modelo de Inversión</h2>

                            {/* Discount Banner */}
                            {totalCost.discountEnabled && (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    className="mb-8 text-center"
                                >
                                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg shadow-green-500/30 animate-pulse">
                                        <span className="text-white font-black text-xl">{totalCost.discountPercent}% OFF</span>
                                        <span className="text-white/90 font-medium">{totalCost.discountLabel}</span>
                                    </div>
                                    {totalCost.discountSubLabel && (
                                        <p className="text-emerald-400 text-sm mt-2">{totalCost.discountSubLabel}</p>
                                    )}
                                </motion.div>
                            )}

                            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                                {/* One Time Payment Card */}
                                <div
                                    onClick={() => setSelections(prev => ({ ...prev, model: 'one-time' }))}
                                    className={`p-8 rounded-2xl border cursor-pointer transition-all ${selections.model === 'one-time' ? 'bg-brand-500/10 border-brand-500 ring-2 ring-brand-500/20' : 'bg-dark-card border-dark-border hover:bg-dark-card/80'}`}
                                >
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold text-white mb-2">Pago Único</h3>
                                        <p className="text-slate-400 mb-6">Desarrollo completo de tu propiedad.</p>

                                        {totalCost.discountEnabled ? (
                                            <>
                                                <div className="text-xl text-slate-500 line-through mb-1">
                                                    ${totalCost.devTotal.toLocaleString()}
                                                </div>
                                                <div className="text-4xl font-bold text-emerald-400 mb-2">
                                                    ${totalCost.devTotalDiscounted.toLocaleString()}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-4xl font-bold text-white mb-2">
                                                ${totalCost.devTotal.toLocaleString()}
                                            </div>
                                        )}

                                        <div className="text-sm text-slate-400">
                                            + ${totalCost.annualTotal.toLocaleString()}/año de servidor
                                        </div>
                                    </div>
                                </div>

                                {/* WAAS Card */}
                                <div
                                    onClick={() => setSelections(prev => ({ ...prev, model: 'waas' }))}
                                    className={`p-8 rounded-2xl border cursor-pointer transition-all ${selections.model === 'waas' ? 'bg-brand-500/10 border-brand-500 ring-2 ring-brand-500/20' : 'bg-dark-card border-dark-border hover:bg-dark-card/80'}`}
                                >
                                    <div className="text-center">
                                        <div className="inline-block px-3 py-1 rounded-full bg-brand-500 text-white text-xs font-bold mb-4">RECOMENDADO</div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Renta Mensual</h3>
                                        <p className="text-slate-400 mb-6">Tu sitio como servicio. Todo incluido.</p>

                                        {totalCost.discountEnabled ? (
                                            <>
                                                <div className="text-xl text-slate-500 line-through mb-1">
                                                    ${Math.ceil(totalCost.monthlyRent).toLocaleString()}/mes
                                                </div>
                                                <div className="text-4xl font-bold text-emerald-400 mb-2">
                                                    ${totalCost.monthlyRentDiscounted.toLocaleString()}
                                                    <span className="text-lg font-normal text-emerald-300">/mes</span>
                                                </div>
                                                <div className="text-sm text-slate-400">
                                                    Pago inicial: <span className="line-through">${Math.ceil(totalCost.setupFee).toLocaleString()}</span> <span className="text-emerald-400 font-medium">${totalCost.setupFeeDiscounted.toLocaleString()}</span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="text-4xl font-bold text-white mb-2">
                                                    ${Math.ceil(totalCost.monthlyRent).toLocaleString()}
                                                    <span className="text-lg font-normal text-slate-500">/mes</span>
                                                </div>
                                                <div className="text-sm text-slate-400">
                                                    Pago inicial: ${Math.ceil(totalCost.setupFee).toLocaleString()}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 7: SUMMARY */}
                    {step === 7 && (
                        <motion.div key="step7" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto">
                            {!isSubmitted ? (
                                <>
                                    <h2 className="text-3xl font-bold mb-8 text-center">Resumen Final</h2>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div className="bg-dark-card p-6 rounded-xl border border-dark-border">
                                                <div className="flex items-center gap-2 mb-4 border-b border-dark-border pb-2">
                                                    {selections.industry && <selections.industry.icon size={20} className="text-brand-500" />}
                                                    <h3 className="text-xl font-bold text-white">
                                                        {selections.industry?.label || "Proyecto General"}
                                                    </h3>
                                                </div>

                                                <div className="space-y-3">
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-400">Perfil: {selections.tier?.title}</span>
                                                        <span className="text-white">${selections.tier?.basePrice.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-400">Tipo: {selections.projectType?.title}</span>
                                                        <span className="text-white">+${selections.projectType?.priceModifier.toLocaleString()}</span>
                                                    </div>
                                                    {selections.services.map(id => {
                                                        const s = SERVICES.find(x => x.id === id);
                                                        return (
                                                            <div key={id} className="flex justify-between">
                                                                <span className="text-slate-400">Add-on: {s.label}</span>
                                                                <span className="text-white">+${s.price.toLocaleString()}</span>
                                                            </div>
                                                        );
                                                    })}
                                                    <div className="flex justify-between pt-4 border-t border-dark-border font-bold">
                                                        <span className="text-white">Valor Desarrollo</span>
                                                        <span className="text-brand-400">${totalCost.devTotal.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-gradient-to-br from-emerald-600 to-green-700 p-6 rounded-xl text-white text-center relative overflow-hidden">
                                                {/* Discount Badge */}
                                                {totalCost.discountEnabled && (
                                                    <div className="absolute top-0 right-0 bg-yellow-400 text-black font-black px-4 py-1 text-sm transform rotate-0 rounded-bl-lg">
                                                        -{totalCost.discountPercent}%
                                                    </div>
                                                )}

                                                <p className="opacity-80 mb-2">Tu inversión seleccionada:</p>
                                                {selections.model === 'one-time' ? (
                                                    <>
                                                        {totalCost.discountEnabled && (
                                                            <div className="text-xl opacity-60 line-through mb-1">${totalCost.devTotal.toLocaleString()}</div>
                                                        )}
                                                        <div className="text-4xl font-bold mb-1">
                                                            ${totalCost.discountEnabled ? totalCost.devTotalDiscounted.toLocaleString() : totalCost.devTotal.toLocaleString()}
                                                        </div>
                                                        <div className="text-sm opacity-75">+ ${totalCost.annualTotal.toLocaleString()}/año (Hosting)</div>
                                                        {totalCost.discountEnabled && (
                                                            <div className="mt-3 text-yellow-300 text-sm font-medium">
                                                                ¡Ahorras ${(totalCost.devTotal - totalCost.devTotalDiscounted).toLocaleString()}!
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        {totalCost.discountEnabled && (
                                                            <div className="text-xl opacity-60 line-through mb-1">${Math.ceil(totalCost.monthlyRent).toLocaleString()}/mes</div>
                                                        )}
                                                        <div className="text-4xl font-bold mb-1">
                                                            ${totalCost.discountEnabled ? totalCost.monthlyRentDiscounted.toLocaleString() : Math.ceil(totalCost.monthlyRent).toLocaleString()}/mes
                                                        </div>
                                                        <div className="text-sm opacity-75">
                                                            Setup: ${totalCost.discountEnabled ? totalCost.setupFeeDiscounted.toLocaleString() : Math.ceil(totalCost.setupFee).toLocaleString()}
                                                        </div>
                                                        {totalCost.discountEnabled && (
                                                            <div className="mt-3 text-yellow-300 text-sm font-medium">
                                                                ¡Ahorras ${(Math.ceil(totalCost.monthlyRent) - totalCost.monthlyRentDiscounted).toLocaleString()}/mes!
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Contact Form */}
                                        <form onSubmit={handleContactSubmit} className="space-y-4">
                                            {/* Standard Fields... */}
                                            <input required type="text" placeholder="Nombre completo" className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white focus:border-brand-500 focus:outline-none" />
                                            <input required type="email" placeholder="Correo electrónico" className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white focus:border-brand-500 focus:outline-none" />
                                            <input required type="tel" placeholder="WhatsApp / Teléfono" className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white focus:border-brand-500 focus:outline-none" />
                                            <textarea placeholder="Cuéntanos más detalles..." className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white h-32 focus:border-brand-500 focus:outline-none"></textarea>

                                            <button type="submit" className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all">
                                                <Send size={20} />
                                                Enviar y Agendar
                                            </button>
                                        </form>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-20">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                                    >
                                        <CheckCircle2 size={48} className="text-white" />
                                    </motion.div>
                                    <h2 className="text-4xl font-bold text-white mb-4">¡Solicitud Enviada!</h2>
                                    <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
                                        Analizaremos tu requerimiento para {selections.industry?.label || "tu negocio"}.
                                        Te responderemos vía WhatsApp en menos de 24 horas.
                                    </p>
                                    <button
                                        onClick={() => { setIsSubmitted(false); setStep(1); }}
                                        className="text-brand-400 hover:text-brand-300 flex items-center gap-2 mx-auto"
                                    >
                                        <RotateCcw size={16} /> Crear nueva cotización
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            {!isSubmitted && (
                <div className="flex justify-between mt-8">
                    <button
                        onClick={handleBack}
                        disabled={step === 1}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <ChevronLeft size={20} /> Anterior
                    </button>

                    {step < totalSteps && (
                        <button
                            onClick={handleNext}
                            disabled={!canProceed()}
                            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all shadow-lg ${canProceed() ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-brand-500/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                        >
                            Siguiente <ChevronRight size={20} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
