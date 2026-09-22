import React from "react";

const ViewClass = ({ classData }) => {
  const { code, isActive, name, schedule, students, location } = classData;
  return (
    <div className="flex  flex-col p-5 bg-emerald-700 rounded-md flex-1 w-full">
      <div className="grid grid-cols-2 gap-6 flex-1 w-full">
        <div className="bg-emerald-900 p-6 flex flex-col gap-4">
          <h2 className="font-bold text-xl">{name}</h2>
          <p className="italic text-lg">[{code}]</p>
          <p>{isActive ? "Active" : " Inactive"}</p>
        </div>
        <div className="bg-emerald-900 p-6">
          <div className="bg-emerald-950 rounded-md grid grid-cols-3 px-4 py-1 mb-4">
            <div>Day</div>
            <div>Start Time</div>
            <div>End Time</div>
          </div>
          {schedule.map(({ day, startTime, endTime }) => (
            <div
              key={day}
              className="bg-emerald-800 rounded-md grid grid-cols-3 mb-4 p-4"
            >
              <div>{day}</div>
              <div>{startTime}</div>
              <div>{endTime}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-emerald-900 p-5">
        <h2 className="text-2xl font-semibold mb-4">Enrolled Students</h2>
        {students.length > 0 ? (
          students.map(({ _id, name, studentId, email }, i) => (
            <div
              key={_id}
              className="flex items-center bg-emerald-900 rounded-md mb-4"
            >
              <div className="w-2/12 p-3">{i + 1}</div>
              <div className="w-2/12 p-3">{name}</div>
              <div className="w-2/12 p-3">{studentId}</div>
              <div className="w-4/12 p-3">{email}</div>
             
            </div>
          ))
        ) : (
          <p>No students enrolled</p>
        )}
      </div>
    </div>
  );
};

export default ViewClass;
