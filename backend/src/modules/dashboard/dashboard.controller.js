exports.getSummary = (req, res) => {
  const mockDashboardData = {
    stats: {
      totalCredentials: 24,
      activeShares: 6,
      pendingRequests: 2,
      verifiedInstitutions: 15
    },
    profile: {
      name: "Alex Sterling",
      did: "did:mysetu:94a2...b8x1",
      trustLevel: "High",
      primaryDomain: "Tech & Finance"
    },
    recentActivity: [
      { id: 1, action: "Academic Transcript shared", entity: "Axis Bank", time: "2h ago", type: "share" },
      { id: 2, action: "Employment verification", entity: "ABC Corp", time: "1d ago", type: "claim" },
      { id: 3, action: "Consent revoked", entity: "HealthSure", time: "3d ago", type: "revoke" },
      { id: 4, action: "Identity proof verified", entity: "Gov Portal", time: "1w ago", type: "verify" }
    ],
    suggestions: [
      { id: 1, title: "Employment Letter", useCase: "Home Loan Application", category: "Finance" },
      { id: 2, title: "Medical ID", useCase: "Annual Checkup Profiling", category: "Health" },
      { id: 3, title: "Skill Certification", useCase: "Job Application", category: "Career" }
    ]
  };

  res.json({
    success: true,
    data: mockDashboardData
  });
};
