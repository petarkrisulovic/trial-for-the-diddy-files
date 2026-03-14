let currentTrial = 0;
let selectedPokemon = null;
let enemyHP = 100;
let playerHP = 100;
let inBattle = false;
let arceusPhase = 1;
let battleLog = [];

const trials = [
    { title: "Trial 1: Normal CAPTCHA", type: "captcha" },
    { title: "Trial 2: Math Equation", type: "math" },
    { title: "Trial 3: 10x10 Puzzle", type: "puzzle" },
    { title: "Trial 4: Atrocious Animal Sound", type: "animal" },
    { title: "Trial 5: Philosophical Question", type: "philosophy" },
    { title: "Trial 6: R34dle", type: "riddle" },
    { title: "Trial 7: The Great Debate", type: "debate" },
    { title: "Trial 8: Drag the Feet", type: "drag" },
    { title: "Trial 9: Pokémon Choice", type: "pokemon" },
    { title: "Trial 10: Battle Arceus", type: "battle" }
];

function startTrial() {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("captcha-container").classList.remove("hidden");
    showTrial(0);
}

function showTrial(index) {
    currentTrial = index;
    const trial = trials[index];
    document.getElementById("trial-title").textContent = trial.title;
    
    const content = document.getElementById("captcha-content");
    content.innerHTML = "";
    
    switch(trial.type) {
        case "captcha":
            showNormalCaptcha(content);
            break;
        case "math":
            showMathCaptcha(content);
            break;
        case "puzzle":
            showPuzzle(content);
            break;
        case "animal":
            showAnimalSound(content);
            break;
        case "philosophy":
            showPhilosophy(content);
            break;
        case "riddle":
            showRiddle(content);
            break;
        case "debate":
            showDebate(content);
            break;
        case "drag":
            showDrag(content);
            break;
        case "pokemon":
            showPokemonChoice(content);
            break;
        case "battle":
            showBattle(content);
            break;
    }
}

function showNormalCaptcha(container) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let captchaText = "";
    for (let i = 0; i < 6; i++) {
        captchaText += letters[Math.floor(Math.random() * letters.length)];
    }
    
    container.innerHTML = `
        <p>Verify you're human:</p>
        <div style="font-size: 2.5em; letter-spacing: 10px; transform: skew(-10deg) rotate(5deg); margin: 20px 0; color: #667eea;">
            ${captchaText}
        </div>
        <input type="text" id="captcha-input" placeholder="Enter the letters above" class="input-field">
    `;
}

function showMathCaptcha(container) {
    container.innerHTML = `
        <p>Solve this equation:</p>
        <div style="font-size: 1.8em; margin: 20px 0; color: #764ba2;">
            (-67x/y) = 67
        </div>
        <p style="font-size: 0.9em; color: #999;">Solve for x (assume y = 1)</p>
        <input type="text" id="math-input" placeholder="Answer: " class="input-field">
    `;
}

function showPuzzle(container) {
    let grid = `<div class="puzzle-grid">`;
    for (let i = 0; i < 100; i++) {
        grid += `<div class="puzzle-cell" onclick="toggleCell(this)">${i+1}</div>`;
    }
    grid += `</div><p style="color: #666;">Click 5 random cells to continue</p>`;
    container.innerHTML = grid;
}

function toggleCell(element) {
    element.classList.toggle("selected");
    const selected = document.querySelectorAll(".puzzle-cell.selected").length;
    if (selected === 5) {
        nextTrial();
    }
}

function showAnimalSound(container) {
    const animals = [
        { name: "Hyena", sound: "AHHHHHHH AHAHAHA AHHHHH 🦁", description: "What sound does a hyena make?" },
        { name: "Seal", sound: "ARK ARK ARK ARRRRK 🦭", description: "What sound does a seal make?" },
        { name: "Donkey", sound: "HEEEE HAWWWW HEEEEE HAWWWW 🫏", description: "What sound does a donkey make?" }
    ];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    
    container.innerHTML = `
        <p>${animal.description}</p>
        <div style="font-size: 2em; background: #ffe082; padding: 20px; border-radius: 10px; margin: 20px 0; animation: pulse 1s infinite;">
            ${animal.sound}
        </div>
        <input type="text" id="animal-input" placeholder="Your answer" class="input-field">
    `;
}

