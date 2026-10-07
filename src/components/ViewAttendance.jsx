import React from "react";

const ViewAttendance = ({ attendance }) => {
  const { className, totalSessions, attendedSessions, percentage, records } =
    attendance;
  return (
    <div className="text-white">
      <h1 className="font-bold text-xl">View Attendance</h1>
      <h3>{className}</h3>
      <h3>Total Sessions: {totalSessions}</h3>
      <h3>Attended Sessions: {attendedSessions}</h3>
      <h3>Percentage: {percentage}%</h3>
      <div className="flex gap-1">
        <h3 >Records:</h3>
        <div>
          {records && records.length > 0 ? (
            records.map((record) => (
              <div key={record._id}>
                <h1>{record.status}</h1>
                <h1>{record.markedAt}</h1>
              </div>
            ))
          ) : (
            <p>No records found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAttendance;
