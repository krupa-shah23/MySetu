const mockRequests = [
  {
    id: 'req_001',
    institution: 'Axis Bank',
    institutionType: 'Bank',
    credential: 'Academic Transcript',
    purpose: 'Home Loan Eligibility',
    requestedDuration: '24 hours',
    trustLevel: 'High',
    status: 'Pending'
  },
  {
    id: 'req_002',
    institution: 'Infosys',
    institutionType: 'Employer',
    credential: 'Degree Certificate',
    purpose: 'Employment Verification',
    requestedDuration: 'Custom',
    trustLevel: 'High',
    status: 'Pending'
  },
  {
    id: 'req_003',
    institution: 'HealthSure',
    institutionType: 'Hospital',
    credential: 'Medical History',
    purpose: 'Policy Risk Review',
    requestedDuration: '1 hour',
    trustLevel: 'Medium',
    status: 'Pending'
  },
  {
    id: 'req_004',
    institution: 'University Portal',
    institutionType: 'University',
    credential: 'Identity Proof',
    purpose: 'Student Revalidation',
    requestedDuration: '10 mins',
    trustLevel: 'High',
    status: 'Pending'
  }
];

const activeSessions = [
  {
    id: 'sess_001',
    institution: 'Axis Bank',
    credential: 'Identity Proof',
    remainingTime: '45 mins',
    status: 'Active'
  },
  {
    id: 'sess_002',
    institution: 'City General Hospital',
    credential: 'Medical History',
    remainingTime: '2 hours',
    status: 'Active'
  }
];

const getRequests = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: mockRequests
    });
  } catch (error) {
    console.error("Error fetching consent requests:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getActiveSessions = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: activeSessions
    });
  } catch (error) {
    console.error("Error fetching active sessions:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const approveRequest = (req, res) => {
  try {
    const { id, duration } = req.body;
    return res.status(200).json({
      success: true,
      message: `Request ${id} approved successfully for ${duration}`,
      tokenExpiry: new Date(Date.now() + 3600000).toISOString() // mock 1 hr logic
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const denyRequest = (req, res) => {
  try {
    const { id } = req.body;
    return res.status(200).json({
      success: true,
      message: `Request ${id} denied successfully.`
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getRequests,
  getActiveSessions,
  approveRequest,
  denyRequest
};