function showPhilosophy(container) {
    container.innerHTML = `
        <p style="font-size: 1.2em; margin: 20px 0;">
            <strong>"If the CAPTCHA saves the website, what is the website without the CAPTCHA?"</strong>
        </p>
        <textarea id="philosophy-input" class="input-field" style="height: 120px; resize: vertical;" placeholder="Your philosophical answer..."></textarea>
        <p style="font-size: 0.9em; color: #999;">Write anything to proceed (you're a human, after all)</p>
    `;
}

function showRiddle(container) {
    container.innerHTML = `
        <p><strong>R34DLE:</strong></p>
        <p style="margin: 20px 0; font-size: 1.1em;">
            "I have keys but no locks. I have space but no room. What am I?"
        </p>
        <div class="riddle-input">
            <input type="text" id="riddle-input" placeholder="Your answer">
            <button onclick="checkRiddle()">CHECK</button>
        </div>
    `;
}

function checkRiddle() {
    const answer = document.getElementById("riddle-input").value.toLowerCase();
    if (answer.includes("keyboard") || answer.includes("piano")) {
        nextTrial();
    } else {
        alert("Wrong! Try again!");
    }
}

function showDebate(container) {
    container.innerHTML = `
        <p style="font-size: 1.3em; margin: 20px 0;">
            <strong>Which is better?</strong>
        </p>
        <div class="debate-buttons">
            <button onclick="nextTrial()" style="background: linear-gradient(135deg, #e74c3c, #c0392b);">
                🐸 TOMBOYS 🐸
            </button>
            <button onclick="nextTrial()" style="background: linear-gradient(135deg, #e91e63, #c2185b);">
                👠 FEMBOYS 👠
            </button>
        </div>
        <p style="margin-top: 30px; color: #999; font-size: 0.9em;">
            (Both are culturally significant choices. Proceeding either way...)
        </p>
    `;
}

function showDrag(container) {
    container.innerHTML = `
        <p style="margin-bottom: 20px;">Drag the feet across the screen!</p>
        <div class="drag-area" id="drag-area">
            <div class="draggable-feet" id="draggable-feet">👣</div>
        </div>
        <p style="font-size: 0.9em; color: #999; margin-top: 20px;">Drag it across the entire width to continue</p>
    `;
    
    setupDragAndDrop();
}

