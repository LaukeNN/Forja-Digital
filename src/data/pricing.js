import { Store, Building2, Building, Monitor, Layers, ShoppingBag, Users, Database, CreditCard, MessageCircle, FileText, Globe, Server, Cloud, ShieldCheck, UtensilsCrossed, Home, Shirt, GraduationCap, Briefcase, HeartPulse } from 'lucide-react';

export const INDUSTRIES = [
    { id: 'restaurant', label: 'Restaurante / Gastronomía', icon: UtensilsCrossed },
    { id: 'real_estate', label: 'Inmobiliaria / Bienes Raíces', icon: Home },
    { id: 'fashion', label: 'Indumentaria / Moda', icon: Shirt },
    { id: 'education', label: 'Educación / Cursos', icon: GraduationCap },
    { id: 'services', label: 'Servicios Profesionales', icon: Briefcase },
    { id: 'health', label: 'Salud y Bienestar', icon: HeartPulse },
    { id: 'other', label: 'Otro / General', icon: Store }
];

export const BUSINESS_TIERS = [
    {
        id: 'entrepreneur',
        title: 'Emprendedor / Idea Nueva',
        description: 'Ideal para validar tu idea o iniciar tu presencia digital.',
        basePrice: 7000,
        icon: Store
    },
    {
        id: 'pyme',
        title: 'PyME en Crecimiento',
        description: 'Para negocios establecidos que buscan expandirse.',
        basePrice: 20000,
        icon: Building2
    },
    {
        id: 'corporate',
        title: 'Gran Empresa / Corporativo',
        description: 'Soluciones robustas y escalables de alto nivel.',
        basePrice: 50000,
        icon: Building
    }
];

export const PROJECT_TYPES = [
    {
        id: 'landing',
        title: 'Landing Page',
        description: 'Una sola página de alto impacto enfocada en conversión.',
        priceModifier: 0,
        icon: Monitor
    },
    {
        id: 'corporate_site',
        title: 'Sitio Corporativo',
        description: '5-8 secciones informativas sobre tu empresa y servicios.',
        priceModifier: 5000,
        icon: Layers
    },
    {
        id: 'webapp',
        title: 'Web App / E-commerce',
        description: 'Funcionalidad compleja, ventas en línea o gestión.',
        priceModifier: 15000,
        icon: ShoppingBag
    }
];

export const SERVICES = [
    { id: 'login', label: 'Login / Registro de Usuarios', price: 6000, icon: Users },
    { id: 'catalog', label: 'Catálogo de Productos', price: 5000, icon: ShoppingBag },
    { id: 'inventory', label: 'Sistema de Inventarios', price: 10000, icon: Database },
    { id: 'payments', label: 'Pasarela de Pagos', price: 4000, icon: CreditCard },
    { id: 'chat', label: 'Chat en Vivo / WhatsApp', price: 2000, icon: MessageCircle },
    { id: 'blog', label: 'Blog Autoadministrable', price: 3000, icon: FileText },
    { id: 'multilang', label: 'Multilenguaje', price: 2500, icon: Globe },
];

export const INFRASTRUCTURE = [
    {
        id: 'basic',
        title: 'Plan Básico',
        description: 'Hosting compartido. Ideal para Landings.',
        annualPrice: 1500,
        icon: Server
    },
    {
        id: 'pro',
        title: 'Plan Pro',
        description: 'VPS + 50GB Almacenamiento. Para Apps y PyMEs.',
        annualPrice: 5000,
        icon: Cloud
    },
    {
        id: 'enterprise',
        title: 'Plan Enterprise',
        description: 'Servidor Dedicado + Cloud Storage.',
        annualPrice: 0, // Quote
        isQuote: true,
        icon: ShieldCheck
    }
];

export const CONFIG = {
    rentSetupFeePercent: 0.20, // 20%
    rentMonthlyPercent: 0.05,  // 5%
};

// ==========================================
// CONFIGURACIÓN DEL DESCUENTO
// ==========================================
export const DISCOUNT = {
    enabled: true,              // true = mostrar descuento, false = ocultar
    percent: 35,                // Porcentaje de descuento (ej: 35 = 35%)
    label: '¡OFERTA DE LANZAMIENTO!',  // Texto del badge
    subLabel: 'Por tiempo limitado',    // Subtexto opcional
};
