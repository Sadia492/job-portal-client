import React from "react";
import useAuth from "../hooks/UseAuth";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function Update() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    applicationDeadline,
    company,
    company_logo,
    description,
    jobField,
    jobType,
    location,
    requirements,
    responsibilities,
    salaryRange,
    title,
    _id,
  } = useLoaderData();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());

    const { min, max, currency, ...newJob } = initialData;
    newJob.salaryRange = { min, max, currency };
    newJob.requirements = newJob.requirements.split("\n");
    newJob.responsibilities = newJob.responsibilities.split("\n");

    const data = {
      ...newJob,
      hr_name: user.displayName,
      hr_photo: user.photoURL,
      applicants_count: 0,
      status: "active",
    };
    axios
      .put(`https://job-portal-server-five-liart.vercel.app/jobs/${_id}`, data)
      .then((data) => {
        if (data.data.modifiedCount) {
          Swal.fire({
            title: "Updated",
            text: "Updated successfully",
            icon: "success",
          });
          navigate(`/jobDetails/${_id}`);
        }
      });
  };

  return (
    <div>
      <h2 className="text-3xl">Post a new Job</h2>
      <form onSubmit={handleSubmit} className="card-body">
        {/* Job title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Title</span>
          </label>
          <input
            type="text"
            name="title"
            defaultValue={title}
            placeholder="Job Title"
            className="input input-bordered"
            required
          />
        </div>
        {/* job location */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Location</span>
          </label>
          <input
            type="text"
            name="location"
            defaultValue={location}
            placeholder="Job Location"
            className="input input-bordered"
            required
          />
        </div>
        {/* job Type */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Type</span>
          </label>
          <select
            defaultValue="Pick a Job type"
            name="jobType"
            value={jobType}
            className="select select-ghost w-full max-w-xs"
          >
            <option disabled>Pick a Job type</option>
            <option value="Full-time">Full-time</option>
            <option value="Intern">Intern</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>
        {/* job Type */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Field</span>
          </label>
          <select
            defaultValue="Pick a Job Field"
            name="jobField"
            value={jobField}
            className="select select-ghost w-full max-w-xs"
          >
            <option disabled>Pick a Job Field</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="Teaching">Teaching</option>
          </select>
        </div>
        {/* salary range */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Salary Range</span>
            </label>
            <input
              type="text"
              name="min"
              defaultValue={salaryRange.min}
              placeholder="Min"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="max"
              defaultValue={salaryRange.max}
              placeholder="Max "
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <select
              defaultValue="Currency"
              name="currency"
              value={salaryRange.currency}
              className="select select-ghost w-full max-w-xs"
            >
              <option disabled>Currency</option>
              <option>BDT</option>
              <option>USD</option>
              <option>INR</option>
            </select>
          </div>
        </div>
        {/* Job Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            placeholder="Job Description"
            defaultValue={description}
            name="description"
            required
          ></textarea>
        </div>
        {/* Company Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Company Name</span>
          </label>
          <input
            type="text"
            name="company"
            defaultValue={company}
            placeholder="Company Name"
            className="input input-bordered"
            required
          />
        </div>
        {/* requirements */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Requirements</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            defaultValue={requirements.join("\n")}
            placeholder="put each requirements in a new line"
            name="requirements"
            required
          ></textarea>
        </div>
        {/* responsibilities */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Responsibilities</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            defaultValue={responsibilities.join("\n")}
            placeholder="Write each responsibility in a new line"
            name="responsibilities"
            required
          ></textarea>
        </div>

        {/* HR Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">HR Email</span>
          </label>
          <input
            type="text"
            defaultValue={user?.email}
            name="hr_email"
            placeholder="HR Email"
            className="input input-bordered"
            required
            readOnly
          />
        </div>

        {/* application Deadline */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Deadline</span>
          </label>
          <input
            type="date"
            defaultValue={applicationDeadline}
            name="applicationDeadline"
            placeholder="Deadline"
            className="input input-bordered"
            required
          />
        </div>
        {/* HR Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Company Logo URL</span>
          </label>
          <input
            type="text"
            defaultValue={company_logo}
            name="company_logo"
            placeholder="Company Logo URL"
            className="input input-bordered"
            required
          />
        </div>
        {/* submit button */}
        <div className="form-control mt-6">
          <button className="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
  );
}
