/* =========================================
   KALLUL'S BIRTHDAY UNIVERSE
   PART 1: MUSIC, NAVIGATION & FOREST GAMES
   ========================================= */

(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  // =========================================
  // SEVEN LITTLE STARS
  // =========================================

  const collectedStars = new Set();

  window.awardStar = function (number) {
    if (collectedStars.has(number)) return;

    collectedStars.add(number);

    const total = collectedStars.size;

    const topCount = $("#star-count");
    const collectionCount = $("#collected-star-count");

    if (topCount) topCount.textContent = total;
    if (collectionCount) collectionCount.textContent = total;

    const star = $(`.collection-star[data-star="${number}"]`);

    if (star) {
      star.classList.add("collected");
      star.setAttribute("aria-label", `Star ${number} collected`);
    }

    const message = $("#collection-message");

    if (message) {
      message.textContent =
        total === 7
          ? "You found all seven little stars! Your letter is ready. ♡"
          : `You've collected ${total} of 7 little stars. Keep going! ✨`;
    }

    const unlockButton = $("#unlock-letter");

    if (total === 7 && unlockButton) {
      unlockButton.disabled = false;
      unlockButton.classList.add("unlocked");
    }
  };

  // =========================================
  // BACKGROUND MUSIC
  // =========================================

  const music = $("#background-music");
  const musicButton = $("#music-toggle");

  if (music && musicButton) {
    musicButton.addEventListener("click", async () => {
      if (music.paused) {
        try {
          await music.play();
          musicButton.textContent = "♫ Pause music";
          musicButton.setAttribute("aria-pressed", "true");
        } catch (error) {
          musicButton.textContent = "Music unavailable — try again";
        }
      } else {
        music.pause();
        musicButton.textContent = "♫ Play music";
        musicButton.setAttribute("aria-pressed", "false");
      }
    });

    music.addEventListener("ended", () => {
      musicButton.textContent = "♫ Play music";
      musicButton.setAttribute("aria-pressed", "false");
    });
  }

  // =========================================
  // NAVIGATION
  // =========================================

  const startButton = $("#start-journey");

  if (startButton) {
    startButton.addEventListener("click", () => {
      const destination = $("#our-story");

      if (destination) {
        destination.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  }

  const forestButton = $("#enter-forest");

  if (forestButton) {
    forestButton.addEventListener("click", () => {
      const destination = $("#firefly-game");

      if (destination) {
        destination.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    });
  }

  const backButton = $("#back-to-beginning");

  if (backButton) {
    backButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // =========================================
  // GAME 1: CATCH THE FIREFLIES
  // =========================================

  const fireflyButtons = $$(".catch-firefly");
  const fireflyCount = $("#firefly-count");
  const fireflyMessage = $("#firefly-message");

  let caughtFireflies = new Set();

  function updateFireflyGame() {
    const count = caughtFireflies.size;

    if (fireflyCount) {
      fireflyCount.textContent = count;
    }

    if (count === fireflyButtons.length && count > 0) {
      if (fireflyMessage) {
        fireflyMessage.textContent =
          "You caught every little firefly! A tiny star is yours. ✨";
      }

      window.awardStar(1);
    } else if (fireflyMessage) {
      fireflyMessage.textContent =
        `${count} of ${fireflyButtons.length} fireflies caught. Keep looking! ♡`;
    }
  }

  fireflyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const number = button.dataset.firefly;

      if (caughtFireflies.has(number)) return;

      caughtFireflies.add(number);

      button.classList.add("caught");
      button.disabled = true;
      button.setAttribute("aria-pressed", "true");

      updateFireflyGame();
    });
  });

  // =========================================
  // GAME 2: FIND THE HIDDEN MUSHROOMS
  // =========================================

  const mushroomButtons = $$(".hidden-mushroom");
  const mushroomCount = $("#mushroom-count");
  const mushroomMessage = $("#mushroom-message");

  let foundMushrooms = new Set();

  function updateMushroomGame() {
    const count = foundMushrooms.size;

    if (mushroomCount) {
      mushroomCount.textContent = count;
    }

    if (count === mushroomButtons.length && count > 0) {
      if (mushroomMessage) {
        mushroomMessage.textContent =
          "You found every hidden mushroom! Another little star is yours. 🍄";
      }

      window.awardStar(2);
    } else if (mushroomMessage) {
      mushroomMessage.textContent =
        `${count} of ${mushroomButtons.length} mushrooms found. Keep exploring! ♡`;
    }
  }

  mushroomButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const number = button.dataset.mushroom;

      if (foundMushrooms.has(number)) return;

      foundMushrooms.add(number);

      button.classList.add("found");
      button.disabled = true;
      button.setAttribute("aria-pressed", "true");

      updateMushroomGame();
    });
  });

  // =========================================
  // PART 1 COMPLETE
  // =========================================

  console.log("Part 1 loaded: music, navigation and forest games.");

})();
      /* =========================================
   PART 2: RELATIONSHIP QUIZ & BADMINTON
   ========================================= */

