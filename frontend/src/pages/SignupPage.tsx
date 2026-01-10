import { FormEvent, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

import { useLoggedIn, useSignup } from '@hooks';

const SignupPage = () => {
  const { loggedIn, isLoading } = useLoggedIn();
  const signup = useSignup();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    signup({ email, password, confirmPassword });
  };

  if (isLoading) {
    return <div className="text-white text-center mt-20">Checking session...</div>;
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
        className="bg-white/20 p-8 rounded-2xl shadow-2xl backdrop-blur-lg w-full max-w-md"
      >
        <h2 className="text-4xl font-bold text-white text-center mb-8">
          Sign up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
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
              required
            />
          </div>

          {/* Password */}
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
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="text-white" />
              ) : (
                <Eye className="text-white" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="
                w-full py-3 px-12 rounded-lg
                bg-white/30
                text-white placeholder-white/70
                border border-white/30
                focus:outline-none focus:ring-2 focus:ring-white/70
              "
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <EyeOff className="text-white" />
              ) : (
                <Eye className="text-white" />
              )}
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-white text-purple-600 rounded-lg font-semibold"
          >
            Sign up
          </motion.button>
        </form>

        <p className="text-white text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
