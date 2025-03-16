import { useSelector } from 'react-redux';
import Button from './Button';

const OpinionScaleButton = ({ children, css = {}, selected, ...props }) => {
  const { theme } = useSelector((state) => state.survey);

  return (
    <Button
      size="lg" color="default" variant="ghost"
      {...props}
      css={{
        flexShrink: 0,
        backgroundColor: selected ? `${theme?.primaryColor} !important` : 'transparent',
        color: selected ? `${theme?.secondaryColor} !important` : `${theme?.primaryColor}`,
        border: `1px solid ${theme?.primaryColor}80`,
        width: '40px',
        '&:hover, &:focus, &:active, &:focus-visible': {
          backgroundColor: selected ? `${theme?.primaryColor} !important` : `${theme?.primaryColor}1a !important`,
          color: selected ? `${theme?.secondaryColor} !important` : `${theme?.primaryColor} !important`,
        },
        ...css,
      }}
    >
      {children}
    </Button>
  )
}

export default OpinionScaleButton;