import React, { useState } from 'react';
import Envelope from './components/Envelope';
import Hero from './components/Hero';
import PhotoSections from './components/PhotoSections';
import CeremonyInfo from './components/CeremonyInfo';
import GiftList from './components/GiftList';
import RSVP from './components/RSVP';
import Footer from './components/Footer';
import PixToast from './components/PixToast';
import './App.css';

function App() {
  const [opened, setOpened] = useState(false);
  const [toast, setToast] = useState({ show: false, code: '' });

  const handlePix = (code) => {
    // Copiar para área de transferência
    navigator.clipboard.writeText(code).catch(() => {});
    
    // Mostrar toast com o código
    setToast({ show: true, code });
    
    // Esconder toast após 5 segundos
    setTimeout(() => {
      setToast({ show: false, code: '' });
    }, 5000);
  };

  return (
    <>
      <Envelope opened={opened} onOpen={() => setOpened(true)} />
      <main className={`main-content ${opened ? 'visible' : ''}`}>
        <Hero />
        <PhotoSections />
        <CeremonyInfo />
        <GiftList onPix={handlePix} />
        <RSVP />
        <Footer />
      </main>
      <PixToast show={toast.show} code={toast.code} />
    </>
  );
}

export default App;