import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import JobCard from "../components/JobCard";
import { div, h2 } from "motion/react-client";
import axios from "axios";

export default function AllJobs() {
  const data = useLoaderData();
  const [jobs, setJobs] = useState(data);
  const [sortOrder, setSortOrder] = useState("asc");
  const handleSearch = (e) => {
    const title = e.target.value;
    axios
      .get(`http://localhost:5000/jobs?title=${title}`)
      .then((data) => setJobs(data.data));
  };
  const sortJobs = (order) => {
    const sortedJobs = [...jobs].sort((a, b) => {
      const dateA = new Date(a.applicationDeadline);
      const dateB = new Date(b.applicationDeadline);

      if (order === "asc") {
        return dateA - dateB; // Ascending
      } else {
        return dateB - dateA; // Descending
      }
    });
    setJobs(sortedJobs);
  };
  const handleJobType = (e) => {
    const jobType = e.target.value;
    axios
      .get(`http://localhost:5000/jobs?jobType=${jobType}`)
      .then((data) => setJobs(data.data));
  };

  return (
    <div>
      <h2 className="text-center font-bold text-2xl my-4">All Jobs</h2>
      <div className="flex justify-center">
        <label className="input my-6 input-bordered flex items-center justify-center gap-2">
          <input
            onChange={handleSearch}
            type="text"
            className="grow"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="flex justify-end mb-6">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            Filter By JobType
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <button onClick={handleJobType} value="Full-Time" className="btn">
                Full-Time
              </button>
            </li>
            <li>
              <button onClick={handleJobType} className="btn" value="Part-Time">
                Part-Time
              </button>
            </li>
            <li>
              <button onClick={handleJobType} className="btn" value="Hybrid">
                Hybrid
              </button>
            </li>
          </ul>
        </div>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            Filter by Experience
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <a>Junior</a>
            </li>
            <li>
              <a>mid level</a>
            </li>
            <li>
              <a>entry</a>
            </li>
            <li>
              <a>internship</a>
            </li>
            <li>
              <a>senior</a>
            </li>
          </ul>
        </div>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            Filter by Salary Range
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <a>Min</a>
            </li>
            <li>
              <a>Max</a>
            </li>
          </ul>
        </div>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            Sort by Salary Range
          </div>
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              sortJobs(e.target.value);
            }}
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      {jobs ? (
        <div className="grid grid-cols-4 gap-6">
          {jobs?.map((job) => (
            <JobCard key={job._id} job={job}></JobCard>
          ))}
        </div>
      ) : (
        <h2>No data found</h2>
      )}
    </div>
  );
}
