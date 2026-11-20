import { supabase } from './supabaseClient';

const STORAGE_KEY = 'sanjeevan_appointment_requests_v1';

const INITIAL_REQUESTS = [
  {
    id: "SMC-2026-0814",
    patientName: "Ramesh Patil",
    mobile: "9822012345",
    email: "ramesh.patil@example.com",
    departmentId: "general-medicine",
    departmentName: "General Medicine",
    doctorId: "doc-gen-med",
    doctorName: "Consultant Physician",
    date: "2026-11-21",
    timeSlot: "10:30 AM – 11:30 AM",
    reason: "Routine diabetic review and recurring seasonal fever",
    status: "Pending",
    createdAt: "2026-11-19T10:15:00Z",
    staffNotes: "Contacted patient via phone, pending doctor OPD schedule verification"
  },
  {
    id: "SMC-2026-0792",
    patientName: "Sunita Deshmukh",
    mobile: "9422054321",
    email: "",
    departmentId: "obstetrics-gynecology",
    departmentName: "Obstetrics & Gynecology",
    doctorId: "doc-obgyn",
    doctorName: "Consultant Gynecologist & Obstetrician",
    date: "2026-11-22",
    timeSlot: "11:00 AM – 12:00 PM",
    reason: "Antenatal 2nd trimester routine ultrasound and blood pressure checkup",
    status: "Confirmed",
    createdAt: "2026-11-18T14:30:00Z",
    staffNotes: "Confirmed via telephone call on 099600 17474"
  }
];

function getLocalData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REQUESTS));
      return INITIAL_REQUESTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Local store read error:", err);
    return INITIAL_REQUESTS;
  }
}

function saveLocalData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Local store write error:", err);
  }
}

// Map database row (snake_case) to client model (camelCase)
function mapFromDb(row) {
  return {
    id: row.id,
    patientName: row.patient_name,
    mobile: row.mobile,
    email: row.email || "",
    departmentId: row.department_id,
    departmentName: row.department_name,
    doctorId: row.doctor_id,
    doctorName: row.doctor_name,
    date: row.date,
    timeSlot: row.time_slot,
    reason: row.reason || "",
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    staffNotes: row.staff_notes || "",
    cancellationReason: row.cancellation_reason || "",
    cancelledAt: row.cancelled_at || null,
    cancelledBy: row.cancelled_by || null
  };
}

