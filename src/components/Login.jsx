import Lottie from "lottie-react";
import React from "react";
import registerAnimation from "../assets/register.json";
import useAuth from "../hooks/UseAuth";
import SocialAuth from "../SocialAuth/SocialAuth";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const { signInUser, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signInUser(email, password)
      .then((result) => {
        setUser(result.user);
        navigate(location.state || "/");
      })
      .catch((error) => {});
  };

  return (
    <div className="flex items-center flex-grow gap-6 justify-center">
      <div className="card bg-base-100 w-full  flex-1 shadow-2xl">
        <h1 className="text-center text-3xl pt-4 font-bold">Login Now</h1>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
        <SocialAuth></SocialAuth>
      </div>
      <div className="flex-1 ">
        <Lottie
          width={20}
          height={20}
          animationData={registerAnimation}
          loop={true}
        ></Lottie>
      </div>
    </div>
  );
}
