import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Envelope.css';
import './particles.css';

export default function Envelope({ opened, onOpen }) {
  const audioRef = useRef(null);
  const musicRef = useRef(null);

  useEffect(() => {
    if (opened) {
      // Toca o som de papel abrindo primeiro
      const somPapel = new Audio('/paper-open.mp3');
      somPapel.volume = 0.4;
      
      // Cria o elemento de música de fundo
      const musicaFundo = new Audio('/instrumental.mp3'); // Adicione seu arquivo de música na pasta public
      musicaFundo.volume = 0.5;
      musicaFundo.loop = true; // Faz a música repetir
      
      musicRef.current = musicaFundo;
      
      // Toca o som do papel, depois a música quando terminar
      somPapel.play().catch(() => {});
      
      somPapel.onended = () => {
        musicaFundo.play().catch(() => {});
      };
      
      // Função de limpeza para parar a música quando o componente for desmontado ou o envelope fechar
      return () => {
        musicaFundo.pause();
        musicaFundo.currentTime = 0;
        somPapel.pause();
        somPapel.currentTime = 0;
      };
    } else {
      // Para a música se o envelope for fechado
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current.currentTime = 0;
      }
    }
  }, [opened]);

  return (
    <AnimatePresence>
      {!opened && (
        <motion.div
          className="envelope-scene"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            backgroundImage: `url('/images/fundo8.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* ✨ partículas mágicas */}
          <div className="particles">
            {[...Array(20)].map((_, i) => (
              <span key={i}></span>
            ))}
          </div>

          <motion.div
            className="env-wrap"
            onClick={onOpen}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="env-body">

              {/* ABA DO ENVELOPE */}
              <motion.div
                className="env-flap"
                animate={opened ? { rotateX: -160 } : { rotateX: 0 }}
                transition={{ duration: 1 }}
              />

              {/* CARTA */}
              <motion.div
                className="env-letter-fixed"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  animate={opened ? { y: -180, scale: 1.05 } : {}}
                  transition={{ duration: 1 }}
                  className="env-letter-inner"
                >
                  <div className="monogram">L&E</div>
                  <p>Amor Eterno</p>
                  <p className="verse">"O encontro do noivo com a igreja será tão lindo"</p>
                </motion.div>
              </motion.div>

              {/* SELO */}
              <motion.div
                className="wax-seal"
                animate={
                  opened
                    ? { scale: 0, rotate: 180, opacity: 0 }
                    : { scale: 1 }
                }
                transition={{ duration: 0.5 }}
              >
                ✦
              </motion.div>

              {/* BRILHO */}
              <div className="env-glow"></div>

            </div>
          </motion.div>

          <motion.p
            className="env-hint"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✦ Clique para abrir ✦
          </motion.p>

        </motion.div>
      )}
    </AnimatePresence>
  );
}