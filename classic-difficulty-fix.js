// ============================================================
// CLASSIC DIFFICULTY SELECTION FIX
// ============================================================
// The previous Classic flow reserved a blank answer row before moving
// into the question phase. That extra write could make difficulty selection
// appear to do nothing. A question is now selected from unused questions,
// the game is moved to the question phase, and the answer row is created
// only when the player actually answers.

(function installClassicDifficultyFix() {
    const install = () => {
        if (typeof chooseDifficulty !== "function") return false;

        window.chooseDifficulty = async function fixedChooseDifficulty(difficulty) {
            if (!game) return;

            const isCurrentPlayer =
                String(game.current_player_id || "") === String(myPlayerId || "");

            if (!isCurrentPlayer) return;
            if (!POINTS[difficulty]) return;

            const questions = getQuestionsForDifficulty(difficulty);

            if (!questions?.length) {
                alert("There are no questions for this difficulty.");
                return;
            }

            const { data: usedAnswers, error: usedAnswersError } =
                await supabaseClient
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
                await supabaseClient
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