(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  // =========================================
  // GAME 3: OUR RELATIONSHIP QUIZ
  // =========================================

  const quizQuestions = [
    {
      question: "When did we officially become boyfriend and girlfriend?",
      options: [
        "12 November 2023",
        "12 November 2024",
        "12 November 2025"
      ],
      answer: 1,
      feedback: "Our story began on 12 November 2024. ♡"
    },
    {
      question: "Whose birthday are we celebrating?",
      options: [
        "My favourite person's birthday",
        "A random person's birthday",
        "Someone I barely know"
      ],
      answer: 0,
      feedback: "Of course! It's my king's special day. 👑"
    },
    {
      question: "What makes our little memories special?",
      options: [
        "Only expensive gifts",
        "The little moments we share",
        "Only perfect photographs"
      ],
      answer: 1,
      feedback: "It's the little moments with you that mean the most. 💗"
    },
    {
      question: "How long have we been together on our second anniversary?",
      options: [
        "One year",
        "Three years",
        "Two years"
      ],
      answer: 2,
      feedback: "Two beautiful years of us! 🥹"
    },
    {
      question: "What do I wish for our future?",
      options: [
        "To make more memories together",
        "To forget our story",
        "To stop making memories"
      ],
      answer: 0,
      feedback: "More memories, more laughter, and more years together. ♡"
    }
  ];

  const questionNumber = $("#quiz-question-number");
  const questionText = $("#quiz-question");
  const optionsContainer = $(".quiz-options");
  const feedback = $("#quiz-feedback");
  const nextButton = $("#next-question");
  const resultBox = $("#quiz-result");
  const resultMessage = $("#quiz-result-message");
  const restartButton = $("#restart-quiz");

  let currentQuestion = 0;
  let quizScore = 0;
  let answered = false;

  function renderQuestion() {
    const question = quizQuestions[currentQuestion];

    if (!questionText || !optionsContainer) return;

    answered = false;

    if (questionNumber) {
      questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
    }

    questionText.textContent = question.question;
    optionsContainer.replaceChildren();

    question.options.forEach((optionText, index) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "quiz-option";
      button.textContent = optionText;
      button.dataset.answer = index === question.answer
        ? "correct"
        : "wrong";

      button.addEventListener("click", () => {
        if (answered) return;

        answered = true;

        const correct = index === question.answer;

        if (correct) {
          quizScore++;
          button.classList.add("correct");
        } else {
          button.classList.add("wrong");

          const correctButton = optionsContainer.querySelector(
            `[data-answer="correct"]`
          );

          if (correctButton) {
            correctButton.classList.add("correct");
          }
        }

        optionsContainer.querySelectorAll("button").forEach((option) => {
          option.disabled = true;
        });

        if (feedback) {
          feedback.textContent = correct
            ? `Correct! ${question.feedback}`
            : `Not quite! ${question.feedback}`;
        }

        if (nextButton) {
          nextButton.hidden = false;
          nextButton.textContent =
            currentQuestion === quizQuestions.length - 1
              ? "See my result ♡"
              : "Next question →";
        }
      });

      optionsContainer.appendChild(button);
    });

    if (feedback) feedback.textContent = "";

    if (nextButton) nextButton.hidden = true;
  }

  if (questionText && optionsContainer) {
    renderQuestion();
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      if (!answered) return;

      if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        renderQuestion();
      } else {
        if (resultBox) resultBox.hidden = false;

        if (resultMessage) {
          resultMessage.textContent =
            `You scored ${quizScore} out of ${quizQuestions.length}! ` +
            "Every memory with you is special. Happy birthday, my king! 💗";
        }

        if (optionsContainer) optionsContainer.hidden = true;
        if (questionText) questionText.hidden = true;
        if (questionNumber) questionNumber.hidden = true;
        nextButton.hidden = true;

        if (typeof window.awardStar === "function") {
          window.awardStar(3);
        }
      }
    });
  }

  if (restartButton) {
    restartButton.addEventListener("click", () => {
      currentQuestion = 0;
      quizScore = 0;
      answered = false;

      if (resultBox) resultBox.hidden = true;
      if (optionsContainer) optionsContainer.hidden = false;
      if (questionText) questionText.hidden = false;
      if (questionNumber) questionNumber.hidden = false;

      renderQuestion();
    });
  }

  // =========================================
  // GAME 4: THE BADMINTON MOON
  // =========================================

  const badmintonSection = $("#badminton-game");

  if (badmintonSection) {
    const buttons = [...badmintonSection.querySelectorAll("button")];

    const startButton = buttons.find((button) =>
      /start|play|serve/i.test(button.textContent)
    );

    const resetButton = buttons.find((button) =>
      /reset|restart|again/i.test(button.textContent)
    );

    const scoreElements = [
      ...badmintonSection.querySelectorAll(
        "[id*='score'], [class*='score']"
      )
    ];

    const timerElements = [
      ...badmintonSection.querySelectorAll(
        "[id*='timer'], [class*='timer']"
      )
    ];

    const shuttle = badmintonSection.querySelector(
      "#shuttlecock, .shuttlecock, .shuttle, [data-shuttle]"
    );

    let score = 0;
    let seconds = 30;
    let timer = null;
    let playing = false;

    function updateDisplay() {
      scoreElements.forEach((element) => {
        element.textContent = score;
      });

      timerElements.forEach((element) => {
        element.textContent = `${seconds}s`;
      });
    }

    function finishGame() {
      playing = false;

      if (timer) {
        clearInterval(timer);
        timer = null;
      }

      const message = badmintonSection.querySelector(
        "#badminton-message, .badminton-message, [aria-live='polite']"
      );

      if (message) {
        message.textContent =
          `Time's up! You scored ${score} points! 🏸`;
      }

      if (score >= 5 && typeof window.awardStar === "function") {
        window.awardStar(4);
      }
    }

    function startGame() {
      if (playing) return;

      score = 0;
      seconds = 30;
      playing = true;

      updateDisplay();

      if (startButton) startButton.disabled = true;

      const message = badmintonSection.querySelector(
        "#badminton-message, .badminton-message, [aria-live='polite']"
      );

      if (message) {
        message.textContent = "The match has started! Tap the shuttlecock! 🏸";
      }

      timer = setInterval(() => {
        seconds--;
        updateDisplay();

        if (seconds <= 0) finishGame();
      }, 1000);
    }

    function hitShuttle() {
      if (!playing) return;

      score++;
      updateDisplay();

      if (shuttle) {
        shuttle.classList.remove("hit");
        void shuttle.offsetWidth;
        shuttle.classList.add("hit");
      }
    }

    if (startButton) {
      startButton.addEventListener("click", startGame);
    }

    if (shuttle) {
      shuttle.addEventListener("click", hitShuttle);
    }

    // Also support tapping a badminton play area if present.
    const playArea = badmintonSection.querySelector(
      "#badminton-play-area, .badminton-play-area, .badminton-court"
    );

    if (playArea) {
      playArea.addEventListener("click", (event) => {
        if (event.target.closest("button")) return;
        if (event.target.closest("a")) return;
        hitShuttle();
      });
    }

    if (resetButton) {
      resetButton.addEventListener("click", () => {
        if (timer) clearInterval(timer);

        timer = null;
        score = 0;
        seconds = 30;
        playing = false;

        updateDisplay();

        if (startButton) startButton.disabled = false;

        const message = badmintonSection.querySelector(
          "#badminton-message, .badminton-message, [aria-live='polite']"
        );

        if (message) {
          message.textContent = "Ready for another match? 🏸";
        }
      });
    }

    updateDisplay();
  }

  console.log("Part 2 loaded: relationship quiz and badminton.");

})();
    /* =========================================
   PART 3: BIRTHDAY CAKE STUDIO
   ========================================= */

