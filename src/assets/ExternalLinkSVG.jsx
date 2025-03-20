export default ({ size = 20, color = '#4A9CA6', extraClass = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      className={extraClass}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.2223 3H13.0002V5.77785"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.11078 6.88899L12.9998 3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.8891 9.11078V11.8886C11.8891 12.5025 11.3919 12.9998 10.778 12.9998H4.11114C3.49724 12.9998 3 12.5025 3 11.8886V5.22179C3 4.60788 3.49724 4.11065 4.11114 4.11065H6.88899"
        stroke="#4A9CA6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
