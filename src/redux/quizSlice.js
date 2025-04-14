import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  timer: 30,
  quizStarted: false,
  quizCompleted: false,
  loading: false,
  error: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    startQuiz(state) {
      state.quizStarted = true;
    },
    setQuestions(state, action) {
      state.questions = action.payload;
    },
    setUserAnswer(state, action) {
      const { blankIndex, answer } = action.payload;
      const currentAnswers = [...(state.userAnswers[state.currentQuestionIndex] || [])];
      currentAnswers[blankIndex] = answer;
      
      state.userAnswers[state.currentQuestionIndex] = currentAnswers;
    },
    removeUserAnswer(state, action) {
      const blankIndex = action.payload;
      const currentAnswers = [...(state.userAnswers[state.currentQuestionIndex] || [])];
      currentAnswers[blankIndex] = null;
      
      state.userAnswers[state.currentQuestionIndex] = currentAnswers;
    },
    nextQuestion(state) {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
        state.timer = 30;
      } else {
        state.quizCompleted = true;
      }
    },
    updateTimer(state) {
      if (state.timer > 0) {
        state.timer -= 1;
      } else {
        if (state.currentQuestionIndex < state.questions.length - 1) {
          state.currentQuestionIndex += 1;
          state.timer = 30;
        } else {
          state.quizCompleted = true;
        }
      }
    },
    resetQuiz(state) {
      return initialState;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  startQuiz,
  setQuestions,
  setUserAnswer,
  removeUserAnswer,
  nextQuestion,
  updateTimer,
  resetQuiz,
  setLoading,
  setError,
} = quizSlice.actions;

export default quizSlice.reducer;