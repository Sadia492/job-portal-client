import React from "react";
import useAuth from "../hooks/UseAuth";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddJobs() {
  const { user } = useAuth();
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
    axios.post("http://localhost:5000/jobs", data).then((data) => {
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
              placeholder="Min"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="max"
              placeholder="Max "
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <select
              defaultValue="Currency"
              name="currency"
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
            name="company_logo"
            placeholder="Company Logo URL"
            className="input input-bordered"
            required
          />
        </div>
        {/* submit button */}
        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}
