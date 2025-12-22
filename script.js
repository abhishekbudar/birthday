const countdownEl = document.getElementById("countdown");
const nextBtn = document.getElementById("nextBtn");
const mainContent = document.getElementById("main-content");
const countdownScreen = document.getElementById("countdown-screen");

// Set target date: 31 Dec 00:00
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
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownEl.textContent =
    `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

nextBtn.addEventListener("click", () => {
  countdownScreen.style.display = "none";
  mainContent.classList.remove("hidden");
});
