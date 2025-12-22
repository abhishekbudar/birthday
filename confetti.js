// Fire confetti when the main content loads
const mainContent = document.getElementById("main-content");

function launchConfetti() {
  const duration = 5 * 1000; // 5 seconds
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    // launch confetti from random positions
    confetti(Object.assign({}, defaults, {
      particleCount: 5 + Math.random() * 5,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    }));
  }, 250);
}

// Trigger confetti when main content becomes visible
const observer = new MutationObserver(() => {
  if (!mainContent.classList.contains("hidden")) {
    launchConfetti();
    observer.disconnect();
  }
});

observer.observe(mainContent, { attributes: true, attributeFilter: ['class'] });
