import { useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const VerifyEmail = () => {
  const { user, setDbUser } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const checkVerification = async () => {
    await user.reload();

    if (user.emailVerified) {
      const res = await axiosSecure.patch(
        `/users/verify-status/${user.email}`,
        {
          isVerified: true,
        },
      );

      if (res.data.modifiedCount > 0) {
        setDbUser((prev) => ({ ...prev, isOnboarded: true }));
        Swal.fire("Verified!", "Your email is verified. Welcome!", "success");
        navigate("/");
      }
    } else {
      Swal.fire(
        "Wait!",
        "Please click the link in your email first.",
        "warning",
      );
    }
  };

  return (
    <div className="bg-white my-4 rounded-xl flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">Please Verify Your Email</h2>
      <p>We've sent a link to {user?.email}</p>
      <button onClick={checkVerification} className="btn btn-primary mt-4">
        I've Clicked the Link
      </button>
    </div>
  );
};

export default VerifyEmail;
