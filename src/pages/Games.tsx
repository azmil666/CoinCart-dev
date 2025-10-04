import { useState } from 'react';
import { Gamepad2, Trophy, Coins, Play, CheckCircle, XCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import Navbar from '../components/Navbar';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'What is the capital of India?',
    options: ['Mumbai', 'New Delhi', 'Kolkata', 'Chennai'],
    correctAnswer: 'New Delhi',
  },
  {
    id: 2,
    question: 'Which is the largest state in India by area?',
    options: ['Rajasthan', 'Madhya Pradesh', 'Maharashtra', 'Uttar Pradesh'],
    correctAnswer: 'Rajasthan',
  },
  {
    id: 3,
    question: 'Who is known as the Father of the Nation in India?',
    options: ['Jawaharlal Nehru', 'Mahatma Gandhi', 'Subhas Chandra Bose', 'Bhagat Singh'],
    correctAnswer: 'Mahatma Gandhi',
  },
  {
    id: 4,
    question: 'Which river is known as the Ganga of the South?',
    options: ['Kaveri', 'Krishna', 'Godavari', 'Narmada'],
    correctAnswer: 'Godavari',
  },
  {
    id: 5,
    question: 'In which year did India gain independence?',
    options: ['1942', '1945', '1947', '1950'],
    correctAnswer: '1947',
  },
];

const Games = () => {
  const { setCoinBalance, addTransaction } = useApp();
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'completed'>('idle');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === QUIZ_QUESTIONS[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        const finalScore = answer === QUIZ_QUESTIONS[currentQuestion].correctAnswer ? score + 1 : score;
        const coinsEarned = finalScore * 20;

        setCoinBalance((prev) => prev + coinsEarned);
        addTransaction({
          type: 'earned',
          amount: coinsEarned,
          description: `Quiz Game Completed - ${finalScore}/${QUIZ_QUESTIONS.length} correct`,
        });

        setGameState('completed');
      }
    }, 1500);
  };

  const resetGame = () => {
    setGameState('idle');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Games</h1>

        {gameState === 'idle' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-8 text-white">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Gamepad2 className="h-10 w-10" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Quiz Challenge</h2>
                  <p className="text-green-100">Test your knowledge & earn coins</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold">Questions</span>
                  <span className="text-2xl font-bold">{QUIZ_QUESTIONS.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Reward per correct answer</span>
                  <div className="flex items-center space-x-1">
                    <Coins className="h-5 w-5" />
                    <span className="text-2xl font-bold">20</span>
                  </div>
                </div>
              </div>
              <button
                onClick={startGame}
                className="w-full bg-white text-green-600 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition shadow-lg flex items-center justify-center space-x-2"
              >
                <Play className="h-6 w-6" />
                <span>Start Playing</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4">How to Play</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-1">1.</span>
                  <span>Answer {QUIZ_QUESTIONS.length} multiple-choice questions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-1">2.</span>
                  <span>Each correct answer earns you 20 coins</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-1">3.</span>
                  <span>Coins are automatically added to your wallet</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-1">4.</span>
                  <span>Use coins to get discounts on your orders!</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 font-semibold">
                  Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                  <Trophy className="h-4 w-4 text-green-600" />
                  <span className="text-green-600 font-bold">Score: {score}</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {QUIZ_QUESTIONS[currentQuestion].question}
              </h2>

              <div className="space-y-3">
                {QUIZ_QUESTIONS[currentQuestion].options.map((option) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === QUIZ_QUESTIONS[currentQuestion].correctAnswer;
                  const showCorrect = showResult && isCorrect;
                  const showIncorrect = showResult && isSelected && !isCorrect;

                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={selectedAnswer !== null}
                      className={`w-full p-4 rounded-xl border-2 text-left font-semibold transition flex items-center justify-between ${
                        showCorrect
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : showIncorrect
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                      } ${selectedAnswer ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <span>{option}</span>
                      {showCorrect && <CheckCircle className="h-6 w-6" />}
                      {showIncorrect && <XCircle className="h-6 w-6" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {gameState === 'completed' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
            <p className="text-gray-600 mb-6">Great job on finishing the quiz</p>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-gray-600 mb-1">Your Score</p>
                  <p className="text-4xl font-bold text-blue-600">
                    {score}/{QUIZ_QUESTIONS.length}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 mb-1">Coins Earned</p>
                  <div className="flex items-center justify-center space-x-2">
                    <Coins className="h-8 w-8 text-orange-500" />
                    <p className="text-4xl font-bold text-orange-500">{score * 20}</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Coins have been added to your wallet
              </p>
            </div>

            <button
              onClick={resetGame}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition shadow-lg"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Games;
