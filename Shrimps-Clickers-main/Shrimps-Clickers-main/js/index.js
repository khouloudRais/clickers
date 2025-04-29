let shrimp = document.getElementById("shrimp");
let shrimpAmount = document.querySelector(".shrimp-cost");
let parsedShrimpAmount = parseFloat(shrimpAmount.innerHTML);

let spcText = document.getElementById("spc-text");
let spsText = document.getElementById("sps-text");

let shrimpImgContainer = document.querySelector(".shrimp-img-container");

let upgradesButton = document.querySelectorAll(".upgrade");

let specialItemButton = document.querySelector(".buy-btn");
let specialItemCost = document.querySelector(".price-value");
let specialItemShrimp = parseFloat(document.querySelector(".instant-shrimp").innerHTML);
let parseSpecialItemCost = parseFloat(document.querySelector(".price-value").innerHTML);

let shrimpPerClick = 1;
let shrimpPerSecond = 0;
let factories = 0;

let frenzySeconds = 0;
let frenzyActive = false;
let shrimpRainInterval = null;

function playSound(soundName) {
    try {
        const sound = new Audio(`assets/audio/${soundName}.mp3`);
        sound.volume = 0.3;
        sound.play();
    } catch (e) {
        console.log("Sound error:", e);
    }
}

function showToast(message) {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerText = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 2000);
}

setInterval(() => {
    if (frenzySeconds > 0) {
        frenzySeconds--;

        if (!frenzyActive) {
            shrimpPerSecond *= 7;
            shrimpPerClick = Number((shrimpPerClick * 7).toFixed(2));
            frenzyActive = true;
            startShrimpRain();
        }

        document.getElementById("frenzyDisplay").innerText = `FRENZY: ${frenzySeconds}s`;
        document.getElementById("frenzyDisplay").style.display = "block";
    } else {
        if (frenzyActive) {
            shrimpPerSecond /= 7
            shrimpPerClick = Number((shrimpPerClick / 7).toFixed(2));
            frenzyActive = false;
            stopShrimpRain();
        }
        document.getElementById("frenzyDisplay").style.display = "none";
    }
}, 1000);

function goldenShrimp() {
    const goldenShrimp = document.getElementById("goldenShrimp");
    const x = Math.random() * (window.innerWidth - 200);//(taille écran - 200px)
    const y = Math.random() * (window.innerHeight - 200);//(taille écran - 200px)
    goldenShrimp.style.left = `${x}px`;
    goldenShrimp.style.top = `${y}px`;
    goldenShrimp.style.display = "block";

    setTimeout(() => {
        goldenShrimp.style.display = "none";
    }, 10000); 
}

// 50% de chance qu'il apparaisse toutes les 2 minutes
setInterval(() => {
    if (Math.random() < 0.5) {
        goldenShrimp();
    }
}, 120000);

document.getElementById("goldenShrimp").addEventListener("click", () => {
    playSound("bonus");
    frenzySeconds += 30;
    document.getElementById("goldenShrimp").style.display = "none";
    showToast("✨ FRENZY! 7x BOOST for 30 seconds!");
});

function startShrimpRain() {
    shrimpRainInterval = setInterval(() => {
        rainShrimp(5);
    }, 100); // Tous les 100ms pluie dense
}

function stopShrimpRain() {
    clearInterval(shrimpRainInterval);
    shrimpRainInterval = null;
}

function rainShrimp(count = 10) {
    for (let i = 0; i < count; i++) {
        const shrimp = document.createElement("img");
        shrimp.src = "assets/images/shrimp_tempura.png";
        shrimp.classList.add("shrimp-rain");
        shrimp.alt = "Falling shrimp";

        // Position horizontale aléatoire
        shrimp.style.left = Math.random() * 100 + "vw";
        shrimp.style.top = "-50px";

        document.getElementById("shrimpRainContainer").appendChild(shrimp);
    }
}