(() => {
  "use strict";

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const section = $("#cake-studio");

  // Find the cake section using its heading if the ID differs.
  const cakeSection =
    section ||
    $$("section, article").find((element) =>
      /cake studio|decorate.*cake|birthday cake/i.test(
        element.querySelector("h1, h2, h3")?.textContent || ""
      )
    );

  if (!cakeSection) {
    console.warn("Cake studio not found. Check the cake section ID.");
    return;
  }

  // Locate the cake and its controls.
  const cake =
    $("#birthday-cake", cakeSection) ||
    $(".birthday-cake", cakeSection) ||
    $(".cake", cakeSection) ||
    $("[data-cake]", cakeSection);

  const frostingButtons = $$(
    "[data-frosting], .frosting-option, .frosting-button",
    cakeSection
  );

  const decorationButtons = $$(
    "[data-decoration], .decoration-option, .decoration-button",
    cakeSection
  );

  const messageInput =
    $("input[type='text']", cakeSection) ||
    $("textarea", cakeSection);

  const decorateButton = $$("button", cakeSection).find((button) =>
    /add decoration|decorate|add topping/i.test(button.textContent)
  );

  const undoButton = $$("button", cakeSection).find((button) =>
    /undo/i.test(button.textContent)
  );

  const resetButton = $$("button", cakeSection).find((button) =>
    /reset cake|clear cake|start over/i.test(button.textContent)
  );

  const presentButton = $$("button", cakeSection).find((button) =>
    /present cake|show cake|finish cake|present/i.test(button.textContent)
  );

  const messagePreview =
    $("[data-cake-message]", cakeSection) ||
    $(".cake-message", cakeSection);

  const presentation =
    $("#cake-presentation", cakeSection) ||
    $(".cake-presentation", cakeSection);

  let selectedFrosting = "#f8c9dc";
  let selectedDecoration = "🌸";
  let decorations = [];

  function updateFrosting(color) {
    selectedFrosting = color;

    if (cake) {
      cake.style.setProperty("--cake-frosting", color);
      cake.style.backgroundColor = color;
    }

    frostingButtons.forEach((button) => {
      const value =
        button.dataset.frosting ||
        button.dataset.color ||
        button.dataset.frostingColor;

      button.classList.toggle(
        "selected",
        value === color || button.style.backgroundColor === color
      );
    });
  }

  function getFrostingValue(button) {
    return (
      button.dataset.frosting ||
      button.dataset.color ||
      button.dataset.frostingColor ||
      button.style.backgroundColor ||
      "#f8c9dc"
    );
  }

  frostingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateFrosting(getFrostingValue(button));
    });
  });

  decorationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedDecoration =
        button.dataset.decoration ||
        button.dataset.emoji ||
        button.textContent.trim() ||
        "🌸";

      decorationButtons.forEach((item) => {
        item.classList.toggle("selected", item === button);
      });
    });
  });

  function renderDecorations() {
    if (!cake) return;

    // Remove only decorations created by this script.
    $$(".js-cake-decoration", cake).forEach((item) => item.remove());

    decorations.forEach((decoration) => {
      const item = document.createElement("span");

      item.className = "js-cake-decoration";
      item.textContent = decoration.emoji;
      item.style.position = "absolute";
      item.style.left = `${decoration.x}%`;
      item.style.top = `${decoration.y}%`;
      item.style.transform = "translate(-50%, -50%)";
      item.style.fontSize = "1.6rem";
      item.style.pointerEvents = "none";

      if (!cake.style.position) {
        cake.style.position = "relative";
      }

      cake.appendChild(item);
    });
  }

  function addDecoration() {
    if (!cake) {
      alert("I couldn't find the cake drawing. We'll fix its selector!");
      return;
    }

    const positions = [
      [30, 35],
      [50, 25],
      [70, 35],
      [25, 55],
      [50, 50],
      [75, 55],
      [35, 70],
      [65, 70]
    ];

    const position = positions[decorations.length % positions.length];

    decorations.push({
      emoji: selectedDecoration,
      x: position[0],
      y: position[1]
    });

    renderDecorations();
  }

  if (decorateButton) {
    decorateButton.addEventListener("click", addDecoration);
  }

  // If decoration buttons are the direct controls, let the user
  // tap the cake to place their selected decoration.
  if (cake) {
    cake.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;

      const bounds = cake.getBoundingClientRect();

      if (!bounds.width || !bounds.height) return;

      decorations.push({
        emoji: selectedDecoration,
        x: Math.max(
          5,
          Math.min(95, ((event.clientX - bounds.left) / bounds.width) * 100)
        ),
        y: Math.max(
          5,
          Math.min(95, ((event.clientY - bounds.top) / bounds.height) * 100)
        )
      });

      renderDecorations();
    });
  }

  if (messageInput) {
    messageInput.addEventListener("input", () => {
      if (messagePreview) {
        messagePreview.textContent =
          messageInput.value || "Happy Birthday, Kallul! ♡";
      }
    });
  }

  if (undoButton) {
    undoButton.addEventListener("click", () => {
      decorations.pop();
      renderDecorations();
    });
  }

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      decorations = [];
      renderDecorations();

      if (messageInput) messageInput.value = "";

      if (messagePreview) {
        messagePreview.textContent = "Happy Birthday, Kallul! ♡";
      }

      updateFrosting("#f8c9dc");
    });
  }

  if (presentButton) {
    presentButton.addEventListener("click", () => {
      const message = messageInput?.value.trim();

      if (messagePreview) {
        messagePreview.textContent =
          message || "Happy Birthday, Kallul! ♡";
      }

      if (presentation) {
        presentation.hidden = false;
        presentation.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }

      if (typeof window.awardStar === "function") {
        window.awardStar(5);
      }
    });
  }

  // Set the initial cake colour.
  updateFrosting(selectedFrosting);

  console.log("Part 3 loaded: birthday cake studio.");
})();
    /* =========================================
   PART 4: TREE, CONSTELLATION & STAR COLLECTION
   ========================================= */

