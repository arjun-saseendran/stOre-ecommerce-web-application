import React from 'react'

function UserForm() {
  return (
    <div className=" signup-box mx-auto d-flex flex-column gap-2 align-items-center mt-5 rounded-3">
      <h3 className="mt-2">Signup</h3>
      <div>
        <input
          className="rounded-2 border-0 px-4 py-2 text-center"
          type="text"
          placeholder="Name"
        />
      </div>
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
          type="mobile"
          placeholder="Mobile"
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
          className="rounded-2 border-0 px-4 py-2 text-center"
          type="password"
          placeholder="Confirm Password"
        />
      </div>
      <div>
        <label className=' bg-white file-labal rounded-2 py-2 px-5'>
          Upload profile photo
          <input type="file" />
        </label>
      </div>
      <div>
        <input
          className="rounded-2 border-0 px-4 py-2 text-center bg-black text-white mt-1"
          type="submit"
          value="Signup"
        />
      </div>
    </div>
  );
}

export default UserForm