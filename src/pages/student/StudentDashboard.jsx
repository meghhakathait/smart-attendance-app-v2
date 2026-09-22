import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import { showToast } from "../../helper/toast-utility";

const StudentDashboard = () => {
  const [timetable, setTimeTable] = useState(null);
  const fetchTimeTable = async () => {
    try {
      const res = await api.get("/student/timetable");
      setTimeTable(res.data);
    } catch (error) {
      showToast("error", "Failed to fetch timetable ");
    }
  };

  useEffect(() => {
    fetchTimeTable();
  }, []);
  return (
    <div>
      {timetable && (
        <>
          <h2>Today: {timetable.today}</h2>
          <div className=" py-5 grid col-span-3">
            {timetable?.classes?.length === 0 ? (
              <p>Noclasses for today</p>
            ) : (
              timetable.classes.map((cls) => (
                <div key={cls.classId} className="p-3">
                  <h2>{cls.name}</h2>
                  <h2>{cls.teacher.name}</h2>
                  <h2>{cls.liveSessionId ? "Live" : "Closed"}</h2>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentDashboard;
