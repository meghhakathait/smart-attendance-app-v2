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
          <div className="mt-5 bg-emerald-700 p-5 rounded-ms">
            <h2 className="mb-10 font-bold text-lg">
              Today: {timetable.today}
            </h2>

            <div className="grid grid-cols-3 gap-4">
              {timetable?.classes?.length === 0 ? (
                <p>Noclasses for today</p>
              ) : (
                timetable.classes.map((cls) => (
                  <div
                    key={cls.classId}
                    className="p-6 rounded-md bg-emerald-900"
                  >
                    <h2 className="font-bold text-lg mb-3 flex justify-between">
                      {cls.name}
                    </h2>
                    <h2 className="italic">{cls.teacher.name}</h2>
                    <h2 className="flex gap-4 items-center mt-1">
                      {cls.liveSessionId ? "Live" : "Closed"}
                    </h2>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentDashboard;
