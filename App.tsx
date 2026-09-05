import React, { ReactNode, useState } from 'react';
import { HashRouter, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import TriageCTA from './components/TriageCTA';
import StartTriage from './components/StartTriage';
import Gallery from './components/Gallery';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Sitemap from './components/Sitemap';
import BackToTop from './components/BackToTop';
import WhatsAppButton from './components/WhatsAppButton';
import TrainingHighlight from './components/TrainingHighlight';
import FirstAidRadar from './components/FirstAidRadar';

/**
 * ------------------------------------------------------------------
 * CONFIGURAÇÃO DE ROTEAMENTO HÍBRIDO (AGRESSIVO)
 * ------------------------------------------------------------------
 */

const checkPreviewEnvironment = (): boolean => {
  const hostname = window.location.hostname;
  const href = window.location.href;
  
  const proxyIndicators = [
    'googleusercontent',
    'webcontainer',
    'shim',
    '.goog',
    'scf.usercontent',
    'stackblitz',
    'codesandbox',
    'localhost',
    '127.0.0.1'
  ];

  return proxyIndicators.some(indicator => 
    hostname.includes(indicator) || href.includes(indicator)
  );
};

const LandingPage: React.FC = () => {
  const [isTriageOpen, setIsTriageOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans selection:bg-emergency-red selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <TrainingHighlight />
        <FirstAidRadar />
        <TriageCTA onOpen={() => setIsTriageOpen(true)} />
        <Gallery />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      
      {/* Elementos flutuantes ocultos durante a triagem para não atrapalhar no mobile */}
      {!isTriageOpen && (
        <>
          <BackToTop />
          <WhatsAppButton />
        </>
      )}

      {/* Modal do Simulador renderizado na raiz da Landing Page */}
      <StartTriage 
        isOpen={isTriageOpen} 
        onClose={() => setIsTriageOpen(false)} 
      />
    </div>
  );
};

interface RouterProps {
  children: ReactNode;
}

const EnvironmentRouter: React.FC<RouterProps> = ({ children }) => {
  const isPreview = checkPreviewEnvironment();

  if (isPreview) {
    return <HashRouter>{children}</HashRouter>;
  }

  return <BrowserRouter>{children}</BrowserRouter>;
};

function App() {
  return (
    <EnvironmentRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/lp-oficial" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </EnvironmentRouter>
  );
}

export default App;