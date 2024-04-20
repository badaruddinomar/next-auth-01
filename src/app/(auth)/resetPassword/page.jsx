import React from "react";

const ResetPasswordPage = () => {
  return (
    <div className="w-[100%] h-screen flex items-center justify-center">
      <form>
        <div>
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="px-[10px] h-[50px] rounded-sm w-[100%] md:w-[350px] border-none outline-none"
          />
        </div>
        <button className="px-[10px] h-[50px] rounded-sm w-[100%] md:w-[350px] border-none outline-none my-[10px] bg-white font-bold hover:opacity-50 transition-all duration-300">
          Send
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
