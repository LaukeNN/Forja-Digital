import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_MESSAGE = {
    role: 'bot',
    text: "Hola. Soy el asistente de Forja Digital. Estoy aquí para resolver tus dudas sobre desarrollo web, precios y tiempos. ¿En qué puedo ayudarte?"
};

const KNOWLEDGE_BASE = {
    keywords: {
        pricing: ["precio", "costo", "cuanto", "vale", "tarifa"],
        time: ["tiempo", "tarda", "duracion", "entrega"],
        services: ["servicios", "hacen", "ofrecen", "que hacen"],
        contact: ["contacto", "telefono", "whatsapp", "mail", "correo"],
        ecommerce: ["tienda", "vender", "ecommerce", "online", "carrito"],
        webapp: ["app", "aplicacion", "plataforma", "software"],
        design: ["diseño", "logo", "branding", "identidad"]
    },
    responses: {
        pricing: "Nuestros planes base inician en $7,000 MXN. El costo final depende de la complejidad. Puedes usar nuestro cotizador para un estimado exacto.",
        time: "Landings toman 3-5 días. Sitios corporativos 2-3 semanas. Proyectos complejos +4 semanas.",
        services: "Desarrollamos sitios web, aplicaciones web a medida, e-commerce y branding digital.",
        contact: "Puedes contactarnos vía formulario al final de la página o directamente por WhatsApp.",
        ecommerce: "Creamos tiendas en línea seguras con pasarelas de pago (Stripe, Paypal) y gestión de inventario.",
        webapp: "Desarrollamos software a medida (SaaS, CRMs, Dashboards) usando React y tecnologías modernas.",
        design: "Ofrecemos diseño UI/UX premium. No hacemos solo logos, creamos identidades digitales completas.",
        default: "Entiendo. ¿Podrías ser más específico? Puedo hablarte sobre precios, tiempos o nuestros servicios de desarrollo."
    }
};

const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase();

    for (const [category, words] of Object.entries(KNOWLEDGE_BASE.keywords)) {
        if (words.some(word => lowerInput.includes(word))) {
            return KNOWLEDGE_BASE.responses[category];
        }
    }
    return KNOWLEDGE_BASE.responses.default;
};

export const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg = { role: 'user', text: inputValue };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");

        // Simulate delay
        setTimeout(() => {
            const botMsg = { role: 'bot', text: getBotResponse(userMsg.text) };
            setMessages(prev => [...prev, botMsg]);
        }, 600);
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-brand-500 hover:bg-brand-600 rounded-full flex items-center justify-center shadow-lg shadow-brand-500/30 text-white transition-all"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] bg-dark-card border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="p-4 bg-brand-600 flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                                <Bot size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">Asistente IA</h3>
                                <p className="text-brand-100 text-xs flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> En línea
                                </p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                                ? 'bg-brand-500 text-white rounded-br-none'
                                                : 'bg-slate-800 text-slate-200 rounded-bl-none'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-3 border-t border-white/5 bg-dark-bg/50">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Escribe tu pregunta..."
                                    className="w-full bg-dark-bg border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white focus:border-brand-500 focus:outline-none placeholder:text-slate-500"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-500 text-white rounded-full disabled:opacity-50 disabled:bg-slate-700 hover:bg-brand-600 transition-colors"
                                >
                                    <Send size={14} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
