import { Fragment } from 'react';
import { Text } from '@sparrowengg/twigs-react';
import { EnterIcon } from '@sparrowengg/twigs-react-icons';
import Button from './Button';
import ShortcutKey from './ShortcutKey';

const SubmitButton = ({ disabled, handleSubmit, css = {}, children }) => {
  return (
    <Button
      onClick={handleSubmit}
      disabled={disabled}
      css={{
        position: 'fixed',
        bottom: '24px',
        left: 'auto',
        right: '24px',
        opacity: !disabled ? 1 : '0 !important',
        ...css,
        '.twigs-button__content': {
          '& > p': {
            maxWidth: '0px',
            opacity: 0,
            transition: 'max-width 0.2s ease',
            ...css?.['.twigs-button__content']?.['& > p'],
          },
          ...css?.['.twigs-button__content'],
        },
        '&, &:hover, &:focus, &:active, &:focus-visible': {
          '.twigs-button__content > p': {
            maxWidth: '60px',
            opacity: 1,
            ...css?.['&:hover, &:focus, &:focus-visible']?.['.twigs-button__content > p'],
          },
          ...css?.['&:hover, &:focus, &:focus-visible'],
        },
      }}
    >
      {children ? children : (
        <Fragment>
          <Text css={{ fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit' }}>Submit&nbsp;</Text>
          <ShortcutKey css={{
            textTransform: 'uppercase', height: 'auto', width: 'auto',
            'p': { lineHeight: '0' },
            'svg path': { strokeWidth: '2px' },
          }}
          ><EnterIcon size="20"/></ShortcutKey>
        </Fragment>
      )}
    </Button>
  );
};

export default SubmitButton;