function setupDragAndDrop() {
    const feet = document.getElementById("draggable-feet");
    const area = document.getElementById("drag-area");
    let isDragging = false;
    let dragDistance = 0;
    let startX = 0;

    feet.addEventListener("mousedown", () => {
        isDragging = true;
        startX = feet.offsetLeft;
    });

    area.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const rect = area.getBoundingClientRect();
        const x = e.clientX - rect.left;
        feet.style.left = Math.max(0, Math.min(x, rect.width - 50)) + "px";
        dragDistance = Math.abs(feet.offsetLeft - startX);
        
        if (dragDistance > area.offsetWidth - 60) {
            nextTrial();
            isDragging = false;
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
}

function showPokemonChoice(container) {
    container.innerHTML = `
        <p style="margin-bottom: 20px;">Choose your Pokémon for the final battle!</p>
        <div class="pokemon-choice">
            <button class="pokemon-btn" onclick="selectPokemon('Digglet')">
                🕳️<br>DIGGLET
            </button>
            <button class="pokemon-btn" onclick="selectPokemon('Charmander')">
                🔥<br>CHARMANDER
            </button>
            <button class="pokemon-btn" onclick="selectPokemon('Femboy')">
                💅<br>FEMBOY
            </button>
        </div>
        <p style="margin-top: 30px; color: #666;">Your choice: <strong id="pokemon-choice">None selected</strong></p>
    `;
}

function selectPokemon(name) {
    selectedPokemon = name;
    document.getElementById("pokemon-choice").textContent = name;
    document.querySelectorAll(".pokemon-btn").forEach(btn => btn.classList.remove("selected"));
    event.target.closest(".pokemon-btn").classList.add("selected");
}

function showBattle(container) {
    if (!selectedPokemon) {
        alert("Please select a Pokémon first!");
        showPokemonChoice(container);
        return;
    }

    inBattle = true;
    enemyHP = 100;
    playerHP = 100;
    arceusPhase = 1;
    battleLog = [];

    container.innerHTML = `
        <div class="battle-container">
            <div class="phase-indicator" id="phase-indicator">PHASE 1: ARCEUS ✨</div>
            <div class="enemy-info">
                <strong id="enemy-name">Arceus Lvl 100</strong>
                <div class="hp-bar">
                    <div class="hp-fill" id="enemy-hp-fill" style="width: 100%">
                        <span id="enemy-hp">100/100</span>
                    </div>
                </div>
            </div>
            <div class="battle-message" id="battle-message">What will ${selectedPokemon} do?</div>
            <div class="player-info">
                <strong>${selectedPokemon}</strong>
                <div class="hp-bar">
                    <div class="hp-fill" id="player-hp-fill" style="width: 100%">
                        <span id="player-hp">100/100</span>
                    </div>
                </div>
            </div>
            <div class="move-buttons">
                <button onclick="playerAttack('Normal Attack')">Normal Attack</button>
                <button onclick="playerAttack('Special Move')">Special Move</button>
                <button onclick="playerAttack('Ultimate')">ULTIMATE!</button>
                <button onclick="playerAttack('Surrender')">Surrender</button>
            </div>
        </div>
    `;
}

function playerAttack(move) {
    if (!inBattle) return;

    const damage = move === "Normal Attack" ? 15 : move === "Special Move" ? 30 : move === "Ultimate" ? 50 : 0;
    
    if (move === "Surrender") {
        document.getElementById("battle-message").textContent = "You fled like a coward!";
        setTimeout(() => showTrial(8), 1500);
        return;
    }

    enemyHP = Math.max(0, enemyHP - damage);
    updateBattleUI();

    if (enemyHP === 0 && arceusPhase === 1) {
        arceusPhase = 2;
        document.getElementById("battle-message").innerHTML = `
            <div class="transformation-text">
                ⚡ ARCEUS IS TRANSFORMING! ⚡<br>
                🍯 ARCEUS BECOMES DIDDY KONG! 🍯<br>
                <span style="color: #ff9800;">DOMAIN EXPANSION ACTIVATED: OILY ABYSS</span>
            </div>
        `;
        enemyHP = 80;
        setTimeout(() => {
            document.getElementById("phase-indicator").textContent = "PHASE 2: DIDDY KONG 🦍🍯";
            document.getElementById("enemy-name").textContent = "Diddy Kong (Baby Oil Form) - Phase 2";
            updateBattleUI();
        }, 2000);
        return;
    }

    if (enemyHP === 0 && arceusPhase === 2) {
        inBattle = false;
        document.getElementById("battle-message").textContent = "🎉 YOU DEFEATED DIDDY KONG! 🎉";
        setTimeout(() => {
            document.getElementById("captcha-container").classList.add("hidden");
            document.getElementById("victory-screen").classList.remove("hidden");
        }, 2000);
        return;
    }

    // Enemy attacks back
    setTimeout(() => {
        const enemyMoves = arceusPhase === 1 ? 
            ["Hyper Beam", "Judgement", "Sacred Fire"] :
            ["Baby Oil Splash", "Smooth Criminal", "Domain Expansion Strike"];
        const enemyMove = enemyMoves[Math.floor(Math.random() * enemyMoves.length)];
        const enemyDamage = arceusPhase === 1 ? Math.floor(Math.random() * 20) + 15 : Math.floor(Math.random() * 25) + 20;
        
        playerHP = Math.max(0, playerHP - enemyDamage);
        document.getElementById("battle-message").textContent = `${arceusPhase === 1 ? "Arceus" : "Diddy Kong"} uses ${enemyMove}! (${enemyDamage} damage)`;
        updateBattleUI();

        if (playerHP === 0) {
            inBattle = false;
            document.getElementById("battle-message").textContent = "💥 YOU WERE DEFEATED! 💥";
            setTimeout(() => {
                alert("Game Over! Your Pokémon fainted!");
                showTrial(8);
            }, 2000);
        }
    }, 1000);
}

function updateBattleUI() {
    const enemyHPPercent = (enemyHP / (arceusPhase === 1 ? 100 : 80)) * 100;
    const playerHPPercent = (playerHP / 100) * 100;
    
    document.getElementById("enemy-hp-fill").style.width = enemyHPPercent + "%";
    document.getElementById("enemy-hp").textContent = `${Math.max(0, enemyHP)}/${arceusPhase === 1 ? 100 : 80}`;
    
    document.getElementById("player-hp-fill").style.width = playerHPPercent + "%";
    document.getElementById("player-hp").textContent = `${Math.max(0, playerHP)}/100`;
}

function nextTrial() {
    if (currentTrial < trials.length - 1) {
        showTrial(currentTrial + 1);
    } else {
        document.getElementById("captcha-container").classList.add("hidden");
        document.getElementById("victory-screen").classList.remove("hidden");
    }
}
