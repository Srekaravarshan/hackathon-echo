import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ButtonActions } from '../../components/question-types/constants';

const welcomeMessageData = {
  "greetingHeader": "Hey Welcome to Paris Travel Corporation",
  "greetingDescription": "Share your travel story about Paris Travel Corporation.",
  "welcomeButtonText": "Lets Get Started"
}

const yesOrNoQuestionData = {
  "question": "Are you going to be traveling alone?",
  "type": "yesOrNo",
  "choices": ["Yes", "No"]
}

const yesOrNoQuestionData2 = {
  "question": "Hello! Do you need to book demo on coming saturday?",
  "type": "yesOrNo",
}

const welcomeMessage = {
  question: welcomeMessageData.greetingHeader,
  description: welcomeMessageData.greetingDescription,
  type: 'welcomeMessage',
  buttons: [
    {
      text: welcomeMessageData.welcomeButtonText,
      action: ButtonActions.NEXT_QUESTION
    }
  ]
}

const actionData1 = {
  "type": "action",
  "question": "I am booking demo call on coming saturday",
  "actionType": "appointment",
  "hasConfirmation": false,
}
const actionDataRedirect = {
  "type": "action_button_url",
  "question": "I am booking demo call on coming saturday",
  buttons: [
    {
      text: "Please visit SurveySparrow",
      action: ButtonActions.REDIRECT_URL,
      url: "https://www.surveysparrow.com"
    },
    {
      text: "Next",
      action: ButtonActions.NEXT_QUESTION,
      variant: "secondary"
    },
  ]
}


const surveyQuestions = [
  actionDataRedirect,
  actionData1,
  yesOrNoQuestionData,
  yesOrNoQuestionData2,
  welcomeMessage,
  {
    "question": "Are you going to be traveling alone?",
    "type": "yesOrNo",
    "choices": ["Yes", "No"]
  },
  {
    "question": "What is your budget range for the trip?",
    "type": "multipleChoice",
    "choices": ["Budget", "Mid-range", "Luxury"]
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
    "question": "Hello! Welcome to the XYZ Travel Agency. How can I help you today?",
    "type": "message"
  },
  // {
  //   "question": "Provide your aadhar card",
  //   "type": "fileUpload",
  // },
  // {
  //   "question": "Hey! How can I help you today? sample audio question",
  //   "type": "audio"
  // },
  {
    "question": "What is your travel destination?",
    "type": "text"
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
  // {
  //   "question": "Would you like us to book a hotel for you?",
  //   "type": "multipleChoice",
  //   "choices": ["Yes", "No"]
  // },
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
    description: '',
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
  actionData: {
    actionStatus: 'ACTION_NOT_STARTED',
    response: {
      question: '',
      type: '',
    }
  }
};

export const fetchInitialQuestion = createAsyncThunk(
  'survey/fetchInitialQuestion',
  async ({ theme } = { theme: initialState.theme }) => {
    try {
      // Simulate API delay
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // const response = await Axios.post('http://localhost:3000/api/chat/getWelcomeMessage');
      // const welcomeMessageData = response?.data?.welcomeMessageData;
    //   const welcomeMessageData = {
    //     "greetingHeader": "Hey Welcome to Paris Travel Corporation",
    //     "greetingDescription": "Share your travel story about Paris Travel Corporation.",
    //     "welcomeButtonText": "Lets Get Started"
    // }

      if (!surveyQuestions.length) {
        throw new Error('No survey questions available');
      }

      return {
        currentQuestion: {
          ...surveyQuestions[0],
          // question: welcomeMessageData.greetingHeader,
          // description: welcomeMessageData.greetingDescription,
          // type: 'welcomeMessage',
          // buttons: [
          //   {
          //     text: welcomeMessageData.welcomeButtonText,
          //     action: ButtonActions.NEXT_QUESTION
          //   }
          // ]
        },
        theme
      };
    } catch (error) {
      console.error('Error in fetchInitialQuestion:', error);
      throw error; // Re-throw to trigger rejected state
    }
  }
);


export const fetchNextQuestion = createAsyncThunk(
  'survey/fetchNextQuestion',
  async (answer, { getState, dispatch }) => {
    console.log("🚀 ~ fetchNextQuestion ~ answer:", answer, getState())
    const state = getState().survey;
    
    if (state.questionIndex >= surveyQuestions.length) {
      return null;
    }

    // Save the answer for the current question
    dispatch(addAnswer(answer));

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return surveyQuestions[state.questionIndex];
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
      console.log("🚀 ~ setTyping ~ action:", action)
      state.typing = action.payload;
    },
    updateAnswers: (state, action) => {
      console.log("🚀 ~ setTyping ~ action:", action)
      state.answers = action.payload;
    },
    resetSurvey: () => {
      return initialState;
    },
    updateActionData: (state, action) => {
      state.actionData = {
        ...state.actionData,
        ...action.payload,
      }
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
  updateAnswers,
  updateActionData,
} = surveySlice.actions;

export default surveySlice.reducer; 