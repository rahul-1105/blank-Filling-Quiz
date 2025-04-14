import { useSelector, useDispatch } from 'react-redux';
import { resetQuiz } from '../redux/quizSlice';


const FeedbackScreen = () => {
  const dispatch = useDispatch();
  const { questions, userAnswers } = useSelector((state) => state.quiz);

  // Calculate score
  const score = questions.reduce((total, question, index) => {
    const userAnswer = userAnswers[index] || [];
    const isCorrect = question.correctAnswer.every(
      (answer, i) => userAnswer[i] === answer
    );
    return isCorrect ? total + 1 : total;
  }, 0);

  const handleRestart = () => {
    dispatch(resetQuiz());
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl w-full mx-auto mt-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Quiz Results</h1>
        
        <div className="text-center mb-8">
          <div className="text-4xl font-bold mb-2">
            Score: {score} / {questions.length}
          </div>
          <div className="text-xl">
            {score === questions.length ? 'Perfect! 🎉' : score >= questions.length / 2 ? 'Good job! 👍' : 'Keep practicing! 💪'}
          </div>
        </div>

        <div className="space-y-8">
          {questions.map((question, qIndex) => {
            const userAnswer = userAnswers[qIndex] || [];
            const isCorrect = question.correctAnswer.every(
              (answer, i) => userAnswer[i] === answer
            );
            
            const questionParts = question.question.split('_____________');
            const blankCount = questionParts.length - 1;

            return (
              <div key={qIndex} className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex items-center mb-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                    isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {isCorrect ? '✓' : '✗'}
                  </span>
                  <h3 className="font-medium">Question {qIndex + 1}</h3>
                </div>

                <div className="mb-4">
                  {questionParts.map((part, pIndex) => (
                    <span key={pIndex}>
                      {part}
                      {pIndex < blankCount && (
                        <span className={`inline-block mx-1 px-1 ${
                          userAnswer[pIndex] === question.correctAnswer[pIndex]
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        } rounded`}>
                          {userAnswer[pIndex] || '(empty)'}
                          {!isCorrect && (
                            <span className="text-gray-500 ml-1">
                              (correct: {question.correctAnswer[pIndex]})
                            </span>
                          )}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleRestart}
          className="w-full mt-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
};

export default FeedbackScreen;