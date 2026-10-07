import React, { useEffect, useState } from "react";
import { showToast } from "../../helper/toast-utility";
import { api } from "../../api/api";
import Modal from "../../components/layout/Modal";
import Button from "../../components/form/Button";
import ViewAttendance from "../../components/ViewAttendance";

const MyAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [popup, setPopup] = useState(false);

  const fetchAttendance = async () => {
    try {
      const res = await api.get(`/student/attendance/`);
      setAttendance(res.data.attendance);
    } catch (error) {
      showToast("error", "error in fetching attendance");
    }
  };

  const fetchSelectedAttendance = async (cls) => {
   setSelectedAttendance(cls)
  };

  useEffect(() => {
    fetchAttendance();
  }, []);
  return (
    <div>
      <div className="mt-5 bg-emerald-700 p-5 rounded-ms">
        <h2 className="mb-10 font-bold text-lg">My Attendance</h2>

        <div className="grid grid-cols-3 gap-4">
          {attendance.length > 0 ? (
            attendance.map((item, i) => (
              <div key={i} className="p-6 rounded-md bg-emerald-900">
                <h3 className="font-bold text-lg mb-3 flex justify-between">
                  {item.className}
                </h3>
                <h5 className="italic">
                  Total Sessions - {item.totalSessions}
                </h5>
                <h5 className="italic">
                  Attended Sessions - {item.attendedSessions}
                </h5>
                <div className="flex gap-4 items-center mt-1">
                  <Button
                    onClick={() => {
                      setPopup(true);
                      fetchSelectedAttendance(item);
                    }}
                  >
                    View Records
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p>No requests found</p>
          )}
        </div>

        {popup && selectedAttendance && (
          <Modal onClose={() => setPopup(false)}>
            <ViewAttendance attendance={selectedAttendance} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default MyAttendance;
