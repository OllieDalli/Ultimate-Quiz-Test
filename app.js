// ============================================================
// WIGAN QUIZZERS
// app.js
// ============================================================

const POINTS = {
    // Standard quiz scoring is now doubled.
    // Winner Takes All uses its own separate scoring system.
    easy: 2,
    medium: 4,
    hard: 6
};

let game = null;
let players = [];

let myPlayerId = null;
let isHost = false;

let selectedQuestion = null;
let currentRoundType = "classic";
let songRoundFinished = false;
let songDeadlineHandled = false;
let speedRoundFinished = false;
let speedDeadlineHandled = false;
let speedAnswerWatcher = null;
let speedRevealTimeout = null;
let speedPreStartTimeout = null;
let speedEndTimeout = null;
let localSpeedSelection = null;
let localSongSelection = null;

// Monotonic local timing anchors. These use performance.now() so a player
// answer is measured from the moment their shared 10-second window starts,
// rather than relying on potentially different computer clocks.
let speedLocalStartPerf = null;
let songLocalStartPerf = null;
let songAnswerWatcher = null;
let songRevealTimeout = null;
let songPreStartTimeout = null;
let songFinishInProgress = false;
let speedFinishInProgress = false;

// Winner Takes All state
let wtaTimerInterval = null;
let wtaRevealTimeout = null;
let wtaQuestionLoading = false;
let wtaCurrentRowId = null;
let wtaCurrentQuestionNumber = 0;
let wtaRoundInitialized = false;
let wtaRoundFinished = false;
let wtaLeaderboardState = {};

// Important answer protection
let answerSubmitted = false;
let renderedQuestionId = null;
let loadingSongQuestionId = null;
let movingToNextPlayer = false;
let sharedRoundSyncInterval = null;
let sharedRoundSyncKey = null;

let timerInterval = null;
let nextPlayerTimeout = null;
let gambleTimerInterval = null;
let gambleReadyWatchInterval = null;
let answerFeedbackKey = null;
let answerFeedbackTimeout = null;

// Leaderboard animation state. Each round keeps the previous completed
// leaderboard as the baseline so movement arrows and score animations
// can be shown consistently on every player's device.
let leaderboardPreviousState = null;
let leaderboardAnimatedRound = null;
let leaderboardAnimationTimer = null;

// ============================================================
// ANSWER FEEDBACK STYLES
// ============================================================

(function addAnswerFeedbackStyles() {
    if (document.getElementById("answer-feedback-styles")) return;

    const style = document.createElement("style");
    style.id = "answer-feedback-styles";
    style.textContent = `
        .answer-button.answer-selected-amber {
            background: #f59e0b !important;
            border-color: #f59e0b !important;
            color: #111827 !important;
            animation: answerAmberFlash 0.25s ease-in-out 2;
        }

        .answer-button.answer-correct {
            background: #22c55e !important;
            border-color: #22c55e !important;
            color: #ffffff !important;
            animation: answerGreenFlash 0.45s ease-in-out 2;
        }

        .answer-button.answer-wrong {
            background: #ef4444 !important;
            border-color: #ef4444 !important;
            color: #ffffff !important;
            animation: answerRedFlash 0.45s ease-in-out 2;
        }

        @keyframes answerAmberFlash {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.65; }
        }

        @keyframes answerGreenFlash {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.65; }
        }

        @keyframes answerRedFlash {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.65; }
        }

    `;

    document.head.appendChild(style);
})();

