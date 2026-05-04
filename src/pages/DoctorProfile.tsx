import { useParams, Link } from "react-router-dom";
import {
  Star,
  MapPin,
  Building,
  Globe,
  MessageCircle,
  Clock,
  Calendar,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { doctors } from "../data/mockData";
import { useState } from "react";
import { cn } from "../lib/utils";

// Doctor Profile Page - Displays detailed information about a specific doctor, including bio, reviews, and booking options.
export default function DoctorProfile() {
  const { id } = useParams();
  const doctor = doctors.find((d) => d.id === id);
  const [selectedDate, setSelectedDate] = useState<string>(
    Object.keys(doctor?.availability || {})[0],
  );
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Handle case where doctor is not found (invalid ID)
  if (!doctor)
    return (
      <div className='py-20 text-center text-slate-500'>Doctor not found</div>
    );

  return (
    <div className='bg-slate-50 min-h-screen pb-20'>
      {/* Header / Breadcrumb */}
      <div className='bg-white border-b border-slate-200 py-6'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <nav className='flex items-center gap-2 text-sm font-medium text-slate-500 mb-6'>
            <Link to='/' className='hover:text-sky-600'>
              Home
            </Link>
            <ChevronRight className='w-4 h-4' />
            <Link to='/doctors' className='hover:text-sky-600'>
              Doctors
            </Link>
            <ChevronRight className='w-4 h-4' />
            <span className='text-sky-600'>{doctor.name}</span>
          </nav>

          {/* Doctor Image and Info */}
          <div className='flex flex-col md:flex-row gap-8 items-start'>
            <div className='relative group shrink-0'>
              <img
                src={doctor.photo}
                alt={doctor.name}
                className='w-32 h-32 md:w-48 md:h-48 rounded-3xl object-cover shadow-xl border-4 border-white'
              />
              <div className='absolute -bottom-3 -right-3 bg-green-500 border-4 border-white w-10 h-10 rounded-full flex items-center justify-center'>
                <CheckCircle2 className='w-5 h-5 text-white' />
              </div>
            </div>

            <div className='grow pt-2'>
              <div className='flex flex-col md:flex-row md:items-center gap-4 mb-4'>
                <h1 className='text-3xl font-bold text-slate-900'>
                  {doctor.name}
                </h1>
                <div className='flex items-center gap-2 bg-sky-50 px-3 py-1 rounded-full border border-sky-100'>
                  <span className='text-xs font-black text-sky-600 uppercase tracking-widest'>
                    {doctor.specialty}
                  </span>
                </div>
              </div>

              <div className='flex flex-wrap gap-y-4 gap-x-8 text-slate-600 text-sm font-medium mb-8'>
                <div className='flex items-center gap-2'>
                  <Star className='w-5 h-5 text-amber-400 fill-current' />
                  <span className='text-slate-900 font-bold'>
                    {doctor.rating}
                  </span>
                  <span className='text-slate-400'>
                    ({doctor.reviewCount} Reviews)
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <Building className='w-5 h-5 text-slate-400' />
                  <span>{doctor.hospital}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='w-5 h-5 text-slate-400' />
                  <span>{doctor.experience} Years of Exp.</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Globe className='w-5 h-5 text-slate-400' />
                  <span>{doctor.languages.join(", ")}</span>
                </div>
              </div>

              <div className='bg-emerald-50 border border-emerald-100 rounded-xl py-3 px-4 inline-flex items-center gap-3'>
                <div className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
                <span className='text-sm font-bold text-emerald-700'>
                  Available Today for Consultation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Availability / Booking */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
          {/* Main Info */}
          <div className='lg:col-span-2 space-y-12'>
            {/* About */}
            <section>
              <h2 className='text-2xl font-bold text-slate-900 mb-6'>
                About the Doctor
              </h2>
              <p className='text-slate-600 text-lg leading-relaxed mb-8'>
                {doctor.bio}
              </p>
              <div className='flex flex-wrap gap-2'>
                {[
                  "Cardiology Specialist",
                  "Non-invasive Cardiology",
                  "Heart Failure Expert",
                  "Clinical Research",
                ].map((tag) => (
                  <span
                    key={tag}
                    className='px-4 py-2 bg-slate-100 rounded-lg text-sm font-semibold text-slate-700'>
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Availability / Booking */}
            <section className='bg-white border border-slate-200 rounded-3xl p-8 shadow-sm'>
              <h2 className='text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3'>
                <Calendar className='w-7 h-7 text-sky-500' />
                Appointment Schedule
              </h2>

              <div className='mb-10'>
                <h3 className='text-sm font-bold text-slate-900 uppercase tracking-widest mb-4'>
                  Select Date
                </h3>
                <div className='flex gap-4 overflow-x-auto pb-4 scrollbar-hide'>
                  {Object.keys(doctor.availability).map((date) => {
                    const dateObj = new Date(date);
                    return (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={cn(
                          "flex flex-col items-center min-w-25 py-4 rounded-2xl border-2 transition-all",
                          selectedDate === date
                            ? "bg-sky-50 border-sky-500 shadow-md shadow-sky-100"
                            : "bg-white border-slate-100 text-slate-500 hover:border-slate-200",
                        )}>
                        <span className='text-xs font-bold uppercase tracking-widest mb-1'>
                          {dateObj.toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </span>
                        <span
                          className={cn(
                            "text-xl font-black",
                            selectedDate === date
                              ? "text-sky-700"
                              : "text-slate-900",
                          )}>
                          {dateObj.getDate()}
                        </span>
                        <span className='text-xs font-semibold mt-1'>
                          {dateObj.toLocaleDateString("en-US", {
                            month: "short",
                          })}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className='text-sm font-bold text-slate-900 uppercase tracking-widest mb-4'>
                  Available Slots
                </h3>
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                  {doctor.availability[selectedDate]?.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={cn(
                        "py-3 rounded-xl text-sm font-bold transition-all border-2",
                        selectedSlot === slot
                          ? "bg-teal-50 border-teal-500 text-teal-700 shadow-sm"
                          : "bg-white border-slate-100 text-slate-600 hover:border-slate-200",
                      )}>
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Patient Reviews */}
            <section>
              <div className='flex items-center justify-between mb-8'>
                <h2 className='text-2xl font-bold text-slate-900'>
                  Patient Reviews
                </h2>
                <button className='text-sky-600 font-bold text-sm hover:underline'>
                  Write a review
                </button>
              </div>

              <div className='space-y-6'>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className='bg-white border border-slate-200 rounded-3xl p-8 relative'>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-4 mb-6'>
                      <div className='flex items-center gap-1 text-amber-500'>
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} className='w-4 h-4 fill-current' />
                        ))}
                      </div>
                      <span className='hidden sm:block text-slate-300'>|</span>
                      <span className='text-sm font-bold text-slate-900'>
                        Verified Visit
                      </span>
                      <span className='sm:ml-auto text-xs font-semibold text-slate-400'>
                        2 months ago
                      </span>
                    </div>
                    <div className='flex gap-4 items-start'>
                      <div className='w-12 h-12 rounded-full bg-slate-100 shrink-0 flex items-center justify-center font-bold text-slate-500'>
                        KJ
                      </div>
                      <div>
                        <h4 className='font-bold text-slate-900 mb-2'>
                          Excellent and caring doctor
                        </h4>
                        <p className='text-slate-600 leading-relaxed'>
                          Dr. {doctor.name.split(" ")[2]} was very patient and
                          explained my condition in detail. I felt heard and
                          well-cared for. Highly recommend her services to
                          everyone.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky Sidebar CTA */}
          <aside className='lg:sticky lg:top-24 space-y-6'>
            <div className='bg-white border border-slate-200 rounded-4xl p-8 shadow-xl shadow-slate-200/50'>
              <div className='flex items-center justify-between mb-8 pb-6 border-b border-slate-100'>
                <span className='text-slate-500 font-semibold uppercase tracking-wider text-xs'>
                  Consultation Fee
                </span>
                <div className='flex items-end gap-1'>
                  <span className='text-3xl font-black text-slate-900'>
                    ${doctor.fee}
                  </span>
                  <span className='text-slate-400 text-sm font-bold mb-1'>
                    / visit
                  </span>
                </div>
              </div>

              <div className='space-y-4 mb-8'>
                <div className='flex items-center gap-3 text-slate-600'>
                  <div className='w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600'>
                    <MapPin className='w-4 h-4' />
                  </div>
                  <span className='text-sm font-bold truncate leading-tight'>
                    {doctor.location}
                  </span>
                </div>
                <div className='flex items-center gap-3 text-slate-600'>
                  <div className='w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600'>
                    <Clock className='w-4 h-4' />
                  </div>
                  <span className='text-sm font-bold'>15 - 30 min session</span>
                </div>
              </div>

              <Link
                to={`/booking/${doctor.id}?date=${selectedDate}&slot=${selectedSlot}`}
                className='block w-full text-center bg-sky-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-sky-700 transition-all shadow-lg shadow-sky-100'>
                Book Appointment
              </Link>

              <div className='mt-6 flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest'>
                <MessageCircle className='w-4 h-4' />
                <span>Free follow-up within 7 days</span>
              </div>
            </div>

            <div className='bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden'>
              <div className='absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl' />
              <h4 className='font-bold mb-4 relative z-10'>
                Need Urgent Help?
              </h4>
              <p className='text-slate-400 text-sm mb-6 relative z-10'>
                Call our 24/7 medical assistance helpline for immediate
                guidance.
              </p>
              <button className='w-full bg-white/10 hover:bg-white/20 py-3 rounded-xl text-sm font-bold transition-colors'>
                Contact Helpline
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
