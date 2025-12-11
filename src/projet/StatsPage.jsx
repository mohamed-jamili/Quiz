import { useNavigate } from "react-router-dom";

export default function StatsPage({ progress, t }) {
  const navigate = useNavigate();
  
  const totalLevels = 50;
  const completedLevels = Object.keys(progress.levelScores).length;
  const totalScore = Object.values(progress.levelScores).reduce((a, b) => a + b, 0);
  const avgScore = completedLevels > 0 ? (totalScore / completedLevels).toFixed(1) : 0;

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-content">
          <button onClick={() => navigate('/home')} className="home-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>{t.home}</span>
          </button>
          <h1 className="stats-title">{t.stats}</h1>
        </div>
      </nav>

      <div className="stats-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-value">{completedLevels}/{totalLevels}</div>
            <div className="stat-label">{t.level}s Completed</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-value">{totalScore}</div>
            <div className="stat-label">Total {t.score}</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-value">{avgScore}</div>
            <div className="stat-label">Average {t.score}</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-value">{progress.achievements.length}</div>
            <div className="stat-label">Achievements</div>
          </div>
        </div>

        {progress.history.length > 0 && (
          <div className="history-section">
            <h2 className="section-title">Recent Activity</h2>
            <div className="history-list">
              {progress.history.slice(0, 10).map((item, idx) => (
                <div key={idx} className="history-item">
                  <div className="history-info">
                    <span className="history-level">{t.level} {item.level}</span>
                    <span className="history-score">{item.score}/10</span>
                  </div>
                  <div className="history-stars">
                    {Array.from({ length: item.stars }).map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {progress.achievements.length > 0 && (
          <div className="achievements-section">
            <h2 className="section-title">Achievements</h2>
            <div className="achievements-list">
              {progress.achievements.map((achievement, idx) => (
                <div key={idx} className="achievement-badge">
                  🏅 {achievement}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
