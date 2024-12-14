import React, { useEffect, useState } from "react";
import useAuth from "../hooks/UseAuth";
import axios from "axios";
import { FaEye, FaPen, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function MyJobs() {
  const { user } = useAuth();
  const [postedJob, setPostedJob] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://job-portal-server-five-liart.vercel.app/user-jobs/${user?.email}`
      )
      .then((data) => setPostedJob(data.data))
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
          .delete(`https://job-portal-server-five-liart.vercel.app/jobs/${id}`)
          .then((data) => {
            if (data.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              const remaining = postedJob.filter((job) => job._id !== id);
              setPostedJob(remaining);
            }
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
            <tr className="text-center">
              <th></th>
              <th>Email</th>
              <th>Job Title</th>
              <th>Company</th>
              <th>Applicants Count</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              postedJob?.map((job, index) => (
                <tr key={job._id} className="hover text-center">
                  <th>{index + 1}</th>
                  <td>{job.hr_email}</td>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td>{job.applicants_count}</td>
                  <td className="space-x-3 text-center">
                    <Link to={`/my-jobs/${job._id}`}>
                      <button className="btn btn-primary">
                        <FaEye />
                      </button>
                    </Link>
                    <Link to={`/jobs/update/${job._id}`}>
                      <button className="btn btn-primary">
                        <FaPen />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="btn btn-primary"
                    >
                      <FaTrashAlt />
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
