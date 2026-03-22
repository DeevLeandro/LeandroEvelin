// Footer.js
import React from 'react';
import { WEDDING } from '../data';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-monogram">L &amp; E</div>
      <p className="footer-date">{WEDDING.dataBadge.dia} · {WEDDING.dataBadge.mes} · {WEDDING.dataBadge.ano} &nbsp;·&nbsp; {WEDDING.local}</p>
      <p className="footer-love">Com amor, {WEDDING.noivo} &amp; {WEDDING.noiva}</p>
    </footer>
  );
}
export default Footer;
