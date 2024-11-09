import React, { useState } from 'react';
import { Table, Download, Upload } from 'lucide-react';
import { Record } from '../types';
import { ViewModal } from './modals/ViewModal';
import { EditModal } from './modals/EditModal';
import { SearchBar } from './SearchBar';
import { RecordTable } from './RecordTable';

interface RecordListProps {
  records: Record[];
  onImportCSV: (data: Record[]) => void;
  onDeleteRecord: (id: string) => void;
  onEditRecord: (record: Record) => void;
  isAdmin: boolean;
}

export function RecordList({ records, onImportCSV, onDeleteRecord, onEditRecord, isAdmin }: RecordListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const filteredRecords = records.filter(record => 
    Object.values(record).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleExportCSV = () => {
    if (adminPassword !== 'admin') {
      alert('Invalid password');
      return;
    }
    
    const csvContent = [
      ['Name', 'Password'],
      ...records.map(record => [record.name, record.password])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'credentials.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    setShowPasswordModal(false);
    setAdminPassword('');
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const rows = text.split('\n').map(row => row.split(','));
        const headers = rows[0];
        const data = rows.slice(1).map(row => {
          const record: any = {};
          headers.forEach((header, index) => {
            record[header.toLowerCase()] = row[index];
          });
          return {
            ...record,
            id: crypto.randomUUID(),
            status: 'active',
            totalPrice: record.users * 10
          };
        });
        onImportCSV(data);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2 text-white">
          <Table className="w-6 h-6 text-indigo-400" />
          Record List
        </h2>
        {isAdmin && (
          <div className="flex gap-2">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Credentials
            </button>
            <label className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Import CSV
              <input
                type="file"
                accept=".csv"
                onChange={handleImportCSV}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>

      <div className="mb-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      <RecordTable
        records={filteredRecords}
        isAdmin={isAdmin}
        onDelete={onDeleteRecord}
        onView={(record) => {
          setSelectedRecord(record);
          setShowViewModal(true);
        }}
        onEdit={(record) => {
          setSelectedRecord(record);
          setShowEditModal(true);
        }}
      />

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-white">Enter Admin Password</h3>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg mb-4 text-white"
              placeholder="Enter password"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setAdminPassword('');
                }}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleExportCSV}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      )}

      <ViewModal
        record={selectedRecord}
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedRecord(null);
        }}
      />

      <EditModal
        record={selectedRecord}
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedRecord(null);
        }}
        onSave={(updatedRecord) => {
          onEditRecord(updatedRecord);
          setShowEditModal(false);
          setSelectedRecord(null);
        }}
      />
    </div>
  );
}