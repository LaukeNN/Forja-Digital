import { Store, Building2, Building, Monitor, Layers, ShoppingBag, Users, Database, CreditCard, MessageCircle, FileText, Globe, Server, Cloud, ShieldCheck, UtensilsCrossed, Home, Shirt, GraduationCap, Briefcase, HeartPulse, Calendar, MapPin, Trophy } from 'lucide-react';

export const INDUSTRIES = [
    { id: 'restaurant', label: 'Restaurante / Gastronomía', icon: UtensilsCrossed },
    { id: 'real_estate', label: 'Inmobiliaria / Bienes Raíces', icon: Home },
    { id: 'fashion', label: 'Indumentaria / Moda', icon: Shirt },
    { id: 'education', label: 'Educación / Cursos', icon: GraduationCap },
    { id: 'services', label: 'Servicios Profesionales', icon: Briefcase },
    { id: 'health', label: 'Salud y Bienestar', icon: HeartPulse },
    { id: 'sports', label: 'Deportes / Fitness', icon: Trophy },
    { id: 'other', label: 'Otro / General', icon: Store }
];

// ==========================================
// REGLAS DE PRECIOS
// ==========================================
export const PRICING_RULES = {
    LANDING_BASE: 6000,       // Precio base Landing
    WEB_APP_BASE: 15000,      // Precio si agregan complejidad a Landing
    ECOMMERCE_BASE: 25000,    // Precio E-commerce completo
    MAINTENANCE_FEE: 800,     // Soporte mensual (upsell)
};

// Precio base que se suma a todas las cotizaciones
export const BASE_PRICE = PRICING_RULES.LANDING_BASE;

export const PROJECT_TYPES = [
    {
        id: 'landing',
        title: 'Landing Page',
        description: 'Página única profesional. Incluye Diseño, Responsive y Formulario de Contacto.',
        priceModifier: 0,
        includedServices: ['responsive', 'contact_form'],
        icon: Monitor
    },
    {
        id: 'corporate_site',
        title: 'Sitio Corporativo',
        description: 'Múltiples secciones + Blog Autoadministrable + Mapa + SEO Básico.',
        priceModifier: 7000, // Total: $13,000
        includedServices: ['responsive', 'contact_form', 'blog', 'google_maps', 'seo'],
        icon: Layers
    },
    {
        id: 'webapp',
        title: 'E-commerce / Web App',
        description: 'Negocio llave en mano sin comisiones. Tienda a medida, Panel de Control Total, Pagos y Usuarios.',
        priceModifier: 19000, // Total: $25,000
        // CRÍTICO: Incluye TODOS los servicios complejos para justificar el precio
        includedServices: ['responsive', 'contact_form', 'login', 'catalog', 'payments', 'inventory', 'blog', 'seo'],
        icon: ShoppingBag
    }
];

// SERVICIOS - Con marcador isComplex para detectar salto de precio
export const SERVICES = [
    { id: 'responsive', label: 'Diseño Responsive (Móvil)', price: 0, icon: Monitor, isComplex: false },
    { id: 'contact_form', label: 'Formulario de Contacto', price: 500, icon: MessageCircle, isComplex: false },
    { id: 'login', label: 'Login / Registro de Usuarios', price: 3000, icon: Users, isComplex: true },
    { id: 'catalog', label: 'Catálogo de Productos', price: 3000, icon: ShoppingBag, isComplex: false },
    { id: 'inventory', label: 'Sistema de Inventarios', price: 6000, icon: Database, isComplex: true },
    { id: 'payments', label: 'Pasarela de Pagos', price: 6000, icon: CreditCard, isComplex: true },
    { id: 'blog', label: 'Blog Autoadministrable', price: 4000, icon: FileText, isComplex: true },
    { id: 'seo', label: 'SEO Básico', price: 2000, icon: Globe, isComplex: false },
    { id: 'multilang', label: 'Multilenguaje', price: 1500, icon: Globe, isComplex: false },
    { id: 'chatbot', label: 'Chatbot con IA (Entrenado)', price: 2500, icon: MessageCircle, isComplex: false },
    { id: 'agenda', label: 'Agenda de Citas', price: 2000, icon: Calendar, isComplex: true },
    { id: 'google_maps', label: 'Mapa en Google Maps', price: 500, icon: MapPin, isComplex: false },
    { id: 'whatsapp_button', label: 'Botón de WhatsApp', price: 500, icon: MessageCircle, isComplex: false }
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
    rentMonthlyPercent: 0.125, // 12.5% del desarrollo como renta mensual
};

// ==========================================
// CONFIGURACIÓN DEL DESCUENTO
// ==========================================
export const DISCOUNT = {
    enabled: true,              // true = mostrar descuento, false = ocultar
    percent: 25,                // Porcentaje de descuento (solo aplica a pago único)
    label: '¡OFERTA DE LANZAMIENTO!',
    subLabel: 'Por tiempo limitado',
};
