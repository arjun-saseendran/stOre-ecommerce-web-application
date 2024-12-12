import React from 'react'

function Login() {
  return (
    <div className="container flex justify-center items-center h-screen w-full ">
      <div className="glass text-white flex justify-center items-center flex-col gap-5 w-96 h-96 m-5 py-72">
        <div>
          <h1 className="font-bold text-2xl mb-5">Welcome to StOre</h1>
        </div>
        <div className="bg-black rounded-xl">
          <input
            className="glass py-2 px-10 outline-none text-center"
            type="name"
            placeholder="Enter your name"
          />
        </div>
        <div className="bg-black rounded-xl">
          <input
            className="glass py-2 px-10 outline-none text-center"
            type="email"
            placeholder=" Enter your email"
          />
        </div>
        <div className="bg-black rounded-xl">
          <input
            className="glass py-2 px-10 outline-none text-center"
            type="mobile"
            placeholder="Enter your mobile number"
          />
        </div>
        <div className="bg-black rounded-xl">
          <label className='glass py-2 px-20 outline-none text-center'>
            Profile picture
          </label>
        </div>
        <div className="bg-black rounded-xl">
          <input
            className="glass outline-none text-center py-1 w-64"
            type="file"
            placeholder="Select profile picture"
          />
        </div>
        <div className="bg-black rounded-xl">
          <input
            className="glass py-2 px-10 outline-none text-center"
            type="password"
            placeholder="Enter new password"
          />
        </div>
        <div className="bg-black rounded-xl">
          <input
            className="glass py-2 px-10 outline-none text-center"
            type="password"
            placeholder="Enter confirm password"
          />
        </div>
        <div className="bg-black">
          <input
            className="glass text-white px-5 py-2 cursor-pointer hover:bg-slate-900"
            type="submit"
            value="Signup"
          />
        </div>
      </div>
    </div>
  );
}

export default Login