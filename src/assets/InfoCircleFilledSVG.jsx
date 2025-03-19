export default ({ size = 16, color, extraClass }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
      className={extraClass}
    >
      <path
        fill={color}
        d="M8 13.547a5.625 5.625 0 100-11.25 5.625 5.625 0 000 11.25zM7.375 10.11h1.444-1.444z"
      ></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.375 10.11h1.444"
      ></path>
      <path fill="#EC6772" d="M8.1 10.11V7.452h-.72"></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.1 10.11V7.452h-.72"
      ></path>
      <path fill="#EC6772" d="M8.063 5.576a.156.156 0 11-.157-.156"></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.063 5.576a.156.156 0 11-.157-.156"
      ></path>
      <path fill="#EC6772" d="M7.906 5.42c.087 0 .157.07.157.156z"></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.906 5.42v0c.087 0 .157.07.157.156"
      ></path>
    </svg>
  );
};
