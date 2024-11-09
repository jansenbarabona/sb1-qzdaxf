import React, { useState, useEffect } from 'react';
import { Moon, AlertCircle } from 'lucide-react';
import { RecordList } from './components/RecordList';
import { RegistrationForm } from './components/RegistrationForm';
import { AuthModal } from './components/AuthModal';
import { ReceiptModal } from './components/ReceiptModal';
import { Record } from './types';

export function App() {
  const [records, setRecords] = useState<Record[]>(() => {
    const savedRecords = localStorage.getItem('records');
    return savedRecords ? JSON.parse(savedRecords) : [];
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState<Record | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    localStorage.setItem('records', JSON.stringify(records));
  }, [records]);

  const handleRegistration = (data: Record) => {
    const emailExists = records.some(record => record.email === data.email);
    if (emailExists) {
      alert('This email address has already been registered.');
      return;
    }

    const newRecord = {
      ...data,
      id: crypto.randomUUID(),
      status: 'active',
      totalPrice: data.users * 10,
    };
    setRecords([...records, newRecord]);
    setCurrentReceipt(newRecord);
    setShowReceipt(true);
  };

  const handleReceiptClose = () => {
    setShowReceipt(false);
    setCurrentReceipt(null);
  };

  const handleImportCSV = (data: Record[]) => {
    setRecords(prevRecords => [...prevRecords, ...data]);
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(prevRecords => prevRecords.filter(record => record.id !== id));
  };

  const handleEditRecord = (updatedRecord: Record) => {
    setRecords(prevRecords => 
      prevRecords.map(record => 
        record.id === updatedRecord.id ? updatedRecord : record
      )
    );
  };

  const handleAuthentication = (email: string) => {
    setIsAuthenticated(true);
    setIsAdmin(email === 'admin@system.com');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {!isAuthenticated ? (
        <AuthModal onAuthenticate={handleAuthentication} />
      ) : (
        <>
          <nav className="bg-gray-800 border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <Moon className="w-8 h-8 text-indigo-400" />
                  <span className="ml-2 text-xl font-bold">Registration System</span>
                </div>
                {isAdmin && (
                  <span className="text-sm px-3 py-1 bg-indigo-600 rounded-full">
                    Admin Mode
                  </span>
                )}
              </div>
            </div>
          </nav>

          {isMobile && (
            <div className="fixed top-16 inset-x-0 bg-yellow-600 p-2">
              <div className="flex items-center justify-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Mobile view: Registration only</span>
              </div>
            </div>
          )}

          <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {!isMobile && (
                <div className="lg:col-span-2">
                  <RecordList
                    records={records}
                    onImportCSV={handleImportCSV}
                    onDeleteRecord={handleDeleteRecord}
                    onEditRecord={handleEditRecord}
                    isAdmin={isAdmin}
                  />
                </div>
              )}
              <div className={isMobile ? "col-span-1" : ""}>
                <RegistrationForm 
                  onSubmit={handleRegistration}
                  existingEmails={records.map(record => record.email)}
                />
              </div>
            </div>
          </main>

          {showReceipt && currentReceipt && (
            <ReceiptModal
              record={currentReceipt}
              isOpen={showReceipt}
              onClose={handleReceiptClose}
            />
          )}
        </>
      )}
    </div>
  );
}