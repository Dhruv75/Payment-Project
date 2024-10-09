import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Header } from "../components/Header";
import { Button } from "../components/button";
import { Link } from "react-router-dom";

export function Signin() {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // State for error message
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://payment-project-backend-e1ra.onrender.com/user/signin",
        {
          userName,
          password,
        }
      );

      const token = response.data.token;

      console.log("Got the Token");

      localStorage.setItem("authToken", token);
      localStorage.setItem("userName", userName);

      console.log("Signin successful!");
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid username or password.");
      } else {
        setErrorMessage("There was an error submitting the form!");
      }
      console.error("Error during signin:", error);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center bg-gray-400 h-screen">
        <div className="flex flex-col justify-center items-center mt-8 w-3/4 lg:w-1/2">
          <Header
            heading="SignIn"
            subheading="Enter Your Credentials to access your Account"
          />
          <div className="bg-white p-2 w-full lg:w-1/2 rounded-bl-md rounded-br-md">
            <form onSubmit={handleSubmit}>
              <div className="m-3">
                <div className="font-sans font-semibold mb-2">UserName</div>
                <input
                  className="font-normal font-sans w-full border border-black rounded-sm"
                  value={userName}
                  type="text"
                  onChange={(e) => setuserName(e.target.value)}
                />
              </div>
              <div className="m-3">
                <div className="font-sans font-semibold mb-2">Password</div>
                <input
                  className="font-normal font-sans w-full border border-black rounded-sm"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {errorMessage && (
                <div className="text-red-500 text-center mb-4">
                  {errorMessage}
                </div>
              )}

              <div className="flex justify-center align-center">
                <Button type="submit" name="signin" />
              </div>

              <p className="m-2 mt-8 flex justify-center align-center">
                Don&apos;t have an Account?{" "}
                <Link
                  to="/signup"
                  className="ml-4 hover:underline hover:text-blue-500 transition transition transition-duration-1000"
                >
                  sign-up
                </Link>
              </p>
            </form>
            <p className="text-red-500 font-bold border-black border-2">
              Please wait for 2 minutes after clicking sign in or sign up
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
