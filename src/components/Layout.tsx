import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className='min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900'>
      <Navbar />
      <main className='grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
