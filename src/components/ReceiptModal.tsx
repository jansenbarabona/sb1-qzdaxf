import React from 'react';
import { Printer, Copy, X } from 'lucide-react';
import { Record } from '../types';

interface ReceiptModalProps {
  record: Record;
  isOpen: boolean;
  onClose: () => void;
}

export function ReceiptModal({ record, isOpen, onClose }: ReceiptModalProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleCopy = async () => {
    const receiptText = `
Registration Receipt
-------------------
Name: ${record.name}
Email: ${record.email}
Password: ${record.password}
Number of Users: ${record.users}
Total Price: $${record.totalPrice}
Join Date: ${record.joinDate}
Billing Day: ${record.billingDay}
    `.trim();

    try {
      await navigator.clipboard.writeText(receiptText);
      alert('Receipt copied to clipboard!');
    } catch (err) {
      console.error('Error copying to clipboard:', err);
      alert('Failed to copy to clipboard');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Registration Receipt</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-gray-400">Name</p>
            <p className="font-semibold">{record.name}</p>
          </div>
          <div>
            <p className="text-gray-400">Email</p>
            <p className="font-semibold">{record.email}</p>
          </div>
          <div>
            <p className="text-gray-400">Password</p>
            <p className="font-semibold">{record.password}</p>
          </div>
          <div>
            <p className="text-gray-400">Number of Users</p>
            <p className="font-semibold">{record.users}</p>
          </div>
          <div>
            <p className="text-gray-400">Total Price</p>
            <p className="font-semibold">${record.totalPrice}</p>
          </div>
          <div>
            <p className="text-gray-400">Join Date</p>
            <p className="font-semibold">{record.joinDate}</p>
          </div>
          <div>
            <p className="text-gray-400">Monthly Billing Day</p>
            <p className="font-semibold">{record.billingDay}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handlePrint}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button
            onClick={handleCopy}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}