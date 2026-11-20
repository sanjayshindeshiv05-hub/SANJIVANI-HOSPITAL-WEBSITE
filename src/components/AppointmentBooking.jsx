import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Building2, 
  Stethoscope, 
  Search, 
  Printer, 
  RefreshCw,
  PhoneCall,
  Ban,
  XCircle,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { departmentsData } from '../data/departmentsData';
import { doctorsData } from '../data/doctorsData';
import { hospitalInfo } from '../data/hospitalData';
import { appointmentApi } from '../services/appointmentService';
import { useLanguage } from '../context/LanguageContext';

export default function AppointmentBooking({ preselectedDepartmentId, preselectedDoctorId }) {
  const { isMarathi } = useLanguage();

  const [activeTab, setActiveTab] = useState('book'); // 'book' | 'track' | 'cancel'

  // Booking Form State
  const [formData, setFormData] = useState({
    patientName: '',
    mobile: '',
    email: '',
    departmentId: preselectedDepartmentId || 'general-medicine',
    doctorId: preselectedDoctorId || 'doc-gen-med',
    date: '',
    timeSlot: '10:00 AM – 11:30 AM',
    reason: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  // Tracking State
  const [trackIdInput, setTrackIdInput] = useState('');
  const [trackResult, setTrackResult] = useState(null);
  const [trackError, setTrackError] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  // Cancellation State
  const [cancelIdInput, setCancelIdInput] = useState('');
  const [cancelMobileInput, setCancelMobileInput] = useState('');
  const [cancelReason, setCancelReason] = useState('Schedule Conflict / Need Different Date');
  const [cancelNotes, setCancelNotes] = useState('');
  const [cancelError, setCancelError] = useState('');
  const [cancelSuccess, setCancelSuccess] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [isVerifyingForCancel, setIsVerifyingForCancel] = useState(false);

  // Sync pre-selected props if they change
  useEffect(() => {
    if (preselectedDepartmentId) {
      setFormData(prev => ({ ...prev, departmentId: preselectedDepartmentId }));
      const docForDept = doctorsData.find(d => d.departmentId === preselectedDepartmentId);
      if (docForDept) {
        setFormData(prev => ({ ...prev, doctorId: docForDept.id }));
      }
    }
  }, [preselectedDepartmentId]);

  useEffect(() => {
    if (preselectedDoctorId) {
      const doc = doctorsData.find(d => d.id === preselectedDoctorId);
      if (doc) {
        setFormData(prev => ({ 
          ...prev, 
          doctorId: doc.id,
          departmentId: doc.departmentId
        }));
      }
    }
  }, [preselectedDoctorId]);

  // Handle department change -> auto adjust doctor
  const handleDepartmentChange = (deptId) => {
    const docForDept = doctorsData.find(d => d.departmentId === deptId);
    setFormData(prev => ({
      ...prev,
      departmentId: deptId,
      doctorId: docForDept ? docForDept.id : doctorsData[0].id
    }));
  };

  // Doctors matching current selected department
  const filteredDoctors = doctorsData.filter(d => d.departmentId === formData.departmentId);

  // Compute minimum selectable date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split('T')[0];

  const validate = () => {
    const errs = {};
    if (!formData.patientName.trim()) {
      errs.patientName = isMarathi ? 'कृपया रुग्णाचे नाव प्रविष्ट करा.' : 'Patient name is required.';
    } else if (formData.patientName.trim().length < 2) {
      errs.patientName = 'Name must be at least 2 characters.';
    }

    const cleanMobile = formData.mobile.replace(/\D/g, '');
    if (!cleanMobile) {
      errs.mobile = isMarathi ? 'कृपया १० अंकी मोबाईल नंबर प्रविष्ट करा.' : 'Mobile number is required.';
    } else if (cleanMobile.length !== 10) {
      errs.mobile = isMarathi ? 'कृपया वैध १० अंकी मोबाईल नंबर टाका.' : 'Enter a valid 10-digit mobile number.';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.date) {
      errs.date = isMarathi ? 'कृपया तारीख निवडा.' : 'Please select preferred date.';
    }

    if (!formData.timeSlot) {
      errs.timeSlot = 'Please select a preferred time slot.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const selectedDept = departmentsData.find(d => d.id === formData.departmentId);
      const selectedDoc = doctorsData.find(d => d.id === formData.doctorId);

      const res = await appointmentApi.submitAppointmentRequest({
        ...formData,
        departmentName: selectedDept ? selectedDept.name : 'General Care',
        doctorName: selectedDoc ? selectedDoc.name : 'Consultant Physician'
      });

      setSubmissionResult(res.data);
    } catch (err) {
      setErrors({ form: err.message || 'Failed to submit appointment request.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    if (!trackIdInput.trim()) {
      setTrackError('Please enter your Appointment Request ID (e.g. SMC-2026-0814)');
      return;
    }

    setIsTracking(true);
    setTrackError('');
    setTrackResult(null);

    try {
      const found = await appointmentApi.getRequestById(trackIdInput.trim());
      if (found) {
        setTrackResult(found);
      } else {
        setTrackError('No appointment request found matching this ID. Please verify your reference number or call 099600 17474.');
      }
    } catch (err) {
      setTrackError('Error retrieving request. Please try again.');
    } finally {
      setIsTracking(false);
    }
  };

  // Step 1 of Cancellation: Verify Appointment
  const handleVerifyForCancel = async (e) => {
    e.preventDefault();
    setCancelError('');
    setCancelSuccess(null);
    setAppointmentToCancel(null);

    const cleanId = cancelIdInput.trim().toUpperCase();
    if (!cleanId) {
      setCancelError('Please enter your Appointment Request ID.');
      return;
    }

    setIsVerifyingForCancel(true);
    try {
      const found = await appointmentApi.getRequestById(cleanId);
      if (!found) {
        setCancelError('No appointment found matching this ID. Please check your tracking number.');
        return;
      }

      if (found.status === 'Cancelled') {
        setCancelError('This appointment request has already been cancelled.');
        setAppointmentToCancel(found);
        return;
      }

      if (found.status === 'Completed') {
        setCancelError('This appointment is already completed and cannot be cancelled.');
        return;
      }

      // Check mobile if user entered one
      const cleanMobile = cancelMobileInput.replace(/\D/g, '');
      if (cleanMobile && cleanMobile.length === 10 && found.mobile.replace(/\D/g, '') !== cleanMobile) {
        setCancelError('The mobile number does not match the patient mobile number on file.');
        return;
      }

      setAppointmentToCancel(found);
    } catch (err) {
      setCancelError('Failed to verify appointment details. Please try again.');
    } finally {
      setIsVerifyingForCancel(false);
    }
  };

  // Step 2 of Cancellation: Execute cancellation
  const handleExecuteCancel = async () => {
    if (!appointmentToCancel) return;

    setIsCancelling(true);
    setCancelError('');

    try {
      const reasonCombined = `${cancelReason}${cancelNotes ? ` - ${cancelNotes}` : ''}`;
      const updated = await appointmentApi.cancelAppointment(
        appointmentToCancel.id,
        appointmentToCancel.mobile,
        reasonCombined
      );

      setCancelSuccess(updated);
      setAppointmentToCancel(null);
      // Also update track result if it was open
      if (trackResult && trackResult.id === updated.id) {
        setTrackResult(updated);
      }
    } catch (err) {
      setCancelError(err.message || 'Failed to cancel appointment. Please contact hospital at 099600 17474.');
    } finally {
      setIsCancelling(false);
    }
  };

  const startCancelFromTrack = (record) => {
    setCancelIdInput(record.id);
    setCancelMobileInput(record.mobile);
    setAppointmentToCancel(record);
    setCancelError('');
    setCancelSuccess(null);
    setActiveTab('cancel');
  };

  const timeSlots = [
    '10:00 AM – 11:30 AM (Morning OPD)',
    '11:30 AM – 01:00 PM (Morning OPD)',
    '02:30 PM – 04:00 PM (Afternoon OPD)',
    '05:30 PM – 07:00 PM (Evening OPD)',
    '07:00 PM – 08:30 PM (Evening OPD)'
  ];

  return (
    <section id="appointment-section" className="py-16 sm:py-24 bg-gradient-to-b from-white via-hospital-50/30 to-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hospital-100 border border-hospital-200 text-hospital-800 text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-hospital-600" />
            <span>{isMarathi ? 'अपॉइंटमेंट बुकिंग व व्यवस्थापन' : 'Appointment Scheduling & Management'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {isMarathi ? (
              <>
                हॉस्पिटल भेटीसाठी{' '}
                <span className="text-hospital-600">ऑनलाइन अपॉइंटमेंट सेवा</span>
              </>
            ) : (
              <>
                Book, Track or Cancel Your{' '}
                <span className="text-hospital-600">Doctor Consultation</span>
              </>
            )}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base">
            {isMarathi
              ? 'नवीन अपॉइंटमेंट नोंदवा, आधीच्या अर्जाची स्थिती तपासा किंवा आवश्यक असल्यास वेबसाइटवरून थेट अपॉइंटमेंट रद्द करा.'
              : 'Submit an appointment request, check your application status, or cancel an upcoming consultation directly through our website.'}
          </p>

          {/* Sub-Tabs: Book vs Track vs Cancel */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200 mt-4 flex-wrap justify-center gap-1">
            <button
              onClick={() => setActiveTab('book')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'book'
                  ? 'bg-white text-hospital-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isMarathi ? 'नवीन अपॉइंटमेंट' : 'Request Appointment'}
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'track'
                  ? 'bg-white text-hospital-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isMarathi ? 'स्थिती तपासा' : 'Track Status'}
            </button>
            <button
              onClick={() => {
                setActiveTab('cancel');
                setCancelSuccess(null);
                setCancelError('');
              }}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'cancel'
                  ? 'bg-red-50 text-red-700 border border-red-200 shadow-sm'
                  : 'text-slate-600 hover:text-red-600'
              }`}
            >
              <Ban className="w-3.5 h-3.5" />
              <span>{isMarathi ? 'अपॉइंटमेंट रद्द करा' : 'Cancel Appointment'}</span>
            </button>
          </div>
        </div>

        {/* TAB 1: BOOKING WORKFLOW */}
        {activeTab === 'book' && (
          <div className="bg-white rounded-3xl shadow-card border border-slate-200/90 overflow-hidden">
            {submissionResult ? (
              /* Success / Received Confirmation State */
              <div className="p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6">
                
                <div className="w-16 h-16 rounded-3xl bg-amber-50 border-2 border-amber-300 text-amber-600 flex items-center justify-center mx-auto shadow-md">
                  <Clock className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
                    Status: Pending Hospital Confirmation
                  </span>
                  
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 pt-2">
                    {isMarathi ? 'आपली अपॉइंटमेंट विनंती प्राप्त झाली आहे!' : 'Your Appointment Request Has Been Received!'}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {isMarathi
                      ? `धन्यवाद, ${submissionResult.patientName}. तुमची विनंती नोंदवली गेली आहे. आमचा रिसेप्शन स्टाफ 099600 17474 वरून तुमच्या ${submissionResult.mobile} या मोबाईल नंबरवर संपर्क करून वेळ निश्चित करेल.`
                      : `Thank you, ${submissionResult.patientName}. Your request has been queued in our hospital system. Our front-desk coordinator will call you at ${submissionResult.mobile} to confirm the final OPD consultation time.`}
                  </p>
                </div>

                {/* Structured Summary Receipt */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="text-xs font-semibold text-slate-500">Request Tracking ID</span>
                    <span className="font-mono font-bold text-hospital-700 bg-hospital-100/70 px-2.5 py-0.5 rounded text-sm">
                      {submissionResult.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div>
                      <p className="text-slate-400 text-[11px] font-bold uppercase">Patient Name</p>
                      <p className="font-bold text-slate-800">{submissionResult.patientName}</p>
                    </div>

                    <div>
                      <p className="text-slate-400 text-[11px] font-bold uppercase">Contact Phone</p>
                      <p className="font-bold text-slate-800">{submissionResult.mobile}</p>
                    </div>

                    <div>
                      <p className="text-slate-400 text-[11px] font-bold uppercase">Specialist / Doctor</p>
                      <p className="font-bold text-slate-800">{submissionResult.doctorName}</p>
                    </div>

                    <div>
                      <p className="text-slate-400 text-[11px] font-bold uppercase">Department</p>
                      <p className="font-bold text-slate-800">{submissionResult.departmentName}</p>
                    </div>

                    <div>
                      <p className="text-slate-400 text-[11px] font-bold uppercase">Requested Date</p>
                      <p className="font-bold text-slate-800">{submissionResult.date}</p>
                    </div>

                    <div>
                      <p className="text-slate-400 text-[11px] font-bold uppercase">Requested Slot</p>
                      <p className="font-bold text-slate-800">{submissionResult.timeSlot}</p>
                    </div>
                  </div>

                  {submissionResult.reason && (
                    <div className="pt-2 border-t border-slate-200 text-xs">
                      <span className="text-slate-400 font-bold uppercase text-[10px]">Reason for Visit: </span>
                      <span className="text-slate-700 italic">"{submissionResult.reason}"</span>
                    </div>
                  )}
                </div>

                {/* Important Notice Callout */}
                <div className="p-4 rounded-2xl bg-hospital-50 border border-hospital-200 text-xs text-hospital-900 flex items-start gap-3 text-left">
                  <AlertCircle className="w-5 h-5 text-hospital-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Important Notice on Confirmation & Cancellation</p>
                    <p className="text-slate-600 mt-0.5">
                      Doctor availability may occasionally shift due to emergency surgeries. If you ever need to reschedule or cancel, you can do so directly using your Tracking ID <strong className="text-hospital-800">{submissionResult.id}</strong> in the Cancel tab above, or by calling <a href={hospitalInfo.telLink} className="font-bold text-hospital-700 underline">099600 17474</a>.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Slip</span>
                  </button>

                  <button
                    onClick={() => {
                      setSubmissionResult(null);
                      setFormData({
                        patientName: '',
                        mobile: '',
                        email: '',
                        departmentId: 'general-medicine',
                        doctorId: 'doc-gen-med',
                        date: '',
                        timeSlot: '10:00 AM – 11:30 AM',
                        reason: ''
                      });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-hospital-600 hover:bg-hospital-700 transition shadow-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Submit Another Request</span>
                  </button>

                  <button
                    onClick={() => startCancelFromTrack(submissionResult)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition"
                  >
                    <Ban className="w-4 h-4" />
                    <span>Need to Cancel?</span>
                  </button>
                </div>

              </div>
            ) : (
              /* The Appointment Request Form */
              <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
                
                {/* Form Progress Notice */}
                <div className="p-4 rounded-2xl bg-hospital-50/80 border border-hospital-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 text-hospital-950 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>
                      {isMarathi 
                        ? 'तातडीच्या आपत्कालीन सेवेसाठी थेट फोन करा: ०९९६०० १७४७४' 
                        : 'For emergency or acute casualty intake, please call directly on 099600 17474 (24/7).'}
                    </span>
                  </div>
                  <span className="text-hospital-700 font-bold">
                    No advance online payment required
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Field 1: Patient Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {isMarathi ? 'रुग्णाचे संपूर्ण नाव' : 'Patient Full Name'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={formData.patientName}
                        onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                        placeholder="e.g. Ramesh Patil"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition ${
                          errors.patientName 
                            ? 'border-red-400 bg-red-50/40 focus:border-red-500' 
                            : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-hospital-500 focus:ring-4 focus:ring-hospital-100'
                        }`}
                      />
                    </div>
                    {errors.patientName && (
                      <p className="text-xs text-red-600 font-medium">{errors.patientName}</p>
                    )}
                  </div>

                  {/* Field 2: Mobile Number */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {isMarathi ? 'मोबाईल नंबर (१० अंकी)' : 'Mobile Number (10 Digits)'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="tel"
                        maxLength={10}
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                        placeholder="e.g. 9822012345"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition ${
                          errors.mobile 
                            ? 'border-red-400 bg-red-50/40 focus:border-red-500' 
                            : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-hospital-500 focus:ring-4 focus:ring-hospital-100'
                        }`}
                      />
                    </div>
                    {errors.mobile && (
                      <p className="text-xs text-red-600 font-medium">{errors.mobile}</p>
                    )}
                  </div>

                  {/* Field 3: Email (Optional) */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {isMarathi ? 'ईमेल पत्ता (ऐच्छिक)' : 'Email Address (Optional)'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="patient@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-hospital-500 focus:ring-4 focus:ring-hospital-100 text-sm outline-none transition"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-600 font-medium">{errors.email}</p>
                    )}
                  </div>

                  {/* Field 4: Select Department */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {isMarathi ? 'विभाग निवडा' : 'Select Department'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={formData.departmentId}
                        onChange={(e) => handleDepartmentChange(e.target.value)}
                        className="w-full pl-10 pr-8 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-hospital-500 focus:ring-4 focus:ring-hospital-100 text-sm outline-none transition appearance-none"
                      >
                        {departmentsData.map((dept) => (
                          <option key={dept.id} value={dept.id}>
                            {dept.name} ({dept.category})
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
                    </div>
                  </div>

                  {/* Field 5: Select Doctor */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {isMarathi ? 'तज्ज्ञ डॉक्टर निवडा' : 'Select Specialist / Doctor'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Stethoscope className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={formData.doctorId}
                        onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                        className="w-full pl-10 pr-8 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-hospital-500 focus:ring-4 focus:ring-hospital-100 text-sm outline-none transition appearance-none"
                      >
                        {filteredDoctors.length > 0 ? (
                          filteredDoctors.map((doc) => (
                            <option key={doc.id} value={doc.id}>
                              {doc.name} – {doc.qualification}
                            </option>
                          ))
                        ) : (
                          <option value="doc-gen-med">Consultant Physician (General Medicine)</option>
                        )}
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
                    </div>
                  </div>

                  {/* Field 6: Preferred Date */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {isMarathi ? 'पसंतीची तारीख' : 'Preferred Date'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="date"
                        min={minDateString}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition ${
                          errors.date 
                            ? 'border-red-400 bg-red-50/40 focus:border-red-500' 
                            : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-hospital-500 focus:ring-4 focus:ring-hospital-100'
                        }`}
                      />
                    </div>
                    {errors.date && (
                      <p className="text-xs text-red-600 font-medium">{errors.date}</p>
                    )}
                  </div>

                  {/* Field 7: Preferred Time Slot */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {isMarathi ? 'वेळ निवडा (OPD Time Slot)' : 'Select Preferred Time Slot'} <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {timeSlots.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setFormData({ ...formData, timeSlot: slot })}
                          className={`p-3 rounded-xl text-xs font-semibold border text-left flex items-center justify-between transition ${
                            formData.timeSlot === slot
                              ? 'bg-hospital-50 border-hospital-600 text-hospital-800 ring-2 ring-hospital-600/20'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-hospital-600" />
                            {slot}
                          </span>
                          {formData.timeSlot === slot && (
                            <CheckCircle2 className="w-4 h-4 text-hospital-600 flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Field 8: Reason for Visit / Medical Note */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {isMarathi ? 'तपासणीचे कारण / लक्षणे (संक्षिप्त)' : 'Reason for Visit / Symptoms (Brief Message)'}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      placeholder={isMarathi ? 'उदा. ताप, सांधेदुखी, नियमित मधुमेह तपासणी...' : 'e.g. Chronic joint stiffness, fever for 3 days, routine diabetic review...'}
                      className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-hospital-500 focus:ring-4 focus:ring-hospital-100 text-sm outline-none transition"
                    ></textarea>
                  </div>

                </div>

                {errors.form && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                    {errors.form}
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-slate-400" />
                    <span>Submitted requests are safely saved to Supabase & confirmed via 099600 17474.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white bg-hospital-600 hover:bg-hospital-700 active:bg-hospital-800 shadow-soft hover:shadow-hover hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Saving to Hospital Backend...</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4" />
                        <span>{isMarathi ? 'अपॉइंटमेंट विनंती पाठवा' : 'Submit Appointment Request'}</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>
        )}

        {/* TAB 2: TRACK STATUS WORKFLOW */}
        {activeTab === 'track' && (
          <div className="bg-white rounded-3xl shadow-card border border-slate-200/90 p-6 sm:p-10 max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-extrabold text-slate-900">
                {isMarathi ? 'अपॉइंटमेंट विनंती स्थिती तपासा' : 'Track Your Appointment Request'}
              </h3>
              <p className="text-xs text-slate-500">
                Enter your reference code provided when submitting your booking request (e.g., SMC-2026-0814).
              </p>
            </div>

            <form onSubmit={handleTrackSubmit} className="flex gap-2">
              <input
                type="text"
                value={trackIdInput}
                onChange={(e) => setTrackIdInput(e.target.value.toUpperCase())}
                placeholder="e.g. SMC-2026-0814"
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-hospital-500 text-sm outline-none font-mono uppercase"
              />
              <button
                type="submit"
                disabled={isTracking}
                className="px-6 py-3 rounded-xl font-bold text-white bg-hospital-600 hover:bg-hospital-700 text-sm transition"
              >
                {isTracking ? 'Searching...' : 'Track'}
              </button>
            </form>

            {trackError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                {trackError}
              </div>
            )}

            {trackResult && (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="font-mono font-bold text-hospital-700 text-sm">
                    {trackResult.id}
                  </span>
                  
                  {/* Status Badge */}
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    trackResult.status === 'Confirmed' 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : trackResult.status === 'Cancelled'
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : trackResult.status === 'Completed'
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {trackResult.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block font-bold uppercase text-[10px]">Patient</span>
                    <span className="font-bold text-slate-800">{trackResult.patientName}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-bold uppercase text-[10px]">Doctor</span>
                    <span className="font-bold text-slate-800">{trackResult.doctorName}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-bold uppercase text-[10px]">Date</span>
                    <span className="font-bold text-slate-800">{trackResult.date}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-bold uppercase text-[10px]">Slot</span>
                    <span className="font-bold text-slate-800">{trackResult.timeSlot}</span>
                  </div>
                </div>

                {trackResult.staffNotes && (
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700">
                    <p className="font-bold text-slate-900 text-[11px] mb-0.5">Hospital Staff Update:</p>
                    <p>{trackResult.staffNotes}</p>
                  </div>
                )}

                {/* Option to Cancel directly from Track card */}
                {trackResult.status !== 'Cancelled' && trackResult.status !== 'Completed' && (
                  <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs text-slate-500">
                      Need to cancel or reschedule this consultation?
                    </span>
                    <button
                      onClick={() => startCancelFromTrack(trackResult)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition"
                    >
                      <Ban className="w-3.5 h-3.5 text-red-600" />
                      <span>{isMarathi ? 'अपॉइंटमेंट रद्द करा' : 'Cancel This Appointment'}</span>
                    </button>
                  </div>
                )}

                {trackResult.status === 'Cancelled' && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                    <XCircle className="w-4 h-4 flex-shrink-0" />
                    <span>This appointment has been cancelled. To consult our doctor, please book a new appointment.</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DEDICATED APPOINTMENT CANCELLATION */}
        {activeTab === 'cancel' && (
          <div className="bg-white rounded-3xl shadow-card border border-slate-200/90 p-6 sm:p-10 max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto">
                <Ban className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {isMarathi ? 'अपॉइंटमेंट ऑनलाइन रद्द करा' : 'Cancel Appointment Online'}
              </h3>
              <p className="text-xs text-slate-500">
                {isMarathi
                  ? 'तुमचा अपॉइंटमेंट आयडी व मोबाईल नंबर टाकून भेट रद्द करा. ही माहिती हॉस्पिटलच्या डेटाबेसमध्ये त्वरित अपडेट होईल.'
                  : 'Enter your Appointment ID and registered mobile number to cancel your booking in our hospital system.'}
              </p>
            </div>

            {cancelSuccess ? (
              /* Success Cancellation Banner */
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-base">
                    Appointment Cancelled Successfully
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                    Appointment request <strong className="text-slate-900 font-mono">{cancelSuccess.id}</strong> has been marked as <strong>Cancelled</strong> in the Sanjeevan Medical Centre database.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs text-slate-600 text-left space-y-1 max-w-md mx-auto">
                  <p><strong>Patient:</strong> {cancelSuccess.patientName}</p>
                  <p><strong>Doctor:</strong> {cancelSuccess.doctorName}</p>
                  <p><strong>Scheduled:</strong> {cancelSuccess.date} ({cancelSuccess.timeSlot})</p>
                  <p><strong>Status:</strong> <span className="text-red-600 font-bold">Cancelled</span></p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setCancelSuccess(null);
                      setCancelIdInput('');
                      setCancelMobileInput('');
                      setActiveTab('book');
                    }}
                    className="px-5 py-2.5 rounded-xl font-bold text-white bg-hospital-600 hover:bg-hospital-700 text-xs transition"
                  >
                    Book a New Appointment
                  </button>

                  <a
                    href={hospitalInfo.telLink}
                    className="px-4 py-2.5 rounded-xl font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 text-xs transition flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-hospital-600" />
                    <span>Call Reception (099600 17474)</span>
                  </a>
                </div>
              </div>
            ) : appointmentToCancel ? (
              /* Step 2: Confirmation Screen with Reason */
              <div className="p-6 rounded-2xl bg-red-50/60 border border-red-200 space-y-5 animate-in fade-in">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-extrabold text-red-950">
                      Confirm Appointment Cancellation
                    </h4>
                    <p className="text-xs text-red-800/80 mt-0.5">
                      Please confirm that you wish to release this appointment slot.
                    </p>
                  </div>
                </div>

                {/* Appointment Preview Box */}
                <div className="bg-white p-4 rounded-xl border border-red-200/80 text-xs space-y-2">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500 font-bold uppercase text-[10px]">Tracking ID</span>
                    <span className="font-mono font-bold text-hospital-700">{appointmentToCancel.id}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-slate-700">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Patient</span>
                      <span className="font-semibold">{appointmentToCancel.patientName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Mobile</span>
                      <span className="font-semibold">{appointmentToCancel.mobile}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Doctor</span>
                      <span className="font-semibold">{appointmentToCancel.doctorName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Slot</span>
                      <span className="font-semibold">{appointmentToCancel.date} • {appointmentToCancel.timeSlot}</span>
                    </div>
                  </div>
                </div>

                {/* Cancellation Reason Dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Reason for Cancellation
                  </label>
                  <select
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs outline-none focus:border-red-500"
                  >
                    <option value="Schedule Conflict / Need Different Date">Schedule Conflict / Need Different Date</option>
                    <option value="Feeling Better / Symptoms Recovered">Feeling Better / Symptoms Recovered</option>
                    <option value="Consulted Another Specialist">Consulted Another Specialist</option>
                    <option value="Personal Emergency / Unable to Travel">Personal Emergency / Unable to Travel</option>
                    <option value="Other Personal Reason">Other Personal Reason</option>
                  </select>
                </div>

                {/* Optional Note */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Additional Message for Hospital Staff (Optional)
                  </label>
                  <input
                    type="text"
                    value={cancelNotes}
                    onChange={(e) => setCancelNotes(e.target.value)}
                    placeholder="e.g. Will book again next week"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs outline-none focus:border-red-500"
                  />
                </div>

                {cancelError && (
                  <div className="p-3 rounded-xl bg-red-100 text-red-700 text-xs font-medium">
                    {cancelError}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
                  <button
                    onClick={handleExecuteCancel}
                    disabled={isCancelling}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-60 text-xs transition shadow-sm flex items-center justify-center gap-2"
                  >
                    {isCancelling ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Updating Hospital Database...</span>
                      </>
                    ) : (
                      <>
                        <Ban className="w-3.5 h-3.5" />
                        <span>Confirm Appointment Cancellation</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setAppointmentToCancel(null)}
                    disabled={isCancelling}
                    className="w-full sm:w-auto py-3 px-4 rounded-xl font-semibold text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 text-xs transition"
                  >
                    Keep Appointment
                  </button>
                </div>
              </div>
            ) : (
              /* Step 1: Lookup Form */
              <form onSubmit={handleVerifyForCancel} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Appointment Tracking ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={cancelIdInput}
                    onChange={(e) => setCancelIdInput(e.target.value.toUpperCase())}
                    placeholder="e.g. SMC-2026-0814"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-hospital-500 text-sm outline-none font-mono uppercase"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Registered Mobile Number <span className="text-slate-400 font-normal">(for verification)</span>
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    value={cancelMobileInput}
                    onChange={(e) => setCancelMobileInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-hospital-500 text-sm outline-none"
                  />
                </div>

                {cancelError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                    {cancelError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isVerifyingForCancel}
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-60 text-sm transition shadow-sm flex items-center justify-center gap-2"
                >
                  {isVerifyingForCancel ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Verifying with Database...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Find Appointment to Cancel</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-400 text-center">
                  You can also cancel by calling reception directly on <a href={hospitalInfo.telLink} className="font-bold text-hospital-600 underline">099600 17474</a>.
                </p>
              </form>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
