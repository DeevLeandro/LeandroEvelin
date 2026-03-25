import React, { useEffect, useRef, useState } from 'react';
import { GIFTS, WEDDING } from '../data';
import './GiftList.css';
import PixToast from './PixToast';

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
    const pixCode = generateValidPixCode(
      gift.valor,
      WEDDING.pixChave,
      WEDDING.nomeCompleto,
      WEDDING.cidade
    );
    const toastCode = `🎁 ${gift.emoji} ${gift.nome}\n💰 R$ ${gift.valor.toFixed(2)}\n📋 ${pixCode}`;
    onPix(toastCode);
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

// Monta um campo TLV: tag de 2 dígitos + length de 2 dígitos + value
function tlv(tag, value) {
  const len = value.length.toString().padStart(2, '0');
  return `${tag}${len}${value}`;
}

function generateValidPixCode(valor, chavePix, nomeRecebedor, cidade) {
  // Garante o +55 na chave telefone
  const chave = chavePix.startsWith('+') ? chavePix : `+55${chavePix}`;

  // Valor com 2 casas decimais, mantendo o ponto: "150.00"
  const valorStr = valor.toFixed(2);

  // Bloco 26 — Merchant Account Information
  // 00 = GUI, 01 = chave Pix
  const gui  = tlv('00', 'BR.GOV.BCB.PIX');
  const key  = tlv('01', chave);
  const mai  = tlv('26', gui + key);          // tag 26 envolve os dois

  // Merchant Category Code (tag 52)
  const mcc = tlv('52', '0000');

  // Currency BRL (tag 53)
  const currency = tlv('53', '986');

  // Transaction Amount (tag 54) — ex: "150.00"
  const amount = tlv('54', valorStr);

  // Country Code (tag 58)
  const country = tlv('58', 'BR');

  // Merchant Name (tag 59) — máx 25 chars
  const nome = tlv('59', nomeRecebedor.substring(0, 25));

  // Merchant City (tag 60) — máx 15 chars
  const city = tlv('60', cidade.substring(0, 15));

  // Additional Data Field (tag 62) — txid ***
  const txid = tlv('05', '***');
  const adf  = tlv('62', txid);

  // Payload Format Indicator (tag 00) vem primeiro
  const pfi = tlv('00', '01');

  // Junta tudo (sem o CRC ainda)
  const payload = pfi + mai + mcc + currency + amount + country + nome + city + adf;

  // CRC16-CCITT (tag 63) — sempre 4 hex maiúsculos
  const crcTag = '6304';
  const crc = calcCRC16(payload + crcTag);

  return payload + crcTag + crc;
}

function calcCRC16(str) {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

export default function GiftList({ onPix }) {
  const ref = useRef(null);
  const [pixData, setPixData] = useState(null);
  const [showToast, setShowToast] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) e.target.classList.add('visible'); },
      { threshold: 0.1 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => el && observer.unobserve(el);
  }, []);

  const handlePixGenerated = (toastCode) => {
    // Extrair informações do código
    const lines = toastCode.split('\n');
    const nomeLinha = lines.find(l => l.includes('🎁'));
    const valorLinha = lines.find(l => l.includes('💰'));
    const pixLinha = lines.find(l => l.includes('📋'));
    
    const pixCode = pixLinha ? pixLinha.replace('📋 ', '') : toastCode;
    const nome = nomeLinha ? nomeLinha.replace('🎁 ', '') : '';
    const valor = valorLinha ? valorLinha.replace('💰 ', '') : '';
    
    setPixData({
      code: pixCode,
      nome: nome,
      valor: valor,
      emoji: nomeLinha ? nomeLinha.split(' ')[0] : '🎁'
    });
    setShowToast(true);
  };

  const handleCopyAndClose = () => {
    if (pixData && pixData.code) {
      navigator.clipboard.writeText(pixData.code).then(() => {
        setShowToast(false);
        // Opcional: mostrar uma mensagem de sucesso rápida
        setTimeout(() => {
          setPixData(null);
        }, 300);
      }).catch(err => {
        console.error('Erro ao copiar:', err);
        alert('Erro ao copiar o código. Por favor, copie manualmente.');
      });
    }
  };

  const handleClose = () => {
    setShowToast(false);
    setTimeout(() => {
      setPixData(null);
    }, 300);
  };

  return (
    <>
      <section className="gifts-section">
        <div className="gifts-inner">
          <div className="section-header fade-in" ref={ref}>
            <span className="section-label">✦ Lista de Presentes ✦</span>
            <h2>Presenteie o Casal</h2>
            <p>Se desejar nos presentear, clique em "Presentear" para copiar o código Pix e nos enviar seu carinho</p>
          </div>
          <div className="gifts-grid">
            {GIFTS.map((gift, i) => (
              <GiftCard key={i} gift={gift} onPix={handlePixGenerated} />
            ))}
          </div>
        </div>
      </section>
      
      <PixToast 
        show={showToast} 
        pixData={pixData}
        onCopy={handleCopyAndClose}
        onClose={handleClose}
      />
    </>
  );
}