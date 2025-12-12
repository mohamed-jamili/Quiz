import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage({
  progress,
  userName,
  onStartLevel,
  onChangeName,
  theme,
  setTheme,
  lang,
  setLang,
  totalStars,
  t,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const getDifficulty = (level) => {
    if (level <= 15) return "Easy";
    if (level <= 30) return "Medium";
    if (level <= 45) return "Hard";
    return "Expert";
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-left nav-logo">
             <h1 style={{ cursor: "pointer", color: '#ef4444', marginRight: '10px' }} onClick={() => navigate("/home")}>
              QuizByJamili
            </h1>
            <svg
              className="trophy-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
            >
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
          </div>

          <div className="nav-center user-info" onClick={() => setShowMenu(!showMenu)}>
            <span className="user-name">{userName}</span>
             <div className="user-avatar">{userName[0]?.toUpperCase()}</div>
             <svg className="dropdown-icon" viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
             
             {showMenu && (
              <div className="dropdown-menu">
                <div
                  className="menu-item"
                  onClick={() => {
                    onChangeName();
                    setShowMenu(false);
                  }}
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  </svg>
                  {t.changeName}
                </div>
                <div className="menu-item">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  </svg>
                  {t.level}: {progress.unlockedLevels}/50
                </div>
                <div className="menu-item" onClick={() => navigate("/stats")}>
                  <svg viewBox="0 0 24 24">
                    <path d="M3 3v18h18" />
                  </svg>
                  {t.stats}
                </div>
              </div>
            )}
          </div>

          <div className="nav-right">
            <div className="stars-wallet">
              <span>⭐ {totalStars}</span>
            </div>
            
            <button
              className="theme-btn"
              onClick={() => setLang(lang === "en" ? "fr" : "en")}
            >
              🌐 {lang.toUpperCase()}
            </button>

            <button
              className="theme-btn"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </nav>

      <div className="main-content">
        <div className="header-section">
          <h2 className="main-title">{t.selectLevel}</h2>
          <p className="main-subtitle">{t.unlockNext}</p>
        </div>

        <div className="levels-grid">
          {Array.from({ length: 50 }, (_, i) => i + 1).map((level) => {
            const isUnlocked = level <= progress.unlockedLevels;
            const score = progress.levelScores[level];
            const difficulty = getDifficulty(level);

            return (
              <div
                key={level}
                className={`level-card ${isUnlocked ? "unlocked" : "locked"}`}
                onClick={() => isUnlocked && onStartLevel(level)}
              >
                {!isUnlocked && (
                  <svg className="lock-icon" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                )}

                {score !== undefined && (
                  <svg className="check-icon" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}

                <div className="card-content">
                  <div className="level-number">#{level}</div>
                  <div
                    className={`difficulty-badge difficulty-${difficulty.toLowerCase()}`}
                  >
                    {t[difficulty.toLowerCase()]}
                  </div>
                  {score !== undefined && (
                    <div className="score-display">
                      <svg
                        className="star-icon"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span>{score}/10</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 QuizMaster Pro — Master all 50 levels!</p>
        </div>
      </footer>
    </div>
  );
}
