import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { makeChatQuery, makeSubmissionEntry, getWelcomeMessage } from "../../apis";
import { ButtonActions } from "../../components/question-types/constants";

const welcomeMessageData = {
  "greetingHeader": "Hey Welcome to Paris Travel Corporation",
  "greetingDescription": "Share your travel story about Paris Travel Corporation.",
  "welcomeButtonText": "Lets Get Started"
}

const surveyQuestions = [
  {    
    question: welcomeMessageData.greetingHeader,
    description: welcomeMessageData.greetingDescription,
    type: 'welcomeMessage',
    buttons: [
      {
        text: welcomeMessageData.welcomeButtonText,
        action: ButtonActions.NEXT_QUESTION
      }
    ]
  },
  {
    question: "Hi, how can I help you today?",
    type: "text",
  },
  {
    question: "How would you rate your experience with our travel assistance?",
    type: "opinionScale",
    scale: {
      min: 1,
      max: 10,
    },
  },
  {
    question: "Provide your aadhar card",
    type: "fileUpload",
  },
  {
    question: "What is your travel destination?",
    type: "text",
  },
  {
    question: "Are you going to be traveling alone?",
    type: "yesOrNo",
    choices: ["Yes", "No"],
  },
  {
    question: "Do you have any hotel preferences?",
    type: "multipleChoice",
    choices: [
      "Budget hotels",
      "Boutique hotels",
      "Luxury hotels",
      "No preference",
    ],
  },
  {
    question: "What are your planned travel dates?",
    type: "text",
  },
  {
    question:
      "Based on your preferences, here are some travel recommendations. Do you want more details on any of them?",
    type: "yesOrNo",
    choices: ["Yes", "No"],
  },
  // {
  //   "question": "Would you like us to book a hotel for you?",
  //   "type": "multipleChoice",
  //   "choices": ["Yes", "No"]
  // },
  {
    question: "Please provide your email for booking confirmation.",
    type: "text",
  },
  {
    question: "Please provide your phone number for booking assistance.",
    type: "text",
  },
  {
    question: "Thank you for your time!",
    type: "endMessage",
    closeSurvey: true,
  },
  {
    "type": "action",
    "question": "I am booking demo call on coming saturday",
    "actionType": "appointment",
    "hasConfirmation": false,
  }
];

const initialState = {
  currentQuestion: {
    choices: [],
    question: "",
    description: "",
    type: "",
    closeSurvey: false,
  },
  theme: {
    primaryColor: "#000000",
    secondaryColor: "#ffffff",
  },
  loading: true,
  loadingNextQuestion: false,
  showChat: false,
  chatInput: "",
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
  "survey/fetchInitialQuestion",
  async ({ theme } = { theme: initialState.theme }) => {
    try {
      // Simulate API delay
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // const response = await Axios.post('http://localhost:3000/api/chat/getWelcomeMessage');
      // const welcomeMessageData = response?.data?.welcomeMessageData;
      const tokenId = window.location.pathname.split('/').pop();
      const welcomeMessageRes = await getWelcomeMessage(tokenId);
      console.log("📱 ~ welcomeMessageRes:", welcomeMessageRes)
      
      
      const welcomeMessageData = welcomeMessageRes?.welcomeMessageData;
      console.log("📱 ~ welcomeMessageData:", welcomeMessageData)

      if (!surveyQuestions.length) {
        throw new Error("No survey questions available");
      }

      return {
        currentQuestion: {
          question: welcomeMessageData.greetingHeader,
          description: welcomeMessageData.greetingDescription,
          type: "welcomeMessage",
          buttons: [
            {
              text: welcomeMessageData.welcomeButtonText,
              action: ButtonActions.NEXT_QUESTION,
            },
          ],
        },
        theme,
      };
    } catch (error) {
      console.error("Error in fetchInitialQuestion:", error);
      throw error; // Re-throw to trigger rejected state
    }
  }
);

export const fetchNextQuestion = createAsyncThunk(
  "survey/fetchNextQuestion",
  async (answer, { getState, dispatch }) => {
    // http://localhost:5173/survey/tt-mLKsJ

    const state = getState().survey;
    // take the tokenId as the last part of the url
    const tokenId = window.location.pathname.split('/').pop();
    
    const currentIndex = state.questionIndex;
    console.log("📱 ~ currentIndex:", currentIndex);


    const localStorageConversationId = localStorage.getItem('conversationId');
    console.log("📱 ~ localStorageConversationId:", localStorageConversationId)
    const conversationId = localStorageConversationId;
    const response = await makeChatQuery(
      conversationId,
      `User response -> ${answer}`,
      tokenId
    );
    console.log("📱 ~ response:", response);

    const nextQuestion = {
      question: response.jsonRes.question,
      type: response.jsonRes.questionType,
      choices: response.jsonRes.choices || [],
      closeSurvey: false,
    };

    if (response.jsonRes.actionLoaderMessage && response.jsonRes?.actions.length) {
      nextQuestion.question = response.jsonRes.actionLoaderMessage;
      nextQuestion.type = "action";
      nextQuestion.action = response?.jsonRes?.actions;
      nextQuestion.actionMeta = response?.actionMeta;
      nextQuestion.userId = conversationId;
    }

    // const kbExecutionMessage = response.jsonRes.kbExecutionMessage;
    // if (kbExecutionMessage) {
    //   nextQuestion.question = kbExecutionMessage;
    //   nextQuestion.type = "message";
    // }

    const conversationCompleted = response.jsonRes?.conversationCompleted;
    if (conversationCompleted) {
      if (response.jsonRes?.conversationCompletedMessage) {
        nextQuestion.question += `\n\n${response.jsonRes?.conversationCompletedMessage}`;
      }
      nextQuestion.closeSurvey = true;
      nextQuestion.type = "endMessage";
      await makeSubmissionEntry(conversationId, tokenId);
    }

    console.log("📱 ~ nextQuestion:", nextQuestion);

    // if (state.questionIndex >= surveyQuestions.length) {
    //   return null;
    // }

    // Save the answer for the current question
    // if (answer !== undefined) {
    dispatch(addAnswer(answer));
    // }

    // Simulate API delay
    // await new Promise(resolve => setTimeout(resolve, 1000));

    return nextQuestion;
  }
);

export const surveySlice = createSlice({
  name: "survey",
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
      console.log("🚀 ~ setTyping ~ action:", action);
      state.typing = action.payload;
    },
    updateAnswers: (state, action) => {
      console.log("🚀 ~ setTyping ~ action:", action);
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
