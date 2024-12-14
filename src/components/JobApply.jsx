import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/UseAuth";

export default function JobApply() {
  const { user } = useAuth();
  const { id } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());
    const data = {
      job_id: id,
      applicant_email: user.email,
      ...initialData,
    };
    axios.post("http://localhost:5000/applications", data).then((data) => {
      if (data.data.insertedId) {
        Swal.fire({
          title: "Added",
          text: "Added successfully",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="card bg-base-100 w-full shadow-2xl">
      <h1 className="text-5xl font-bold text-center">
        Apply Job and Good Luck!
      </h1>
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">LinkedIn URL</span>
          </label>
          <input
            type="url"
            name="linkedIn"
            placeholder="LinkedIn URL"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Github URL</span>
          </label>
          <input
            type="url"
            name="github"
            placeholder="Github URL"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Resume URL</span>
          </label>
          <input
            type="url"
            name="resume"
            placeholder="Resume URL"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Apply</button>
        </div>
      </form>
    </div>
  );
}
