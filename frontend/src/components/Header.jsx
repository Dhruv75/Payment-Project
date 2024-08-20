//Header.jsx

export function Header({ heading, subheading }) {
  return (
    <>
      <div className="flex flex-col justify-center items-center border w-full lg:w-1/2 bg-white h-40 rounded-tl-md rounded-tr-md">
        <h1 className="font-sans font-bold text-2xl mb-4"> {heading} </h1>
        <p className="font-sans  text-lg mb-4"> {subheading}</p>
      </div>
    </>
  );
}
