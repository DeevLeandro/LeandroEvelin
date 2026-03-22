import React from 'react';
import './PixToast.css';

export default function PixToast({ show, code }) {
  return (
    <div className={`pix-toast ${show ? 'show' : ''}`}>
      <strong>✦ Código Pix Copiado ✦</strong>
      <div className="pix-code">{code}</div>
      <span className="pix-hint">Cole no app do seu banco para pagar</span>
    </div>
  );
}
