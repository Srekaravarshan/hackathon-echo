import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { makeChatQuery, makeSubmissionEntry } from "../../apis";

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
  'survey/fetchInitialQuestion',
  async ({ theme, triggerToken } = { theme: initialState.theme, triggerToken: "" }) => {
    console.log("📱 ~ fetchInitialQuestion ~ theme:", theme)
    try {
      const response = await makeChatQuery(triggerToken, "init", triggerToken);
      console.log("📱 ~ fetchInitialQuestion ~ response:", response)

      const initialQuestion = {
        question: response.jsonRes.question,
        type: response.jsonRes.questionType,
        choices: response.jsonRes.choices || [],
        closeSurvey: false
      }

      if(response.jsonRes.actionExecutedMessage){
        initialQuestion.question = response.jsonRes.actionExecutedMessage;
        initialQuestion.type = "message";
      }

      return {
        currentQuestion: initialQuestion,
        theme
      };
    } catch (error) {
      console.error("Error in fetchInitialQuestion:", error);
      throw error; // Re-throw to trigger rejected state
    }
  }
);

export const fetchNextQuestion = createAsyncThunk(
  'survey/fetchNextQuestion',
  async ({ answer, triggerToken }, { dispatch }) => {
    dispatch(addAnswer(answer));

    console.log("📱 ~ triggerToken:", triggerToken)
    const localStorageConversationId = localStorage.getItem('conversationId');
    console.log("📱 ~ localStorageConversationId:", localStorageConversationId)
    const conversationId = localStorageConversationId;
    const response = await makeChatQuery(conversationId, `User response -> ${answer}`, triggerToken);
    console.log("📱 ~ response:", response)
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
      await makeSubmissionEntry(conversationId);
    }

    console.log("📱 ~ nextQuestion:", nextQuestion);

    return nextQuestion
    ;
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
        console.log("🚀 ~ fetchNextQuestion.pending ~ state:", state)
        state.loadingNextQuestion = true;
      })
      .addCase(fetchNextQuestion.fulfilled, (state, action) => {
        console.log("🚀 ~ fetchNextQuestion.fulfilled ~ action:", action)
        if (action.payload) {
          state.currentQuestion = action.payload;
          state.questionIndex += 1;
        }
        state.loadingNextQuestion = false;
        state.typing = false;
      })
      .addCase(fetchNextQuestion.rejected, (state, ...props) => {
        console.log("🚀 ~ fetchNextQuestion.rejected ~ state:", state, props)
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
