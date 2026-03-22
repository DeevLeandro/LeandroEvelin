import React, { useState, useEffect, useRef } from 'react';
import { WEDDING } from '../data';
import './RSVP.css';

export default function RSVP() {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('Nenhum acompanhante');
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) e.target.classList.add('visible'); },
      { threshold: 0.1 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => el && observer.unobserve(el);
  }, []);

  const handleConfirm = () => {
    if (!name.trim()) {
      alert('Por favor, insira seu nome 🌹');
      return;
    }
    const msg = encodeURIComponent(
      `Eu, ${name}, junto com ${guests}, confirmo presença no seu dia especial!`
    );
    window.open(`https://wa.me/${WEDDING.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <section className="rsvp-section">
      <div className="rsvp-glow" />

      <span className="section-label rsvp-label fade-in" ref={ref}>✦ Confirmação ✦</span>
      <h2 className="rsvp-title">Confirme sua Presença</h2>
      <p className="rsvp-lead">Responda até 31 de Maio de 2026 · Sua presença é o maior presente</p>

      <div className="rsvp-form">
        <div className="field-group">
          <label htmlFor="rsvp-name">Seu Nome Completo</label>
          <input
            id="rsvp-name"
            type="text"
            placeholder="Como você gostaria de ser chamado(a)?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field-group">
          <label htmlFor="rsvp-guests">Acompanhantes</label>
          <select
            id="rsvp-guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          >
            <option value="Nenhum acompanhante">Vou sozinho(a)</option>
            <option value="1 acompanhante">1 acompanhante</option>
            <option value="2 acompanhantes">2 acompanhantes</option>
            <option value="3 acompanhantes">3 acompanhantes</option>
            <option value="4 acompanhantes">4 acompanhantes</option>
            <option value="4 acompanhantes">5 acompanhantes</option>
          </select>
        </div>
        <button className="btn-confirm" onClick={handleConfirm}>
          ✦ &nbsp; Confirmar Presença &nbsp; ✦
        </button>
      </div>
    </section>
  );
}
