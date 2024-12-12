import React from 'react'

function Login() {
  return (
    <div className="container flex justify-center items-center h-screen w-full">
      <div className="glass text-white flex justify-center items-center flex-col gap-5 w-96 h-96 m-5">
        <div>
          <h1 className="font-bold text-2xl mb-5">Welcome Back</h1>
        </div>
        <div className="bg-black rounded-xl">
          <input className="glass py-2 px-10 outline-none" type="email" />
        </div>
        <div className="bg-black rounded-xl">
          <input className="glass py-2 px-10 outline-none" type="password" />
        </div>
        <div className="bg-black">
          <input
            className="glass text-white px-5 py-2 cursor-pointer hover:bg-slate-900"
            type="submit"
            value="Login"
          />
        </div>
      </div>
    </div>
  );
}

export default Login