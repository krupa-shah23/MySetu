export const walletService = {
  getCredentials: async () => {
    try {
      const response = await fetch("http://localhost:5000/api/credentials");
      if (!response.ok) {
        throw new Error("Failed to fetch credentials");
      }
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.warn("Falling back to local mock data due to error: ", error);
      // Fallback mock data if the backend isn't reachable
      return [
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
    }
  }
};
