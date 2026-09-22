import React, { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import { api } from "../../api/api";
import { XCircle } from "lucide-react";
import CustomSelect from "./CustomSelect";
import Button from "./Button";
import { showToast } from "../../helper/toast-utility";

const ClassForm = ({ isUpdate, data }) => {
  const days = [
    { value: "Mon", text: "Mon" },
    { value: "Tue", text: "Tue" },
    { value: "Wed", text: "Wed" },
    { value: "Thu", text: "Thu" },
    { value: "Fri", text: "Fri" },
    { value: "Sat", text: "Sat" },
    { value: "Sun", text: "Sun" },
  ];

  const intiClass = { name: "", code: "", location: { lat: "", lng: "" } };
  const initSlot = { day: "Mon", startTime: "09:00", endTime: "10:30" };
  const [teachers, setTeachers] = useState(null);
  const [students, setStudents] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]); //empty arr inital value hai backend pr

  const [formData, setFormData] = useState(null);
  // formData - { "name": "React JS Batch 12", "code": "RJS-12","schedule": [{ "day": "Mon" "startTime":"09:00", "endTime": "10:00" }],"location": { "lat": 30.9010, "lng": 75.8573 }}

  const [schedule, setSchedule] = useState([initSlot]);
  // schedule = [{ "day": "Mon", "startTime": "09:00", "endTime": "10:00" }]

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === "lat" || name === "lng") {
        return {
          ...prev,
          location: {
            ...prev.location,
            [name]: value,
          },
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get(`/admin/users?isActive=true`);
      // console.log(res.data.users);
      const teachers = res.data.users.filter((user) => user.role == "teacher");
      const students = res.data.users.filter((user) => user.role == "student");
      setTeachers(teachers);
      setStudents(students);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddClass = async (e) => {
    e.preventDefault();
    let requestBody = {
      ...formData,
      schedule: schedule,
      teacher: selectedTeacher,
      students: selectedStudents,
    };
    try {
      await api.post("/admin/classes", requestBody);
      showToast("success", "Class addes successfully");
      setFormData(intiClass);
    } catch (error) {
      showToast("error", "Something went wrong");
    }
  };

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    if (schedule.length < 7) {
      setSchedule((prev) => {
        return [...prev, initSlot];
      });
    }
  };

  const handleRemoveSlot = (index) => {
    const filteredSchedule = schedule.filter((item, i) => i !== index);
    setSchedule(filteredSchedule);
  };

  const updateSlot = (i, field, value) => {
    const next = [...schedule];
    next[i] = { ...next[i], [field]: value };
    // 0 = {day:"mon", startTime:"09:00",endTime:"10:00"}
    setSchedule(next);
  };

  const handleUpdateClass = async (id) => {
    
    let requestBody = {
      ...formData,
      schedule: schedule,
      teacher: selectedTeacher,
      students: selectedStudents,
    };
    try {
      const res = await api.put(`/admin/classes/${id}`, requestBody);
      showToast("success", "Class updated successfully");
      // onClose(false);
    } catch (error) {
      console.log(error);
      showToast("error", "Failed to update class");
    }
  };

  useEffect(() => {
    if (isUpdate && data) {
      setFormData(data);
      setSchedule(data.schedule);
      setSelectedTeacher(data?.teacher?._id);
      const studentIds = data.students.map((stu) => stu._id);
      setSelectedStudents(studentIds);
    }
    fetchUsers();
  }, [isUpdate, data]);

  return (
    <div className="flex w-full gap-8">
      <div className="p-6 rounded-md bg-emerald-900 border border-emerald-400 w-full max-w-lg">
        <h2 className="font-semibold mb-6">
          {isUpdate ? "Update" : "Add"} Class
        </h2>
        <form>
          <CustomInput
            label="Name"
            id="name"
            name="name"
            onChange={handleInput}
            value={formData?.name}
          />

          {!isUpdate && (
            <CustomInput
              label="Code"
              id="code"
              name="code"
              onChange={handleInput}
              value={formData?.code}
            />
          )}
          <div className="flex gap-4">
            <CustomInput
              label="Latitude"
              id="lat"
              name="lat"
              onChange={handleInput}
              value={formData?.location.lat}
            />
            <CustomInput
              label="Longitutde"
              id="lng"
              name="lng"
              onChange={handleInput}
              value={formData?.location.lng}
            />
          </div>

          <div className="py-6">
            <p className="mb-4">Schedule</p>
            {schedule.map((slot, i) => (
              <div key={i} className="grid grid-cols-4 gap-4">
                <CustomSelect
                  label="Day"
                  name="day"
                  id="day"
                  options={days}
                  value={slot?.day}
                  onChange={(e) => updateSlot(i, "day", e.target.value)}
                />
                <CustomInput
                  label="Start Time"
                  type="time"
                  id="startTime"
                  options="startTime"
                  value={slot?.startTime}
                  onChange={(e) => updateSlot(i, "startTime", e.target.value)}
                />
                <CustomInput
                  label="End Time"
                  type="time"
                  id="endTime"
                  options="endTime"
                  value={slot?.endTime}
                  onChange={(e) => updateSlot(i, "endTime", e.target.value)}
                />
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={handleRemoveSlot}
                >
                  <XCircle />
                </button>
              </div>
            ))}

            <Button
              disabled={schedule.length > 7 ? true : false}
              onClick={handleAddSchedule}
            >
              Add Schedule
            </Button>
          </div>

          <hr className="mb-4 border-emerald-500" />

          {isUpdate ? (
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleUpdateClass(data._id);
              }}
            >
              Update Class
            </Button>
          ) : (
            <Button onClick={handleAddClass}>Add Class</Button>
          )}
        </form>
      </div>

      <div className="p-6 rounded-md bg-emerald-900 border border-emerald-400 w-full">
        <div className="p-4 mb-6 bg-emerald-800">
          <h2>Teachers List</h2>
          <div className="mt-4 max-h-52 overflow-auto ">
            {teachers &&
              teachers.map((teacher) => (
                <div
                  key={teacher.email}
                  className={`flex items-center ${
                    selectedTeacher === teacher.id
                      ? "border-2 border-emerald-950 "
                      : ""
                  }`}
                >
                  <div className="w-3/12 p-2">{teacher.name}</div>
                  <div className="w-2/12 p-2">
                    {teacher.employeeId ?? "No Id"}
                  </div>
                  <div className="w-4/12 p-2">{teacher.email}</div>
                  <div className="w-3/12 p-2">
                    <Button onClick={() => setSelectedTeacher(teacher._id)}>
                      {selectedTeacher == teacher._id ? "Assigned" : "Assign"}
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="p-4 mb-6 bg-emerald-800">
          <h2>Students List</h2>
          <div className="mt-4 max-h-52 overflow-auto ">
            {students &&
              students.map(({ name, studentId, email, _id }) => (
                <div
                  key={email}
                  className={`flex items-center ${selectedStudents.includes(_id) ? "bg-emerald-900" : ""}`}
                >
                  <div className="w-3/12 p-2">{name}</div>
                  <div className="w-3/12 p-2">{studentId ?? "No Id"}</div>
                  <div className="w-4/12 p-2">{email}</div>
                  <div className="w-2/12 p-2">
                    <Button
                      onClick={() =>
                        setSelectedStudents((prev) => [...prev, _id])
                      }
                    >
                      {selectedStudents.includes(_id) ? "Added" : "Add"}
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassForm;
