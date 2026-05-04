import { useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { doctors } from "../data/mockData";
import {
  Check,
  Calendar,
  Clock,
  User,
  FileText,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { cn } from "../lib/utils";

type Step = 1 | 2 | 3;

export default function AppointmentBooking() {
  const { doctorId } = useParams();
  const [searchParams] = useSearchParams();
  const doctor = doctors.find((d) => d.id === doctorId);

  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    date: searchParams.get("date") || "",
    slot: searchParams.get("slot") || "",
    fullName: "",
    email: "",
    phone: "",
    reason: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!doctor) return <div className='py-20 text-center'>Doctor not found</div>;

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.reason)
      newErrors.reason = "Please state your reason for visit";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && formData.date && formData.slot) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleConfirm = () => {
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className='bg-slate-50 min-h-screen py-20 px-4'>
        <div className='max-w-xl mx-auto bg-white rounded-[2.5rem] border border-slate-200 p-12 text-center shadow-2xl shadow-sky-100'>
          <div className='w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-in zoom-in duration-500'>
            <CheckCircle2 className='w-12 h-12 text-emerald-600' />
          </div>
          <h1 className='text-4xl font-black text-slate-900 mb-4'>
            Confirmed!
          </h1>
          <p className='text-slate-500 text-lg mb-10'>
            Your appointment with{" "}
            <span className='text-sky-600 font-bold'>{doctor.name}</span> has
            been successfully booked.
          </p>

          <div className='bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left mb-10 space-y-4'>
            <div className='flex justify-between items-center pb-4 border-b border-white'>
              <span className='text-sm font-bold text-slate-400 uppercase tracking-widest'>
                Booking ID
              </span>
              <span className='text-sm font-black text-slate-900'>
                RESERVE-{Math.random().toString(36).substr(2, 6).toUpperCase()}
              </span>
            </div>
            <div className='flex items-center gap-4'>
              <div className='w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-slate-200'>
                <Calendar className='w-5 h-5 text-sky-500' />
              </div>
              <div>
                <p className='text-xs font-bold text-slate-400 uppercase'>
                  Date & Time
                </p>
                <p className='text-sm font-black text-slate-800'>
                  {new Date(formData.date).toLocaleDateString("en-US", {
                    dateStyle: "long",
                  })}{" "}
                  at {formData.slot}
                </p>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <Link
              to='/dashboard'
              className='bg-sky-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-sky-100 hover:bg-sky-700 transition-all'>
              Go to Dashboard
            </Link>
            <Link
              to='/'
              className='text-slate-400 font-bold hover:text-slate-600 text-sm'>
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-slate-50 min-h-screen py-12 px-4'>
      <div className='max-w-4xl mx-auto'>
        <button
          onClick={() => window.history.back()}
          className='flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 mb-8 transition-colors'>
          <ArrowLeft className='w-5 h-5' /> Back to Profile
        </button>

        {/* Progress Indicator */}
        <div className='mb-12'>
          <div className='flex items-center justify-between relative max-w-2xl mx-auto'>
            <div className='absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10' />
            <div
              className='absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-sky-500 -z-10 transition-all duration-500'
              style={{ width: `${(step - 1) * 50}%` }}
            />

            {[
              {
                id: 1,
                name: "Select Time",
                icon: <Calendar className='w-5 h-5' />,
              },
              { id: 2, name: "Your Info", icon: <User className='w-5 h-5' /> },
              { id: 3, name: "Confirm", icon: <Check className='w-5 h-5' /> },
            ].map((s) => (
              <div key={s.id} className='flex flex-col items-center gap-3'>
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300",
                    step >= s.id
                      ? "bg-sky-600 border-white text-white shadow-lg"
                      : "bg-white border-slate-200 text-slate-400",
                  )}>
                  {step > s.id ? <Check className='w-6 h-6' /> : s.icon}
                </div>
                <span
                  className={cn(
                    "text-xs font-bold uppercase tracking-widest",
                    step >= s.id ? "text-sky-600" : "text-slate-400",
                  )}>
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
          <div className='lg:col-span-2 space-y-6'>
            {/* Step 1: Select Time */}
            {step === 1 && (
              <div className='bg-white border border-slate-200 rounded-3xl p-8 shadow-sm animate-in slide-in-from-right duration-300'>
                <h2 className='text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3'>
                  <Clock className='w-7 h-7 text-sky-500' />
                  Choose Appointment Time
                </h2>

                <div className='space-y-8'>
                  <div>
                    <p className='text-sm font-bold text-slate-900 uppercase tracking-widest mb-4'>
                      Select Date
                    </p>
                    <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                      {Object.keys(doctor.availability).map((date) => (
                        <button
                          key={date}
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, date }))
                          }
                          className={cn(
                            "py-4 px-2 rounded-xl border-2 font-bold text-sm transition-all",
                            formData.date === date
                              ? "border-sky-500 bg-sky-50 text-sky-700"
                              : "border-slate-100 hover:border-slate-200",
                          )}>
                          {new Date(date).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            weekday: "short",
                          })}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className='text-sm font-bold text-slate-900 uppercase tracking-widest mb-4'>
                      Select Slot
                    </p>
                    <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                      {doctor.availability[formData.date]?.map((slot) => (
                        <button
                          key={slot}
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, slot }))
                          }
                          className={cn(
                            "py-3 rounded-xl border-2 font-bold text-sm transition-all",
                            formData.slot === slot
                              ? "border-teal-500 bg-teal-50 text-teal-700"
                              : "border-slate-100 hover:border-slate-200",
                          )}>
                          {slot}
                        </button>
                      ))}
                      {!formData.date && (
                        <p className='col-span-full text-slate-400 italic text-sm'>
                          Please select a date first
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Patient Info */}
            {step === 2 && (
              <div className='bg-white border border-slate-200 rounded-3xl p-8 shadow-sm animate-in slide-in-from-right duration-300'>
                <h2 className='text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3'>
                  <User className='w-7 h-7 text-sky-500' />
                  Patient Information
                </h2>

                <div className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                      <label className='text-sm font-bold text-slate-700'>
                        Full Name
                      </label>
                      <input
                        type='text'
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            fullName: e.target.value,
                          }))
                        }
                        className={cn(
                          "w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:border-sky-500 transition-colors",
                          errors.fullName
                            ? "border-red-500"
                            : "border-slate-200",
                        )}
                        placeholder='John Doe'
                      />
                      {errors.fullName && (
                        <p className='text-xs font-bold text-red-500'>
                          {errors.fullName}
                        </p>
                      )}
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-bold text-slate-700'>
                        Email Address
                      </label>
                      <input
                        type='email'
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, email: e.target.value }))
                        }
                        className={cn(
                          "w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:border-sky-500 transition-colors",
                          errors.email ? "border-red-500" : "border-slate-200",
                        )}
                        placeholder='john@example.com'
                      />
                      {errors.email && (
                        <p className='text-xs font-bold text-red-500'>
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-bold text-slate-700'>
                      Phone Number
                    </label>
                    <input
                      type='tel'
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, phone: e.target.value }))
                      }
                      className={cn(
                        "w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:border-sky-500 transition-colors",
                        errors.phone ? "border-red-500" : "border-slate-200",
                      )}
                      placeholder='+1 (555) 000-0000'
                    />
                    {errors.phone && (
                      <p className='text-xs font-bold text-red-500'>
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-bold text-slate-700'>
                      Reason for Visit
                    </label>
                    <textarea
                      rows={4}
                      value={formData.reason}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, reason: e.target.value }))
                      }
                      className={cn(
                        "w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:border-sky-500 transition-colors resize-none",
                        errors.reason ? "border-red-500" : "border-slate-200",
                      )}
                      placeholder='Briefly describe your symptoms or reason for the visit...'
                    />
                    {errors.reason && (
                      <p className='text-xs font-bold text-red-500'>
                        {errors.reason}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className='bg-white border border-slate-200 rounded-3xl p-8 shadow-sm animate-in slide-in-from-right duration-300'>
                <h2 className='text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3'>
                  <FileText className='w-7 h-7 text-sky-500' />
                  Review & Confirm
                </h2>

                <div className='space-y-8'>
                  <div className='bg-slate-50 rounded-2xl p-6 border border-slate-100'>
                    <p className='text-xs font-bold text-slate-400 uppercase tracking-widest mb-4'>
                      Patient Details
                    </p>
                    <div className='grid grid-cols-2 gap-y-4'>
                      <div>
                        <p className='text-xs text-slate-500 mb-1'>Name</p>
                        <p className='font-bold text-slate-900'>
                          {formData.fullName}
                        </p>
                      </div>
                      <div>
                        <p className='text-xs text-slate-500 mb-1'>Email</p>
                        <p className='font-bold text-slate-900'>
                          {formData.email}
                        </p>
                      </div>
                      <div>
                        <p className='text-xs text-slate-500 mb-1'>Phone</p>
                        <p className='font-bold text-slate-900'>
                          {formData.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='bg-slate-50 rounded-2xl p-6 border border-slate-100'>
                    <p className='text-xs font-bold text-slate-400 uppercase tracking-widest mb-4'>
                      Symptoms / Reason
                    </p>
                    <p className='text-slate-700 leading-relaxed italic'>
                      "{formData.reason}"
                    </p>
                  </div>

                  <p className='text-xs text-slate-400 leading-relaxed text-center italic'>
                    By confirming, you agree to our terms of service and patient
                    privacy policy.
                  </p>
                </div>
              </div>
            )}

            <div className='flex justify-between items-center bg-white border border-slate-200 rounded-2xl p-4'>
              {step > 1 ? (
                <button
                  onClick={() => setStep((prev) => (prev - 1) as Step)}
                  className='px-6 py-3 font-bold text-slate-600 hover:text-slate-900 flex items-center gap-2'>
                  <ArrowLeft className='w-5 h-5' /> Previous
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  onClick={handleNext}
                  disabled={step === 1 && (!formData.date || !formData.slot)}
                  className='bg-sky-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-sky-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed'>
                  Next Step <ArrowRight className='w-5 h-5' />
                </button>
              ) : (
                <button
                  onClick={handleConfirm}
                  className='bg-sky-600 text-white px-12 py-3 rounded-xl font-black text-lg hover:bg-sky-700 transition-all shadow-lg shadow-sky-100'>
                  Confirm & Book
                </button>
              )}
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <aside className='lg:sticky lg:top-24'>
            <div className='bg-white border border-slate-200 rounded-4xl p-8 shadow-xl shadow-slate-200/50'>
              <h3 className='text-lg font-bold text-slate-900 mb-6'>
                Booking Summary
              </h3>

              <div className='flex gap-4 items-start pb-6 border-b border-slate-100 mb-6'>
                <img
                  src={doctor.photo}
                  className='w-14 h-14 rounded-xl object-cover'
                />
                <div>
                  <h4 className='font-bold text-slate-900 leading-tight'>
                    {doctor.name}
                  </h4>
                  <p className='text-xs font-bold text-sky-600 uppercase tracking-wider'>
                    {doctor.specialty}
                  </p>
                </div>
              </div>

              <div className='space-y-4 mb-8'>
                <div className='flex justify-between items-center text-sm'>
                  <span className='text-slate-500 font-medium tracking-tight flex items-center gap-2'>
                    <Calendar className='w-4 h-4' /> Date
                  </span>
                  <span
                    className={cn(
                      "font-bold",
                      formData.date
                        ? "text-slate-900"
                        : "text-slate-300 italic",
                    )}>
                    {formData.date
                      ? new Date(formData.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                        })
                      : "Not selected"}
                  </span>
                </div>
                <div className='flex justify-between items-center text-sm'>
                  <span className='text-slate-500 font-medium tracking-tight flex items-center gap-2'>
                    <Clock className='w-4 h-4' /> Time
                  </span>
                  <span
                    className={cn(
                      "font-bold",
                      formData.slot
                        ? "text-slate-900"
                        : "text-slate-300 italic",
                    )}>
                    {formData.slot || "Not selected"}
                  </span>
                </div>
                <div className='flex justify-between items-center text-sm'>
                  <span className='text-slate-500 font-medium tracking-tight flex items-center gap-2'>
                    <FileText className='w-4 h-4' /> Consultation Fee
                  </span>
                  <span className='font-bold text-slate-900'>
                    ${doctor.fee}
                  </span>
                </div>
              </div>

              <div className='bg-sky-50 rounded-2xl p-4 border border-sky-100 flex items-center gap-3'>
                <div className='w-8 h-8 rounded-full bg-white flex items-center justify-center text-sky-600 shadow-sm'>
                  <ShieldCheck className='w-5 h-5 text-sky-600' />
                </div>
                <p className='text-xs font-bold text-sky-800 leading-tight'>
                  Instant Confirmation & Guaranteed Service
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// Custom icon component for the security badge
function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}>
      <path d='M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z' />
      <path d='m9 12 2 2 4-4' />
    </svg>
  );
}
