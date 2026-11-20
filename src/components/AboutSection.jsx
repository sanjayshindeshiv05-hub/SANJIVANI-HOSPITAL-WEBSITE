import React from 'react';
import { 
  Building2, 
  Clock, 
  ShieldCheck, 
  Users, 
  MapPin, 
  PhoneCall, 
  CheckCircle,
  HeartHandshake
} from 'lucide-react';
import { hospitalInfo } from '../data/hospitalData';
import { useLanguage } from '../context/LanguageContext';

export default function AboutSection() {
  const { isMarathi } = useLanguage();

  const corePillars = [
    {
      icon: Clock,
      title: isMarathi ? "२४ तास अखंड सेवा" : "24/7 Active Care",
      desc: isMarathi ? "रात्रंदिवस तातडीचे वैद्यकीय उपचार व ऍडमिशन सुविधा." : "Continuous round-the-clock emergency medical attention & admissions."
    },
    {
      icon: Building2,
      title: isMarathi ? "मल्टीस्पेशलिटी विभाग" : "Multispeciality Scope",
      desc: isMarathi ? "विविध प्रमुख आजारांवर एकाच छताखाली सर्वसमावेशक उपचार." : "Comprehensive medical & surgical services housed under one roof."
    },
    {
      icon: Users,
      title: isMarathi ? "समर्पित वैद्यकीय पथक" : "Dedicated Medical Staff",
      desc: isMarathi ? "रुग्णांची काळजी घेणारे कर्तव्यदक्ष डॉक्टर्स व नर्सिंग स्टाफ." : "Qualified clinical specialists & attentive compassionate nursing team."
    },
    {
      icon: HeartHandshake,
      title: isMarathi ? "रुग्ण-हितैषी दृष्टिकोन" : "Patient-Centered Care",
      desc: isMarathi ? "पारदर्शक सल्ला, सौजन्यपूर्ण संवाद आणि आदरयुक्त रुग्णसेवा." : "Ethical clinical advice, transparent communication & patient dignity."
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Hospital Building Visual & Verified Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-card border border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=900"
                alt="Sanjeevan Medical Centre Hospital Karad Exterior"
                className="w-full h-[400px] sm:h-[480px] object-cover object-center"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-hospital-950/80 via-transparent to-transparent"></div>

              {/* Bottom tag */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-100 text-slate-800">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-hospital-100 text-hospital-700 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 leading-snug">
                      Sanjeevan Medical Centre
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      4, Market Yard Road, Shaniwar Peth, Karad 415110
                    </p>
                    <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Open 24 Hours • Call 099600 17474
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: About Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hospital-50 border border-hospital-200 text-hospital-700 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isMarathi ? 'संजीवन मेडिकल केंद्र बद्दल' : 'About Sanjeevan Medical Centre'}</span>
            </div>

            {/* Section Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {isMarathi ? (
                <>
                  कराडमधील प्रगत व विश्वासार्ह{' '}
                  <span className="text-hospital-600">मल्टीस्पेशलिटी आरोग्यसेवा</span>
                </>
              ) : (
                <>
                  Advanced Multispeciality Healthcare in Karad with a{' '}
                  <span className="text-hospital-600">Patient-First Philosophy</span>
                </>
              )}
            </h2>

            {/* Concise Overview Paragraphs */}
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
              <p>
                {isMarathi
                  ? 'संजीवन मेडिकल केंद्र (Sanjeevan Medical Centre) हे कराड, शनिवार पेठ येथील मार्केट यार्ड रोडवर स्थित एक सुसज्ज मल्टीस्पेशलिटी रुग्णालय आहे. आम्ही २४ तास अविरत तातडीची सेवा, अचूक वैद्यकीय तपासणी आणि विविध आजारांवर आधुनिक उपचार उपलब्ध करून देतो.'
                  : 'Sanjeevan Medical Centre is a reputable multispeciality hospital situated on Market Yard Road, Shaniwar Peth in Karad, Maharashtra. We provide accessible, round-the-clock emergency assistance, specialized outpatient clinics, and comprehensive inpatient care.'}
              </p>
              <p>
                {isMarathi
                  ? 'रुग्णांची सुरक्षितता, स्वच्छ व निर्जंतुक वातावरण आणि आपुलकीची रुग्णसेवा हे आमचे ब्रीदवाक्य आहे. १८१ हून अधिक रुग्णांच्या गुगल रिव्ह्यूजवर आधारित ४.६/५ रेटिंग हा आमचा विश्वासार्हतेचा पुरावा आहे.'
                  : 'Our focus is centered upon patient dignity, clinical hygiene, and timely treatment. Backed by a verified 4.6/5 rating from over 181 reviews on Google, we remain committed to serving the Karad community with integrity and clinical discipline.'}
              </p>
            </div>

            {/* 4 Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {corePillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-hospital-200 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-hospital-100 text-hospital-600 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#departments"
                className="inline-flex items-center gap-2 text-sm font-bold text-hospital-600 hover:text-hospital-700 bg-hospital-50 hover:bg-hospital-100 px-5 py-2.5 rounded-xl transition"
              >
                <span>{isMarathi ? 'हॉस्पिटलचे सर्व विभाग पहा' : 'Explore All Departments'}</span>
                <span>→</span>
              </a>

              <a
                href={hospitalInfo.telLink}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                <PhoneCall className="w-4 h-4 text-hospital-600" />
                <span>{isMarathi ? 'थेट फोन करा: ' : 'Direct Call: '}{hospitalInfo.phoneDisplay}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
