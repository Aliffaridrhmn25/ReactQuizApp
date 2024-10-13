import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import QuizPage from "./components/QuizPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main-page" element={<MainPage />} />
      <Route path="/quiz-page" element={<QuizPage />} />
    </Routes>
  );
}
