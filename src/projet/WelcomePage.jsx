import { useState } from "react";

export default function WelcomePage({ onStart, t, lang, setLang }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div style={{ position: "absolute", top: "20px", right: "20px" }}>
          <button
            className="theme-btn"
            onClick={() => setLang(lang === "en" ? "fr" : "en")}
          >
            🌐 {lang.toUpperCase()}
          </button>
        </div>

        <svg
          className="trophy-big"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>

        <h1 className="welcome-title">Quiz by JAMILI</h1>
        <p className="welcome-subtitle">{t.welcome}</p>

        <div className="name-input-container">
          <input
            type="text"
            placeholder={t.enterName}
            className="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
            maxLength={20}
            autoFocus
          />
          <button
            onClick={handleSubmit}
            className="start-btn"
            disabled={!name.trim()}
          >
            {t.start}
          </button>
        </div>

        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <span className="feature-text">50 {t.level}s</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🏆</span>
            <span className="feature-text">6 Categories</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⭐</span>
            <span className="feature-text">{t.needScore}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
