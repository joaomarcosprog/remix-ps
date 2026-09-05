import React, { useState, useEffect, useRef } from 'react';
import { COURSES, SERVICES } from '../constants';
import { ArrowRight, CheckCircle2, X, FileText } from 'lucide-react';
import { Course } from '../types';

const Services: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openCourse = (course: Course) => {
    setSelectedCourse(course);
    document.body.style.overflow = 'hidden';
  };

  const closeCourse = () => {
    setSelectedCourse(null);
    document.body.style.overflow = 'auto';
  };

  // Focus management for the modal
  useEffect(() => {
    if (selectedCourse && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [selectedCourse]);

  return (
    <section id="servicos" aria-labelledby="services-title" className="bg-emergency-gray relative">
      
      {/* SECTION 1: SERVIÇOS */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-emergency-red font-bold tracking-widest uppercase mb-2 block">Terceirização & Staff</span>
            <h2 id="services-title" className="text-emergency-black text-5xl md:text-6xl font-display font-bold uppercase leading-none">
              Nossos <span className="text-emergency-red">Serviços</span>
            </h2>
            <div className="w-24 h-2 bg-emergency-red mt-4" aria-hidden="true"></div>
          </div>
          <p className="text-emergency-black/70 max-w-md font-medium text-right md:text-left">
            PROFISSIONAIS PRONTOS PARA ATUAR NA SUA EMPRESA OU EVENTO.
            SEGURANÇA E RESPONSABILIDADE TÉCNICA.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <article key={service.id} className="relative bg-white shadow-xl group overflow-hidden border-l-8 border-emergency-red">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity" aria-hidden="true">
                <service.icon size={120} className="text-emergency-black" />
              </div>
              
              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                  <div className="absolute inset-0 bg-emergency-red/20 z-10 group-hover:bg-transparent transition-colors"></div>
                  <img 
                    src={service.image} 
                    alt="" 
                    role="presentation" 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                
                <div className="p-8 flex-1 flex flex-col justify-center">
                  <h3 className="text-3xl font-display font-bold text-emergency-black uppercase mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <ul className="mb-6 space-y-2" aria-label={`Destaques de ${service.title}`}>
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm font-bold text-emergency-black/80">
                        <CheckCircle2 size={16} className="text-emergency-red" aria-hidden="true" /> {feature}
                      </li>
                    ))}
                  </ul>

                  <a href="#contato" className="inline-flex items-center gap-2 bg-emergency-black text-white px-6 py-3 font-bold uppercase text-sm tracking-wider hover:bg-emergency-red transition-colors w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emergency-black">
                    Contratar Serviço
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="h-16 bg-hazard-pattern w-full" aria-hidden="true"></div>

      {/* SECTION 2: CURSOS */}
      <div className="py-24 bg-emergency-black text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="courses-title" className="text-4xl md:text-5xl font-display font-bold uppercase">
              Centro de <span className="text-emergency-red">Treinamento</span>
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto uppercase tracking-widest text-sm">
              Formação de Elite. Certificação Válida. Instrutores Operacionais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COURSES.map((course) => (
              <div key={course.id} className="group relative bg-zinc-900 border border-zinc-800 hover:border-emergency-red transition-all duration-300 flex flex-col h-full">
                <div className="h-48 overflow-hidden relative flex-shrink-0">
                  <div className="absolute top-4 left-4 bg-emergency-red p-2 z-10 rounded" aria-hidden="true">
                    <course.icon className="text-white w-6 h-6" />
                  </div>
                  <img 
                    src={course.image} 
                    alt="" 
                    role="presentation"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-display font-bold text-white uppercase mb-3 group-hover:text-emergency-red transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-400 mb-6 text-sm flex-grow">
                    {course.description}
                  </p>
                  
                  <button 
                    onClick={() => openCourse(course)}
                    className="mt-auto flex items-center gap-2 text-white font-bold uppercase text-sm tracking-wider hover:text-emergency-red transition-all group-hover:translate-x-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emergency-red"
                  >
                    Ver Grade <ArrowRight size={16} className="text-emergency-red" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COURSE MODAL */}
      {selectedCourse && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={closeCourse}></div>
          
          <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200 border-t-8 border-emergency-red">
            {/* Header */}
            <div className="sticky top-0 bg-emergency-gray p-6 border-b border-gray-200 flex justify-between items-start z-10">
              <div className="pr-8">
                <span className="bg-emergency-red text-white text-xs font-bold px-2 py-1 uppercase tracking-wider mb-2 inline-block">Grade Curricular</span>
                <h3 id="modal-title" className="text-2xl md:text-3xl font-display font-bold text-emergency-black uppercase leading-tight">
                  {selectedCourse.title}
                </h3>
              </div>
              <button 
                ref={closeButtonRef}
                onClick={closeCourse}
                aria-label="Fechar grade curricular"
                className="bg-zinc-200 hover:bg-emergency-red hover:text-white p-2 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-emergency-red"
              >
                <X size={24} aria-hidden="true" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-6 bg-blue-50 p-4 rounded border-l-4 border-blue-500">
                <FileText className="text-blue-600 flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                   <h4 className="font-bold text-blue-900 uppercase text-sm mb-1">O que você vai aprender</h4>
                   <p className="text-blue-800 text-sm">Conteúdo programático alinhado às normas técnicas vigentes.</p>
                </div>
              </div>

              <ul className="space-y-3 mb-8" aria-label={`Lista de módulos do curso ${selectedCourse.title}`}>
                {selectedCourse.curriculum.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 border-b border-gray-100 pb-2 last:border-0">
                    <span className="text-emergency-red font-bold mt-[2px]" aria-hidden="true">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-zinc-900 text-white p-6 text-center">
                 <p className="text-gray-400 mb-4 text-sm uppercase tracking-wide">Próximas turmas abertas</p>
                 <a 
                   href="#contato" 
                   onClick={closeCourse}
                   className="inline-block bg-emergency-red hover:bg-white hover:text-emergency-red text-white font-display font-bold uppercase text-xl px-8 py-3 transition-colors border-2 border-emergency-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                 >
                   Matricular Agora
                 </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Services;