// CeremonyInfo.js
import React, { useEffect, useRef } from 'react';
import { CEREMONY } from '../data';
import './CeremonyInfo.css';

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) e.target.classList.add('visible'); },
      { threshold: 0.15 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => el && observer.unobserve(el);
  }, []);
  return ref;
}

export function CeremonyInfo() {
  const h2Ref = useFadeIn();
  const labelRef = useFadeIn();
  
  // Create refs for all cards before rendering
  const cardRefs = useRef([]);
  
  // Initialize refs array with the correct length
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, CEREMONY.length);
  }, []);

  return (
    <section className="info-section">
      <span className="section-label fade-in" ref={labelRef}>✦ Cerimônia ✦</span>
      <h2 className="fade-in" ref={h2Ref}>Informações do Dia</h2>
      <div className="info-grid">
        {CEREMONY.map((item, i) => {
          // Use a stable ref for each card
          const cardRef = (el) => {
            if (el && !cardRefs.current[i]) {
              // Create and observe when element is available
              const observer = new IntersectionObserver(
                ([e]) => { if (e.isIntersecting) e.target.classList.add('visible'); },
                { threshold: 0.15 }
              );
              observer.observe(el);
              cardRefs.current[i] = { el, observer };
            }
          };
          
          return (
            <div className="info-card fade-in" key={i} ref={cardRef}>
              <div className="info-icon">{item.icon}</div>
              <h3>{item.titulo}</h3>
              <p>{item.info.split('\n').map((line, j) => (
                <React.Fragment key={j}>{line}<br /></React.Fragment>
              ))}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CeremonyInfo;