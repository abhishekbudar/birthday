// ====== COUNTDOWN LOGIC ======
const countdownEl = document.getElementById("countdown");
const nextBtn = document.getElementById("nextBtn");
const countdownScreen = document.getElementById("countdown-screen");
const milestones = document.getElementById("milestones");

// Countdown timer
const targetDate = new Date(Date.now() + 5000).getTime();  // 5 seconds for testing
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
  showMilestone(0);  // Show first milestone
});

// ====== MILESTONES LOGIC ======
const milestoneSections = document.querySelectorAll(".milestone");
let current = 0;

function showMilestone(index) {
  // Hide all milestones and then display the correct one
  milestoneSections.forEach((section) => {
    section.classList.add("hidden");
    section.style.opacity = 0;
  });

  const section = milestoneSections[index];
  section.classList.remove("hidden");
  section.style.opacity = 1;
  current = index;  // Sync the current milestone
}

// ====== PUZZLE BUTTONS ======
document.querySelectorAll(".unlock").forEach((btn) => {
  btn.addEventListener("click", () => {
    const puzzle = btn.closest(".milestone");
    const answersAttr = puzzle.dataset.answer || "";
    const answers = answersAttr
      .toLowerCase()
      .split(",")
      .map(a => a.trim());  // Allow multiple answers, trimmed

    const userAnswerInput = puzzle.querySelector(".answer");
    const userAnswer = userAnswerInput ? userAnswerInput.value.toLowerCase().trim() : "";

    // Check if the user entered something
    if (userAnswer === "") {
      const hint = puzzle.querySelector(".hint");
      if (hint) hint.classList.remove("hidden");
      return;  // Exit if no answer
    }

    // Check if the answer is correct
    const isCorrect = answers.some(ans => userAnswer === ans);

    if (isCorrect) {
      if (typeof confetti === "function") {
        confetti({ particleCount: 80, spread: 70 });
      }

      // Disable the button to avoid multiple submissions
      btn.disabled = true;

      // Move to the next milestone
      if (current + 1 < milestoneSections.length) {
        showMilestone(current + 1);
      } else {
        // Show final content if no more milestones
        milestones.classList.add("hidden");
        document.getElementById("main-content").classList.remove("hidden");
      }
    } else {
      // Show hint if answer is wrong
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
