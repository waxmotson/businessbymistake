const clickSound = new Audio('vine2.mp3');
let answered = false;

const correct = [
  "Are you a sole trader of knowledge?",
  "That was an easy one.",
  "Lucky guess.",
  "Someone's been studying.",
  "Competitive advantage unlocked.",
  "Stakeholder approved."
];

const incorrect = [
  "Someone needs to study.",
  "Misclick?",
  "Putting the mistake in BUSINESS BY MISTAKE",
  "You are a liability",
  "Negative cash flow on that one",
  "Your intelligence is in a contractionary phase",
  "Thinking deficit",
  "Involuntary separation from the correct answer",
  "Demerit good"
];

let current = null;

function loadRandom() {
  answered = false;

  document.querySelectorAll('.buttons button').forEach(btn => {
    btn.disabled = false;
  });

  current = answers[Math.floor(Math.random() * answers.length)];
  document.getElementById('title').textContent = current.question;
  document.getElementById('question-img').src = 'static/' + current.question;
  document.getElementById('result').textContent = '';
  document.getElementById('message').textContent = '';
  document.getElementById('reloader').hidden = true;
}

function check(choice) {
  if (answered) return;
  answered = true;

  document.querySelectorAll('.buttons button').forEach(btn => {
    btn.disabled = true;
  });

  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
  document.getElementById('reloader').hidden = false;

  if (choice == current.answer) {
    recordAnswer(true);
    document.getElementById('result').textContent =
      'CORRECT ANSWER: ' + current.answer;
    document.getElementById('message').textContent =
      correct[Math.floor(Math.random() * correct.length)];
    document.getElementById('result').style.color = 'lawngreen';
  } else {
    recordAnswer(false);
    document.getElementById('result').textContent =
      'Incorrect, it was: ' + current.answer;
    document.getElementById('message').textContent =
      incorrect[Math.floor(Math.random() * incorrect.length)];
    document.getElementById('result').style.color = 'firebrick';
  }
}

loadRandom();
