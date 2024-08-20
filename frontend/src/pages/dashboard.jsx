import { useEffect, useState } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/User";

export function Dashboard() {
  const [userName, setUserName] = useState("");
  const [balance, setBalance] = useState(null); // State to store the balance

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
      fetchBalance(storedUserName); // Fetch balance when the userName is available
    }
  }, []);

  async function fetchBalance(userName) {
    try {
      const response = await axios.get(
        "https://payment-project-backend-e1ra.onrender.com/account/balance",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // If using JWT for auth
          },
          params: { userName }, // Send the userName as a query parameter
        }
      );

      const userBalance = response.data.balance;
      setBalance(userBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
      // Handle the error, e.g., show a message to the user
    }
  }

  return (
    <>
      <h1 className="font-sans font-bold text-lg flex align-center justify-center mt-4">
        Welcome
      </h1>
      <div className="font-mono text-4xl font-bold text-lg flex align-center justify-center">
        {userName}
      </div>
      <div className="m-16">
        <Appbar />
        <Balance value={balance !== null ? balance : "Loading..."} />
        <Users />
      </div>
    </>
  );
}
