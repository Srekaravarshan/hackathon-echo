import { useState, Fragment, useCallback } from 'react';
import Typewriter from 'typewriter-effect';
import { SurveyContainer, QuestionContainer } from '../../components/StyledComponents';
import { YesOrNo, MultipleChoice, SingleChoice, Message, FileUpload, Audio, TextInput, OpinionScale, EndMessage } from '../../components/QuestionTypes';
import { Box } from '@sparrowengg/twigs-react';
import { useSelector, useDispatch } from 'react-redux';

const ResponseComponent = ({ currentQuestion, handleResponse, animationComplete }) => {
  if (!currentQuestion) return null;

  return (
    <Box
      css={{
        opacity: animationComplete ? 1 : 0,
        transition: 'opacity 0.4s ease-in-out',
      }}
    >
      {(() => {
        switch (currentQuestion.type) {
          case 'yesOrNo':
            return (
              <YesOrNo onAnswer={handleResponse} />
            );
          case 'multipleChoice':
            return <MultipleChoice onAnswer={handleResponse} choices={currentQuestion.choices}/>;
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
            return <TextInput currentQuestion={currentQuestion} onAnswer={handleResponse} />;
        }
      })()}
    </Box>
  )
};

export default ResponseComponent;