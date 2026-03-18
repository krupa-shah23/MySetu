export const dashboardData = {
  stats: {
    totalCredentials: 24,
    activeShares: 6,
    pendingRequests: 2,
    verifiedInstitutions: 15
  },
  profile: {
    name: "Alex Sterling",
    role: "Senior Software Engineer",
    did: "did:mysetu:94a2...b8x1",
    trustScore: 98,
    completionPercentage: 85
  },
  quickActions: [
    { id: 1, label: 'Share Credential', icon: 'share' },
    { id: 2, label: 'Review Consent', icon: 'shield' },
    { id: 3, label: 'Open Timeline', icon: 'history' },
    { id: 4, label: 'Generate QR', icon: 'qrcode' }
  ],
  recentActivity: [
    { id: 1, action: "Academic Transcript shared with Axis Bank", time: "2 hours ago", status: "completed" },
    { id: 2, action: "Employment Verification added", time: "Yesterday", status: "verified" },
    { id: 3, action: "Access revoked for ABC Corp", time: "2 days ago", status: "revoked" },
    { id: 4, action: "Identity Proof scanned offline", time: "1 week ago", status: "completed" }
  ],
  suggestedCredentials: [
    { id: 1, title: "Employment Letter", useCase: "For Home Loan Application", icon: "briefcase" },
    { id: 2, title: "Medical History", useCase: "For HealthSure Checkup", icon: "heart-pulse" },
    { id: 3, title: "Design Portfolio", useCase: "For Job Application", icon: "pen-tool" }
  ]
};
