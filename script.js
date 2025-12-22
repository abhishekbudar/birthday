// ====== COUNTDOWN LOGIC ======
const countdownEl = document.getElementById("countdown");
const nextBtn = document.getElementById("nextBtn");
const countdownScreen = document.getElementById("countdown-screen");
const milestones = document.getElementById("milestones");

//const targetDate = new Date("December 31, 2025 00:00:00").getTime();
const targetDate = new Date(Date.now() + 5000).getTime();

const timer = setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    clearInterval(timer);
    countdownEl.textContent = "🎉 It’s time! 🎉";
    nextBtn.disabled = false;
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000*60*60));
  const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((distance % (1000*60)) / 1000);

  countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

// Unlock countdown → show first milestone
nextBtn.addEventListener("click", () => {
  countdownScreen.classList.add("hidden");
  milestones.classList.remove("hidden");
  showMilestone(0);
});

// ====== MILESTONES LOGIC ======
const milestoneSections = document.querySelectorAll(".milestone");
let current = 0;

function showMilestone(index) {
  milestoneSections.forEach((section, i) => {
    section.classList.add("hidden");
    section.style.opacity = 0;
  });
  const section = milestoneSections[index];
  section.classList.remove("hidden");
  section.style.opacity = 1;
}

document.querySelectorAll(".unlock").forEach(btn => {
  btn.addEventListener("click", () => {
    const puzzle = btn.closest(".puzzle");
    if (!puzzle) return;

    // Support multiple answers
    const answers = puzzle.dataset.answer
      .toLowerCase()
      .split(",")
      .map(a => a.trim());

    const userAnswer = puzzle.querySelector(".answer").value
      .toLowerCase()
      .trim();

    const isCorrect = answers.some(ans => userAnswer === ans);

    if (isCorrect) {
      // Confetti
      if (typeof confetti === "function") {
        confetti({ particleCount: 80, spread: 70 });
      }

      // Hide hint if any
      puzzle.querySelector(".hint").classList.add("hidden");

      // Move to next milestone
      current++; 
      if (current < milestoneSections.length) {
        showMilestone(current);
      } else {
        // Last milestone → show main content
        milestones.classList.add("hidden");
        document.getElementById("main-content").classList.remove("hidden");
      }
    } else {
      puzzle.querySelector(".hint").classList.remove("hidden");
    }
  });
});
