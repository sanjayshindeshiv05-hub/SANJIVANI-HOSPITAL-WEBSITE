import React from 'react';
import { 
  X, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Phone, 
  AlertCircle,
  Stethoscope,
  Scissors,
  HeartHandshake,
  Baby,
  Activity,
  Ambulance,
  BedDouble,
  Microscope
} from 'lucide-react';
import { hospitalInfo } from '../data/hospitalData';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  Stethoscope,
  Scissors,
  HeartHandshake,
  Baby,
  Activity,
  Ambulance,
  BedDouble,
  Microscope
};

export default function DepartmentModal({ department, onClose, onBookDepartment }) {
  const { isMarathi } = useLanguage();
  if (!department) return null;

  const IconComp = iconMap[department.icon] || Stethoscope;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="min-h-screen px-4 flex items-center justify-center py-8">
        <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-100 z-10 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header Image with Gradient */}
          <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-hospital-900">
            <img 
              src={department.image} 
              alt={department.name}
              className="w-full h-full object-cover object-center opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent"></div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-slate-900 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title overlay */}
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-hospital-300 bg-hospital-900/70 px-2.5 py-0.5 rounded-full border border-hospital-700/60 inline-block mb-1.5">
                {department.category}
              </span>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-hospital-600 text-white flex items-center justify-center shadow-md">
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold leading-tight">
                    {isMarathi ? department.marathiName : department.name}
                  </h3>
                  <p className="text-xs text-slate-200 font-marathi">
                    {isMarathi ? department.name : department.marathiName}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-6">
            
            {/* Detailed Description */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {isMarathi ? 'विभागाबद्दल माहिती' : 'Department Overview'}
              </h4>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {department.detailedOverview}
              </p>
            </div>

            {/* Key Clinical Offerings */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                {isMarathi ? 'मुख्य वैद्यकीय सेवा व तपासणी' : 'Key Clinical Services'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {department.keyServices.map((service, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Consultation Hours & Emergency Note */}
            <div className="bg-hospital-50/70 border border-hospital-200/60 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-hospital-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-hospital-900">
                    {isMarathi ? 'सल्ला व तपासणी वेळ' : 'Consultation Timings'}
                  </p>
                  <p className="text-xs text-hospital-700">
                    {department.consultationHours}
                  </p>
                </div>
              </div>

              {department.isEmergencyAvailable && (
                <span className="self-start sm:self-center px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  24/7 Casualty Support
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  onBookDepartment(department.id);
                  onClose();
                }}
                className="w-full sm:flex-1 py-3 px-5 rounded-xl font-bold text-white bg-hospital-600 hover:bg-hospital-700 active:bg-hospital-800 shadow-md flex items-center justify-center gap-2 text-sm transition"
              >
                <Calendar className="w-4 h-4" />
                <span>{isMarathi ? 'या विभागासाठी अपॉइंटमेंट बुक करा' : 'Request Appointment for this Department'}</span>
              </button>

              <a
                href={hospitalInfo.telLink}
                className="w-full sm:w-auto py-3 px-4 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 text-sm flex items-center justify-center gap-2 transition"
              >
                <Phone className="w-4 h-4 text-hospital-600" />
                <span>{isMarathi ? 'फोन करा' : 'Call 099600 17474'}</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