(() => {
  "use strict";

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  // =========================================
  // GAME 5: GROW OUR LITTLE TREE
  // =========================================

  const treeSection = $("#tree-garden");
  const tree = $("#birthday-tree");
  const waterButton = $("#water-tree");
  const stardustButton = $("#feed-tree");
  const flowerButton = $("#flower-tree");

  let treeWatered = false;
  let treeFed = false;
  let flowerPlanted = false;

  function updateTree() {
    if (tree) {
      tree.classList.toggle("watered", treeWatered);
      tree.classList.toggle("fed", treeFed);
      tree.classList.toggle("flowering", flowerPlanted);

      if (treeWatered) {
        tree.dataset.watered = "true";
      }

      if (treeFed) {
        tree.dataset.fed = "true";
      }

      if (flowerPlanted) {
        tree.dataset.flowering = "true";
      }
    }

    const message = treeSection?.querySelector(
      "#tree-message, .tree-message, [aria-live='polite']"
    );

    if (message) {
      if (treeWatered && treeFed && flowerPlanted) {
        message.textContent =
          "Our little tree is blooming! May our love keep growing. 🌸";

        if (typeof window.awardStar === "function") {
          window.awardStar(6);
        }
      } else {
        const actions = [];

        if (treeWatered) actions.push("watered");
        if (treeFed) actions.push("given stardust");
        if (flowerPlanted) actions.push("planted a flower");

        message.textContent = actions.length
          ? `You've ${actions.join(", ")} our little tree. Keep caring for it! 🌱`
          : "Let's help our little tree grow! 🌱";
      }
    }
  }

  if (waterButton) {
    waterButton.addEventListener("click", () => {
      treeWatered = true;
      updateTree();
    });
  }

  if (stardustButton) {
    stardustButton.addEventListener("click", () => {
      treeFed = true;
      updateTree();
    });
  }

  if (flowerButton) {
    flowerButton.addEventListener("click", () => {
      flowerPlanted = true;
      updateTree();
    });
  }

  // =========================================
  // GAME 6: CONNECT OUR CONSTELLATION
  // =========================================

  const constellationSection = $("#constellation-game");

  if (constellationSection) {
    const starButtons = $$(
      "[data-constellation-point]",
      constellationSection
    );

    const constellationMessage = $("#constellation-message");

    const resetConstellation = $("#reset-constellation");

    const expectedOrder = starButtons
      .map((button) => Number(button.dataset.constellationPoint))
      .sort((a, b) => a - b);

    let connectedStars = [];

    function updateConstellation() {
      starButtons.forEach((button) => {
        const number = Number(button.dataset.constellationPoint);

        button.classList.toggle(
          "connected",
          connectedStars.includes(number)
        );

        button.setAttribute(
          "aria-pressed",
          connectedStars.includes(number) ? "true" : "false"
        );
      });

      const lines = $$(".constellation-line", constellationSection);

      lines.forEach((line, index) => {
        line.classList.toggle(
          "connected",
          index < Math.max(0, connectedStars.length - 1)
        );
      });

      if (connectedStars.length === expectedOrder.length &&
          expectedOrder.length > 0) {
        if (constellationMessage) {
          constellationMessage.textContent =
            "Our stars are connected, just like our story. ✨";
        }

        if (typeof window.awardStar === "function") {
          window.awardStar(7);
        }
      } else if (constellationMessage) {
        constellationMessage.textContent =
          `Connect the stars in order: ${connectedStars.length} of ${expectedOrder.length} connected. ⭐`;
      }
    }

    starButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const number = Number(button.dataset.constellationPoint);

        if (connectedStars.includes(number)) return;

        const expectedNumber = expectedOrder[connectedStars.length];

        if (number !== expectedNumber) {
          if (constellationMessage) {
            constellationMessage.textContent =
              "Not quite! Follow the numbers and try again. ✨";
          }

          return;
        }

        connectedStars.push(number);
        updateConstellation();
      });
    });

    if (resetConstellation) {
      resetConstellation.addEventListener("click", () => {
        connectedStars = [];

        updateConstellation();

        if (constellationMessage) {
          constellationMessage.textContent =
            "Let's connect our stars again! ⭐";
        }
      });
    }

    updateConstellation();
  }

  // =========================================
  // STAR COLLECTION DISPLAY
  // =========================================

  const collectionSection = $("#star-collection");

  if (collectionSection) {
    const stars = $$(".collection-star", collectionSection);

    stars.forEach((star) => {
      const number = Number(star.dataset.star);

      if (!number) return;

      star.addEventListener("click", () => {
        if (typeof window.awardStar === "function") {
          window.awardStar(number);
        }
      });
    });
  }

  console.log("Part 4 loaded: tree, constellation and stars.");
})();
    /* =========================================
   PART 5: SECRET LETTER & GRAND FINALE
   ========================================= */

