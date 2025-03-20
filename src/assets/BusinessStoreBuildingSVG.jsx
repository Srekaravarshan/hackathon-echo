export default ({ size = 24, color = { house: 'white', roof: '#C6C6C6' }, extraClass = '' }) => {
  return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} className={extraClass} viewBox="0 0 33 33" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M27.0039 12.4828V25.0937C27.0039 27.2447 25.6602 28.9884 24.0026 28.9884H8.99637C7.33882 28.9884 5.99512 27.2447 5.99512 25.0937V12.4824" fill={color.house}/>
        <path fillRule="evenodd" clipRule="evenodd" d="M20.5014 12.4824V12.9826C20.5014 15.1927 18.7098 16.9843 16.4997 16.9843C14.2897 16.9843 12.498 15.1927 12.498 12.9826V12.4824" fill={color.roof}/>
        <path fillRule="evenodd" clipRule="evenodd" d="M20.5018 12.4826V12.9828C20.5018 15.1929 22.2934 16.9845 24.5035 16.9845H24.8345C26.8617 16.9845 28.5051 15.3411 28.5051 13.3139C28.5051 12.77 28.3573 12.2362 28.0774 11.7698L24.8775 6.43661C24.3351 5.53261 23.3582 4.97949 22.304 4.97949H10.6963C9.64205 4.97949 8.66512 5.53261 8.12272 6.43661L4.92282 11.7698C4.64295 12.2362 4.49512 12.77 4.49512 13.3139C4.49512 15.3411 6.13848 16.9845 8.16569 16.9845H8.49678C10.7068 16.9845 12.4985 15.1929 12.4985 12.9828V12.4826" fill={color.roof}/>
        <path d="M18.7509 23.4453H14.249" stroke={color.roof} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
  );
};
