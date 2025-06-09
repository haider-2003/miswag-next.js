const TrashIcon = () => (
  // i didn't find any icon for trash in figaa so i found one online
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-gray-600 hover:text-red-600 transition-colors duration-200"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 7h12m-9 4v6m6-6v6m1 4H6a2 2 0 01-2-2V7h16v11a2 2 0 01-2 2zM9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"
    />
  </svg>
);

export default TrashIcon;
