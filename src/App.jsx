import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import DepartmentsSection from './components/DepartmentsSection';
import DoctorsSection from './components/DoctorsSection';
import AppointmentBooking from './components/AppointmentBooking';
import PatientTrustSection from './components/PatientTrustSection';
import EmergencyBanner from './components/EmergencyBanner';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import QuickActionMobileBar from './components/QuickActionMobileBar';
import StaffPortalModal from './components/StaffPortalModal';

export default function App() {
  const [staffModalOpen, setStaffModalOpen] = useState(false);
  const [preselectedDept, setPreselectedDept] = useState('general-medicine');
  const [preselectedDoc, setPreselectedDoc] = useState('doc-gen-med');

  const scrollToAppointment = () => {
    const el = document.querySelector('#appointment-section');
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  const handleSelectDepartmentForBooking = (deptId) => {
    setPreselectedDept(deptId);
    scrollToAppointment();
  };

  const handleSelectDoctorForBooking = (docId) => {
    setPreselectedDoc(docId);
    scrollToAppointment();
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800">
        
        {/* Navigation Bar */}
        <Navbar 
          onOpenStaffModal={() => setStaffModalOpen(true)}
          onOpenAppointment={scrollToAppointment}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Section */}
          <Hero onOpenAppointment={scrollToAppointment} />

          {/* About Hospital */}
          <AboutSection />

          {/* Clinical Departments & Specialities */}
          <DepartmentsSection 
            onSelectDepartmentForBooking={handleSelectDepartmentForBooking}
          />

          {/* Specialist Doctors Roster */}
          <DoctorsSection 
            onSelectDoctorForBooking={handleSelectDoctorForBooking}
          />

          {/* Appointment Booking & Tracking System */}
          <AppointmentBooking 
            preselectedDepartmentId={preselectedDept}
            preselectedDoctorId={preselectedDoc}
          />

          {/* Patient Reviews & Trust Showcase (4.6 / 181 reviews) */}
          <PatientTrustSection />

          {/* 24/7 Emergency Quick Action Banner */}
          <EmergencyBanner onOpenAppointment={scrollToAppointment} />

          {/* Contact & Google Maps Location */}
          <ContactSection onOpenAppointment={scrollToAppointment} />
        </main>

        {/* Professional Hospital Footer */}
        <Footer 
          onOpenAppointment={scrollToAppointment}
          onOpenStaffModal={() => setStaffModalOpen(true)}
        />

        {/* Mobile Sticky Quick Action Bar */}
        <QuickActionMobileBar onOpenAppointment={scrollToAppointment} />

        {/* Internal Hospital Staff Appointment Desk Modal */}
        <StaffPortalModal 
          isOpen={staffModalOpen}
          onClose={() => setStaffModalOpen(false)}
        />

      </div>
    </LanguageProvider>
  );
}
