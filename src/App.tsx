/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Camera, Instagram, MapPin, Phone, Panda } from 'lucide-react';
import tattoo1 from './assets/tattoo1.png';
import tattoo2 from './assets/tattoo2.png';
import tattoo3 from './assets/tattoo3.png';
import tattoo4 from './assets/tattoo4.png';
import tattoo5 from './assets/tattoo5.png';
import tattoo6 from './assets/tattoo6.png';

// Recipe 4: Dark Luxury / Travel vibe for the Tattoo Studio
const TATTOO_GALLERY = [
  { id: 2, url: tattoo2, title: '22/12/2025' },
  { id: 1, url: tattoo1, title: '19/12/2025' },
  { id: 3, url: tattoo3, title: '02/01/2026' },
  { id: 4, url: tattoo4, title: '16/01/2026' },
  { id: 6, url: tattoo6, title: '23/01/2026' },
  { id: 5, url: tattoo5, title: '29/01/2026' },
];

export default function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [alreadyRedeemed, setAlreadyRedeemed] = useState(false);
  
  // Estados para o formulário de contato
  const [nome, setNome] = useState('');
  const [ideia, setIdeia] = useState('');

  useEffect(() => {
    const hasRedeemed = localStorage.getItem('malaquias_tattoo_redeemed');
    if (hasRedeemed) {
      setAlreadyRedeemed(true);
    }
    setShowPopup(true);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    if (!alreadyRedeemed) {
      localStorage.setItem('malaquias_tattoo_redeemed', 'true');
      setAlreadyRedeemed(true);
    }
  };

  // Função para abrir o WhatsApp do popup (desconto)
  const handleSendMessage = () => {
    window.open('https://wa.me/5519971159607?text=Olá! Vi o desconto no site e gostaria de agendar uma sessão.', '_blank');
    handleClosePopup();
  };

  // Função para abrir o WhatsApp com os dados do FORMULÁRIO
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Evita que a página recarregue
    
    const numero = "5519971159607";
    const mensagem = `Olá, meu nome é ${nome}, quero fazer uma tattoo de ${ideia}`;
    
    // Codifica a mensagem para o formato de URL
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      
      {/* Gallery Section */}
      <main id="gallery" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2 block">Malaquias_Tatto</span>
            <h2 className="text-4xl font-light tracking-tight">Trabalhos Recentes</h2>
          </div>
          <p className="text-white/40 max-w-xs text-sm leading-relaxed">
             Entre agulhas e tinta, encontrei minha verdadeira forma de expressão. 
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TATTOO_GALLERY.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900"
            >
              <img 
                src={item.url} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <span className="text-xs uppercase tracking-widest text-white/60 mb-1">{item.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Contact Section */}
      <section id="contact" className="bg-zinc-950 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <img src="/src/assets/logo.png" alt="Logo Malaquias Tattoo" className="w-32 h-32 object-contain mb-1" style={{filter: 'brightness(0) invert(1)'}} />
            <h2 className="text-4xl font-light mb-8">Agende sua Sessão</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white/60">
                <MapPin className="w-5 h-5" />
                <span>Rua Edvaldo Osorio Pereira da Silva, Pirassununga</span>
              </div>
              <div className="flex items-center gap-4 text-white/60">
                <Phone className="w-5 h-5" />
                <span>(19) 97115-9607</span>
              </div>
              <div className="flex items-center gap-4 text-white/60">
                <Instagram className="w-5 h-5" />
                <span>@mlqs_tatto</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input 
                type="text" 
                placeholder="Nome" 
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full bg-transparent border border-white/10 rounded-xl p-4 focus:outline-none focus:border-white/40 transition-colors" 
              />
              <textarea 
                placeholder="Sua ideia de tattoo..." 
                rows={4} 
                required
                value={ideia}
                onChange={(e) => setIdeia(e.target.value)}
                className="w-full bg-transparent border border-white/10 rounded-xl p-4 focus:outline-none focus:border-white/40 transition-colors" 
              />
              <button 
                type="submit"
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors uppercase tracking-widest text-sm"
              >
                Enviar Ideia
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-white/20 text-xs uppercase tracking-[0.4em]">
        &copy; 2025 Malaquias Tattoo Studio. Produzido por <a href="https://wa.me/5519998859745?text=Eae%2C%20Vim%20pelo%20site%20de%20Tatuagem!"><u>Ilda</u></a>.
      </footer>

      {/* Discount Popup */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClosePopup}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <button 
                onClick={handleClosePopup}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-10 text-center">

                
                {alreadyRedeemed ? (
                  <>
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Panda className="w-8 h-8 text-white" />
                </div>
                    <h2 className="text-3xl font-light mb-4">Desconto de hoje já foi <br /> resgatado por outro!</h2>
                    <p className="text-white/60 mb-8 leading-relaxed">
                      Caso foi você que resgatou, mande um print dessa tela mesmo para o WhatsApp para validar seu desconto!
                    </p>
                      <button 
                        onClick={handleSendMessage}
                        className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm shadow-xl shadow-white/5 "
                      >
                        <MessageCircle className="w-5 h-5" />
                        Enviar Mensagem
                      </button>
                    {/* <button 
                      onClick={handleClosePopup}
                      className="w-full bg-white/10 text-white font-bold py-4 rounded-2xl hover:bg-white/20 transition-colors uppercase tracking-widest text-sm"
                    >
                      Fechar
                    </button> */}
                  </>
                ) : (
                  <>
                  <img
                      src="./src/assets/square.png"
                      alt="Logo Malaquias Tattoo"
                      className="w-48 h-48 rounded-full object-cover mb-6 mx-auto"
                    />
                    <h2 className="text-3xl font-light mb-4 leading-tight">
                      Parabéns! <br />
                      <span className="text-white font-bold">R$ 20,00 OFF</span>
                    </h2>
                    <p className="text-white/60 mb-8 leading-relaxed">
                      Você ganhou 20 Reais de Desconto na sua próxima Tattoo!
                      <span className="block mt-2 font-medium text-white italic">
                        Mande um Print dessa tela p/ o WhatsApp abaixo.
                      </span>
                    </p>
                    <div className="space-y-3">
                      <button 
                        onClick={handleSendMessage}
                        className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm shadow-xl shadow-white/5"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Enviar Mensagem
                      </button>
                      <p 
                       
                        className="w-full bg-transparent text-white/40 font-medium py-2 rounded-2xl hover:text-white transition-colors text-xs uppercase tracking-widest"
                      >
                        Essa promoção acontece apenas uma vez.
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}