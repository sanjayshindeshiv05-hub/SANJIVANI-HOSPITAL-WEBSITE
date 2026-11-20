import React from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  ShieldCheck, 
  Heart,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { hospitalInfo } from '../data/hospitalData';
import { departmentsData } from '../data/departmentsData';
import { useLanguage } from '../context/LanguageContext';

export default function Footer({ onOpenAppointment, onOpenStaffModal }) {
  const { isMarathi } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 md:pb-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Identity Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-hospital-600 flex items-center justify-center text-white shadow-soft">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75">
                  <path d="M12 4v16" />
                  <path d="M4 12h16" />
                </svg>
              </div>
              <div>
                <h3 className="font-extrabold text-white text-lg tracking-tight">
                  Sanjeevan <span className="text-hospital-400">Medical Centre</span>
                </h3>
                <p className="text-[11px] text-slate-400 font-marathi">
                  संजीवन मेडिकल केंद्र – कराड
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {isMarathi
                ? 'कराड, शनिवार पेठ येथील मार्केट यार्ड रोडवर स्थित आधुनिक मल्टीस्पेशलिटी रुग्णालय. २४ तास तातडीची सेवा व अनुभवी डॉक्टर्स.'
                : 'Advanced multispeciality hospital situated on Market Yard Road, Shaniwar Peth, Karad. Dedicated to patient dignity, sterile healthcare, and 24-hour medical readiness.'}
            </p>

            {/* Google Rating Trust Badge */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold text-white text-xs">{hospitalInfo.rating.score}</span>
              </div>
              <span className="text-[11px] text-slate-400">
                Based on ~181 verified Google Reviews
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {isMarathi ? 'नेव्हिगेशन' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-white transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>{isMarathi ? 'मुख्यपृष्ठ' : 'Home'}</span>
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>{isMarathi ? 'आमच्याबद्दल' : 'About Hospital'}</span>
                </a>
              </li>
              <li>
                <a href="#departments" className="hover:text-white transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>{isMarathi ? 'विभाग व सेवा' : 'Departments'}</span>
                </a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-white transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>{isMarathi ? 'तज्ज्ञ डॉक्टर्स' : 'Doctors Directory'}</span>
                </a>
              </li>
              <li>
                <a href="#appointment-section" className="hover:text-white transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>{isMarathi ? 'अपॉइंटमेंट बुकिंग' : 'Book Appointment'}</span>
                </a>
              </li>
              <li>
                <a href="#trust" className="hover:text-white transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>{isMarathi ? 'रुग्ण रेटिंग' : 'Patient Reviews'}</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>{isMarathi ? 'संपर्क व स्थान' : 'Contact & Map'}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Clinical Departments List */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {isMarathi ? 'प्रमुख विभाग' : 'Clinical Specialities'}
            </h4>
            <ul className="space-y-2 text-xs">
              {departmentsData.slice(0, 5).map((d) => (
                <li key={d.id}>
                  <a href="#departments" className="hover:text-white transition flex items-center gap-1">
                    <span className="text-hospital-400">•</span>
                    <span>{isMarathi ? d.marathiName : d.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Emergency Notice */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {isMarathi ? 'हॉस्पिटल संपर्क' : 'Hospital Contact'}
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-hospital-400 flex-shrink-0 mt-0.5" />
                <span>
                  4, Market Yard Road, Shaniwar Peth, Karad, Maharashtra 415110
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-hospital-400 flex-shrink-0" />
                <a href={hospitalInfo.telLink} className="font-bold text-white hover:text-hospital-300 transition">
                  {hospitalInfo.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2 text-emerald-400 font-semibold pt-1">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>24 Hours Continuous Care</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenStaffModal}
                className="text-[11px] text-slate-500 hover:text-slate-300 underline"
              >
                Hospital Staff Portal
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} Sanjeevan Medical Centre – Advanced Multispeciality Hospital. All rights reserved.
          </p>

          <p className="text-[11px] text-slate-600 text-center sm:text-right">
            Shaniwar Peth, Karad, Maharashtra 415110 • Verified Healthcare Facility
          </p>
        </div>

      </div>
    </footer>
  );
}
