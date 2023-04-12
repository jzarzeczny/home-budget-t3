interface ArrowDownProps {
  styles: string;
  onClick: () => void;
}

export const ArrowDown = ({ styles, onClick }: ArrowDownProps) => {
  return (
    <button onClick={onClick} className={`${styles}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
        />
      </svg>
    </button>
  );
};
