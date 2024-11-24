function recordChoice(choice) {
  // Statistiques locales
  const stats = JSON.parse(localStorage.getItem("tramwayStats")) || {
    détourner: 0,
    rien: 0,
    enfant: 0,
    adultes: 0,
    changer: 0,
  };
  stats[choice] = (stats[choice] || 0) + 1;
  localStorage.setItem("tramwayStats", JSON.stringify(stats));

  // Afficher les statistiques
  displayStats(stats);

  // Décision de l'IA en fonction du scénario
  displayAIDecision(choice);
}

function displayStats(stats) {
  const statsDiv = document.getElementById("stats");
  if (statsDiv) {
    statsDiv.innerHTML = `
            <h3>Statistiques des choix :</h3>
            <p>Détourner le tramway : ${stats.détourner || 0} votes</p>
            <p>Ne rien faire : ${stats.rien || 0} votes</p>
            <p>Sauver l'enfant : ${stats.enfant || 0} votes</p>
            <p>Sauver les adultes : ${stats.adultes || 0} votes</p>
            <p>Changer de voie : ${stats.changer || 0} votes</p>
        `;
  }
}

function displayAIDecision(userChoice) {
  const aiDecisionDiv = document.getElementById("ai-decision");
  if (!aiDecisionDiv) return;

  let aiChoice = "";
  let explanation = "";

  // Décision de l'IA pour le Scénario 1
  if (userChoice === "détourner" || userChoice === "rien") {
    aiChoice = "détourner";
    explanation =
      "L'IA a choisi de détourner le tramway pour sauver un maximum de vies (1 personne au lieu de 5).";
  }

  // Décision de l'IA pour le Scénario 2
  if (userChoice === "enfant" || userChoice === "adultes") {
    aiChoice = "adultes";
    explanation =
      "L'IA a choisi de sauver les adultes, car elle considère que leur expérience de vie et leurs contributions sociales sont plus importantes.";
  }

  // Décision de l'IA pour le Scénario 3
  if (userChoice === "changer" || userChoice === "rien") {
    aiChoice = "changer";
    explanation =
      "L'IA a choisi de changer de voie, pensant qu'il est plus sûr d'agir que de rester inactif dans l'incertitude.";
  }

  aiDecisionDiv.innerHTML = `
        <h3>Décision de l'IA :</h3>
        <p><strong>Choix de l'IA :</strong> ${aiChoice}</p>
        <p>${explanation}</p>
    `;
}

// Charger les stats au démarrage
document.addEventListener("DOMContentLoaded", () => {
  const stats = JSON.parse(localStorage.getItem("tramwayStats"));
  if (stats) displayStats(stats);
});
