import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
    {
        question: "¿Cuánto tiempo tarda el desarrollo de mi web?",
        answer: "Depende de la complejidad. Una Landing Page suele tomar 3-5 días hábiles, mientras que un sitio corporativo puede tomar 2-3 semanas y una Web App más de 4 semanas."
    },
    {
        question: "¿Necesito pagar mensualidades forzosamente?",
        answer: "No. Ofrecemos dos modalidades: 'Pago Único' (tú eres dueño del código y solo pagas renovación anual de hosting) o 'Renta Mensual' (nosotros administramos todo por una cuota baja)."
    },
    {
        question: "¿El sitio web será compatible con celulares?",
        answer: "Absolutamente. Todos nuestros diseños son 'Responsive', lo que significa que se adaptan perfectamente a smartphones, tablets y computadoras de escritorio."
    },
    {
        question: "¿Incluyen dominio y hosting?",
        answer: "En nuestros planes de 'Renta Mensual' y los paquetes 'Pro', incluimos el hosting (servidor) por el primer año. El dominio (.com) también puede gestionarse con nosotros."
    },
    {
        question: "¿Puedo actualizar el contenido yo mismo?",
        answer: "Sí. Si seleccionas la opción de 'Blog Autoadministrable' o 'Catálogo', integramos un panel de control fácil de usar para que edites textos e imágenes sin saber programar."
    },
    {
        question: "¿Ofrecen soporte después de la entrega?",
        answer: "Sí. Ofrecemos 30 días de soporte gratuito tras el lanzamiento para corregir cualquier detalle. Posteriormente, puedes contratar un plan de mantenimiento opcional."
    }
];

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border border-white/5 bg-dark-card rounded-lg overflow-hidden mb-4 hover:border-brand-500/30 transition-colors">
            <button
                onClick={onClick}
                className="w-full p-4 flex items-center justify-between text-left focus:outline-none"
            >
                <span className="font-semibold text-white">{question}</span>
                <div className={`p-1 rounded-full ${isOpen ? 'bg-brand-500 text-white' : 'bg-white/10 text-slate-400'}`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 pt-0 text-slate-400 text-sm leading-relaxed border-t border-white/5">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="py-20 bg-dark-bg/50">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">Preguntas Frecuentes</h2>
                    <p className="text-slate-400">
                        Resolvemos tus dudas antes empezar tu transformación digital.
                    </p>
                </div>

                <div>
                    {FAQS.map((faq, idx) => (
                        <AccordionItem
                            key={idx}
                            {...faq}
                            isOpen={idx === openIndex}
                            onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
