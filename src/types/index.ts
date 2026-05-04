// Define TypeScript interfaces for Doctor
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  experience: number;
  photo: string;
  location: string;
  fee: number;
  bio: string;
  languages: string[];
  availability: {
    [key: string]: string[]; // date string -> array of time slots
  };
  hospital: string;
}

// Define TypeScript interface for User
export interface Appointment {
  id: string;
  doctorId: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  reason: string;
}

// Define TypeScript interface for Patient
export interface Patient {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}
