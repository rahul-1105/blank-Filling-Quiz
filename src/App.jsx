import { useSelector } from 'react-redux';
import StartScreen from './components/StartScreen';
import QuestionScreen from './components/QuestionScreen';
import FeedbackScreen from './components/FeedbackScreen';

function App() {
  const { quizStarted, quizCompleted } = useSelector((state) => state.quiz);

  return (
    <div className="min-h-screen">
      {!quizStarted && !quizCompleted && <StartScreen />}
      {quizStarted && !quizCompleted && <QuestionScreen />}
      {quizCompleted && <FeedbackScreen />}
    </div>
  );
}

export default App;