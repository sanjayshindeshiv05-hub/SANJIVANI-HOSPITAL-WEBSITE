import React from 'react';
import { 
  Calendar, 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  ShieldCheck, 
  ArrowRight,
  HeartPulse,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { hospitalInfo, trustHighlights } from '../data/hospitalData';
import { useLanguage } from '../context/LanguageContext';

export default function Hero({ onOpenAppointment }) {
  const { isMarathi } = useLanguage();

  return (
    <section id="home" className="relative pt-6 sm:pt-10 pb-16 lg:pb-24 overflow-hidden hero-gradient">
      {/* Background medical subtle pattern */}
      <div className="absolute inset-0 medical-cross-pattern opacity-40 pointer-events-none"></div>

      {/* Decorative subtle ambient glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-hospital-200/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-hospital-100/60 rounded-full blur-2xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Info, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-hospital-100/90 border border-hospital-200 text-hospital-800 text-xs sm:text-sm font-semibold shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <HeartPulse className="w-4 h-4 text-hospital-600" />
              <span>
                {isMarathi 
                  ? '२४ तास अविरत रुग्णसेवा • शनिवार पेठ, कराड' 
                  : '24/7 Emergency & Multispeciality Care • Shaniwar Peth, Karad'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {isMarathi ? (
                <>
                  तुमच्या आणि कुटुंबाच्या आरोग्याची{' '}
                  <span className="text-hospital-600 block sm:inline">विश्वसनीय आणि प्रगत काळजी</span>
                </>
              ) : (
                <>
                  Advanced Healthcare with Compassionate Touch for{' '}
                  <span className="text-hospital-600 block sm:inline">You and Your Family</span>
                </>
              )}
            </h1>

            {/* Bilingual Subtitle / Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {isMarathi
                ? 'संजीवन मेडिकल केंद्र – कराडमधील अत्याधुनिक मल्टिस्पेशलिटी रुग्णालय. अनुभवी डॉक्टर्स, तत्पर आपत्कालीन सेवा, सुसज्ज ऑपरेशन थिएटर आणि २४ तास रुग्णसेवा.'
                : 'Sanjeevan Medical Centre provides round-the-clock clinical care, specialized medical departments, modern operation facilities, and patient-first healthcare in the heart of Karad.'}
            </p>

            {/* Location & Key Feature Pill List */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-600 pt-1">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-hospital-600 flex-shrink-0" />
                {isMarathi ? 'मध्यवर्ती मार्केट यार्ड रोड' : 'Central Market Yard Location'}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-hospital-600 flex-shrink-0" />
                {isMarathi ? '२४ तास तातडीची सेवा' : '24 Hours Emergency Intake'}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-hospital-600 flex-shrink-0" />
                {isMarathi ? 'गुगल रेटिंग ४.६/५' : '4.6/5 Patient Rating'}
              </span>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={() => {
                  if (onOpenAppointment) onOpenAppointment();
                  else {
                    const target = document.querySelector('#appointment-section');
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl font-bold text-white bg-hospital-600 hover:bg-hospital-700 active:bg-hospital-800 shadow-soft hover:shadow-hover hover:-translate-y-0.5 transition-all duration-200 text-sm sm:text-base group"
              >
                <Calendar className="w-5 h-5" />
                <span>{isMarathi ? 'अपॉइंटमेंट विनंती करा' : 'Book an Appointment'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={hospitalInfo.telLink}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 hover:border-hospital-300 shadow-xs hover:shadow-sm transition-all duration-200 text-sm sm:text-base"
              >
                <Phone className="w-5 h-5 text-hospital-600" />
                <span>{isMarathi ? 'हॉस्पिटलला कॉल करा' : 'Contact Hospital'}</span>
              </a>
            </div>

            {/* Quick emergency notice */}
            <p className="text-xs text-slate-500 pt-1">
              {isMarathi 
                ? 'तातडीच्या आपत्कालीन मदतीसाठी त्वरित संपर्क साधा: ' 
                : 'Need immediate emergency assistance? Call directly: '}
              <a href={hospitalInfo.telLink} className="font-bold text-hospital-700 hover:underline">
                099600 17474
              </a>
            </p>

          </div>

          {/* Right Column: High Quality Medical Visual & Floating Badges */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-hospital-500/20 via-hospital-200/40 to-hospital-400/20 blur-xl"></div>
              
              {/* Main Image Card */}
              <div className="relative rounded-3xl overflow-hidden bg-white shadow-card border border-white/80">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=900"
                  alt="Sanjeevan Medical Centre - Advanced Multispeciality Hospital Karad"
                  className="w-full h-[360px] sm:h-[420px] object-cover object-center transform hover:scale-102 transition duration-500"
                  loading="eager"
                />

                {/* Gradient vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent"></div>

                {/* Bottom caption overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white p-3 sm:p-4 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/15">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm sm:text-base leading-tight">
                        Sanjeevan Medical Centre
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-200">
                        4, Market Yard Rd, Shaniwar Peth, Karad 415110
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/90 text-[11px] font-bold tracking-wide uppercase">
                      24 Hours Open
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Reassurance Badge 1: Top Left */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl shadow-card border border-hospital-100 flex items-center gap-3 animate-bounce-slow">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-amber-500">
                  <Star className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-extrabold text-slate-900 text-sm sm:text-base">4.6</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">181 Google Reviews</p>
                </div>
              </div>

              {/* Floating Reassurance Badge 2: Right Middle */}
              <div className="hidden sm:flex absolute -bottom-5 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-card border border-hospital-100 items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-hospital-50 border border-hospital-200/70 flex items-center justify-center text-hospital-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">24/7 Availability</p>
                  <p className="text-[11px] text-slate-500 font-medium">Emergency & Inpatient</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Floating Trust Metrics Bar below Hero */}
        <div className="mt-12 lg:mt-16 pt-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {trustHighlights.map((item) => (
              <div 
                key={item.id}
                className="bg-white/90 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-center"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  {item.id === 'rating' && <Star className="w-4 h-4 text-amber-500 fill-amber-400 flex-shrink-0" />}
                  {item.id === 'hours' && <Clock className="w-4 h-4 text-hospital-600 flex-shrink-0" />}
                  {item.id === 'type' && <Building2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />}
                  {item.id === 'location' && <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                    {isMarathi ? item.marathiTitle : item.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {isMarathi ? item.marathiSubtitle : item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
