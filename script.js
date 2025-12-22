const text = "Today is all about you 💖";
let i = 0;

function typeEffect() {
  if (i < text.length) {
    document.querySelector(".hero p").textContent += text.charAt(i);
    i++;
    setTimeout(typeEffect, 100);
  }
}

document.querySelector(".hero p").textContent = "";
typeEffect();
