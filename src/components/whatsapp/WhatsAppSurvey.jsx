import { useEffect, useRef, useState } from 'react';
import MobilePreview from './MobilePreview';
import { Flex, ThemeProvider } from '@sparrowengg/twigs-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitialQuestion, fetchNextQuestion, resetSurvey } from '../../store/slices/surveySlice';
import { Template } from './utils/models/TemplateModel';
import { useParams } from 'react-router-dom';
const message =   {
  id: 100001352,
  category: "UTILITY",
  templateType: "CUSTOM_MESSAGE",
  language: {
    code: "en",
    name: "English",
    flag: "GB",
    label: "eng",
  },
  header: {
    type: "TEXT",
    mediaType: null,
    text: "Hello!",
    mediaURL: "",
  },
  body: "Ready to share your feedback using \n {{1}} ?\n\nType `yes` to continue",
  footer: "Reply STOP to unsubscribe",
  response: {
    type: "CHOICES",
    choices: [
      {
        type: "QUICK_REPLY",
        label: "Send now",
        url: "",
      },
    ],
    urlChoices: [],
  },
  approvalStatus: "APPROVED",
  name: "whatsapp_template_16imageutil",
  rejectedReason: null,
  state: "DRAFT",
  buttons: [
    {
      type: "QUICK_REPLY",
      label: "Send now",
      url: "",
    },
  ],
};

const WhatsAppSurvey = () => {
  const { triggerToken } = useParams();
  console.log('WhatsAppSurvey', triggerToken)
  return (
    <ThemeProvider>
      <Flex flexDirection="column" css={{ height: '100vh', width: '100vw', backgroundColor: '#f2f5f8' }} alignItems="center" justifyContent="center" className="dm-sans">
        <Flex
          flexDirection="column"
          // css={{ height: '85vh', width: '350px' }}
          alignItems="end"
          gap="$4"
        >
          <WhatsAppQuestion />
        </Flex>
      </Flex>
    </ThemeProvider>
  );
};

export default WhatsAppSurvey;


const WhatsAppQuestion = () => {
  
  const dispatch = useDispatch();

  const { triggerToken } = useParams();

  const messageScreenRef = useRef(null);

  const [currentMessage, setCurrentMessage] = useState(null);
  const [answeredMessages, setAnsweredMessages] = useState([]);

  const addQuestionToWhatsAppMessage = (question) => {
    const newMessage = new Template({
      body: question?.question,
    }).toJSON();

    switch (question?.type) {
      case 'multipleChoice': {
        const choicesString = question?.choices?.map((option) => option).join('\n');
        newMessage.body = `${question?.question}\n\nChoose as many as you like:\n\n${choicesString}`;
        break;
      }
      case 'singleChoice':
      case 'yesOrNo': {
        newMessage.buttons = question?.choices?.map((option) => ({
          type: Template.BUTTON_TYPE.QUICK_REPLY,
          label: option,
          url: '',
        }));
        break;
      }

      case 'opinionScale': {
        const { min = 1, max = 5 } = question?.scale ?? { min: 1, max: 5 };
        newMessage.buttons = Array.from({ length: max - min + 1 }, (_, i) => ({
          type: Template.BUTTON_TYPE.QUICK_REPLY,
          label: `${min + i}`,
          url: '',
        }));
        break;
      }
      
      default:
        break;
    }

    setCurrentMessage(newMessage)
  }

  const handleButtonClick = async (button, message, messageIndex) => {
    const newAnsweredMessage = { ...currentMessage, answer: button?.label };
    const newUserMessage = { ...new Template({ body: button?.label }).toJSON(), user: true };
    const newMessages = [...answeredMessages, newAnsweredMessage, newUserMessage]
    setAnsweredMessages(newMessages)
    setCurrentMessage(null);
    const res = await dispatch(fetchNextQuestion(button?.label))
    addQuestionToWhatsAppMessage(res?.payload)
  }

  const handleEnterMessage = (message) => {
    handleButtonClick({ label: message})
  }

  const profileImage = useSelector((state) => state.survey.theme.profileImage);
  const name = useSelector((state) => state.survey.theme.name);
  const role = useSelector((state) => state.survey.theme.role);
  const primaryColor = useSelector((state) => state.survey.theme.primaryColor);
  const secondaryColor = useSelector((state) => state.survey.theme.secondaryColor);
  const accentColor = useSelector((state) => state.survey.theme.accentColor);


  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await dispatch(fetchInitialQuestion({
        triggerToken: triggerToken
      }));
      addQuestionToWhatsAppMessage(res?.payload?.currentQuestion)
    };

    fetchQuestion();

    return () => {
      dispatch(resetSurvey());
    };
  }, []);

  useEffect(() => {
    if (messageScreenRef?.current) {
      messageScreenRef?.current?.scrollTo({ top: messageScreenRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [answeredMessages, currentMessage])

  return (
    <MobilePreview
      messages={[...answeredMessages, currentMessage]}
      hasBottomBar
      handleButtonClick={handleButtonClick}
      onEnterMessage={handleEnterMessage}
      messageScreenRef={messageScreenRef}
    />
  );
};