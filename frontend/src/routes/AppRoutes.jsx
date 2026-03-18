import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import Dashboard from '../pages/Dashboard';
import CredentialWallet from '../pages/CredentialWallet';
import ConsentRequests from '../pages/ConsentRequests';
import UnifiedTimeline from '../pages/UnifiedTimeline';
import CareerGraph from '../pages/CareerGraph';
import QRVerification from '../pages/QRVerification';
import AISuggestions from '../pages/AISuggestions';
import InstitutionPortal from '../pages/InstitutionPortal';
import ActivityPage from '../pages/ActivityPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="wallet" element={<CredentialWallet />} />
        <Route path="consent" element={<ConsentRequests />} />
        <Route path="timeline" element={<UnifiedTimeline />} />
        <Route path="career-graph" element={<CareerGraph />} />
        <Route path="qr-verify" element={<QRVerification />} />
        <Route path="ai-suggestions" element={<AISuggestions />} />
        <Route path="institution" element={<InstitutionPortal />} />
        <Route path="activity" element={<ActivityPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}
