// Countdown Timer
const countdownEl = document.getElementById("countdown");
const nextBtn = document.querySelector(".nextBtn");  // Changed to class
const countdownScreen = document.getElementById("countdown-screen");
const milestones = document.getElementById("milestones");

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

// Milestone Logic
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
  current = index;
}

// Next Button Logic for Milestones
document.querySelectorAll(".nextBtn").forEach((btn) => {  // Changed to class
  btn.addEventListener("click", () => {
    // Check if we are on the last milestone, otherwise move to the next one
    if (current + 1 < milestoneSections.length) {
      showMilestone(current + 1);
    } else {
      milestones.classList.add("hidden");
      document.getElementById("main-content").classList.remove("hidden");
    }
  });
});
