import React from 'react';
import { 
  Star, 
  ShieldCheck, 
  Users, 
  Heart, 
  ExternalLink, 
  CheckCircle2, 
  Building2, 
  Award,
  Sparkles
} from 'lucide-react';
import { hospitalInfo } from '../data/hospitalData';
import { useLanguage } from '../context/LanguageContext';

export default function PatientTrustSection() {
  const { isMarathi } = useLanguage();

  const trustReasons = [
    {
      title: isMarathi ? "२४ तास तातडीची सेवा" : "24/7 Emergency Readiness",
      desc: isMarathi 
        ? "आकस्मिक आजार किंवा अपघाताच्या वेळी दिवस-रात्र अविरत वैद्यकीय पथक सज्ज असते." 
        : "Round-the-clock clinical readiness for urgent medical admissions and emergency stabilization."
    },
    {
      title: isMarathi ? "मध्यवर्ती व सुलभ स्थान" : "Prime Accessible Location",
      desc: isMarathi 
        ? "कराडमधील ४, मार्केट यार्ड रोड, शनिवार पेठ येथे रुग्ण व नातेवाईकांसाठी सहज पोहोचण्याजोगे ठिकाण." 
        : "Situated at 4, Market Yard Road, Shaniwar Peth with easy transit access from across Karad."
    },
    {
      title: isMarathi ? "मल्टीस्पेशलिटी सुविधा" : "Integrated Multispeciality",
      desc: isMarathi 
        ? "मेडिसिन, सर्जरी, बालरोग, स्त्रीरोग आणि अस्थिव्यंग विभाग एकाच रुग्णालयात उपलब्ध." 
        : "Multiple clinical disciplines coordinated together to deliver comprehensive medical care."
    },
    {
      title: isMarathi ? "स्वच्छ व सुरक्षित वातावरण" : "Clinical Hygiene & Care",
      desc: isMarathi 
        ? "रुग्ण सुरक्षिततेला सर्वोच्च प्राधान्य देऊन निर्जंतुक कक्ष आणि आपुलकीची शुश्रूषा." 
        : "Maintained sterile inpatient environment and supportive nursing attention for every patient."
    }
  ];

  return (
    <section id="trust" className="py-16 sm:py-24 bg-gradient-to-b from-white to-hospital-50/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Trust Showcase Box */}
        <div className="bg-hospital-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-hospital-600/30 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-hospital-800/50 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Big Trust Rating Badge */}
            <div className="lg:col-span-5 text-center lg:text-left space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hospital-800 border border-hospital-700 text-hospital-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isMarathi ? 'रुग्ण विश्वास व रेटिंग' : 'Patient Trust Indicator'}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                {isMarathi ? (
                  <>
                    कराडमधील रुग्णांचा आणि{' '}
                    <span className="text-hospital-300">कुटुंबांचा अढळ विश्वास</span>
                  </>
                ) : (
                  <>
                    Trusted by Patients and{' '}
                    <span className="text-hospital-300">Families Across Karad</span>
                  </>
                )}
              </h2>

              {/* Rating Big Card */}
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-3">
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter">
                    {hospitalInfo.rating.score}
                  </span>
                  <div>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-hospital-200 font-semibold mt-1">
                      {isMarathi 
                        ? `सुमारे ${hospitalInfo.rating.totalReviews} गुगल रिव्ह्यूजवर आधारित` 
                        : `Based on approximately ${hospitalInfo.rating.totalReviews} Google Reviews`}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-3">
                  {isMarathi
                    ? 'संजीवन मेडिकल केंद्र हे रुग्ण-केंद्रित काळजी, तत्पर प्रतिसाद आणि पारदर्शक सेवेसाठी ओळखले जाते.'
                    : 'The rating reflects authentic patient experiences regarding clinical promptness, attentive nursing, and 24-hour medical availability.'}
                </p>

                <div className="pt-2">
                  <a
                    href={hospitalInfo.googleMapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-hospital-300 hover:text-white underline underline-offset-4 transition"
                  >
                    <span>{isMarathi ? 'गुगल मॅप्सवर अधिक माहिती पहा' : 'View Hospital Details on Google Maps'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: 4 Real Trust Indicators */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trustReasons.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-colors space-y-2"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-7">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
