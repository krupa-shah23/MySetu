const getActivities = (req, res) => {
  try {
    const activities = [
      {
        id: "1",
        title: "Academic Transcript shared",
        institution: "Axis Bank",
        credential: "Academic Transcript",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        eventType: "Shared",
        status: "Active",
        description: "Academic Transcript shared with Axis Bank"
      },
      {
        id: "2",
        title: "Degree Certificate verified",
        institution: "Infosys",
        credential: "Degree Certificate",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        eventType: "Verified",
        status: "Success",
        description: "Degree Certificate verified by Infosys"
      },
      {
        id: "3",
        title: "Medical History requested",
        institution: "HealthSure",
        credential: "Medical History",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        eventType: "Requests",
        status: "Pending",
        description: "Medical History requested by HealthSure"
      },
      {
        id: "4",
        title: "Access revoked",
        institution: "ABC Corp",
        credential: "Any",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        eventType: "Revoked",
        status: "Revoked",
        description: "Access revoked for ABC Corp"
      },
      {
        id: "5",
        title: "Identity Proof scanned",
        institution: "Offline Scanner",
        credential: "Identity Proof",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
        eventType: "Scanned",
        status: "Success",
        description: "Identity Proof scanned offline"
      },
      {
        id: "6",
        title: "Salary Slip shared",
        institution: "Loan Review API",
        credential: "Salary Slip",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
        eventType: "Shared",
        status: "Active",
        description: "Salary Slip shared for loan review"
      },
      {
        id: "7",
        title: "Employment Letter added",
        institution: "System",
        credential: "Employment Letter",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
        eventType: "Added",
        status: "Success",
        description: "Employment Letter added to wallet"
      },
      {
        id: "8",
        title: "Degree Certificate re-shared",
        institution: "Employer Portal",
        credential: "Degree Certificate",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 144).toISOString(),
        eventType: "Shared",
        status: "Active",
        description: "Degree Certificate re-shared with Employer Portal"
      },
      {
        id: "9",
        title: "Consent approved",
        institution: "University Portal",
        credential: "All Academic",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 168).toISOString(),
        eventType: "Verified",
        status: "Approved",
        description: "Consent approved for University Portal"
      },
      {
        id: "10",
        title: "Credential QR generated",
        institution: "Offline Scanners",
        credential: "Any",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 192).toISOString(),
        eventType: "Scanned",
        status: "Generated",
        description: "Credential QR generated for offline verification"
      }
    ];

    res.status(200).json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
};

module.exports = {
  getActivities
};
