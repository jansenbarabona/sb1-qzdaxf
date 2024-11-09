import React from 'react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  password: string;
  onPasswordChange: (value: string) => void;
  onExport: () => void;
}

export function ExportModal({ isOpen, onClose, password, onPasswordChange, onExport }: ExportModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Authentication Required</h3>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          className="w-full px-4 py-2 mb-4 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onExport}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
}