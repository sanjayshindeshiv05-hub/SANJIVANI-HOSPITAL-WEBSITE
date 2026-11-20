import React from 'react';
import { Phone, Calendar, Navigation } from 'lucide-react';
import { hospitalInfo } from '../data/hospitalData';
import { useLanguage } from '../context/LanguageContext';

export default function QuickActionMobileBar({ onOpenAppointment }) {
  const { isMarathi } = useLanguage();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl px-3 py-2">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        
        {/* Button 1: Call Hospital */}
        <a
          href={hospitalInfo.telLink}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 active:bg-slate-200 text-slate-800 transition"
        >
          <Phone className="w-4 h-4 text-hospital-600 mb-0.5" />
          <span className="text-[11px] font-bold truncate">
            {isMarathi ? 'कॉल करा' : 'Call'}
          </span>
        </a>

        {/* Button 2: Book Appointment (Primary highlighted) */}
        <button
          onClick={() => {
            if (onOpenAppointment) onOpenAppointment();
            else {
              const target = document.querySelector('#appointment-section');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-hospital-600 active:bg-hospital-700 text-white shadow-sm transition"
        >
          <Calendar className="w-4 h-4 text-white mb-0.5" />
          <span className="text-[11px] font-bold truncate">
            {isMarathi ? 'अपॉइंटमेंट' : 'Book'}
          </span>
        </button>

        {/* Button 3: Get Directions */}
        <a
          href={hospitalInfo.googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 active:bg-slate-200 text-slate-800 transition"
        >
          <Navigation className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span className="text-[11px] font-bold truncate">
            {isMarathi ? 'दिशा (मॅप)' : 'Directions'}
          </span>
        </a>

      </div>
    </div>
  );
}
