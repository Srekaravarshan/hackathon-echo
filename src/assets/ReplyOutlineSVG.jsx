export default ({ extraClass, color = 'currentColor', size = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      className={extraClass}
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11 13.097v3.068c0 .867-1.029 1.323-1.672.741l-6.03-5.466a.999.999 0 01.025-1.503l6.03-5.118A1 1 0 0111 5.581v2.437c5.463 0 10 3.372 10 8.982v1.129c-1.847-3.684-5.687-5.032-10-5.032v0z"
      ></path>
    </svg>
  );
};
