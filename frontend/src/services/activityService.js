export const activityService = {
  fetchActivities: async () => {
    try {
      const response = await fetch("http://localhost:5000/api/activity");
      if (!response.ok) throw new Error("Failed to fetch activity log");
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.warn("Falling back to local mock activity log: ", error);
      // Fallback arrays identical to backend requirements
      return [
        { id: "act_001", title: "Academic Transcript shared", institution: "Axis Bank", credential: "Academic Transcript", timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), eventType: "Shared", status: "Success", description: "Successfully authorized read-only payload delivery." },
        { id: "act_002", title: "Degree Certificate verified", institution: "Infosys", credential: "Degree Certificate", timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), eventType: "Verified", status: "Success", description: "Cryptographic signature validated by Infosys identity systems." },
        { id: "act_003", title: "Medical History requested", institution: "HealthSure", credential: "Medical History", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), eventType: "Requests", status: "Pending", description: "Inbound request for underwriting." },
        { id: "act_004", title: "Access revoked", institution: "ABC Corp", credential: "Identity Proof", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), eventType: "Revoked", status: "Success", description: "Manually triggered revocation of temporary token." },
        { id: "act_005", title: "Identity Proof scanned", institution: "Offline Verifier", credential: "Identity Proof", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(), eventType: "Scanned", status: "Success", description: "Offline QR Verification performed successfully." },
        { id: "act_006", title: "Salary Slip shared", institution: "HDFC Bank", credential: "Salary Slip", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), eventType: "Shared", status: "Success", description: "Payload delivered for loan review." },
        { id: "act_007", title: "Employment Letter added", institution: "TechCorp Inc.", credential: "Employment Letter", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), eventType: "Verified", status: "Success", description: "New credential successfully bound to wallet DID." },
        { id: "act_008", title: "Degree Certificate re-shared", institution: "Employer Portal", credential: "Degree Certificate", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), eventType: "Shared", status: "Success", description: "Background check verification packet." },
        { id: "act_009", title: "Consent approved", institution: "University Portal", credential: "Identity Proof", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(), eventType: "Requests", status: "Success", description: "Approval granted for 24-hour temporary access." },
        { id: "act_010", title: "Credential QR generated", institution: "Local Device", credential: "Academic Transcript", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 144).toISOString(), eventType: "Scanned", status: "Pending", description: "Awaiting offline scan presentation." }
      ];
    }
  }
};
