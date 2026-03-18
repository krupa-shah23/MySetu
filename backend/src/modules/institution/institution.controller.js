const mockOutgoingRequests = [
  {
    id: "req_101",
    institution: "HDFC Bank",
    credential: "Salary Slip",
    purpose: "Home Loan Processing",
    status: "Pending",
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
  },
  {
    id: "req_102",
    institution: "Mumbai University",
    credential: "Identity Proof",
    purpose: "Alumni Verification",
    status: "Approved",
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
  }
];

const mockReceivedCredentials = [
  {
    id: "rcv_201",
    credentialName: "Academic Transcript",
    userDid: "did:key:z6MkhaXgB...",
    institution: "Oxford University",
    accessTokenStatus: "Active",
    remainingTime: "45 mins",
    verificationStatus: "Verified"
  },
  {
    id: "rcv_202",
    credentialName: "Employment Letter",
    userDid: "did:key:z6MkhaXgB...",
    institution: "TechCorp Inc.",
    accessTokenStatus: "Active",
    remainingTime: "12 hours",
    verificationStatus: "Verified"
  }
];

const getRequests = (req, res) => {
  try {
    return res.status(200).json({ success: true, data: mockOutgoingRequests });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getReceived = (req, res) => {
  try {
    return res.status(200).json({ success: true, data: mockReceivedCredentials });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const requestCredential = (req, res) => {
  try {
    const { institution, userDid, credentialType, purpose, duration } = req.body;
    // In a real system, this would write to a DB mapping the DID request
    return res.status(200).json({ 
      success: true, 
      message: `Request sent to ${userDid} for ${credentialType}` 
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const revokeAccess = (req, res) => {
  try {
    const { id } = req.body;
    // Real system would delete the access token mapped to 'id'
    return res.status(200).json({ 
      success: true, 
      message: `Access token ${id} successfully revoked and flushed.` 
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getRequests,
  getReceived,
  requestCredential,
  revokeAccess
};