shrimp.addEventListener('click', function(event) {
    shrimp.classList.add('vibrate'); 
    setTimeout(() => {
        shrimp.classList.remove('vibrate');
    }, 100);
    increaseShrimp(event);
});

function increaseShrimp(event){
    playSound("clicker");
    shrimpAmount.innerHTML = Math.round(parsedShrimpAmount += shrimpPerClick);

    const x = event.clientX;
    const y = event.clientY;

    const div = document.createElement("div");
    div.innerHTML = `+${shrimpPerClick}`;
    div.style.cssText = `position: absolute; left: ${x}px; top: ${y}px; color: white; font-size: 20px; pointer-events: none;`;
    shrimpImgContainer.appendChild(div);
    div.classList.add("fade-up");
    timeout(div);
}

const timeout = (div) => {
    setTimeout(() => {
        div.remove();
    }, 1000);
}

const upgrades = [
    { 
        name: "clicker", 
        cost: document.querySelector(".clicker-cost"), 
        parsedCost: parseFloat(document.querySelector(".clicker-cost").innerHTML),
        increase: document.querySelector(".clicker-increase"),
        parsedIncrease: parseFloat(document.querySelector(".clicker-increase").innerHTML),
        level: document.querySelector(".clicker-level"),
        shrimpMultiplier: 1.03,
        costMultiplier: 1.112,
    },
    {
        name: "fisherman",
        cost: document.querySelector(".fisherman-cost"), 
        parsedCost: parseFloat(document.querySelector(".fisherman-cost").innerHTML),
        increase: document.querySelector(".fisherman-increase"),
        parsedIncrease: parseFloat(document.querySelector(".fisherman-increase").innerHTML),
        level: document.querySelector(".fisherman-level"),
        shrimpMultiplier: 1.035,
        costMultiplier: 1.12,
    },
    {
        name: "fishingboat",
        cost: document.querySelector(".fishingboat-cost"), 
        parsedCost: parseFloat(document.querySelector(".fishingboat-cost").innerHTML),
        increase: document.querySelector(".fishingboat-increase"),
        parsedIncrease: parseFloat(document.querySelector(".fishingboat-increase").innerHTML),
        level: document.querySelector(".fishingboat-level"),
        shrimpMultiplier: 1.04,
        costMultiplier: 1.15,
    },
    {
        name: "restaurant",
        cost: document.querySelector(".restaurant-cost"),
        parsedCost: parseFloat(document.querySelector(".restaurant-cost").innerHTML),
        increase: document.querySelector(".restaurant-increase"),
        parsedIncrease: parseFloat(document.querySelector(".restaurant-increase").innerHTML),
        level: document.querySelector(".restaurant-level"),
        shrimpMultiplier: 1.1,
        costMultiplier: 1.15,
    },
    {
        name: "factory",
        cost: document.querySelector(".factory-cost"),
        parsedCost: parseFloat(document.querySelector(".factory-cost").innerHTML),
        increase: document.querySelector(".factory-increase"),
        parsedIncrease: parseFloat(document.querySelector(".factory-increase").innerHTML),
        level: document.querySelector(".factory-level"),
        shrimpMultiplier: 1.1,
        costMultiplier: 1.15,
    }
]

function updateUpgradeAvailability() {
    upgradesButton.forEach((button, index) => {
        const upgradeEl = upgrades[index];
        if (parsedShrimpAmount >= upgradeEl.parsedCost) {
            button.style.backgroundColor = "#29a0c9";
            button.style.opacity = "1";
        } else {
            button.style.backgroundColor = "gray";
            button.style.opacity = "0.75";
        }
    });
}

setInterval(updateUpgradeAvailability, 400); 

