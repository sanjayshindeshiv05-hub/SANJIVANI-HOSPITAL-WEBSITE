# Sanjeevan Medical Centre – Advanced Multispeciality Hospital
### संजीवन मेडिकल केंद्र – एडवांस्ड मल्टीस्पेशलिटी हॉस्पिटल (कराड)

A **premium, modern, trustworthy, and fully responsive website** for **Sanjeevan Medical Centre**, built using **React, Vite, and Tailwind CSS**.

Inspired by top-tier modern hospital interfaces (clean aesthetic, trust badges, clear patient navigation, appointment conversion, bilingual English & Marathi support, and accessible 24/7 care actions).

---

## 🏥 Hospital Key Information

- **Hospital Name:** Sanjeevan Medical Centre – Advanced Multispeciality Hospital
- **Marathi Name:** संजीवन मेडिकल केंद्र – एडवांस्ड मल्टीस्पेशलिटी हॉस्पिटल
- **Address:** 4, Market Yard Road, Shaniwar Peth, Karad, Maharashtra 415110, India
- **Phone:** 099600 17474 *(Clickable `tel:` dialer across all sections)*
- **Availability:** 24 Hours Open (Emergency, Casualty & Inpatient Services)
- **Google Rating:** 4.6 / 5.0 based on 181 patient reviews

---

## 🌟 Key Website Features & Structure

1. **Sticky Modern Header & Navigation:**
   - Hospital identity with medical cross emblem and bilingual titles.
   - 24/7 emergency care indicator badge.
   - Quick language toggle button (**English / मराठी**).
   - Quick direct dialer (`099600 17474`).
   - "Book Appointment" primary button.
   - Smooth animated mobile drawer menu.

2. **Hero Section:**
   - High-impact, reassuring headline and concise hospital introduction.
   - Direct CTA buttons: **Book an Appointment** (primary) & **Contact Hospital** (secondary).
   - Overlapping 4-pillar trust metrics:
     - ⭐ **4.6 / 5.0 Google Rating** (based on 181 reviews)
     - 🕒 **24 Hours Open**
     - 🏥 **Multispeciality Hospital**
     - 📍 **Central Location** (4, Market Yard Rd, Shaniwar Peth, Karad)

3. **About the Hospital:**
   - Hospital story, multispeciality profile, commitment to patient dignity.
   - 4 Core Pillars: 24/7 Active Care, Multispeciality Scope, Dedicated Medical Staff, Patient-Centered Care.

4. **Clinical Specialities & Departments:**
   - Visual cards inspired by the reference design (photo thumbnail, medical icon, category badge, and concise description):
     - General Medicine (औषधोपचार)
     - General & Laparoscopic Surgery (शस्त्रक्रिया)
     - Obstetrics & Gynecology (स्त्रीरोग व प्रसूती)
     - Pediatrics & Child Health (बालरोग)
     - Orthopedics & Joint Care (अस्थिव्यंग व सांधे)
     - 24/7 Emergency & Trauma Care (आपत्कालीन कक्ष)
     - ICU & Inpatient Care (अतिदक्षता विभाग)
     - Diagnostic & Pathology Services (पॅथॉलॉजी)
   - Interactive **Learn More Modal** detailing symptoms treated and direct booking button.

5. **Specialist Doctors Directory:**
   - Department filter tabs and real-time search bar.
   - Structured placeholder doctor slots (`SMC-DOC-01` to `06`) configured for easy replacement in `src/data/doctorsData.js`.
   - Doctor card with photo, qualification, consultation hours, rating, and "Book Appointment" button.
   - Interactive **Doctor Profile Modal**.

6. **Interactive Appointment Booking, Tracking & Cancellation System:**
   - Multi-field validated booking form (Patient Name, Mobile Number [10 digits], Email, Department, Doctor, Date picker with past date prevention, Time slot selection, Reason for visit).
   - Generates realistic unique tracking ID (e.g., `SMC-2026-XXXX`).
   - Clear status: **"Pending Hospital Confirmation"**.
   - Notice: Reception will verify slot via 099600 17474.
   - Option to Print/Save receipt slip.
   - **Track Request Status Tab**: Patients can search by their Tracking ID to check status.
   - **Online Appointment Cancellation**: Patients can directly cancel an appointment using their Tracking ID and registered mobile number, selecting a cancellation reason (Schedule conflict, recovered, etc.). Cancellation updates live in Supabase backend with `status: 'Cancelled'`.
   - Option to cancel directly from the Track Status card or the Dedicated Cancel Tab.

7. **Hospital Staff Portal (Internal Desk View):**
   - Accessible via "Staff Portal" in the top bar / footer.
   - PIN-protected access (Default demo PIN: `1234`).
   - Allows hospital staff to search requests, filter by **Pending / Confirmed / Cancelled / Completed**, and update request statuses.

8. **Patient Trust & Google Reviews Section:**
   - Highlights the 4.6/5.0 Google rating based on 181 reviews without fabricated testimonials.
   - Direct link to Google Maps reviews.

9. **Emergency Action Banner & Contact Section:**
   - 24/7 urgent helpline highlight.
   - Embedded interactive responsive map of Shaniwar Peth, Market Yard Road, Karad.
   - Prominent **Get Directions** button.
   - General inquiry form.

10. **Mobile Quick Action Floating Bar:**
    - Sticky bottom bar on mobile screens:
      - 📞 **Call (099600 17474)**
      - 📅 **Book Appointment**
      - 🗺️ **Get Directions**

---

## 🚀 How to Run the Website

### Option 1: One-Click Launch (Windows)
- Simply double-click **`run-dev.bat`** (for development server) or **`run-preview.bat`** (for production preview).

### Option 2: Using Terminal / Command Prompt
```bash
# Start development server
npm run dev

# Or build and preview production bundle
npm run build
npm run preview
```
Visit **`http://localhost:3000`** (or the port displayed in terminal).

---

## 💻 Cross-Device Responsiveness
- **Laptops & MacBooks:** High-resolution retina layouts, spacious typography, smooth transitions.
- **Tablets & iPads:** Optimized grid layouts, touch-friendly interactive cards and modals.
- **Mobile Phones (iOS & Android):** Sticky top bar, hamburger drawer, sticky bottom emergency action bar, and single-column touch forms.
