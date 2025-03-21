import { Box } from '@sparrowengg/twigs-react';
import YesOrNo from '../../components/question-types/YesOrNo';
import MultipleChoice from '../../components/question-types/MultipleChoice';
import SingleChoice from '../../components/question-types/SingleChoice';
import Message from '../../components/question-types/Message';
import FileUpload from '../../components/question-types/FileUpload';
import Audio from '../../components/question-types/Audio';
import TextInput from '../../components/question-types/TextInput';
import OpinionScale from '../../components/question-types/OpinionScale';
import EndMessage from '../../components/question-types/EndMessage';
import WelcomeMessage from '../../components/question-types/WelcomeMessage';
import Buttons from '../../components/question-types/Buttons.jsx';

const ResponseComponent = ({ currentQuestion, handleResponse, animationComplete, additionalMeta }) => {
  if (!currentQuestion) return null;

  return (
    <Box
      css={{
        opacity: animationComplete ? 1 : 0,
        transition: 'opacity 0.4s ease-in-out',
      }}
      className="response-component-wrapper"
    >
      {(() => {
        switch (currentQuestion.type) {
          case 'action_button_url':
            return <Buttons currentQuestion={currentQuestion} onAnswer={handleResponse} />;
          case 'welcomeMessage':
            return <WelcomeMessage currentQuestion={currentQuestion} onAnswer={handleResponse} />;
          case 'yesOrNo':
            return (
              <YesOrNo onAnswer={handleResponse} />
            );
          case 'multipleChoice':
            return <MultipleChoice onAnswer={handleResponse} choices={currentQuestion.choices} additionalMeta={additionalMeta}/>;
          case 'singleChoice':
            return <SingleChoice onAnswer={handleResponse} choices={currentQuestion.choices}/>;
          case 'message':
            return <Message currentQuestion={currentQuestion} onAnswer={handleResponse} />;
          case 'fileUpload':
            return <FileUpload currentQuestion={currentQuestion} onAnswer={handleResponse} />;
          case 'audio':
            return <Audio currentQuestion={currentQuestion} onAnswer={handleResponse} />;
          case 'opinionScale':
            return <OpinionScale currentQuestion={currentQuestion} onAnswer={handleResponse} />;
          case 'endMessage':
            return <EndMessage currentQuestion={currentQuestion} onAnswer={handleResponse} />;
          default:
            return <TextInput currentQuestion={currentQuestion} onAnswer={handleResponse} additionalMeta={additionalMeta}/>;
        }
      })()}
    </Box>
  )
};

export default ResponseComponent;