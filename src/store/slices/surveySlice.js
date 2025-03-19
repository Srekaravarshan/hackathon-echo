import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { makeChatQuery } from '../../apis';

const surveyQuestions = [
  {
    "question": "Hi, how can I help you today?",
    "type": "text"
  },
  {
    "question": "How would you rate your experience with our travel assistance?",
    "type": "opinionScale",
    "scale": {
      min: 1,
      max: 10,
    },
  },
  {
    "question": "Provide your aadhar card",
    "type": "fileUpload",
  },
  {
    "question": "What is your travel destination?",
    "type": "text"
  },
  {
    "question": "Are you going to be traveling alone?",
    "type": "yesOrNo",
    "choices": ["Yes", "No"]
  },
  {
    "question": "Do you have any hotel preferences?",
    "type": "multipleChoice",
    "choices": ["Budget hotels", "Boutique hotels", "Luxury hotels", "No preference"]
  },
  {
    "question": "What are your planned travel dates?",
    "type": "text"
  },
  {
    "question": "Based on your preferences, here are some travel recommendations. Do you want more details on any of them?",
    "type": "yesOrNo",
    "choices": ["Yes", "No"]
  },
  {
    "question": "Would you like us to book a hotel for you?",
    "type": "multipleChoice",
    "choices": ["Yes", "No"]
  },
  {
    "question": "Please provide your email for booking confirmation.",
    "type": "text"
  },
  {
    "question": "Please provide your phone number for booking assistance.",
    "type": "text"
  },
  {
    "question": "Thank you for your time!",
    "type": "endMessage",
    closeSurvey: true,
  }
];

const initialState = {
  currentQuestion: {
    choices: [],
    question: '',
    type: '',
    closeSurvey: false
  },
  theme: {
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
  },
  loading: true,
  loadingNextQuestion: false,
  showChat: false,
  chatInput: '',
  chatMessages: [],
  questionIndex: 0,
  answers: [],
  typing: false,
};

export const fetchInitialQuestion = createAsyncThunk(
  'survey/fetchInitialQuestion',
  async ({ theme }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      currentQuestion: {...surveyQuestions[0]},
      theme
    };
  }
);

export const fetchNextQuestion = createAsyncThunk(
  'survey/fetchNextQuestion',
  async (answer, { getState, dispatch }) => {
    const state = getState().survey;

    const currentIndex = state.questionIndex;
    console.log("📱 ~ currentIndex:", currentIndex)
    
    const response = await makeChatQuery("state.userId_2abcdfgki", `User response -> ${answer}`);
    console.log("📱 ~ response:", response)


    const nextQuestion = {
      question: response.jsonRes.question,
      type: response.jsonRes.questionType,
      choices: response.jsonRes.choices || [],
      closeSurvey: false
    }

    if(response.jsonRes.actionExecutedMessage){
      nextQuestion.question = response.jsonRes.actionExecutedMessage;
      nextQuestion.type = "message";
    }

    console.log("📱 ~ nextQuestion:", nextQuestion)

    // if (state.questionIndex >= surveyQuestions.length) {
    //   return null;
    // }

    // Save the answer for the current question
    // if (answer !== undefined) {
      dispatch(addAnswer(answer));
    // }


    // Simulate API delay
    // await new Promise(resolve => setTimeout(resolve, 1000));

    return nextQuestion
    ;
  }
);

export const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLoadingNextQuestion: (state, action) => {
      state.loadingNextQuestion = action.payload;
    },
    setShowChat: (state, action) => {
      state.showChat = action.payload;
    },
    setChatInput: (state, action) => {
      state.chatInput = action.payload;
    },
    addChatMessage: (state, action) => {
      state.chatMessages.push(action.payload);
    },
    incrementQuestionIndex: (state) => {
      state.questionIndex += 1;
    },
    addAnswer: (state, action) => {
      state.answers.push({
        question: state.currentQuestion,
        answer: action.payload,
        timestamp: new Date().toISOString(),
      });
    },
    setTyping: (state, action) => {
      state.typing = action.payload;
    },
    resetSurvey: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialQuestion.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInitialQuestion.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentQuestion = action.payload.currentQuestion;
          state.theme = action.payload.theme;
          state.questionIndex = 1;
        }
        state.loading = false;
        state.typing = false;
      })
      .addCase(fetchInitialQuestion.rejected, (state) => {
        state.loading = false;
        state.typing = false;
      })
      .addCase(fetchNextQuestion.pending, (state) => {
        state.loadingNextQuestion = true;
      })
      .addCase(fetchNextQuestion.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentQuestion = action.payload;
          state.questionIndex += 1;
        }
        state.loadingNextQuestion = false;
        state.typing = false;
      })
      .addCase(fetchNextQuestion.rejected, (state) => {
        state.loadingNextQuestion = false;
        state.typing = false;
      });
  },
});

export const {
  setCurrentQuestion,
  setLoading,
  setLoadingNextQuestion,
  setShowChat,
  setChatInput,
  addChatMessage,
  incrementQuestionIndex,
  addAnswer,
  resetSurvey,
  setTyping,
} = surveySlice.actions;

export default surveySlice.reducer; 