
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestions } from "./data";

export default function Quiz({
  userName,
  onLevelComplete,
  totalStars,
  setTotalStars,
  t,
  lang,
  gender
}) {
  const { level } = useParams();
  const navigate = useNavigate();
  const currentLevel = parseInt(level);

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [streak, setStreak] = useState(0);
  
  // New features state
  const [timeLeft, setTimeLeft] = useState(30);
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    // Load questions based on gender
    const allQuestions = getQuestions(gender);
    if (allQuestions[currentLevel]) {
      setQuestions(allQuestions[currentLevel].questions);
    } else {
      // Fallback if level doesn't exist
      navigate("/home");
    }
    
    // Reset state
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setStreak(0);
    setTimeLeft(30); // Reset timer logic
  }, [currentLevel, gender, navigate]);

  // Timer Effect
  useEffect(() => {
    if (showResult || selectedOption !== null || !questions.length || showExitModal) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, showResult, selectedOption, questions, showExitModal]);

  // Reset timer on new question
  useEffect(() => {
    setTimeLeft(30);
  }, [currentQuestion]);

  const handleTimeOut = () => {
    // Treat timeout as wrong answer
    setSelectedOption(-1); // -1 indicates timeout/no selection
    setIsCorrect(false);
    setStreak(0);
    
    setTimeout(() => {
      nextQuestion(score);
    }, 1500);
  };

  const handleAnswer = (optionIndex) => {
    if (selectedOption !== null) return;

    setSelectedOption(optionIndex);
    const correctNode = questions[currentQuestion].correct;
    
    const isRight = optionIndex === correctNode;
    setIsCorrect(isRight);

    if (isRight) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      nextQuestion(score + (isRight ? 1 : 0));
    }, 1500); 
  };

  const nextQuestion = (currentScore) => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        finishQuiz(currentScore);
      }
  };

  const handleSkip = () => {
     if (selectedOption !== null) return;
     nextQuestion(score); // No points for skip
  };

  const handleBuyAnswer = () => {
     if (selectedOption !== null || totalStars < 10) return;
     
     // Deduct stars
     setTotalStars(prev => prev - 10);
     
     // Show answer: simluate click on correct option
     const correctNode = questions[currentQuestion].correct;
     handleAnswer(correctNode);
  };

  const finishQuiz = (finalScore) => {
    const earnedStars = finalScore >= 9 ? 3 : finalScore >= 7 ? 2 : finalScore >= 5 ? 1 : 0;
    
    // Only update if not already completed/shown
    if (!showResult) {
       onLevelComplete(currentLevel, finalScore, earnedStars);
       setShowResult(true);
    }
  };

  const handleExitRequest = () => {
    setShowExitModal(true);
  };

  const confirmExit = () => {
    setShowExitModal(false);
    navigate("/home");
  };

  const cancelExit = () => {
    setShowExitModal(false);
  };

  if (!questions || questions.length === 0) return <div className="app-container"><div className="main-content">Loading...</div></div>;

  const questionData = questions[currentQuestion];

  if (showResult) {
    const earnedStars = score >= 9 ? 3 : score >= 7 ? 2 : score >= 5 ? 1 : 0;
    const isPass = score >= 5;

    return (
      <div className="app-container">
        <div className="welcome-container">
          <div className="welcome-card" style={{textAlign: 'center'}}>
            
            <div style={{fontSize: '4rem', marginBottom: '1rem'}}>
              {isPass ? '🎉' : '😢'}
            </div>
            
            <h2 className="main-title">
              {isPass ? t.congrats : t.gameOver || "Game Over"}
            </h2>
            
            <div className="score-display" style={{justifyContent: 'center', fontSize: '1.5rem', margin: '1.5rem 0'}}>
              <span>{t.score}: {score}/10</span>
            </div>

            <div style={{fontSize: '2rem', marginBottom: '2rem'}}>
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} style={{ opacity: i < earnedStars ? 1 : 0.3 }}>⭐</span>
              ))}
            </div>

            <p style={{color: 'var(--text-dim)', marginBottom: '2rem'}}>
              {isPass 
                ? (score === 10 ? (t.perfect || "Perfect!") : (t.goodJob || "Good Job!"))
                : (t.tryAgainMsg || "Try Again!")}
            </p>

            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
               {isPass && currentLevel < 50 && (
                <button className="primary-btn" onClick={() => navigate(`/quiz/${currentLevel + 1}`)}>
                  {t.nextLevel} ➡️
                </button>
              )}
              
              <div style={{display: 'flex', gap: '1rem'}}>
                <button className="theme-btn" onClick={() => window.location.reload()} style={{flex: 1, justifyContent: 'center'}}>
                  🔄 {t.retry}
                </button>
                <button className="theme-btn" onClick={() => navigate("/home")} style={{flex: 1, justifyContent: 'center'}}>
                  🏠 {t.home}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
       <nav className="navbar" style={{position: 'static', marginBottom: '0'}}>
        <div className="nav-content">
          <div className="nav-left">
             <div className="nav-logo" style={{fontSize: '1.2rem', fontWeight: 'bold'}}>
               {t.level} {currentLevel} • {questions[0]?.category[lang]}
            </div>
          </div>
          
          <div className="nav-center">
             <div className={`timer-badge ${timeLeft <= 5 ? 'danger' : timeLeft <= 10 ? 'warning' : ''}`}>
               ⏳ {timeLeft}s
             </div>
          </div>

          <div className="nav-right" style={{display: 'flex', gap: '10px'}}>
             <div className="stars-wallet">
              ⭐ {totalStars}
            </div>
            <button className="theme-btn" onClick={handleExitRequest}>
              ⬅️ {t.back || "Back"}
            </button>
          </div>
        </div>
      </nav>

      <div className="quiz-container">
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${((currentQuestion) / 10) * 100}%` }}
          ></div>
        </div>

        <div className="question-card">
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-dim)'}}>
            <span>Question {currentQuestion + 1}/10</span>
            <span>🔥 {streak}</span>
          </div>

          <h2 className="question-text">
            {questionData.q[lang]}
          </h2>

          <div className="options-grid">
            {questionData.opts[lang].map((opt, index) => {
              let btnClass = "option-btn";
              if (selectedOption !== null) {
                if (index === questionData.correct) btnClass += " correct";
                else if (index === selectedOption) btnClass += " incorrect";
                else if (selectedOption === -1 && index === questionData.correct) btnClass += " correct"; // Show correct if timed out
              }
              
              return (
                <button
                  key={index}
                  className={btnClass}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedOption !== null}
                >
                  <span style={{opacity: 0.7, marginRight: '10px'}}>{String.fromCharCode(65 + index)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>

          <div className="quiz-actions">
            <button 
              className="action-btn" 
              onClick={handleBuyAnswer}
              disabled={totalStars < 10 || selectedOption !== null}
              title="Cost: 10 Stars"
            >
              💡 {t.buyAnswer || "Answer"} (-10 ⭐)
            </button>
             <button 
              className="action-btn" 
              onClick={handleSkip}
              disabled={selectedOption !== null}
            >
              ⏭️ {t.skip || "Skip"}
            </button>
          </div>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <h3>⚠️ {t.exitConfirmTitle || "Quit Quiz?"}</h3>
            <p>{t.exitConfirmMsg || "Are you sure you want to quit? Your progress for this level will be lost."}</p>
            <div className="modal-actions">
              <button className="option-btn" style={{flex:1, justifyContent: 'center'}} onClick={cancelExit}>
                {t.cancel || "Cancel"}
              </button>
              <button 
                className="primary-btn" 
                style={{flex:1, background: 'var(--primary-dark)'}} 
                onClick={confirmExit}
              >
                {t.quit || "Quit"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
