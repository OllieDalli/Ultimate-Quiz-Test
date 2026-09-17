// Ultimate Quiz functional recovery patch.
// Loaded after app.js from supabase.js.
// This keeps Classic difficulty selection reliable and makes WTA question
// loading recover automatically if the first reservation/render races Realtime.
(function () {
    let recoveryTimer = null;
    let wtaBusy = false;

    function sameId(a, b) {
        return a != null && b != null && String(a) === String(b);
    }

    function patchDifficultyButtons() {
        if (!game || game.phase !== "difficulty") return;

        const isMyTurn = sameId(game.current_player_id, myPlayerId);
        document.querySelectorAll(".difficulty").forEach(button => {
            if (button.dataset.ultimateDifficultyPatched !== "true") {
                const replacement = button.cloneNode(true);
                replacement.dataset.ultimateDifficultyPatched = "true";

                replacement.addEventListener("click", async () => {
                    if (!game || game.phase !== "difficulty") return;
                    if (!sameId(game.current_player_id, myPlayerId)) return;

                    const difficulty = String(
                        replacement.dataset.difficulty || ""
                    ).toLowerCase();

                    if (!difficulty) return;
                    await chooseDifficulty(difficulty);
                });

                button.replaceWith(replacement);
                button = replacement;
            }

            button.disabled = !isMyTurn;
            button.style.pointerEvents = isMyTurn ? "auto" : "none";
        });
    }

    function setWtaLoading(message) {
        const element = document.getElementById("wta-question-text");
        if (element) element.textContent = message;
    }

    function hasRenderedWtaQuestion() {
        const question =
            typeof selectedQuestion !== "undefined"
                ? selectedQuestion
                : null;
        const answerButtons = document.getElementById("wta-answer-buttons");

        return Boolean(
            question?.id &&
            answerButtons &&
            answerButtons.querySelectorAll(".answer-button").length === 4
        );
    }

    async function recoverWtaQuestion() {
        if (wtaBusy || !game || game.phase !== "wta-question") return;
        if (hasRenderedWtaQuestion()) return;

        wtaBusy = true;
        setWtaLoading("Loading your question…");

        try {
            // The normal handler marks the round initialized before it tries to
            // reserve the first question. Reset that flag so a failed first
            // reservation can safely be attempted again.
            wtaRoundInitialized = false;
            wtaQuestionLoading = true;

            const loaded = await loadWtaQuestionForMe();

            if (loaded) {
                wtaRoundInitialized = true;
                renderWtaQuestion();
            }
        } catch (error) {
            console.error("WTA question recovery failed:", error);
        } finally {
            wtaQuestionLoading = false;
            wtaBusy = false;
        }
    }

    function runRecovery() {
        patchDifficultyButtons();

        if (game?.phase === "wta-question") {
            if (!hasRenderedWtaQuestion() && !wtaBusy) {
                recoverWtaQuestion();
            }
        }
    }

    function startRecovery() {
        if (recoveryTimer) return;
        recoveryTimer = setInterval(runRecovery, 400);
        runRecovery();
    }

    function stopRecovery() {
        if (recoveryTimer) {
            clearInterval(recoveryTimer);
            recoveryTimer = null;
        }
    }

    document.addEventListener("DOMContentLoaded", startRecovery);
    window.addEventListener("beforeunload", stopRecovery);
})();
