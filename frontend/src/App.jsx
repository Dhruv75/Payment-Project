// App.jsx
import { Routes, Route, useNavigate } from "react-router-dom";

import { Signup } from "./pages/signup";
import { Signin } from "./pages/signin";
import { Dashboard } from "./pages/dashboard";
import { Send } from "./pages/send";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex bg-blue-300">
        <div className="w-1/2">
          <div className="font-sans text-lg font-bold flex align-center justify-start m-3 ">
            PAYMENT APP
          </div>
        </div>

        <nav className="flex justify-end m-1 w-1/2">
          <div className="flex justify-center align-center">
            <button
              onClick={() => navigate("/signin")}
              className="border border-black p-2 pl-6 pr-6 m-1 font-sans text-lg rounded-3xl hover:bg-black hover:text-white transition transition-duration-1000"
            >
              Signin
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="border border-black p-2 pl-6 pr-6 m-1 font-sans text-lg rounded-3xl hover:bg-black hover:text-white transition transition-duration-1000"
            >
              Signup
            </button>
          </div>
        </nav>
      </div>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<Send />} />
      </Routes>
    </>
  );
}

export default App;
