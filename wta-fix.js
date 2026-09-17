// WTA question loading recovery patch.
// Loaded after app.js so it can safely wrap the existing WTA flow.
(function () {
    let retryTimer = null;
    let retryCount = 0;
    const MAX_RETRIES = 12;

    function setWtaLoading(message) {
        const el = document.getElementById('wta-question-text');
        if (el) el.textContent = message;
    }

    function resetWtaLoadingState() {
        if (typeof wtaQuestionLoading !== 'undefined') wtaQuestionLoading = false;
        if (typeof wtaRoundInitialized !== 'undefined') wtaRoundInitialized = false;
    }

    function retryWtaLoad() {
        if (!game || game.phase !== 'wta-question') return;
        if (retryCount >= MAX_RETRIES) {
            setWtaLoading('Could not load a WTA question. Please refresh and rejoin the game.');
            return;
        }
        retryCount += 1;
        resetWtaLoadingState();
        setWtaLoading('Loading your question…');
        clearTimeout(retryTimer);
        retryTimer = setTimeout(() => {
            try {
                handleWtaQuestionPhase?.();
            } catch (error) {
                console.error('WTA retry failed:', error);
                retryWtaLoad();
            }
        }, Math.min(900, 250 + retryCount * 50));
    }

    const original = window.handleWtaQuestionPhase;
    if (typeof original !== 'function') {
        console.error('WTA fix could not find handleWtaQuestionPhase');
        return;
    }

    window.handleWtaQuestionPhase = async function patchedHandleWtaQuestionPhase() {
        if (!game || game.phase !== 'wta-question') return;

        try {
            await original.apply(this, arguments);

            const answerButtons = document.getElementById('wta-answer-buttons');
            const hasQuestion = typeof selectedQuestion !== 'undefined' && selectedQuestion?.id;
            const hasAnswers = answerButtons && answerButtons.children.length > 0;

            if (!hasQuestion || !hasAnswers) {
                console.warn('WTA question did not render; retrying.', {
                    round: game.round,
                    questionId: game.current_question_id
                });
                retryWtaLoad();
                return;
            }

            retryCount = 0;
        } catch (error) {
            console.error('WTA question loading failed:', error);
            retryWtaLoad();
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        if (game?.phase === 'wta-question') retryWtaLoad();
    });
})();
