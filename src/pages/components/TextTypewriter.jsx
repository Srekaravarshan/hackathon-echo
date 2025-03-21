import { Box } from "@sparrowengg/twigs-react";
import Typewriter from "typewriter-effect";

const TextTypewriter = ({ hideCursor = false, text, makeDim = false, makeSmall = false, onAnimationComplete, css = {} }) => {
  return (
    <Box css={{
      marginBottom: '1.2rem',
      '.Typewriter__cursor': {
        // ...(currentQuestion.question === animationComplete && { display: 'none' }),
        // ...(typing && { display: 'none' })
        ...(hideCursor && { display: 'none' })
      },
      '[data-testid="typewriter-wrapper"]': {
        // transition: 'opacity 0.2s ease-in-out',
        // fontSize: '$5xl !important',
        // lineHeight: '$5xl !important',
        // fontWeight: '$7 !important',
        // ...(actionData.actionStatus === 'ACTION_STARTED' && { opacity: '0.5' }),
        ...(makeSmall && {
          fontSize: '$sm !important',
          lineHeight: '$sm !important',
          fontWeight: '$4 !important',
        }),
        transition: 'all 0.2s ease-in-out',
        ...(makeDim && { opacity: '0.5' }),
      },
      ...css
    }}>
      <Typewriter
        key={text}
        onInit={(typewriter) => {
          typewriter.changeDelay(15).typeString(text).callFunction(() => {
            return onAnimationComplete?.(text);
          }).start();
        }}
      />
    </Box>
  )
}

export default TextTypewriter;