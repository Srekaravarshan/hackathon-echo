import { Button as TwigsButton } from '@sparrowengg/twigs-react';
import { useSelector } from 'react-redux';

const Button = ({ children, onClick, disabled, css, ...props }) => {
  const theme = useSelector((state) => state.survey.theme);

  return (
    <TwigsButton
      onClick={onClick}
      disabled={disabled}
      {...props}
      css={{
        width: 'fit-content',
        border: 'none',
        padding: '$4 $8',
        borderRadius: '$pill',
        ...css,
        '.twigs-button__content': {
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '$1',
          ...css?.['.twigs-button__content'],
        },
        ...(props.variant === 'ghost' ? {
          backgroundColor: css?.['backgroundColor'] || 'transparent !important',
          color: css?.['color'] || `${theme?.primaryColor} !important`,
        } : {
          backgroundColor: css?.['backgroundColor'] || `${theme?.primaryColor} !important`,
          color: css?.['color'] || `${theme?.secondaryColor} !important`,
        }),

        '&:hover, &:focus, &:active, &:focus-visible': {
          scale: 1.05,
          ...(props.variant === 'ghost' ? {
            backgroundColor: `${theme?.primaryColor}1a !important`,
            color: `${theme?.primaryColor} !important`,
          } : {}),
          ...css?.['&:hover, &:focus, &:active, &:focus-visible'],
        },
      }}
    >
    {children}
    </TwigsButton>
  );
}

export default Button;