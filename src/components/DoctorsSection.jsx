import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Clock, 
  Calendar, 
  Star, 
  Filter, 
  ChevronRight, 
  UserCheck, 
  Info,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { doctorsData } from '../data/doctorsData';
import { departmentsData } from '../data/departmentsData';
import { useLanguage } from '../context/LanguageContext';
import DoctorModal from './DoctorModal';

export default function DoctorsSection({ onSelectDoctorForBooking }) {
  const { isMarathi } = useLanguage();
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Departments for filter pills
  const filterOptions = [
    { id: 'all', label: isMarathi ? 'सर्व तज्ज्ञ' : 'All Specialists' },
    { id: 'general-medicine', label: isMarathi ? 'जनरल मेडिसिन' : 'General Medicine' },
    { id: 'general-surgery', label: isMarathi ? 'जनरल सर्जरी' : 'General Surgery' },
    { id: 'obstetrics-gynecology', label: isMarathi ? 'स्त्रीरोग विभाग' : 'Gynecology' },
    { id: 'pediatrics', label: isMarathi ? 'बालरोग विभाग' : 'Pediatrics' },
    { id: 'orthopedics', label: isMarathi ? 'अस्थिव्यंग विभाग' : 'Orthopedics' },
    { id: 'emergency-trauma', label: isMarathi ? 'आपत्कालीन कक्ष' : 'Emergency' },
  ];

  const filteredDoctors = useMemo(() => {
    return doctorsData.filter((doc) => {
      const matchesDept = selectedDeptFilter === 'all' || doc.departmentId === selectedDeptFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        doc.name.toLowerCase().includes(q) ||
        doc.marathiName.toLowerCase().includes(q) ||
        doc.specialization.toLowerCase().includes(q) ||
        doc.qualification.toLowerCase().includes(q) ||
        doc.departmentName.toLowerCase().includes(q);

      return matchesDept && matchesSearch;
    });
  }, [selectedDeptFilter, searchQuery]);

  const handleBook = (doctorId) => {
    if (onSelectDoctorForBooking) {
      onSelectDoctorForBooking(doctorId);
    }
  };

  return (
    <section id="doctors" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hospital-100 border border-hospital-200 text-hospital-800 text-xs font-bold uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5 text-hospital-600" />
            <span>{isMarathi ? 'तज्ज्ञ वैद्यकीय पथक' : 'Specialist Doctors & Clinicians'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {isMarathi ? (
              <>
                तुमच्या आरोग्य सेवेसाठी{' '}
                <span className="text-hospital-600">अनुभवी व तत्पर तज्ज्ञ डॉक्टर्स</span>
              </>
            ) : (
              <>
                Find the Right Specialist for{' '}
                <span className="text-hospital-600">Your Healthcare Needs</span>
              </>
            )}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base">
            {isMarathi
              ? 'संजीवन मेडिकल केंद्रामध्ये विविध विभागांचे अनुभवी डॉक्टर्स ओपीडी व आंतररुग्ण तपासणीसाठी नियमित वेळेत उपलब्ध असतात.'
              : 'Consult with qualified medical specialists across internal medicine, general surgery, maternity, pediatrics, orthopedics, and emergency trauma care.'}
          </p>
        </div>

        {/* Search & Department Filters */}
        <div className="space-y-4 mb-10">
          
          {/* Search Box */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isMarathi ? 'डॉक्टर, विभाग किंवा शिक्षणानुसार शोधा...' : 'Search by specialist, qualification or department...'}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-hospital-500 focus:ring-4 focus:ring-hospital-100 text-sm outline-none transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                Clear
              </button>
            )}
          </div>

          {/* Department Filter Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedDeptFilter(opt.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  selectedDeptFilter === opt.id
                    ? 'bg-hospital-600 text-white shadow-soft'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200 max-w-lg mx-auto">
            <p className="text-slate-600 font-semibold text-sm">
              {isMarathi ? 'कोणतेही तज्ज्ञ सापडले नाहीत.' : 'No doctors matched your search criteria.'}
            </p>
            <button
              onClick={() => {
                setSelectedDeptFilter('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-bold text-hospital-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Top: Photo & Basic Details */}
                  <div className="p-5 flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={doc.photo}
                        alt={doc.name}
                        className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl object-cover object-center border border-slate-100 shadow-sm group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" title="Verified Duty Doctor"></span>
                    </div>

                    <div className="space-y-1 min-w-0">
                      <span className="text-[10px] font-bold text-hospital-700 bg-hospital-50 border border-hospital-100 px-2 py-0.5 rounded-md inline-block uppercase tracking-wider">
                        {doc.departmentName}
                      </span>
                      
                      <h3 className="font-extrabold text-slate-900 text-base leading-snug truncate group-hover:text-hospital-600 transition-colors">
                        {isMarathi ? doc.marathiName : doc.name}
                      </h3>

                      <p className="text-xs font-semibold text-hospital-800">
                        {doc.qualification}
                      </p>

                      <p className="text-xs text-slate-500 truncate">
                        {isMarathi ? doc.marathiSpecialization : doc.specialization}
                      </p>
                    </div>
                  </div>

                  {/* Consultation Timings Box */}
                  <div className="mx-5 mb-4 p-3 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                      <Clock className="w-3.5 h-3.5 text-hospital-600 flex-shrink-0" />
                      <span className="truncate">{isMarathi ? doc.marathiTimings : doc.timings}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 pl-5">
                      {doc.availability}
                    </p>
                  </div>

                  {/* Short Bio */}
                  <p className="px-5 text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {isMarathi ? doc.marathiDescription : doc.description}
                  </p>
                </div>

                {/* Card Bottom Actions */}
                <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedDoctor(doc)}
                    className="text-xs font-bold text-slate-600 hover:text-hospital-600 transition"
                  >
                    {isMarathi ? 'माहिती पहा' : 'View Profile'}
                  </button>

                  <button
                    onClick={() => handleBook(doc.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-hospital-600 hover:bg-hospital-700 active:bg-hospital-800 shadow-sm transition"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{isMarathi ? 'अपॉइंटमेंट बुक' : 'Book Appointment'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <DoctorModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onBookDoctor={(docId) => {
            setSelectedDoctor(null);
            handleBook(docId);
          }}
        />
      )}
    </section>
  );
}
