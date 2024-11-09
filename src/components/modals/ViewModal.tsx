import React from 'react';
import { X } from 'lucide-react';
import { Record } from '../../types';

interface ViewModalProps {
  record: Record | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ViewModal({ record, isOpen, onClose }: ViewModalProps) {
  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Record Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-gray-400">Name:</label>
            <p>{record.name}</p>
          </div>
          <div>
            <label className="text-gray-400">Email:</label>
            <p>{record.email}</p>
          </div>
          <div>
            <label className="text-gray-400">Users:</label>
            <p>{record.users}</p>
          </div>
          <div>
            <label className="text-gray-400">Total Price:</label>
            <p>${record.totalPrice}</p>
          </div>
          <div>
            <label className="text-gray-400">Join Date:</label>
            <p>{record.joinDate}</p>
          </div>
          <div>
            <label className="text-gray-400">Billing Day:</label>
            <p>{record.billingDay}</p>
          </div>
          <div>
            <label className="text-gray-400">Password:</label>
            <p>{record.password}</p>
          </div>
        </div>
      </div>
    </div>
  );
}