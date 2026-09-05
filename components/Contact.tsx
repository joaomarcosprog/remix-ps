import React, { useState } from 'react';
import { Phone, Mail, MapPin, AlertCircle, Instagram, Youtube, Send } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: 'Curso Guarda-Vidas',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Número de destino (557391518584)
    const phoneNumber = "557391518584";

    // Formatação da mensagem para o WhatsApp
    // Emojis removidos para garantir compatibilidade e campo de telefone removido pois já é o remetente.
    const text = `*SOLICITACAO VIA SITE*

*Nome:* ${formData.name}
*Assunto:* ${formData.subject}

*Mensagem:*
${formData.message}`;

    // Cria a URL codificada
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    // Abre em nova aba
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contato" aria-labelledby="contact-title" className="py-24 bg-white relative">
      <div className="absolute top-0 w-full h-4 bg-hazard-pattern" aria-hidden="true"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h2 id="contact-title" className="text-5xl font-display font-bold uppercase text-emergency-black mb-6">
              Pronto para <br/>
              <span className="text-emergency-red">Salvar Vidas?</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 font-sans">
              Entre em contato agora para consultar a grade de cursos, solicitar orçamentos para empresas ou tirar dúvidas.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-emergency-red p-3 text-white" aria-hidden="true">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-display font-bold uppercase text-lg text-emergency-black">WhatsApp / Telefone</h3>
                  <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emergency-red transition-colors block focus-visible:outline-emergency-red">
                    +55 73 9151-8584
                  </a>
                  <p className="text-sm text-emergency-red font-bold">Plantão de Atendimento</p>
                </div>
              </div>

              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group focus-visible:outline-none">
                <div className="bg-emergency-black p-3 text-white group-hover:bg-emergency-red transition-colors group-focus-visible:bg-emergency-red" aria-hidden="true">
                  <Instagram size={24} />
                </div>
                <div>
                  <h3 className="font-display font-bold uppercase text-lg text-emergency-black group-hover:text-emergency-red transition-colors group-focus-visible:text-emergency-red">Instagram</h3>
                  <p className="text-gray-600">@pstreinamentosba</p>
                  <p className="text-sm text-gray-400">Siga nosso dia-a-dia</p>
                </div>
              </a>

               <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group focus-visible:outline-none">
                <div className="bg-emergency-black p-3 text-white group-hover:bg-[#FF0000] transition-colors group-focus-visible:bg-[#FF0000]" aria-hidden="true">
                  <Youtube size={24} />
                </div>
                <div>
                  <h3 className="font-display font-bold uppercase text-lg text-emergency-black group-hover:text-[#FF0000] transition-colors group-focus-visible:text-[#FF0000]">YouTube</h3>
                  <p className="text-gray-600">@PSTREINAMENTOSBA</p>
                  <p className="text-sm text-gray-400">Vídeos de treinamentos</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="bg-emergency-black p-3 text-white" aria-hidden="true">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-display font-bold uppercase text-lg text-emergency-black">Email</h3>
                  <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-gray-600 hover:text-emergency-red transition-colors focus-visible:outline-emergency-red">
                    {SOCIAL_LINKS.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-emergency-black p-3 text-white" aria-hidden="true">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-display font-bold uppercase text-lg text-emergency-black">Localização</h3>
                  <p className="text-gray-600">Santa Cruz Cabrália e Região - BA</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emergency-gray p-8 md:p-12 border-l-8 border-emergency-red shadow-2xl relative">
            <div className="absolute top-4 right-4 text-emergency-red opacity-20" aria-hidden="true">
               <AlertCircle size={64} />
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="full-name" className="block text-sm font-bold uppercase text-emergency-black mb-2">Nome Completo</label>
                <input 
                  id="full-name" 
                  name="name"
                  type="text" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white border-2 border-gray-300 p-4 focus:border-emergency-red focus:outline-none transition-colors text-black" 
                  placeholder="SEU NOME" 
                  required 
                  aria-required="true" 
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-bold uppercase text-emergency-black mb-2">Assunto</label>
                <select 
                  id="subject" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-white border-2 border-gray-300 p-4 focus:border-emergency-red focus:outline-none transition-colors appearance-none text-black cursor-pointer"
                >
                  <option value="Curso Guarda-Vidas">Curso Guarda-Vidas</option>
                  <option value="Curso Primeiros Socorros">Curso Primeiros Socorros</option>
                  <option value="Curso Brigada de Incêndio">Curso Brigada de Incêndio</option>
                  <option value="Contratar Bombeiro Civil (Evento/Empresa)">Contratar Bombeiro Civil (Evento/Empresa)</option>
                  <option value="Contratar Guarda-Vidas (Evento/Empresa)">Contratar Guarda-Vidas (Evento/Empresa)</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold uppercase text-emergency-black mb-2">Mensagem</label>
                <textarea 
                  id="message" 
                  name="message"
                  rows={4} 
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white border-2 border-gray-300 p-4 focus:border-emergency-red focus:outline-none transition-colors text-black" 
                  placeholder="COMO PODEMOS AJUDAR?"
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-emergency-red text-white font-display font-bold uppercase text-xl py-5 hover:bg-red-700 transition-colors shadow-lg active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emergency-black flex items-center justify-center gap-2">
                <Send size={20} />
                Enviar para WhatsApp
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;