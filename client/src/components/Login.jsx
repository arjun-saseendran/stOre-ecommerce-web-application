import React from "react";

function Signup() {
  return (
    <div className="vh-100">
      <div className=" login-box mx-auto mt-5 d-flex flex-column gap-2 align-items-center justify-content-center rounded-3">
        <h3 className="mt-2 fw-bold">Login</h3>

        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="text"
            placeholder="Email"
          />
        </div>

        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="password"
            placeholder="Password"
          />
        </div>

        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 hover text-center bg-black text-white mt-1"
            type="submit"
            value="Login"
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
