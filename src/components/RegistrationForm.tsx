import React, { useState } from 'react';
import { UserPlus, Mail, Lock, Users, Calendar } from 'lucide-react';

interface RegistrationFormProps {
  onSubmit: (data: any) => void;
  existingEmails: string[];
}

export function RegistrationForm({ onSubmit, existingEmails }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: 'ssbarabonajansen@gmail.com',
    password: '',
    users: 1,
    joinDate: new Date().toISOString().split('T')[0],
    billingDay: new Date().getDate().toString().padStart(2, '0')
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if email already exists
    if (existingEmails.includes(formData.email)) {
      alert('This email address has already been registered.');
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <UserPlus className="w-6 h-6 text-indigo-400" />
        Registration Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" />
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            disabled
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-2">
            <Lock className="w-4 h-4 text-gray-400" />
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            Number of Users ($10 per user)
          </label>
          <input
            type="number"
            min="1"
            value={formData.users}
            onChange={(e) => setFormData({ ...formData, users: parseInt(e.target.value) })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            Join Date
          </label>
          <input
            type="date"
            value={formData.joinDate}
            disabled
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg opacity-50"
          />
        </div>
        <div className="text-sm text-gray-400 mt-2">
          Billing cycle: Monthly payment due on day {formData.billingDay}
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
}