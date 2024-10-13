import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Questions } from "../helpers/Questions";

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // Timer (60 seconds)
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Resume quiz from localStorage if available
    const savedQuizData = localStorage.getItem("quizData");
    if (savedQuizData) {
      const quizData = JSON.parse(savedQuizData);
      setCurrentQuestionIndex(quizData.currentQuestionIndex);
      setCorrectAnswers(quizData.correctAnswers);
      setWrongAnswers(quizData.wrongAnswers);
      setTimeLeft(quizData.timeLeft);
    }

    // Timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          setIsQuizFinished(true);
        }
        return prevTime > 0 ? prevTime - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Save quiz data to localStorage every time the question index or answers change
    const quizData = {
      currentQuestionIndex,
      correctAnswers,
      wrongAnswers,
      timeLeft,
    };
    localStorage.setItem("quizData", JSON.stringify(quizData));
  }, [currentQuestionIndex, correctAnswers, wrongAnswers, timeLeft]);

  const handleAnswerSelection = (option) => {
    setSelectedAnswer(option.toLowerCase()); // Convert selected answer to lowercase
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === "") return; // Prevent moving to next question without answer

    const correctAnswer = Questions[currentQuestionIndex].answer;

    // Check if the selected answer is correct
    if (selectedAnswer === correctAnswer.toLowerCase()) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }

    setSelectedAnswer(""); // Reset the selected answer

    if (currentQuestionIndex + 1 < Questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true); // Quiz completed
      localStorage.removeItem("quizData"); // Clear saved quiz data when finished
    }
  };

  const handleQuitQuiz = () => {
    navigate("/main-page"); // Navigate back to home or any other page
  };

  return (
    <div className="container-quiz-page py-10">
      {isQuizFinished ? (
        <div className="quiz-results w-full flex-column">
          <h2>Hasil Kuis</h2>
          <p>Benar: {correctAnswers}</p>
          <p>Salah: {wrongAnswers}</p>
          <p>Total Jawaban: {correctAnswers + wrongAnswers}</p>
          <Button className="" color="blue" onClick={handleQuitQuiz}>
            Selesai
          </Button>
        </div>
      ) : (
        <div className="items-center">
          <div className="flex flex-row justify-between w-full">
            <h2>
              Soal {currentQuestionIndex + 1} dari {Questions.length}
            </h2>
            <div className="timer">Sisa Waktu: {timeLeft} detik</div>
          </div>

          <div className="question-wrapper items-center ">
            <h3>{Questions[currentQuestionIndex].question}</h3>
            <div className="options flex-column">
              <Button color="green" className={` mb-2 mt-2  option-button ${selectedAnswer === "a" ? "selected" : ""}`} onClick={() => handleAnswerSelection("A")}>
                {Questions[currentQuestionIndex].optionA}
              </Button>

              <Button color="green" className={`mb-2 option-button ${selectedAnswer === "b" ? "selected" : ""}`} onClick={() => handleAnswerSelection("B")}>
                {Questions[currentQuestionIndex].optionB}
              </Button>

              <Button color="green" className={`mb-2  option-button ${selectedAnswer === "c" ? "selected" : ""}`} onClick={() => handleAnswerSelection("C")}>
                {Questions[currentQuestionIndex].optionC}
              </Button>

              <Button color="green" className={`mb-2 option-button ${selectedAnswer === "d" ? "selected" : ""}`} onClick={() => handleAnswerSelection("D")}>
                {Questions[currentQuestionIndex].optionD}
              </Button>
            </div>
          </div>

          <div className="navigation-buttons">
            <Button color="blue" className="mb-2" onClick={handleNextQuestion}>
              Soal Selanjutnya
            </Button>
            <Button color="red" className="" onClick={handleQuitQuiz}>
              Keluar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
