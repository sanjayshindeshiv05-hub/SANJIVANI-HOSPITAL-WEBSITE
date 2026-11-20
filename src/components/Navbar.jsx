import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Calendar, 
  Menu, 
  X, 
  ShieldCheck, 
  Languages, 
  ChevronRight,
  UserCog
} from 'lucide-react';
import { hospitalInfo } from '../data/hospitalData';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ onOpenStaffModal, onOpenAppointment }) {
  const { isMarathi, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: isMarathi ? 'मुख्यपृष्ठ' : 'Home', href: '#home' },
    { name: isMarathi ? 'आमच्याबद्दल' : 'About', href: '#about' },
    { name: isMarathi ? 'विभाग व सेवा' : 'Specialities', href: '#departments' },
    { name: isMarathi ? 'तज्ज्ञ डॉक्टर्स' : 'Doctors', href: '#doctors' },
    { name: isMarathi ? 'अपॉइंटमेंट' : 'Appointments', href: '#appointment-section' },
    { name: isMarathi ? 'रुग्ण विश्वास' : 'Patient Trust', href: '#trust' },
    { name: isMarathi ? 'संपर्क व स्थान' : 'Contact & Location', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-hospital-900 text-slate-200 text-xs py-2 px-4 border-b border-hospital-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <Clock className="w-3.5 h-3.5" />
              {isMarathi ? '२४ तास अविरत तातडीची सेवा' : '24/7 Emergency & Acute Care'}
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-hospital-300" />
              {isMarathi ? '४, मार्केट यार्ड रोड, शनिवार पेठ, कराड' : '4, Market Yard Rd, Shaniwar Peth, Karad'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Phone Quick Click */}
            <a 
              href={hospitalInfo.telLink} 
              className="flex items-center gap-1.5 font-semibold text-white hover:text-hospital-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-hospital-400" />
              <span>{hospitalInfo.phoneDisplay}</span>
            </a>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-hospital-800/80 hover:bg-hospital-700 text-white font-medium text-xs transition border border-hospital-700"
              title="Switch Language"
            >
              <Languages className="w-3.5 h-3.5 text-hospital-300" />
              <span>{isMarathi ? 'English' : 'मराठी'}</span>
            </button>

            {/* Staff Internal Portal Trigger */}
            <button
              onClick={onOpenStaffModal}
              className="hidden md:flex items-center gap-1 text-slate-300 hover:text-white text-xs py-0.5 px-2 rounded hover:bg-hospital-800 transition"
              title="Hospital Staff Appointment Management"
            >
              <UserCog className="w-3.5 h-3.5 text-hospital-300" />
              <span>Staff Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3' 
          : 'bg-white shadow-sm py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Hospital Logo & Brand Name */}
          <a href="#home" className="flex items-center gap-3 group focus:outline-none">
            {/* Elegant Medical Cross Logo */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-hospital-700 via-hospital-600 to-hospital-500 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform duration-200 relative overflow-hidden">
              {/* Subtle inner gloss */}
              <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v16" />
                <path d="M4 12h16" />
              </svg>
            </div>
            
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl text-hospital-950 tracking-tight leading-snug">
                Sanjeevan <span className="text-hospital-600 font-bold">Medical Centre</span>
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-500 tracking-wider uppercase font-marathi">
                {isMarathi ? 'संजीवन मेडिकल केंद्र – कराड' : 'Advanced Multispeciality Hospital'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-hospital-600 hover:bg-hospital-50/80 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs (Desktop) */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={hospitalInfo.telLink}
              className="hidden xl:inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-hospital-700 px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-hospital-200 hover:bg-hospital-50/50 transition shadow-sm"
            >
              <Phone className="w-4 h-4 text-hospital-600" />
              <span>099600 17474</span>
            </a>

            <button
              onClick={() => {
                if (onOpenAppointment) onOpenAppointment();
                else {
                  const target = document.querySelector('#appointment-section');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 text-sm font-bold text-white bg-hospital-600 hover:bg-hospital-700 active:bg-hospital-800 px-5 py-2.5 rounded-xl shadow-soft hover:shadow-hover hover:-translate-y-0.5 transition-all duration-200"
            >
              <Calendar className="w-4 h-4" />
              <span>{isMarathi ? 'अपॉइंटमेंट बुक करा' : 'Book Appointment'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Drawer panel */}
          <div className="fixed top-0 right-0 w-5/6 max-w-sm h-full bg-white shadow-2xl z-50 flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-hospital-600 flex items-center justify-center text-white">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75">
                    <path d="M12 4v16" />
                    <path d="M4 12h16" />
                  </svg>
                </div>
                <div className="leading-tight">
                  <p className="font-bold text-slate-900 text-sm">Sanjeevan Medical</p>
                  <p className="text-[11px] text-slate-500 font-marathi">संजीवन केंद्र, कराड</p>
                </div>
              </div>

              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Language Switch in Drawer */}
            <div className="py-4 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600">Language / भाषा</span>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-hospital-50 text-hospital-700 font-bold text-xs border border-hospital-200"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{isMarathi ? 'Switch to English' : 'मराठी निवडा'}</span>
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col py-4 gap-1 flex-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-slate-800 font-semibold text-base hover:bg-hospital-50 hover:text-hospital-600 transition"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </div>

            {/* Bottom Actions inside Drawer */}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAppointment) onOpenAppointment();
                  else {
                    const target = document.querySelector('#appointment-section');
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white bg-hospital-600 hover:bg-hospital-700 shadow-md"
              >
                <Calendar className="w-5 h-5" />
                <span>{isMarathi ? 'अपॉइंटमेंट बुक करा' : 'Book Appointment'}</span>
              </button>

              <a
                href={hospitalInfo.telLink}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200"
              >
                <Phone className="w-5 h-5 text-hospital-600" />
                <span>Call {hospitalInfo.phoneDisplay}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStaffModal();
                }}
                className="text-xs text-slate-500 hover:text-slate-800 text-center py-2 underline"
              >
                Staff Portal Access
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
