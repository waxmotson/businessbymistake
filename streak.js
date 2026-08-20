// Correct-answer streak tracking for BUSINESS BY MISTAKE.
// Uses its own storage namespace so the streak is independent of econbymistake.

const STREAK_STORAGE_KEY = 'businessbymistakeStreakV1';
const BEST_STREAK_STORAGE_KEY = 'businessbymistakeBestStreakV1';

let correctStreak = Number(localStorage.getItem(STREAK_STORAGE_KEY)) || 0;
let bestCorrectStreak = Number(localStorage.getItem(BEST_STREAK_STORAGE_KEY)) || 0;

function updateStreakDisplay() {
  let streak = document.getElementById('streak');
  if (!streak) {
    streak = document.createElement('div');
    streak.id = 'streak';
    streak.style.fontSize = '2.3rem';
    streak.style.fontWeight = 'bold';
    streak.style.marginTop = '12px';
    document.getElementById('result').insertAdjacentElement('afterend', streak);
  }

  streak.textContent = `CURRENT STREAK: ${correctStreak} | PB: ${bestCorrectStreak}`;
}

function recordAnswer(isCorrect) {
  if (isCorrect) {
    correctStreak++;
    if (correctStreak > bestCorrectStreak) {
      bestCorrectStreak = correctStreak;
      localStorage.setItem(BEST_STREAK_STORAGE_KEY, bestCorrectStreak);
    }
  } else {
    correctStreak = 0;
  }

  localStorage.setItem(STREAK_STORAGE_KEY, correctStreak);
  updateStreakDisplay();
}

document.addEventListener('DOMContentLoaded', updateStreakDisplay);
