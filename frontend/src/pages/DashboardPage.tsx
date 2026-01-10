import { useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { Users, DollarSign, ShoppingCart, TrendingUp, LogOut } from 'lucide-react';

import { useLoggedIn, useLogout, useUser } from '@hooks';

const DashboardPage = () => {
  const { loggedIn, isLoading } = useLoggedIn();
  const user = useUser();
  const logout = useLogout();

  if (isLoading) {
    return <div className="text-white text-center mt-20">Loading dashboard...</div>;
  }
  
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  const data = useMemo(() => [
    { name: 'Jan', sales: 4000, users: 2400 },
    { name: 'Feb', sales: 3000, users: 1398 },
    { name: 'Mar', sales: 2000, users: 9800 },
  ], []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white bg-opacity-20 p-8 rounded-2xl backdrop-blur-lg"
      >
        <div className="flex justify-between mb-8">
          <h1 className="text-4xl text-white">Dashboard</h1>
          <div className="flex items-center">
            <span className="text-white mr-4">{user?.email}</span>
            <button onClick={logout} className="flex items-center text-white">
              <LogOut className="mr-2" /> Logout
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
            <Bar dataKey="users" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
