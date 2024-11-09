import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface AuthModalProps {
  onAuthenticate: (email: string) => void;
}

export function AuthModal({ onAuthenticate }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validEmails = ['admin@system.com', 'ssbarabonajansen@gmail.com'];
    
    if (validEmails.includes(email.toLowerCase())) {
      onAuthenticate(email.toLowerCase());
      setError('');
    } else {
      setError('Invalid email address. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <Lock className="w-12 h-12 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
        <p className="text-center mb-6 text-gray-300">
          Enter your email address to access the registration system
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white"
              placeholder="Enter your email address"
              required
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Access System
          </button>
        </form>
      </div>
    </div>
  );
}