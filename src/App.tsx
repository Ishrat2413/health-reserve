import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import DoctorListing from "./pages/DoctorListing";
import DoctorProfile from "./pages/DoctorProfile";
import AppointmentBooking from "./pages/AppointmentBooking";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        // Define routes for the application
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='doctors' element={<DoctorListing />} />
          <Route path='doctors/:id' element={<DoctorProfile />} />
          <Route path='booking/:doctorId' element={<AppointmentBooking />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='contact' element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
