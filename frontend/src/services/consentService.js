export const consentService = {
  getRequests: async () => {
    try {
      const response = await fetch("http://localhost:5000/api/consent/requests");
      if (!response.ok) throw new Error("Failed to fetch consent requests");
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.warn("Falling back to local mock data due to error: ", error);
      return [
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
    }
  },

  getActiveSessions: async () => {
    try {
      const response = await fetch("http://localhost:5000/api/consent/active");
      if (!response.ok) throw new Error("Failed to fetch active sessions");
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.warn("Falling back to local mock data due to error: ", error);
      return [
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
    }
  },

  approveRequest: async (id, duration) => {
    try {
      const response = await fetch("http://localhost:5000/api/consent/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, duration })
      });
      return await response.json();
    } catch (error) {
      console.warn("Mock approval fallback");
      return { success: true, message: "Approved successfully." };
    }
  },

  denyRequest: async (id) => {
    try {
      const response = await fetch("http://localhost:5000/api/consent/deny", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      return await response.json();
    } catch (error) {
      console.warn("Mock deny fallback");
      return { success: true, message: "Denied successfully." };
    }
  }
};