(function addGambleScreenStyles() {
    if (document.getElementById("gamble-screen-styles")) return;

    const style = document.createElement("style");
    style.id = "gamble-screen-styles";
    style.textContent = `
        #gamble-phase {
            max-width: 620px;
            margin: 0 auto;
        }

        #gamble-phase .slot-machine {
            margin: 22px auto;
            padding: 24px;
            border-radius: 22px;
            background: rgba(255,255,255,0.055);
            border: 1px solid rgba(255,255,255,0.10);
            box-shadow: 0 18px 45px rgba(0,0,0,0.18);
        }

        #gamble-phase .slot-reels {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
        }

        #gamble-phase .slot-reels > div {
            min-height: 92px;
            display: grid;
            place-items: center;
            font-size: 3.1rem;
            border-radius: 16px;
            background: rgba(0,0,0,0.25);
            border: 1px solid rgba(255,255,255,0.10);
        }

        #gamble-phase .slot-result {
            margin-top: 16px;
            min-height: 24px;
            font-weight: 700;
            text-align: center;
        }

        #gamble-phase .gamble-buttons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-top: 18px;
        }

        #gamble-phase .gamble-buttons button {
            min-height: 52px;
            font-weight: 800;
        }

        #gamble-phase .gamble-stake {
            margin: 18px 0 4px;
            text-align: center;
        }

        #gamble-phase .gamble-stake label {
            display: block;
            margin-bottom: 8px;
            font-weight: 800;
        }

        #gamble-phase #gamble-stake {
            width: 120px;
            padding: 10px 12px;
            text-align: center;
            font-size: 1.1rem;
            font-weight: 800;
            border-radius: 10px;
        }

        #gamble-phase #multiplier-info {
            margin-top: 8px;
            font-weight: 700;
            opacity: 0.9;
        }

        #gamble-phase #keep-button.ready-complete {
            opacity: 0.75;
        }

        #gamble-ready-status {
            margin-top: 18px;
            display: grid;
            gap: 8px;
        }

        .gamble-ready-player {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 10px 14px;
            border-radius: 12px;
            background: rgba(255,255,255,0.045);
            border: 1px solid rgba(255,255,255,0.07);
        }

        .gamble-ready-badge {
            font-size: 0.75rem;
            font-weight: 800;
            opacity: 0.65;
        }

        .gamble-ready-badge.is-ready {
            color: #22c55e;
            opacity: 1;
        }

        @media (max-width: 600px) {
            #gamble-phase .gamble-buttons {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
})();


(function addLeaderboardAnimationStyles() {
    if (document.getElementById("leaderboard-animation-styles")) return;

    const style = document.createElement("style");
    style.id = "leaderboard-animation-styles";
    style.textContent = `
        #leaderboard-phase #leaderboard {
            position: relative;
        }

        #leaderboard-phase #leaderboard .leaderboard-row {
            position: relative;
            will-change: transform, opacity;
            transition:
                transform 900ms cubic-bezier(.2,.8,.2,1),
                box-shadow 300ms ease,
                background-color 300ms ease;
            overflow: visible;
        }

        #leaderboard-phase #leaderboard .leaderboard-row.leaderboard-moving {
            z-index: 2;
        }

        #leaderboard-phase #leaderboard .leaderboard-row.leaderboard-new-position {
            box-shadow: 0 14px 34px rgba(181,18,27,.10);
        }

        #leaderboard-phase #leaderboard .leaderboard-points-wrap {
            display: inline-flex;
            align-items: center;
            justify-content: flex-end;
            gap: 9px;
            min-width: 86px;
        }

        #leaderboard-phase #leaderboard .leaderboard-points {
            min-width: 42px;
            text-align: right;
            font-variant-numeric: tabular-nums;
        }

        #leaderboard-phase #leaderboard .leaderboard-score-change {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 34px;
            font-size: .86rem;
            line-height: 1;
            font-weight: 1000;
            font-variant-numeric: tabular-nums;
            opacity: 0;
            transform: translateY(8px) scale(.72);
            pointer-events: none;
            white-space: nowrap;
            animation: leaderboardScoreChange .95s cubic-bezier(.2,.75,.25,1) forwards;
        }

        #leaderboard-phase #leaderboard .leaderboard-score-change.positive {
            color: #22c55e !important;
            text-shadow: 0 0 12px rgba(34,197,94,.38);
        }

        #leaderboard-phase #leaderboard .leaderboard-score-change.negative {
            color: #ef4444 !important;
            text-shadow: 0 0 12px rgba(239,68,68,.38);
        }

        @keyframes leaderboardScoreChange {
            0% {
                opacity: 0;
                transform: translateY(8px) scale(.72);
            }
            18% {
                opacity: 1;
                transform: translateY(-1px) scale(1.08);
            }
            65% {
                opacity: 1;
                transform: translateY(-5px) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-22px) scale(.96);
            }
        }

        #leaderboard-phase #leaderboard .leaderboard-movement {
            width: 20px;
            min-width: 20px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            line-height: 1;
            font-weight: 950;
            opacity: 0;
            transform: translateY(3px) scale(.75);
            transition: opacity 250ms ease, transform 350ms cubic-bezier(.2,.8,.2,1);
        }

        #leaderboard-phase #leaderboard .leaderboard-movement.is-visible {
            opacity: 1;
            transform: translateY(0) scale(1);
        }

        #leaderboard-phase #leaderboard .leaderboard-movement.up {
            color: #22c55e !important;
        }

        #leaderboard-phase #leaderboard .leaderboard-movement.down {
            color: #ef4444 !important;
        }

        #leaderboard-phase #leaderboard .leaderboard-points.points-counting {
            animation: leaderboardPointsPulse 700ms ease;
        }

        @keyframes leaderboardPointsPulse {
            0% { transform: scale(1); }
            45% { transform: scale(1.12); }
            100% { transform: scale(1); }
        }

        /* Keep the leaderboard animation reliable in both themes. */
        body.dark-mode #leaderboard-phase #leaderboard .leaderboard-row {
            background: #151515;
            color: #ffffff;
        }

        body.dark-mode #leaderboard-phase #leaderboard .leaderboard-position,
        body.dark-mode #leaderboard-phase #leaderboard .leaderboard-name,
        body.dark-mode #leaderboard-phase #leaderboard .leaderboard-points {
            color: #ffffff;
        }

        body.dark-mode #leaderboard-phase #leaderboard .leaderboard-movement.up {
            color: #22c55e !important;
        }

        body.dark-mode #leaderboard-phase #leaderboard .leaderboard-movement.down {
            color: #ef4444 !important;
        }

        body.dark-mode #leaderboard-phase #leaderboard .leaderboard-score-change.positive {
            color: #22c55e !important;
        }

        body.dark-mode #leaderboard-phase #leaderboard .leaderboard-score-change.negative {
            color: #ef4444 !important;
        }

        /* Do not let an OS/browser reduced-motion rule silently remove the
           quiz's round-result animation. */
        #leaderboard-phase #leaderboard .leaderboard-row {
            transition: transform 900ms cubic-bezier(.2,.8,.2,1),
                        box-shadow 300ms ease,
                        background-color 300ms ease !important;
        }

        #leaderboard-phase #leaderboard .leaderboard-movement {
            transition: opacity 250ms ease,
                        transform 350ms cubic-bezier(.2,.8,.2,1) !important;
        }

        #leaderboard-phase #leaderboard .leaderboard-points.points-counting {
            animation: leaderboardPointsPulse 700ms ease !important;
        }
    `;
    document.head.appendChild(style);
})();

let gambleTransitioning = false;

let gameChannel = null;
let playersChannel = null;
let answersChannel = null;
let wtaChannel = null;


// ============================================================
// START
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
    setupHomeButtons();
    setupForms();
    setupGameButtons();
    setupSongPlayButton();
    setupGlobalVolumeControl();
    setupLobbyCopyButton();
    tryReconnect();
});


// ============================================================
// GLOBAL VOLUME CONTROL
// ============================================================

function applyGlobalVolume() {
    const slider = document.getElementById("volume-slider");
    if (!slider) return;
    const volume = Math.max(0, Math.min(1, Number(slider.value) / 100));
    document.querySelectorAll("audio").forEach(audio => {
        audio.volume = volume;
    });
}

function updateVolumeDisplay() {
    const slider = document.getElementById("volume-slider");
    const value = document.getElementById("volume-value");
    const icon = document.getElementById("volume-icon");
    if (!slider) return;
    const percent = Number(slider.value);
    if (value) value.textContent = `${percent}%`;
    if (icon) icon.textContent = percent === 0 ? "🔇" : percent < 50 ? "🔉" : "🔊";
}

function setupGlobalVolumeControl() {
    const slider = document.getElementById("volume-slider");
    if (!slider || slider.dataset.bound === "true") return;

    const savedVolume = localStorage.getItem("ultimateQuizVolume");
    if (savedVolume !== null && !Number.isNaN(Number(savedVolume))) {
        slider.value = String(Math.max(0, Math.min(100, Number(savedVolume))));
    }

    const apply = () => {
        localStorage.setItem("ultimateQuizVolume", slider.value);
        updateVolumeDisplay();
        applyGlobalVolume();
    };

    slider.addEventListener("input", apply);
    slider.addEventListener("change", apply);
    slider.dataset.bound = "true";
    updateVolumeDisplay();
    applyGlobalVolume();
}



// ============================================================
// COPY GAME CODE
// ============================================================

function setupLobbyCopyButton() {
    const button = document.getElementById("lobby-copy-button");
    const check = document.getElementById("lobby-copy-check");

    if (!button || button.dataset.bound === "true") return;

    button.dataset.bound = "true";

    button.addEventListener("click", async () => {
        const code = game?.code || document.getElementById("lobby-code")?.textContent?.trim();
        if (!code || code === "-----") return;

        let copied = false;

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(code);
                copied = true;
            }
        } catch (error) {
            console.warn("Clipboard API unavailable:", error);
        }

        // Fallback for browsers/contexts where Clipboard API is unavailable.
        if (!copied) {
            try {
                const textarea = document.createElement("textarea");
                textarea.value = code;
                textarea.setAttribute("readonly", "");
                textarea.style.position = "fixed";
                textarea.style.opacity = "0";
                document.body.appendChild(textarea);
                textarea.select();
                copied = document.execCommand("copy");
                textarea.remove();
            } catch (error) {
                console.warn("Could not copy game code:", error);
            }
        }

        if (!copied) return;

        button.classList.add("copied");
        button.textContent = "COPIED";
        if (check) check.classList.add("show");

        clearTimeout(button._copyResetTimer);
        button._copyResetTimer = setTimeout(() => {
            button.classList.remove("copied");
            button.textContent = "COPY";
            if (check) check.classList.remove("show");
        }, 1600);
    });
}


// ============================================================
// HOME BUTTONS
// ============================================================

function setupHomeButtons() {

    const showCreate = document.getElementById("show-create");
    const showJoin = document.getElementById("show-join");

    const backCreate = document.getElementById("back-create");
    const backJoin = document.getElementById("back-join");


    if (showCreate) {
        showCreate.addEventListener("click", () => {
            showScreen("create-screen");
        });
    }


    if (showJoin) {
        showJoin.addEventListener("click", () => {
            showScreen("join-screen");
        });
    }


    if (backCreate) {
        backCreate.addEventListener("click", () => {
            showScreen("home-screen");
        });
    }


    if (backJoin) {
        backJoin.addEventListener("click", () => {
            showScreen("home-screen");
        });
    }
}


// ============================================================
// FORMS
// ============================================================

function setupForms() {

    const createForm = document.getElementById("create-form");
    const joinForm = document.getElementById("join-form");


    if (createForm) {
        createForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            await createGame();
        });
    }


    if (joinForm) {
        joinForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            await joinGame();
        });
    }
}


// ============================================================
// GAME BUTTONS
// ============================================================

function setupGameButtons() {

    // Start game
    const startButton =
        document.getElementById("start-game-button");

    if (startButton) {
        startButton.addEventListener("click", async () => {
            await startGame();
        });
    }

    // Host-only lobby customization. Non-host players never see the control.
    const customizeButton = document.getElementById("customize-game-button");
    if (customizeButton && customizeButton.dataset.bound !== "true") {
        customizeButton.dataset.bound = "true";
        customizeButton.addEventListener("click", () => {
            if (!isHost || game?.phase !== "lobby") return;

            const panel = document.getElementById("customize-game-panel");
            const expanded = customizeButton.getAttribute("aria-expanded") === "true";
            customizeButton.setAttribute("aria-expanded", String(!expanded));
            panel?.classList.toggle("hidden", expanded);
        });
    }

    document.querySelectorAll(".round-count-option").forEach(button => {
        if (button.dataset.bound === "true") return;
        button.dataset.bound = "true";
        button.addEventListener("click", async () => {
            if (!isHost || game?.phase !== "lobby") return;
            const rounds = Number(button.dataset.rounds);
            await setLobbyRoundCount(rounds);
        });
    });


    // Host lobby Home button — disbands the lobby and returns to Home.
    const lobbyHomeButton =
        document.getElementById("lobby-home-button");

    if (lobbyHomeButton && lobbyHomeButton.dataset.bound !== "true") {
        lobbyHomeButton.dataset.bound = "true";
        lobbyHomeButton.addEventListener("click", async () => {
            await leaveLobbyToHome();
        });
    }


    // Final results Home button — leaves the completed game and returns Home.
    const finalHomeButton =
        document.getElementById("final-home-button");

    if (finalHomeButton && finalHomeButton.dataset.bound !== "true") {
        finalHomeButton.dataset.bound = "true";
        finalHomeButton.addEventListener("click", async () => {
            await leaveGameToHome();
        });
    }


    // Difficulty buttons
    document
        .querySelectorAll(".difficulty")
        .forEach(button => {

            button.addEventListener("click", async () => {

                const difficulty =
                    button.dataset.difficulty;

                await chooseDifficulty(difficulty);
            });
        });


    // Gamble
    const gambleButton =
        document.getElementById("gamble-button");

    if (gambleButton) {
        gambleButton.addEventListener("click", async () => {
            await gamblePoints();
        });
    }

    const gambleStake = document.getElementById("gamble-stake");
    if (gambleStake) {
        gambleStake.addEventListener("input", () => {
            updateGambleMultiplierPreview();
        });
    }


    // Ready up
    const keepButton =
        document.getElementById("keep-button");

    if (keepButton) {
        keepButton.textContent = "✓ Ready Up";
        keepButton.addEventListener("click", async () => {
            await readyUp();
        });
    }




    // Continue from leaderboard
    const continueButton =
        document.getElementById("continue-button");

    if (continueButton && continueButton.dataset.bound !== "true") {
        continueButton.dataset.bound = "true";
        continueButton.addEventListener("click", async () => {
            await continueFromLeaderboard();
        });
    }


    // Play again
    const newRoundButton =
        document.getElementById("new-round-button");

    if (newRoundButton) {
        newRoundButton.addEventListener("click", async () => {

            if (!isHost) return;

            await startNextRound();
        });
    }
}


// ============================================================
// RETURN TO HOME / DISBAND
// ============================================================

function clearGameSession() {
    clearTimers();
    clearGambleTimer();

    if (gameChannel) {
        supabaseClient.removeChannel(gameChannel);
        gameChannel = null;
    }

    if (playersChannel) {
        supabaseClient.removeChannel(playersChannel);
        playersChannel = null;
    }

    if (wtaChannel) {
        supabaseClient.removeChannel(wtaChannel);
        wtaChannel = null;
    }

    sessionStorage.removeItem("wigan_quizzers_game_id");
    sessionStorage.removeItem("wigan_quizzers_player_id");

    game = null;
    players = [];
    myPlayerId = null;
    isHost = false;
    selectedQuestion = null;
    answerSubmitted = false;
    renderedQuestionId = null;
    movingToNextPlayer = false;
}

async function leaveLobbyToHome() {
    if (!isHost || !game || game.phase !== "lobby") return;

    const gameId = game.id;

    // Mark the lobby as disbanded first so every connected player is
    // immediately told that the host has closed the lobby.
    const { error } = await supabaseClient
        .from("games")
        .update({
            phase: "disbanded",
            current_player_id: null,
            current_difficulty: null,
            current_question_id: null,
            current_answer: null,
            question_started_at: null
        })
        .eq("id", gameId)
        .eq("host_id", myPlayerId)
        .eq("phase", "lobby");

    if (error) {
        console.error("Could not disband lobby:", error);
        alert("Could not close the lobby. Please try again.");
        return;
    }

    clearGameSession();
    showScreen("home-screen");
}

async function leaveGameToHome() {
    clearGameSession();
    showScreen("home-screen");
}


// ============================================================
// SCREEN CONTROL
// ============================================================

function showScreen(screenId) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {
            screen.classList.remove("active");
        });


    const screen =
        document.getElementById(screenId);


    if (screen) {
        screen.classList.add("active");
    }
}


// ============================================================
// CREATE GAME
// ============================================================

async function createGame() {

    const nameInput =
        document.getElementById("host-name");

    if (!nameInput) return;

    const name =
        nameInput.value.trim();


    if (!name) {
        alert("Please enter your name.");
        return;
    }


    const gameId =
        crypto.randomUUID();

    const playerId =
        crypto.randomUUID();

    const code =
        generateGameCode();


    const { data: newGame, error: gameError } =
        await supabaseClient
            .from("games")
            .insert({
                id: gameId,
                code: code,
                host_id: playerId,
                phase: "lobby",
                round: 1,
                current_player_id: null,
                current_difficulty: null,
                current_question_id: null,
                current_answer: null,
                question_started_at: null,
                current_round_type: "classic",
                round_type_order: createRandomRoundTypeOrder(10),
                bonus_round: Math.floor(Math.random() * 10) + 1,
                bonus_used: false,
                bonus_checked_round: null,
                wta_awarded: false
            })
            .select()
            .single();


    if (gameError) {

        console.error(
            "Could not create game:",
            gameError
        );

        alert(
            "Could not create the game. Check your Supabase settings."
        );

        return;
    }


    const { error: playerError } =
        await supabaseClient
            .from("players")
            .insert({
                id: playerId,
                game_id: gameId,
                name: name,
                points: 0,
                rounds_picked: [],
                has_gambled: false,
                gamble_result: null,
                gamble_payout: 0
            });


    if (playerError) {

        console.error(
            "Could not create player:",
            playerError
        );

        alert("Could not create your player.");

        return;
    }


    game = newGame;
    myPlayerId = playerId;
    isHost = true;


    sessionStorage.setItem(
        "wigan_quizzers_game_id",
        gameId
    );

    sessionStorage.setItem(
        "wigan_quizzers_player_id",
        playerId
    );


    await loadPlayers();

    setupRealtime();

    updateLobby();

    showScreen("lobby-screen");
}


// ============================================================
// JOIN GAME
// ============================================================

async function joinGame() {

    const codeInput =
        document.getElementById("join-code");

    const nameInput =
        document.getElementById("player-name");


    if (!codeInput || !nameInput) return;


    const code =
        codeInput.value
            .trim()
            .toUpperCase();

    const name =
        nameInput.value.trim();


    if (!code) {
        alert("Please enter the game code.");
        return;
    }


    if (!name) {
        alert("Please enter your name.");
        return;
    }


    const { data: foundGame, error } =
        await supabaseClient
            .from("games")
            .select("*")
            .eq("code", code)
            .single();


    if (error || !foundGame) {

        console.error(
            "Game lookup failed:",
            error
        );

        alert("Game not found.");

        return;
    }


    if (foundGame.phase !== "lobby") {

        alert(
            "This game has already started."
        );

        return;
    }


    const playerId =
        crypto.randomUUID();


    const { error: playerError } =
        await supabaseClient
            .from("players")
            .insert({
                id: playerId,
                game_id: foundGame.id,
                name: name,
                points: 0,
                rounds_picked: [],
                has_gambled: false,
                gamble_result: null,
                gamble_payout: 0
            });


    if (playerError) {

        console.error(
            "Could not join game:",
            playerError
        );

        alert(
            "Could not join the game."
        );

        return;
    }


    game = foundGame;
    myPlayerId = playerId;
    isHost = false;


    sessionStorage.setItem(
        "wigan_quizzers_game_id",
        game.id
    );

    sessionStorage.setItem(
        "wigan_quizzers_player_id",
        playerId
    );


    await loadPlayers();

    setupRealtime();

    updateLobby();

    showScreen("lobby-screen");
}


// ============================================================
// RECONNECT
// ============================================================

async function tryReconnect() {

    const gameId =
        sessionStorage.getItem(
            "wigan_quizzers_game_id"
        );

    const playerId =
        sessionStorage.getItem(
            "wigan_quizzers_player_id"
        );


    if (!gameId || !playerId) {
        showScreen("home-screen");
        return;
    }


    const { data: savedGame, error } =
        await supabaseClient
            .from("games")
            .select("*")
            .eq("id", gameId)
            .single();


    if (error || !savedGame) {

        sessionStorage.removeItem(
            "wigan_quizzers_game_id"
        );

        sessionStorage.removeItem(
            "wigan_quizzers_player_id"
        );

        showScreen("home-screen");

        return;
    }


    game = savedGame;
    myPlayerId = playerId;
    isHost = game.host_id === playerId;


    await loadPlayers();

    const me =
        players.find(
            player => player.id === myPlayerId
        );


    if (!me) {

        sessionStorage.removeItem(
            "wigan_quizzers_game_id"
        );

        sessionStorage.removeItem(
            "wigan_quizzers_player_id"
        );

        showScreen("home-screen");

        return;
    }


    setupRealtime();

    updateLobby();

    updateGameState();
}


// ============================================================
// GAME CODE
// ============================================================

function generateGameCode() {

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "";


    for (let i = 0; i < 5; i++) {

        code +=
            characters[
                Math.floor(
                    Math.random() *
                    characters.length
                )
            ];
    }


    return code;
}


// ============================================================
// LOAD PLAYERS
// ============================================================

async function loadPlayers() {

    if (!game) return;


    const { data, error } =
        await supabaseClient
            .from("players")
            .select("*")
            .eq("game_id", game.id)
            .order("joined_at", {
                ascending: true
            });


    if (error) {

        console.error(
            "Could not load players:",
            error
        );

        return;
    }


    players = data || [];


    renderPlayers();
    renderLeaderboard();
    renderFinalLeaderboard();
    updateCurrentPlayer();
}


// ============================================================
// REALTIME
// ============================================================

function setupRealtime() {

    if (!game) return;


    if (gameChannel) {
        supabaseClient.removeChannel(
            gameChannel
        );
    }


    if (playersChannel) {
        supabaseClient.removeChannel(
            playersChannel
        );
    }

    if (answersChannel) {
        supabaseClient.removeChannel(answersChannel);
        answersChannel = null;
    }

    if (wtaChannel) {
        supabaseClient.removeChannel(
            wtaChannel
        );
        wtaChannel = null;
    }


    gameChannel =
        supabaseClient
            .channel(
                `game-${game.id}`
            )
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "games",
                    filter: `id=eq.${game.id}`
                },
                payload => {

                    if (!payload.new) return;

                    game = payload.new;

                    updateGameState();
                }
            )
            .subscribe();


    playersChannel =
        supabaseClient
            .channel(
                `players-${game.id}`
            )
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "players",
                    filter: `game_id=eq.${game.id}`
                },
                async () => {

                    await loadPlayers();

                    updateGameState();
                }
            )
            .subscribe();

    // Shared-round answer channel. This is the fast path for Speed/Music:
    // when an answer is inserted, the host immediately re-checks whether
    // everyone has answered instead of waiting for the polling interval.
    if (answersChannel) {
        supabaseClient.removeChannel(answersChannel);
        answersChannel = null;
    }

    answersChannel = supabaseClient
        .channel(`answers-${game.id}`)
        .on(
            "postgres_changes",
            {
                event: "INSERT",
                schema: "public",
                table: "answers",
                filter: `game_id=eq.${game.id}`
            },
            payload => {
                if (!payload.new || !game) return;
                if (game.phase !== "question") return;
                if (!['speed', 'song'].includes(game.current_round_type)) return;

                if (game.current_round_type === "speed") {
                    finishSpeedRoundIfNeeded();
                } else {
                    finishSongRoundIfNeeded();
                }
            }
        )
        .subscribe();

    // WTA answers are individual rows, so every insert/update can refresh
    // the live mini leaderboard on every player's screen.
    wtaChannel =
        supabaseClient
            .channel(`wta-${game.id}`)
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "wta_answers",
                    filter: `game_id=eq.${game.id}`
                },
                () => {
                    if (game?.phase === "wta-question") {
                        renderWtaLeaderboard();
                    }
                }
            )
            .subscribe();



}


// ============================================================
// SHARED ANSWER FEEDBACK
// ============================================================

function showSharedAnswerFeedback() {
    if (!game || game.phase !== "question") return;
    if (!selectedQuestion) return;
    if (!game.current_answer) return;

    const answer = String(game.current_answer);
    const key = `${game.id}:${game.round}:${game.current_question_id}:${answer}`;

    if (answerFeedbackKey === key) return;
    answerFeedbackKey = key;

    if (answerFeedbackTimeout) {
        clearTimeout(answerFeedbackTimeout);
        answerFeedbackTimeout = null;
    }

    const buttons = document.querySelectorAll(".answer-button");
    buttons.forEach(button => {
        button.classList.remove(
            "answer-selected-amber",
            "answer-correct",
            "answer-wrong"
        );
    });

    let selectedButton = null;
    buttons.forEach(button => {
        if (button.dataset.answer === answer) {
            selectedButton = button;
            button.classList.add("answer-selected-amber");
        }
    });

    const correct = answer === selectedQuestion.correct;

    answerFeedbackTimeout = setTimeout(() => {
        buttons.forEach(button => {
            button.classList.remove("answer-selected-amber");
        });

        if (selectedButton) {
            selectedButton.classList.add(
                correct ? "answer-correct" : "answer-wrong"
            );
        }

        if (!correct) {
            buttons.forEach(button => {
                if (button.dataset.answer === selectedQuestion.correct) {
                    button.classList.add("answer-correct");
                }
            });
        }
    }, 1000);
}


// ============================================================
// LOBBY
// ============================================================

function getTotalRounds() {
    const configured = Array.isArray(game?.round_type_order)
        ? game.round_type_order
        : [];
    const total = configured.length;

    return [8, 10, 12, 14, 16].includes(total) ? total : 10;
}

function updateLobby() {
    const code = document.getElementById("lobby-code");
    if (code && game) code.textContent = game.code;

    const startButton = document.getElementById("start-game-button");
    const homeButton = document.getElementById("lobby-home-button");
    const hostControls = document.getElementById("lobby-host-controls");
    const customizeButton = document.getElementById("customize-game-button");
    const customizePanel = document.getElementById("customize-game-panel");
    const summary = document.getElementById("customize-round-summary");
    const saveMessage = document.getElementById("customize-save-message");

    const hostInLobby = Boolean(isHost && game?.phase === "lobby");
    const totalRounds = getTotalRounds();

    if (startButton) {
        startButton.classList.toggle("hidden", !hostInLobby);
        startButton.textContent = `Start Round 1`;
    }

    if (homeButton) {
        homeButton.classList.toggle("hidden", !hostInLobby);
    }

    if (hostControls) {
        hostControls.classList.toggle("hidden", !hostInLobby);
    }

    if (summary) summary.textContent = `${totalRounds} ROUNDS`;

    document.querySelectorAll(".round-count-option").forEach(button => {
        const selected = Number(button.dataset.rounds) === totalRounds;
        button.classList.toggle("selected", selected);
        button.setAttribute("aria-checked", String(selected));
    });

    if (!hostInLobby && customizeButton) {
        customizeButton.setAttribute("aria-expanded", "false");
        customizePanel?.classList.add("hidden");
    }

    const playerCount = document.getElementById("player-count");
    if (playerCount) playerCount.textContent = players.length;

    if (saveMessage && hostInLobby && !saveMessage.dataset.persistent) {
        saveMessage.textContent = "";
    }
}

async function setLobbyRoundCount(rounds) {
    if (!isHost || !game || game.phase !== "lobby") return;
    // Round counts are intentionally restricted to even values from 8–16.
    if (!Number.isInteger(rounds) || ![8, 10, 12, 14, 16].includes(rounds)) return;

    const nextOrder = createRandomRoundTypeOrder(rounds);
    const nextBonusRound = Math.floor(Math.random() * rounds) + 1;

    const { data, error } = await supabaseClient
        .from("games")
        .update({
            round_type_order: nextOrder,
            bonus_round: nextBonusRound
        })
        .eq("id", game.id)
        .eq("host_id", myPlayerId)
        .eq("phase", "lobby")
        .select()
        .single();

    if (error || !data) {
        console.error("Could not update game customization:", error);
        const message = document.getElementById("customize-save-message");
        if (message) message.textContent = "Could not save that setting. Please try again.";
        return;
    }

    game = { ...game, ...data };

    const message = document.getElementById("customize-save-message");
    if (message) {
        message.textContent = `✓ ${rounds} rounds selected`;
        message.dataset.persistent = "true";
        setTimeout(() => {
            if (message) {
                message.textContent = "";
                delete message.dataset.persistent;
            }
        }, 1800);
    }

    updateLobby();
}


// ============================================================
// RENDER PLAYERS
// ============================================================

function renderPlayers() {

    const list =
        document.getElementById(
            "players-list"
        );


    if (!list) return;


    list.innerHTML = "";


    players.forEach(player => {

        const row =
            document.createElement("div");

        row.className =
            "player-card";


        if (player.id === myPlayerId) {
            row.classList.add("me");
        }


        row.innerHTML = `
            <div class="player-name">
                ${escapeHtml(player.name)}
            </div>
        `;


        list.appendChild(row);
    });


    const count =
        document.getElementById(
            "player-count"
        );


    if (count) {
        count.textContent =
            players.length;
    }
}


// ============================================================
// ROUND INTRO / QUESTION TYPE LOAD SCREEN
// ============================================================

function ensureRoundIntroStyles() {
    if (document.getElementById("round-intro-styles")) return;

    const style = document.createElement("style");
    style.id = "round-intro-styles";
    style.textContent = `
        #round-intro-phase {
            min-height: 62vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
        }
        #round-intro-phase .round-intro-card {
            width: min(720px, 92vw);
            padding: 42px 28px;
            border-radius: 24px;
            background: linear-gradient(145deg, rgba(255,255,255,.10), rgba(255,255,255,.04));
            border: 1px solid rgba(255,255,255,.12);
            box-shadow: 0 24px 70px rgba(0,0,0,.22);
            animation: roundIntroCardIn .55s cubic-bezier(.2,.8,.2,1);
        }
        #round-intro-phase .round-intro-icon {
            font-size: clamp(52px, 9vw, 86px);
            line-height: 1;
            margin-bottom: 18px;
            animation: roundIntroIconIn .7s cubic-bezier(.2,.8,.2,1);
        }
        #round-intro-phase .round-intro-round {
            margin: 0 0 8px;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: .16em;
            text-transform: uppercase;
            opacity: .7;
        }
        #round-intro-phase h1 {
            margin: 0;
            font-size: clamp(32px, 6vw, 58px);
        }
        #round-intro-phase .round-intro-subtitle {
            margin: 12px 0 0;
            opacity: .72;
            font-size: 17px;
        }
        #round-intro-phase .round-intro-countdown {
            margin-top: 28px;
            font-size: 14px;
            font-weight: 800;
            letter-spacing: .08em;
            text-transform: uppercase;
            opacity: .6;
        }
        @keyframes roundIntroCardIn {
            from { opacity: 0; transform: translateY(18px) scale(.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes roundIntroIconIn {
            from { opacity: 0; transform: scale(.65) rotate(-8deg); }
            to { opacity: 1; transform: scale(1) rotate(0); }
        }
        body.dark-mode #round-intro-phase .round-intro-card {
            background: linear-gradient(145deg, rgba(255,255,255,.08), rgba(255,255,255,.025));
            border-color: rgba(255,255,255,.12);
        }
    `;
    document.head.appendChild(style);
}

let roundIntroTimer = null;
let roundIntroTransitioning = false;

function getRoundTypePresentation(type) {
    if (type === "song") {
        return { icon: "🎵", title: "NAME THAT SONG", subtitle: "Listen to the clip and choose your answer." };
    }
    if (type === "speed") {
        return { icon: "⚡", title: "SPEED ROUND", subtitle: "Everyone answers. The faster you answer, the more points you can earn." };
    }
    if (type === "wta") {
        return { icon: "🏆", title: "WINNER TAKES ALL", subtitle: "30 seconds. Answer as many questions as you can. Correct = +1 WTA point, incorrect = −1." };
    }
    return { icon: "🎯", title: "CLASSIC QUESTION", subtitle: "One player is selected and chooses the difficulty." };
}

function handleRoundIntroPhase() {
    ensureRoundIntroStyles();
    clearTimers();

    const phase = document.getElementById("round-intro-phase");
    if (!phase) return;

    const type = game?.current_round_type || getRoundTypeForRound(game?.round || 1);
    const presentation = getRoundTypePresentation(type);
    const round = Number(game?.round || 1);

    phase.innerHTML = `
        <div class="round-intro-card">
            <div class="round-intro-icon">${presentation.icon}</div>
            <p class="round-intro-round">Round ${round} of ${getTotalRounds()}</p>
            <h1>${presentation.title}</h1>
            <p class="round-intro-subtitle">${presentation.subtitle}</p>
            <div class="round-intro-countdown">Get ready…</div>
        </div>
    `;

    if (!isHost || roundIntroTransitioning) return;

    roundIntroTransitioning = true;
    clearTimeout(roundIntroTimer);
    roundIntroTimer = setTimeout(async () => {
        roundIntroTransitioning = false;
        if (!game || game.phase !== "round-intro") return;

        const nextType = game.current_round_type || getRoundTypeForRound(game.round);

        // IMPORTANT: Song and Speed rounds must create their actual
        // question before changing the game to the question phase.
        // Previously we only changed phase -> "question", which left
        // current_question_id empty. The UI then kept showing the
        // previous round's question because there was nothing new to render.
        if (nextType === "song") {
            await startSongRound();
            return;
        }

        if (nextType === "speed") {
            await startSpeedRound();
            return;
        }

        if (nextType === "wta") {
            await startWtaRound();
            return;
        }

        const { error } = await supabaseClient
            .from("games")
            .update({
                phase: "selecting",
                current_player_id: null,
                current_difficulty: null,
                current_question_id: null,
                current_answer: null,
                question_started_at: null
            })
            .eq("id", game.id)
            .eq("phase", "round-intro");

        if (error) console.error("Could not start round after intro:", error);
    }, 2200);
}

// ============================================================
// SHARED ROUND SYNC
// ============================================================
// Realtime is the fast path, but a missed/delayed realtime event should not
// leave a player stuck on the previous screen. During shared rounds we poll
// the small games row as a lightweight safety net. The timer itself remains
// driven by the shared question_started_at timestamp.
function startSharedRoundSync() {
    if (sharedRoundSyncInterval || !game?.id) return;

    sharedRoundSyncInterval = setInterval(async () => {
        if (!game?.id || game.phase !== "question" ||
            !["song", "speed"].includes(game.current_round_type)) {
            stopSharedRoundSync();
            return;
        }

        const { data, error } = await supabaseClient
            .from("games")
            .select("id,phase,round,current_round_type,current_player_id,current_difficulty,current_question_id,current_answer,question_started_at")
            .eq("id", game.id)
            .single();

        if (error || !data) return;

        const key = [
            data.phase, data.round, data.current_round_type,
            data.current_question_id, data.current_answer,
            data.question_started_at
        ].join("|");

        if (key !== sharedRoundSyncKey) {
            sharedRoundSyncKey = key;
            game = { ...game, ...data };
            updateGameState();
        }
    }, 750);
}

function stopSharedRoundSync() {
    if (sharedRoundSyncInterval) {
        clearInterval(sharedRoundSyncInterval);
        sharedRoundSyncInterval = null;
    }
    sharedRoundSyncKey = null;
}

function syncSharedRoundClockUI() {
    if (!game || game.phase !== "question") return;

    if (game.current_round_type === "song") {
        updateSongAnswerControls();
    } else if (game.current_round_type === "speed") {
        updateSpeedAnswerControls();
    }
}


// Keep shared-round controls responsive after a tab regains focus/visibility.
document.addEventListener("visibilitychange", syncSharedRoundClockUI);
window.addEventListener("focus", syncSharedRoundClockUI);

// ============================================================
// UPDATE GAME STATE
// ============================================================

function updateGameState() {

    if (!game) return;

    if (game.phase === "question" && ["song", "speed"].includes(game.current_round_type)) {
        startSharedRoundSync();
    } else {
        stopSharedRoundSync();
    }

    const roundNumber =
        document.getElementById(
            "round-number"
        );


    if (roundNumber) {
        roundNumber.textContent =
            game.round || 1;
    }


    updateCurrentPlayer();

    if (game.phase !== "question") {
        answerFeedbackKey = null;
        if (answerFeedbackTimeout) {
            clearTimeout(answerFeedbackTimeout);
            answerFeedbackTimeout = null;
        }
    }

    if (game.phase !== "leaderboard" && leaderboardAnimatedRound !== null) {
        leaderboardAnimatedRound = null;
        if (leaderboardAnimationTimer) {
            clearTimeout(leaderboardAnimationTimer);
            leaderboardAnimationTimer = null;
        }
    }

    switch (game.phase) {

        case "lobby":
            showScreen("lobby-screen");
            updateLobby();
            break;


        case "round-intro":
            showScreen("game-screen");
            showGamePhase("round-intro-phase");
            handleRoundIntroPhase();
            break;

        case "selecting":
            showScreen("game-screen");
            showGamePhase("selection-phase");
            handleSelectionPhase();
            break;


        case "difficulty":
            showScreen("game-screen");
            showGamePhase("difficulty-phase");
            handleDifficultyPhase();
            break;


        case "question":
            showScreen("game-screen");
            showGamePhase("question-phase");
            handleQuestionPhase();
            break;


        case "wta-question":
            showScreen("game-screen");
            showGamePhase("wta-phase");
            handleWtaQuestionPhase();
            break;


        case "wta-reveal":
            showScreen("game-screen");
            showGamePhase("wta-reveal-phase");
            handleWtaRevealPhase();
            break;


        case "song-reveal":
            showScreen("game-screen");
            showGamePhase("question-phase");
            handleSongRevealPhase();
            break;


        case "speed-reveal":
            showScreen("game-screen");
            showGamePhase("question-phase");
            handleSpeedRevealPhase();
            break;


        case "leaderboard":
            showScreen("game-screen");
            showGamePhase("leaderboard-phase");
            handleLeaderboardPhase();
            break;


        case "gamble":
            showScreen("game-screen");
            showGamePhase("gamble-phase");
            handleGamblePhase();
            break;


        case "final":
            showScreen("game-screen");
            showGamePhase("final-phase");
            handleFinalPhase();
            break;

        case "disbanded":
            clearGameSession();
            showScreen("home-screen");
            break;
    }
}


// ============================================================
// SHOW GAME PHASE
// ============================================================

function showGamePhase(phaseId) {

    document
        .querySelectorAll(".game-phase")
        .forEach(phase => {
            phase.classList.add("hidden");
        });


    const phase =
        document.getElementById(phaseId);


    if (phase) {
        phase.classList.remove("hidden");
    }
}


// ============================================================
// CURRENT PLAYER
// ============================================================

function updateCurrentPlayer() {

    const name =
        document.getElementById(
            "selected-player-name"
        );


    const currentPlayer =
        players.find(
            player =>
                player.id ===
                game?.current_player_id
        );


    if (name) {
        name.textContent =
            currentPlayer?.name || "-";
    }


    const score =
        document.getElementById(
            "game-score"
        );


    const me =
        players.find(
            player =>
                player.id ===
                myPlayerId
        );


    if (score && me) {
        const value = score.querySelector(".score-value");
        const points = me.points || 0;

        if (value) {
            value.textContent = points;
        } else {
            score.textContent = `${points} points`;
        }
    }
}


// ============================================================
// START GAME
// ============================================================

async function startGame() {

    if (!isHost) return;

    if (!players.length) {
        alert("There are no players.");
        return;
    }

    // Capture the starting scores so the first leaderboard can show exactly
    // how many real quiz points were earned in Round 1.
    leaderboardPreviousState = buildLeaderboardState(getLeaderboardSortedPlayers());
    leaderboardAnimatedRound = null;

    await beginRound();
}


// ============================================================
// BEGIN ROUND
// ============================================================

async function beginRound() {

    if (!isHost) return;


    movingToNextPlayer = false;
    answerSubmitted = false;
    renderedQuestionId = null;
    wtaRoundInitialized = false;
    wtaRoundFinished = false;
    wtaCurrentRowId = null;
    wtaCurrentQuestionNumber = 0;
    wtaLeaderboardState = {};


    clearTimers();


    // Reset everyone for the new round
    for (const player of players) {

        await supabaseClient
            .from("players")
            .update({
                rounds_picked: [],
                has_gambled: false,
                gamble_result: null,
                gamble_payout: 0
            })
            .eq("id", player.id);
    }


    const roundType = getRoundTypeForRound(game.round);
    currentRoundType = roundType;

    // For Speed rounds, choose the question BEFORE entering the round intro.
    // This removes the question-bank/database lookup from the critical path
    // between the intro finishing and the shared question start time.
    let preparedQuestionId = null;
    if (roundType === "speed") {
        const usedQuestionIds = new Set();
        const { data: usedAnswers, error: usedAnswersError } = await supabaseClient
            .from("answers")
            .select("question_id")
            .eq("game_id", game.id);

        if (usedAnswersError) {
            console.error("Could not prepare speed question:", usedAnswersError);
            return;
        }

        (usedAnswers || []).forEach(row => {
            if (row.question_id) usedQuestionIds.add(row.question_id);
        });

        const preparedSpeedQuestion = getRandomSpeedQuestion(usedQuestionIds);
        if (!preparedSpeedQuestion) {
            alert("There are no unused speed questions left. Add more speed questions to question_types.js.");
            return;
        }

        preparedQuestionId = preparedSpeedQuestion.id;
        selectedQuestion = preparedSpeedQuestion;
    }

    await supabaseClient
        .from("games")
        .update({
            phase: "round-intro",
            current_player_id: null,
            current_difficulty: null,
            current_question_id: preparedQuestionId,
            current_answer: null,
            question_started_at: null,
            current_round_type: roundType,
            wta_awarded: false
        })
        .eq("id", game.id);

    game = { ...game, current_round_type: roundType, phase: "round-intro", current_question_id: preparedQuestionId, current_answer: null, question_started_at: null, wta_awarded: false };
    updateGameState();
}


// ============================================================
// SELECT NEXT PLAYER
// ============================================================

async function selectNextPlayer() {

    if (!isHost) return;

    if (movingToNextPlayer) return;

    movingToNextPlayer = true;

    try {

        // Always read the latest database state. We do not rely
        // on a possibly stale players array when deciding whether
        // the round is finished.
        const { data: latestPlayers, error: playersError } =
            await supabaseClient
                .from("players")
                .select("*")
                .eq("game_id", game.id)
                .order("joined_at", { ascending: true });

        if (playersError) {
            console.error("Could not load players for selection:", playersError);
            return;
        }

        players = latestPlayers || [];
        renderPlayers();
        renderLeaderboard();
        renderFinalLeaderboard();
        updateCurrentPlayer();

        if (!players.length) {
            console.error("No players found while selecting the next player.");
            return;
        }

        const round = Number(game.round || 1);

        // rounds_picked is retained as the fast/simple round tracker,
        // but we normalise values because Supabase/old data can contain
        // either numbers or strings.
        let availablePlayers = players.filter(player => {

            const picked = Array.isArray(player.rounds_picked)
                ? player.rounds_picked.map(Number)
                : [];

            return !picked.includes(round);
        });

        // If old/stale rounds_picked data says everybody has played,
        // verify against the actual answers table before showing the
        // leaderboard. This prevents a bad/stale rounds_picked value
        // from ending the round after the first question.
        if (!availablePlayers.length) {

            const { data: roundAnswers, error: answersError } =
                await supabaseClient
                    .from("answers")
                    .select("player_id")
                    .eq("game_id", game.id)
                    .eq("round", round);

            if (answersError) {
                console.error("Could not verify round answers:", answersError);
                return;
            }

            const answeredIds = new Set(
                (roundAnswers || []).map(answer => answer.player_id)
            );

            availablePlayers = players.filter(
                player => !answeredIds.has(player.id)
            );

            // Only show the leaderboard when every player has actually
            // submitted an answer for this round.
            if (!availablePlayers.length) {

                const { error: leaderboardError } =
                    await supabaseClient
                        .from("games")
                        .update({
                            phase: "leaderboard",
                            current_player_id: null,
                            current_difficulty: null,
                            current_question_id: null,
                            question_started_at: null
                        })
                        .eq("id", game.id);

                if (leaderboardError) {
                    console.error("Could not move to leaderboard:", leaderboardError);
                }

                return;
            }
        }

        // Random order, with each player selected only once per round.
        const selectedPlayer =
            availablePlayers[
                Math.floor(Math.random() * availablePlayers.length)
            ];

        const existingPicked =
            Array.isArray(selectedPlayer.rounds_picked)
                ? selectedPlayer.rounds_picked
                : [];

        const pickedRounds = [
            ...existingPicked.filter(value => Number(value) !== round),
            round
        ];

        const { error: playerUpdateError } =
            await supabaseClient
                .from("players")
                .update({
                    rounds_picked: pickedRounds
                })
                .eq("id", selectedPlayer.id);

        if (playerUpdateError) {
            console.error("Could not mark player as picked:", playerUpdateError);
            return;
        }

        const { error: gameUpdateError } =
            await supabaseClient
                .from("games")
                .update({
                    phase: "difficulty",
                    current_player_id: selectedPlayer.id,
                    current_difficulty: null,
                    current_question_id: null,
                    current_answer: null,
                    question_started_at: null
                })
                .eq("id", game.id);

        if (gameUpdateError) {
            console.error("Could not move to difficulty phase:", gameUpdateError);
            return;
        }

        // Keep the local state immediately in sync as well as relying on
        // realtime, so the host cannot accidentally run another selection.
        game = {
            ...game,
            phase: "difficulty",
            current_player_id: selectedPlayer.id,
            current_difficulty: null,
            current_question_id: null,
            current_answer: null,
            question_started_at: null
        };

        updateGameState();

    } catch (error) {

        console.error("Unexpected error selecting next player:", error);

    } finally {

        movingToNextPlayer = false;
    }
}


// ============================================================
// SELECTION PHASE
// ============================================================

function handleSelectionPhase() {

    const message =
        document.getElementById(
            "selection-message"
        );

    if (message) {
        message.textContent =
            "The next player is being selected.";
    }

    // There is deliberately only ONE place that selects a player:
    // the host. No delayed duplicate calls are made here.
    if (!isHost || movingToNextPlayer) return;

    selectNextPlayer();
}


// ============================================================
// DIFFICULTY PHASE
// ============================================================

function handleDifficultyPhase() {

    const currentPlayer =
        players.find(
            player =>
                player.id ===
                game.current_player_id
        );


    const eyebrow =
        document.querySelector(
            "#difficulty-phase .eyebrow"
        );


    const heading =
        document.querySelector(
            "#difficulty-phase h1"
        );


    if (game.current_player_id === myPlayerId) {

        if (eyebrow) {
            eyebrow.textContent =
                "IT'S YOUR TURN";
        }


        if (heading) {
            heading.textContent =
                "Choose your difficulty";
        }

    } else {

        if (eyebrow) {
            eyebrow.textContent =
                "PLAYER TURN";
        }


        if (heading) {
            heading.textContent =
                `${currentPlayer?.name || "Player"} is choosing`;
        }
    }


    const selectedDifficulty =
        String(game.current_difficulty || "").toLowerCase();

    document
        .querySelectorAll(".difficulty")
        .forEach(button => {

            const buttonDifficulty =
                String(button.dataset.difficulty || "").toLowerCase();

            button.disabled =
                game.current_player_id !==
                myPlayerId;

            // current_difficulty is stored in Supabase, so every
            // connected player sees the same selected difficulty.
            button.classList.toggle(
                "difficulty-selected",
                Boolean(selectedDifficulty) &&
                buttonDifficulty === selectedDifficulty
            );
        });
}


// ============================================================
// CHOOSE DIFFICULTY
// ============================================================

async function chooseDifficulty(difficulty) {

    if (!game) return;


    if (game.current_player_id !== myPlayerId) {
        return;
    }


    if (!POINTS[difficulty]) {
        return;
    }


    const questions =
        getQuestionsForDifficulty(
            difficulty
        );


    if (!questions?.length) {

        alert(
            "There are no questions for this difficulty."
        );

        return;
    }


    // Never reuse a question anywhere in the same game.
    const { data: usedAnswers, error: usedAnswersError } =
        await supabaseClient
            .from("answers")
            .select("question_id")
            .eq("game_id", game.id);

    if (usedAnswersError) {
        console.error(
            "Could not check used questions:",
            usedAnswersError
        );

        alert("Could not select a question. Please try again.");
        return;
    }

    const usedQuestionIds =
        new Set(
            (usedAnswers || [])
                .map(answer => answer.question_id)
                .filter(Boolean)
        );

    const unusedQuestions =
        questions.filter(
            question => !usedQuestionIds.has(question.id)
        );

    if (!unusedQuestions.length) {
        alert(
            `There are no unused ${difficulty} questions left in this game.`
        );
        return;
    }

    selectedQuestion =
        unusedQuestions[
            Math.floor(
                Math.random() *
                unusedQuestions.length
            )
        ];

    // Reserve the question immediately so it cannot be selected again
    // if the player refreshes or leaves before answering.
    const { error: reservationError } =
        await supabaseClient
            .from("answers")
            .upsert({
                game_id: game.id,
                player_id: myPlayerId,
                round: game.round,
                question_id: selectedQuestion.id,
                difficulty: difficulty,
                answer: "",
                correct: false,
                points_awarded: 0
            }, {
                onConflict: "player_id,round"
            });

    if (reservationError) {
        console.error(
            "Could not reserve question:",
            reservationError
        );

        alert("Could not select the question. Please try again.");
        return;
    }


    answerSubmitted = false;
    renderedQuestionId = null;


    const { error: difficultyError } =
        await supabaseClient
            .from("games")
            .update({
                phase: "question",
                current_round_type: "classic",
                current_difficulty: difficulty,
                current_question_id:
                    selectedQuestion.id,
                current_answer: null,
                question_started_at:
                    new Date().toISOString()
            })
            .eq("id", game.id);

    if (difficultyError) {
        console.error(
            "Could not save difficulty:",
            difficultyError
        );
        alert("Could not save the difficulty. Please try again.");
        return;
    }

    // Update the local state immediately as well as relying on Realtime.
    // This makes the selected difficulty visible consistently while the
    // other players receive the same value through the games channel.
    game = {
        ...game,
        phase: "question",
        current_round_type: "classic",
        current_difficulty: difficulty,
        current_question_id: selectedQuestion.id,
        current_answer: null,
        question_started_at: new Date().toISOString()
    };

    updateGameState();
}


// ============================================================
// QUESTION PHASE
// ============================================================

function handleQuestionPhase() {

    const questionId = game.current_question_id;
    currentRoundType = game.current_round_type || getRoundTypeForRound(game.round);

    // Classic questions must never inherit a stale song-round type from the
    // previous round. The database value set by chooseDifficulty() is the
    // authoritative value for this question.
    if (currentRoundType === "song") {
        handleSongQuestionPhase();
        return;
    }

    if (currentRoundType === "speed") {
        handleSpeedQuestionPhase();
        return;
    }

    if (renderedQuestionId === questionId) {
        updateAnswerButtons();
        showSharedAnswerFeedback();
        return;
    }

    const questions = getQuestionsForDifficulty(game.current_difficulty);
    if (!questions?.length) return;

    selectedQuestion = questions.find(question => question.id === questionId);
    if (!selectedQuestion) {
        console.error("Question not found:", questionId);
        return;
    }

    renderedQuestionId = questionId;
    answerSubmitted = false;
    renderQuestion();
    startTimer();
}


// ============================================================
// ANSWER ORDER / LOCAL SELECTION HELPERS
// ============================================================

function shuffleArray(items) {
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
}

function markLocalSongSelection(answer) {
    if (!answer || (game?.current_round_type || currentRoundType) !== "song") return;

    localSongSelection = answer;

    // Show the player's selection in amber immediately. After a short
    // feedback delay, turn that same selection green when correct or red
    // when incorrect. The YOUR PICK badge remains visible throughout.
    document.querySelectorAll(".answer-button").forEach(button => {
        const isSelected = button.dataset.answer === answer;
        button.classList.toggle("song-local-selected", isSelected);
        button.classList.remove("answer-correct", "answer-wrong");

        const existing = button.querySelector(".song-local-pick");
        if (existing) existing.remove();

        if (isSelected) {
            const badge = document.createElement("span");
            badge.className = "song-local-pick";
            badge.textContent = "YOUR PICK";
            button.appendChild(badge);
        }
    });

    setTimeout(() => {
        if (localSongSelection !== answer) return;
        if (!selectedQuestion) return;
        if ((game?.current_round_type || currentRoundType) !== "song") return;

        const isCorrect = answer === selectedQuestion.correct;

        document.querySelectorAll(".answer-button").forEach(button => {
            if (button.dataset.answer !== answer) return;

            button.classList.remove("song-local-selected", "answer-wrong", "answer-correct");
            button.classList.add(isCorrect ? "answer-correct" : "answer-wrong");
        });
    }, 1000);
}


function markLocalSpeedSelection(answer) {
    if (!answer || (game?.current_round_type || currentRoundType) !== "speed") return;

    localSpeedSelection = answer;

    document.querySelectorAll(".answer-button").forEach(button => {
        const isSelected = button.dataset.answer === answer;
        button.classList.toggle("speed-local-selected", isSelected);

        const existing = button.querySelector(".speed-local-pick");
        if (existing) existing.remove();

        if (isSelected) {
            const badge = document.createElement("span");
            badge.className = "speed-local-pick";
            badge.textContent = "YOUR PICK";
            button.appendChild(badge);
        }
    });
}


// ============================================================
// RENDER QUESTION
// ============================================================

function renderQuestion() {
    const speedTimes = document.getElementById("speed-response-times");
    if (speedTimes) {
        speedTimes.classList.add("hidden");
        speedTimes.innerHTML = "";
    }

    const questionText =
        document.getElementById(
            "question-text"
        );


    const difficulty =
        document.getElementById(
            "question-difficulty"
        );


    const answers =
        document.getElementById(
            "answer-buttons"
        );


    const result =
        document.getElementById(
            "answer-result"
        );


    if (questionText) {
        questionText.textContent = selectedQuestion.question;
    }

    if (difficulty) {
        difficulty.textContent = currentRoundType === "song"
            ? getRoundTypeLabel("song")
            : currentRoundType === "speed"
                ? getRoundTypeLabel("speed")
                : String(game.current_difficulty).toUpperCase();
    }

    const category = document.getElementById("question-category");
    if (category) {
        const categoryText = selectedQuestion?.category || "General Knowledge";
        category.textContent = categoryText.toUpperCase();
        category.classList.toggle("hidden", currentRoundType !== "classic");
    }

    const banner = document.getElementById("round-type-banner");
    if (banner) {
        const type = currentRoundType === "song"
            ? "song"
            : currentRoundType === "speed"
                ? "speed"
                : "classic";
        banner.textContent = `${QUESTION_TYPE_CONFIG[type].icon} ${QUESTION_TYPE_CONFIG[type].label}`;
    }

    const songInstruction = document.getElementById("song-instruction");
    if (songInstruction) {
        songInstruction.classList.toggle("hidden", currentRoundType !== "song");
    }

    const speedInstruction = document.getElementById("speed-instruction");
    if (speedInstruction) {
        speedInstruction.classList.toggle("hidden", currentRoundType !== "speed");
    }

    const audio = document.getElementById("song-audio");
    if (audio) {
        if (currentRoundType === "song") {
            audio.classList.remove("hidden");
            audio.src = selectedQuestion.audio || "";
            audio.controls = false;
        } else {
            audio.pause();
            audio.removeAttribute("src");
            audio.classList.add("hidden");
        }
    }


    if (result) {

        result.textContent = "";

        result.className =
            "answer-result";
    }


    if (!answers) return;


    answers.innerHTML = "";


    // Shuffle the answer positions for every question render.
    // This prevents the correct answer from always appearing in the same position.
    const answersToRender = shuffleArray([...selectedQuestion.answers]);

    answersToRender.forEach(
        answer => {

            const button =
                document.createElement(
                    "button"
                );


            button.type = "button";

            button.className =
                "answer-button";

            button.textContent =
                answer;

            button.dataset.answer =
                answer;


            button.addEventListener(
                "click",
                async () => {
                    await submitAnswer(answer);
                }
            );


            answers.appendChild(
                button
            );
        }
    );


    updateAnswerButtons();

    if (currentRoundType === "song") {
        if (answerSubmitted) markLocalSongSelection(localSongSelection);
    } else if (currentRoundType === "speed") {
        if (answerSubmitted && localSpeedSelection) markLocalSpeedSelection(localSpeedSelection);
    }

    showSharedAnswerFeedback();
}


// ============================================================
// ANSWER BUTTONS
// ============================================================

function updateAnswerButtons() {

    const type = game.current_round_type || currentRoundType;
    let canAnswer = false;

    if (type === "song") {
        canAnswer = !answerSubmitted && game.phase === "question";
    } else if (type === "speed") {
        const timing = getSpeedTiming();
        const now = Date.now();
        canAnswer = !answerSubmitted &&
            game.phase === "question" &&
            timing.startMs > 0 &&
            now >= timing.startMs &&
            now < timing.endMs;
    } else {
        canAnswer = game.current_player_id === myPlayerId && !answerSubmitted;
    }

    document
        .querySelectorAll(".answer-button")
        .forEach(button => {
            button.disabled = !canAnswer;
        });
}


// ============================================================
// TIMER
// ============================================================

function startTimer() {

    clearInterval(timerInterval);


    const timer =
        document.getElementById(
            "timer"
        );


    let seconds = 15;


    if (timer) {
        timer.textContent =
            seconds;
    }


    timerInterval =
        setInterval(async () => {

            seconds--;


            if (timer) {
                timer.textContent =
                    seconds;
            }


            if (seconds <= 0) {

                clearInterval(
                    timerInterval
                );


                if (
                    game.current_player_id ===
                    myPlayerId &&
                    !answerSubmitted
                ) {

                    await submitAnswer(
                        "__TIMEOUT__"
                    );
                }
            }

        }, 1000);
}


// ============================================================
// SHARED 10-SECOND RESPONSE TIMING
// ============================================================

function getLocalRoundResponseTimeMs(roundType) {
    const startPerf = roundType === "song"
        ? songLocalStartPerf
        : speedLocalStartPerf;

    if (typeof performance === "undefined" || startPerf === null) return null;

    return Math.max(0, Math.min(10000, performance.now() - startPerf));
}

function getSharedRoundAnswerTimestamp({ isSpeedRound, isSongRound, answer }) {
    if (answer === "__TIMEOUT__") {
        const timing = isSongRound ? getSongTiming() : getSpeedTiming();
        return new Date(timing.endMs).toISOString();
    }

    if (!isSpeedRound && !isSongRound) return new Date().toISOString();

    const roundType = isSongRound ? "song" : "speed";
    const timing = isSongRound ? getSongTiming() : getSpeedTiming();
    const elapsedMs = getLocalRoundResponseTimeMs(roundType);

    // Store a normalised timestamp based on the shared start. This means
    // players with slightly different computer clocks still produce the
    // same response-time scale and answer ordering.
    if (elapsedMs === null || !timing.startMs) {
        return new Date().toISOString();
    }

    return new Date(timing.startMs + elapsedMs).toISOString();
}

// ============================================================
// SUBMIT ANSWER
// ============================================================

async function submitAnswer(answer) {

    // --------------------------------------------------------
    // THIS IS THE IMPORTANT PROTECTION
    // --------------------------------------------------------

    if (answerSubmitted) {
        return;
    }


    if (!game) {
        return;
    }


    const roundType = game.current_round_type || currentRoundType;
    const isSongRound = roundType === "song";
    const isSpeedRound = roundType === "speed";

    if (!isSongRound && !isSpeedRound && game.current_player_id !== myPlayerId) {
        return;
    }

    if (!selectedQuestion) {
        return;
    }

    // Capture the click time BEFORE doing any async/database work.
    // This is the critical part of the timing system: the response time is
    // taken at the instant the player presses the button, not when Supabase
    // finishes the insert.
    let responseElapsedMs = null;
    if (isSongRound || isSpeedRound) {
        const timing = isSongRound ? getSongTiming() : getSpeedTiming();
        const now = Date.now();

        if (answer !== "__TIMEOUT__" && (now < timing.startMs || now >= timing.endMs)) {
            return;
        }

        if (answer !== "__TIMEOUT__") {
            // Both shared rounds calculate the response time from the exact
            // shared wall-clock start timestamp. Do NOT use the moment a
            // browser's local timer callback happened to fire: under load or
            // with multiple players that callback can be delayed, which can
            // make a perfectly normal answer look like a 10-second answer.
            // performance.timeOrigin + performance.now() gives us the most
            // precise local wall-clock reading available in the browser.
            const preciseNow = typeof performance !== "undefined" &&
                Number.isFinite(performance.timeOrigin)
                ? performance.timeOrigin + performance.now()
                : now;

            responseElapsedMs = Math.max(0, Math.min(10000, preciseNow - timing.startMs));
        } else {
            responseElapsedMs = 10000;
        }
    }

    // Lock IMMEDIATELY before any database operation.
    answerSubmitted = true;


    // Keep the shared Music/Speed countdown running after a player answers.
    if (!isSongRound && !isSpeedRound) {
        clearInterval(timerInterval);
    }


    // Disable every answer button immediately.
    document
        .querySelectorAll(".answer-button")
        .forEach(button => {
            button.disabled = true;
        });

    // Song and speed selections are deliberately local. These indicators
    // are rendered only in this browser and are never written to shared state.
    if (isSongRound && answer !== "__TIMEOUT__") {
        markLocalSongSelection(answer);
    }

    if (isSpeedRound && answer !== "__TIMEOUT__") {
        markLocalSpeedSelection(answer);
    }


    const correct =
        answer !== "__TIMEOUT__" &&
        answer ===
        selectedQuestion.correct;


    let points = 0;
    if (correct) {
        if (isSongRound) {
            // Music points are awarded by answer order when the round closes.
            // Do not award points here or a fast correct answer could be paid twice.
            points = 0;
        } else if (isSpeedRound) {
            // Speed points are awarded by answer order at the end of the
            // round, not by the individual player's elapsed-time band.
            // The host assigns 6/4/2/1 to the correct answers in order.
            points = 0;
        } else {
            points = POINTS[game.current_difficulty];
        }
    }


    // Shared answer feedback is driven by games.current_answer so every
    // player sees the same amber -> green/red result.

    // The feedback text underneath the answers is intentionally
    // kept empty so the result is communicated by the buttons.
    const result =
        document.getElementById(
            "answer-result"
        );

    if (result) {
        result.textContent = "";
        result.className = "answer-result";
    }


    // --------------------------------------------------------
    // SAVE ANSWER
    // --------------------------------------------------------

    const { error: answerError } =
        await supabaseClient
            .from("answers")
            .upsert({
                game_id: game.id,
                player_id: myPlayerId,
                round: game.round,
                question_id:
                    selectedQuestion.id,
                difficulty:
                    isSpeedRound
                        ? "speed"
                        : isSongRound
                            ? "song"
                            : game.current_difficulty,
                answer:
                    answer === "__TIMEOUT__"
                        ? ""
                        : answer,
                correct: correct,
                points_awarded: points,
                answered_at: (isSongRound || isSpeedRound)
                    ? new Date(
                        (isSongRound ? getSongTiming() : getSpeedTiming()).startMs +
                        (responseElapsedMs ?? 10000)
                    ).toISOString()
                    : new Date().toISOString()
            }, {
                onConflict: "player_id,round"
            });


    if (!isSongRound && !isSpeedRound) {
        const { error: sharedAnswerError } = await supabaseClient
            .from("games")
            .update({ current_answer: answer === "__TIMEOUT__" ? null : answer })
            .eq("id", game.id);
        if (sharedAnswerError) console.error("Could not share selected answer:", sharedAnswerError);
        game.current_answer = answer === "__TIMEOUT__" ? null : answer;
    }

    if (answerError) {

        console.error(
            "Could not save answer:",
            answerError
        );
    }


    // --------------------------------------------------------
    // UPDATE SCORE ONCE
    // --------------------------------------------------------

    if (points > 0) {

        const player =
            players.find(
                p =>
                    p.id ===
                    myPlayerId
            );


        if (player) {

            const newPoints =
                (player.points || 0) +
                points;


            const { error } =
                await supabaseClient
                    .from("players")
                    .update({
                        points: newPoints
                    })
                    .eq(
                        "id",
                        myPlayerId
                    );


            if (error) {

                console.error(
                    "Could not update score:",
                    error
                );
            }
        }
    }


    // --------------------------------------------------------
    // MOVE ON
    // --------------------------------------------------------

    if (isSongRound) {
        // If this click completed the round, the host closes it immediately.
        // The watcher remains as a safety net for network delays/timeouts.
        await finishSongRoundIfNeeded();
        return;
    }

    if (isSpeedRound) {
        await finishSpeedRoundIfNeeded();
        return;
    }

    clearTimeout(nextPlayerTimeout);
    nextPlayerTimeout = setTimeout(async () => {
        const { error: phaseError } = await supabaseClient
            .from("games")
            .update({
                phase: "selecting",
                current_player_id: null,
                current_difficulty: null,
                current_question_id: null,
                question_started_at: null
            })
            .eq("id", game.id);
        if (phaseError) console.error("Could not start next player selection:", phaseError);
    }, 2500);
}


// ============================================================
// WINNER TAKES ALL
// ============================================================

function ensureWtaStyles() {
    if (document.getElementById("wta-styles")) return;

    const style = document.createElement("style");
    style.id = "wta-styles";
    style.textContent = `
        #wta-phase {
            width: min(1180px, 100%);
            margin: 0 auto;
        }

        .wta-shell {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 310px;
            gap: 22px;
            align-items: stretch;
        }

        .wta-main,
        .wta-mini-board {
            border: 1px solid rgba(255,255,255,.10);
            border-radius: 24px;
            background: rgba(255,255,255,.045);
            box-shadow: 0 18px 55px rgba(0,0,0,.18);
        }

        .wta-main {
            min-height: 570px;
            padding: 26px;
            display: flex;
            flex-direction: column;
        }

        .wta-heading-row {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 22px;
        }

        .wta-heading-copy {
            min-width: 0;
            flex: 1;
        }

        .wta-eyebrow {
            margin: 0 0 12px;
            color: #ff3b45;
            font-size: .72rem;
            font-weight: 950;
            letter-spacing: .14em;
            text-transform: uppercase;
        }

        .wta-title {
            margin: 0;
            max-width: 820px;
            font-size: clamp(2.7rem, 5.3vw, 4.35rem);
            line-height: 1.04;
            font-weight: 950;
            letter-spacing: -.025em;
        }

        .wta-timer {
            min-width: 94px;
            padding: 10px 14px;
            border-radius: 17px;
            background: rgba(181,18,27,.14);
            border: 1px solid rgba(255,59,69,.28);
            text-align: center;
        }

        .wta-timer-label {
            display: block;
            margin-bottom: 2px;
            font-size: .58rem;
            font-weight: 950;
            letter-spacing: .12em;
            opacity: .65;
        }

        #wta-timer {
            display: block;
            font-size: 1.8rem;
            line-height: 1;
            font-variant-numeric: tabular-nums;
        }

        #wta-timer.wta-danger {
            color: #ff4d58;
            animation: wtaTimerPulse .8s ease-in-out infinite;
        }

        @keyframes wtaTimerPulse {
            50% { transform: scale(1.08); }
        }

        .wta-question-meta {
            margin: 28px 0 16px;
            font-size: .7rem;
            font-weight: 900;
            letter-spacing: .1em;
            text-transform: uppercase;
            opacity: .55;
        }

        #wta-question-text {
            max-width: 820px;
            margin: 0;
            font-size: inherit;
            line-height: inherit;
            text-align: left;
        }

        #wta-answer-buttons {
            width: min(820px, 100%);
            margin: 0 auto;
        }

        #wta-answer-buttons .answer-button {
            min-height: 94px;
            font-size: 1.28rem;
            padding: 20px 24px;
        }

        #wta-answer-buttons .answer-button.wta-selected {
            background: #f59e0b !important;
            border-color: #f59e0b !important;
            color: #111827 !important;
            transform: translateY(-2px) scale(1.01);
        }

        #wta-answer-buttons .answer-button.wta-correct {
            background: #22c55e !important;
            border-color: #22c55e !important;
            color: #ffffff !important;
            box-shadow: 0 0 0 2px rgba(34,197,94,.22), 0 0 24px rgba(34,197,94,.72), 0 0 52px rgba(34,197,94,.38) !important;
            animation: wtaCorrectGlow .55s ease-in-out 2;
        }

        .wta-correct {
            box-shadow: 0 0 0 2px rgba(34,197,94,.22), 0 0 24px rgba(34,197,94,.72), 0 0 52px rgba(34,197,94,.38) !important;
        }

        #wta-answer-buttons .answer-button.wta-wrong {
            background: #ef4444 !important;
            border-color: #ef4444 !important;
            color: #ffffff !important;
            box-shadow: 0 0 0 2px rgba(239,68,68,.22), 0 0 24px rgba(239,68,68,.72), 0 0 52px rgba(239,68,68,.38) !important;
            animation: wtaWrongGlow .55s ease-in-out 2;
        }

        .wta-wrong {
            box-shadow: 0 0 0 2px rgba(239,68,68,.22), 0 0 24px rgba(239,68,68,.72), 0 0 52px rgba(239,68,68,.38) !important;
        }

        @keyframes wtaCorrectGlow {
            50% {
                box-shadow: 0 0 0 3px rgba(34,197,94,.30), 0 0 34px rgba(34,197,94,.95), 0 0 70px rgba(34,197,94,.48) !important;
                transform: translateY(-2px) scale(1.015);
            }
        }

        @keyframes wtaWrongGlow {
            50% {
                box-shadow: 0 0 0 3px rgba(239,68,68,.30), 0 0 34px rgba(239,68,68,.95), 0 0 70px rgba(239,68,68,.48) !important;
                transform: translateY(-2px) scale(1.015);
            }
        }

        .wta-feedback {
            min-height: 36px;
            margin-top: 18px;
            text-align: center;
            font-size: 1rem;
            font-weight: 950;
        }

        .wta-feedback.good { color: #22c55e; }
        .wta-feedback.bad { color: #ef4444; }

        .wta-mini-board {
            padding: 18px;
            overflow: hidden;
        }

        .wta-board-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            padding: 2px 2px 14px;
        }

        .wta-board-title {
            font-size: .75rem;
            font-weight: 950;
            letter-spacing: .1em;
            text-transform: uppercase;
        }

        .wta-board-live {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            color: #22c55e;
            font-size: .62rem;
            font-weight: 950;
            letter-spacing: .08em;
        }

        .wta-live-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #22c55e;
            box-shadow: 0 0 0 4px rgba(34,197,94,.10);
            animation: wtaLivePulse 1.4s ease-in-out infinite;
        }

        @keyframes wtaLivePulse {
            50% { transform: scale(1.25); opacity: .65; }
        }

        .wta-board-header {
            display: grid;
            grid-template-columns: 32px minmax(0,1fr) 64px;
            gap: 8px;
            padding: 0 10px 7px;
            color: #888;
            font-size: .58rem;
            font-weight: 950;
            letter-spacing: .09em;
        }

        .wta-board-header span:last-child { text-align: right; }

        #wta-leaderboard-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .wta-board-row {
            display: grid;
            grid-template-columns: 32px minmax(0,1fr) 64px;
            align-items: center;
            gap: 8px;
            min-height: 54px;
            padding: 7px 10px;
            border: 1px solid rgba(255,255,255,.08);
            border-radius: 15px;
            background: rgba(255,255,255,.045);
            transition: transform .45s cubic-bezier(.2,.8,.2,1),
                        background .25s ease,
                        box-shadow .25s ease;
        }

        .wta-board-row.me {
            border-color: rgba(255,59,69,.32);
            box-shadow: inset 3px 0 0 #ff3b45;
        }

        .wta-board-rank {
            display: grid;
            place-items: center;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: rgba(255,255,255,.08);
            font-size: .72rem;
            font-weight: 950;
        }

        .wta-board-name {
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 850;
        }

        .wta-board-score-wrap {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: flex-end;
            min-width: 64px;
        }

        .wta-board-score {
            position: relative;
            z-index: 1;
            text-align: right;
            font-size: 1.05rem;
            font-weight: 950;
            font-variant-numeric: tabular-nums;
            transition: transform .25s ease;
        }

        .wta-board-score.bump {
            animation: wtaScoreBump .45s ease;
        }

        .wta-score-change {
            position: absolute;
            right: 0;
            top: 50%;
            z-index: 2;
            pointer-events: none;
            white-space: nowrap;
            font-size: .82rem;
            line-height: 1;
            font-weight: 1000;
            font-variant-numeric: tabular-nums;
            opacity: 0;
            transform: translate(0, -50%) scale(.75);
            animation: wtaScoreChange .95s cubic-bezier(.2,.75,.25,1) forwards;
        }

        .wta-score-change.positive {
            color: #22c55e;
            text-shadow: 0 0 12px rgba(34,197,94,.38);
        }

        .wta-score-change.negative {
            color: #ef4444;
            text-shadow: 0 0 12px rgba(239,68,68,.38);
        }

        @keyframes wtaScoreBump {
            45% { transform: scale(1.22); }
        }

        @keyframes wtaScoreChange {
            0% {
                opacity: 0;
                transform: translate(0, -50%) scale(.75);
            }
            18% {
                opacity: 1;
                transform: translate(0, -50%) scale(1.08);
            }
            65% {
                opacity: 1;
                transform: translate(0, -105%) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(0, -145%) scale(.94);
            }
        }

        .wta-board-score.positive { color: #22c55e; }
        .wta-board-score.negative { color: #ef4444; }

        .wta-board-empty {
            padding: 18px 10px;
            text-align: center;
            opacity: .6;
            font-weight: 750;
        }

        #wta-reveal-phase {
            width: min(850px, 100%);
            margin: 0 auto;
            text-align: center;
        }

        .wta-reveal-card {
            padding: clamp(30px, 6vw, 58px) 24px;
            border: 1px solid rgba(255,255,255,.10);
            border-radius: 28px;
            background: rgba(255,255,255,.045);
            box-shadow: 0 20px 60px rgba(0,0,0,.2);
        }

        .wta-reveal-trophy {
            font-size: 4rem;
            animation: wtaTrophyPop .7s cubic-bezier(.2,1.3,.3,1) both;
        }

        @keyframes wtaTrophyPop {
            from { transform: scale(.5) rotate(-12deg); opacity: 0; }
            to { transform: scale(1) rotate(0); opacity: 1; }
        }

        .wta-reveal-card h1 { margin: 8px 0 8px; }
        .wta-winner-points { margin: 0 0 22px; opacity: .72; font-weight: 800; }

        .wta-award {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 16px;
            border-radius: 999px;
            background: rgba(34,197,94,.12);
            border: 1px solid rgba(34,197,94,.28);
            color: #22c55e;
            font-weight: 950;
        }

        @media (max-width: 850px) {
            .wta-shell { grid-template-columns: 1fr; }
            .wta-mini-board { order: -1; }
            .wta-main { min-height: auto; }
        }

        @media (max-width: 560px) {
            .wta-main { padding: 18px 12px; border-radius: 20px; }
            .wta-mini-board { padding: 12px; border-radius: 20px; }
            .wta-heading-row { align-items: center; }
            .wta-timer { min-width: 76px; padding: 8px 10px; }
            #wta-timer { font-size: 1.5rem; }
            .wta-question-meta { margin-top: 25px; }
            #wta-question-text { margin-bottom: 20px; }
            #wta-answer-buttons .answer-button { min-height: 58px; }
            .wta-board-row { min-height: 48px; }
        }

        body:not(.dark-mode) .wta-main,
        body:not(.dark-mode) .wta-mini-board,
        body:not(.dark-mode) .wta-reveal-card {
            background: rgba(255,255,255,.92);
            border-color: rgba(0,0,0,.09);
            box-shadow: 0 18px 50px rgba(0,0,0,.08);
        }

        body:not(.dark-mode) .wta-board-row {
            background: rgba(0,0,0,.035);
            border-color: rgba(0,0,0,.08);
        }

        /* WTA visual polish: large question + always-visible 2x2 answer grid */
        .wta-main { min-height: 700px; padding: 30px 34px 34px; }
        .wta-heading-row { align-items: flex-start; }
        .wta-eyebrow { margin: 0; font-size: .82rem; letter-spacing: .16em; }
        .wta-timer { min-width: 118px; padding: 14px 18px; border-radius: 18px; }
        .wta-timer-label { font-size: .68rem; }
        #wta-timer { font-size: 2.65rem; font-weight: 950; }
        .wta-question-meta { margin: 30px 0 14px; font-size: .82rem; letter-spacing: .13em; opacity: .62; }
        #wta-question-text { display:block; max-width: 1000px; margin: 0 0 24px; font-size: clamp(2.7rem, 4.8vw, 4.35rem); line-height: 1.04; font-weight: 950; letter-spacing: -.035em; text-align: left; }
        .wta-question-category { margin: 0 0 28px; padding: 8px 14px; font-size: .72rem; letter-spacing: .12em; }
        #wta-answer-buttons { width:100%; max-width:none; display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:18px; margin:0; }
        #wta-answer-buttons .answer-button { min-height: 132px; padding: 22px 28px; border: 2px solid rgba(255,59,69,.45); border-radius: 18px; background: rgba(255,255,255,.025); color: #fff; font-size: clamp(1.35rem, 2vw, 1.72rem); line-height:1.15; font-weight:900; box-shadow: 0 0 0 1px rgba(255,59,69,.05), 0 8px 28px rgba(0,0,0,.16); transition: transform .14s ease, border-color .16s ease, background .16s ease, box-shadow .16s ease; }
#wta-answer-buttons .answer-button:hover:not(:disabled) { transform: translateY(-3px); border-color:#ff2438; box-shadow: 0 0 0 1px rgba(255,36,56,.16), 0 10px 30px rgba(0,0,0,.24), 0 0 22px rgba(255,36,56,.12); }
        body.dark-mode #wta-answer-buttons .answer-button { background: rgba(255,255,255,.02); color:#fff; border-color:rgba(255,36,56,.5); }
        body:not(.dark-mode) #wta-answer-buttons .answer-button { color:#171717; background:rgba(255,255,255,.72); border-color:rgba(181,27,37,.35); }
        @media(max-width:850px) { .wta-main { padding:26px; } #wta-question-text { font-size:clamp(2.35rem,7vw,3.5rem); } }
        @media(max-width:560px) { .wta-main{padding:20px 14px 22px;} .wta-heading-row{gap:12px;} .wta-eyebrow{font-size:.7rem;} .wta-timer{min-width:84px;padding:9px 11px;} #wta-timer{font-size:1.8rem;} .wta-question-meta{margin:24px 0 12px;font-size:.68rem;} #wta-question-text{font-size:clamp(2rem,9vw,2.8rem);line-height:1.06;margin-bottom:18px;} .wta-question-category{margin-bottom:18px;} #wta-answer-buttons{gap:10px;} #wta-answer-buttons .answer-button{min-height:92px;padding:16px 10px;font-size:clamp(1.05rem,4.5vw,1.35rem);border-radius:15px;} }
    `;
    document.head.appendChild(style);
}

async function startWtaRound() {
    if (!isHost || !game) return;

    // WTA has its own answer history because players can answer many
    // questions during one round. Clear only this round's old reservations.
    const { error: deleteError } = await supabaseClient
        .from("wta_answers")
        .delete()
        .eq("game_id", game.id)
        .eq("round", game.round);

    if (deleteError) {
        console.error("Could not reset WTA round:", deleteError);
        return;
    }

    wtaRoundInitialized = false;
    wtaRoundFinished = false;
    wtaCurrentRowId = null;
    wtaCurrentQuestionNumber = 0;
    wtaLeaderboardState = {};
    answerSubmitted = false;
    selectedQuestion = null;
    renderedQuestionId = null;

    // A small shared pre-start window gives every browser time to render
    // the first personal question before the 30-second clock begins.
    const startAt = new Date(Date.now() + 1500);

    const { error } = await supabaseClient
        .from("games")
        .update({
            phase: "wta-question",
            current_round_type: "wta",
            current_player_id: null,
            current_difficulty: null,
            current_question_id: null,
            current_answer: null,
            question_started_at: startAt.toISOString(),
            wta_awarded: false
        })
        .eq("id", game.id)
        .eq("phase", "round-intro");

    if (error) {
        console.error("Could not start Winner Takes All:", error);
        return;
    }

    game = {
        ...game,
        phase: "wta-question",
        current_round_type: "wta",
        current_player_id: null,
        current_difficulty: null,
        current_question_id: null,
        current_answer: null,
        question_started_at: startAt.toISOString(),
        wta_awarded: false
    };

    updateGameState();
}

function getWtaTiming() {
    const startMs = new Date(game?.question_started_at || 0).getTime();
    const durationMs = 30000;
    return { startMs, endMs: startMs + durationMs, durationMs };
}

function getWtaQuestions() {
    const allQuestions = Array.isArray(window.QUESTIONS) ? window.QUESTIONS :
        (typeof QUESTIONS !== "undefined" ? QUESTIONS : []);

    // Winner Takes All uses the Easy + Medium pools only.
    // Hard questions are deliberately excluded from this round.
    return allQuestions.filter(question =>
        question && (question.difficulty === "easy" || question.difficulty === "medium")
    );
}

async function getUsedWtaQuestionIds() {
    const { data, error } = await supabaseClient
        .from("wta_answers")
        .select("question_id")
        .eq("game_id", game.id)
        .eq("round", game.round);

    if (error) {
        console.error("Could not load used WTA questions:", error);
        return null;
    }

    return new Set((data || []).map(row => row.question_id).filter(Boolean));
}

async function reserveWtaQuestion() {
    if (!game || !myPlayerId) return null;

    const { data: currentRows, error: currentError } = await supabaseClient
        .from("wta_answers")
        .select("id,question_number,question_id,answer,correct,points_awarded")
        .eq("game_id", game.id)
        .eq("round", game.round)
        .eq("player_id", myPlayerId)
        .is("answer", null)
        .order("question_number", { ascending: false })
        .limit(1);

    if (currentError) {
        console.error("Could not load current WTA question:", currentError);
        return null;
    }

    if (currentRows?.length) {
        const row = currentRows[0];
        const question = getWtaQuestions().find(q => q.id === row.question_id);
        if (question) {
            return { row, question };
        }
    }

    const usedIds = await getUsedWtaQuestionIds();
    if (!usedIds) return null;

    const candidates = getWtaQuestions().filter(q => !usedIds.has(q.id));
    if (!candidates.length) return null;

    // Shuffle candidates so WTA does not repeatedly start from the same bank position.
    shuffleArray(candidates);

    let nextNumber = 1;
    const { data: latestPlayerRows } = await supabaseClient
        .from("wta_answers")
        .select("question_number")
        .eq("game_id", game.id)
        .eq("round", game.round)
        .eq("player_id", myPlayerId)
        .order("question_number", { ascending: false })
        .limit(1);

    if (latestPlayerRows?.length) {
        nextNumber = Number(latestPlayerRows[0].question_number || 0) + 1;
    }

    for (const question of candidates) {
        const { data: inserted, error } = await supabaseClient
            .from("wta_answers")
            .insert({
                game_id: game.id,
                player_id: myPlayerId,
                round: game.round,
                question_number: nextNumber,
                question_id: question.id,
                answer: null,
                correct: null,
                points_awarded: 0,
                answered_at: null
            })
            .select("id,question_number,question_id,answer,correct,points_awarded")
            .single();

        if (!error && inserted) {
            return { row: inserted, question };
        }

        // Another player may have reserved this question milliseconds earlier.
        // Try the next candidate instead of showing duplicate questions.
        if (error) {
            const message = String(error.message || "").toLowerCase();
            if (!message.includes("duplicate") && !message.includes("unique")) {
                console.warn("Could not reserve WTA question:", error);
            }
        }
    }

    return null;
}

async function loadWtaQuestionForMe() {
    const reserved = await reserveWtaQuestion();
    if (!reserved) {
        console.error("Could not reserve a WTA question.");
        return false;
    }

    wtaCurrentRowId = reserved.row.id;
    wtaCurrentQuestionNumber = Number(reserved.row.question_number || 1);
    selectedQuestion = reserved.question;
    answerSubmitted = false;
    renderedQuestionId = reserved.question.id;
    return true;
}

function renderWtaQuestion() {
    const questionText = document.getElementById("wta-question-text");
    const meta = document.getElementById("wta-question-meta");
    const answers = document.getElementById("wta-answer-buttons");
    const feedback = document.getElementById("wta-feedback");

    if (!selectedQuestion || !answers) return;

    if (questionText) questionText.textContent = selectedQuestion.question;
    if (meta) meta.textContent = `QUESTION ${wtaCurrentQuestionNumber} • WTA POINTS ONLY`;
    const category = document.getElementById("wta-question-category");
    if (category) {
        category.textContent = String(selectedQuestion.category || "General Knowledge").toUpperCase();
    }
    if (feedback) {
        feedback.textContent = "";
        feedback.className = "wta-feedback";
    }

    answers.innerHTML = "";
    const choices = shuffleArray([...selectedQuestion.answers]);

    choices.forEach(answer => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "answer-button";
        button.textContent = answer;
        button.dataset.answer = answer;
        button.addEventListener("click", () => submitWtaAnswer(answer));
        answers.appendChild(button);
    });

    updateWtaAnswerControls();
}

function updateWtaAnswerControls() {
    const timing = getWtaTiming();
    const open = game?.phase === "wta-question" &&
        timing.startMs > 0 &&
        Date.now() >= timing.startMs &&
        Date.now() < timing.endMs &&
        !answerSubmitted;

    document.querySelectorAll("#wta-answer-buttons .answer-button").forEach(button => {
        button.disabled = !open;
    });
}

function startWtaTimer() {
    if (wtaTimerInterval) clearInterval(wtaTimerInterval);

    const timer = document.getElementById("wta-timer");
    const timing = getWtaTiming();
    if (!timer || !timing.startMs) return;

    const tick = () => {
        const now = Date.now();
        const remaining = Math.max(0, Math.ceil((timing.endMs - now) / 1000));
        const beforeStart = now < timing.startMs;

        timer.textContent = beforeStart ? "30" : String(remaining);
        timer.classList.toggle("wta-danger", !beforeStart && remaining <= 5);
        updateWtaAnswerControls();

        if (now >= timing.endMs) {
            clearInterval(wtaTimerInterval);
            wtaTimerInterval = null;
            if (isHost) finishWtaRound();
        }
    };

    tick();
    wtaTimerInterval = setInterval(tick, 100);
}

async function handleWtaQuestionPhase() {
    ensureWtaStyles();

    const timer = document.getElementById("wta-timer");
    if (timer && !wtaTimerInterval) startWtaTimer();

    renderWtaLeaderboard();

    if (wtaRoundInitialized) {
        updateWtaAnswerControls();
        return;
    }

    wtaRoundInitialized = true;
    wtaRoundFinished = false;
    wtaQuestionLoading = true;

    const loaded = await loadWtaQuestionForMe();
    wtaQuestionLoading = false;

    if (!loaded) {
        const questionText = document.getElementById("wta-question-text");
        if (questionText) questionText.textContent = "Loading your question…";
        return;
    }

    renderWtaQuestion();
}

async function submitWtaAnswer(answer) {
    if (answerSubmitted || !game || game.phase !== "wta-question") return;
    if (!selectedQuestion || !wtaCurrentRowId) return;

    const timing = getWtaTiming();
    const now = Date.now();
    if (now < timing.startMs || now >= timing.endMs) return;

    answerSubmitted = true;
    updateWtaAnswerControls();

    const correct = answer === selectedQuestion.correct;
    const wtaPoints = correct ? 1 : -1;
    const answeredAt = new Date(now).toISOString();

    document.querySelectorAll("#wta-answer-buttons .answer-button").forEach(button => {
        button.disabled = true;
        button.classList.remove("wta-selected", "wta-correct", "wta-wrong");
        if (button.dataset.answer === answer) {
            button.classList.add(correct ? "wta-correct" : "wta-wrong");
        }
    });

    const feedback = document.getElementById("wta-feedback");
    if (feedback) {
        feedback.textContent = correct ? "+1 WTA POINT" : "−1 WTA POINT";
        feedback.className = `wta-feedback ${correct ? "good" : "bad"}`;
    }

    const { error } = await supabaseClient
        .from("wta_answers")
        .update({
            answer,
            correct,
            points_awarded: wtaPoints,
            answered_at: answeredAt
        })
        .eq("id", wtaCurrentRowId)
        .eq("player_id", myPlayerId)
        .eq("game_id", game.id);

    if (error) {
        console.error("Could not save WTA answer:", error);
        answerSubmitted = false;
        updateWtaAnswerControls();
        return;
    }

    renderWtaLeaderboard();

    // Give the feedback a short flash, then immediately load the next
    // question while the shared 30-second clock continues.
    setTimeout(async () => {
        if (!game || game.phase !== "wta-question") return;
        if (Date.now() >= getWtaTiming().endMs) return;
        if (wtaQuestionLoading) return;

        wtaQuestionLoading = true;
        const loaded = await loadWtaQuestionForMe();
        wtaQuestionLoading = false;

        if (!loaded) return;
        renderWtaQuestion();
    }, 280);
}

async function renderWtaLeaderboard() {
    const container = document.getElementById("wta-leaderboard-list");
    if (!container || !game) return;

    const { data, error } = await supabaseClient
        .from("wta_answers")
        .select("player_id,points_awarded")
        .eq("game_id", game.id)
        .eq("round", game.round);

    if (error) {
        console.error("Could not load WTA leaderboard:", error);
        return;
    }

    const totals = {};
    players.forEach(player => { totals[player.id] = 0; });
    (data || []).forEach(row => {
        totals[row.player_id] = (totals[row.player_id] || 0) + Number(row.points_awarded || 0);
    });

    const sorted = [...players].sort((a, b) => {
        const difference = Number(totals[b.id] || 0) - Number(totals[a.id] || 0);
        if (difference !== 0) return difference;
        return String(a.joined_at || "").localeCompare(String(b.joined_at || ""));
    });

    const oldPositions = {};
    container.querySelectorAll(".wta-board-row[data-player-id]").forEach(row => {
        oldPositions[row.dataset.playerId] = row.getBoundingClientRect().top;
    });

    const previous = wtaLeaderboardState || {};
    container.innerHTML = "";

    sorted.forEach((player, index) => {
        const score = Number(totals[player.id] || 0);
        const previousPlayer = previous[player.id];
        const row = document.createElement("div");
        row.className = "wta-board-row";
        row.dataset.playerId = player.id;
        if (player.id === myPlayerId) row.classList.add("me");

        const scoreClass = score > 0 ? "positive" : score < 0 ? "negative" : "";
        const oldScore = previousPlayer ? Number(previousPlayer.score || 0) : score;
        const scoreDelta = previousPlayer ? score - oldScore : 0;
        const deltaClass = scoreDelta > 0 ? "positive" : scoreDelta < 0 ? "negative" : "";
        const deltaText = scoreDelta > 0 ? `+${scoreDelta}` : scoreDelta < 0 ? `${scoreDelta}` : "";

        row.innerHTML = `
            <div class="wta-board-rank">${index + 1}</div>
            <div class="wta-board-name">${escapeHtml(player.name)}</div>
            <div class="wta-board-score-wrap">
                <div class="wta-board-score ${scoreClass}" data-score="${score}">${score > 0 ? "+" : ""}${score}</div>
                ${deltaText ? `<span class="wta-score-change ${deltaClass}" aria-label="${escapeHtml(deltaText)} WTA points">${escapeHtml(deltaText)}</span>` : ""}
            </div>
        `;
        container.appendChild(row);

        const oldTop = oldPositions[player.id];
        if (typeof oldTop === "number") {
            const newTop = row.getBoundingClientRect().top;
            const delta = oldTop - newTop;
            if (Math.abs(delta) > 1) {
                row.style.transform = `translateY(${delta}px)`;
                requestAnimationFrame(() => {
                    row.style.transform = "translateY(0)";
                });
            }
        }

        const scoreElement = row.querySelector(".wta-board-score");
        if (previousPlayer && oldScore !== score && scoreElement) {
            scoreElement.classList.add("bump");
            setTimeout(() => scoreElement.classList.remove("bump"), 450);
        }
    });

    wtaLeaderboardState = {};
    sorted.forEach((player, index) => {
        wtaLeaderboardState[player.id] = {
            rank: index + 1,
            score: Number(totals[player.id] || 0)
        };
    });
}

async function getWtaTotals() {
    const { data, error } = await supabaseClient
        .from("wta_answers")
        .select("player_id,points_awarded")
        .eq("game_id", game.id)
        .eq("round", game.round);

    if (error) {
        console.error("Could not load WTA totals:", error);
        return null;
    }

    const totals = {};
    players.forEach(player => { totals[player.id] = 0; });
    (data || []).forEach(row => {
        totals[row.player_id] = (totals[row.player_id] || 0) + Number(row.points_awarded || 0);
    });
    return totals;
}

async function finishWtaRound() {
    if (!isHost || wtaRoundFinished || !game) return;
    if (game.phase !== "wta-question") return;

    wtaRoundFinished = true;
    if (wtaTimerInterval) {
        clearInterval(wtaTimerInterval);
        wtaTimerInterval = null;
    }

    const totals = await getWtaTotals();
    if (!totals) {
        wtaRoundFinished = false;
        return;
    }

    const maxScore = players.length
        ? Math.max(...players.map(player => Number(totals[player.id] || 0)))
        : 0;

    const winners = players.filter(player => Number(totals[player.id] || 0) === maxScore);

    // Award 6 real quiz points to the winner. If there is a tie, all tied
    // players receive the 6-point award rather than resolving it arbitrarily.
    if (!game.wta_awarded) {
        for (const winner of winners) {
            const freshPlayer = players.find(player => player.id === winner.id) || winner;
            const newPoints = Number(freshPlayer.points || 0) + 6;
            const { error } = await supabaseClient
                .from("players")
                .update({ points: newPoints })
                .eq("id", winner.id)
                .eq("game_id", game.id);

            if (error) {
                console.error("Could not award WTA points:", error);
            }
        }
    }

    const { error: finishError } = await supabaseClient
        .from("games")
        .update({
            phase: "wta-reveal",
            current_player_id: null,
            current_difficulty: null,
            current_question_id: null,
            current_answer: null,
            wta_awarded: true
        })
        .eq("id", game.id)
        .eq("phase", "wta-question");

    if (finishError) {
        console.error("Could not finish WTA round:", finishError);
        wtaRoundFinished = false;
    }
}

async function handleWtaRevealPhase() {
    ensureWtaStyles();
    if (wtaTimerInterval) {
        clearInterval(wtaTimerInterval);
        wtaTimerInterval = null;
    }

    const totals = await getWtaTotals();
    if (!totals) return;

    const maxScore = players.length
        ? Math.max(...players.map(player => Number(totals[player.id] || 0)))
        : 0;
    const winners = players.filter(player => Number(totals[player.id] || 0) === maxScore);

    const phase = document.getElementById("wta-reveal-phase");
    if (!phase) return;

    const winnerNames = winners.map(player => escapeHtml(player.name)).join(" & ");
    phase.innerHTML = `
        <div class="wta-reveal-card">
            <div class="wta-reveal-trophy">🏆</div>
            <p class="eyebrow">WINNER TAKES ALL</p>
            <h1>${winnerNames || "No winner"}</h1>
            <p class="wta-winner-points">${maxScore} WTA point${maxScore === 1 ? "" : "s"}</p>
            <div class="wta-award">+6 REAL QUIZ POINTS</div>
        </div>
    `;

    if (wtaRevealTimeout) clearTimeout(wtaRevealTimeout);
    if (isHost) {
        wtaRevealTimeout = setTimeout(async () => {
            if (!game || game.phase !== "wta-reveal") return;
            await supabaseClient
                .from("games")
                .update({
                    phase: "leaderboard",
                    current_answer: null,
                    current_question_id: null,
                    question_started_at: null
                })
                .eq("id", game.id)
                .eq("phase", "wta-reveal");
        }, 4000);
    }
}

// ============================================================
// SPEED ROUND
// ============================================================

function getSpeedTiming() {
    const startMs = new Date(game?.question_started_at || 0).getTime();
    const durationMs = 10000;
    return { startMs, endMs: startMs + durationMs, durationMs };
}

function getSpeedPoints(elapsedMs) {
    // Speed Round scoring is doubled while keeping the same timing bands.
    if (elapsedMs <= 4000) return 6;
    if (elapsedMs <= 7000) return 4;
    if (elapsedMs <= 10000) return 2;
    return 0;
}

async function startSpeedRound() {
    if (!isHost || !game) return;

    // The Speed question is prepared during beginRound(), before the intro.
    // Do not perform another question-bank/database lookup here. This keeps
    // the shared start timestamp on the fast path.
    const speedQuestion =
        (selectedQuestion && selectedQuestion.id === game.current_question_id)
            ? selectedQuestion
            : getSpeedQuestionById(game.current_question_id);

    if (!speedQuestion) {
        console.error("Could not load prepared speed question:", game.current_question_id);
        return;
    }

    selectedQuestion = speedQuestion;
    renderedQuestionId = null;
    answerSubmitted = false;
    localSpeedSelection = null;
    speedLocalStartPerf = null;
    speedRoundFinished = false;
    speedDeadlineHandled = false;

    const startAt = new Date(Date.now() + 1500);

    const { error: speedStartError } = await supabaseClient
        .from("games")
        .update({
            phase: "question",
            current_round_type: "speed",
            current_player_id: null,
            current_difficulty: null,
            current_question_id: speedQuestion.id,
            current_answer: null,
            question_started_at: startAt.toISOString()
        })
        .eq("id", game.id);

    if (speedStartError) {
        console.error("Could not start speed round:", speedStartError);
        return;
    }

    // Keep the host's local state in sync immediately, just like the classic
    // question flow. This prevents the round-intro state from getting stuck
    // while waiting for Realtime.
    game = {
        ...game,
        phase: "question",
        current_round_type: "speed",
        current_player_id: null,
        current_difficulty: null,
        current_question_id: speedQuestion.id,
        current_answer: null,
        question_started_at: startAt.toISOString()
    };

    updateGameState();
}

async function handleSpeedQuestionPhase() {
    const questionId = game.current_question_id;

    if (renderedQuestionId === questionId && selectedQuestion?.id === questionId) {
        updateSpeedAnswerControls();
        return;
    }

    const speedQuestion = getSpeedQuestionById(questionId);
    if (!speedQuestion) {
        console.error("Speed question not found:", questionId);
        return;
    }

    selectedQuestion = speedQuestion;
    renderedQuestionId = questionId;
    answerSubmitted = false;
    localSpeedSelection = null;
    speedRoundFinished = false;
    speedDeadlineHandled = false;
    speedFinishInProgress = false;

    renderQuestion();
    startSpeedTimer();
    startSpeedAnswerWatcher();
}

function updateSpeedAnswerControls() {
    const timing = getSpeedTiming();
    const now = Date.now();
    const open = game?.phase === "question" &&
        timing.startMs > 0 &&
        now >= timing.startMs &&
        now < timing.endMs &&
        !answerSubmitted;

    document.querySelectorAll(".answer-button").forEach(button => {
        button.disabled = !open;
    });
}

function startSpeedTimer() {
    clearInterval(timerInterval);
    if (speedPreStartTimeout) clearTimeout(speedPreStartTimeout);
    if (speedEndTimeout) clearTimeout(speedEndTimeout);
    speedPreStartTimeout = null;
    speedEndTimeout = null;

    const timer = document.getElementById("timer");
    const timing = getSpeedTiming();
    if (!timing.startMs) return;

    const tick = () => {
        if (!game || game.phase !== "question" || game.current_round_type !== "speed") {
            clearInterval(timerInterval);
            timerInterval = null;
            return;
        }

        const now = Date.now();
        const beforeStart = now < timing.startMs;
        const remaining = Math.max(0, Math.ceil((timing.endMs - now) / 1000));

        if (timer) timer.textContent = beforeStart ? "10" : String(remaining);
        updateSpeedAnswerControls();

        if (now >= timing.endMs) {
            clearInterval(timerInterval);
            timerInterval = null;
            if (speedEndTimeout) {
                clearTimeout(speedEndTimeout);
                speedEndTimeout = null;
            }
            finishSpeedRoundIfNeeded();
        }
    };

    tick();

    const preStartDelay = Math.max(0, timing.startMs - Date.now());
    speedPreStartTimeout = setTimeout(() => {
        speedPreStartTimeout = null;
        updateSpeedAnswerControls();
    }, preStartDelay);

    // Explicit deadline timeout in addition to the 100ms display ticker.
    // This makes the round-ending event independent of a particular tick
    // landing exactly on the 10-second boundary.
    const endDelay = Math.max(0, timing.endMs - Date.now()) + 25;
    speedEndTimeout = setTimeout(() => {
        speedEndTimeout = null;
        clearInterval(timerInterval);
        timerInterval = null;
        finishSpeedRoundIfNeeded();
    }, endDelay);

    timerInterval = setInterval(tick, 100);
}

function startSpeedAnswerWatcher() {
    if (speedAnswerWatcher) clearInterval(speedAnswerWatcher);
    if (!isHost) return;

    speedAnswerWatcher = setInterval(() => {
        if (!game || game.phase !== "question" || game.current_round_type !== "speed") {
            clearInterval(speedAnswerWatcher);
            speedAnswerWatcher = null;
            return;
        }
        finishSpeedRoundIfNeeded();
    }, 100);
}

async function finishSpeedRoundIfNeeded() {
    if (!isHost || speedRoundFinished || speedDeadlineHandled || speedFinishInProgress || !game) return;
    speedFinishInProgress = true;
    if (game.phase !== "question" || game.current_round_type !== "speed") {
        speedFinishInProgress = false;
        return;
    }

    const timing = getSpeedTiming();
    const now = Date.now();

    // Always read the authoritative player list before deciding whether
    // everyone has answered. The local `players` array can briefly be stale
    // when a player has just joined or realtime updates are delayed.
    const { data: latestPlayers, error: playersError } = await supabaseClient
        .from("players")
        .select("id")
        .eq("game_id", game.id);

    if (playersError) {
        console.error("Could not check speed players:", playersError);
        speedFinishInProgress = false;
        return;
    }

    const { data: latestAnswers, error } = await supabaseClient
        .from("answers")
        .select("player_id")
        .eq("game_id", game.id)
        .eq("round", game.round);

    if (error) {
        console.error("Could not check speed answers:", error);
        speedFinishInProgress = false;
        return;
    }

    const authoritativePlayers = latestPlayers || [];
    const answeredPlayers = new Set((latestAnswers || []).map(row => row.player_id));
    const everyoneAnswered = authoritativePlayers.length > 0 &&
        authoritativePlayers.every(player => answeredPlayers.has(player.id));
    const expired = timing.endMs > 0 && now >= timing.endMs;

    if (!everyoneAnswered && !expired) {
        // The Speed round is still open. Release the Speed completion lock so
        // the next watcher tick (or the next player answer) can check again.
        speedFinishInProgress = false;
        return;
    }

    // At the deadline, explicitly record every player who never answered.
    // Their response time is the full 10 seconds and they receive 0 points.
    if (expired && players.length > 0) {
        const timeoutTimestamp = new Date(timing.endMs).toISOString();
        const missingPlayers = authoritativePlayers.filter(player => !answeredPlayers.has(player.id));

        for (const player of missingPlayers) {
            const { error: timeoutError } = await supabaseClient
                .from("answers")
                .upsert({
                    game_id: game.id,
                    player_id: player.id,
                    round: game.round,
                    question_id: selectedQuestion?.id,
                    difficulty: "speed",
                    answer: "",
                    correct: false,
                    points_awarded: 0,
                    answered_at: timeoutTimestamp
                }, { onConflict: "player_id,round" });

            if (timeoutError) {
                console.error("Could not record speed timeout:", timeoutError);
            }
        }
    }

    // --------------------------------------------------------
    // SPEED SCORING BY ANSWER ORDER
    // --------------------------------------------------------
    // Only correct answers can earn points. Correct answers are ordered by
    // the timestamp saved when each player pressed their answer.
    // 1st correct = 6, 2nd = 4, 3rd = 2, all remaining correct = 1.
    // This is calculated by the host once the round is complete so every
    // player receives the same result.
    const { data: completedSpeedAnswers, error: completedSpeedError } =
        await supabaseClient
            .from("answers")
            .select("player_id,answered_at,correct,points_awarded")
            .eq("game_id", game.id)
            .eq("round", game.round)
            .eq("difficulty", "speed");

    if (completedSpeedError) {
        console.error("Could not load completed speed answers:", completedSpeedError);
        speedDeadlineHandled = false;
        speedRoundFinished = false;
        speedFinishInProgress = false;
        return;
    }

    const correctSpeedAnswers = (completedSpeedAnswers || [])
        .filter(row => row.correct && row.answered_at)
        .sort((a, b) => new Date(a.answered_at).getTime() - new Date(b.answered_at).getTime());

    const speedPointsByPlayer = new Map();
    correctSpeedAnswers.forEach((row, index) => {
        const award = index === 0 ? 6 : index === 1 ? 4 : index === 2 ? 2 : 1;
        speedPointsByPlayer.set(row.player_id, award);
    });

    // Update the answer rows with their final awarded points so the response
    // time display and leaderboard animations can use the same source of truth.
    for (const row of (completedSpeedAnswers || [])) {
        const awarded = speedPointsByPlayer.get(row.player_id) || 0;
        if (Number(row.points_awarded || 0) !== awarded) {
            const { error: rowUpdateError } = await supabaseClient
                .from("answers")
                .update({ points_awarded: awarded })
                .eq("game_id", game.id)
                .eq("round", game.round)
                .eq("player_id", row.player_id);

            if (rowUpdateError) {
                console.error("Could not update speed points:", rowUpdateError);
            }
        }
    }

    // Add the final speed award to each player's real quiz score exactly once.
    // Refresh the local player records first so score updates use current values.
    const { data: scorePlayers, error: scorePlayersError } = await supabaseClient
        .from("players")
        .select("*")
        .eq("game_id", game.id)
        .order("joined_at", { ascending: true });

    if (scorePlayersError) {
        console.error("Could not load players for speed scoring:", scorePlayersError);
        speedFinishInProgress = false;
        return;
    }

    players = scorePlayers || players;

    for (const player of players) {
        const award = speedPointsByPlayer.get(player.id) || 0;
        if (!award) continue;

        const { error: playerScoreError } = await supabaseClient
            .from("players")
            .update({ points: (player.points || 0) + award })
            .eq("id", player.id);

        if (playerScoreError) {
            console.error("Could not award speed points:", playerScoreError);
        } else {
            player.points = (player.points || 0) + award;
        }
    }

    speedDeadlineHandled = true;
    speedRoundFinished = true;
    clearInterval(timerInterval);
    timerInterval = null;
    if (speedAnswerWatcher) {
        clearInterval(speedAnswerWatcher);
        speedAnswerWatcher = null;
    }
    if (speedEndTimeout) {
        clearTimeout(speedEndTimeout);
        speedEndTimeout = null;
    }

    const { error: revealError } = await supabaseClient
        .from("games")
        .update({
            phase: "speed-reveal",
            current_answer: selectedQuestion?.correct || null,
            current_player_id: null,
            current_difficulty: null
        })
        .eq("id", game.id)
        .eq("phase", "question");

    if (revealError) console.error("Could not reveal speed answer:", revealError);
}

async function renderSpeedResponseTimes() {
    const container = document.getElementById("speed-response-times");
    if (!container || !game) return;

    container.innerHTML = `
        <div class="speed-times-loading">Loading response times…</div>
    `;

    const { data: answerRows, error } = await supabaseClient
        .from("answers")
        .select("player_id,answered_at,correct,points_awarded,answer")
        .eq("game_id", game.id)
        .eq("round", game.round);

    if (error) {
        console.error("Could not load speed response times:", error);
        container.innerHTML = `<div class="speed-times-loading">Response times unavailable.</div>`;
        return;
    }

    const startMs = new Date(game.question_started_at || 0).getTime();
    // Calculate the final Speed points from answer order locally as well as
    // reading the stored value. This makes the display reliable even if the
    // reveal reaches a client before the points_awarded update has propagated
    // through Realtime/PostgREST. The database value remains the source of
    // record, but the UI no longer briefly shows 0 for an answer that earned
    // points.
    const correctRows = (answerRows || [])
        .filter(row => row.correct && row.answered_at)
        .sort((a, b) => new Date(a.answered_at).getTime() - new Date(b.answered_at).getTime());

    const calculatedPoints = new Map();
    correctRows.forEach((row, index) => {
        calculatedPoints.set(
            row.player_id,
            index === 0 ? 6 : index === 1 ? 4 : index === 2 ? 2 : 1
        );
    });

    const rows = players.map(player => {
        const answerRow = (answerRows || []).find(row => row.player_id === player.id);
        let elapsedMs = null;

        if (answerRow?.answered_at && startMs) {
            elapsedMs = Math.max(0, Math.min(10000,
                new Date(answerRow.answered_at).getTime() - startMs
            ));
        }

        const earnedPoints = calculatedPoints.get(player.id) || 0;

        return {
            player,
            answerRow,
            elapsedMs,
            answered: Boolean(answerRow?.answer),
            // Prefer the calculated final award so the reveal UI cannot show
            // a stale 0 while the database update is still propagating.
            points: earnedPoints,
            correct: Boolean(answerRow?.correct)
        };
    });

    rows.sort((a, b) => {
        if (a.elapsedMs === null && b.elapsedMs === null) return 0;
        if (a.elapsedMs === null) return 1;
        if (b.elapsedMs === null) return -1;
        return a.elapsedMs - b.elapsedMs;
    });

    container.innerHTML = `
        <div class="speed-times-header">
            <span>PLAYER</span>
            <span>ANSWER TIME</span>
            <span>POINTS</span>
        </div>
    `;

    rows.forEach((row, index) => {
        const timeText = row.elapsedMs === null
            ? "No answer"
            : `${(row.elapsedMs / 1000).toFixed(2)}s`;
        const status = row.elapsedMs === null
            ? "speed-time-timeout"
            : row.correct
                ? "speed-time-correct"
                : "speed-time-wrong";

        const item = document.createElement("div");
        item.className = `speed-time-row ${status}`;
        item.innerHTML = `
            <div class="speed-time-player">
                <span class="speed-time-rank">${index + 1}</span>
                <span>${escapeHtml(row.player.name)}</span>
            </div>
            <strong class="speed-time-value">${timeText}</strong>
            <strong class="speed-time-points">${row.points > 0 ? `+${row.points}` : "0"}</strong>
        `;
        container.appendChild(item);
    });
}


function handleSpeedRevealPhase() {
    clearInterval(timerInterval);
    timerInterval = null;
    if (speedAnswerWatcher) {
        clearInterval(speedAnswerWatcher);
        speedAnswerWatcher = null;
    }
    if (speedRevealTimeout) clearTimeout(speedRevealTimeout);

    if (!selectedQuestion || selectedQuestion.id !== game.current_question_id) {
        const found = getSpeedQuestionById(game.current_question_id);
        if (found) selectedQuestion = found;
    }

    if (selectedQuestion) renderQuestion();

    // Show the full response-time breakdown before moving to the leaderboard.
    const speedTimes = document.getElementById("speed-response-times");
    if (speedTimes) speedTimes.classList.remove("hidden");
    renderSpeedResponseTimes();

    document.querySelectorAll(".answer-button").forEach(button => {
        button.disabled = true;
        button.classList.remove("answer-selected-amber", "answer-wrong");
        if (button.dataset.answer === game.current_answer) {
            button.classList.add("answer-correct");
        }
    });

    if (localSpeedSelection) {
        markLocalSpeedSelection(localSpeedSelection);
        const selectedButton = [...document.querySelectorAll(".answer-button")]
            .find(button => button.dataset.answer === localSpeedSelection);
        if (selectedButton && localSpeedSelection !== game.current_answer) {
            selectedButton.classList.add("answer-wrong");
        }
    }

    const timer = document.getElementById("timer");
    if (timer) timer.textContent = "✓";

    const result = document.getElementById("answer-result");
    if (result) {
        if (!localSpeedSelection) {
            result.textContent = `No answer — 0 points. Correct answer: ${game.current_answer || "—"}`;
            result.className = "answer-result answer-wrong-result";
        } else {
            result.textContent = `Correct answer: ${game.current_answer || "—"}`;
            result.className = "answer-result answer-correct-result";
        }
    }

    if (isHost) {
        speedRevealTimeout = setTimeout(async () => {
            if (!game || game.phase !== "speed-reveal") return;
            await supabaseClient
                .from("games")
                .update({
                    phase: "leaderboard",
                    current_answer: null,
                    current_question_id: null,
                    question_started_at: null
                })
                .eq("id", game.id)
                .eq("phase", "speed-reveal");
        }, 5000);
    }
}


// ============================================================
// SONG PLAYBACK
// ============================================================

async function attachAndPlaySongAudio(previewUrl, questionId = null) {
    const audio = document.getElementById("song-audio");
    const button = document.getElementById("song-play-button");

    if (!audio || !previewUrl) return false;
    if (questionId && (!game || game.current_question_id !== questionId || game.current_round_type !== "song")) {
        return false;
    }

    try {
        // Set the source only after iTunes has actually returned a usable URL.
        audio.pause();
        const volumeSlider = document.getElementById("volume-slider");
        if (volumeSlider) audio.volume = Number(volumeSlider.value) / 100;
        audio.src = previewUrl;
        audio.preload = "auto";
        audio.load();

        // The shared start time keeps every player on the same 10-second window.
        const timing = getSongTiming();
        const waitMs = Math.max(0, timing.startMs - Date.now());

        if (waitMs > 0) {
            await new Promise(resolve => setTimeout(resolve, waitMs));
        }

        if (questionId && (!game || game.current_question_id !== questionId || game.phase !== "question")) {
            return false;
        }

        audio.currentTime = 0;

        // Wait briefly for the remote MP3 to become playable. Calling play()
        // immediately after changing src is unreliable with remote previews.
        if (audio.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
            await new Promise((resolve, reject) => {
                let settled = false;
                const finish = (fn) => {
                    if (settled) return;
                    settled = true;
                    clearTimeout(timeoutId);
                    audio.removeEventListener("canplay", onReady);
                    audio.removeEventListener("canplaythrough", onReady);
                    audio.removeEventListener("error", onError);
                    fn();
                };
                const onReady = () => finish(resolve);
                const onError = () => finish(() => reject(new Error("Audio source could not be loaded")));
                const timeoutId = setTimeout(() => finish(resolve), 5000);
                audio.addEventListener("canplay", onReady, { once: true });
                audio.addEventListener("canplaythrough", onReady, { once: true });
                audio.addEventListener("error", onError, { once: true });
            });
        }

        await audio.play();
        if (button) button.textContent = "⏸ Playing Clip";
        return true;
    } catch (error) {
        // Autoplay can be blocked by the browser. The Play Clip button remains
        // available and will work because it is triggered by a user gesture.
        console.warn("Could not autoplay song clip:", error);
        if (button) button.textContent = "▶ Play Clip";
        return false;
    }
}

function setupSongPlayButton() {
    const button = document.getElementById("song-play-button");
    const audio = document.getElementById("song-audio");

    if (!button || !audio || button.dataset.bound === "true") return;

    button.dataset.bound = "true";

    button.addEventListener("click", async () => {
        if (!selectedQuestion) return;

        // The preview may still be loading. Resolve it here as well so the
        // button always provides a reliable user-gesture playback path.
        let previewUrl = selectedQuestion.audio;
        if (!previewUrl) {
            previewUrl = await lookupSongPreview(selectedQuestion);
        }

        if (!previewUrl) {
            button.textContent = "Audio unavailable";
            setTimeout(() => {
                if (button) button.textContent = "▶ Play Clip";
            }, 1500);
            return;
        }

        try {
            audio.pause();
            audio.src = previewUrl;
            audio.preload = "auto";
            audio.load();
            audio.currentTime = 0;
            await audio.play();
            button.textContent = "⏸ Playing Clip";
        } catch (error) {
            console.warn("Could not play song clip:", error);
            button.textContent = "▶ Play Clip";
        }
    });

    audio.addEventListener("ended", () => {
        button.textContent = "↻ Replay Clip";
    });

    audio.addEventListener("error", () => {
        console.warn("Song audio element error:", audio.error);
        button.textContent = "▶ Play Clip";
    });
}

// ============================================================
// QUESTION TYPE SYSTEM
// ============================================================

function createRandomRoundTypeOrder(totalRounds = 10) {
    const total = Math.max(8, Math.min(16, Number(totalRounds) || 10));
    const types = ["classic", "song", "speed"];
    const nonWtaRounds = total - 1;

    // Spread the three normal round types as evenly as possible. The counts
    // can differ by at most one, and WTA is inserted exactly once.
    const counts = { classic: Math.floor(nonWtaRounds / 3), song: Math.floor(nonWtaRounds / 3), speed: Math.floor(nonWtaRounds / 3) };
    let remainder = nonWtaRounds % 3;
    while (remainder > 0) {
        const target = types
            .slice()
            .sort((a, b) => counts[a] - counts[b])[0];
        counts[target]++;
        remainder--;
    }

    const pool = [];
    Object.entries(counts).forEach(([type, count]) => {
        for (let i = 0; i < count; i++) pool.push(type);
    });

    // Insert WTA into the mixed sequence, then shuffle/retry to avoid two
    // identical round types next to each other.
    for (let attempt = 0; attempt < 2000; attempt++) {
        const mixed = shuffleArray([...pool]);
        const insertAt = Math.floor(Math.random() * (mixed.length + 1));
        mixed.splice(insertAt, 0, "wta");

        let valid = true;
        for (let i = 1; i < mixed.length; i++) {
            if (mixed[i] === mixed[i - 1]) {
                valid = false;
                break;
            }
        }
        if (valid) return mixed;
    }

    // Deterministic fallback. The counts remain balanced and WTA remains
    // exactly once even if a future constraint makes random retries fail.
    const fallback = [];
    const remaining = { ...counts };
    let previous = null;
    while (fallback.length < nonWtaRounds) {
        const candidates = types
            .filter(type => remaining[type] > 0 && type !== previous)
            .sort((a, b) => remaining[b] - remaining[a]);
        const type = candidates[0] || types.find(item => remaining[item] > 0);
        fallback.push(type);
        remaining[type]--;
        previous = type;
    }

    const wtaIndex = Math.min(fallback.length, Math.floor(total / 2));
    fallback.splice(wtaIndex, 0, "wta");
    return fallback;
}


function getRoundTypeForRound(round) {
    const configured = Array.isArray(game?.round_type_order)
        ? game.round_type_order
        : [];

    if (configured.length) {
        return configured[(Number(round || 1) - 1) % configured.length] || "classic";
    }

    return "classic";
}

function getRoundTypeLabel(type) {
    if (type === "song") return "NAME THAT SONG";
    if (type === "speed") return "SPEED ROUND";
    if (type === "wta") return "WINNER TAKES ALL";
    return "CLASSIC QUESTION";
}

async function startSongRound() {
    if (!isHost || !game) return;

    const usedQuestionIds = new Set();
    const { data: usedAnswers, error } = await supabaseClient
        .from("answers")
        .select("question_id")
        .eq("game_id", game.id);

    if (error) {
        console.error("Could not check used song questions:", error);
        return;
    }

    (usedAnswers || []).forEach(row => {
        if (row.question_id) usedQuestionIds.add(row.question_id);
    });

    const songQuestion = await getRandomSongQuestion(usedQuestionIds);
    if (!songQuestion) {
        alert("There are no unused song questions left. Add more songs to question_types.js.");
        return;
    }

    selectedQuestion = songQuestion;
    renderedQuestionId = null;
    answerSubmitted = false;
    localSongSelection = null;
    songLocalStartPerf = null;
    songRoundFinished = false;
    songDeadlineHandled = false;
    songFinishInProgress = false;

    // Give everyone the same shared start time. Each browser uses this
    // timestamp rather than the moment its realtime event arrives.
    const startAt = new Date(Date.now() + 650);

    const { error: songStartError } = await supabaseClient
        .from("games")
        .update({
            phase: "question",
            current_round_type: "song",
            current_player_id: null,
            current_difficulty: null,
            current_question_id: songQuestion.id,
            current_answer: null,
            question_started_at: startAt.toISOString()
        })
        .eq("id", game.id);

    if (songStartError) {
        console.error("Could not start music round:", songStartError);
        return;
    }

    // IMPORTANT: update the host's local state immediately.
    // The intro transition calls this function before the Realtime event can
    // arrive, so without this update the host remains on round-intro and the
    // music question never gets rendered.
    game = {
        ...game,
        phase: "question",
        current_round_type: "song",
        current_player_id: null,
        current_difficulty: null,
        current_question_id: songQuestion.id,
        current_answer: null,
        question_started_at: startAt.toISOString()
    };

    updateGameState();
}

async function handleSongQuestionPhase() {
    const questionId = game.current_question_id;

    if (loadingSongQuestionId === questionId) return;
    if (renderedQuestionId === questionId && selectedQuestion?.id === questionId) {
        updateSongAnswerControls();
        return;
    }

    loadingSongQuestionId = questionId;

    const songQuestion = await getSongQuestionById(questionId);
    if (!songQuestion) {
        loadingSongQuestionId = null;
        console.error("Song question or audio preview not found:", questionId);
        return;
    }

    selectedQuestion = songQuestion;
    renderedQuestionId = questionId;
    answerSubmitted = false;
    localSongSelection = null;
    songRoundFinished = false;
    songDeadlineHandled = false;
    songFinishInProgress = false;

    // Render the song question immediately. Audio is optional and must not
    // block the question from appearing.
    renderQuestion();
    loadingSongQuestionId = null;
    startSongTimer();
    startSongAnswerWatcher();

    // If the external preview becomes available, attach it to the current
    // question without interrupting the round.
    lookupSongPreview(songQuestion).then(previewUrl => {
        if (!previewUrl) return;
        if (!game || game.current_round_type !== "song") return;
        if (game.current_question_id !== questionId) return;
        if (selectedQuestion?.id !== questionId) return;

        const audio = document.getElementById("song-audio");
        if (audio) {
            attachAndPlaySongAudio(previewUrl, questionId);
        }
    }).catch(error => {
        console.warn("Song preview could not be attached:", error);
    });
}

function getSongTiming() {
    const startMs = new Date(game?.question_started_at || 0).getTime();
    const durationMs = 10000;
    return {
        startMs,
        endMs: startMs + durationMs,
        durationMs
    };
}

function updateSongAnswerControls() {
    const timing = getSongTiming();
    const now = Date.now();
    const open = game?.phase === "question" &&
        timing.startMs > 0 &&
        now >= timing.startMs &&
        now < timing.endMs &&
        !answerSubmitted;

    document.querySelectorAll(".answer-button").forEach(button => {
        button.disabled = !open;
    });
}

function startSongTimer() {
    clearInterval(timerInterval);
    if (songPreStartTimeout) clearTimeout(songPreStartTimeout);

    const timer = document.getElementById("timer");
    const timing = getSongTiming();
    if (!timing.startMs) return;

    const tick = () => {
        const now = Date.now();
        const remaining = Math.max(0, Math.ceil((timing.endMs - now) / 1000));
        const beforeStart = now < timing.startMs;

        if (!beforeStart && songLocalStartPerf === null) {
            songLocalStartPerf = performance.now();
        }

        if (timer) {
            timer.textContent = beforeStart ? "10" : String(remaining);
        }

        updateSongAnswerControls();

        if (now >= timing.endMs) {
            clearInterval(timerInterval);
            timerInterval = null;

            // No selection at the deadline is an explicit timeout: wrong and 0 points.
            if (!answerSubmitted) {
                submitAnswer("__TIMEOUT__");
            } else {
                finishSongRoundIfNeeded();
            }
        }
    };

    tick();

    const delay = Math.max(0, timing.startMs - Date.now());
    songPreStartTimeout = setTimeout(() => {
        if (songLocalStartPerf === null) songLocalStartPerf = performance.now();
        updateSongAnswerControls();
    }, delay);

    timerInterval = setInterval(tick, 100);

    // Start playback when the preview is already available. If it is still
    // being fetched, handleSongQuestionPhase() will call attachAndPlaySongAudio
    // as soon as iTunes returns the preview URL.
    if (selectedQuestion?.audio) {
        attachAndPlaySongAudio(selectedQuestion.audio, game.current_question_id);
    }
}

function startSongAnswerWatcher() {
    if (songAnswerWatcher) clearInterval(songAnswerWatcher);
    if (!isHost) return;

    songAnswerWatcher = setInterval(() => {
        if (!game || game.phase !== "question" || game.current_round_type !== "song") {
            clearInterval(songAnswerWatcher);
            songAnswerWatcher = null;
            return;
        }
        finishSongRoundIfNeeded();
    }, 250);
}

async function finishSongRoundIfNeeded() {
    if (!isHost || songRoundFinished || songDeadlineHandled || songFinishInProgress || !game) return;
    songFinishInProgress = true;
    if (game.phase !== "question" || game.current_round_type !== "song") {
        songFinishInProgress = false;
        return;
    }

    const timing = getSongTiming();
    const now = Date.now();

    const { data: latestAnswers, error } = await supabaseClient
        .from("answers")
        .select("player_id")
        .eq("game_id", game.id)
        .eq("round", game.round);

    if (error) {
        console.error("Could not check song answers:", error);
        songFinishInProgress = false;
        return;
    }

    const answeredPlayers = new Set((latestAnswers || []).map(row => row.player_id));
    const everyoneAnswered = players.length > 0 && answeredPlayers.size >= players.length;
    const expired = timing.endMs > 0 && now >= timing.endMs;

    if (!everyoneAnswered && !expired) {
        // This check can run many times while the 10-second window is open.
        // Release the MUSIC guard so the next answer or watcher tick can
        // immediately check again.
        songFinishInProgress = false;
        return;
    }

    // Guarantee that players who never clicked an answer are recorded as
    // incorrect for 0 points before the host reveals the answer.
    if (expired && players.length > 0) {
        const missingPlayers = authoritativePlayers.filter(player => !answeredPlayers.has(player.id));
        for (const player of missingPlayers) {
            const { error: timeoutError } = await supabaseClient
                .from("answers")
                .upsert({
                    game_id: game.id,
                    player_id: player.id,
                    round: game.round,
                    question_id: selectedQuestion?.id,
                    difficulty: "song",
                    answer: "",
                    correct: false,
                    points_awarded: 0,
                    answered_at: new Date(timing.endMs).toISOString()
                }, { onConflict: "player_id,round" });
            if (timeoutError) console.error("Could not record song timeout:", timeoutError);
        }
    }

    // --------------------------------------------------------
    // MUSIC SCORING BY ANSWER ORDER
    // --------------------------------------------------------
    // Correct answers are ordered by the normalised answered_at timestamp.
    // 1st correct = 6, 2nd = 4, 3rd = 2, all remaining correct = 1.
    const { data: completedSongAnswers, error: completedSongError } =
        await supabaseClient
            .from("answers")
            .select("player_id,answered_at,correct,points_awarded")
            .eq("game_id", game.id)
            .eq("round", game.round)
            .eq("difficulty", "song");

    if (completedSongError) {
        console.error("Could not load completed music answers:", completedSongError);
        songDeadlineHandled = false;
        songRoundFinished = false;
        songFinishInProgress = false;
        return;
    }

    const correctSongAnswers = (completedSongAnswers || [])
        .filter(row => row.correct && row.answered_at)
        .sort((a, b) => new Date(a.answered_at).getTime() - new Date(b.answered_at).getTime());

    const songPointsByPlayer = new Map();
    correctSongAnswers.forEach((row, index) => {
        const award = index === 0 ? 6 : index === 1 ? 4 : index === 2 ? 2 : 1;
        songPointsByPlayer.set(row.player_id, award);
    });

    for (const row of (completedSongAnswers || [])) {
        const awarded = songPointsByPlayer.get(row.player_id) || 0;
        if (Number(row.points_awarded || 0) !== awarded) {
            const { error: rowUpdateError } = await supabaseClient
                .from("answers")
                .update({ points_awarded: awarded })
                .eq("game_id", game.id)
                .eq("round", game.round)
                .eq("player_id", row.player_id);
            if (rowUpdateError) console.error("Could not update music points:", rowUpdateError);
        }
    }

    // Add the final music award to each player's real quiz score once.
    for (const player of players) {
        const award = songPointsByPlayer.get(player.id) || 0;
        if (!award) continue;

        const { error: playerScoreError } = await supabaseClient
            .from("players")
            .update({ points: (player.points || 0) + award })
            .eq("id", player.id);

        if (playerScoreError) {
            console.error("Could not award music points:", playerScoreError);
        } else {
            player.points = (player.points || 0) + award;
        }
    }

    songDeadlineHandled = true;
    songRoundFinished = true;
    clearInterval(timerInterval);
    timerInterval = null;
    if (songAnswerWatcher) {
        clearInterval(songAnswerWatcher);
        songAnswerWatcher = null;
    }

    // Reveal the correct answer only after everyone has answered or the
    // shared 10-second answering window has expired.
    const { error: revealError } = await supabaseClient
        .from("games")
        .update({
            phase: "song-reveal",
            current_answer: selectedQuestion?.correct || null,
            current_player_id: null,
            current_difficulty: null
        })
        .eq("id", game.id)
        .eq("phase", "question");

    if (revealError) {
        console.error("Could not reveal song answer:", revealError);
    }
}

function handleSongRevealPhase() {
    clearInterval(timerInterval);
    timerInterval = null;
    if (songAnswerWatcher) {
        clearInterval(songAnswerWatcher);
        songAnswerWatcher = null;
    }

    if (songRevealTimeout) clearTimeout(songRevealTimeout);

    if (selectedQuestion && selectedQuestion.id === game.current_question_id) {
        renderQuestion();
    }

    document.querySelectorAll(".answer-button").forEach(button => {
        button.disabled = true;
        button.classList.remove("answer-selected-amber", "answer-wrong");
        if (button.dataset.answer === game.current_answer) {
            button.classList.add("answer-correct");
        }
    });

    // Show the same response-time breakdown used by the Speed Round.
    // For Name That Song this shows who answered fastest, their response
    // time, whether they were correct, and the points they earned.
    const songTimes = document.getElementById("speed-response-times");
    if (songTimes) songTimes.classList.remove("hidden");
    renderSpeedResponseTimes();

    const result = document.getElementById("answer-result");
    if (result) {
        result.textContent = `Correct answer: ${game.current_answer || "—"}`;
        result.className = "answer-result answer-correct-result";
    }

    const timer = document.getElementById("timer");
    if (timer) timer.textContent = "✓";

    if (isHost) {
        songRevealTimeout = setTimeout(async () => {
            if (!game || game.phase !== "song-reveal") return;
            await supabaseClient
                .from("games")
                .update({
                    phase: "leaderboard",
                    current_answer: null,
                    current_question_id: null,
                    question_started_at: null
                })
                .eq("id", game.id)
                .eq("phase", "song-reveal");
        }, 2500);
    }
}

// ============================================================
// MOVE TO NEXT PLAYER
// ============================================================

async function moveToNextPlayer() {

    // Kept for compatibility with any older button/timer references.
    // All real player selection now goes through selectNextPlayer().
    if (!isHost) return;

    await selectNextPlayer();
}


// ============================================================
// LEADERBOARD
// ============================================================

function ensureLeaderboardContinueButton() {
    let button = document.getElementById("continue-button");
    if (button) return button;

    const phase = document.getElementById("leaderboard-phase");
    if (!phase) return null;

    button = document.createElement("button");
    button.id = "continue-button";
    button.type = "button";
    button.className = "primary-button";
    button.textContent = "Start Next Round";
    button.style.setProperty("display", "block", "important");
    button.style.setProperty("visibility", "visible", "important");
    button.style.width = "100%";
    button.style.marginTop = "24px";
    phase.appendChild(button);

    if (button.dataset.bound !== "true") {
        button.dataset.bound = "true";
        button.addEventListener("click", async () => {
            await continueFromLeaderboard();
        });
    }

    return button;
}


async function handleLeaderboardPhase() {
    clearTimers();
    renderLeaderboard();

    if (!game) return;

    // Never trust a stale local host flag. The database game row is authoritative.
    isHost = game.host_id === myPlayerId;

    const button = ensureLeaderboardContinueButton();
    if (!button) return;

    const isFinalRound = Number(game.round || 1) >= getTotalRounds();
    const bonusIsDue =
        !isFinalRound &&
        !game.bonus_used &&
        Number(game.bonus_round) === Number(game.round);

    if (isHost) {
        button.classList.remove("hidden");
        button.disabled = false;
        button.style.setProperty("display", "block", "important");
        button.style.setProperty("visibility", "visible", "important");
        button.textContent = bonusIsDue
            ? "Continue to Bonus Gamble"
            : (isFinalRound ? "View Final Results" : "Start Next Round");
    } else {
        button.classList.add("hidden");
        button.style.setProperty("display", "none", "important");
    }
}


// Called only by the host from the leaderboard screen.
async function continueFromLeaderboard() {

    if (!isHost || !game || game.phase !== "leaderboard") return;

    const continueButton =
        document.getElementById("continue-button");

    if (continueButton) {
        continueButton.disabled = true;
        continueButton.textContent = "Loading…";
    }

    try {
        const isFinalRound = Number(game.round || 1) >= getTotalRounds();
        const bonusIsDue =
            !isFinalRound &&
            !game.bonus_used &&
            Number(game.bonus_round) === Number(game.round);

        if (isFinalRound) {
            await startNextRound();
            return;
        }

        if (bonusIsDue) {
            await beginGamblePhase();
            return;
        }

        await startNextRound();

    } finally {
        // Re-enable only if the game is still on the leaderboard.
        if (continueButton && game?.phase === "leaderboard") {
            continueButton.disabled = false;
            const finalRound = Number(game?.round || 1) >= getTotalRounds();
            continueButton.textContent = finalRound ? "View Final Results" : "Start Next Round";
        }
    }
}


function getLeaderboardSortedPlayers() {
    return [...players].sort((a, b) => {
        const pointsDifference = (b.points || 0) - (a.points || 0);
        if (pointsDifference !== 0) return pointsDifference;

        // Keep the order stable when scores are tied.
        return String(a.joined_at || "").localeCompare(String(b.joined_at || ""));
    });
}

function buildLeaderboardState(sortedPlayers) {
    const state = {};

    sortedPlayers.forEach((player, index) => {
        state[player.id] = {
            rank: index + 1,
            points: Number(player.points || 0)
        };
    });

    return state;
}

function animateLeaderboardPoints(element, from, to, duration = 850) {
    if (!element) return;

    const start = Number(from || 0);
    const end = Number(to || 0);

    if (start === end) {
        element.textContent = end;
        return;
    }

    const startedAt = performance.now();
    element.classList.add("points-counting");

    const tick = now => {
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(start + ((end - start) * eased));

        element.textContent = value;

        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            element.textContent = end;
            setTimeout(() => element.classList.remove("points-counting"), 100);
        }
    };

    requestAnimationFrame(tick);
}

function renderLeaderboard() {
    const leaderboard = document.getElementById("leaderboard");
    if (!leaderboard) return;

    const roundNumber = Number(game?.round || 1);

    // loadPlayers() can refresh the leaderboard while the game is still in
    // question/selecting/difficulty phases. Never consume the animation
    // for a round before the shared game actually reaches leaderboard.
    if (game?.phase !== "leaderboard") {
        const sorted = getLeaderboardSortedPlayers();
        leaderboard.innerHTML = "";

        sorted.forEach((player, index) => {
            const row = document.createElement("div");
            row.className = "leaderboard-row";
            if (player.id === myPlayerId) row.classList.add("me");

            row.innerHTML = `
                <div class="leaderboard-position">${index + 1}</div>
                <div class="leaderboard-name">${escapeHtml(player.name)}</div>
                <div class="leaderboard-points-wrap">
                    <span class="leaderboard-movement"></span>
                    <div class="leaderboard-points">${player.points || 0}</div>
                </div>
            `;

            leaderboard.appendChild(row);
        });

        return;
    }

    // Realtime can fire several player updates while the leaderboard is on
    // screen. Only run the big Kahoot-style animation once per round.
    if (leaderboardAnimatedRound === roundNumber) return;

    const sorted = getLeaderboardSortedPlayers();
    const currentState = buildLeaderboardState(sorted);
    const previousState = leaderboardPreviousState || {};

    leaderboardAnimatedRound = roundNumber;
    if (leaderboardAnimationTimer) clearTimeout(leaderboardAnimationTimer);

    leaderboard.innerHTML = "";

    const rows = [];

    sorted.forEach(player => {
        const row = document.createElement("div");
        row.className = "leaderboard-row";

        if (player.id === myPlayerId) {
            row.classList.add("me");
        }

        const current = currentState[player.id];
        const previous = previousState[player.id];
        const previousRank = previous?.rank ?? current.rank;
        const previousPoints = previous?.points ?? current.points;
        const movement = previous?.rank
            ? previous.rank > current.rank
                ? "up"
                : previous.rank < current.rank
                    ? "down"
                    : ""
            : "";

        const scoreDelta = previous ? current.points - previousPoints : 0;
        const scoreDeltaClass = scoreDelta > 0 ? "positive" : scoreDelta < 0 ? "negative" : "";
        const scoreDeltaText = scoreDelta > 0 ? `+${scoreDelta}` : scoreDelta < 0 ? `${scoreDelta}` : "";

        // Approximate row height gives each player a convincing starting
        // position before the browser animates them into their new rank.
        const initialOffset = (previousRank - current.rank) * 76;

        row.innerHTML = `
            <div class="leaderboard-position">
                ${current.rank}
            </div>

            <div class="leaderboard-name">
                ${escapeHtml(player.name)}
            </div>

            <div class="leaderboard-points-wrap">
                <span class="leaderboard-movement ${movement}" aria-label="${movement === "up" ? "Moved up" : movement === "down" ? "Moved down" : ""}">
                    ${movement === "up" ? "▲" : movement === "down" ? "▼" : ""}
                </span>
                <div class="leaderboard-points" data-points-target="${current.points}">
                    ${previousPoints}
                </div>
                ${scoreDeltaText ? `<span class="leaderboard-score-change ${scoreDeltaClass}" aria-label="${escapeHtml(scoreDeltaText)} points">${escapeHtml(scoreDeltaText)}</span>` : ""}
            </div>
        `;

        leaderboard.appendChild(row);
        rows.push({ row, movement, initialOffset, previousPoints, currentPoints: current.points });
    });

    rows.forEach(({ row, movement, initialOffset }) => {
        if (initialOffset !== 0) {
            row.style.transform = `translateY(${initialOffset}px)`;
            row.classList.add("leaderboard-moving");
        }

        if (movement) {
            row.classList.add("leaderboard-new-position");
        }
    });

    // Force layout so the starting transforms are painted before releasing
    // them. This creates the smooth vertical movement.
    void leaderboard.offsetHeight;

    requestAnimationFrame(() => {
        rows.forEach(({ row, movement, previousPoints, currentPoints }) => {
            row.style.transform = "translateY(0)";

            if (movement) {
                const arrow = row.querySelector(".leaderboard-movement");
                if (arrow) arrow.classList.add("is-visible");
            }

            const pointsElement = row.querySelector(".leaderboard-points");
            animateLeaderboardPoints(pointsElement, previousPoints, currentPoints);
        });
    });

    leaderboardAnimationTimer = setTimeout(() => {
        rows.forEach(({ row }) => {
            row.classList.remove("leaderboard-moving", "leaderboard-new-position");
            row.style.transform = "";
        });

        // This completed leaderboard becomes the baseline for the next round.
        leaderboardPreviousState = currentState;
    }, 1000);
}


// ============================================================
// START GAMBLE
// ============================================================

async function beginGamblePhase() {

    if (!isHost) return;


    await supabaseClient
        .from("players")
        .update({
            has_gambled: false,
            gamble_result: null,
            gamble_payout: 0,
            ready_up: false
        })
        .eq(
            "game_id",
            game.id
        );


    // Store the exact gamble deadline in the existing timestamp field so
    // every player sees the same 20-second countdown.
    const gambleDeadline =
        new Date(Date.now() + 20000).toISOString();

    await supabaseClient
        .from("games")
        .update({
            phase: "gamble",
            question_started_at: gambleDeadline,
            bonus_used: true
        })
        .eq(
            "id",
            game.id
        );
}


// ============================================================
// GAMBLE PHASE
// ============================================================

function getGambleMultiplier(stake) {
    if (stake >= 7) return 5;
    if (stake >= 5) return 4;
    if (stake >= 3) return 3;
    return 2;
}

function updateGambleMultiplierPreview() {
    const me = players.find(player => player.id === myPlayerId);
    const input = document.getElementById("gamble-stake");
    const info = document.getElementById("multiplier-info");

    if (!me || !input || !info) return;

    const max = Math.max(0, Number(me.points || 0));
    input.max = String(max);

    let stake = Number(input.value || 1);
    if (max > 0) {
        stake = Math.min(Math.max(1, stake), max);
        input.value = String(stake);
    }

    const multiplier = getGambleMultiplier(stake);
    info.textContent = max > 0
        ? `${stake} point${stake === 1 ? "" : "s"} staked · ${multiplier}× multiplier if you hit`
        : "You have no points to gamble.";
}

function handleGamblePhase() {

    const me = players.find(player => player.id === myPlayerId);
    if (!me) return;

    const gambleButton = document.getElementById("gamble-button");
    const keepButton = document.getElementById("keep-button");
    const stakeInput = document.getElementById("gamble-stake");

    const canGamble =
        !me.has_gambled &&
        !me.ready_up &&
        (me.points || 0) > 0;

    if (stakeInput) {
        stakeInput.max = String(Math.max(1, me.points || 1));
        stakeInput.disabled = !canGamble;
        if (!stakeInput.value || Number(stakeInput.value) < 1) {
            stakeInput.value = "1";
        }
        if (Number(stakeInput.value) > Number(stakeInput.max)) {
            stakeInput.value = stakeInput.max;
        }
    }

    if (gambleButton) {
        gambleButton.disabled = !canGamble;
        gambleButton.textContent = me.has_gambled
            ? "🎰 Gamble Complete"
            : "🎰 Spin Bonus";
    }

    if (keepButton) {
        keepButton.textContent = me.ready_up ? "✓ Ready" : "✓ Ready Up";
        keepButton.disabled = !!me.ready_up;
        keepButton.classList.toggle("ready-complete", !!me.ready_up);
    }

    const result = document.getElementById("slot-result");
    if (result) {
        if (me.ready_up) {
            result.textContent = "You're ready! Waiting for everyone else…";
        } else if (me.has_gambled) {
            result.textContent = me.gamble_result === "Kept"
                ? "Points kept — ready up when you're done."
                : `${me.gamble_result || ""} · ${me.gamble_payout || 0} points won · Ready up when you're done.`;
        } else {
            result.textContent = canGamble
                ? "Choose your stake. A bigger stake gives a bigger multiplier."
                : "You have no points to gamble. Ready up to continue.";
        }
    }

    updateGambleMultiplierPreview();
    renderGambleReadyStatus();
    startGambleTimer();
    startGambleReadyWatcher();
}


