/* ==========================================================
   KALLUL-23 ✦ A LITTLE UNIVERSE, JUST FOR YOU
   Interactive magic and birthday surprises
   ========================================================== */

"use strict";

/* ----------------------------------------------------------
   1. BASIC SETUP
---------------------------------------------------------- */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

const gameState = {
  stars: new Set(),
  fireflies: new Set(),
  litStars: new Set(),
  natureChoices: 0,
  treeLevel: 0,
  badmintonScore: 0,
  cakeChosen: false,
  quizSolved: false,
  letterOpened: false,
  soundEnabled: false,
  gameRunning: false,
  gameTime: 15,
  gameInterval: null
};

const TOTAL_STARS = 5;

const showToast = (message) => {
  let toast = $("#toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.hidden = false;

  clearTimeout(showToast.timeout);

  showToast.timeout = setTimeout(() => {
    toast.hidden = true;
  }, 3200);
};


/* ----------------------------------------------------------
   2. BACKGROUND STARS
---------------------------------------------------------- */

function createBackgroundStars() {
  const background = $("#universe-background");

  if (!background) return;

  background.innerHTML = "";

  const count = window.innerWidth < 600 ? 65 : 110;

  for (let i = 0; i < count; i++) {
    const star = document.createElement("span");

    star.className = "star";

    const size = Math.random() * 2.5 + 1;

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animationDelay = `${Math.random() * 4}s`;
    star.style.animationDuration = `${2 + Math.random() * 4}s`;

    background.appendChild(star);
  }
}

createBackgroundStars();


/* ----------------------------------------------------------
   3. STAR COLLECTION SYSTEM
---------------------------------------------------------- */

function updateStarCounter() {
  const counter = $("#star-count");

  if (counter) {
    counter.textContent = gameState.stars.size;
  }

  const total = $("#star-total");

  if (total) {
    total.textContent = TOTAL_STARS;
  }

  updateDestinationCards();
  updateFinale();
}

function collectStar(starId, message = "A little star is yours! ✨") {
  if (gameState.stars.has(starId)) return;

  gameState.stars.add(starId);

  updateStarCounter();
  showToast(message);

  const card = $(`[data-destination="${starId}"]`);

  if (card) {
    card.classList.add("completed");
  }

  const matchingIsland = $(`[data-island="${starId}"]`);

  if (matchingIsland) {
    matchingIsland.classList.add("completed");
  }

  createSparkles();
}

function updateDestinationCards() {
  $$(".destination-card").forEach((card) => {
    const destination = card.dataset.destination;
    const status = $(".destination-status", card);

    if (!status) return;

    const completed = gameState.stars.has(destination);

    card.classList.toggle("completed", completed);

    if (completed) {
      status.textContent = "✦ Discovered";
    } else {
      status.textContent = "✧ Explore";
    }
  });
}


/* ----------------------------------------------------------
   4. MAGICAL SPARKLES
---------------------------------------------------------- */

function createSparkles() {
  const symbols = ["✦", "✧", "✨", "⋆", "💗"];

  for (let i = 0; i < 12; i++) {
    const sparkle = document.createElement("span");

    sparkle.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    sparkle.style.position = "fixed";
    sparkle.style.left = `${20 + Math.random() * 60}%`;
    sparkle.style.top = `${25 + Math.random() * 45}%`;
    sparkle.style.zIndex = "250";
    sparkle.style.pointerEvents = "none";
    sparkle.style.fontSize = `${12 + Math.random() * 18}px`;
    sparkle.style.color = "#ffe7a3";
    sparkle.style.textShadow = "0 0 15px #ff9ecf";
    sparkle.style.transition =
      "transform 1.2s ease, opacity 1.2s ease";

    document.body.appendChild(sparkle);

    requestAnimationFrame(() => {
      sparkle.style.transform =
        `translate(${Math.random() * 100 - 50}px, ` +
        `${Math.random() * -120}px) rotate(180deg)`;

      sparkle.style.opacity = "0";
    });

    setTimeout(() => sparkle.remove(), 1400);
  }
}


/* ----------------------------------------------------------
   5. WELCOME BUTTONS
---------------------------------------------------------- */

const startButton = $("#start-journey");

if (startButton) {
  startButton.addEventListener("click", () => {
    $("#universe-map")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    showToast("Your little universe is waiting for you. 🌙");
  });
}


/* ----------------------------------------------------------
   6. UNIVERSE MAP NAVIGATION
---------------------------------------------------------- */

$$("[data-destination]").forEach((card) => {
  card.addEventListener("click", () => {
    const destination = card.dataset.destination;

    const target = $(`#${destination}`);

    if (!target) {
      showToast("This little world is still waiting to be discovered. ✨");
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

$$("[data-island]").forEach((island) => {
  island.addEventListener("click", () => {
    const destination = island.dataset.island;
    const target = $(`#${destination}`);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


/* ----------------------------------------------------------
   7. FIRE FLY FOREST
---------------------------------------------------------- */

function updateFireflyProgress() {
  const progress = $("#firefly-progress");
  const text = $("#firefly-count");

  const caught = gameState.fireflies.size;
  const percentage = (caught / 5) * 100;

  if (progress) {
    progress.style.width = `${percentage}%`;
  }

  if (text) {
    text.textContent = `${caught} / 5 fireflies found`;
  }

  if (caught === 5) {
    collectStar(
      "forest",
      "You found all five fireflies! Forest Star collected. 🌟"
    );
  }
}

$$(".firefly").forEach((firefly, index) => {
  firefly.addEventListener("click", () => {
    const id = String(index);

    if (gameState.fireflies.has(id)) {
      showToast("This little firefly has already been found. ✨");
      return;
    }

    gameState.fireflies.add(id);

    firefly.classList.add("caught");
    firefly.setAttribute("aria-label", "Firefly found");
    firefly.textContent = "💫";

    updateFireflyProgress();
  });
});


/* ----------------------------------------------------------
   8. WILDWOOD NATURE CHOICES
---------------------------------------------------------- */

$$(".choice-card").forEach((choice) => {
  choice.addEventListener("click", () => {
    if (!choice.classList.contains("selected")) {
      choice.classList.add("selected");
      gameState.natureChoices++;

      const feedback = $("#nature-feedback");

      if (feedback) {
        feedback.textContent =
          choice.dataset.message ||
          "Every little choice makes this world more beautiful. 🌿";
      }

      if (gameState.natureChoices >= 2) {
        collectStar(
          "wildwood",
          "Wildwood Star collected! 🌿"
        );
      }
    }
  });
});


/* ----------------------------------------------------------
   9. MEMORY MOON
---------------------------------------------------------- */

const memoryButton = $("#memory-reveal");

if (memoryButton) {
  memoryButton.addEventListener("click", () => {
    const hiddenMemories = $$(".memory-card.hidden");

    if (hiddenMemories.length > 0) {
      hiddenMemories[0].classList.remove("hidden");
      hiddenMemories[0].classList.add("visible");

      if (hiddenMemories.length === 1) {
        collectStar(
          "memories",
          "Memory Moon Star collected! 🌙"
        );
      }
    } else {
      collectStar(
        "memories",
        "Your memories are shining forever. 🌙"
      );
    }
  });
}


/* ----------------------------------------------------------
   10. CONSTELLATION STAR PUZZLE
---------------------------------------------------------- */

function updateConstellation() {
  const count = gameState.litStars.size;
  const message = $("#constellation-message");

  if (message) {
    message.textContent = `${count} / 6 stars connected`;
  }

  if (count === 6) {
    collectStar(
      "constellation",
      "You connected the constellation! Cosmic Star collected. ✨"
    );

    if (message) {
      message.textContent =
        "A constellation made of little wishes. You did it! ✨";
    }
  }
}

$$(".puzzle-star").forEach((star, index) => {
  star.addEventListener("click", () => {
    const id = String(index);

    if (gameState.litStars.has(id)) return;

    gameState.litStars.add(id);
    star.classList.add("lit");
    star.textContent = "✦";

    updateConstellation();
  });
});


/* ----------------------------------------------------------
   11. BIRTHDAY GARDEN
---------------------------------------------------------- */

const treeStages = [
  "🌱",
  "🌿",
  "🪴",
  "🌳",
  "🌸",
  "🌳💗"
];

function updateTree() {
  const tree = $("#birthday-tree");
  const message = $("#garden-message");

  if (!tree) return;

  const stage = Math.min(
    gameState.treeLevel,
    treeStages.length - 1
  );

  tree.textContent = treeStages[stage];

  tree.classList.remove("growing");

  void tree.offsetWidth;

  tree.classList.add("growing");

  if (message) {
    const messages = [
      "Every beautiful thing starts with a little seed. 🌱",
      "A little care, a little patience. 🌿",
      "Look how much your little tree is growing! 🪴",
      "Strong roots, gentle heart. 🌳",
      "A garden full of wishes for you. 🌸",
      "May your life keep growing with love. 💗"
    ];

    message.textContent = messages[stage];
  }

  if (gameState.treeLevel >= 3) {
    collectStar(
      "garden",
      "Birthday Garden Star collected! 🌳"
    );
  }
}

const waterButton = $("#water-tree");
const wishButton = $("#wish-tree");

if (waterButton) {
  waterButton.addEventListener("click", () => {
    gameState.treeLevel = Math.min(
      gameState.treeLevel + 1,
      treeStages.length - 1
    );

    updateTree();
  });
}

if (wishButton) {
  wishButton.addEventListener("click", () => {
    showToast("A little wish, sent into the universe for Kallul. 💫");

    createSparkles();
  });
}


/* ----------------------------------------------------------
   12. CAKE STUDIO
---------------------------------------------------------- */

const cakeOptions = $$(".cake-options button");
const cakePreview = $("#cake-preview");
const cakeMessage = $("#cake-message");

cakeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    cakeOptions.forEach((button) => {
      button.classList.remove("selected");
    });

    option.classList.add("selected");

    if (cakePreview) {
      cakePreview.textContent =
        option.dataset.cake || option.textContent;
    }

    gameState.cakeChosen = true;

    if (cakeMessage) {
      cakeMessage.textContent =
        "A birthday cake chosen with love, just for you. 🎂";
    }

    collectStar(
      "cake",
      "Cake Studio Star collected! 🎂"
    );
  });
});


/* ----------------------------------------------------------
   13. BADMINTON MOON GAME
---------------------------------------------------------- */

const shuttleButton = $("#shuttle-button");
const scoreDisplay = $("#badminton-score");
const timerDisplay = $("#game-timer");
const badmintonStart = $("#start-badminton");

function updateBadmintonScore() {
  if (scoreDisplay) {
    scoreDisplay.textContent = gameState.badmintonScore;
  }
}

function stopBadmintonGame() {
  clearInterval(gameState.gameInterval);

  gameState.gameInterval = null;
  gameState.gameRunning = false;

  if (shuttleButton) {
    shuttleButton.disabled = true;
  }

  if (timerDisplay) {
    timerDisplay.textContent =
      `Time's up! Final score: ${gameState.badmintonScore}`;
  }

  if (gameState.badmintonScore >= 10) {
    collectStar(
      "badminton",
      "Badminton Moon Star collected! 🏸"
    );
  } else {
    showToast(
      "Nice try! Play again and see if you can reach 10. 🏸"
    );
  }

  if (badmintonStart) {
    badmintonStart.disabled = false;
    badmintonStart.textContent = "Play Again";
  }
}

function startBadmintonGame() {
  clearInterval(gameState.gameInterval);

  gameState.badmintonScore = 0;
  gameState.gameTime = 15;
  gameState.gameRunning = true;

  updateBadmintonScore();

  if (shuttleButton) {
    shuttleButton.disabled = false;
  }

  if (badmintonStart) {
    badmintonStart.disabled = true;
    badmintonStart.textContent = "Game in progress…";
  }

  if (timerDisplay) {
    timerDisplay.textContent = "15 seconds — let's play!";
  }

  gameState.gameInterval = setInterval(() => {
    gameState.gameTime--;

    if (timerDisplay) {
      timerDisplay.textContent =
        `${gameState.gameTime} seconds remaining`;
    }

    if (gameState.gameTime <= 0) {
      stopBadmintonGame();
    }
  }, 1000);
}

if (badmintonStart) {
  badmintonStart.addEventListener("click", startBadmintonGame);
}

if (shuttleButton) {
  shuttleButton.disabled = true;

  shuttleButton.addEventListener("click", () => {
    if (!gameState.gameRunning) return;

    gameState.badmintonScore++;

    updateBadmintonScore();

    shuttleButton.textContent =
      gameState.badmintonScore % 2 === 0 ? "🏸" : "🪶";

    if (gameState.badmintonScore >= 10) {
      stopBadmintonGame();
    }
  });
}


/* ----------------------------------------------------------
   14. SECRET DOOR QUIZ
---------------------------------------------------------- */

const quizOptions = $$(".quiz-options button");
const quizFeedback = $("#quiz-feedback");

quizOptions.forEach((option) => {
  option.addEventListener("click", () => {
    if (gameState.quizSolved) return;

    const isCorrect =
      option.dataset.correct === "true";

    if (isCorrect) {
      gameState.quizSolved = true;

      option.classList.add("correct");

      if (quizFeedback) {
        quizFeedback.textContent =
          option.dataset.success ||
          "The secret door opens. You found it! 💗";
      }

      quizOptions.forEach((button) => {
        button.disabled = true;
      });

      collectStar(
        "secret-door",
        "Secret Door Star collected! 🔑"
      );
    } else {
      option.classList.add("incorrect");

      if (quizFeedback) {
        quizFeedback.textContent =
          "Not quite! Try another answer. 🌙";
      }

      setTimeout(() => {
        option.classList.remove("incorrect");
      }, 700);
    }
  });
});


/* ----------------------------------------------------------
   15. SECRET LETTER
---------------------------------------------------------- */

const envelope = $("#envelope");
const letterPage = $("#letter-page");
const openLetterButton = $("#open-letter");

function openSecretLetter() {
  if (gameState.letterOpened) return;

  gameState.letterOpened = true;

  if (envelope) {
    envelope.classList.add("opened");
    envelope.setAttribute("aria-expanded", "true");
  }

  if (letterPage) {
    letterPage.hidden = false;

    letterPage.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  if (openLetterButton) {
    openLetterButton.textContent = "Your letter is open 💗";
    openLetterButton.disabled = true;
  }

  collectStar(
    "letter",
    "A letter written with love. One more little star! 💌"
  );

  createSparkles();
}

if (envelope) {
  envelope.addEventListener("click", openSecretLetter);
}

if (openLetterButton) {
  openLetterButton.addEventListener("click", openSecretLetter);
}


/* ----------------------------------------------------------
   16. GRAND FINALE
---------------------------------------------------------- */

function updateFinale() {
  const finale = $("#grand-finale");
  const finaleCount = $("#finale-star-count");
  const finaleMessage = $("#finale-message");

  if (finaleCount) {
    finaleCount.textContent = gameState.stars.size;
  }

  if (gameState.stars.size >= TOTAL_STARS) {
    if (finale) {
      finale.classList.remove("locked");
      finale.classList.add("unlocked");
    }

    if (finaleMessage) {
      finaleMessage.textContent =
        "You explored every little corner of this universe. " +
        "And at the centre of it all, there's one person " +
        "this whole universe was made for: you, Kallul. 💗";
    }

    const finaleButton = $("#finale-button");

    if (finaleButton) {
      finaleButton.hidden = false;
    }
  }
}

const finaleButton = $("#finale-button");

if (finaleButton) {
  finaleButton.addEventListener("click", () => {
    launchConfetti();

    showToast(
      "Happy 23rd birthday, my king! You are my sunshine. ☀️💗"
    );
  });
}


/* ----------------------------------------------------------
   17. CONFETTI CELEBRATION
---------------------------------------------------------- */

function launchConfetti() {
  const symbols = ["✦", "💗", "✨", "★", "🎉", "🌸"];

  for (let i = 0; i < 75; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti-piece";
    piece.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 1.8}s`;
    piece.style.animationDuration = `${2 + Math.random() * 2}s`;
    piece.style.fontSize = `${12 + Math.random() * 15}px`;

    document.body.appendChild(piece);

    setTimeout(() => piece.remove(), 5000);
  }
}


/* ----------------------------------------------------------
   18. SOUND BUTTON
   No sound is played unless you choose to enable it.
---------------------------------------------------------- */

const soundToggle = $("#sound-toggle");

if (soundToggle) {
  soundToggle.addEventListener("click", () => {
    gameState.soundEnabled = !gameState.soundEnabled;

    soundToggle.textContent =
      gameState.soundEnabled ? "🔊" : "🔇";

    soundToggle.setAttribute(
      "aria-pressed",
      String(gameState.soundEnabled)
    );

    showToast(
      gameState.soundEnabled
        ? "Sound setting enabled. No music file is connected yet. 🎵"
        : "Sound setting muted. 🌙"
    );
  });
}


/* ----------------------------------------------------------
   19. REVEAL SECTIONS WHEN SCROLLING
---------------------------------------------------------- */

function setupScrollReveal() {
  const sections = $$("main section");

  sections.forEach((section) => {
    section.classList.add("reveal");
  });

  if (!("IntersectionObserver" in window)) {
    sections.forEach((section) => {
      section.classList.add("visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

setupScrollReveal();


/* ----------------------------------------------------------
   20. INITIALISE THE WEBSITE
---------------------------------------------------------- */

function initialiseWebsite() {
  updateStarCounter();
  updateFireflyProgress();
  updateConstellation();
  updateTree();
  updateBadmintonScore();
  updateFinale();

  if (letterPage) {
    letterPage.hidden = true;
  }

  if (finaleButton) {
    finaleButton.hidden = true;
  }

  if (timerDisplay) {
    timerDisplay.textContent =
      "Tap Start Game when you're ready!";
  }
}

initialiseWebsite();


/* ----------------------------------------------------------
   21. RESIZE HANDLING
---------------------------------------------------------- */

let resizeTimeout;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);

  resizeTimeout = setTimeout(() => {
    createBackgroundStars();
  }, 250);
});


/* ----------------------------------------------------------
   22. CONSOLE GREETING
---------------------------------------------------------- */

console.log(
  "%c KALLUL-23 ✦ ",
  "color:#ff9ecf;font-size:20px;font-weight:bold;"
);

console.log(
  "%c A little universe, made with love. ☀️💗 ",
  "color:#b9ffe5;font-size:13px;"
);
