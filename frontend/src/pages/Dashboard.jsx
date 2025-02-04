import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ProgressBar from "../components/ProgressBar";

function Dashboard() {
  const [showBoard, setShowBoard] = useState(false);
  const userData = localStorage.getItem("APHC_JWT_TOKEN");
  const [data, setData] = useState(null);

  // Check if user is authenticated
  useEffect(() => {
    if (userData) {
      // For Wi-Jungle only
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
            res.json().then((data) => {
              setData(data.userData);
            });
            setShowBoard(true);
          } else {
            // Identity not confirmed
            alert("First Sign In to create another account");
            return navigate("admins/login");
          }
        })
        .catch((err) => {
          // Failed to connect to server
          alert("Failed to connect to server");
          return navigate("/admins/login");
        });
    } else {
      // Not even logged in once
      alert("First Sign In to create another account");
      return navigate("../login");
    }
  }, []);

  const navigate = useNavigate();

  return (
    <>
      {showBoard ? (
        <h1>Welcome {data?.name}</h1>
      ) : (
        <div className="my-14 w-[100%] flex justify-center items-center">
          <ProgressBar size={2} />
        </div>
      )}
    </>
  );
}

export default Dashboard;
