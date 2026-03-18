import { Book, Briefcase, FileText, HeartPulse, GraduationCap, ShieldCheck } from 'lucide-react';

const mockCredentials = [
  {
    id: 'cred-1',
    title: 'Academic Transcript',
    domain: 'Education',
    issuer: 'Stanford University',
    issuedDate: '2022-06-15',
    expiryDate: null,
    status: 'Verified',
    useCases: ['Higher Education', 'Background Check']
  },
  {
    id: 'cred-2',
    title: 'Degree Certificate',
    domain: 'Education',
    issuer: 'Stanford University',
    issuedDate: '2022-06-30',
    expiryDate: null,
    status: 'Verified',
    useCases: ['Employment', 'Immigration']
  },
  {
    id: 'cred-3',
    title: 'Employment Letter',
    domain: 'Employment',
    issuer: 'TechCorp Inc.',
    issuedDate: '2023-01-10',
    expiryDate: null,
    status: 'Shared',
    useCases: ['Loan Application', 'Visa']
  },
  {
    id: 'cred-4',
    title: 'Salary Slip',
    domain: 'Finance',
    issuer: 'TechCorp Inc.',
    issuedDate: '2024-02-01',
    expiryDate: null,
    status: 'Verified',
    useCases: ['Mortgage', 'Credit Card']
  },
  {
    id: 'cred-5',
    title: 'Identity Proof',
    domain: 'Government',
    issuer: 'Gov Authority',
    issuedDate: '2019-05-12',
    expiryDate: '2029-05-12',
    status: 'Verified',
    useCases: ['General Identity', 'Travel']
  },
  {
    id: 'cred-6',
    title: 'Medical History',
    domain: 'Healthcare',
    issuer: 'City General Hospital',
    issuedDate: '2023-11-20',
    expiryDate: null,
    status: 'Expiring Soon',
    useCases: ['Insurance', 'Specialist Transfer']
  }
];

exports.getCredentials = (req, res) => {
  res.json({ success: true, count: mockCredentials.length, data: mockCredentials });
};
