import React, { useEffect, useState } from "react";
import Button from "./form/Button";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router";
import { api } from "../api/api";
import { showToast } from "../helper/toast-utility";
import Modal from "./layout/Modal";
import ViewStudentDetails from "./ViewStudentDetails";

const ViewDefaulters = ({ defaulters, classId }) => {
  const [popup, setPopup] = useState(false);
  const [defaulterStudent, setDefaulterStudent] = useState({});

  const fetchDefaulterStudent = async (classId, studentId) => {
    try {
      const res = await api.get(
        `/teacher/classes/${classId}/students/${studentId}/attendance`,
      );
      console.log(res.data);
      setDefaulterStudent(res.data);
      setPopup(true);
    } catch (error) {
      showToast("error", "error in fetching student attendance");
    }
  };

  return (
    <div className="mt-5 bg-emerald-700 p-5 rounded-md">
      <Link to={"/teacher/defaulters"} className="flex items-center gap-2 mb-4">
        <ArrowLeftIcon />{" "}
      </Link>
      <h2 className="text-2xl mb-6">View Defaulters</h2>
      <div className="flex items-center mb-4 bg-emerald-800 rounded-md p-4">
        <div className="w-2/12">#</div>
        <div className="w-2/12">Student Name</div>
        <div className="w-2/12">Student Id</div>
        <div className="w-2/12">Attended</div>
        <div className="w-2/12">Total Sessions</div>
        <div className="w-2/12">Percentage</div>
        <div className="w-2/12">Action</div>
      </div>

      {defaulters ? (
        defaulters.map((defaulter, i) => (
          <div
            key={i}
            className="flex items-center mb-4 bg-emerald-800 rounded-md p-4"
          >
            <div className="w-2/12">{i + 1}</div>
            <div className="w-2/12">{defaulter.student.name}</div>
            <div className="w-2/12">[{defaulter.student.studentId}]</div>
            <div className="w-2/12">{defaulter.attended}</div>
            <div className="w-2/12">{defaulter.totalSessions}</div>
            <div className="w-2/12">{defaulter.percentage}%</div>
            <div className="w-2/12 ">
              <Button
                onClick={() =>
                  fetchDefaulterStudent(classId, defaulter.student._id)
                }
              >
                View Details
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p>No requests found</p>
      )}

      {popup && defaulterStudent &&
      (
        <Modal onClose={() => setPopup(false)}>
          <ViewStudentDetails defaulterStudent={defaulterStudent} />
        </Modal>
      )}
    </div>
  );
};

export default ViewDefaulters;
