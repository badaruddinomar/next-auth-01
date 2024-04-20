"use client";
import { useState } from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `/api/users/signup`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch(url, options);
      if (response.ok) {
        setLoading(false);
        setFormData({
          username: "",
          password: "",
          email: "",
        });
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col min-h-[100vh] max-h-[auto]">
      <h3 className="text-[25px] text-white mb-5">Signup Page</h3>
      <form onSubmit={formSubmitHandler}>
        <div className="">
          <label htmlFor="username"></label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="my-2  px-3 rounded-md py-3 w-[350px] font-bold"
          />
        </div>
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
          {loading ? "Processing..." : " Submit"}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
