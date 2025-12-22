// // Countdown Logic
// const countdownEl = document.getElementById("countdown");
// const nextBtn = document.getElementById("nextBtn");
// const countdownScreen = document.getElementById("countdown-screen");
// const milestones = document.getElementById("milestones");

// // Countdown timer (5 seconds for testing)
// const targetDate = new Date(Date.now() + 5000).getTime();
// const timer = setInterval(() => {
//   const now = new Date().getTime();
//   const distance = targetDate - now;

//   if (distance <= 0) {
//     clearInterval(timer);
//     countdownEl.textContent = "🎉 It’s time! 🎉";
//     nextBtn.disabled = false;
//     return;
//   }

//   const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//   countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
// }, 1000);

// // Show first milestone after countdown
// nextBtn.addEventListener("click", () => {
//   countdownScreen.classList.add("hidden");
//   milestones.classList.remove("hidden");
//   showMilestone(0);
// });

// // Milestone Logic
// const milestoneSections = document.querySelectorAll(".milestone");
// let current = 0;

// function showMilestone(index) {
//   milestoneSections.forEach((section) => {
//     section.classList.add("hidden");
//     section.style.opacity = 0;
//   });

//   const section = milestoneSections[index];
//   section.classList.remove("hidden");
//   section.style.opacity = 1;
//   current = index;
// }

// // Puzzle Button Logic
// document.querySelectorAll(".unlock").forEach((btn) => {
//   btn.addEventListener("click", () => {
//     const puzzle = btn.closest(".milestone");
//     const answersAttr = puzzle.dataset.answer || "";
//     const answers = answersAttr
//       .toLowerCase()
//       .split(",")
//       .map(a => a.trim());

//     const userAnswerInput = puzzle.querySelector(".answer");
//     const userAnswer = userAnswerInput ? userAnswerInput.value.toLowerCase().trim() : "";

//     // Exit if no answer entered
//     if (userAnswer === "") {
//       const hint = puzzle.querySelector(".hint");
//       if (hint) hint.classList.remove("hidden");
//       return;
//     }

//     // Check if the answer is correct
//     const isCorrect = answers.some(ans => userAnswer === ans);

//     if (isCorrect) {
//       if (typeof confetti === "function") {
//         confetti({ particleCount: 80, spread: 70 });
//       }

//       btn.disabled = true; // Disable button after correct answer

//       if (current + 1 < milestoneSections.length) {
//         showMilestone(current + 1);
//       } else {
//         milestones.classList.add("hidden");
//         document.getElementById("main-content").classList.remove("hidden");
//       }
//     } else {
//       const hint = puzzle.querySelector(".hint");
//       if (hint) hint.classList.remove("hidden");
//     }
//   });
// });

// // Next Section Button Logic
// document.querySelectorAll(".next-section").forEach((btn) => {
//   btn.addEventListener("click", () => {
//     const section = btn.closest(".milestone");
//     const index = Array.from(milestoneSections).indexOf(section);

//     if (index + 1 < milestoneSections.length) {
//       showMilestone(index + 1);
//     } else {
//       milestones.classList.add("hidden");
//       document.getElementById("main-content").classList.remove("hidden");
//     }
//   });
// });
