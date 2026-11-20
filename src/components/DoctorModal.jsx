import React from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Award, 
  CheckCircle2, 
  Phone,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { hospitalInfo } from '../data/hospitalData';
import { useLanguage } from '../context/LanguageContext';

export default function DoctorModal({ doctor, onClose, onBookDoctor }) {
  const { isMarathi } = useLanguage();
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="min-h-screen px-4 flex items-center justify-center py-8">
        <div className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-100 z-10 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header area with Doctor Photo & Info */}
          <div className="p-6 bg-gradient-to-br from-hospital-50 via-hospital-100/40 to-white border-b border-hospital-100 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white text-slate-500 hover:text-slate-900 shadow-sm flex items-center justify-center transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="relative">
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover object-center shadow-md border-2 border-white"
                />
                <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                  Active OPD
                </span>
              </div>

              <div className="text-center sm:text-left space-y-1">
                <span className="text-[11px] font-bold tracking-wider text-hospital-700 bg-hospital-100 px-2.5 py-0.5 rounded-full uppercase">
                  {doctor.departmentName}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
                  {isMarathi ? doctor.marathiName : doctor.name}
                </h3>
                <p className="text-xs text-hospital-800 font-semibold">
                  {doctor.qualification}
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  {isMarathi ? doctor.marathiSpecialization : doctor.specialization}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5">
            {/* Consultation Timings Card */}
            <div className="p-4 rounded-2xl bg-hospital-50/60 border border-hospital-200/80 flex items-start gap-3">
              <Clock className="w-5 h-5 text-hospital-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-hospital-950 uppercase tracking-wider">
                  {isMarathi ? 'ओपीडी व भेटण्याची वेळ' : 'OPD Consultation Timings'}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-hospital-800 mt-0.5">
                  {isMarathi ? doctor.marathiTimings : doctor.timings}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  {doctor.availability}
                </p>
              </div>
            </div>

            {/* Scope of Consultation */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {isMarathi ? 'वैद्यकीय सल्ला व व्याप्ती' : 'Clinical Focus & Care'}
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {isMarathi ? doctor.marathiDescription : doctor.description}
              </p>
            </div>

            {/* Hospital Verification Notice */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                Verified Clinical Specialist at Sanjeevan Medical Centre, Karad.
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => {
                  onBookDoctor(doctor.id);
                  onClose();
                }}
                className="w-full sm:flex-1 py-3 px-5 rounded-xl font-bold text-white bg-hospital-600 hover:bg-hospital-700 active:bg-hospital-800 shadow-md flex items-center justify-center gap-2 text-sm transition"
              >
                <Calendar className="w-4 h-4" />
                <span>{isMarathi ? 'या डॉक्टरांसाठी अपॉइंटमेंट बुक करा' : 'Book with this Specialist'}</span>
              </button>

              <a
                href={hospitalInfo.telLink}
                className="w-full sm:w-auto py-3 px-4 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 text-sm flex items-center justify-center gap-2 transition"
              >
                <Phone className="w-4 h-4 text-hospital-600" />
                <span>099600 17474</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