function buyUpgrade(upgrade){
    const upgradeElement = upgrades.find((u) => {
    if (u.name === upgrade) return u;
    });

    if (parsedShrimpAmount >= upgradeElement.parsedCost) {
        playSound("upgrade");
        
        // Déduction du coût
        shrimpAmount.innerHTML = Math.round(parsedShrimpAmount -= upgradeElement.parsedCost);

        // Augmentation du niveau
        upgradeElement.level.innerHTML ++;

        // Augmentation du coût et de l'augmentation
        upgradeElement.parsedIncrease = parseFloat((upgradeElement.parsedIncrease * upgradeElement.shrimpMultiplier).toFixed(2));
        upgradeElement.increase.innerHTML = upgradeElement.parsedIncrease;

        // Augmentation du coût
        upgradeElement.parsedCost *= upgradeElement.costMultiplier;
        upgradeElement.cost.innerHTML = Math.round(upgradeElement.parsedCost);

        // Augmentation de la production de crevettes
        if (upgradeElement.name === "clicker") {
            shrimpPerClick += upgradeElement.parsedIncrease;
            shrimpPerClick = Number(shrimpPerClick.toFixed(2));
        } else {
            shrimpPerSecond += upgradeElement.parsedIncrease;
        }   
    }
    else {
        showToast("Not enough shrimp!");
    }
}

specialItemButton.addEventListener("click", buySpecialItem);

function buySpecialItem() {
    if (parsedShrimpAmount >= parseSpecialItemCost) {
        playSound("upgrade");
        parsedShrimpAmount -= parseSpecialItemCost;
        parsedShrimpAmount += specialItemShrimp;
        shrimpAmount.innerHTML = Math.round(parsedShrimpAmount);
        specialItemButton.textContent = "Bought";
        specialItemButton.style.backgroundColor = "gray";
        specialItemButton.style.opacity = "0.75";
        specialItemButton.disabled = true;
    } else {
        showToast("Not enough shrimp!");
    }
} 

function save(){
    localStorage.clear();

    upgrades.map((upgrade) => {
        const obj = JSON.stringify({
            parsedCost: upgrade.parsedCost,
            parsedIncrease: upgrade.parsedIncrease,
            parsedLevel: parseFloat(upgrade.level.innerHTML)
        });
        localStorage.setItem(upgrade.name, obj);
    });
    localStorage.setItem("shrimpPerClick", JSON.stringify(shrimpPerClick));
    localStorage.setItem("shrimpPerSecond", JSON.stringify(shrimpPerSecond));
    localStorage.setItem("shrimpAmount", JSON.stringify(parsedShrimpAmount));
}

//setInterval(save, 1000);

function load(){
    upgrades.map((upgrade) => {
        const savedValues= JSON.parse(localStorage.getItem(upgrade.name));
        if (savedValues) {
            upgrade.parsedCost = savedValues.parsedCost;
            upgrade.parsedIncrease = savedValues.parsedIncrease;
            upgrade.level.innerHTML = savedValues.parsedLevel;
            upgrade.cost.innerHTML = Math.round(upgrade.parsedCost);
            upgrade.increase.innerHTML = Math.round(upgrade.parsedIncrease);
        }
    console.log(upgrade.name, savedValues);
    });
    shrimpPerClick = JSON.parse(localStorage.getItem("shrimpPerClick")) || 1;
    shrimpPerSecond = JSON.parse(localStorage.getItem("shrimpPerSecond")) || 0;
    parsedShrimpAmount = JSON.parse(localStorage.getItem("shrimpAmount")) || 0; 
    shrimpAmount.innerHTML = Math.round(parsedShrimpAmount);
}

window.onload = load;

document.getElementById("resetButton").addEventListener("click", reset);

function reset() {
    if (confirm("Tu es sûr de vouloir réinitialiser ? Tu vas perdre toutes tes crevettes !")) {
        localStorage.clear();
        location.reload();
    }
}

setInterval(() => {
    parsedShrimpAmount += shrimpPerSecond / 10;
    shrimpAmount.innerHTML = Math.round(parsedShrimpAmount);
    spcText.innerHTML = Math.round(shrimpPerClick);
    spsText.innerHTML = Math.round(shrimpPerSecond);
}, 100);