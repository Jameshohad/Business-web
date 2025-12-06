import { useState } from "react";
import "./Quiz.css";

export default function Quiz() {

  const questions = [
    {
      question: "“你好” in English means?",
      options: ["Goodbye", "Hello", "Thank you"],
      answer: "Hello"
    },
    {
      question: "How do you say 'Thank you' in Chinese?",
      options: ["对不起", "谢谢", "再见"],
      answer: "谢谢"
    },
    {
      question: "What does '再见' mean?",
      options: ["Hello", "Goodbye", "Please"],
      answer: "Goodbye"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selected, setSelected] = useState(null);

  const q = questions[current];

  function selectAnswer(choice) {
    setSelected(choice);

    if (choice === q.answer) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Wrong! Correct answer: ${q.answer}`);
    }
  }

  function nextQuestion() {
    setFeedback("");
    setSelected(null);
    setCurrent(current + 1);
  }

  return (
    <div className="quiz">

      <h2>Chinese Quiz</h2>

      <p className="progress">
        Question {current + 1} / {questions.length}
      </p>

      <div className="quiz-card">

        <h3>{q.question}</h3>

        <div className="options">
          {q.options.map((opt) => (
            <button
              key={opt}
              onClick={() => selectAnswer(opt)}
              disabled={!!feedback}
              className={
                feedback
                  ? opt === q.answer
                    ? "correct"
                    : opt === selected
                    ? "wrong"
                    : "disabled"
                  : ""
              }
            >
              {opt}
            </button>
          ))}
        </div>

        {feedback && (
          <div className="feedback">
            {feedback}
          </div>
        )}

        {feedback && current < questions.length - 1 && (
          <button className="next-btn" onClick={nextQuestion}>
            Next Question →
          </button>
        )}

        {current === questions.length - 1 && feedback && (
          <p className="score">
            🎯 Final Score: {score} / {questions.length}
          </p>
        )}

      </div>

    </div>
  );
}

