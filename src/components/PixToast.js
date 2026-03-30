import React, { useEffect } from 'react';
import './PixToast.css';

export default function PixToast({ show, pixData, onCopy, onClose }) {
  // Efeito para fechar com ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && show) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [show, onClose]);
  
  // Se não tiver dados ou não estiver visível, não renderiza nada
  if (!show || !pixData) return null;
  
  return (
    <div className={`pix-toast ${show ? 'show' : ''}`}>
      <button className="pix-toast-close" onClick={onClose} aria-label="Fechar">
        ✕
      </button>
      
      <div className="pix-toast-header">
        <span className="pix-icon">✨</span>
        <strong>✦ CÓDIGO PIX GERADO ✦</strong>
      </div>
      
      {pixData.nome && (
        <div className="pix-gift-info">
          <div className="info-row">
            <span className="info-label">Presente:</span>
            <span className="info-value">{pixData.nome}</span>
          </div>
          {pixData.valor && (
            <div className="info-row">
              <span className="info-label">Valor:</span>
              <span className="info-value pix-amount">{pixData.valor}</span>
            </div>
          )}
        </div>
      )}
      
      <div className="pix-code-container">
        <div className="pix-code-label">📋 CÓDIGO PIX:</div>
        <div className="pix-code">{pixData.code}</div>
      </div>
      
      <div className="pix-instructions">
        <div className="instruction-step">1. Clique no botão abaixo para copiar o código</div>
        <div className="instruction-step">2. Abra o app do seu banco</div>
        <div className="instruction-step">3. Escolha "Pagar com Pix"</div>
        <div className="instruction-step">4. Selecione "Colar código Pix"</div>
        <div className="instruction-step">5. Confirme o valor e finalize</div>
      </div>
      
     <button
  className="pix-copy-button"
  onClick={() => {
    onCopy();
    alert('✅ Pix copiado!');
  }}
>
  📋 COPIAR CÓDIGO PIX
</button>
      
      <span className="pix-hint">✅ Após copiar, o código será automaticamente colado no seu banco</span>
    </div>
  );
}