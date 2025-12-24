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

    // Add floating musical notes randomly across the screen
    addMusicalNotes();
  });

  // Function to add random musical notes
  function addMusicalNotes() {
    const musicalNotesContainer = document.createElement("div");
    musicalNotesContainer.classList.add("musical-notes-container");
    document.body.appendChild(musicalNotesContainer);  // Append it to the body

    const numNotes = 15;  // Number of notes to generate (can be adjusted)
    const notes = ['❤️'];  // Array of possible notes
    const containerWidth = window.innerWidth;  // Get the width of the screen
    const containerHeight = window.innerHeight;  // Get the height of the screen

    for (let i = 0; i < numNotes; i++) {
      const note = document.createElement("span");
      note.classList.add("note");

      // Randomly choose the note (🎵 or 🎶)
      note.textContent = notes[Math.floor(Math.random() * notes.length)];

      // Set random position for each note
      note.style.left = Math.random() * containerWidth + "px";  // Random x-position
      note.style.bottom = 0;  // Start from the bottom of the screen

      // Set random animation speed and delay for each note
      const animationDuration = Math.random() * 4 + 3 + "s";  // Random speed between 3s to 7s
      const animationDelay = Math.random() * 5 + "s";  // Random delay before starting

      note.style.animationDuration = animationDuration;  // Apply the random speed
      note.style.animationDelay = animationDelay;  // Apply the random delay

      // Append the note to the container
      musicalNotesContainer.appendChild(note);
    }
  }

  // Love Letter Content
  const loveLetterElement = document.getElementById("love-letter");

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

  let currentSetIndex = 0;
  let totalSets = document.querySelectorAll('.image-set').length;
  let imageSets = document.querySelectorAll('.image-set');

  function showNextSet() {
    imageSets.forEach(set => {
      set.style.opacity = 0;
    });

    currentSetIndex++;
    if (currentSetIndex >= totalSets) {
      currentSetIndex = 0;
    }

    imageSets[currentSetIndex].style.opacity = 1;
  }

  function startSlideshow() {
    setInterval(showNextSet, 4000);
  }

  showNextSet();
  startSlideshow();

  // Puzzle Button Logic (Unlock next milestone)
  document.querySelectorAll(".unlock").forEach((btn) => {
    btn.addEventListener("click", () => {
      const puzzle = btn.closest(".milestone").querySelector(".puzzle");

      const answersAttr = puzzle.dataset.answer || "";
      const answers = answersAttr
        .toLowerCase()
        .split(",")
        .map(a => a.trim());

      const userAnswerInput = puzzle.querySelector(".answer");
      const userAnswer = userAnswerInput ? userAnswerInput.value.toLowerCase().trim() : "";

      if (userAnswer === "") {
        const hint = puzzle.querySelector(".hint");
        if (hint) hint.classList.remove("hidden");
        return;
      }

      const isCorrect = answers.some(ans => ans === userAnswer);

      if (isCorrect) {
        if (typeof confetti === "function") {
          confetti({ particleCount: 80, spread: 70 });
        }

        btn.disabled = true;

        if (current + 1 < milestoneSections.length) {
          current++;
          showMilestone(current);
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
