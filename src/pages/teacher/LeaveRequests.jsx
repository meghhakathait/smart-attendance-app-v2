import React, { useEffect, useState } from "react";
import { showToast } from "../../helper/toast-utility";
import { api } from "../../api/api";
import Button from "../../components/form/Button";
import { Link } from "react-router";

const LeaveRequests = () => {
  const [classes, setClasses] = useState([]);

  const fetchClasses = async () => {
    try {
      const res = await api.get("/teacher/classes");
      setClasses(res.data.classes);
    } catch (error) {
      showToast("error", "error in fetching classes");
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="mt-5 bg-emerald-700 p-5 rounded-ms">
      <h2 className="mb-10 font-bold text-lg">Leave Requests</h2>

      <div className="grid grid-cols-3 gap-4">
        {classes.map((classItem) => (
          <div key={classItem._id} className="p-6 rounded-md bg-emerald-900">
            <h3 className="font-bold text-lg mb-3 flex justify-between">
              {classItem.name}
              <span>{classItem.isActive ? "isActive" : "Inactive"}</span>
            </h3>
            <h5 className="italic">[{classItem.code}]</h5>
            <p className="mb-4">Total Students:{classItem.students.length}</p>
            <Link to={`/teacher/review-requests/${classItem._id}`}>
              <Button>View Requests</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveRequests;
