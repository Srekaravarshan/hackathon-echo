import { Box } from "@sparrowengg/twigs-react";
import Typewriter from "typewriter-effect";

const TextTypewriter = ({ hideCursor = false, text, makeDim = false, makeSmall = false, onAnimationComplete, css = {}, ...props }) => {
  return (
    <Box css={{
      marginBottom: '1.2rem',
      '.Typewriter__cursor': {
        ...(hideCursor && { display: 'none' })
      },
      '[data-testid="typewriter-wrapper"]': {
        ...(makeSmall && {
          fontSize: '$sm !important',
          lineHeight: '$sm !important',
          fontWeight: '$4 !important',
        }),
        transition: 'all 0.2s ease-in-out',
        ...(makeDim && { opacity: '0.5' }),
      },
      ...css
    }} className="text-typewriter" {...props}>
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