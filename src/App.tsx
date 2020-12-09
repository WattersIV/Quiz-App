import React, { useState } from 'react';
import { fetchQuizQuestions, Difficulty, QuestionState } from './API'
import QuestionCard from './components/QuestionCard'

const TOTAL_QUESTIONS = 10
type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const startTriva = async () => {
    setLoading(true)
    setGameOver(false)

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)

    setQuestions(newQuestions)
    setScore(0);
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }
  return (
    <div className="App">
      <h1>Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className='start' onClick={startTriva}>
          Start Game
        </button>
      ) : null}
      {!gameOver && <p className='score'> Score:</p>}
      {loading && <p> Loading Questions ...</p>}
      {!loading && !gameOver && <QuestionCard questionNum={number + 1} totalQuestions={TOTAL_QUESTIONS} question={questions[number].question}
        answers={questions[number].answers} userAnswer={userAnswers ? userAnswers[number] : undefined} callback={checkAnswer} />}

      <button className='next' onClick={nextQuestion}>
        Next Question
    </button>
    </div>
  );
}

export default App;
