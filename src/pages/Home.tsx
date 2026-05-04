import {
  Search,
  MapPin,
  Users,
  Stethoscope,
  CalendarCheck,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { doctors } from "../data/mockData";
import { motion } from "motion/react";

export default function Home() {
  const featuredDoctors = doctors.slice(0, 3);

  return (
    <div className='flex flex-col'>
      {/* Hero Section */}
      <section className='relative bg-white pt-20 pb-32 overflow-hidden'>
        <div className='absolute inset-0 bg-linear-to-b from-sky-50/50 to-transparent pointer-none' />
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
          <div className='text-center max-w-3xl mx-auto mb-16'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              <span className='inline-block px-4 py-1.5 rounded-full bg-sky-50 text-sky-600 text-sm font-semibold mb-6 tracking-wide uppercase'>
                Premium Healthcare Access
              </span>
              <h1 className='text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6'>
                Your Health, Our Priority. <br className='hidden md:block' />
                Find the Right Doctor.
              </h1>
              <p className='text-lg text-slate-600 mb-10 leading-relaxed'>
                Connect with the best healthcare professionals in your area.
                Book appointments instantly and manage your family's health
                journey in one place.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='bg-white p-2 rounded-2xl border border-slate-200 shadow-xl flex flex-col md:flex-row gap-2 max-w-2xl mx-auto'>
              <div className='grow flex items-center px-4 py-3 gap-3 border-b md:border-b-0 md:border-r border-slate-100'>
                <Search className='w-5 h-5 text-slate-400' />
                <input
                  type='text'
                  placeholder='Specialty (e.g. Cardiology)'
                  className='w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400'
                />
              </div>
              <div className='grow flex items-center px-4 py-3 gap-3'>
                <MapPin className='w-5 h-5 text-slate-400' />
                <input
                  type='text'
                  placeholder='Location'
                  className='w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400'
                />
              </div>
              <button className='bg-sky-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-sky-700 transition-colors shadow-sm'>
                Search
              </button>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-slate-100 pt-16'>
            <div className='flex flex-col items-center'>
              <span className='text-3xl font-bold text-slate-900 mb-1'>
                200+
              </span>
              <span className='text-slate-500 font-medium'>Expert Doctors</span>
            </div>
            <div className='flex flex-col items-center'>
              <span className='text-3xl font-bold text-slate-900 mb-1'>
                50+
              </span>
              <span className='text-slate-500 font-medium'>Specialties</span>
            </div>
            <div className='flex flex-col items-center'>
              <span className='text-3xl font-bold text-slate-900 mb-1'>
                10k+
              </span>
              <span className='text-slate-500 font-medium'>Happy Patients</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className='py-24 bg-slate-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-end mb-12'>
            <div>
              <h2 className='text-3xl font-bold text-slate-900 mb-3'>
                Featured Doctors
              </h2>
              <p className='text-slate-600'>
                Top rated medical professionals with proven expertise.
              </p>
            </div>
            <Link
              to='/doctors'
              className='hidden md:flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-700 transition-colors'>
              View all doctors <ArrowRight className='w-4 h-4' />
            </Link>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {featuredDoctors.map((doc) => (
              <div
                key={doc.id}
                className='bg-white rounded-2xl border border-slate-200 overflow-hidden group transition-all hover:border-sky-200 hover:shadow-lg'>
                <div className='relative aspect-4/3 overflow-hidden'>
                  <img
                    src={doc.photo}
                    alt={doc.name}
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                  />
                  <div className='absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-sky-600 shadow-sm'>
                    ★ {doc.rating}
                  </div>
                </div>
                <div className='p-6'>
                  <h3 className='text-lg font-bold text-slate-900 mb-1'>
                    {doc.name}
                  </h3>
                  <p className='text-sky-600 text-sm font-medium mb-4'>
                    {doc.specialty}
                  </p>
                  <p className='text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed'>
                    {doc.bio}
                  </p>
                  <Link
                    to={`/doctors/${doc.id}`}
                    className='block w-full text-center border border-slate-200 rounded-xl py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all'>
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-12 text-center md:hidden'>
            <Link
              to='/doctors'
              className='inline-flex items-center gap-2 text-sky-600 font-semibold'>
              View all doctors <ArrowRight className='w-4 h-4' />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className='py-24 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-slate-900 mb-4'>
              How It Works
            </h2>
            <p className='text-slate-600 max-w-2xl mx-auto'>
              Three simple steps to connect with your doctor and get the care
              you need.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
            {[
              {
                icon: <Search className='w-8 h-8 text-sky-500' />,
                title: "Search Doctors",
                desc: "Find the right specialist based on specialty, location, or rating.",
              },
              {
                icon: <CalendarCheck className='w-8 h-8 text-teal-500' />,
                title: "Book Instantly",
                desc: "Choose a convenient time slot and book your appointment in seconds.",
              },
              {
                icon: <ShieldCheck className='w-8 h-8 text-emerald-500' />,
                title: "Get Care",
                desc: "Visit the clinic or join a virtual consultation with confidence.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className='flex flex-col items-center text-center p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-sky-100 transition-colors'>
                <div className='mb-6 p-4 bg-white rounded-2xl shadow-sm'>
                  {step.icon}
                </div>
                <h3 className='text-xl font-bold text-slate-900 mb-3'>
                  {step.title}
                </h3>
                <p className='text-slate-500 leading-relaxed'>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-sky-600 rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden'>
            <div className='absolute top-0 right-0 w-64 h-64 bg-sky-500 rounded-full blur-3xl opacity-20 -mr-32 -mt-32' />
            <div className='absolute bottom-0 left-0 w-64 h-64 bg-teal-500 rounded-full blur-3xl opacity-20 -ml-32 -mb-32' />

            <div className='relative'>
              <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
                Ready to Book Your Next Appointment?
              </h2>
              <p className='text-sky-100 mb-10 max-w-xl mx-auto text-lg'>
                Join thousands of patients who trust HealthReserve for their
                healthcare needs.
              </p>
              <Link
                to='/doctors'
                className='inline-flex items-center gap-2 bg-white text-sky-600 px-8 py-4 rounded-2xl font-bold hover:bg-sky-50 transition-colors shadow-lg'>
                Find a Doctor <ArrowRight className='w-5 h-5' />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
