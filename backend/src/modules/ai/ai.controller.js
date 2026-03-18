const mockSuggestionsDB = {
  "Home Loan": {
    readinessScore: 85,
    availableCount: 3,
    missingCount: 1,
    summary: "Your Home Loan packet is nearly ready. Adding the missing employment proof will finalize your verification.",
    items: [
      { id: "ai_1", credentialName: "Salary Slip", reason: "Required to verify your income stability for loan EMI.", priority: "High", status: "Available" },
      { id: "ai_2", credentialName: "Identity Proof", reason: "Mandatory KYC requirement for all financial institutions.", priority: "High", status: "Available" },
      { id: "ai_3", credentialName: "Degree Certificate", reason: "Strengthens your profile as an educated professional.", priority: "Medium", status: "Available" },
      { id: "ai_4", credentialName: "Employment Letter", reason: "Verifies your current active employment status.", priority: "High", status: "Missing" }
    ]
  },
  "Job Application": {
    readinessScore: 100,
    availableCount: 3,
    missingCount: 0,
    summary: "Your professional profile is fully equipped and verified. You are ready to share this bundle.",
    items: [
      { id: "ai_5", credentialName: "Degree Certificate", reason: "Proves your baseline academic qualifications.", priority: "High", status: "Available" },
      { id: "ai_6", credentialName: "Academic Transcript", reason: "Detailed insight into your scholastic performance.", priority: "Medium", status: "Available" },
      { id: "ai_7", credentialName: "Employment Letter", reason: "Validates your past or present employment history.", priority: "High", status: "Available" }
    ]
  },
  "Insurance": {
    readinessScore: 40,
    availableCount: 1,
    missingCount: 2,
    summary: "Significant health records are missing. Providing these will expedite your policy issuance.",
    items: [
      { id: "ai_8", credentialName: "Identity Proof", reason: "Standard KYC for policy registration.", priority: "High", status: "Available" },
      { id: "ai_9", credentialName: "Medical History", reason: "Crucial for underwriting health insurance risk.", priority: "High", status: "Missing" },
      { id: "ai_10", credentialName: "Salary Slip", reason: "Determines eligibility for high coverage amounts.", priority: "Medium", status: "Missing" }
    ]
  },
  "University Verification": {
    readinessScore: 70,
    availableCount: 2,
    missingCount: 1,
    summary: "Almost complete. Missing identity proof to finalize the enrollment verification.",
    items: [
      { id: "ai_11", credentialName: "Degree Certificate", reason: "Prerequisite for higher education applications.", priority: "High", status: "Available" },
      { id: "ai_12", credentialName: "Academic Transcript", reason: "Required for credit transfers and GPA validation.", priority: "High", status: "Available" },
      { id: "ai_13", credentialName: "Identity Proof", reason: "Ensures the student applying matches the academic records.", priority: "High", status: "Missing" }
    ]
  }
};

const getSuggestions = (req, res) => {
  try {
    const context = req.query.context || "Home Loan";
    const data = mockSuggestionsDB[context] || mockSuggestionsDB["Home Loan"];

    return res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error("Error fetching AI suggestions:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getSuggestions
};
