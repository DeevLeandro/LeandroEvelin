import React, { useEffect, useRef } from 'react';
import { GIFTS, WEDDING } from '../data';
import './GiftList.css';

function GiftCard({ gift, onPix }) {
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

  const handlePix = () => {
    const code = `PIX: ${WEDDING.pixChave} | VALOR: ${gift.valor.toFixed(2)} | DESC: ${gift.nome}`;
    onPix(code);
  };

  return (
    <div className="gift-card fade-in" ref={ref}>
      <div className="gift-card-img">
        <span className="gift-emoji">{gift.emoji}</span>
        <span className="gift-tag">{gift.tag}</span>
      </div>
      <div className="gift-body">
        <h3 className="gift-name">{gift.nome}</h3>
        <p className="gift-desc">{gift.desc}</p>
        <div className="gift-price">
          <small>R$</small> {gift.valor.toLocaleString('pt-BR')}<small>,00</small>
        </div>
        <button className="btn-gift" onClick={handlePix}>
          ✦ Presentear
        </button>
      </div>
    </div>
  );
}

export default function GiftList({ onPix }) {
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

  return (
    <section className="gifts-section">
      <div className="gifts-inner">
        <div className="section-header fade-in" ref={ref}>
          <span className="section-label">✦ Lista de Presentes ✦</span>
          <h2>Presenteie o Casal</h2>
          <p>Se desejar nos presentear, clique em "Presentear" para copiar o código Pix e nos enviar seu carinho</p>
        </div>
        <div className="gifts-grid">
          {GIFTS.map((gift, i) => (
            <GiftCard key={i} gift={gift} onPix={onPix} />
          ))}
        </div>
      </div>
    </section>
  );
}
