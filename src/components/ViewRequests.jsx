import React from "react";
import Button from "./form/Button";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router";

const ViewRequests = ({ requests, handleReview }) => {
  return (
    <div className="mt-5 bg-emerald-700 p-5 rounded-md">
      <Link
        to={"/teacher/leave-requests"}
        className="flex items-center gap-2 mb-4"
      >
        <ArrowLeftIcon />{" "}
      </Link>
      <h2 className="text-2xl mb-6">View Requests</h2>
      {requests ? (
        requests.map((item, i) => (
          <div
            key={i}
            className="flex items-center mb-4 bg-emerald-800 rounded-md p-4"
          >
            <div className="w-2/12">{i + 1}</div>
            <div className="w-2/12">{item.student.name}</div>
            <div className="w-2/12">{item.status}</div>
            <div className="w-3/12">{item.reason ?? "No review yet"}</div>

            <div className="w-4/12 flex gap-2">
              {item.status === "pending" && (
                <>
                  <Button onClick={() => handleReview(item._id, "approved")}>
                    Approve
                  </Button>

                  <Button onClick={() => handleReview(item._id, "rejected")}>
                    Reject
                  </Button>
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No requests found</p>
      )}
    </div>
  );
};

export default ViewRequests;
