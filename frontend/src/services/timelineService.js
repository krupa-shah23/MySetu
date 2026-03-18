export const timelineService = {
  getTimeline: async () => {
    try {
      const response = await fetch("http://localhost:5000/api/timeline");
      if (!response.ok) throw new Error("Failed to fetch timeline events");
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.warn("Falling back to local mock data due to error: ", error);
      return [
        {
          id: "evt_001",
          title: "Degree Certificate issued",
          domain: "Education",
          institution: "Mumbai University",
          timestamp: "2025-08-15T10:30:00Z",
          status: "Issued",
          description: "New verified credential added to your wallet.",
          type: "Issue"
        },
        {
          id: "evt_002",
          title: "Academic Transcript shared",
          domain: "Education",
          institution: "Axis Bank",
          timestamp: "2025-08-12T14:45:00Z",
          status: "Shared",
          description: "Temporary access granted for Home Loan Eligibility.",
          type: "Share"
        },
        {
          id: "evt_003",
          title: "Employment Verification added",
          domain: "Employment",
          institution: "Infosys",
          timestamp: "2025-08-01T09:15:00Z",
          status: "Issued",
          description: "Employment history verified by employer.",
          type: "Issue"
        },
        {
          id: "evt_004",
          title: "Salary Slip verified",
          domain: "Finance",
          institution: "Axis Bank",
          timestamp: "2025-07-28T11:20:00Z",
          status: "Verified",
          description: "Credential successfully scanned and validated.",
          type: "Verify"
        },
        {
          id: "evt_005",
          title: "Medical History requested",
          domain: "Healthcare",
          institution: "HealthSure",
          timestamp: "2025-07-20T16:05:00Z",
          status: "Shared",
          description: "Consent granted for Policy Risk Review.",
          type: "Request"
        },
        {
          id: "evt_006",
          title: "Access revoked",
          domain: "Employment",
          institution: "ABC Corp",
          timestamp: "2025-07-15T08:50:00Z",
          status: "Revoked",
          description: "Access to Degree Certificate manually revoked.",
          type: "Revoke"
        },
        {
          id: "evt_007",
          title: "Identity Proof scanned",
          domain: "Identity",
          institution: "Offline Kiosk",
          timestamp: "2025-07-10T13:30:00Z",
          status: "Scanned",
          description: "QR code scanned at Airport check-in.",
          type: "Scan"
        },
        {
          id: "evt_008",
          title: "Degree Certificate re-shared",
          domain: "Education",
          institution: "Employer Portal",
          timestamp: "2025-07-05T10:00:00Z",
          status: "Shared",
          description: "Credential updated in external portal.",
          type: "Share"
        }
      ];
    }
  }
};
