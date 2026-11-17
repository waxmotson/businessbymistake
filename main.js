const clickSound = new Audio('vine2.mp3');
clickSound.addEventListener('error', () => {
  // fallback if vine2.mp3 is not in this repo yet
  clickSound.src = 'https://raw.githubusercontent.com/waxmotson/econbymistake/main/vine2.mp3';
});
let answered = false;

const correct = [
  "ASIC approved",
  "That was an easy one.",
  "Lucky guess.",
  "Someone's been studying.",
  "Competitive advantage.",
  "ACCC approved.",
  "Taxable"
];

const incorrect = [
  "Someone needs to study.",
  "Misclick?",
  "Putting the mistake in BUSINESS BY MISTAKE",
  "Current liability",
  "Internal influence: information resources",
  "Final recommendations: get better",
  "Missing quality control?"
];

const TOPIC_NAMES = {
  all: "All Topics",
  operations: "Operations",
  marketing: "Marketing",
  finance: "Finance",
  "human-resources": "Human Resources"
};
const TOPIC_STORAGE_KEY = "businessbymistakeSelectedTopicV1";

let selectedTopic = localStorage.getItem(TOPIC_STORAGE_KEY) || "all";
if (!Object.prototype.hasOwnProperty.call(TOPIC_NAMES, selectedTopic)) {
  selectedTopic = "all";
}

let current = null;

function updateTopicPicker() {
  document.querySelectorAll(".topic-button").forEach(button => {
    const isSelected = button.dataset.topic === selectedTopic;
    button.classList.toggle("selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  const status = document.getElementById("topic-status");
  if (status) {
    status.textContent = selectedTopic === "all"
      ? "Showing questions from all four topics"
      : "Showing " + TOPIC_NAMES[selectedTopic] + " questions";
  }
}

function getQuestionPool() {
  if (selectedTopic === "all") return answers;
  return answers.filter(question =>
    typeof getQuestionTopic === "function" &&
    getQuestionTopic(question.question) === selectedTopic
  );
}

function selectTopic(topic) {
  if (!Object.prototype.hasOwnProperty.call(TOPIC_NAMES, topic)) return;

  selectedTopic = topic;
  localStorage.setItem(TOPIC_STORAGE_KEY, selectedTopic);
  updateTopicPicker();
  loadRandom();
}

function loadRandom() {
  answered = false;

  const answerButtons = document.querySelectorAll(".buttons button");
  answerButtons.forEach(button => {
    button.disabled = false;
  });

  const questionPool = getQuestionPool();
  if (questionPool.length === 0) {
    current = null;
    document.getElementById("title").textContent = "No questions available";
    document.getElementById("question-img").hidden = true;
    answerButtons.forEach(button => { button.disabled = true; });
    document.getElementById("result").textContent = "";
    document.getElementById("message").textContent = "There are no questions tagged for this topic yet.";
    document.getElementById("reloader").hidden = true;
    return;
  }

  // Prefer questions not answered in the last 24 hours (see streak.js).
  // Passing the filtered pool preserves this behaviour within each topic.
  current = (typeof pickQuestion === "function")
    ? pickQuestion(questionPool)
    : questionPool[Math.floor(Math.random() * questionPool.length)];

  document.getElementById("question-img").hidden = false;
  document.getElementById("title").textContent = current.question;
  document.getElementById("question-img").src = "static/" + current.question;
  document.getElementById("result").textContent = "";
  document.getElementById("message").textContent = "";
  document.getElementById("result").style.color = "";
  document.getElementById("reloader").hidden = true;
}

function check(choice) {
  if (answered || !current) return;
  answered = true;

  document.querySelectorAll(".buttons button").forEach(button => {
    button.disabled = true;
  });

  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
  document.getElementById("reloader").hidden = false;

  if (choice == current.answer) {
    recordAnswer(true, current.question);
    document.getElementById("result").textContent =
      "CORRECT ANSWER: " + current.answer;
    document.getElementById("message").textContent =
      correct[Math.floor(Math.random() * correct.length)];
    document.getElementById("result").style.color = "lawngreen";
  } else {
    recordAnswer(false, current.question);
    document.getElementById("result").textContent =
      "Incorrect, it was: " + current.answer;
    document.getElementById("message").textContent =
      incorrect[Math.floor(Math.random() * incorrect.length)];
    document.getElementById("result").style.color = "firebrick";
  }
}

updateTopicPicker();
loadRandom();
