document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  let playerScore = 0;
  let cpuScore = 0;

  function getChoice() {
    var selected = document.querySelector('input[name="choice"]:checked');
    if (!selected) {
      return null;
    }
    return selected.value;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function getComputerChoice() {
    const choices = ["Rock", "Paper", "Scissor"];
    return choices[getRandomInt(3)];
  }

  function updateScore(status) {
    if (status === "win") playerScore++;
    if (status === "lose") cpuScore++;

    document.getElementById("player-score").textContent = playerScore;
    document.getElementById("cpu-score").textContent = cpuScore;
  }

  function process(playerChoice, computer_choice) {
    var resultEl = document.getElementById("result");
    var compEl = document.querySelector("#computerChoice .value");
    var compReveal = document.getElementById("cpu-reveal");
    var resultSection = document.getElementById("result-section");
    var badge = document.getElementById("badge");
    var resultIcon = document.getElementById("result-icon");
    var resultIconBg = document.getElementById("result-icon-bg");

    if (compEl) compEl.textContent = computer_choice || "—";
    if (compReveal) compReveal.textContent = computer_choice || "—";

    // Update CPU Icon in sidebar
    const icons = {
      Rock: "diamond",
      Paper: "front_hand",
      Scissor: "content_cut",
    };
    const cpuIcon = document.querySelector("#computerChoice .value-icon");
    if (cpuIcon)
      cpuIcon.textContent = icons[computer_choice] || "question_mark";

    if (!playerChoice) {
      alert("Please select Rock, Paper, or Scissors first!");
      return;
    }

    resultSection.classList.remove("hidden");
    // Trigger re-animation
    resultSection.classList.remove("animate-pop-in");
    void resultSection.offsetWidth;
    resultSection.classList.add("animate-pop-in");

    if (playerChoice === computer_choice) {
      resultEl.textContent = "DRAW!";
      badge.className =
        "inline-flex items-center gap-2 px-4 py-1 rounded-full font-label font-bold text-xs uppercase tracking-widest bg-slate-200 text-slate-700";
      resultIcon.textContent = "balance";
      resultIcon.className =
        "material-symbols-outlined text-8xl text-slate-400";
      resultIconBg.className =
        "absolute inset-0 rounded-full bg-slate-100 animate-pulse";
      updateScore("draw");
    } else if (
      (playerChoice === "Rock" && computer_choice === "Scissor") ||
      (playerChoice === "Paper" && computer_choice === "Rock") ||
      (playerChoice === "Scissor" && computer_choice === "Paper")
    ) {
      resultEl.textContent = "YOU WIN!";
      badge.className =
        "inline-flex items-center gap-2 px-4 py-1 rounded-full font-label font-bold text-xs uppercase tracking-widest bg-tertiary-container text-on-tertiary-container";
      resultIcon.textContent = "celebration";
      resultIcon.className = "material-symbols-outlined text-8xl text-tertiary";
      resultIconBg.className =
        "absolute inset-0 rounded-full bg-tertiary/10 animate-pulse";
      updateScore("win");
    } else {
      resultEl.textContent = "YOU LOSE!";
      badge.className =
        "inline-flex items-center gap-2 px-4 py-1 rounded-full font-label font-bold text-xs uppercase tracking-widest bg-red-100 text-red-700";
      resultIcon.textContent = "heart_broken";
      resultIcon.className = "material-symbols-outlined text-8xl text-red-500";
      resultIconBg.className =
        "absolute inset-0 rounded-full bg-red-50 animate-pulse";
      updateScore("lose");
    }
  }

  var sub_button = document.getElementById("sub_button");
  if (sub_button) {
    sub_button.addEventListener(
      "click",
      function (ev) {
        ev.preventDefault();
        var player = getChoice();

        // Add shake animation to all cards
        document.querySelectorAll(".weapon-card").forEach((card) => {
          card.classList.add("animate-shake");
          setTimeout(() => card.classList.remove("animate-shake"), 500);
        });

        if (player) {
          var computer = getComputerChoice();
          // Small delay for the shake effect to feel impactful before result
          setTimeout(() => {
            process(player, computer);
          }, 300);
        } else {
          alert("Pick your weapon!");
        }
      },
      false,
    );
  }

  var reset = document.getElementById("reset_button");
  if (reset) {
    reset.addEventListener("click", function () {
      var radios = document.querySelectorAll('input[name="choice"]');
      radios.forEach(function (r) {
        r.checked = false;
      });
      document.querySelector("#computerChoice .value").textContent = "—";
      document.querySelector("#computerChoice .value-icon").textContent =
        "question_mark";
      document.getElementById("result-section").classList.add("hidden");
      playerScore = 0;
      cpuScore = 0;
      document.getElementById("player-score").textContent = "0";
      document.getElementById("cpu-score").textContent = "0";
    });
  }
});