// ============================================================
// KEEP
// ============================================================

async function readyUp() {

    const me =
        players.find(
            player =>
                player.id ===
                myPlayerId
        );

    if (!me) return;
    if (me.ready_up) return;

    const { error } =
        await supabaseClient
            .from("players")
            .update({
                ready_up: true
            })
            .eq(
                "id",
                myPlayerId
            );

    if (error) {
        console.error("Could not ready up:", error);
        alert("Could not ready you up. Please try again.");
        return;
    }

    await loadPlayers();
    await checkEveryoneReady();
}


// ============================================================
// GAMBLE
// ============================================================


async function gamblePoints() {

    const me = players.find(player => player.id === myPlayerId);
    if (!me || me.has_gambled || me.ready_up) return;

    const stakeInput = document.getElementById("gamble-stake");
    const availablePoints = Math.max(0, Number(me.points || 0));
    const stake = Number(stakeInput?.value || 0);

    if (!Number.isInteger(stake) || stake < 1 || stake > availablePoints) {
        alert(`Choose a whole-number stake between 1 and ${availablePoints} points.`);
        return;
    }

    const multiplier = getGambleMultiplier(stake);

    const symbols = ["💎", "⭐", "🔔", "🍋", "🍒"];
    const reel1 = symbols[Math.floor(Math.random() * symbols.length)];
    const reel2 = symbols[Math.floor(Math.random() * symbols.length)];
    const reel3 = symbols[Math.floor(Math.random() * symbols.length)];

    const triple = reel1 === reel2 && reel2 === reel3;
    const winnings = triple ? stake * multiplier : 0;
    const finalPoints = availablePoints - stake + winnings;
    const result = `${reel1}${reel2}${reel3}`;

    const reelOne = document.getElementById("reel-1");
    const reelTwo = document.getElementById("reel-2");
    const reelThree = document.getElementById("reel-3");
    if (reelOne) reelOne.textContent = reel1;
    if (reelTwo) reelTwo.textContent = reel2;
    if (reelThree) reelThree.textContent = reel3;

    const { error } = await supabaseClient
        .from("players")
        .update({
            points: finalPoints,
            has_gambled: true,
            gamble_result: result,
            gamble_payout: winnings,
            ready_up: false
        })
        .eq("id", myPlayerId);

    if (error) {
        console.error("Could not save gamble:", error);
        alert("Could not save your gamble. Please try again.");
        return;
    }

    const slotResult = document.getElementById("slot-result");
    if (slotResult) {
        slotResult.textContent = triple
            ? `${result} — ${stake} staked × ${multiplier} = ${winnings} points won!`
            : `${result} — ${stake} points lost.`;
    }

    await loadPlayers();
    await checkEveryoneReady();
}


