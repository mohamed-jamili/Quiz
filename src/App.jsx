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
  const [gender, setGender] = useState("");
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("ar");
  const [totalStars, setTotalStars] = useState(0);

  const [progress, setProgress] = useState({
    unlockedLevels: 1,
    levelScores: {},
    achievements: [],
    history: []
  });

  useEffect(() => {
    const savedName = localStorage.getItem("quizUserName");
    const savedGender = localStorage.getItem("quizGender");
    const savedTheme = localStorage.getItem("theme");
    const savedProgress = localStorage.getItem("quizProgress");
    const savedLang = localStorage.getItem("quizLang");
    const savedStars = localStorage.getItem("quizStars");

    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLang(savedLang);
    if (savedStars) setTotalStars(parseInt(savedStars));
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      setProgress({
        unlockedLevels: 1,
        levelScores: {},
        achievements: [],
        history: [],
        ...parsed
      });
    }
    
    if (savedName) setUserName(savedName);
    if (savedGender) setGender(savedGender);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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

  useEffect(() => {
    localStorage.setItem("quizStars", totalStars);
  }, [totalStars]);

  useEffect(() => {
    localStorage.setItem("quizProgress", JSON.stringify(progress));
  }, [progress]);

  const handleStart = (name, selectedGender) => {
    if (!name.trim() || !selectedGender) return;
    setUserName(name);
    setGender(selectedGender);
    localStorage.setItem("quizUserName", name);
    localStorage.setItem("quizGender", selectedGender);
    navigate("/home");
  };

  const handleChangeName = () => {
    localStorage.removeItem("quizUserName");
    localStorage.removeItem("quizGender");
    setUserName("");
    setGender("");
    navigate("/");
  };

  const handleLevelComplete = (level, score, earnedStars) => {
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
              gender={gender}
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
