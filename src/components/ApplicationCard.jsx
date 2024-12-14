import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

export default function ApplicationCard({ application }) {
  const {
    title,
    company,
    company_logo,
    applicant_email,
    linkedIn,
    github,
    resume,
    _id,
  } = application || {};

  const handleReview = (e, id) => {
    const data = {
      status: e.target.value,
    };
    axios
      .patch(`http://localhost:5000/applications/${id}`, data)
      .then((data) => {
        if (data.data.modifiedCount) {
          Swal.fire({
            title: "Updated",
            text: "Updated successfully",
            icon: "success",
          });
        }
      });
  };
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={company_logo} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Title: {title}</h2>
        <p>Company: {company}</p>
        <p>applicant email: {applicant_email}</p>
        <p>Linkedin: {linkedIn}</p>
        <p>Github: {github}</p>
        <p>Resume: {resume}</p>
        <div className="card-actions justify-start max-w-lg">
          <select
            defaultValue={application?.status || "Give Review"}
            onChange={(e) => handleReview(e, _id)}
            name="review"
            id=""
            className="input input-bordered"
          >
            <option value="">Give Review</option>
            <option value="Rejected">Rejected</option>
            <option value="ShortListed">ShortListed</option>
            <option value="Hired">Hired</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
          </select>
          {/* <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
              Review Now
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <a>Rejected</a>
              </li>
              <li>
                <a>ShortListed</a>
              </li>
              <li>
                <a>Hired</a>
              </li>
              <li>
                <a>Interview Scheduled</a>
              </li>
            </ul>
          </div>{" "} */}
        </div>
      </div>
    </div>
  );
}
