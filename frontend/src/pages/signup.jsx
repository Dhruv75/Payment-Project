//Signup.jsx
import { Header } from "../components/Header";
import { InputEle } from "../components/Input";

export function Signup() {
  return (
    <>
      <div className="flex  justify-center items-center bg-gray-400 h-screen ">
        <div className="flex flex-col justify-center items-center mt-8 w-3/4   lg:w-1/2">
          <Header
            heading="SignUp"
            subheading="Enter Your Information to create an account"
          />

          <InputEle />
        </div>
      </div>
    </>
  );
}
