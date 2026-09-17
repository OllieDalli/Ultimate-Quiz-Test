// ============================================================
// CLASSIC DIFFICULTY SELECTION FIX
// ============================================================
// Classic questions live in questions.js. The main app and this patch
// must work even if the browser has an older cached copy of that file or
// the top-level QUESTIONS const is not exposed on window.

(function installClassicDifficultyFix() {
    let questionBankPromise = null;

    async function loadClassicQuestionBank() {
        // In a normal classic script, QUESTIONS is available as a global
        // lexical binding. Use it when it is already populated.
        try {
            if (typeof QUESTIONS !== "undefined" && Array.isArray(QUESTIONS) && QUESTIONS.length) {
                return QUESTIONS;
            }
        } catch (error) {
            console.warn("Could not read the normal Classic question bank:", error);
        }

        // Fallback: fetch a fresh copy so GitHub Pages/browser caching cannot
        // leave Classic with an old question bank. questions.js is generated
        // as: const QUESTIONS = [ ... ];
        if (!questionBankPromise) {
            const url = `questions.js?classic-cache-bust=${Date.now()}`;
            questionBankPromise = fetch(url, { cache: "no-store" })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Could not load questions.js (${response.status})`);
                    }
                    return response.text();
                })
                .then(source => {
                    const match = source.match(/const\s+QUESTIONS\s*=\s*(\[[\s\S]*\])\s*;?\s*$/);
                    if (!match) {
                        throw new Error("Could not find the QUESTIONS array in questions.js");
                    }

                    const parsed = JSON.parse(match[1]);
                    if (!Array.isArray(parsed)) {
                        throw new Error("Classic question bank is not an array");
                    }

                    return parsed;
                })
                .catch(error => {
                    questionBankPromise = null;
                    throw error;
                });
        }

        return questionBankPromise;
    }

    async function getClassicQuestionsForDifficulty(difficulty) {
        const bank = await loadClassicQuestionBank();
        const normalized = String(difficulty || "").trim().toLowerCase();

        return bank.filter(question =>
            String(question?.difficulty || "").trim().toLowerCase() === normalized
        );
    }

    const install = () => {
        if (typeof chooseDifficulty !== "function") return false;

        // Always replace the old helper so Classic uses the same reliable
        // question-bank loading path regardless of which app version loaded.
        window.getQuestionsForDifficulty = function getQuestionsForDifficulty(difficulty) {
            // Keep the public helper synchronous for compatibility with any
            // other code that may call it. If the normal global bank exists,
            // return its filtered questions immediately.
            try {
                if (typeof QUESTIONS !== "undefined" && Array.isArray(QUESTIONS)) {
                    const normalized = String(difficulty || "").trim().toLowerCase();
                    return QUESTIONS.filter(question =>
                        String(question?.difficulty || "").trim().toLowerCase() === normalized
                    );
                }
            } catch (error) {
                console.warn("Could not use the normal Classic question bank:", error);
            }
            return [];
        };

        window.chooseDifficulty = async function fixedChooseDifficulty(difficulty) {
            if (!game) return;

            const isCurrentPlayer =
                String(game.current_player_id || "") === String(myPlayerId || "");

            if (!isCurrentPlayer) return;
            if (!POINTS[difficulty]) return;

            let questions;
            try {
                questions = await getClassicQuestionsForDifficulty(difficulty);
            } catch (error) {
                console.error("Could not load Classic questions:", error);
                alert("Could not load the Classic questions. Please refresh the page and try again.");
                return;
            }

            if (!questions.length) {
                alert(`There are no Classic questions for ${difficulty}.`);
                return;
            }

            const { data: usedAnswers, error: usedAnswersError } =
                await supabase
                    .from("answers")
                    .select("question_id")
                    .eq("game_id", game.id);

            if (usedAnswersError) {
                console.error("Could not check used questions:", usedAnswersError);
                alert("Could not select a question. Please try again.");
                return;
            }

            const usedQuestionIds = new Set(
                (usedAnswers || [])
                    .map(answer => answer.question_id)
                    .filter(Boolean)
            );

            const unusedQuestions = questions.filter(
                question => !usedQuestionIds.has(question.id)
            );

            if (!unusedQuestions.length) {
                alert(`There are no unused ${difficulty} questions left in this game.`);
                return;
            }

            selectedQuestion = unusedQuestions[
                Math.floor(Math.random() * unusedQuestions.length)
            ];

            answerSubmitted = false;
            renderedQuestionId = null;

            const questionStartedAt = new Date().toISOString();

            const { data: updatedGame, error: difficultyError } =
                await supabase
                    .from("games")
                    .update({
                        phase: "question",
                        current_round_type: "classic",
                        current_difficulty: difficulty,
                        current_question_id: selectedQuestion.id,
                        current_answer: null,
                        question_started_at: questionStartedAt
                    })
                    .eq("id", game.id)
                    .select("*")
                    .single();

            if (difficultyError) {
                console.error("Could not save difficulty:", difficultyError);
                alert("Could not save the difficulty. Please try again.");
                return;
            }

            game = updatedGame || {
                ...game,
                phase: "question",
                current_round_type: "classic",
                current_difficulty: difficulty,
                current_question_id: selectedQuestion.id,
                current_answer: null,
                question_started_at: questionStartedAt
            };

            updateGameState();
        };

        return true;
    };

    // app.js loads after supabase.js, so wait for its original function to
    // exist, then replace it before a player can select a difficulty.
    const timer = setInterval(() => {
        if (install()) clearInterval(timer);
    }, 25);

    setTimeout(() => clearInterval(timer), 10000);
})();
