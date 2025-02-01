
import Home from './pages/home';
import Landing from './pages/landing';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { AdminLogin } from './components/AdminLogin';
import { ProtectedRoute } from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';



function App() {
  return (
     
          
           <AuthProvider>
           <Router>
             <Routes>
              <Route path="/test" element={<Home />} />
              <Route path="/" element={<Landing />} />
            
               <Route path="/admin/login" element={<AdminLogin />} />
               <Route
                 path="/admin/dashboard"
                 element={
                   <ProtectedRoute>
                     <AdminDashboard />
                   </ProtectedRoute>
                 }
               />
             </Routes>
             <Toaster position="top-right" />
           </Router>
         </AuthProvider>
  );
}

export default App;