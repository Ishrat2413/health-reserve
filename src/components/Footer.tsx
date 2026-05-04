import { Link } from 'react-router-dom';
import { HeartPulse, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-sky-500 p-2 rounded-lg">
                <HeartPulse className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">HealthReserve</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Making healthcare accessible, simple, and patient-centric. Connect with top-rated medical professionals in minutes.
            </p>
            <div className="flex gap-4">
              <Twitter className="w-5 h-5 text-slate-400 hover:text-sky-500 cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-slate-400 hover:text-sky-500 cursor-pointer transition-colors" />
              <Github className="w-5 h-5 text-slate-400 hover:text-sky-500 cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-sm text-slate-600 hover:text-sky-600 transition-colors">Home</Link></li>
              <li><Link to="/doctors" className="text-sm text-slate-600 hover:text-sky-600 transition-colors">Find a Doctor</Link></li>
              <li><Link to="/dashboard" className="text-sm text-slate-600 hover:text-sky-600 transition-colors">Patient Dashboard</Link></li>
              <li><Link to="/contact" className="text-sm text-slate-600 hover:text-sky-600 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Specialties</h4>
            <ul className="space-y-4">
              <li><Link to="/doctors" className="text-sm text-slate-600 hover:text-sky-600 transition-colors">Cardiology</Link></li>
              <li><Link to="/doctors" className="text-sm text-slate-600 hover:text-sky-600 transition-colors">Dermatology</Link></li>
              <li><Link to="/doctors" className="text-sm text-slate-600 hover:text-sky-600 transition-colors">Pediatrics</Link></li>
              <li><Link to="/doctors" className="text-sm text-slate-600 hover:text-sky-600 transition-colors">Neurology</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="text-sm text-slate-600">
                <span className="block font-medium text-slate-900">Address</span>
                123 Medical Plaza, Health City, HC 56789
              </li>
              <li className="text-sm text-slate-600">
                <span className="block font-medium text-slate-900">Support</span>
                support@healthreserve.com
              </li>
              <li className="text-sm text-slate-600">
                <span className="block font-medium text-slate-900">Phone</span>
                +1 (555) 000-HEALTH
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>© {currentYear} HealthReserve. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-slate-600 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-slate-600 cursor-pointer transition-colors">Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
