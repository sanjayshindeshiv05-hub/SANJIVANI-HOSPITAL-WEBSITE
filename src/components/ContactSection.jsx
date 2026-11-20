import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Calendar, 
  Navigation, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Mail,
  Building2,
  ExternalLink
} from 'lucide-react';
import { hospitalInfo } from '../data/hospitalData';
import { useLanguage } from '../context/LanguageContext';
import { inquiryApi } from '../services/inquiryService';

export default function ContactSection({ onOpenAppointment }) {
  const { isMarathi } = useLanguage();

  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.phone.trim() || !formState.message.trim()) {
      setErrorMsg('Please fill in your name, contact phone, and message.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);
    try {
      await inquiryApi.submitInquiry(formState);
      setSubmitted(true);
    } catch (err) {
      setErrorMsg('Failed to send message. Please try again or call 099600 17474.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hospital-100 border border-hospital-200 text-hospital-800 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-hospital-600" />
            <span>{isMarathi ? 'संपर्क व हॉस्पिटल स्थान' : 'Contact Hospital & Location'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {isMarathi ? (
              <>
                हॉस्पिटलशी संपर्क साधा किंवा{' '}
                <span className="text-hospital-600">थेट भेट द्या</span>
              </>
            ) : (
              <>
                Reach Out to Us or Visit{' '}
                <span className="text-hospital-600">Sanjeevan Medical Centre</span>
              </>
            )}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base">
            {isMarathi
              ? 'आमचे हॉस्पिटल कराडच्या मध्यवर्ती भागात मार्केट यार्ड रोडवर २४ तास रुग्णसेवेसाठी उपलब्ध आहे.'
              : 'Centrally located at Market Yard Road, Shaniwar Peth in Karad. Accessible 24 hours for emergency admissions and routine consultations.'}
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Address */}
          <div className="bg-hospital-50/60 border border-hospital-200/80 rounded-3xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-hospital-600 text-white flex items-center justify-center shadow-soft">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  {isMarathi ? 'हॉस्पिटल पत्ता' : 'Hospital Address'}
                </h3>
                <p className="text-xs text-slate-500 font-marathi">
                  {isMarathi ? 'संजीवन मेडिकल केंद्र' : 'Sanjeevan Medical Centre'}
                </p>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {isMarathi ? hospitalInfo.marathiAddress : hospitalInfo.address}
              </p>
            </div>

            <a
              href={hospitalInfo.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-hospital-700 hover:text-hospital-900 hover:underline pt-2"
            >
              <Navigation className="w-4 h-4 text-hospital-600" />
              <span>{isMarathi ? 'गुगल मॅप्सवर दिशा पहा (Get Directions)' : 'Get Directions on Google Maps'}</span>
            </a>
          </div>

          {/* Card 2: Phone & Emergency */}
          <div className="bg-hospital-50/60 border border-hospital-200/80 rounded-3xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-hospital-600 text-white flex items-center justify-center shadow-soft">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  {isMarathi ? 'थेट फोन नंबर' : 'Hospital Direct Phone'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isMarathi ? 'तातडीच्या मदतीसाठी २४ तास उपलब्ध' : 'Available 24 Hours for Inquiries & Care'}
                </p>
              </div>
              <div>
                <a
                  href={hospitalInfo.telLink}
                  className="text-xl sm:text-2xl font-black text-hospital-700 hover:text-hospital-900 transition tracking-tight"
                >
                  {hospitalInfo.phoneDisplay}
                </a>
                <p className="text-xs text-slate-500 mt-1">
                  Click to dial directly from your mobile device.
                </p>
              </div>
            </div>

            <a
              href={hospitalInfo.telLink}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-white bg-hospital-600 hover:bg-hospital-700 text-xs transition shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{isMarathi ? 'हॉस्पिटलला कॉल करा' : 'Call Hospital Now'}</span>
            </a>
          </div>

          {/* Card 3: Availability & Hours */}
          <div className="bg-hospital-50/60 border border-hospital-200/80 rounded-3xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-soft">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  {isMarathi ? 'कामाची वेळ व उपलब्धता' : 'Operating Hours & Access'}
                </h3>
                <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  {isMarathi ? '२४ तास अविरत कार्यरत' : 'Open 24 Hours • 7 Days a Week'}
                </p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Emergency admissions, casualty triage, inpatient wards, and round-the-clock nursing care are operational 365 days a year.
              </p>
            </div>

            <button
              onClick={() => {
                if (onOpenAppointment) onOpenAppointment();
                else {
                  const target = document.querySelector('#appointment-section');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 text-xs transition shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-hospital-600" />
              <span>{isMarathi ? 'ऑनलाइन अपॉइंटमेंट विनंती' : 'Book an Appointment'}</span>
            </button>
          </div>

        </div>

        {/* Map & Quick Inquiry Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Embedded Map / Location Visualization */}
          <div className="lg:col-span-7 bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-soft">
            <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <MapPin className="w-4 h-4 text-hospital-600" />
                <span>4, Market Yard Rd, Shaniwar Peth, Karad, Maharashtra 415110</span>
              </div>
              <a
                href={hospitalInfo.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-hospital-600 text-white font-bold text-xs hover:bg-hospital-700 transition"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>
            </div>

            {/* Embedded Responsive Google Map Iframe */}
            <div className="relative w-full h-[380px] bg-slate-200">
              <iframe
                title="Sanjeevan Medical Centre Location Map Karad"
                src="https://maps.google.com/maps?q=4,+Market+Yard+Road,+Shaniwar+Peth,+Karad,+Maharashtra+415110&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>

            {/* Bottom address details banner */}
            <div className="p-4 bg-white border-t border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span>Landmark: Near Market Yard, Shaniwar Peth, Central Karad</span>
              <span className="font-semibold text-hospital-700">Phone: 099600 17474</span>
            </div>
          </div>

          {/* Right Column: General Inquiry Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
            <div className="space-y-2 mb-6">
              <h3 className="font-extrabold text-slate-900 text-lg">
                {isMarathi ? 'हॉस्पिटल चौकशी संदेश पाठवा' : 'Send General Inquiry'}
              </h3>
              <p className="text-xs text-slate-500">
                Have a question regarding hospital facilities, admission, or visiting hours? Send a quick message.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-base">
                  Message Sent Successfully
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thank you, {formState.name}. We have received your inquiry. Hospital reception will review your note or contact you on {formState.phone}.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: '', phone: '', subject: '', message: '' });
                  }}
                  className="text-xs font-bold text-emerald-800 underline mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 outline-none focus:bg-white focus:border-hospital-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Contact Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value.replace(/\D/g, '') })}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 outline-none focus:bg-white focus:border-hospital-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Subject / Department
                  </label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="e.g. Inpatient Admission, Visiting Hours, Test Inquiry"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 outline-none focus:bg-white focus:border-hospital-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Message / Question <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Type your question or medical inquiry here..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 outline-none focus:bg-white focus:border-hospital-500"
                  ></textarea>
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-600 font-medium">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl font-bold text-white bg-hospital-600 hover:bg-hospital-700 disabled:opacity-60 text-xs transition shadow-xs flex items-center justify-center gap-2"
                >
                  <Send className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-pulse' : ''}`} />
                  <span>{isSubmitting ? 'Sending to Hospital Backend...' : 'Send Inquiry'}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
