import React from 'react';
import { Trash2, Eye, Edit } from 'lucide-react';
import { Record } from '../types';

interface RecordTableProps {
  records: Record[];
  isAdmin: boolean;
  onDelete: (id: string) => void;
  onView: (record: Record) => void;
  onEdit: (record: Record) => void;
}

export function RecordTable({ records, isAdmin, onDelete, onView, onEdit }: RecordTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="px-4 py-2 text-left text-gray-400">Name</th>
            <th className="px-4 py-2 text-left text-gray-400">Email</th>
            <th className="px-4 py-2 text-left text-gray-400">Users</th>
            <th className="px-4 py-2 text-left text-gray-400">Total</th>
            <th className="px-4 py-2 text-left text-gray-400">Join Date</th>
            <th className="px-4 py-2 text-left text-gray-400">Billing Day</th>
            {isAdmin && <th className="px-4 py-2 text-left text-gray-400">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="border-b border-gray-700">
              <td className="px-4 py-2 text-white">{record.name}</td>
              <td className="px-4 py-2 text-white">{record.email}</td>
              <td className="px-4 py-2 text-white">{record.users}</td>
              <td className="px-4 py-2 text-white">${record.totalPrice}</td>
              <td className="px-4 py-2 text-white">{record.joinDate}</td>
              <td className="px-4 py-2 text-white">{record.billingDay}</td>
              {isAdmin && (
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onDelete(record.id)}
                      className="text-red-400 hover:text-red-300"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onView(record)}
                      className="text-blue-400 hover:text-blue-300"
                      title="View Record"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(record)}
                      className="text-green-400 hover:text-green-300"
                      title="Edit Record"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}