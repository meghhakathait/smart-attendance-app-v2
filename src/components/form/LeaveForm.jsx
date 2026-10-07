import React, { useEffect, useState } from "react";
import Button from "./Button";
import { api } from "../../api/api";
import CustomInput from "./CustomInput";
import { showToast } from "../../helper/toast-utility";

const LeaveForm = () => {

  const [allClasses, setAllClasses] = useState(null);
  const [formData, setFormData] = useState({
    classId: "",
    date: "",
    reason: "",
  });

  const fetchClasses = async () => {
    try {
      const res = await api.get("/student/classes");
      setAllClasses(res.data.classes);
    } catch (error) {
      showToast("error", "Error fetching classes");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormData = async (e) => {
    try {
      const res = await api.post("/leave", formData);
      console.log(res.data);
    } catch (error) {
      showToast("error", "Error in form submission");
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);
  return (
    <div className="flex w-full gap-8 min-h-4xl">
      <div className="p-6 rounded-md bg-emerald-900 border border-emerald-400 w-full max-w-lg ">
        <h2 className="font-semibold mb-6">Leave Form</h2>
        <form>
          <label>Class</label>

          <select
            name="classId"
            value={formData.classId}
            onChange={handleInput}
            required
            className=" bg-emerald-700 mx-6 p-2 rounded-md border border-emerald-400"
          >
            <option value="">Select Class</option>

            {allClasses?.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>

          <CustomInput
            label="Date"
            id="date"
            name="date"
            type="datetime-local"
            onChange={handleInput}
            value={formData?.date}
            required
          />

          <label>
            Reason
            <textarea
              id="reason"
              name="reason"
              onChange={handleInput}
              placeholder="Enter reason for regularization"
              value={formData?.reason}
              rows={4}
              required
              className="w-full p-2 rounded-md bg-emerald-700 border border-emerald-400"
            />
          </label>

          <Button onClick={handleFormData}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LeaveForm;
