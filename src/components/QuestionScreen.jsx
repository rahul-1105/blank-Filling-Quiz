import { useSelector, useDispatch } from 'react-redux';
import { nextQuestion, removeUserAnswer, setUserAnswer } from '../redux/quizSlice';
import Timer from './TImer';
import OptionButton from './OptionButton';

const QuestionScreen = () => {
  const dispatch = useDispatch();
  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    timer,
  } = useSelector((state) => state.quiz);

  const currentQuestion = questions[currentQuestionIndex];
  const currentUserAnswers = userAnswers[currentQuestionIndex] || [];
  
  if (!currentQuestion) return null;

  // Split the question into parts based on blank spaces
  const questionParts = currentQuestion.question.split('_____________');
  const blankCount = questionParts.length - 1;

  // Check if all blanks are filled
  const allBlanksFilled = currentUserAnswers.filter(Boolean).length === blankCount;

  // Get remaining options (not selected yet)
  const remainingOptions = currentQuestion.options.filter(
    option => !currentUserAnswers.includes(option)
  );

  const handleOptionClick = (option) => {
    // Find the first empty blank
    const emptyBlankIndex = currentUserAnswers.findIndex(answer => !answer);
    const blankIndex = emptyBlankIndex !== -1 ? emptyBlankIndex : currentUserAnswers.length;
    
    if (blankIndex < blankCount) {
      dispatch(setUserAnswer({ blankIndex, answer: option }));
    }
  };

  const handleBlankClick = (blankIndex) => {
    if (currentUserAnswers[blankIndex]) {
      dispatch(removeUserAnswer(blankIndex));
    }
  };

  const handleNextQuestion = () => {
    dispatch(nextQuestion());
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col">
      <Timer />
      
      <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl w-full mx-auto mt-8">
        {/* Timer and progress */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-medium">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className="text-xl font-bold text-blue-600">
            Time: {timer}s
          </div>
        </div>

        {/* Question text with blanks */}
        <div className="mb-8 text-lg">
          {questionParts.map((part, index) => (
            <span key={index}>
              {part}
              {index < blankCount && (
                <span
                  onClick={() => handleBlankClick(index)}
                  className={`inline-block m-1 px-2 py-1 border-b-2 border-gray-400 min-w-[100px] text-center cursor-pointer ${
                    currentUserAnswers[index] ? 'bg-blue-100 border-blue-500 '  : ''
                  }`}
                >
                  {currentUserAnswers[index] || ''}
                </span>
              )}
            </span>
          ))}
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {remainingOptions.map((option) => (
            <OptionButton
              key={option}
              option={option}
              onClick={() => handleOptionClick(option)}
              disabled={currentUserAnswers.filter(Boolean).length >= blankCount}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={handleNextQuestion}
          disabled={!allBlanksFilled}
          className={`w-full py-3 rounded-md font-medium ${
            allBlanksFilled
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } transition-colors`}
        >
          {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default QuestionScreen;