import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import WelcomePage from "./projet/WelcomePage";
import HomePage from "./projet/HomePage";
import Quiz from "./projet/quiz";
import StatsPage from "./projet/StatsPage";
import { translations } from "./projet/translations";

function AppContent() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("en");
  const [totalStars, setTotalStars] = useState(0); 

  const [progress, setProgress] = useState({
    unlockedLevels: 1,
    levelScores: {},
    achievements: [],
    history: []
  });

  // Charger les données au démarrage
  useEffect(() => {
    const savedName = localStorage.getItem("quizUserName");
    const savedTheme = localStorage.getItem("theme");
    const savedProgress = localStorage.getItem("quizProgress");
    const savedLang = localStorage.getItem("quizLang");
    const savedStars = localStorage.getItem("quizStars");

    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLang(savedLang);
    if (savedStars) setTotalStars(parseInt(savedStars));
    if (savedProgress) setProgress(JSON.parse(savedProgress));
    
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  // Sauvegarder le thème
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  // Sauvegarder la langue et la direction
  useEffect(() => {
    localStorage.setItem("quizLang", lang);
    if (lang === 'ar') {
      document.body.classList.add('rtl');
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
    } else {
      document.body.classList.remove('rtl');
      document.documentElement.lang = lang;
      document.documentElement.dir = 'ltr';
    }
  }, [lang]);

  // Sauvegarder les étoiles
  useEffect(() => {
    localStorage.setItem("quizStars", totalStars);
  }, [totalStars]);

  // Sauvegarder la progression
  useEffect(() => {
    localStorage.setItem("quizProgress", JSON.stringify(progress));
  }, [progress]);

  const handleStart = (name) => {
    if (!name.trim()) return;
    setUserName(name);
    localStorage.setItem("quizUserName", name);
    navigate("/home");
  };

  const handleChangeName = () => {
    localStorage.removeItem("quizUserName");
    setUserName("");
    navigate("/");
  };

  const handleLevelComplete = (level, score, earnedStars) => {
    // Mise à jour des étoiles globales
    setTotalStars(prev => prev + earnedStars);

    setProgress(prev => {
      const newScores = { ...prev.levelScores, [level]: score };
      const newUnlocked = score >= 5 ? Math.max(prev.unlockedLevels, level + 1) : prev.unlockedLevels;

      const achievements = new Set(prev.achievements);
      if (score >= 5) achievements.add("First Win");
      if (score === 10) achievements.add("Perfect Score");

      const stars = score >= 9 ? 3 : score >= 7 ? 2 : score >= 5 ? 1 : 0;
      const newHistory = [
        { level, score, stars, date: new Date().toISOString() },
        ...prev.history
      ].slice(0, 50);

      return {
        unlockedLevels: newUnlocked,
        levelScores: newScores,
        achievements: Array.from(achievements),
        history: newHistory
      };
    });
  };

  const t = translations[lang];

  return (
    <Routes>
      <Route path="/" element={
        <WelcomePage 
          onStart={handleStart} 
          t={t} 
          lang={lang} 
          setLang={setLang} 
        />
      } />
      
      <Route
        path="/home"
        element={
          userName ? (
            <HomePage
              userName={userName}
              progress={progress}
              onStartLevel={(lvl) => navigate(`/quiz/${lvl}`)}
              onChangeName={handleChangeName}
              theme={theme}
              setTheme={setTheme}
              lang={lang}
              setLang={setLang}
              totalStars={totalStars}
              t={t}
            />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="/quiz/:level"
        element={
          userName ? (
            <Quiz 
              userName={userName} 
              onLevelComplete={handleLevelComplete} 
              totalStars={totalStars}
              setTotalStars={setTotalStars}
              t={t}
              lang={lang}
            />
          ) : (
            <Navigate to="/" />
          )
        }
      />


      <Route
        path="/stats"
        element={
          userName ? (
            <StatsPage 
              progress={progress} 
              t={t} 
            />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route path="*" element={<Navigate to={userName ? "/home" : "/"} />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}