// ============================================================
// CHECK EVERYONE HAS CHOSEN
// ============================================================

async function checkEveryoneReady() {

    if (!game || game.phase !== "gamble") return;

    const { data: latestPlayers, error } =
        await supabaseClient
            .from("players")
            .select("*")
            .eq("game_id", game.id)
            .order("joined_at", { ascending: true });

    if (error) {
        console.error("Could not check ready status:", error);
        return;
    }

    players = latestPlayers || [];
    renderGambleReadyStatus();

    const everyoneReady =
        players.length > 0 &&
        players.every(player => player.ready_up === true);

    if (!everyoneReady || !isHost) return;

    await finishGamblePhase();
}


function startGambleReadyWatcher() {

    if (gambleReadyWatchInterval) {
        clearInterval(gambleReadyWatchInterval);
        gambleReadyWatchInterval = null;
    }

    if (!isHost || !game || game.phase !== "gamble") return;

    gambleReadyWatchInterval = setInterval(async () => {

        if (!isHost || !game || game.phase !== "gamble") {
            clearInterval(gambleReadyWatchInterval);
            gambleReadyWatchInterval = null;
            return;
        }

        await checkEveryoneReady();
    }, 500);
}


function renderGambleReadyStatus() {

    const phase =
        document.getElementById("gamble-phase");

    if (!phase) return;

    let status =
        document.getElementById("gamble-ready-status");

    if (!status) {
        status = document.createElement("div");
        status.id = "gamble-ready-status";
        const buttons = phase.querySelector(".gamble-buttons");
        if (buttons) {
            buttons.insertAdjacentElement("afterend", status);
        } else {
            phase.appendChild(status);
        }
    }

    status.innerHTML = players.map(player => `
        <div class="gamble-ready-player">
            <span>${escapeHtml(player.name)}</span>
            <span class="gamble-ready-badge ${player.ready_up ? "is-ready" : ""}">
                ${player.ready_up ? "✓ Ready" : "Waiting"}
            </span>
        </div>
    `).join("");
}


