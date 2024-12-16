import React from 'react'

function Signup() {
  return (
    <div className="vh-100">
      <div className=" signup-box mt-5 mx-auto d-flex flex-column gap-2 align-items-center justify-content-center rounded-3">
        <h3 className="mt-2 fw-bold">Signup</h3>
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
          <label className=" bg-white file-labal rounded-2 py-2 px-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 me-1 mb-1"
              height='20px'
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            Profile photo
            <input type="file" />
          </label>
        </div>
        <div>
          <input
            className="rounded-2 border-0 px-4 hover py-2 text-center bg-black text-white mt-1"
            type="submit"
            value="Signup"
          />
        </div>
      </div>
    </div>
  );
}

export default Signup