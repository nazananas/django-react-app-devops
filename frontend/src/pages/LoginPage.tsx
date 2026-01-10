import { FormEvent, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

import { useLogin, useLoggedIn } from '@hooks/users';

const LoginPage = () => {
  const { loggedIn, isLoading } = useLoggedIn();
  const login = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isLoading) {
    return (
      <div className="text-white text-center mt-20">Checking session...</div>
    );
  }

  if (loggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-20 p-8 rounded-2xl shadow-2xl backdrop-blur-lg w-full max-w-md"
      >
        <h2 className="text-4xl font-bold text-white text-center mb-8">
          Log in
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="
                w-full py-3 px-12 rounded-lg
                bg-white/30
                text-white placeholder-white/70
                border border-white/30
                focus:outline-none focus:ring-2 focus:ring-white/70
              "
              autoComplete="email"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="
                w-full py-3 px-12 rounded-lg
                bg-white/30
                text-white placeholder-white/70
                border border-white/30
                focus:outline-none focus:ring-2 focus:ring-white/70
              "
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-white text-purple-600 rounded-lg font-semibold shadow-lg hover:bg-opacity-90 transition-all"
          >
            Log in
          </motion.button>
        </form>

        <p className="text-white text-center mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;