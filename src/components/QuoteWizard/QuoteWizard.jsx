import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle2, RotateCcw, HelpCircle, MessageCircle, Percent, AlertTriangle, ShieldCheck } from 'lucide-react';
import { BASE_PRICE, PROJECT_TYPES, SERVICES, INFRASTRUCTURE, CONFIG, INDUSTRIES, DISCOUNT, PRICING_RULES } from '../../data/pricing';
import { SelectCard } from '../UI/SelectCard';
import { CheckboxCard } from '../UI/CheckboxCard';

// Número de WhatsApp para contacto
const WHATSAPP_NUMBER = '526531062141';
const COMPLEX_SERVICES = ['login', 'inventory', 'payments', 'blog', 'agenda'];

export const QuoteWizard = () => {
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState({
        industry: null,   // Step 1
        projectType: null,// Step 2
        services: [],     // Step 3
        infra: null,      // Step 4
        model: 'one-time',// Step 5
        maintenance: false // Upsell mantenimiento
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showConsultation, setShowConsultation] = useState(false);

    const totalSteps = 6;

    const totalCost = useMemo(() => {
        let devTotal = 0;
        let monthlyInfraTotal = 0;

        // Precio base automatico
        devTotal += BASE_PRICE;

        // Tipo de proyecto
        if (selections.projectType) devTotal += selections.projectType.priceModifier;

        // Logic Guard: Detect Complexity Upgrade
        const isLanding = selections.projectType?.id === 'landing';
        const hasComplexService = selections.services.some(s => COMPLEX_SERVICES.includes(s));
        const isComplexUpgrade = isLanding && hasComplexService;

        if (isComplexUpgrade) {
            // Ajuste automático: Si es Landing ($6k) y agrega complejos, sube a base de Web App ($15k)
            // Diferencia: 15000 - 6000 = 9000
            devTotal += 9000;
        }

        // Step 4: Services (solo cobra los NO incluidos)
        const includedServices = selections.projectType?.includedServices || [];

        // Calcular ahorro por servicios incluidos en el paquete
        let packageSavings = 0;
        includedServices.forEach(svcId => {
            const svc = SERVICES.find(s => s.id === svcId);
            if (svc && svc.price > 0) packageSavings += svc.price;
        });

        selections.services.forEach(svcId => {
            // No cobrar si está incluido en el paquete
            if (includedServices.includes(svcId)) return;
            const svc = SERVICES.find(s => s.id === svcId);
            if (svc) devTotal += svc.price;
        });

        // Step 5: Infra
        if (selections.infra) {
            // En modelo WAAS (Renta), el hosting ya está incluido en el precio base.
            // Solo se suma en modelo One-time.
            if (selections.model === 'waas') {
                monthlyInfraTotal = 0;
            } else {
                monthlyInfraTotal += selections.infra.monthlyPrice;
            }
        }

        // Upsell: Mantenimiento mensual
        const maintenanceFee = selections.maintenance ? PRICING_RULES.MAINTENANCE_FEE : 0;
        const totalMonthlyRecurring = monthlyInfraTotal + maintenanceFee;

        // Monthly Rent Logic (Híbrida)
        let monthlyRent = 0;
        if (selections.projectType?.id === 'landing' && !isComplexUpgrade) {
            monthlyRent = 500; // Precio fijo para Landing simple
        } else {
            // Fórmula porcentual para el resto
            const monthlyRentRaw = devTotal * CONFIG.rentMonthlyPercent;
            monthlyRent = Math.ceil(monthlyRentRaw / 50) * 50;
        }

        // Discount calculations (solo aplica a desarrollo, no a mensualidades)
        const discountMultiplier = DISCOUNT.enabled ? (1 - DISCOUNT.percent / 100) : 1;
        const devTotalDiscounted = Math.ceil(devTotal * discountMultiplier);

        // Cálculo de cuotas (3 pagos)
        const installmentsPrice = Math.ceil(devTotalDiscounted / 3);

        // Setup fee is now 0, so discounted is also 0
        const setupFee = 0;
        const setupFeeDiscounted = 0;

        // La renta mensual NO tiene descuento en este modelo híbrido definitivo
        const monthlyRentDiscounted = monthlyRent;

        return {
            devTotal, // Total desarrollo sin descuento
            monthlyInfraTotal, // Infra (si aplica)
            maintenanceFee, // Fee mantenimiento opcional
            totalMonthlyRecurring, // Total mensual recurrente (Infra + Mto)
            setupFee,
            monthlyRent, // Renta base calculada
            installmentsPrice, // Valor cuota 1/3
            packageSavings, // Ahorro por servicios incluidos en paquete
            // Discounted values
            devTotalDiscounted,
            setupFeeDiscounted,
            monthlyRentDiscounted,
            discountPercent: DISCOUNT.percent,
            discountEnabled: DISCOUNT.enabled,
            discountLabel: DISCOUNT.label,
            discountSubLabel: DISCOUNT.subLabel,
            isComplexUpgrade // Export flag for UI
        };
    }, [selections]);

    const handleNext = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

    // Obtener servicios incluidos del tipo de proyecto actual
    const includedServices = selections.projectType?.includedServices || [];

    const toggleService = (id) => {
        // No permitir toggle de servicios incluidos
        if (includedServices.includes(id)) return;

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

    // Función para seleccionar tipo de proyecto y pre-seleccionar sus servicios
    const handleProjectTypeSelect = (type) => {
        setSelections(prev => {
            // Combinar servicios incluidos del nuevo tipo con los ya seleccionados (sin duplicados)
            const newIncluded = type.includedServices || [];
            const currentServices = prev.services.filter(s => !prev.projectType?.includedServices?.includes(s));
            const mergedServices = [...new Set([...newIncluded, ...currentServices])];

            return {
                ...prev,
                projectType: type,
                services: mergedServices
            };
        });
    };

    // Genera el mensaje pre-armado para WhatsApp
    const generateWhatsAppMessage = (contactName, extraDetails = '') => {
        const lines = [];

        // Header
        lines.push(`*FORJA DIGITAL*`);
        lines.push(`Cotizacion Personalizada`);
        lines.push(``);
        lines.push(`━━━━━━━━━━━━━━━━━━━━`);
        lines.push(``);

        // Info del cliente
        lines.push(`*Cliente:* ${contactName}`);
        lines.push(`*Industria:* ${selections.industry?.label || 'General'}`);
        lines.push(`*Proyecto:* ${selections.projectType?.title || 'No especificado'}`);
        lines.push(``);
        lines.push(`━━━━━━━━━━━━━━━━━━━━`);
        lines.push(``);

        // Desglose
        lines.push(`*DESGLOSE*`);
        lines.push(``);
        lines.push(`Pagina web base ........... $${BASE_PRICE.toLocaleString()}`);

        if (selections.projectType?.priceModifier > 0) {
            lines.push(`${selections.projectType?.title} ........... +$${selections.projectType?.priceModifier.toLocaleString()}`);
        }

        if (totalCost.isComplexUpgrade) {
            lines.push(`Arquitectura Web App ... +$9,000`);
        }

        // Servicios
        if (selections.services.length > 0) {
            lines.push(``);
            selections.services.forEach(svcId => {
                const svc = SERVICES.find(s => s.id === svcId);
                const isIncluded = includedServices.includes(svcId);
                if (svc) {
                    const dots = '.'.repeat(Math.max(3, 25 - svc.label.length));
                    if (isIncluded) {
                        lines.push(`${svc.label} ${dots} _Incluido_`);
                    } else {
                        lines.push(`${svc.label} ${dots} +$${svc.price.toLocaleString()}`);
                    }
                }
            });
        }

        if (selections.maintenance) {
            lines.push(`Soporte mensual ........... +$${PRICING_RULES.MAINTENANCE_FEE.toLocaleString()}/mes`);
        }

        lines.push(``);
        lines.push(`━━━━━━━━━━━━━━━━━━━━`);
        lines.push(`*TOTAL:* $${totalCost.devTotal.toLocaleString()}`);
        lines.push(`━━━━━━━━━━━━━━━━━━━━`);
        lines.push(``);

        // Hosting
        if (selections.infra) {
            lines.push(`*Hosting:* ${selections.infra.title} - $${selections.infra.monthlyPrice}/mes`);
            lines.push(``);
        }

        // Inversion
        lines.push(`*INVERSION*`);
        lines.push(``);

        if (selections.model === 'one-time') {
            lines.push(`Modalidad: Pago Unico`);
            if (totalCost.discountEnabled) {
                lines.push(``);
                lines.push(`Precio regular: ~$${totalCost.devTotal.toLocaleString()}~`);
                lines.push(`*Tu precio: $${totalCost.devTotalDiscounted.toLocaleString()}*`);
                lines.push(`_Ahorras $${(totalCost.devTotal - totalCost.devTotalDiscounted).toLocaleString()} (${totalCost.discountPercent}% OFF)_`);
            } else {
                lines.push(`*Precio: $${totalCost.devTotal.toLocaleString()}*`);
            }
            if (totalCost.totalMonthlyRecurring > 0) {
                lines.push(``);
                lines.push(`+ $${totalCost.totalMonthlyRecurring.toLocaleString()}/mes (Hosting${selections.maintenance ? ' + Soporte' : ''})`);
            }
        } else {
            const rentaBase = Math.ceil(totalCost.monthlyRent);
            const extras = totalCost.maintenanceFee;
            const totalMensual = rentaBase + extras;

            lines.push(`Modalidad: Renta Mensual`);
            lines.push(`Sin pago inicial`);
            lines.push(``);

            if (totalCost.discountEnabled) {
                const primerMes = Math.ceil(totalCost.monthlyRent * (1 - totalCost.discountPercent / 100)) + extras;
                lines.push(`*1er mes:* $${primerMes.toLocaleString()} _(${totalCost.discountPercent}% OFF)_`);
                lines.push(`*Desde 2do mes:* $${totalMensual.toLocaleString()}/mes`);
            } else {
                lines.push(`*Mensualidad:* $${totalMensual.toLocaleString()}/mes`);
            }
            lines.push(``);
            lines.push(`_Hosting incluido_`);
        }

        if (extraDetails.trim()) {
            lines.push(``);
            lines.push(`━━━━━━━━━━━━━━━━━━━━`);
            lines.push(`*Notas:* ${extraDetails}`);
        }

        lines.push(``);
        lines.push(`━━━━━━━━━━━━━━━━━━━━`);
        lines.push(`forjadigital.com`);

        return lines.join('\n');
    };

    // Abre WhatsApp con el mensaje pre-armado
    const openWhatsApp = (contactName, extraDetails = '') => {
        const message = generateWhatsAppMessage(contactName, extraDetails);
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        setIsSubmitted(true);
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const contactName = formData.get('name') || 'Cliente';
        const extraDetails = formData.get('details') || '';
        openWhatsApp(contactName, extraDetails);
    };

    // Maneja envío del formulario de consulta
    const handleConsultationSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name') || 'Cliente';
        const idea = formData.get('idea') || '';

        const message = [
            `=== CONSULTA GRATUITA - FORJA DIGITAL ===`,
            ``,
            `* Nombre: ${name}`,
            ``,
            `MI IDEA:`,
            idea,
            ``,
            `---`,
            `Solicitud desde forjadigital.com`
        ].join('\n');

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
        setShowConsultation(false);
    };

    const canProceed = () => {
        if (step === 1) return !!selections.industry;
        if (step === 2) return !!selections.projectType;
        if (step === 4) return !!selections.infra;
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
                <form onSubmit={handleConsultationSubmit} className="max-w-md mx-auto space-y-4">
                    <input name="name" type="text" placeholder="Tu nombre" required className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white focus:border-brand-500 focus:outline-none" />
                    <textarea name="idea" placeholder="Cuéntanos brevemente sobre tu idea..." required className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white h-32 focus:border-brand-500 focus:outline-none"></textarea>
                    <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2">
                        <MessageCircle size={20} /> Chatear por WhatsApp
                    </button>
                </form>
            </div>
        );
    }


    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8 relative">
            {/* Consult Banner */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setShowConsultation(true)}
                    className="text-sm text-brand-400 hover:text-brand-300 underline underline-offset-4 flex items-center gap-1"
                >
                    <HelpCircle size={14} /> ¿No sabes qué elegir? Solicita asesoría gratis
                </button>
            </div>

            {/* Discount Banner Top */}
            {totalCost.discountEnabled && !isSubmitted && step === 1 && (
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 animate-gradient-x shadow-lg shadow-green-500/20 text-white flex items-center justify-between relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                            <Percent size={28} className="text-white animate-pulse" />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl leading-none">
                                {totalCost.discountLabel}
                            </h3>
                            <p className="text-white/90 text-sm mt-1 font-medium">
                                Obtén un <span className="bg-white text-emerald-600 px-1 rounded font-bold">{totalCost.discountPercent}% OFF</span> en tu desarrollo o primer mes de renta.
                            </p>
                        </div>
                    </div>
                    <div className="hidden md:block relative z-10">
                        <span className="text-xs font-bold border border-white/30 px-3 py-1 rounded-full uppercase tracking-wider">Oferta Limitada</span>
                    </div>
                </div>
            )}

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

                    {/* STEP 2: PROJECT TYPE */}
                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h2 className="text-3xl font-bold mb-6 text-center">Tipo de Proyecto</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {PROJECT_TYPES.map(type => (
                                    <SelectCard
                                        key={type.id}
                                        {...type}
                                        price={type.priceModifier + BASE_PRICE}
                                        isSelected={selections.projectType?.id === type.id}
                                        onClick={() => handleProjectTypeSelect(type)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: SERVICES */}
                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h2 className="text-3xl font-bold mb-6 text-center">Funcionalidades Extra</h2>

                            {/* ALERTA DE COMPLEJIDAD */}
                            {totalCost.isComplexUpgrade && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg flex gap-3 items-start"
                                >
                                    <AlertTriangle className="text-yellow-500 shrink-0" />
                                    <div className="text-sm text-yellow-200">
                                        <strong>⚠️ Nota Técnica:</strong> Al seleccionar funcionalidades avanzadas (como Login o Inventarios),
                                        el proyecto requiere una arquitectura de <em>Web App</em>, lo que ajusta la inversión base.
                                    </div>
                                </motion.div>
                            )}

                            <div className="grid md:grid-cols-2 gap-4">
                                {SERVICES.map(svc => (
                                    <CheckboxCard
                                        key={svc.id}
                                        title={svc.label}
                                        price={svc.price}
                                        icon={svc.icon}
                                        isSelected={selections.services.includes(svc.id)}
                                        onToggle={() => toggleService(svc.id)}
                                        isIncluded={includedServices.includes(svc.id)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 4: INFRASTRUCTURE */}
                    {step === 4 && (
                        <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h2 className="text-3xl font-bold mb-6 text-center">Infraestructura (Hosting)</h2>
                            <div className="flex flex-wrap justify-center gap-6">
                                {INFRASTRUCTURE.map(infra => (
                                    <div key={infra.id} className="w-full md:w-1/3 max-w-[320px]">
                                        <SelectCard
                                            {...infra}
                                            title={infra.title}
                                            price={infra.monthlyPrice}
                                            priceSuffix="/mes"
                                            description={`${infra.description} Costo mensual.`}
                                            isSelected={selections.infra?.id === infra.id}
                                            onClick={() => setSelections(prev => ({ ...prev, infra }))}
                                            isQuote={infra.isQuote}
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 5: BUSINESS MODEL */}
                    {step === 5 && (
                        <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
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
                                                <div className="text-sm text-brand-400 font-medium mb-3">
                                                    O en 3 pagos de ${totalCost.installmentsPrice.toLocaleString()}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="text-4xl font-bold text-white mb-2">
                                                    ${totalCost.devTotal.toLocaleString()}
                                                </div>
                                                <div className="text-sm text-brand-400 font-medium mb-3">
                                                    O en 3 pagos de ${totalCost.installmentsPrice.toLocaleString()}
                                                </div>
                                            </>
                                        )}

                                        <div className="text-sm text-slate-400 mb-4">
                                            + ${totalCost.monthlyInfraTotal.toLocaleString()}/mes de servidor
                                        </div>
                                        <p className="text-xs text-slate-500 border-t border-slate-700 pt-3 mt-3">
                                            Eres dueño del 100% del código y propiedad intelectual.
                                        </p>
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
                                                <div className="flex items-end justify-center gap-2 mb-2">
                                                    <div className="text-4xl font-bold text-emerald-400">
                                                        ${totalCost.monthlyRent.toLocaleString()}
                                                        <span className="text-lg font-normal text-emerald-600">/mes</span>
                                                    </div>
                                                </div>
                                                <div className="text-sm font-bold text-white bg-white/10 py-1 px-3 rounded-full inline-block mb-3">
                                                    ¡Sin Pago Inicial!
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="text-4xl font-bold text-white mb-2">
                                                    ${totalCost.monthlyRent.toLocaleString()}
                                                    <span className="text-lg font-normal text-slate-500">/mes</span>
                                                </div>
                                                <div className="text-sm text-slate-400 mb-3">
                                                    Pago inicial: $0
                                                </div>
                                            </>
                                        )}
                                        <p className="text-xs text-slate-500 border-t border-slate-700 pt-3 mt-3">
                                            {(selections.projectType?.id === 'landing' && !totalCost.isComplexUpgrade)
                                                ? "Incluye Hosting y 1 cambio mensual. Dominio anual aparte."
                                                : "Modelo de suscripción. Incluye licencia de uso, hosting y soporte perpetuo."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 6: SUMMARY */}
                    {step === 6 && (
                        <motion.div key="step6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto">
                            {!isSubmitted ? (
                                <>
                                    <h2 className="text-3xl font-bold mb-8 text-center">Resumen Final</h2>

                                    {/* UPSELL: Mantenimiento (Visible en ambos modelos) */}
                                    <div className="mb-8 p-4 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-brand-500/20 rounded-lg text-brand-400">
                                                <ShieldCheck size={24} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-white text-sm md:text-base">Plan de Mantenimiento y Soporte</div>
                                                <div className="text-xs text-slate-400">Actualizaciones, respaldos y cambios menores.</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                                            <span className="text-white font-bold">+${PRICING_RULES.MAINTENANCE_FEE}/mes</span>
                                            <div
                                                onClick={() => setSelections(prev => ({ ...prev, maintenance: !prev.maintenance }))}
                                                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${selections.maintenance ? 'bg-brand-500' : 'bg-slate-600'}`}
                                            >
                                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${selections.maintenance ? 'translate-x-6' : ''}`} />
                                            </div>
                                        </div>
                                    </div>

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
                                                        <span className="text-slate-400">Página web base (Landing page)</span>
                                                        <span className="text-white">${BASE_PRICE.toLocaleString()}</span>
                                                    </div>
                                                    {selections.projectType?.priceModifier > 0 && (
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-400">Tipo: {selections.projectType?.title}</span>
                                                            <span className="text-white">+${selections.projectType?.priceModifier.toLocaleString()}</span>
                                                        </div>
                                                    )}
                                                    {totalCost.isComplexUpgrade && (
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-400">Arquitectura Web App</span>
                                                            <span className="text-white">+$9,000</span>
                                                        </div>
                                                    )}
                                                    {selections.services.map(id => {
                                                        const s = SERVICES.find(x => x.id === id);
                                                        if (!s) return null;
                                                        const isServiceIncluded = includedServices.includes(id);
                                                        return (
                                                            <div key={id} className="flex justify-between">
                                                                <span className="text-slate-400">
                                                                    {isServiceIncluded ? '' : 'Add-on: '}{s.label}
                                                                </span>
                                                                {isServiceIncluded ? (
                                                                    <span className="text-emerald-400 text-sm">Incluido</span>
                                                                ) : (
                                                                    <span className="text-white">+${s.price.toLocaleString()}</span>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                    {selections.maintenance && (
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-400">Plan de Mantenimiento & Soporte</span>
                                                            <span className="text-white font-medium text-brand-300">+${PRICING_RULES.MAINTENANCE_FEE.toLocaleString()}/mes</span>
                                                        </div>
                                                    )}

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
                                                        <div className="text-sm opacity-75">+ ${totalCost.totalMonthlyRecurring.toLocaleString()}/mes (Hosting{selections.maintenance ? ' + Soporte' : ''})</div>
                                                        {totalCost.discountEnabled && (
                                                            <div className="mt-3 text-yellow-300 text-sm font-medium">
                                                                ¡Ahorras ${(totalCost.devTotal - totalCost.devTotalDiscounted).toLocaleString()}!
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        {totalCost.discountEnabled && (
                                                            <div className="text-sm text-yellow-300 font-bold mb-1">
                                                                ¡{totalCost.discountPercent}% OFF PRIMER MES!
                                                            </div>
                                                        )}
                                                        <div className="text-4xl font-bold mb-1">
                                                            ${totalCost.discountEnabled
                                                                ? (totalCost.monthlyRentDiscounted + totalCost.maintenanceFee + totalCost.monthlyInfraTotal).toLocaleString()
                                                                : (Math.ceil(totalCost.monthlyRent) + totalCost.maintenanceFee + totalCost.monthlyInfraTotal).toLocaleString()
                                                            }
                                                            <span className="text-lg opacity-80 font-normal"> (1er Mes)</span>
                                                        </div>
                                                        <div className="text-lg opacity-80 mb-2">
                                                            Luego ${(Math.ceil(totalCost.monthlyRent) + totalCost.maintenanceFee + totalCost.monthlyInfraTotal).toLocaleString()}/mes
                                                        </div>
                                                        <div className="text-sm font-bold bg-black/20 inline-block px-3 py-1 rounded-full">
                                                            Sin Pago Inicial
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Contact Form */}
                                        <div className="space-y-4">
                                            <div className="bg-brand-500/10 border border-brand-500/30 rounded-lg p-4 mb-6">
                                                <p className="text-brand-300 text-sm text-center">
                                                    👋 <strong>¡Sin compromiso!</strong><br />
                                                    Envía tu cotización para que podamos platicar sobre tu idea.<br />
                                                    No se te cobrará nada en este momento.
                                                </p>
                                            </div>

                                            <form onSubmit={handleContactSubmit} className="space-y-4">
                                                <input name="name" required type="text" placeholder="Tu nombre" className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white focus:border-brand-500 focus:outline-none" />
                                                <textarea name="details" placeholder="Detalles adicionales (opcional)" className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-white h-24 focus:border-brand-500 focus:outline-none"></textarea>

                                                <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transform hover:-translate-y-1">
                                                    <MessageCircle size={24} />
                                                    Enviar Cotización por WhatsApp
                                                </button>
                                                <p className="text-slate-500 text-xs text-center mt-2">
                                                    Te abrirá un chat directo con nosotros para afinar detalles.
                                                </p>
                                            </form>

                                            {/* Botón para nueva cotización */}
                                            <button
                                                onClick={() => {
                                                    setStep(1);
                                                    setSelections({
                                                        industry: null,
                                                        projectType: null,
                                                        services: [],
                                                        infra: null,
                                                        model: 'one-time',
                                                        maintenance: false
                                                    });
                                                }}
                                                className="w-full mt-4 py-3 bg-brand-500/10 text-brand-400 hover:bg-brand-500 hover:text-white border border-brand-500/50 hover:border-brand-500 rounded-xl flex items-center justify-center gap-2 transition-all font-medium"
                                            >
                                                <RotateCcw size={18} /> Nueva Cotización
                                            </button>
                                        </div>
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
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setStep(1);
                                            setSelections({
                                                industry: null,
                                                projectType: null,
                                                services: [],
                                                infra: null,
                                                model: 'one-time',
                                                maintenance: false
                                            });
                                        }}
                                        className="text-brand-400 hover:text-brand-300 flex items-center gap-2 mx-auto"
                                    >
                                        <RotateCcw size={16} /> Cotizar otro proyecto
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
