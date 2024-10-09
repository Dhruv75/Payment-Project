import { useState } from "react";
import { Button } from "./button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

// Define the Zod schema
const zodSchema = z.object({
  userName: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(5, { message: "Must be 5 or more characters long" })
    .max(100, { message: "Username cannot be longer than 100 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character (@$!%*?&)",
      }
    ),
  firstName: z
    .string()
    .trim()
    .max(100, { message: "First name cannot be longer than 100 characters" }),
  lastName: z
    .string()
    .trim()
    .max(100, { message: "Last name cannot be longer than 100 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
});

export function InputEle() {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // Validate the form data with Zod
    const validationResult = zodSchema.safeParse({
      userName,
      firstName,
      lastName,
      email,
      password,
    });

    if (!validationResult.success) {
      // If validation fails, update the errors state
      const fieldErrors = validationResult.error.format();
      setErrors(fieldErrors);
      return;
    }

    try {
      const response = await axios.post(
        "https://payment-project-backend-e1ra.onrender.com/user/signup",
        {
          userName,
          firstName,
          lastName,
          email,
          password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        console.log("User signed up successfully. Token stored.");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  }

  return (
    <>
      <div className="bg-white p-2 w-full lg:w-1/2 rounded-bl-md rounded-br-md">
        <form onSubmit={handleSubmit}>
          <div className="m-3">
            <div className="font-sans font-semibold mb-2">UserName</div>
            <input
              className="font-normal font-sans w-full border border-black rounded-sm"
              value={userName}
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              placeholder="john.doe"
            />
            {errors.userName && (
              <p className="text-red-500">{errors.userName._errors[0]}</p>
            )}
          </div>

          <div className="m-3">
            <div className="font-sans font-semibold mb-2">FirstName</div>
            <input
              className="font-normal font-sans w-full border border-black rounded-sm"
              value={firstName}
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName._errors[0]}</p>
            )}
          </div>

          <div className="m-3">
            <div className="font-sans font-semibold mb-2">LastName</div>
            <input
              className="font-normal font-sans w-full border border-black rounded-sm"
              value={lastName}
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName._errors[0]}</p>
            )}
          </div>

          <div className="m-3">
            <div className="font-sans font-semibold mb-2">Email</div>
            <input
              className="font-normal font-sans w-full border border-black rounded-sm"
              value={email}
              type="email"
              placeholder="john.doe@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email._errors[0]}</p>
            )}
          </div>

          <div className="m-3">
            <div className="font-sans font-semibold mb-2">Password</div>
            <input
              className="font-normal font-sans w-full border border-black rounded-sm"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="P@ssw0rd123"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password._errors[0]}</p>
            )}
          </div>

          <div className="flex justify-center align-center">
            <Button type="submit" name="Submit" />
          </div>

          <p className="m-2 mt-8 flex justify-center align-center">
            Already have an Account?{" "}
            <Link
              to="/signin"
              className="ml-4 hover:underline hover:text-blue-500 transition transition-duration-1000"
            >
              Sign-in
            </Link>
          </p>
        </form>
        <p className="text-red-500 font-bold border-black border-2">
          Please wait for 2 minutes after clicking Submit Button
        </p>
      </div>
    </>
  );
}
