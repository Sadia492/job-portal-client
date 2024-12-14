import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobCard from "./JobCard";
import ApplicationCard from "./ApplicationCard";

export default function ReviewApplication() {
  const [applications, setApplications] = useState();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/applications/jobs/${id}`)
      .then((data) => setApplications(data.data));
  }, []);

  return (
    <div>
      <h2 className="font-bold text-center text-3xl">REVIEW SECTION</h2>
      <div className="grid grid-cols-3 gap-7">
        {applications?.map((application) => (
          <ApplicationCard
            key={application._id}
            application={application}
          ></ApplicationCard>
        ))}
      </div>
    </div>
  );
}
