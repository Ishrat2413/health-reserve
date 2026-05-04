import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-200 pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sky-50 text-sky-600 text-xs font-black mb-6 tracking-widest uppercase">Get in touch</span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">How Can We Help You?</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Our medical assistance team is available 24/7 to help you with any questions or medical coordination.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50">
             {submitted ? (
               <div className="py-20 text-center animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
                     <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-4">Message Received!</h2>
                  <p className="text-slate-500 mb-10">Thanks for reaching out. A healthcare coordinator will respond to your inquiry within 2-4 business hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sky-600 font-bold hover:underline underline-offset-4"
                  >
                    Send another message
                  </button>
               </div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-700 pl-1">Full Name</label>
                       <input
                        required
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-sky-500 focus:bg-white transition-all font-medium"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-700 pl-1">Email Address</label>
                       <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-sky-500 focus:bg-white transition-all font-medium"
                       />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 pl-1">Subject</label>
                    <input
                      required
                      type="text"
                      placeholder="Appointment Coordination / Medical Inquiry"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-sky-500 focus:bg-white transition-all font-medium"
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 pl-1">Your Message</label>
                    <textarea
                      required
                      rows={6}
                      placeholder="How can we help you? Please provide as much detail as possible..."
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-sky-500 focus:bg-white transition-all font-medium resize-none shadow-inner"
                    />
                 </div>

                 <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "w-full bg-sky-600 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg shadow-sky-100 hover:bg-sky-700 transition-all active:scale-[0.98]",
                    loading && "opacity-75 cursor-not-allowed"
                  )}
                 >
                   {loading ? (
                     <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                   ) : (
                     <>Send Message <Send className="w-5 h-5" /></>
                   )}
                 </button>
               </form>
             )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
             <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl opacity-50 -mr-32 -mt-32" />
                <h3 className="text-2xl font-black mb-10 relative z-10">Clinic Information</h3>

                <div className="space-y-10 relative z-10">
                   <div className="flex gap-6 items-start group">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-sky-500/20 transition-colors">
                         <MapPin className="w-7 h-7 text-sky-400" />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">Main Hub</p>
                         <p className="text-lg font-bold text-white">123 Medical Center Way, <br />Health Plaza, HC 90210</p>
                      </div>
                   </div>

                   <div className="flex gap-6 items-start group">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-sky-500/20 transition-colors">
                         <Phone className="w-7 h-7 text-sky-400" />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">Support Line</p>
                         <p className="text-lg font-bold text-white">+1 (555) 123-HEALTH</p>
                         <p className="text-sm text-slate-500 mt-1">Available 24/7 for urgencies</p>
                      </div>
                   </div>

                   <div className="flex gap-6 items-start group">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-sky-500/20 transition-colors">
                         <Mail className="w-7 h-7 text-sky-400" />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">Direct Email</p>
                         <p className="text-lg font-bold text-white">care@healthreserve.com</p>
                      </div>
                   </div>

                   <div className="flex gap-6 items-start group">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-sky-500/20 transition-colors">
                         <Clock className="w-7 h-7 text-sky-400" />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">Clinic Hours</p>
                         <p className="text-lg font-bold text-white">Mon - Fri: 08:00 - 20:00 <br />Sat: 09:00 - 15:00</p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="bg-slate-200 h-64 rounded-[2.5rem] flex items-center justify-center border-4 border-white shadow-inner overflow-hidden relative group">
                <div className="absolute inset-0 bg-slate-300 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
                <div className="z-10 text-center">
                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                      <MapPin className="w-6 h-6 text-sky-600" />
                   </div>
                   <span className="text-sm font-black text-slate-500 uppercase tracking-widest">Map Interactive View</span>
                </div>
                <div className="absolute inset-0 bg-sky-600/0 group-hover:bg-sky-600/10 transition-colors duration-500" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