// ============================================================
// GAMBLE TIMER
// ============================================================

function ensureGambleTimerElement() {

    let timer =
        document.getElementById("gamble-timer");

    if (timer) return timer;

    const phase =
        document.getElementById("gamble-phase");

    if (!phase) return null;

    timer = document.createElement("div");
    timer.id = "gamble-timer";
    timer.setAttribute("aria-live", "polite");
    timer.style.fontSize = "2rem";
    timer.style.fontWeight = "800";
    timer.style.textAlign = "center";
    timer.style.margin = "12px 0";
    timer.style.padding = "10px 18px";
    timer.style.borderRadius = "12px";
    timer.style.background = "rgba(255,255,255,0.08)";

    const heading = phase.firstElementChild;
    if (heading) {
        phase.insertBefore(timer, heading.nextSibling);
    } else {
        phase.prepend(timer);
    }

    return timer;
}


function startGambleTimer() {

    const timer = ensureGambleTimerElement();

    if (!timer || !game) return;

    if (!game.question_started_at) {
        timer.textContent = "20";
        return;
    }

    if (gambleTimerInterval) return;

    const tick = async () => {

        if (!game || game.phase !== "gamble") {
            clearGambleTimer();
            return;
        }

        const deadline =
            new Date(game.question_started_at).getTime();

        const remaining =
            Math.max(0, deadline - Date.now());

        const seconds =
            Math.ceil(remaining / 1000);

        timer.textContent = `${seconds}s`;

        if (seconds <= 5) {
            timer.style.background = "rgba(220, 38, 38, 0.25)";
        } else {
            timer.style.background = "rgba(255,255,255,0.08)";
        }

        if (remaining <= 0) {
            clearGambleTimer();

            if (isHost) {
                await finishGamblePhase();
            }
        }
    };

    tick();
    gambleTimerInterval = setInterval(tick, 250);
}


