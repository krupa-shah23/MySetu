const getCredentials = (req, res) => {
  try {
    const mockCredentials = [
      {
        id: "cred_001",
        title: "Academic Transcript",
        domain: "Education",
        issuer: "University of Technology",
        issuedDate: "2023-05-15",
        expiryDate: null,
        status: "Verified",
        type: "AcademicTranscript"
      },
      {
        id: "cred_002",
        title: "Degree Certificate",
        domain: "Education",
        issuer: "University of Technology",
        issuedDate: "2023-06-01",
        expiryDate: null,
        status: "Verified",
        type: "DegreeCertificate"
      },
      {
        id: "cred_003",
        title: "Employment Letter",
        domain: "Employment",
        issuer: "Tech Solutions Inc.",
        issuedDate: "2024-01-10",
        expiryDate: "2025-01-10",
        status: "Verified",
        type: "EmploymentLetter"
      },
      {
        id: "cred_004",
        title: "Salary Slip",
        domain: "Finance",
        issuer: "Tech Solutions Inc.",
        issuedDate: "2024-02-28",
        expiryDate: null,
        status: "Shared",
        type: "SalarySlip"
      },
      {
        id: "cred_005",
        title: "Identity Proof",
        domain: "Identity",
        issuer: "National ID Authority",
        issuedDate: "2020-08-12",
        expiryDate: "2030-08-12",
        status: "Verified",
        type: "IdentityProof"
      },
      {
        id: "cred_006",
        title: "Medical History",
        domain: "Healthcare",
        issuer: "City General Hospital",
        issuedDate: "2024-03-01",
        expiryDate: null,
        status: "Expiring Soon",
        type: "MedicalHistory"
      }
    ];

    return res.status(200).json({
      success: true,
      data: mockCredentials
    });
  } catch (error) {
    console.error("Error fetching credentials:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching credentials"
    });
  }
};

module.exports = {
  getCredentials
};
