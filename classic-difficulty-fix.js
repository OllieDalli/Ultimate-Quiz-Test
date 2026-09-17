// ============================================================
// CLASSIC DIFFICULTY SELECTION FIX
// ============================================================
// Keeps Classic difficulty selection independent from the older
// chooseDifficulty implementation. The helper and Supabase client
// references are defined here so this file works with the current build.

(function installClassicDifficultyFix() {
    const install = () => {
        if (typeof chooseDifficulty !== "function") return false;

        // questions.js declares QUESTIONS in the global script scope.
        // Use the global binding directly rather than window.QUESTIONS,
        // because a top-level const is not exposed as a window property.
        if (typeof getQuestionsForDifficulty !== "function") {
            window.getQuestionsForDifficulty = function getQuestionsForDifficulty(difficulty) {
                if (typeof QUESTIONS === "undefined" || !Array.isArray(QUESTIONS)) {
                    return [];
                }

                const normalized = String(difficulty || "").toLowerCase();
                return QUESTIONS.filter(question =>
                    String(question?.difficulty || "").toLowerCase() === normalized
                );
            };
        }

        window.chooseDifficulty = async function fixedChooseDifficulty(difficulty) {
            if (!game) return;

            const isCurrentPlayer =
                String(game.current_player_id || "") === String(myPlayerId || "");

            if (!isCurrentPlayer) return;
            if (!POINTS[difficulty]) return;

            const questions = window.getQuestionsForDifficulty(difficulty);

            if (!questions?.length) {
                alert("There are no questions for this difficulty.");
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
