// ====== COUNTDOWN LOGIC ======
const countdownEl = document.getElementById("countdown");
const nextBtn = document.getElementById("nextBtn");
const countdownScreen = document.getElementById("countdown-screen");
const milestones = document.getElementById("milestones");

// Countdown timer
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
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

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
  milestoneSections.forEach((section) => {
    section.classList.add("hidden");
    section.style.opacity = 0;
  });
  const section = milestoneSections[index];
  section.classList.remove("hidden");
  section.style.opacity = 1;
  current = index; // always keep current in sync
}

// ====== PUZZLE BUTTONS ======
document.querySelectorAll(".unlock").forEach((btn) => {
  btn.addEventListener("click", () => {
    const puzzle = btn.closest(".milestone, #countdown-screen");
    const answersAttr = puzzle.dataset.answer || "";
    const answers = answersAttr
      .toLowerCase()
      .split(",")
      .map(a => a.trim());
    const userAnswerInput = puzzle.querySelector(".answer");
    const userAnswer = userAnswerInput ? userAnswerInput.value.toLowerCase().trim() : "";

    const isCorrect = answers.some(ans => userAnswer === ans);

    if (isCorrect) {
      // Fire confetti
      if (typeof confetti === "function") {
        confetti({ particleCount: 80, spread: 70 });
      }

      // If this is the countdown screen
      if (puzzle.id === "countdown-screen") {
        countdownScreen.classList.add("hidden");
        milestones.classList.remove("hidden");
        showMilestone(0);
      } else {
        // Normal milestone → show next
        if (current + 1 < milestoneSections.length) {
          showMilestone(current + 1);
        } else {
          milestones.classList.add("hidden");
          document.getElementById("main-content").classList.remove("hidden");
        }
      }
    } else {
      const hint = puzzle.querySelector(".hint");
      if (hint) hint.classList.remove("hidden");
    }
  });
});

// ====== NEXT SECTION BUTTONS ======
document.querySelectorAll(".next-section").forEach((btn) => {
  btn.addEventListener("click", () => {
    const section = btn.closest(".milestone");
    const index = Array.from(milestoneSections).indexOf(section);

    if (index + 1 < milestoneSections.length) {
      showMilestone(index + 1);
    } else {
      milestones.classList.add("hidden");
      document.getElementById("main-content").classList.remove("hidden");
    }
  });
});
