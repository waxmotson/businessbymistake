// Primary HSC Business Studies syllabus topic for each multiple-choice question.
// The order in each year is Q01 through Q20. Topics are based on the main
// syllabus knowledge assessed by each question in the NESA HSC papers.
const questionTopicsByYear = {
  2025: [
    "operations", "marketing", "finance", "human-resources", "marketing",
    "marketing", "operations", "operations", "finance", "human-resources",
    "human-resources", "human-resources", "marketing", "marketing",
    "human-resources", "finance", "human-resources", "finance",
    "operations", "finance"
  ],
  2024: [
    "human-resources", "operations", "human-resources", "marketing",
    "human-resources", "operations", "operations", "human-resources",
    "operations", "finance", "marketing", "human-resources", "marketing",
    "finance", "finance", "marketing", "finance", "operations", "finance",
    "marketing"
  ],
  2023: [
    "human-resources", "operations", "marketing", "human-resources",
    "marketing", "human-resources", "marketing", "finance",
    "human-resources", "marketing", "human-resources", "finance",
    "marketing", "finance", "operations", "finance", "operations",
    "operations", "human-resources", "finance"
  ],
  2022: [
    "marketing", "human-resources", "marketing", "marketing", "marketing",
    "human-resources", "operations", "human-resources", "human-resources",
    "operations", "marketing", "marketing", "marketing", "finance",
    "marketing", "marketing", "marketing", "finance", "operations", "finance"
  ],
  2021: [
    "finance", "human-resources", "operations", "human-resources",
    "marketing", "human-resources", "marketing", "marketing", "marketing",
    "operations", "operations", "operations", "finance", "marketing",
    "human-resources", "marketing", "human-resources", "finance",
    "finance", "finance"
  ],
  2020: [
    "human-resources", "human-resources", "human-resources", "marketing",
    "marketing", "operations", "operations", "marketing",
    "human-resources", "marketing", "operations", "human-resources",
    "operations", "finance", "operations", "marketing", "finance",
    "finance", "finance", "finance"
  ],
  2019: [
    "marketing", "finance", "human-resources", "finance", "marketing",
    "marketing", "marketing", "finance", "operations", "human-resources",
    "operations", "finance", "operations", "finance", "finance",
    "finance", "human-resources", "human-resources", "operations", "operations"
  ],
  2018: [
    "human-resources", "marketing", "operations", "human-resources",
    "marketing", "operations", "finance", "human-resources", "operations",
    "marketing", "human-resources", "finance", "operations", "marketing",
    "operations", "operations", "marketing", "finance", "finance", "finance"
  ],
  2017: [
    "human-resources", "operations", "marketing", "finance", "marketing",
    "finance", "marketing", "marketing", "operations", "marketing",
    "human-resources", "finance", "finance", "marketing", "finance",
    "operations", "finance", "finance", "human-resources", "finance"
  ],
  2016: [
    "marketing", "human-resources", "marketing", "finance",
    "human-resources", "operations", "marketing", "operations", "operations",
    "finance", "finance", "finance", "marketing", "finance", "marketing",
    "human-resources", "marketing", "human-resources", "finance",
    "human-resources"
  ]
};

function getQuestionTopic(questionFilename) {
  const match = /^HSC_BUSINESS_(\d{4})_Q(\d{2})\.png$/i.exec(questionFilename || "");
  if (!match) return null;

  const yearTopics = questionTopicsByYear[Number(match[1])];
  const questionIndex = Number(match[2]) - 1;
  return yearTopics && questionIndex >= 0 ? yearTopics[questionIndex] || null : null;
}
