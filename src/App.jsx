import React, { useRef } from 'react';
import { Navbar } from './components/Layout/Navbar';
import { Hero } from './components/Layout/Hero';
import { QuoteWizard } from './components/QuoteWizard/QuoteWizard';
import { ProcessTimeline } from './components/Sections/ProcessTimeline';
import { FAQSection } from './components/Sections/FAQSection';
import { Footer } from './components/Layout/Footer';
import { ChatBot } from './components/AI/ChatBot';
import { Team } from './components/Layout/Team';

function App() {
  const wizardRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToWizard = () => {
    wizardRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    // For now, scroll to wizard as it has the contact form at the end, 
    // or we could add a specific contact section if requested. 
    // Given the flow, the wizard IS the main contact point.
    wizardRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-200 font-sans selection:bg-brand-500/30">

      <Navbar onContactClick={scrollToContact} />

      <main>
        <Hero onCtaClick={scrollToWizard} />

        <ProcessTimeline />

        <section ref={wizardRef} className="py-24 relative bg-dark-bg/50">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
          <div className="container mx-auto px-4 mb-16 text-center">
            <h2 className="text-4xl font-bold mb-4 text-white">Configura tu Solución</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Utiliza nuestro asistente interactivo para diseñar el paquete perfecto.
              Sin compromisos.
            </p>
          </div>
          <QuoteWizard />
        </section>

        <FAQSection />
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;
