export default ({ size = '16', color = 'currentColor', extraClass = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
      extraClass={extraClass}
    >
      <path
        fillRule="evenodd"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.238 8.762a8.423 8.423 0 01-1.759-2.54.5.5 0 01.11-.55l.547-.546c.447-.447.447-1.08.056-1.47l-.782-.783a1.333 1.333 0 00-1.886 0l-.434.435c-.494.494-.7 1.206-.567 1.913.33 1.742 1.341 3.65 2.974 5.282 1.633 1.633 3.54 2.645 5.282 2.974.707.133 1.42-.073 1.913-.567l.434-.434c.521-.52.521-1.364 0-1.885l-.782-.782a1 1 0 00-1.414 0l-.602.603a.5.5 0 01-.55.11 8.441 8.441 0 01-2.54-1.76z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
