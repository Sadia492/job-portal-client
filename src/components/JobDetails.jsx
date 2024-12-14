import { h2 } from "motion/react-client";
import React from "react";
import { Link, useLoaderData } from "react-router-dom";

export default function JobDetails() {
  const { _id, title, company, applicationDeadline } = useLoaderData();

  const isDeadlinePassed = () => {
    const currentDate = new Date();
    const deadlineDate = new Date(applicationDeadline);

    return deadlineDate < currentDate; // Returns true if the deadline has passed
  };

  return (
    <div className="m-10">
      <h2 className="text-3xl">job details for {title}</h2>
      <p>apply for: {company}</p>
      <p>deadline: {applicationDeadline}</p>
      {isDeadlinePassed() ? (
        <h2 className="text-red-500">Deadline over</h2>
      ) : (
        <>
          <Link to={`/jobApply/${_id}`}>
            <button className="btn btn-primary">Apply Now</button>
          </Link>
        </>
      )}
    </div>
  );
}
