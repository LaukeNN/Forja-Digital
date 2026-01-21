import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OPENROUTER_API_KEY = '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';

const SYSTEM_PROMPT = `Eres "Forjito", el asistente virtual de Forja Digital, una agencia de desarrollo web mexicana.

REGLA CRÍTICA: Solo proporciona información que está en este prompt. Si no tienes el dato exacto, di "Te recomiendo usar nuestro cotizador interactivo para un precio exacto" o "Contacta a nuestro equipo por WhatsApp para más detalles".

=== TIPOS DE PROYECTO Y PRECIOS EXACTOS ===

1. LANDING PAGE - $6,000 MXN
   - Página única profesional
   - Incluye: Diseño Responsive + Formulario de Contacto
   
2. SITIO CORPORATIVO - $13,000 MXN
   - Múltiples secciones
   - Incluye: Diseño Responsive, Formulario de Contacto, Blog Autoadministrable, Mapa de Google Maps, SEO Básico

3. E-COMMERCE / WEB APP - $25,000 MXN
   - Tienda en línea completa sin comisiones
   - Incluye: Todo lo anterior + Login/Registro de Usuarios, Catálogo de Productos, Pasarela de Pagos, Sistema de Inventarios

=== SERVICIOS ADICIONALES CON PRECIOS ===
- Diseño Responsive (Móvil): Incluido
- Formulario de Contacto: $500 MXN
- Login / Registro de Usuarios: $3,000 MXN
- Catálogo de Productos: $3,000 MXN
- Sistema de Inventarios: $6,000 MXN
- Pasarela de Pagos (Stripe/PayPal): $6,000 MXN
- Blog Autoadministrable: $4,000 MXN
- SEO Básico: $2,000 MXN
- Multilenguaje: $1,500 MXN
- Chatbot con IA (Entrenado): $2,500 MXN
- Agenda de Citas: $2,000 MXN
- Mapa de Google Maps: $500 MXN
- Botón de WhatsApp: $500 MXN

=== PLANES DE HOSTING MENSUAL ===
- Plan Básico: $300 MXN/mes (Hosting compartido, ideal para Landings)
- Plan Pro: $500 MXN/mes (VPS + 50GB Almacenamiento, para Apps y PyMEs)

- Soporte/Mantenimiento mensual: $800 MXN/mes

=== DESCUENTO VIGENTE ===
- ¡OFERTA DE LANZAMIENTO! 25% de descuento en pago único (por tiempo limitado)

=== INDUSTRIAS QUE ATENDEMOS ===
Restaurantes, Inmobiliarias, Moda, Educación, Servicios Profesionales, Salud y Bienestar, Deportes/Fitness, y más.

=== INSTRUCCIONES DE COMPORTAMIENTO ===
1. Sé amable, profesional y conciso (2-3 oraciones máximo)
2. Responde siempre en español
3. NUNCA inventes precios o servicios que no estén en este prompt
4. Recomienda usar el cotizador interactivo del sitio para presupuestos personalizados
5. Si preguntan algo que no sabes, sugiere contactar por WhatsApp
6. Usa un tono cercano pero profesional`;

const INITIAL_MESSAGE = {
    role: 'assistant',
    content: "¡Hola! 👋 Soy Forjito, el asistente de Forja Digital. Estoy aquí para resolver tus dudas sobre desarrollo web, precios y tiempos. ¿En qué puedo ayudarte?"
};

export const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const sendMessageToOpenRouter = async (userMessage) => {
        // Prepare conversation history for API (excluding the initial greeting for context efficiency)
        const conversationHistory = messages.map(msg => ({
            role: msg.role === 'assistant' ? 'assistant' : 'user',
            content: msg.content
        }));

        // Add the new user message
        conversationHistory.push({
            role: 'user',
            content: userMessage
        });

        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'Forja Digital Chatbot'
                },
                body: JSON.stringify({
                    model: 'xiaomi/mimo-v2-flash:free',//'google/gemini-2.0-flash-001',
                    messages: [
                        { role: 'system', content: SYSTEM_PROMPT },
                        ...conversationHistory
                    ],
                    max_tokens: 500,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('OpenRouter API error:', errorData);
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('Error calling OpenRouter:', error);
            return "Lo siento, hubo un problema al procesar tu mensaje. Por favor, intenta de nuevo o contáctanos por WhatsApp.";
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage = inputValue.trim();
        const userMsg = { role: 'user', content: userMessage };

        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsLoading(true);

        try {
            const botResponse = await sendMessageToOpenRouter(userMessage);
            const botMsg = { role: 'assistant', content: botResponse };
            setMessages(prev => [...prev, botMsg]);
        } finally {
            setIsLoading(false);
        }
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
                                <h3 className="font-bold text-white text-sm">Forjito IA</h3>
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
                                        {msg.content}
                                    </div>
                                </div>
                            ))}

                            {/* Typing indicator */}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-800 text-slate-200 rounded-2xl rounded-bl-none p-3 flex items-center gap-2">
                                        <Loader2 size={16} className="animate-spin" />
                                        <span className="text-sm">Escribiendo...</span>
                                    </div>
                                </div>
                            )}

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
                                    disabled={isLoading}
                                    className="w-full bg-dark-bg border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white focus:border-brand-500 focus:outline-none placeholder:text-slate-500 disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isLoading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-500 text-white rounded-full disabled:opacity-50 disabled:bg-slate-700 hover:bg-brand-600 transition-colors"
                                >
                                    {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
