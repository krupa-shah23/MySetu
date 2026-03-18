export const aiService = {
  getSuggestions: async (context = "Home Loan") => {
    try {
      const response = await fetch(`http://localhost:5000/api/ai/suggestions?context=${encodeURIComponent(context)}`);
      if (!response.ok) throw new Error("Failed to fetch AI suggestions");
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.warn("Falling back to local mock AI data due to error: ", error);
      // Fallback mock
      return {
        readinessScore: 85,
        availableCount: 3,
        missingCount: 1,
        summary: "Your packet is nearly ready. Adding the missing employment proof will finalize verification.",
        items: [
          { id: "ai_1", credentialName: "Salary Slip", reason: "Required to verify your income stability.", priority: "High", status: "Available" },
          { id: "ai_2", credentialName: "Identity Proof", reason: "Mandatory KYC requirement.", priority: "High", status: "Available" },
          { id: "ai_3", credentialName: "Degree Certificate", reason: "Strengthens your profile as an educated professional.", priority: "Medium", status: "Available" },
          { id: "ai_4", credentialName: "Employment Letter", reason: "Verifies your current active employment status.", priority: "High", status: "Missing" }
        ]
      };
    }
  }
};
