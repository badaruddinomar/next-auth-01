"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // FORM SUBMIT HANDLER--

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password == "" || formData.password == "") return;
    try {
      const url = `/api/users/login`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      setLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        router.push("/");
      }
      setLoading(false);
      console.log(data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center flex-col min-h-[100vh] max-h-[auto]">
      <h3 className="text-[25px] text-white mb-5">Login Page</h3>
      <form onSubmit={formSubmitHandler}>
        <div>
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="my-2 px-3 rounded-md py-3 w-[350px] font-bold"
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="my-2 px-3 rounded-md py-3 w-[350px] font-bold"
          />
        </div>
        <button className="w-[350px] bg-white rounded-md my-3 font-bold py-3 cursor-pointer hover:translate-y-2 transition-all">
          Submit
        </button>
      </form>
      <div className="flex items-center justify-between w-[350px]">
        <p className="text-[white]">Forgot your password?</p>
        <Link href={"/resetPassword"} className="text-[white] border-b-[1px]">
          Reset Password
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
