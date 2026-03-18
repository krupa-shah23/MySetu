const mockQRPayload = {
  credentialId: "cred_104928A",
  credentialName: "Academic Transcript",
  issuer: "Mumbai University",
  issuerId: "did:web:mu.ac.in",
  credentialHash: "8f4e2b0a9c1d...",
  signature: "sign_093847abc91823...",
  timestamp: "2025-08-15T10:30:00Z"
};

const getPayload = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: mockQRPayload
    });
  } catch (error) {
    console.error("Error fetching QR Payload:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const verifyQR = (req, res) => {
  try {
    // Mock simulation: Always return a verified success state.
    const mockVerificationResult = {
      signatureValid: true,
      issuerRecognized: true,
      hashMatch: true,
      result: "Verified",
      credentialName: req.body.credentialName || "Academic Transcript",
      issuer: req.body.issuer || "Mumbai University",
      timestamp: new Date().toISOString()
    };

    return res.status(200).json({
      success: true,
      data: mockVerificationResult
    });
  } catch (error) {
    console.error("Error verifying QR:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getPayload,
  verifyQR
};
