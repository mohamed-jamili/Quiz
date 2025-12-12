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
          <div className="nav-left">
            <button onClick={() => navigate('/home')} className="theme-btn">
              🏠 {t.home}
            </button>
          </div>
          <div className="nav-center">
             <h1 style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{t.stats}</h1>
          </div>
          <div className="nav-right">
             {/* Empty for balance or could add something later */}
          </div>
        </div>
      </nav>

      <div className="main-content">
        <div className="stats-grid">
          <div className="stat-card">
             <div className="stat-icon icon-gold">🏆</div>
             <div className="stat-value text-red">{progress.achievements.length}</div>
             <div className="stat-label">Achievements</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon icon-blue">📊</div>
            <div className="stat-value text-red">{avgScore}</div>
            <div className="stat-label">Average</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon icon-yellow">⭐</div>
            <div className="stat-value text-red">{totalScore}</div>
            <div className="stat-label">{t.score}</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon icon-red">🎯</div>
            <div className="stat-value text-red">{completedLevels}/50</div>
            <div className="stat-label">{t.level}s</div>
          </div>
        </div>

        {progress.history.length > 0 && (
          <div className="history-section" style={{marginTop: '40px'}}>
            <h2 style={{marginBottom: '20px', fontSize: '1.5rem'}}>Recent Activity</h2>
            <div className="history-list">
              {progress.history.slice(0, 10).map((item, idx) => (
                <div key={idx} className="history-item">
                  <span style={{fontWeight: 'bold'}}>{t.level} {item.level}</span>
                  <span className="text-red" style={{fontWeight: 'bold'}}>{item.score}/10</span>
                  <span>{'⭐'.repeat(item.stars)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
