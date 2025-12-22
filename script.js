document.addEventListener("DOMContentLoaded", () => {
  // Countdown Logic
  const countdownEl = document.getElementById("countdown");
  const nextBtn = document.getElementById("nextBtn");
  const countdownScreen = document.getElementById("countdown-screen");
  const milestones = document.getElementById("milestones");

  // Hide the "Start the journey" button initially
  nextBtn.style.display = "none";

  // Start Confetti on landing page
  const runConfetti = () => {
    const interval = setInterval(() => {
      confetti({
        particleCount: 100, 
        spread: 70, 
        origin: { x: Math.random(), y: Math.random() }, 
      });
    }, 200); // Fire every 200ms

    return interval; // Return the interval ID so it can be cleared later
  };

  // Start Confetti
  const confettiInterval = runConfetti(); // Start the confetti effect when page loads

  // Countdown timer (5 seconds for testing)
  //const targetDate = new Date(Date.now() + 5000).getTime(); // 5 seconds for testing
  const targetDate = new Date("December 31, 2025 00:00:00").getTime();
  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      clearInterval(timer);
      clearInterval(confettiInterval); // Stop confetti when countdown reaches 0
      countdownEl.textContent = "🎉 It’s time! 🎉";
      nextBtn.style.display = "block";  // Show the button after countdown reaches 0
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);

  // Show first milestone after countdown
  nextBtn.addEventListener("click", () => {
    countdownScreen.classList.add("hidden");
    milestones.classList.remove("hidden");
    showMilestone(0); // Show first milestone
  });

  // Milestone Logic
  const milestoneSections = document.querySelectorAll(".milestone");
  let current = 0;  // Track the current milestone

  // Function to show the milestone at the current index
  function showMilestone(index) {
    console.log(`showMilestone called with index: ${index}`); // Debugging log
    milestoneSections.forEach((section, idx) => {
      if (idx === index) {
        section.classList.remove("hidden");
        section.style.opacity = 1;
      } else {
        section.classList.add("hidden");
        section.style.opacity = 0;
      }
    });
  }

  // Puzzle Button Logic (Unlock next milestone)
  document.querySelectorAll(".unlock").forEach((btn) => {
    btn.addEventListener("click", () => {
      const puzzle = btn.closest(".milestone").querySelector(".puzzle");  // Correctly select the .puzzle div inside .milestone

      // Retrieve the correct answers from data-answer attribute
      const answersAttr = puzzle.dataset.answer || "";
      const answers = answersAttr
        .toLowerCase() // Convert the answers to lowercase
        .split(",") // Split by commas
        .map(a => a.trim()); // Trim any extra spaces

      const userAnswerInput = puzzle.querySelector(".answer"); // Get user input
      const userAnswer = userAnswerInput ? userAnswerInput.value.toLowerCase().trim() : ""; // Normalize user input

      console.log(`User Answer: "${userAnswer}"`); // Debugging log
      console.log(`Correct answers array: ${answers}`); // Debugging log

      // Exit if no answer entered
      if (userAnswer === "") {
        const hint = puzzle.querySelector(".hint");
        if (hint) hint.classList.remove("hidden");
        return;
      }

      // Check if the answer is correct
      const isCorrect = answers.some(ans => ans === userAnswer);

      console.log(`Is answer correct? ${isCorrect}`); // Debugging log

      if (isCorrect) {
        if (typeof confetti === "function") {
          confetti({ particleCount: 80, spread: 70 });
        }

        btn.disabled = true; // Disable button after correct answer

        // Show the next milestone after a correct answer
        if (current + 1 < milestoneSections.length) {
          current++;  // Increment current milestone index
          showMilestone(current); // Show the next milestone
        } else {
          milestones.classList.add("hidden");
          document.getElementById("main-content").classList.remove("hidden");
        }
      } else {
        const hint = puzzle.querySelector(".hint");
        if (hint) hint.classList.remove("hidden");
      }
    });
  });
});
