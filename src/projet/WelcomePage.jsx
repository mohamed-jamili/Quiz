
import { useState } from "react";

export default function WelcomePage({ onStart, t, lang, setLang }) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const handleStart = () => {
    if (!name.trim()) {
      setError(t?.enterName || "Please enter your name");
      return;
    }
    if (!gender) {
      setError(t?.selectGender || "Please select your gender");
      return;
    }
    onStart(name, gender);
  };

  return (
    <div className="app-container">
      <div className="welcome-container">
        
        <div className="welcome-card">
          <div className="nav-logo" style={{justifyContent: 'center', marginBottom: '1.5rem'}}>
            <svg
              className="trophy-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              style={{width: 48, height: 48}}
            >
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
            <h1 style={{fontSize: '2rem', color: '#ef4444',}}>QuizByJamili</h1>
          </div>

          <div className="input-group" style={{display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '2rem'}}>
             <button
              className="lang-btn-small"
              onClick={() => setLang(lang === "en" ? "fr" : lang === "fr" ? "ar" : "en")}
            >
              🌐 {lang.toUpperCase()}
            </button>
            <input
              type="text"
              className="name-input-simple"
              placeholder={t?.enterName || "Enter your name"}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              maxLength={15}
            />
          </div>

          <div style={{textAlign: 'center', marginBottom: '1rem'}}>
             <div className="gender-toggle-container">
                <div 
                  className={`gender-item ${gender === 'male' ? 'active' : ''}`}
                  onClick={() => setGender('male')}
                >
                   <span style={{fontSize: '1.2rem'}}>👨‍🎓</span> {lang === 'ar' ? 'ولد' : 'Boy'}
                </div>
                <div 
                  className={`gender-item ${gender === 'female' ? 'active' : ''}`}
                  onClick={() => setGender('female')}
                >
                   <span style={{fontSize: '1.2rem'}}>👩‍🎓</span> {lang === 'ar' ? 'بنت' : 'Girl'}
                </div>
             </div>
             
             <p style={{color: '#ef4444', marginTop: '1rem', fontSize: '0.9rem'}}>
               {t?.selectGender || "Select your gender"}
             </p>
          </div>

          {error && <p style={{ color: "#ef4444", marginBottom: "1rem" }}>{error}</p>}

          <button className="start-btn-simple" onClick={handleStart}>
            {t?.start || "Start Quiz"}
          </button>
        </div>
      </div>
    </div>
  );
}
