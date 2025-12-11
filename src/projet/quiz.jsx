import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { questionsData } from "./data";

export default function Quiz({ userName, onLevelComplete, totalStars, setTotalStars, t, lang }) {
  const { level } = useParams();
  const navigate = useNavigate();
  const levelNum = parseInt(level) || 1;
  // Fallback to level 1 data if specific level data missing, but we generated up to 50.
  const sourceData = questionsData[levelNum] || questionsData[1];

  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showResult, setShowResult] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [fiftyUsed, setFiftyUsed] = useState(false);
  const [hidden, setHidden] = useState([]);
  
  // Stars earned in this session
  const [sessionStars, setSessionStars] = useState(0);

  // Helper to get localized text
  const getQText = (q) => {
    if (!q) return "";
    if (typeof q === 'string') return q; 
    return q[lang] || q['en'] || "";
  };

  const getOptions = (opts) => {
    if (!opts) return [];
    if (Array.isArray(opts)) return opts;
    return opts[lang] || opts['en'] || [];
  };

  // Initialize and Shuffle Questions
  useEffect(() => {
    if (sourceData && sourceData.questions) {
      // Clone and shuffle
      const shuffled = [...sourceData.questions]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10); // Ensure max 10 questions
      setQuestions(shuffled);
    }
  }, [levelNum, sourceData]);

  const question = questions[currentQ];
  const qText = question ? getQText(question.q) : "";
  const options = question ? getOptions(question.opts) : [];

  // Timer
  useEffect(() => {
    if (selected !== null || showResult || !question) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQ, selected, showResult, question]);

  // Handle Timeout
  useEffect(() => {
    if (timeLeft === 0 && selected === null && !showResult && question) {
      handleAnswer(null, true);
    }
  }, [timeLeft]);

  // Reset for new question
  useEffect(() => {
    setSelected(null);
    setHidden([]);
    setTimeLeft(15);
  }, [currentQ]);

  const handleAnswer = (idx, timeout = false) => {
    if (selected !== null) return;

    setSelected(timeout ? -1 : idx);

    const isCorrect = !timeout && idx === question.correct;
    let newScore = score;
    
    if (isCorrect) {
      const bonus = timeLeft >= 10 ? 2 : timeLeft >= 5 ? 1 : 0;
      // Stars: +1 for correct answer
      setTotalStars(prev => prev + 1);
      setSessionStars(prev => prev + 1);

      // Score calculation (kept for level unlocking logic)
      newScore = score + 1 + bonus; 
      setScore(newScore);
    }

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(prev => prev + 1);
      } else {
        setShowResult(true);
        // Pass total score for unlocking, and sessionStars just for info if needed
        onLevelComplete(levelNum, newScore, sessionStars + (isCorrect ? 1 : 0)); 
      }
    }, 1000);
  };

  const handleSkip = () => {
    if (selected !== null) return;
    if (currentQ < questions.length - 1) setCurrentQ(prev => prev + 1);
    else {
        setShowResult(true);
        onLevelComplete(levelNum, score, sessionStars);
    }
  };

  const handleRetry = () => {
    // Re-shuffle on retry? logic says "exit changes order", retry implies same level. 
    // Usually retry reloads the level. Let's trigger re-shuffle by resetting state.
    // We can just navigate to self or reset questions from source again.
    const shuffled = [...sourceData.questions]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);
    setQuestions(shuffled);
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setSessionStars(0);
    setShowResult(false);
    setFiftyUsed(false);
    setHidden([]);
    setTimeLeft(15);
  };

  const useFifty = () => {
    if (fiftyUsed || selected !== null) return;
    const currentOptions = getOptions(question.opts);
    const wrong = currentOptions.map((_, i) => i).filter(i => i !== question.correct);
    // Hide 2 random wrong answers
    const shuffledWrong = wrong.sort(() => Math.random() - 0.5).slice(0, 2);
    setHidden(shuffledWrong);
    setFiftyUsed(true);
  };

  const buyAnswer = () => {
    if (selected !== null || totalStars < 10) return;
    
    // Deduct stars
    setTotalStars(prev => prev - 10);
    
    // Auto answer correctly
    handleAnswer(question.correct);
  };

  if (!question && !showResult && questions.length > 0) return <div>Loading...</div>;
  if (questions.length === 0 && !showResult) return <div>Loading Questions...</div>;

  // Result Screen
  if (showResult) {
    return (
      <div className="app-container">
        <div className="quiz-content">
          <div className="result-card">
            <svg className="trophy-big" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>

            <h2 className="result-title">{t.level} {levelNum} Complete!</h2>
            <p className="result-score">{score}</p>
            <p className="result-subtitle">{t.stars}: +{sessionStars}</p>

            {score >= 5 ? ( 
              <div className="result-message">
                <p className="success-msg">🎉 {t.congrats} {userName}!</p>
                <p className="result-subtitle">{t.unlockNext}</p>
              </div>
            ) : (
              <div className="result-message">
                <p className="result-subtitle">{t.keepTrying} {userName}!</p>
                <p className="result-subtitle">{t.needScore}</p> 
              </div>
            )}

            <div className="result-actions">
              <button onClick={handleRetry} className="retry-btn">{t.retry}</button>
              <button onClick={() => navigate("/home")} className="back-btn">{t.home}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Quiz
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-content quiz-nav">
          <button onClick={() => setShowExit(true)} className="home-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>{t.exit}</span>
          </button>

          <div className="quiz-info">
             <div className="stars-wallet">
              <span>⭐ {totalStars}</span>
            </div>
            <div className="user-badge">
              <div className="user-avatar-small">{userName[0]?.toUpperCase()}</div>
              <span>{userName}</span>
            </div>
            <span className="level-badge">{t.level} {levelNum}</span>
            <span className="score-badge">{t.score}: {score}</span>
            <span className="timer-badge">⏱ {timeLeft}s</span>
          </div>
        </div>
      </nav>

      <div className="quiz-content">
        <div className="quiz-card">
          <div className="progress-section">
            <div className="progress-info">
              <span className="question-count">{t.question} {currentQ + 1}/{questions.length}</span>
              <span className="category-badge">{question.category}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <h2 className="question-text">{qText}</h2>

          <div className="options-grid">
            {options.map((option, idx) => {
              if (hidden.includes(idx)) return null;

              let btnClass = "option-btn";
              if (selected !== null) {
                if (idx === question.correct) btnClass += " correct";
                else if (idx === selected) btnClass += " incorrect";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={selected !== null}
                  className={btnClass}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <div className="quiz-actions">
            <button 
              onClick={buyAnswer} 
              className="buy-btn" 
              disabled={selected !== null || totalStars < 10}
              title={totalStars < 10 ? t.notEnoughStars : t.buyAnswer}
            >
              🔑 {t.buyAnswer}
            </button>
            <button 
              onClick={useFifty} 
              className="skip-btn" 
              disabled={fiftyUsed || selected !== null}
            >
              💡 {t.fiftyFifty}
            </button>
            <button 
              onClick={handleSkip} 
              className="skip-btn" 
              disabled={selected !== null}
            >
              ⏭ {t.skip}
            </button>
          </div>
        </div>
      </div>


      {showExit && (
        <div className="modal-overlay" onClick={() => setShowExit(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">{t.exitConfirmTitle}</h3>
            <p className="modal-text">{t.exitConfirmText}</p>
            <div className="modal-actions">
              <button onClick={() => navigate("/home")} className="modal-btn danger">
                {t.exitBtn}
              </button>
              <button onClick={() => setShowExit(false)} className="modal-btn">
                {t.continue}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
