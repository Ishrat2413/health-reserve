import React, { useState } from "react";
import {
  Search,
  MapPin,
  Filter,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  Stethoscope,
} from "lucide-react";
import { doctors, specialties } from "../data/mockData";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

export default function DoctorListing() {
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSpecialty =
      selectedSpecialties.length === 0 ||
      selectedSpecialties.includes(doc.specialty);
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((s) => s !== specialty)
        : [...prev, specialty],
    );
  };

  return (
    <div className='bg-slate-50 min-h-screen py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12'>
          <div>
            <h1 className='text-3xl font-bold text-slate-900 mb-2'>
              Find a Doctor
            </h1>
            <p className='text-slate-500 font-medium'>
              {filteredDoctors.length} results found for your search
            </p>
          </div>

          <div className='flex gap-4 w-full md:w-auto'>
            <div className='relative grow md:grow-0 md:w-80'>
              <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400' />
              <input
                type='text'
                placeholder='Search by name or specialty...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-sky-500 transition-colors shadow-sm'
              />
            </div>
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className='md:hidden bg-white border border-slate-200 p-3 rounded-xl hover:bg-slate-50 transition-colors'>
              <Filter className='w-6 h-6 text-slate-600' />
            </button>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Sidebar Filters - Desktop */}
          <aside className='hidden lg:block w-72 shrink-0'>
            <div className='bg-white border border-slate-200 rounded-2xl p-6 sticky top-24'>
              <div className='flex items-center justify-between mb-8 pb-4 border-b border-slate-100'>
                <h2 className='font-bold text-slate-900 uppercase tracking-wider text-xs'>
                  Filters
                </h2>
                <button
                  onClick={() => setSelectedSpecialties([])}
                  className='text-xs font-bold text-sky-600 hover:text-sky-700'>
                  Clear all
                </button>
              </div>

              <div className='space-y-8'>
                <div>
                  <h3 className='font-semibold text-slate-900 mb-4 flex items-center gap-2'>
                    Specialty
                  </h3>
                  <div className='space-y-3'>
                    {specialties.map((specialty) => (
                      <label
                        key={specialty}
                        className='flex items-center gap-3 cursor-pointer group'>
                        <input
                          type='checkbox'
                          checked={selectedSpecialties.includes(specialty)}
                          onChange={() => toggleSpecialty(specialty)}
                          className='w-5 h-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500'
                        />
                        <span className='text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors'>
                          {specialty}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className='pt-8 border-t border-slate-100'>
                  <h3 className='font-semibold text-slate-900 mb-4'>
                    Availability
                  </h3>
                  <div className='space-y-3'>
                    {["Any Time", "Available Today", "Available This Week"].map(
                      (item) => (
                        <label
                          key={item}
                          className='flex items-center gap-3 cursor-pointer group'>
                          <input
                            type='radio'
                            name='availability'
                            className='w-5 h-5 border-slate-300 text-teal-600 focus:ring-teal-500'
                          />
                          <span className='text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors'>
                            {item}
                          </span>
                        </label>
                      ),
                    )}
                  </div>
                </div>

                <div className='pt-8 border-t border-slate-100'>
                  <h3 className='font-semibold text-slate-900 mb-4'>
                    Doctor Rating
                  </h3>
                  <div className='space-y-3'>
                    {[4, 3, 2].map((rating) => (
                      <label
                        key={rating}
                        className='flex items-center gap-3 cursor-pointer group'>
                        <input
                          type='radio'
                          name='rating'
                          className='w-5 h-5 border-slate-300 text-sky-600 focus:ring-sky-500'
                        />
                        <div className='flex items-center gap-1 text-amber-500'>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-4 h-4 fill-current",
                                i < rating
                                  ? "text-amber-500"
                                  : "text-slate-200",
                              )}
                            />
                          ))}
                          <span className='ml-2 text-xs font-semibold text-slate-500'>
                            & Up
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Doctors Grid */}
          <div className='grow'>
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
              {filteredDoctors.map((doc) => (
                <div
                  key={doc.id}
                  className='bg-white border border-slate-200 rounded-2xl p-6 transition-all hover:border-sky-200 hover:shadow-md group'>
                  <div className='flex items-start gap-4 mb-6'>
                    <img
                      src={doc.photo}
                      alt={doc.name}
                      className='w-16 h-16 rounded-xl object-cover ring-2 ring-slate-100 group-hover:ring-sky-100 transition-all'
                    />
                    <div className='min-w-0'>
                      <h3 className='font-bold text-slate-900 truncate leading-tight mb-1'>
                        {doc.name}
                      </h3>
                      <p className='text-xs font-bold text-sky-600 uppercase tracking-wider mb-2'>
                        {doc.specialty}
                      </p>
                      <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-1 text-amber-500'>
                          <Star className='w-3 h-3 fill-current' />
                          <span className='text-xs font-bold text-slate-900'>
                            {doc.rating}
                          </span>
                        </div>
                        <span className='text-slate-300 text-xs'>|</span>
                        <span className='text-xs font-semibold text-slate-500'>
                          {doc.reviewCount} Reviews
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='space-y-4 mb-8'>
                    <div className='flex items-center gap-3 text-slate-600'>
                      <div className='w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center'>
                        <MapPin className='w-4 h-4' />
                      </div>
                      <span className='text-sm font-medium truncate'>
                        {doc.location}
                      </span>
                    </div>
                    <div className='flex items-center gap-3 text-slate-600'>
                      <div className='w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center'>
                        <Stethoscope className='w-4 h-4' />
                      </div>
                      <span className='text-sm font-medium'>
                        {doc.experience} Years Experience
                      </span>
                    </div>
                  </div>

                  <div className='flex gap-3'>
                    <Link
                      to={`/doctors/${doc.id}`}
                      className='grow text-center bg-white border border-slate-200 py-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all'>
                      View Profile
                    </Link>
                    <Link
                      to={`/booking/${doc.id}`}
                      className='grow text-center bg-sky-600 py-3 rounded-xl text-sm font-bold text-white hover:bg-sky-700 transition-all shadow-sm'>
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {filteredDoctors.length > 0 && (
              <div className='mt-12 flex justify-center'>
                <nav className='flex items-center gap-1'>
                  <button className='p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-white hover:text-slate-900 transition-colors disabled:opacity-50'>
                    <ChevronLeft className='w-5 h-5' />
                  </button>
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      className={cn(
                        "w-10 h-10 rounded-lg text-sm font-bold transition-all",
                        page === 1
                          ? "bg-sky-600 text-white shadow-md shadow-sky-200"
                          : "text-slate-600 hover:bg-white border border-transparent hover:border-slate-200",
                      )}>
                      {page}
                    </button>
                  ))}
                  <button className='p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-white hover:text-slate-900 transition-colors'>
                    <ChevronRight className='w-5 h-5' />
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {mobileFiltersOpen && (
        <div className='fixed inset-0 z-50 lg:hidden'>
          <div
            className='absolute inset-0 bg-slate-900/40 backdrop-blur-sm'
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className='absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300'>
            <div className='flex items-center justify-between mb-8 pb-4 border-b border-slate-100'>
              <h2 className='text-xl font-bold text-slate-900'>Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className='p-2 text-slate-400 hover:text-slate-900'>
                <X className='w-6 h-6' />
              </button>
            </div>

            <div className='grow overflow-y-auto space-y-8 pr-2'>
              <div>
                <h3 className='font-bold text-slate-900 uppercase tracking-widest text-xs mb-4'>
                  Specialty
                </h3>
                <div className='grid grid-cols-1 gap-2'>
                  {specialties.map((specialty) => (
                    <button
                      key={specialty}
                      onClick={() => toggleSpecialty(specialty)}
                      className={cn(
                        "text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all border",
                        selectedSpecialties.includes(specialty)
                          ? "bg-sky-50 border-sky-200 text-sky-700"
                          : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50",
                      )}>
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className='font-bold text-slate-900 uppercase tracking-widest text-xs mb-4'>
                  Availability
                </h3>
                <div className='space-y-3'>
                  {["Any Time", "Available Today", "Available This Week"].map(
                    (item) => (
                      <label
                        key={item}
                        className='flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer'>
                        <input
                          type='radio'
                          name='mobile-avail'
                          className='w-5 h-5'
                        />
                        <span className='text-sm font-semibold text-slate-700'>
                          {item}
                        </span>
                      </label>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className='pt-6 mt-6 border-t border-slate-100 grid grid-cols-2 gap-4'>
              <button
                onClick={() => setSelectedSpecialties([])}
                className='py-4 text-sm font-bold text-slate-600 border border-slate-200 rounded-xl'>
                Reset All
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className='py-4 text-sm font-bold text-white bg-sky-600 rounded-xl shadow-lg shadow-sky-100'>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
