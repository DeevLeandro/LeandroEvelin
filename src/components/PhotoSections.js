import React, { useEffect, useRef } from 'react';
import { PHOTOS } from '../data';
import './PhotoSections.css';

function PhotoSection({ photo, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.15 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => el && observer.unobserve(el);
  }, []);

  return (
    <section className="photo-section">
      <div
        className="photo-bg"
        style={{ backgroundImage: `url(${photo.url})` }}
      />
      <div className="photo-overlay" />
      <div className="photo-text fade-in" ref={ref}>
        <div className="photo-number">0{index + 1}</div>
        <div className="photo-line" />
        <h2>{photo.titulo.split('\n').map((line, i) => (
          <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
        ))}</h2>
        <p>{photo.sub}</p>
      </div>
    </section>
  );
}

export default function PhotoSections() {
  return (
    <>
      {PHOTOS.map((photo, i) => (
        <PhotoSection key={i} photo={photo} index={i} />
      ))}
    </>
  );
}
