export const graphService = {
  getCareerGraph: async () => {
    try {
      const response = await fetch("http://localhost:5000/api/graph/career");
      if (!response.ok) throw new Error("Failed to fetch graph data");
      const result = await response.json();
      return result.data || { nodes: [], edges: [] };
    } catch (error) {
      console.warn("Falling back to local mock data due to error: ", error);
      return {
        nodes: [
          { id: "node_1", title: "B.Tech Degree", organization: "Mumbai University", dateRange: "2018 - 2022", type: "Education", verified: true, linkedCredentials: 2 },
          { id: "node_2", title: "Academic Transcript", organization: "Mumbai University", dateRange: "2018 - 2022", type: "Education", verified: true, linkedCredentials: 1 },
          { id: "node_3", title: "Internship at TCS", organization: "Tata Consultancy Services", dateRange: "Jan 2022 - Jun 2022", type: "Work", verified: true, linkedCredentials: 1 },
          { id: "node_4", title: "Software Engineer", organization: "Infosys", dateRange: "Jul 2022 - Dec 2024", type: "Work", verified: true, linkedCredentials: 3 },
          { id: "node_5", title: "Senior Software Engineer", organization: "Infosys", dateRange: "Jan 2025 - Present", type: "Work", verified: false, linkedCredentials: 0 },
          { id: "node_6", title: "Cloud Certification", organization: "AWS Training", dateRange: "Mar 2025", type: "Skills", verified: true, linkedCredentials: 1 }
        ],
        edges: [
          { id: "e1-2", source: "node_1", target: "node_2" },
          { id: "e2-3", source: "node_2", target: "node_3" },
          { id: "e3-4", source: "node_3", target: "node_4" },
          { id: "e4-5", source: "node_4", target: "node_5" },
          { id: "e5-6", source: "node_5", target: "node_6" }
        ]
      };
    }
  }
};
