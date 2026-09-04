import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import AdminDoctorRequestCard from '../../components/admin/AdminDoctorRequestCard';
import { UserCheck, AlertCircle, X } from 'lucide-react';

export default function AdminDoctorRequestsPage() {
  const { doctorRequests, approveDoctorRequest, rejectDoctorRequest } = useAdmin();

  // State to handle the rejection confirmation modal
  const [rejectingRequestId, setRejectingRequestId] = useState(null);

  // Find the request currently in the process of rejection
  const requestToReject = doctorRequests.find(r => r.id === rejectingRequestId);

  // Filter requests that are Pending
  const pendingRequests = doctorRequests.filter(r => r.status === 'Pending');
  const pastRequests = doctorRequests.filter(r => r.status !== 'Pending');

  const handleApprove = (id) => {
    approveDoctorRequest(id);
  };

  const triggerRejectConfirmation = (id) => {
    setRejectingRequestId(id);
  };

  const handleConfirmReject = () => {
    if (rejectingRequestId) {
      rejectDoctorRequest(rejectingRequestId);
      setRejectingRequestId(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-med-navy flex items-center gap-2">
          <UserCheck className="w-6 h-6 text-med-blue" />
          <span>Doctor Registration Requests</span>
        </h1>
        <p className="text-xs text-med-gray font-medium mt-1">
          Review and manage requests from doctors who want to join MediCare Hospital.
        </p>
      </div>

      {/* Main Grid: Pending Registration Requests */}
      <div className="space-y-6">
        <h2 className="text-base font-bold text-med-navy border-b border-med-border pb-2">
          Pending Requests ({pendingRequests.length})
        </h2>

        {pendingRequests.length === 0 ? (
          <div className="bg-white border border-med-border rounded-xl p-8 text-center space-y-3">
            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-green-50 text-status-success">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-med-navy text-sm">No Pending Requests</h3>
            <p className="text-xs text-med-gray font-medium">All doctor registration applications have been reviewed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {pendingRequests.map((request) => (
              <AdminDoctorRequestCard
                key={request.id}
                request={request}
                onAccept={handleApprove}
                onReject={triggerRejectConfirmation}
              />
            ))}
          </div>
        )}
      </div>

      {/* Section: Reviewed Requests History */}
      {pastRequests.length > 0 && (
        <div className="space-y-6 pt-4">
          <h2 className="text-base font-bold text-med-navy border-b border-med-border pb-2">
            Reviewed Applications History ({pastRequests.length})
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {pastRequests.map((request) => (
              <AdminDoctorRequestCard
                key={request.id}
                request={request}
                onAccept={handleApprove}
                onReject={triggerRejectConfirmation}
              />
            ))}
          </div>
        </div>
      )}

      {/* CUSTOM REJECT DOCTOR REQUEST CONFIRMATION MODAL */}
      {rejectingRequestId && requestToReject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in">
          <div className="bg-white border border-med-border rounded-xl shadow-xl max-w-sm w-full p-6 relative animate-scale-up">
            
            {/* Close */}
            <button 
              onClick={() => setRejectingRequestId(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-med-gray hover:bg-med-light-blue hover:text-med-blue transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-4 pt-2">
              <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-status-rejected border border-status-rejected/15">
                <AlertCircle className="w-5 h-5" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-med-navy">Reject Doctor Request?</h3>
                <p className="text-xs text-med-gray leading-relaxed font-medium">
                  Are you sure you want to reject the registration request from <strong className="text-med-navy">{requestToReject.name}</strong>? This action will mark the request as declined.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setRejectingRequestId(null)}
                  className="flex-1 py-2 px-4 text-xs font-semibold text-med-navy border border-med-border bg-white hover:bg-med-bg rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReject}
                  className="flex-1 py-2 px-4 text-xs font-semibold text-white bg-status-rejected hover:bg-red-700 rounded-lg shadow-sm transition-colors"
                >
                  Yes, Reject Request
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
