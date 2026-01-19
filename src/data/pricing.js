import { Store, Building2, Building, Monitor, Layers, ShoppingBag, Users, Database, CreditCard, MessageCircle, FileText, Globe, Server, Cloud, ShieldCheck, UtensilsCrossed, Home, Shirt, GraduationCap, Briefcase, HeartPulse, Calendar, MapPin } from 'lucide-react';

export const INDUSTRIES = [
    { id: 'restaurant', label: 'Restaurante / Gastronomía', icon: UtensilsCrossed },
    { id: 'real_estate', label: 'Inmobiliaria / Bienes Raíces', icon: Home },
    { id: 'fashion', label: 'Indumentaria / Moda', icon: Shirt },
    { id: 'education', label: 'Educación / Cursos', icon: GraduationCap },
    { id: 'services', label: 'Servicios Profesionales', icon: Briefcase },
    { id: 'health', label: 'Salud y Bienestar', icon: HeartPulse },
    { id: 'other', label: 'Otro / General', icon: Store }
];

// Precio base que se suma a todas las cotizaciones
export const BASE_PRICE = 6000;

export const PROJECT_TYPES = [
    {
        id: 'landing',
        title: 'Personaliza tu Sitio Web',
        description: 'Sitio web ya armado que puedes personalizar. Tú eliges las funcionalidades que necesitas.',
        priceModifier: 0,
        includedServices: [], // El usuario elige las funcionalidades
        icon: Monitor
    },
    {
        id: 'corporate_site',
        title: 'Sitio Corporativo',
        description: 'Pagina Web Base + 2-5 secciones informativas. Incluye Login y Blog.',
        priceModifier: 7000,
        includedServices: ['login', 'blog'], // Login + Blog incluidos
        icon: Layers
    },
    {
        id: 'webapp',
        title: 'Web App / E-commerce',
        description: 'Pagina Web Base + Tienda en línea o sistema de gestión. Todo incluido.',
        priceModifier: 12000,
        includedServices: ['login', 'catalog', 'payments'], // Login + Catálogo + Pagos
        icon: ShoppingBag
    }
];

export const SERVICES = [
    { id: 'login', label: 'Login / Registro de Usuarios', price: 3000, icon: Users },
    { id: 'catalog', label: 'Catálogo de Productos', price: 3000, icon: ShoppingBag },
    { id: 'inventory', label: 'Sistema de Inventarios', price: 6000, icon: Database },
    { id: 'payments', label: 'Pasarela de Pagos', price: 6000, icon: CreditCard },
    { id: 'blog', label: 'Blog Autoadministrable', price: 4000, icon: FileText },
    { id: 'multilang', label: 'Multilenguaje', price: 1500, icon: Globe },
    { id: 'chatbot', label: 'Chatbot con IA (Entrenado)', price: 2500, icon: MessageCircle },
    { id: 'agenda', label: 'Agenda de Citas', price: 2000, icon: Calendar },
    { id: 'google_maps', label: 'Mapa en Google Maps (Negocio Local)', price: 500, icon: MapPin },
    { id: 'whatsapp_button', label: 'Botón de WhatsApp (Con mensaje pre-armado)', price: 500, icon: MessageCircle }
];

export const INFRASTRUCTURE = [
    {
        id: 'basic',
        title: 'Plan Básico',
        description: 'Hosting compartido. Ideal para Landings.',
        monthlyPrice: 300,
        icon: Server
    },
    {
        id: 'pro',
        title: 'Plan Pro',
        description: 'VPS + 50GB Almacenamiento. Para Apps y PyMEs.',
        monthlyPrice: 500,
        icon: Cloud
    }
];

export const CONFIG = {
    rentSetupFeePercent: 0.15, // 15%
    rentMonthlyPercent: 1 / 6, // 16.66% (~6 meses de retorno)
};

// ==========================================
// CONFIGURACIÓN DEL DESCUENTO
// ==========================================
export const DISCOUNT = {
    enabled: true,              // true = mostrar descuento, false = ocultar
    percent: 25,                // Porcentaje de descuento (ej: 35 = 35%)
    label: '¡OFERTA DE LANZAMIENTO!',  // Texto del badge
    subLabel: 'Por tiempo limitado',    // Subtexto opcional
};
