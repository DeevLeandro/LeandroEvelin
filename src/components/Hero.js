import React from 'react';
import { motion } from 'framer-motion';
import { WEDDING } from '../data';
import './Hero.css';

export default function Hero() {
  const { noivo, noiva, dataBadge, horario, local, dresscode } = WEDDING;

  return (
    <section className="hero">
      {/* Adicione a div da imagem de fundo */}
      <div 
        className="hero-bg-image" 
        style={{
            backgroundImage: `url('/images/funtoapresentacao.jpeg')`, // ← NOME DO ARQUIVO
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
      />
      
      <div className="hero-bg-glow" />
      <div className="hero-overlay" />

      <motion.div
        className="hero-ornament"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        ✦ &nbsp; Convite de Casamento &nbsp; ✦
      </motion.div>

      <motion.div
        className="hero-date-badge"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <span>{dataBadge.dia}</span> · {dataBadge.mes} · <span>{dataBadge.ano}</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        {noivo}
        <em className="hero-amp">&amp;</em>
        {noiva}
      </motion.h1>

      <motion.p
        className="hero-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        “Assim, eles já não são dois, mas sim uma só carne. Portanto, o que Deus uniu, ninguém separe.”
Mateus 19:6
      </motion.p>

      <motion.div
        className="hero-divider"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      />

      <motion.div
        className="hero-details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <div><div className="hero-detail-icon">⏰</div><span>{horario}</span></div>
        <div><div className="hero-detail-icon">📍</div><span>{local}</span></div>
        <div><div className="hero-detail-icon">🌹</div><span>{dresscode}</span></div>
      </motion.div>
    </section>
  );
}