export const institutionService = {
  fetchRequests: async () => {
    try {
      const response = await fetch("http://localhost:5000/api/institution/requests");
      if (!response.ok) throw new Error("Failed to fetch requests");
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.warn("Falling back to local mock requests: ", error);
      return [
        { id: "req_101", institution: "HDFC Bank", credential: "Salary Slip", purpose: "Home Loan Processing", status: "Pending", requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
        { id: "req_102", institution: "Mumbai University", credential: "Identity Proof", purpose: "Alumni Verification", status: "Approved", requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() }
      ];
    }
  },

  fetchReceived: async () => {
    try {
      const response = await fetch("http://localhost:5000/api/institution/received");
      if (!response.ok) throw new Error("Failed to fetch received credentials");
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.warn("Falling back to local mock received credentials: ", error);
      return [
        { id: "rcv_201", credentialName: "Academic Transcript", userDid: "did:key:z6MkhaXgB...", institution: "Oxford University", accessTokenStatus: "Active", remainingTime: "45 mins", verificationStatus: "Verified" },
        { id: "rcv_202", credentialName: "Employment Letter", userDid: "did:key:z6MkhaXgB...", institution: "TechCorp Inc.", accessTokenStatus: "Active", remainingTime: "12 hours", verificationStatus: "Verified" }
      ];
    }
  },

  sendRequest: async (payload) => {
    try {
      const response = await fetch("http://localhost:5000/api/institution/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      return await response.json();
    } catch (error) {
      return { success: true, message: "Mock: Request successful locally." };
    }
  },

  revokeAccess: async (id) => {
    try {
      const response = await fetch("http://localhost:5000/api/institution/revoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      return await response.json();
    } catch (error) {
      return { success: true, message: `Mock: Successfully revoked ID ${id} locally.` };
    }
  }
};
