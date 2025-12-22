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

// Next button in milestone
document.querySelectorAll(".next-section").forEach((btn, i) => {
  btn.addEventListener("click", () => {
    current++;
    if(current < milestoneSections.length){
      showMilestone(current);
    } else {
      // Final milestone done → show main content
      milestones.classList.add("hidden");
      document.getElementById("main-content").classList.remove("hidden");
    }
  });
  
});



function typeText(element, text, speed = 30) {
  element.innerHTML = "";
  let i = 0;

  const interval = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, speed);
}
document.querySelectorAll(".unlock").forEach(btn => {
  btn.addEventListener("click", () => {
    const puzzle = btn.closest(".puzzle");
    const answers = puzzle.dataset.answer.toLowerCase().split(",").map(a => a.trim());
    const userAnswer = puzzle.querySelector(".answer").value.toLowerCase().trim();

    if (answers.some(ans => userAnswer === ans)) {
      // Confetti
      if (typeof confetti === "function") {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }

      // Landing page logic
      if (puzzle.closest("#countdown-screen")) {
        document.getElementById("countdown-screen").classList.add("hidden");
        document.getElementById("milestones").classList.remove("hidden");
        showMilestone(0);
      }
    } else {
      puzzle.querySelector(".hint").classList.remove("hidden");
    }
  });
});
