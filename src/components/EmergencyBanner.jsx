import React from 'react';
import { 
  Phone, 
  Calendar, 
  Clock, 
  ShieldAlert, 
  ArrowRight, 
  Building2, 
  MapPin,
  Ambulance
} from 'lucide-react';
import { hospitalInfo } from '../data/hospitalData';
import { useLanguage } from '../context/LanguageContext';

export default function EmergencyBanner({ onOpenAppointment }) {
  const { isMarathi } = useLanguage();

  return (
    <section className="py-12 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Deep Royal Blue Banner inspired by reference */}
        <div className="bg-gradient-to-r from-hospital-950 via-hospital-900 to-hospital-800 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-hospital-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading & 24/7 assurance */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hospital-800/80 border border-hospital-700 text-hospital-300 text-xs font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isMarathi ? '२४ तास तातडीची सेवा' : '24/7 Emergency Care Ready'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                {isMarathi ? (
                  <>
                    तातडीच्या वैद्यकीय मदतीची{' '}
                    <span className="text-hospital-300">गरज आहे का?</span>
                  </>
                ) : (
                  <>
                    Need Immediate Medical Attention or{' '}
                    <span className="text-hospital-300">Emergency Care?</span>
                  </>
                )}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl">
                {isMarathi
                  ? 'आम्ही २४ तास, आठवड्याचे सातही दिवस कराड व परिसरातील रुग्णांसाठी सज्ज आहोत. तात्काळ मदतीसाठी थेट फोन करा.'
                  : 'Sanjeevan Medical Centre casualty is active 24 hours a day, 7 days a week. For immediate intake, call our helpline directly.'}
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 pt-2 text-xs">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  24/7 Casualty & Triage
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-slate-200">
                  <Building2 className="w-3.5 h-3.5 text-hospital-300" />
                  Multispeciality Inpatient Care
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-hospital-300" />
                  Market Yard Rd, Karad
                </span>
              </div>
            </div>

            {/* Right Column: Direct Call Box with Button */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center">
              
              <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-xl border border-white/20 flex flex-col items-center text-center space-y-3">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {isMarathi ? 'तातडीचा थेट संपर्क क्रमांक' : 'Direct Hospital Helpline'}
                </p>

                <a
                  href={hospitalInfo.telLink}
                  className="flex items-center gap-3 text-2xl sm:text-3xl font-black text-hospital-700 hover:text-hospital-900 transition tracking-tight"
                >
                  <div className="w-10 h-10 rounded-full bg-hospital-50 text-hospital-600 flex items-center justify-center">
                    <Phone className="w-5 h-5 animate-pulse" />
                  </div>
                  <span>{hospitalInfo.phoneDisplay}</span>
                </a>

                <p className="text-[11px] text-slate-500">
                  24 Hours Available • Click to Call Instantly
                </p>

                <div className="w-full pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (onOpenAppointment) onOpenAppointment();
                      else {
                        const target = document.querySelector('#appointment-section');
                        if (target) target.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full text-xs font-bold text-hospital-600 hover:text-hospital-800 flex items-center justify-center gap-1 py-1"
                  >
                    <span>{isMarathi ? 'किंवा आताच अपॉइंटमेंट विनंती करा' : 'Or Request Appointment Online'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