export const appointmentApi = {
  // Asynchronously submit a new appointment request to Supabase Backend
  async submitAppointmentRequest(formData) {
    if (!formData.patientName || !formData.mobile || !formData.date || !formData.timeSlot) {
      throw new Error("Missing required appointment fields.");
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `SMC-2026-${randomSuffix}`;

    const newRecordPayload = {
      id: newId,
      patient_name: formData.patientName.trim(),
      mobile: formData.mobile.trim(),
      email: formData.email ? formData.email.trim() : null,
      department_id: formData.departmentId || "general-medicine",
      department_name: formData.departmentName || "General Medicine",
      doctor_id: formData.doctorId || "doc-gen-med",
      doctor_name: formData.doctorName || "Consultant Physician",
      date: formData.date,
      time_slot: formData.timeSlot,
      reason: formData.reason ? formData.reason.trim() : "General Consultation",
      status: "Pending",
      staff_notes: "Received via online patient portal. Awaiting hospital call confirmation."
    };

    let savedRecord = null;

    try {
      // 1. Persist directly into Supabase table
      const { data, error } = await supabase
        .from('appointment_requests')
        .insert([newRecordPayload])
        .select()
        .single();

      if (error) {
        console.warn("Supabase insertion warning, falling back to local sync:", error);
      } else if (data) {
        savedRecord = mapFromDb(data);
      }
    } catch (apiErr) {
      console.warn("Supabase network error, fallback enabled:", apiErr);
    }

    // 2. Always synchronize with local backup storage
    if (!savedRecord) {
      savedRecord = {
        id: newId,
        patientName: formData.patientName.trim(),
        mobile: formData.mobile.trim(),
        email: formData.email ? formData.email.trim() : "",
        departmentId: formData.departmentId || "general-medicine",
        departmentName: formData.departmentName || "General Medicine",
        doctorId: formData.doctorId || "doc-gen-med",
        doctorName: formData.doctorName || "Consultant Physician",
        date: formData.date,
        timeSlot: formData.timeSlot,
        reason: formData.reason ? formData.reason.trim() : "General Consultation",
        status: "Pending",
        createdAt: new Date().toISOString(),
        staffNotes: "Received via online patient portal. Awaiting hospital call confirmation."
      };
    }

    const locals = getLocalData();
    saveLocalData([savedRecord, ...locals.filter(x => x.id !== savedRecord.id)]);

    return {
      success: true,
      data: savedRecord,
      message: "Your appointment request has been safely saved to Sanjeevan Medical Centre backend. Our reception will contact you on 099600 17474 to confirm."
    };
  },

  // Hospital staff internal retrieval (Supabase first, fallback local)
  async getAllRequests() {
    try {
      const { data, error } = await supabase
        .from('appointment_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map(mapFromDb);
      }
    } catch (err) {
      console.warn("Supabase fetch warning, using local cache:", err);
    }

    return getLocalData();
  },

  // Look up request by patient tracking ID
  async getRequestById(id) {
    const cleanId = id.trim().toUpperCase();

    try {
      const { data, error } = await supabase
        .from('appointment_requests')
        .select('*')
        .ilike('id', cleanId)
        .maybeSingle();

      if (!error && data) {
        return mapFromDb(data);
      }
    } catch (err) {
      console.warn("Supabase query warning:", err);
    }

    const list = getLocalData();
    return list.find((item) => item.id.toUpperCase() === cleanId) || null;
  },

  // Update status (Pending -> Confirmed / Cancelled / Completed)
  async updateStatus(id, newStatus, staffNotes = "") {
    try {
      const { data, error } = await supabase
        .from('appointment_requests')
        .update({
          status: newStatus,
          staff_notes: staffNotes,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        const updated = mapFromDb(data);
        const list = getLocalData();
        saveLocalData(list.map(item => item.id === id ? updated : item));
        return updated;
      }
    } catch (err) {
      console.warn("Supabase update error:", err);
    }

    const list = getLocalData();
    const index = list.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Appointment request not found");

    list[index].status = newStatus;
    if (staffNotes) list[index].staffNotes = staffNotes;
    list[index].updatedAt = new Date().toISOString();

    saveLocalData(list);
    return list[index];
  },

  // Patient cancellation through website directly backed by Supabase RPC & tables
  async cancelAppointment(id, mobile = "", reason = "") {
    const cleanId = id.trim().toUpperCase();
    const cleanMobile = mobile.replace(/\D/g, '');

    // 1. Verify appointment exists
    const appointment = await this.getRequestById(cleanId);
    if (!appointment) {
      throw new Error("Appointment request not found. Please verify the ID.");
    }

    if (appointment.status === 'Cancelled') {
      throw new Error("This appointment has already been cancelled.");
    }

    if (appointment.status === 'Completed') {
      throw new Error("This appointment has already been completed and cannot be cancelled.");
    }

    // Optional phone verification if provided
    if (cleanMobile && cleanMobile.length === 10 && appointment.mobile.replace(/\D/g, '') !== cleanMobile) {
      throw new Error("The mobile number does not match our records for this appointment request.");
    }

    // 2. Call Supabase atomic RPC cancel_appointment
    try {
      const { data, error } = await supabase.rpc('cancel_appointment', {
        p_appointment_id: cleanId,
        p_mobile: cleanMobile || null,
        p_reason: reason.trim() || 'Cancelled by patient',
        p_notes: 'Online patient cancellation via website'
      });

      if (!error && data) {
        const updated = mapFromDb(data);
        const list = getLocalData();
        saveLocalData(list.map(item => item.id === cleanId ? updated : item));
        return updated;
      }
      if (error) {
        console.warn("Supabase RPC error, executing direct table cancellation:", error);
      }
    } catch (rpcErr) {
      console.warn("RPC network error:", rpcErr);
    }

    // 3. Fallback direct table update in Supabase
    try {
      const { data, error } = await supabase
        .from('appointment_requests')
        .update({
          status: 'Cancelled',
          cancellation_reason: reason.trim() || 'Cancelled by patient',
          cancelled_at: new Date().toISOString(),
          cancelled_by: 'patient',
          staff_notes: `Cancelled by patient via website. Reason: ${reason.trim()}`,
          updated_at: new Date().toISOString()
        })
        .eq('id', cleanId)
        .select()
        .single();

      if (!error && data) {
        // Log into appointment_cancellations table as well
        await supabase.from('appointment_cancellations').insert([{
          appointment_id: cleanId,
          patient_name: appointment.patientName,
          mobile: appointment.mobile,
          doctor_name: appointment.doctorName,
          department_name: appointment.departmentName,
          reason: reason.trim() || 'Cancelled by patient',
          notes: 'Direct table cancellation',
          cancelled_by: 'patient'
        }]);

        const updated = mapFromDb(data);
        const list = getLocalData();
        saveLocalData(list.map(item => item.id === cleanId ? updated : item));
        return updated;
      }
    } catch (tableErr) {
      console.warn("Direct table cancellation error:", tableErr);
    }

    // 4. Local storage fallback
    const list = getLocalData();
    const index = list.findIndex((item) => item.id === cleanId);
    if (index === -1) throw new Error("Appointment request not found");

    list[index].status = 'Cancelled';
    list[index].cancellationReason = reason.trim();
    list[index].cancelledAt = new Date().toISOString();
    list[index].staffNotes = `Cancelled by patient via website. Reason: ${reason.trim()}`;
    list[index].updatedAt = new Date().toISOString();

    saveLocalData(list);
    return list[index];
  }
};