(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);

  // =========================================
  // SECRET BIRTHDAY LETTER
  // =========================================

  const letterSection = $("#birthday-letter");
  const openLetterButton = $("#open-letter");
  const letterPaper = $("#letter-paper");
  const unlockLetterButton = $("#unlock-letter");

  function openLetter() {
    if (!letterPaper) return;

    letterPaper.hidden = false;
    letterPaper.classList.add("letter-open");

    letterPaper.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    if (openLetterButton) {
      openLetterButton.textContent = "Your letter is open 💌";
      openLetterButton.setAttribute("aria-expanded", "true");
    }
  }

  function closeLetter() {
    if (!letterPaper) return;

    letterPaper.hidden = true;
    letterPaper.classList.remove("letter-open");

    if (openLetterButton) {
      openLetterButton.textContent = "Open your secret letter 💌";
      openLetterButton.setAttribute("aria-expanded", "false");
    }
  }

  if (openLetterButton) {
    openLetterButton.addEventListener("click", () => {
      if (letterPaper && !letterPaper.hidden) {
        closeLetter();
      } else {
        openLetter();
      }
    });
  }

  if (unlockLetterButton) {
    unlockLetterButton.addEventListener("click", () => {
      if (unlockLetterButton.disabled) return;

      if (letterSection) {
        letterSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

      openLetter();
    });
  }

  // Keep the secret letter closed until the visitor opens it.
  if (letterPaper && !letterPaper.classList.contains("letter-open")) {
    letterPaper.hidden = true;
  }

  // =========================================
  // GRAND FINALE
  // =========================================

  const finale = $("#grand-finale");

  if (finale) {
    const finaleButton = finale.querySelector("button");

    if (finaleButton) {
      finaleButton.addEventListener("click", () => {
        finale.classList.toggle("finale-celebrating");

        const message = finale.querySelector(
          "#finale-message, .finale-message"
        );

        if (message) {
          message.textContent =
            "Happy 23rd birthday, my king! Here's to many more beautiful years together. ☀️💕";
        }

        // Add a gentle, temporary star celebration.
        for (let i = 0; i < 18; i++) {
          const star = document.createElement("span");

          star.textContent = ["✦", "✧", "♡", "✨"][i % 4];
          star.className = "finale-floating-star";

          star.style.left = `${Math.random() * 100}%`;
          star.style.animationDelay = `${Math.random() * 2}s`;

          finale.appendChild(star);

          window.setTimeout(() => star.remove(), 4000);
        }
      });
    }
  }

  // =========================================
  // FRIENDLY SCROLL REVEALS
  // =========================================

  const sections = document.querySelectorAll(".content-section");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      { threshold: 0.08 }
    );

    sections.forEach((section) => observer.observe(section));
  } else {
    sections.forEach((section) => {
      section.classList.add("section-visible");
    });
  }

  console.log("Part 5 loaded: secret letter and grand finale.");
})();
