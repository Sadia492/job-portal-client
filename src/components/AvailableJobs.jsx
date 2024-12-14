import axios from "axios";
import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";

export default function AvailableJobs() {
  const [jobs, setJobs] = useState();
  useEffect(() => {
    axios
      .get("https://job-portal-server-five-liart.vercel.app/availableJobs")
      .then((data) => setJobs(data.data));
  }, []);

  return (
    <div>
      <h2 className="text-center font-bold text-3xl my-6">Available Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {jobs && jobs.map((job) => <JobCard key={job._id} job={job}></JobCard>)}
      </div>
    </div>
  );
}
