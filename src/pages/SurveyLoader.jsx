import { SurveyContainer, LoadingContainer } from '../components/StyledComponents';

const SurveyLoader = () => {
  return (
    <SurveyContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LoadingContainer
        animate={{
          scale: [1, 1.1, 1],
          transition: { duration: 1.5, repeat: Infinity }
        }}
      >
        Loading...
      </LoadingContainer>
    </SurveyContainer>
  );
};

export default SurveyLoader;
