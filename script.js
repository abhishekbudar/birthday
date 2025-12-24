document.addEventListener("DOMContentLoaded", () => {
  // Countdown Logic
  const countdownEl = document.getElementById("countdown");
  const nextBtn = document.getElementById("nextBtn");
  const countdownScreen = document.getElementById("countdown-screen");
  const milestones = document.getElementById("milestones");

  // Get the background music audio element
  const music = document.getElementById("background-music");  // Get the audio element

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
  const targetDate = new Date(Date.now() + 5000).getTime(); // 5 seconds for testing
  //const targetDate = new Date("December 31, 2025 00:00:00").getTime();
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

    // Start the background music when milestones appear
    music.play();  // Play the music once the milestones section is visible
  });

  // const letter = "My dearest, there are no words that can fully express the way you make me feel. With each passing day, my love for you grows deeper. You have brought joy, laughter, and a sense of peace into my life that I never knew I needed. Every memory we’ve made together fills my heart with happiness, and I look forward to building countless more. You are my everything. Happy Birthday, my love. 💖";

  // const loveLetterElement = document.getElementById("love-letter");
  // loveLetterElement.textContent = letter; // Set the full love letter

  const loveLetterElement = document.getElementById("love-letter");

  // Updated Love letter content
  const letter = `My dearest,

  There are no words that can fully express the way you make me feel. Every day with you is a blessing, a reminder of how much love, joy, and light you've brought into my life. From the very first moment we met, I knew my world was about to change, but I never could have imagined how deeply you would touch my heart. With each passing day, my love for you only grows stronger, deeper, and more beautiful than I ever thought possible.

  You have an incredible way of filling every moment with warmth and laughter, turning even the simplest days into memories I will cherish forever. Your smile brightens even the darkest of days, and the way you care for those around you leaves me in awe. I feel so incredibly lucky to be the one you’ve chosen to share your life with.

  Through every challenge, every joy, and every small victory, you have shown me what true love means. You have taught me to embrace the small things, to appreciate the moments that we often overlook, and to always look forward to tomorrow with hope and excitement. Your love gives me strength, your presence gives me peace, and your heart is the home I never knew I needed.

  As I reflect on all the memories we’ve made together, my heart fills with so much gratitude and happiness. From the quiet, intimate moments to the loud, carefree adventures, every second spent with you is a gift. And as we look toward the future, I am beyond excited to continue building countless more beautiful memories with you, side by side.

  Happy Birthday, my love! Today is all about celebrating the wonderful person you are and everything you bring to this world. You are my everything. My rock, my greatest support, my love, my best friend, and the light in my life. I want you to know, with every fiber of my being, how much you mean to me. Thank you for being you and for making my life so incredibly special. Here's to today, tomorrow, and all the years ahead of us. I love you more than words could ever convey. ❤️`;

  // Set the love letter text
  loveLetterElement.textContent = letter;

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

  let currentSetIndex = 0;  // Start with the first set
  let totalSets = document.querySelectorAll('.image-set').length;  // Get the total number of sets
  let imageSets = document.querySelectorAll('.image-set');  // Select all image sets

  function showNextSet() {
    // Hide all sets first
    imageSets.forEach(set => {
      set.style.opacity = 0;  // Hide the set by setting opacity to 0
    });

    // Show the next set
    currentSetIndex++;
    if (currentSetIndex >= totalSets) {
      currentSetIndex = 0; // Loop back to the first set
    }

    // Show the next set with fade-in effect
    imageSets[currentSetIndex].style.opacity = 1;  // Show the current set by setting opacity to 1
  }

  function startSlideshow() {
    setInterval(showNextSet, 4000);  // Change the set every 4 seconds (you can adjust the time)
  }

  // Initialize the slideshow
  showNextSet();  // Show the first set immediately
  startSlideshow();  // Start the slideshow

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
