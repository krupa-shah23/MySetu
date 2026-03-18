import axios from 'axios';

// Get base URL assuming standard Vite/Express setup
// If Vite config uses proxy, this can just be '/api/activity'
// For this app, we'll try relative first, or specify full localhost if needed.
// Given the setup, /api/activity corresponds to the backend
const API_URL = 'http://localhost:5000/api/activity';

export const activityService = {
  fetchActivities: async () => {
    try {
      // In case CORS or proxy isn't perfectly configured, we could catch and return mock data, 
      // but let's try calling the real backend first.
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch from backend, returning local mock data fallback:', error);
      // Fallback mock data in case backend isn't running
      return [
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
    }
  }
};
