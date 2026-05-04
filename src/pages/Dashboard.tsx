import { Link } from "react-router-dom";
import { doctors, appointments, patient } from "../data/mockData";
import {
  Settings,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Search,
  ArrowRight,
  User,
} from "lucide-react";
import { cn } from "../lib/utils";

export default function Dashboard() {
  const upcomingAppointments = appointments.filter(
    (a) => a.status === "upcoming",
  );
  const pastAppointments = appointments.filter((a) => a.status === "completed");

  return (
    <div className='bg-slate-50 min-h-screen pb-20'>
      {/* Dashboard Header */}
      <div className='bg-white border-b border-slate-200 mb-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
            <div className='flex items-center gap-6'>
              <div className='relative'>
                <img
                  src={patient.avatar}
                  className='w-20 h-20 rounded-2xl object-cover ring-4 ring-slate-50'
                />
                <div className='absolute -bottom-2 -right-2 bg-emerald-500 border-4 border-white w-8 h-8 rounded-full flex items-center justify-center'>
                  <CheckCircle2 className='w-4 h-4 text-white' />
                </div>
              </div>
              <div>
                <h1 className='text-2xl font-black text-slate-900 mb-1'>
                  Welcome back, {patient.name.split(" ")[0]}!
                </h1>
                <p className='text-slate-500 font-medium flex items-center gap-2'>
                  Patient Health Records <ChevronRight className='w-4 h-4' />
                  <span className='text-sky-600 font-bold'>
                    Standard Member
                  </span>
                </p>
              </div>
            </div>

            <div className='flex gap-3'>
              <button className='flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all'>
                <Settings className='w-4 h-4' /> Profile Settings
              </button>
              <button className='flex items-center gap-2 bg-slate-900 px-5 py-2.5 rounded-xl text-sm font-bold text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-200'>
                <Calendar className='w-4 h-4' /> New Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Stats Row */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
          {[
            {
              label: "Total Visits",
              val: appointments.length,
              icon: <User className='w-6 h-6' />,
              color: "sky",
            },
            {
              label: "Upcoming",
              val: upcomingAppointments.length,
              icon: <Clock className='w-6 h-6' />,
              color: "teal",
            },
            {
              label: "Completed",
              val: pastAppointments.length,
              icon: <CheckCircle2 className='w-6 h-6' />,
              color: "emerald",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className='bg-white border border-slate-200 rounded-4xl p-8 flex items-center justify-between group transition-all hover:border-slate-300'>
              <div>
                <p className='text-xs font-bold text-slate-400 uppercase tracking-widest mb-2'>
                  {stat.label}
                </p>
                <p className='text-3xl font-black text-slate-900'>{stat.val}</p>
              </div>
              <div
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                  stat.color === "sky"
                    ? "bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white"
                    : stat.color === "teal"
                      ? "bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white"
                      : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
                )}>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
          <div className='lg:col-span-2 space-y-12'>
            {/* Upcoming Appointments */}
            <section>
              <div className='flex items-center justify-between mb-8'>
                <h2 className='text-2xl font-bold text-slate-900 flex items-center gap-3'>
                  <Clock className='w-7 h-7 text-sky-500' />
                  Upcoming Visits
                </h2>
              </div>

              <div className='space-y-4'>
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((apt) => {
                    const doctor = doctors.find((d) => d.id === apt.doctorId);
                    if (!doctor) return null;
                    return (
                      <div
                        key={apt.id}
                        className='bg-white border border-slate-200 rounded-3xl p-6 transition-all hover:border-sky-200 group'>
                        <div className='flex flex-col md:flex-row md:items-center gap-6'>
                          <div className='flex items-center gap-4 grow'>
                            <img
                              src={doctor.photo}
                              className='w-16 h-16 rounded-2xl object-cover'
                            />
                            <div>
                              <h4 className='font-bold text-slate-900'>
                                {doctor.name}
                              </h4>
                              <p className='text-xs font-bold text-sky-600 uppercase tracking-wider'>
                                {doctor.specialty}
                              </p>
                              <div className='flex items-center gap-4 mt-2'>
                                <span className='flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-lg'>
                                  <Calendar className='w-3.5 h-3.5' />
                                  {apt.date}
                                </span>
                                <span className='flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-lg'>
                                  <Clock className='w-3.5 h-3.5' />
                                  {apt.time}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='flex gap-2'>
                            <button className='grow md:grow-0 px-4 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-100 border border-slate-100'>
                              Reschedule
                            </button>
                            <button className='grow md:grow-0 px-4 py-2.5 bg-white text-red-500 border border-red-100 rounded-xl text-sm font-bold hover:bg-red-50'>
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className='bg-slate-100 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center'>
                    <p className='text-slate-400 font-bold mb-4'>
                      No upcoming appointments found
                    </p>
                    <Link
                      to='/doctors'
                      className='text-sky-600 font-black hover:underline uppercase tracking-widest text-xs'>
                      Book your first visit
                    </Link>
                  </div>
                )}
              </div>
            </section>

            {/* Past Activity */}
            <section>
              <h2 className='text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3'>
                <AlertCircle className='w-7 h-7 text-slate-400' />
                Past Consultation History
              </h2>
              <div className='space-y-4'>
                {pastAppointments.map((apt) => {
                  const doctor = doctors.find((d) => d.id === apt.doctorId);
                  if (!doctor) return null;
                  return (
                    <div
                      key={apt.id}
                      className='bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between opacity-75 hover:opacity-100 transition-opacity'>
                      <div className='flex items-center gap-4 mb-4 md:mb-0'>
                        <img
                          src={doctor.photo}
                          className='w-12 h-12 rounded-xl object-cover grayscale'
                        />
                        <div>
                          <h4 className='font-bold text-slate-700'>
                            {doctor.name}
                          </h4>
                          <p className='text-xs text-slate-400'>
                            {apt.date} • {apt.reason}
                          </p>
                        </div>
                      </div>
                      <Link
                        to={`/booking/${doctor.id}`}
                        className='w-full md:w-auto px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-sky-50 hover:text-sky-600 transition-all text-center'>
                        Book Again
                      </Link>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Activity Logs & Quick Actions */}
          <aside className='space-y-8'>
            <div className='bg-white border border-slate-200 rounded-4xl p-8'>
              <h3 className='text-lg font-bold text-slate-900 mb-6 flex items-center gap-2'>
                Quick Actions
              </h3>
              <div className='space-y-3'>
                <Link
                  to='/doctors'
                  className='flex items-center justify-between p-4 bg-sky-50 border border-sky-100 rounded-2xl group transition-all hover:bg-sky-100'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-white rounded-xl flex items-center justify-center text-sky-600 shadow-sm border border-sky-50'>
                      <Search className='w-5 h-5' />
                    </div>
                    <span className='font-bold text-sky-700 text-sm'>
                      Find New Doctor
                    </span>
                  </div>
                  <ArrowRight className='w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-transform' />
                </Link>
                <Link
                  to='/contact'
                  className='flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl group transition-all hover:bg-slate-100'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-600 shadow-sm border border-slate-100'>
                      <MapPin className='w-5 h-5' />
                    </div>
                    <span className='font-bold text-slate-700 text-sm'>
                      Nearest Clinics
                    </span>
                  </div>
                  <ArrowRight className='w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform' />
                </Link>
              </div>
            </div>

            <div className='bg-slate-900 rounded-4xl p-8 text-white'>
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
                <h3 className='text-sm font-bold uppercase tracking-widest text-slate-400'>
                  Health Pro Insight
                </h3>
              </div>
              <h4 className='text-xl font-bold mb-4'>Complete your Profile</h4>
              <p className='text-slate-400 text-sm mb-8 leading-relaxed'>
                Providing your medical history helps doctors offer more accurate
                advice during consultations.
              </p>
              <button className='w-full bg-sky-600 py-3.5 rounded-xl font-bold shadow-lg shadow-sky-900/50 hover:bg-sky-500 transition-colors'>
                Update History
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
