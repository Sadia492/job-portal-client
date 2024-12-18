import React, { useEffect, useState } from "react";
import useAuth from "../hooks/UseAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { div } from "motion/react-client";
import UseAxiosSecure from "../hooks/UseAxiosSecure";

export default function MyApplication() {
  const { user } = useAuth();
  const [applicantJob, setApplicantJob] = useState();
  const [loading, setLoading] = useState(false);
  const axiosSecure = UseAxiosSecure();
  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/user-applications/${user?.email}`)
      .then((data) => setApplicantJob(data.data))
      .finally(() => {
        setLoading(false); // End loading
      });
  }, [user?.email]);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://job-portal-server-five-liart.vercel.app/applications/${id}`
          )
          .then((data) => {
            if (data.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
            const remaining = applicantJob.filter((job) => job._id !== id);
            setApplicantJob(remaining);
          });
      }
    });
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Job Title</th>
              <th>Company</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="">
            {/* Show loading state */}
            {!loading &&
              applicantJob?.map((job, index) => (
                <tr key={job._id} className="hover">
                  <th>{index + 1}</th>
                  <td>{job.applicant_email}</td>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => handleDelete(job._id)}
                    >
                      Withdraw
                    </button>
                  </td>
                </tr>
              ))}
            {/* row 2 */}
          </tbody>
        </table>
        {loading && (
          <p className=" flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </p>
        )}
      </div>
    </div>
  );
}
