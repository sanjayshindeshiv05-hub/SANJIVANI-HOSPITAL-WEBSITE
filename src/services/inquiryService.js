import { supabase } from './supabaseClient';

export const inquiryApi = {
  async submitInquiry(formData) {
    if (!formData.name || !formData.phone || !formData.message) {
      throw new Error("Please provide your name, phone number, and message.");
    }

    const payload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject ? formData.subject.trim() : "General Inquiry",
      message: formData.message.trim(),
      status: "New"
    };

    try {
      const { data, error } = await supabase
        .from('general_inquiries')
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.warn("Supabase general inquiry insert error:", error);
      } else {
        return { success: true, data };
      }
    } catch (err) {
      console.warn("Supabase network error:", err);
    }

    // Fallback store in local storage
    try {
      const existing = JSON.parse(localStorage.getItem('sanjeevan_general_inquiries') || '[]');
      existing.unshift({ ...payload, id: Date.now().toString(), created_at: new Date().toISOString() });
      localStorage.setItem('sanjeevan_general_inquiries', JSON.stringify(existing));
    } catch (e) {
      console.error(e);
    }

    return { success: true, data: payload };
  },

  async getAllInquiries() {
    try {
      const { data, error } = await supabase
        .from('general_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data;
      }
    } catch (err) {
      console.warn("Error fetching inquiries:", err);
    }

    try {
      return JSON.parse(localStorage.getItem('sanjeevan_general_inquiries') || '[]');
    } catch (e) {
      return [];
    }
  }
};