function clearGambleTimer() {

    if (gambleTimerInterval) {
        clearInterval(gambleTimerInterval);
        gambleTimerInterval = null;
    }

    if (gambleReadyWatchInterval) {
        clearInterval(gambleReadyWatchInterval);
        gambleReadyWatchInterval = null;
    }
}


async function finishGamblePhase() {

    if (!isHost || !game) return;
    if (gambleTransitioning) return;
    if (game.phase !== "gamble") return;

    gambleTransitioning = true;
    clearGambleTimer();

    try {
        // If the 20-second safety timer expires, automatically ready up
        // anyone who has not done so. Their points are left unchanged.
        const { error: playerError } =
            await supabaseClient
                .from("players")
                .update({
                    ready_up: true
                })
                .eq("game_id", game.id)
                .eq("ready_up", false);

        if (playerError) {
            console.error(
                "Could not finish gamble phase:",
                playerError
            );
            return;
        }

        await startNextRound();

    } finally {
        gambleTransitioning = false;
    }
}


// ============================================================
// NEXT ROUND
// ============================================================

async function startNextRound() {

    if (!isHost) return;

    clearGambleTimer();


    const nextRound =
        (game.round || 1) + 1;

    // The final configured round moves directly to the final results instead of creating another round.
    if (Number(game.round || 1) >= getTotalRounds()) {
        const { error } = await supabaseClient
            .from("games")
            .update({
                phase: "final",
                current_player_id: null,
                current_difficulty: null,
                current_question_id: null,
                current_answer: null,
                question_started_at: null
            })
            .eq("id", game.id)
            .eq("phase", "leaderboard");

        if (error) console.error("Could not end the game:", error);
        return;
    }

    const nextRoundType = getRoundTypeForRound(nextRound);
    currentRoundType = nextRoundType;

    // Preload Speed questions before entering the next round intro.
    // This is important because startNextRound() is used after the
    // leaderboard; it does not call beginRound(), so Speed questions must
    // also be prepared here. Otherwise the intro reaches startSpeedRound()
    // with a null current_question_id and the game can appear stuck.
    let preparedNextQuestionId = null;
    if (nextRoundType === "speed") {
        const usedQuestionIds = new Set();
        const { data: usedAnswers, error: usedAnswersError } = await supabaseClient
            .from("answers")
            .select("question_id")
            .eq("game_id", game.id);

        if (usedAnswersError) {
            console.error("Could not prepare next speed question:", usedAnswersError);
            return;
        }

        (usedAnswers || []).forEach(row => {
            if (row.question_id) usedQuestionIds.add(row.question_id);
        });

        const preparedSpeedQuestion = getRandomSpeedQuestion(usedQuestionIds);
        if (!preparedSpeedQuestion) {
            alert("There are no unused speed questions left. Add more speed questions to question_types.js.");
            return;
        }

        preparedNextQuestionId = preparedSpeedQuestion.id;
        selectedQuestion = preparedSpeedQuestion;
    }

    const { error: nextRoundError } = await supabaseClient
        .from("games")
        .update({
            round: nextRound,
            phase: "round-intro",
            current_player_id: null,
            current_difficulty: null,
            current_question_id: preparedNextQuestionId,
            current_answer: null,
            question_started_at: null,
            current_round_type: nextRoundType,
            wta_awarded: false
        })
        .eq("id", game.id);

    if (nextRoundError) {
        console.error("Could not start next round:", nextRoundError);
        return;
    }


    await supabaseClient
        .from("players")
        .update({
            rounds_picked: [],
            has_gambled: false,
            gamble_result: null,
            gamble_payout: 0,
            ready_up: false
        })
        .eq(
            "game_id",
            game.id
        );


    await loadPlayers();

    wtaRoundInitialized = false;
    wtaRoundFinished = false;
    wtaCurrentRowId = null;
    wtaCurrentQuestionNumber = 0;
    wtaLeaderboardState = {};

    game = { ...game, round: nextRound, current_round_type: nextRoundType, phase: "round-intro", current_question_id: preparedNextQuestionId, current_answer: null, question_started_at: null, wta_awarded: false };
    updateGameState();
}


