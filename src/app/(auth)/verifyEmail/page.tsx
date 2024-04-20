"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
const VerifyEmail = () => {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const tokenParams = useSearchParams();
  const token = tokenParams.get("token");
  const verifyUserHandler = async () => {
    try {
      const url = `/api/users/verifyEmail`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      };
      setLoading(true);
      const response = await fetch(url, options);
      
      if (response.ok) {
        setLoading(false);
        setVerified(true);
        router.push("/login");
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <div className="w-[100%] h-[100vh] flex items-center justify-center">
      <button
        onClick={verifyUserHandler}
        className="bg-[white] px-[15px] py-[10px] cursor-pointer font-medium rounded-md hover:opacity-50 transition-all duration-300"
      >
        {loading ? "Verifying..." : "Verify"}
      </button>
    </div>
  );
};

export default VerifyEmail;
