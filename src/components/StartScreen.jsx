import { useDispatch } from 'react-redux';
import { startQuiz, setQuestions, setLoading, setError } from '../redux/quizSlice';
import { useEffect } from 'react';
import quizData from '../../data';

const StartScreen = () => {
  const dispatch = useDispatch();

   quizData.map(data => {
    console.log(data);
    dispatch(setQuestions(data.questions));
   })


  const handleStart = () => {
    dispatch(startQuiz());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Blank Filling Quiz</h1>
        <p className="text-gray-700 mb-8 text-center">
          Fill in the blanks with the correct words from the options provided. You'll have 30 seconds per question.
        </p>
        <button
          onClick={handleStart}
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default StartScreen;