// ============================================================
// FINAL
// ============================================================

function handleFinalPhase() {

    renderFinalLeaderboard();
}


function renderFinalLeaderboard() {

    const leaderboard =
        document.getElementById(
            "final-leaderboard"
        );


    if (!leaderboard) return;


    const sorted =
        [...players].sort(
            (a, b) =>
                (b.points || 0) -
                (a.points || 0)
        );


    leaderboard.innerHTML = "";


    sorted.forEach(
        (player, index) => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "leaderboard-row";


            row.innerHTML = `
                <div class="leaderboard-position">
                    ${index + 1}
                </div>

                <div class="leaderboard-name">
                    ${escapeHtml(player.name)}
                </div>

                <div class="leaderboard-points">
                    ${player.points || 0}
                </div>
            `;


            leaderboard.appendChild(
                row
            );
        }
    );
}


// ============================================================
// CLEAR TIMERS
// ============================================================

function clearTimers() {

    stopSharedRoundSync();

    if (timerInterval) {

        clearInterval(
            timerInterval
        );

        timerInterval = null;
    }


    if (nextPlayerTimeout) {

        clearTimeout(
            nextPlayerTimeout
        );

        nextPlayerTimeout = null;
    }

    clearGambleTimer();
    if (songAnswerWatcher) { clearInterval(songAnswerWatcher); songAnswerWatcher = null; }
    if (songRevealTimeout) { clearTimeout(songRevealTimeout); songRevealTimeout = null; }
    if (speedRevealTimeout) { clearTimeout(speedRevealTimeout); speedRevealTimeout = null; }
    if (speedPreStartTimeout) { clearTimeout(speedPreStartTimeout); speedPreStartTimeout = null; }
    if (speedAnswerWatcher) { clearInterval(speedAnswerWatcher); speedAnswerWatcher = null; }
    if (songPreStartTimeout) { clearTimeout(songPreStartTimeout); songPreStartTimeout = null; }
    if (wtaTimerInterval) { clearInterval(wtaTimerInterval); wtaTimerInterval = null; }
    if (wtaRevealTimeout) { clearTimeout(wtaRevealTimeout); wtaRevealTimeout = null; }
    const audio = document.getElementById("song-audio");
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.removeAttribute("src");
        audio.load();
    }
    const songPlayButton = document.getElementById("song-play-button");
    if (songPlayButton) songPlayButton.textContent = "▶ Play Clip";
}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHtml(value) {

    return String(value ?? "")
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}
