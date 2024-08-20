export function Button({ name, type = "button", onClick }) {
  return (
    <button
      type={type}
      className="ml-2 bg-blue-400 w-20 border border-solid border-black-500 rounded-md font-sans font-medium h-10 hover:scale-105 hover:shadow-lg transition transition-duration-1000 hover:bg-black hover:text-white"
      onClick={onClick} // Ensure onClick is passed to the button
    >
      {name}
    </button>
  );
}
