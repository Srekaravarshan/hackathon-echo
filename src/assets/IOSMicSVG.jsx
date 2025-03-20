export default ({ size = 24, extraClass = '', color = '#007AFF' }) => {
  return (
    <svg width={size} height={size} className={extraClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M14.6048 5.12903V12.5154C14.6048 13.9674 13.4278 15.1444 11.9758 15.1444C10.5238 15.1444 9.34677 13.9674 9.34677 12.5154V5.12903C9.34677 3.67706 10.5238 2.5 11.9758 2.5C13.4278 2.5 14.6048 3.67706 14.6048 5.12903ZM7.84677 5.12903C7.84677 2.84863 9.69541 1 11.9758 1C14.2562 1 16.1048 2.84863 16.1048 5.12903V12.5154C16.1048 14.7958 14.2562 16.6444 11.9758 16.6444C9.69541 16.6444 7.84677 14.7958 7.84677 12.5154V5.12903ZM11.9758 18.8278C8.36048 18.8278 5.5 16.0614 5.5 12.7333H4C4 16.7205 7.20394 19.9356 11.2258 20.2945V23H12.7258V20.2945C16.7477 19.9356 19.9516 16.7205 19.9516 12.7333H18.4516C18.4516 16.0614 15.5911 18.8278 11.9758 18.8278Z" fill={color} />
    </svg>
  );
};