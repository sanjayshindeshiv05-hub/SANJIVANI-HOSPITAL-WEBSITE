import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Clock, 
  CheckCircle2, 
  Phone, 
  Calendar, 
  User, 
  RefreshCw,
  Download,
  AlertTriangle,
  Building2,
  Stethoscope
} from 'lucide-react';
import { appointmentApi } from '../services/appointmentService';

export default function StaffPortalModal({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [requests, setRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedReq, setSelectedReq] = useState(null);
  const [statusNote, setStatusNote] = useState('');

  // Load appointments
  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const data = await appointmentApi.getAllRequests();
      setRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchRequests();
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    // Default hospital staff pin: 1234
    if (pinInput.trim() === '1234') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Invalid Staff PIN. (Demo PIN: 1234)');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await appointmentApi.updateStatus(id, newStatus, statusNote || `Status changed to ${newStatus} by hospital desk`);
      setStatusNote('');
      fetchRequests();
      if (selectedReq && selectedReq.id === id) {
        setSelectedReq(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const filteredRequests = requests.filter(req => {
    const matchesFilter = filterStatus === 'All' || req.status === filterStatus;
    const q = searchTerm.toLowerCase();
    const matchesSearch = 
      !q ||
      req.patientName.toLowerCase().includes(q) ||
      req.id.toLowerCase().includes(q) ||
      req.mobile.includes(q) ||
      req.doctorName.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="min-h-screen px-4 flex items-center justify-center py-6">
        <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-200 z-10 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="px-6 py-4 bg-hospital-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-hospital-700 flex items-center justify-center">
                <Lock className="w-4 h-4 text-hospital-300" />
              </div>
              <div>
                <h3 className="font-extrabold text-base leading-tight">
                  Hospital Staff Appointment Desk
                </h3>
                <p className="text-xs text-hospital-300">
                  Internal Patient Management & Scheduling Queue
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-hospital-300 hover:text-white hover:bg-hospital-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isAuthenticated ? (
            /* PIN Gate */
            <div className="p-8 sm:p-12 max-w-md mx-auto text-center space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-hospital-50 border border-hospital-200 text-hospital-600 flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-900 text-lg">
                  Staff Authentication
                </h4>
                <p className="text-xs text-slate-500">
                  Enter authorized receptionist PIN to manage patient appointment queue.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    maxLength={6}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Enter Staff PIN (e.g. 1234)"
                    className="w-full text-center tracking-widest font-mono text-lg py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-hospital-500 outline-none"
                  />
                  {pinError && (
                    <p className="text-xs text-red-600 font-medium mt-1.5">{pinError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-white bg-hospital-600 hover:bg-hospital-700 transition text-sm shadow-sm"
                >
                  Verify Access
                </button>

                <p className="text-[11px] text-slate-400">
                  Default Demo Access PIN: <span className="font-mono font-bold text-slate-700">1234</span>
                </p>
              </form>
            </div>
          ) : (
            /* Staff Dashboard Content */
            <div className="p-6 space-y-6">
              
              {/* Controls bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {/* Search input */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search patient, ID, mobile..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 outline-none focus:bg-white focus:border-hospital-500"
                  />
                </div>

                {/* Status Filter Tabs */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs w-full sm:w-auto overflow-x-auto">
                  {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-3 py-1.5 rounded-lg font-bold transition ${
                        filterStatus === st
                          ? 'bg-white text-hospital-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <button
                  onClick={fetchRequests}
                  className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition hidden sm:block"
                  title="Refresh List"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>

              </div>

              {/* Requests Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <div className="max-h-96 overflow-y-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 sticky top-0">
                        <th className="py-3 px-4">Tracking ID</th>
                        <th className="py-3 px-4">Patient</th>
                        <th className="py-3 px-4">Doctor & Dept</th>
                        <th className="py-3 px-4">Date & Slot</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredRequests.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-400">
                            No appointment requests found.
                          </td>
                        </tr>
                      ) : (
                        filteredRequests.map((req) => (
                          <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4 font-mono font-bold text-hospital-700">
                              {req.id}
                            </td>

                            <td className="py-3 px-4">
                              <p className="font-bold text-slate-900">{req.patientName}</p>
                              <p className="text-[11px] text-slate-500">{req.mobile}</p>
                            </td>

                            <td className="py-3 px-4">
                              <p className="font-semibold text-slate-800">{req.doctorName}</p>
                              <p className="text-[10px] text-slate-500">{req.departmentName}</p>
                            </td>

                            <td className="py-3 px-4">
                              <p className="font-semibold text-slate-800">{req.date}</p>
                              <p className="text-[10px] text-slate-500">{req.timeSlot}</p>
                            </td>

                            <td className="py-3 px-4">
                              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                req.status === 'Confirmed' 
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : req.status === 'Cancelled'
                                  ? 'bg-red-100 text-red-800'
                                  : req.status === 'Completed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {req.status}
                              </span>
                              {req.status === 'Cancelled' && (req.cancellationReason || req.staffNotes) && (
                                <p className="text-[10px] text-red-600 mt-1 max-w-[180px] truncate" title={req.cancellationReason || req.staffNotes}>
                                  Reason: {req.cancellationReason || req.staffNotes}
                                </p>
                              )}
                            </td>

                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {req.status === 'Pending' && (
                                  <button
                                    onClick={() => handleStatusChange(req.id, 'Confirmed')}
                                    className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold"
                                    title="Confirm appointment"
                                  >
                                    Confirm
                                  </button>
                                )}

                                {req.status !== 'Cancelled' && (
                                  <button
                                    onClick={() => handleStatusChange(req.id, 'Cancelled')}
                                    className="px-2 py-1 bg-slate-100 hover:bg-red-50 text-red-600 hover:text-red-700 rounded text-[11px] font-bold border border-slate-200"
                                    title="Cancel request"
                                  >
                                    Cancel
                                  </button>
                                )}

                                {req.status === 'Confirmed' && (
                                  <button
                                    onClick={() => handleStatusChange(req.id, 'Completed')}
                                    className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px] font-bold"
                                    title="Mark completed"
                                  >
                                    Completed
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <p>
                  Total Appointments in Store: <strong className="text-slate-800">{requests.length}</strong>
                </p>
                <p className="text-[11px]">
                  All sensitive patient data is stored locally in client-side secure store.
                </p>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
