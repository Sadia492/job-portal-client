import Lottie from "lottie-react";
import React from "react";
import registerAnimation from "../assets/register.json";
import useAuth from "../hooks/UseAuth";
import SocialAuth from "../SocialAuth/SocialAuth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { createUser, updateUser, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    createUser(email, password)
      .then((result) => {
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {})
          .catch((error) => {});
        setUser(result.user);
        navigate("/");
      })
      .catch((error) => {});
  };

  return (
    <div className="flex items-center flex-grow gap-6 justify-center">
      <div className="card bg-base-100 w-full  flex-1 shadow-2xl">
        <h1 className="text-center text-3xl pt-4 font-bold">Register Now</h1>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              name="name"
              className="input input-bordered"
              required
            />
          </div>
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
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="url"
              placeholder="Photo url"
              name="photo"
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
            <button className="btn btn-primary">Register</button>
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
