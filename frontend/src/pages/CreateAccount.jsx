import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ProgressBar from "../components/ProgressBar";

function CreateAccount() {
  const [showSignUp, setShowSignUp] = useState(false);
  const userData = localStorage.getItem("APHC_JWT_TOKEN");

  useEffect(() => {
    if (userData) {
      fetch("http://192.168.73.23:3000/admins/confirm_identity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
          accessControlAllowCredentials: true,
        },
        body: JSON.stringify({
          APHC_JWT_TOKEN: userData,
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            // Identity confirmed
            setShowSignUp(true);
          } else {
            // Identity not confirmed
            alert("First Sign In to create another account");
            return navigate("../login");
          }
        })
        .catch((err) => {
          // Failed to connect to server
          alert("Failed to connect to server");
          return navigate("/admins/login");
        });
    } else {
      alert("First Sign In to create another account");
      return navigate("../login");
    }
  }, []);

  // To display errors
  const [errorStatus, setErrorStatus] = useState(false);
  const [progressBar, setProgressBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    const createAccount = async () => {
      setProgressBar(true);
      return await fetch(`http://192.168.73.23:3000/admins/create_account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify({
          name: document.getElementById("floating_name").value,
          email: document.getElementById("floating_email").value,
          password: document.getElementById("floating_password").value,
          added_pass: document.getElementById("admin_floating_password").value,
          APHC_JWT_TOKEN: userData,
        }),
      });
    };
    const createAccountObject = createAccount();
    createAccountObject
      .then(async (response) => {
        setProgressBar(false);
        if (response.status === 200) {
          // Account Creation Successful
          const res = await response.json();
          setErrorStatus(false);
          setErrorMessage("");
          alert(res.message);
          navigate("/admins/login");
        } else {
          await response
            .json()
            .then((res) => {
              // Failed to create the account
              setErrorStatus(true);
              setErrorMessage(res.message);
            })
            .catch((err) => {
              // Failure to connect to server
              setErrorStatus(true);
              setErrorMessage("Failed to connect");
            });
        }
      })
      .catch((err) => {
        // Failure to connect to server
        setProgressBar(false);
        setErrorStatus(true);
        setErrorMessage("Failed to connect");
      });
  };

  return (
    <>
      {showSignUp ? (
        <form
          className="max-w-md my-2 border-2 h-[500px] border-gray-300 mx-3 min-[472px]:mx-auto p-4 rounded-md"
          onSubmit={submitHandler}
        >
          <div className="my-1 max-auto text-center">
            <h1 className="text-3xl font-bold">Create Account</h1>
          </div>
          <div className="relative px-2 md:px-0 my-2 z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              id="floating_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_name"
              className="peer-focus:mx-2 md:peer-focus:mx-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
          </div>
          <div className="relative px-2 md:px-0 my-2 z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
          <div className="relative px-2 md:px-0 my-2 z-0 w-full mb-5 group bg-grey-200">
            <input
              type="password"
              name="admin_floating_password"
              id="admin_floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="admin_floating_password"
              className=" max-[179px]:text-[10px] max-[179px]:peer-focus:text-[8px] peer-focus:mx-2 md:peer-focus:mx-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Admin's Password
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

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Note that by add this account, you shall be held accountable for
            this addition.
          </p>

          {/* Results and Error Message */}
          <div
            id="results"
            className={`text-red-500 text-center mt-2 ${
              errorStatus ? "block" : "hidden"
            }`}
          >
            {errorMessage}
          </div>

          {/* Circular progress bar */}
          {progressBar ? <ProgressBar /> : null}
        </form>
      ) : (
        <div className="my-14 w-[100%] flex justify-center items-center">
          <ProgressBar size={2} />
        </div>
      )}
    </>
  );
}

export default CreateAccount;