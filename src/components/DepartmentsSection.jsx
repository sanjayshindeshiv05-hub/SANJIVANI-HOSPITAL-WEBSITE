import React, { useState } from 'react';
import { 
  Stethoscope, 
  Scissors, 
  HeartHandshake, 
  Baby, 
  Activity, 
  Ambulance, 
  BedDouble, 
  Microscope,
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { departmentsData } from '../data/departmentsData';
import { useLanguage } from '../context/LanguageContext';
import DepartmentModal from './DepartmentModal';

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

export default function DepartmentsSection({ onSelectDepartmentForBooking }) {
  const { isMarathi } = useLanguage();
  const [selectedDept, setSelectedDept] = useState(null);

  const handleBook = (deptId) => {
    if (onSelectDepartmentForBooking) {
      onSelectDepartmentForBooking(deptId);
    }
  };

  return (
    <section id="departments" className="py-16 sm:py-24 bg-[#f8fafc] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hospital-100 border border-hospital-200 text-hospital-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-hospital-600" />
              <span>{isMarathi ? 'वैद्यकीय विभाग व सेवा' : 'Clinical Specialities & Services'}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {isMarathi ? (
                <>
                  विविध आरोग्य समस्यांसाठी{' '}
                  <span className="text-hospital-600">सुसज्ज मल्टिस्पेशलिटी विभाग</span>
                </>
              ) : (
                <>
                  Comprehensive Medical Departments for{' '}
                  <span className="text-hospital-600">Complete Family Care</span>
                </>
              )}
            </h2>

            <p className="text-slate-600 text-sm sm:text-base">
              {isMarathi
                ? 'संजीवन मेडिकल केंद्रामध्ये सर्व प्रमुख वैद्यकीय व शस्त्रक्रिया विभाग उपलब्ध असून २४ तास तज्ज्ञ मार्गदर्शनाखाली उपचार केले जातात.'
                : 'Explore our multispeciality clinical departments staffed with qualified doctors and supported by 24-hour diagnostic and critical care infrastructure.'}
            </p>
          </div>

          <div className="hidden sm:block">
            <span className="text-xs font-semibold text-slate-500 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs">
              8 Core Clinical Departments
            </span>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departmentsData.map((dept) => {
            const IconComponent = iconMap[dept.icon] || Stethoscope;
            return (
              <div
                key={dept.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Department Image Thumbnail with Floating Icon */}
                <div className="relative h-44 w-full overflow-hidden bg-hospital-900">
                  <img
                    src={dept.image}
                    alt={dept.name}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-hospital-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    {dept.category}
                  </span>

                  {/* Floating Icon overlapping bottom of photo */}
                  <div className="absolute -bottom-4 right-4 w-11 h-11 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center text-hospital-600 group-hover:bg-hospital-600 group-hover:text-white transition-colors duration-200">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 pt-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-slate-900 text-lg leading-snug group-hover:text-hospital-600 transition-colors">
                      {isMarathi ? dept.marathiName : dept.name}
                    </h3>
                    
                    <p className="text-xs text-slate-500 font-marathi">
                      {isMarathi ? dept.name : dept.marathiName}
                    </p>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed pt-1">
                      {isMarathi ? dept.marathiShortDescription : dept.shortDescription}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedDept(dept)}
                      className="text-xs font-bold text-hospital-600 hover:text-hospital-800 flex items-center gap-1 group/btn"
                    >
                      <span>{isMarathi ? 'तपशील पहा' : 'Learn More'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => handleBook(dept.id)}
                      className="text-xs font-semibold text-slate-700 hover:text-white bg-slate-100 hover:bg-hospital-600 px-3 py-1.5 rounded-lg transition"
                    >
                      {isMarathi ? 'बुक करा' : 'Book'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Learn More Modal */}
      {selectedDept && (
        <DepartmentModal
          department={selectedDept}
          onClose={() => setSelectedDept(null)}
          onBookDepartment={(deptId) => {
            setSelectedDept(null);
            handleBook(deptId);
          }}
        />
      )}
    </section>
  );
}
