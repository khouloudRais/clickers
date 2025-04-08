// Récupérer les éléments du DOM
const scoreElement = document.getElementById("score");
const crevetteImg = document.getElementById("crevette-img");
const crevettesFallingContainer = document.getElementById("crevettesFalling");
const resetButton = document.getElementById("resetButton");

// Définir des variables pour le score et le nombre de clics
let score = parseInt(localStorage.getItem("score")) || 0; // Récupère le score du localStorage s'il existe
let clicks = 0; // Nombre de clics

// Mettre à jour l'affichage du score
function updateScore() {
    scoreElement.textContent = `Score : ${score}`;
    localStorage.setItem("score", score); // Sauvegarder le score dans le localStorage
}

// Fonction pour faire tomber une crevette
function spawnFallingCrevette() {
    const fallingCrevette = document.createElement("img");
    fallingCrevette.src = "assets/crevette.png"; // Image de la crevette tombante
    fallingCrevette.alt = "Crevette Tombante";
    fallingCrevette.classList.add("falling-crevette");
    
    // Positionner la crevette au hasard sur l'écran
    const randomX = Math.random() * window.innerWidth; // Position aléatoire en X
    fallingCrevette.style.left = `${randomX}px`;
    
    // Ajouter l'élément à la scène
    crevettesFallingContainer.appendChild(fallingCrevette);

    // Supprimer la crevette après l'animation de chute
    setTimeout(() => {
        fallingCrevette.remove();
    }, 2000); // La crevette disparaît après 2 secondes
}

// Fonction pour faire tomber un sac de dollars
function spawnFallingDollar() {
    const fallingDollar = document.createElement("img");
    fallingDollar.src = "assets/dollar-bag.png"; // Image du sac de dollars
    fallingDollar.alt = "Sac de Dollars Tombant";
    fallingDollar.classList.add("falling-dollar");
    
    // Positionner le sac de dollars au hasard sur l'écran
    const randomX = Math.random() * window.innerWidth; // Position aléatoire en X
    fallingDollar.style.left = `${randomX}px`;
    
    // Ajouter l'élément à la scène
    crevettesFallingContainer.appendChild(fallingDollar);

    // Supprimer le sac de dollars après l'animation de chute
    setTimeout(() => {
        fallingDollar.remove();
    }, 2000); // Le sac disparaît après 2 secondes
}

// Afficher le "+1" flottant
function showFloatingPlus() {
    const plusElement = document.createElement("div");
    plusElement.id = "floating-plus";
    plusElement.textContent = "+1";
    document.body.appendChild(plusElement);

    // Supprimer après l'animation
    setTimeout(() => {
        plusElement.remove();
    }, 2000);
}

// Gestion du clic sur la crevette centrale
crevetteImg.addEventListener("click", () => {
    clicks += 1; // Incrémenter le nombre de clics
    score += 1;  // Augmenter le score par clic
    updateScore();

    // Afficher "+1" flottant
    showFloatingPlus();

    // Faire tomber des crevettes et des sacs de dollars après chaque clic
    for (let i = 0; i < 5; i++) {  // Générer 5 crevettes à chaque clic
        spawnFallingCrevette();
    }
    for (let i = 0; i < 3; i++) {  // Générer 3 sacs de dollars à chaque clic
        spawnFallingDollar();
    }
});

// Réinitialiser le jeu
resetButton.addEventListener("click", () => {
    score = 0;
    clicks = 0;
    updateScore();
    crevettesFallingContainer.innerHTML = ""; // Supprimer toutes les crevettes tombantes
});
