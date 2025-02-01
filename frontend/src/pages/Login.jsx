import { useState } from "react";

function Login() {

  // To display errors  
  var errorStatus = false;

  const [errorMessage, setErrorMessage] = useState("");
  const submitHanderer = async (e) => {
    // Next to be developed
    e.preventDefault();
    const login = await fetch(`http://localhost:3000`).then((res) => {
      console.log(res);
    })
  };

  return (
    <>
      <form className="max-w-md my-2 border-2 h-[300px] border-gray-300 mx-3 min-[472px]:mx-auto p-4 rounded-md" onSubmit={submitHanderer}>
        <div className="my-1 max-auto text-center">
          <h1 className="text-3xl font-bold">Login</h1>
        </div>
        <div className="relative px-2 md:px-0 my-2 z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_email"
            className="peer-focus:mx-2 md:peer-focus:mx-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
        <div className="relative px-2 md:px-0 my-2 z-0 w-full mb-5 group">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_password"
            className="peer-focus:mx-2 md:peer-focus:mx-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="flex justify-center mx-2">
            <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
            Submit
            </button>
        </div>
        <p id="results" className={`text-red-500 text-center mt-2 ${errorStatus ? "block" : "hidden"}`}>{errorMessage}</p>
      </form>
    </>
  );
}

export default Login;
