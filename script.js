function recordChoice(choice) {
  // Retrieve stored data or initialize
  const stats = JSON.parse(localStorage.getItem("tramwayStats")) || {
    détourner: 0,
    rien: 0,
  };

  // Update the choice count
  stats[choice] = (stats[choice] || 0) + 1;

  // Save the updated stats
  localStorage.setItem("tramwayStats", JSON.stringify(stats));

  // Display stats
  displayStats(stats);
}

function displayStats(stats) {
  const statsDiv = document.getElementById("stats");
  if (statsDiv) {
    statsDiv.innerHTML = `
            <h3>Statistiques des choix :</h3>
            <p>Détourner le tramway : ${stats.détourner} votes</p>
            <p>Ne rien faire : ${stats.rien} votes</p>
        `;
  }
}

// Display stats on load if stats exist
document.addEventListener("DOMContentLoaded", () => {
  const stats = JSON.parse(localStorage.getItem("tramwayStats"));
  if (stats) {
    displayStats(stats);
  }
});
